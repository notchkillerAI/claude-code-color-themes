import { atom, read } from 'claude-code'
import { playWav, sayAloud } from './audio.js'
import type { EngineInterface as Engine, On } from 'claude-code'

import { DEFAULTS } from './defaults.js'
import { hash, pickFrom, savePrefs } from './prefs.js'

const prefsAtom = atom({ plugin: 'sound-packs', key: 'prefs' } as const, DEFAULTS, { shape: 'prefs-1' })

// ---------- sound packs, synthesized as small WAV clips ----------

type Wave = 'sine' | 'triangle' | 'square' | 'saw'
type Pack = { wave: Wave; done: number[]; error: number[]; ask: number[]; step: number; decay: number }
const note = (name: string): number => {
  const m = /^([A-G])(#?)(\d)$/.exec(name)
  if (m === null) return 440
  const idx = { C: -9, D: -7, E: -5, F: -4, G: -2, A: 0, B: 2 }[m[1] as 'C'] + (m[2] === '#' ? 1 : 0)
  return 440 * Math.pow(2, (idx + (Number(m[3]) - 4) * 12) / 12)
}
const notes = (s: string) => s.split(' ').map(note)
const pk = (wave: Wave, done: string, error: string, ask: string, step = 0.12, decay = 3.2): Pack => ({ wave, done: notes(done), error: notes(error), ask: notes(ask), step, decay })

export const SOUND_PACKS: Record<string, Pack> = {
  chime: pk('sine', 'E5 B5 E6', 'E4 C4', 'G5 G5'),
  bells: pk('sine', 'C6 E6 G6 C7', 'G4 D4', 'A5 E6', 0.1, 2.4),
  marimba: pk('triangle', 'C5 E5 G5', 'D4 A3', 'E5 G5', 0.1, 6),
  arcade: pk('square', 'C5 E5 G5 C6', 'C4 G3 C3', 'E5 E5', 0.07, 5),
  coin: pk('square', 'B5 E6', 'E4 D#4', 'B5 B5', 0.08, 7),
  levelup: pk('square', 'C5 D5 E5 G5 C6', 'G3 E3', 'C6 G5', 0.06, 5),
  synthwave: pk('saw', 'A4 C5 E5 A5', 'A3 E3', 'E5 A5', 0.14, 2.5),
  dreamy: pk('sine', 'F5 A5 C6 E6', 'D4 A3', 'C6 A5', 0.16, 1.8),
  harp: pk('triangle', 'C5 E5 G5 B5 D6', 'A3 F3', 'G5 B5', 0.07, 3),
  zen: pk('sine', 'A4 E5', 'D4', 'A4', 0.4, 1.4),
  bubbles: pk('sine', 'C6 G6 E7', 'C5 A4', 'G6 C7', 0.05, 9),
  piano: pk('triangle', 'G4 B4 D5 G5', 'C4 G3', 'D5 G5', 0.12, 4),
  doorbell: pk('sine', 'E5 C5', 'C4 A3', 'E5 C5', 0.35, 2.2),
  sparkle: pk('sine', 'E6 G6 B6 E7', 'B4 G4', 'B6 E7', 0.05, 6),
  robot: pk('square', 'C5 C6 C5', 'C3 C3', 'G5 C6', 0.09, 6),
  lofi: pk('triangle', 'D5 F5 A5 C6', 'D4 A3', 'A5 F5', 0.15, 2.8),
  space: pk('sine', 'C5 G5 D6 A6', 'G3 D3', 'D6 A6', 0.13, 2),
  kalimba: pk('triangle', 'C6 E6 G6', 'E4 C4', 'G6 E6', 0.11, 5),
  pop: pk('sine', 'A5 C#6', 'A4 F4', 'C#6 A5', 0.06, 10),
  victory: pk('square', 'G4 C5 E5 G5 E5 G5', 'C4 B3 A#3', 'G5 C6', 0.09, 4),
  ocean: pk('sine', 'D5 F#5 A5', 'D4 A3', 'F#5 A5', 0.2, 1.6),
  retro: pk('square', 'E5 G5 E6 C6 D6 G6', 'E3 C3', 'G5 E6', 0.06, 6),
  gentle: pk('sine', 'G5 D6', 'G4 D4', 'D6 G5', 0.18, 2.6),
  jazz: pk('triangle', 'D5 F#5 A5 C#6 E6', 'C4 A3 F#3', 'A5 C#6', 0.1, 3.5),
  wind: pk('sine', 'B5 D6 F#6 A6', 'B4 F#4', 'F#6 D6', 0.22, 1.5),
}

function wav(pack: Pack, kind: 'done' | 'error' | 'ask'): string {
  const rate = 22050
  const seq = pack[kind]
  const length = Math.ceil(rate * (seq.length * pack.step + 1.1))
  const samples = new Int16Array(length)
  for (let i = 0; i < length; i++) {
    const t = i / rate
    let value = 0
    seq.forEach((f, k) => {
      const start = k * pack.step
      if (t < start) return
      const tt = t - start
      const phase = (f * tt) % 1
      const osc =
        pack.wave === 'sine' ? Math.sin(2 * Math.PI * phase)
          : pack.wave === 'triangle' ? 4 * Math.abs(phase - 0.5) - 1
            : pack.wave === 'square' ? (phase < 0.5 ? 0.6 : -0.6)
              : 2 * phase - 1
      value += osc * Math.exp(-tt * pack.decay) * Math.min(1, tt * 300)
    })
    samples[i] = Math.max(-1, Math.min(1, value * 0.22)) * 32767
  }
  const bytes = new Uint8Array(44 + length * 2)
  const view = new DataView(bytes.buffer)
  const text = (at: number, s: string) => [...s].forEach((c, k) => view.setUint8(at + k, c.charCodeAt(0)))
  text(0, 'RIFF'); view.setUint32(4, 36 + length * 2, true); text(8, 'WAVE'); text(12, 'fmt ')
  view.setUint32(16, 16, true); view.setUint16(20, 1, true); view.setUint16(22, 1, true)
  view.setUint32(24, rate, true); view.setUint32(28, rate * 2, true); view.setUint16(32, 2, true); view.setUint16(34, 16, true)
  text(36, 'data'); view.setUint32(40, length * 2, true)
  for (let i = 0; i < length; i++) view.setInt16(44 + i * 2, samples[i] ?? 0, true)
  let binary = ''
  for (let i = 0; i < bytes.length; i += 4096) binary += String.fromCharCode(...bytes.subarray(i, i + 4096))
  return btoa(binary)
}

const clips = new Map<string, string>()

/** Plays one event's sound in the person's chosen pack, and speaks if the voice is on. */
export async function playEvent($: Engine, kind: 'done' | 'error' | 'ask' | 'focus', said?: string): Promise<void> {
  const prefs = await read($, prefsAtom)
  if (prefs.sound !== false && prefs.sounds !== 'off') {
    if (prefs.sounds === 'classic' || prefs.sounds === undefined) {
      await playWav($, { asset: 'sounds/chime.wav' })
    } else {
      const pack = SOUND_PACKS[prefs.sounds] ?? SOUND_PACKS.chime!
      const key = `${prefs.sounds}:${kind === 'focus' ? 'done' : kind}`
      let base64 = clips.get(key)
      if (base64 === undefined) {
        base64 = wav(pack, kind === 'focus' ? 'done' : kind)
        clips.set(key, base64)
      }
      await playWav($, { base64 })
    }
  }
  if (prefs.voice === true && said !== undefined) {
    void sayAloud($, said, prefs.voiceName)
  }
}

const DONE_LINES = ['All done!', 'Finished!', 'Task complete.', 'Done and dusted.', 'Ready when you are.', 'That’s a wrap!']

export const doneLine = (turnId: string): string => DONE_LINES[hash(turnId) % DONE_LINES.length] ?? 'All done!'

/** /colors sounds <pack> and /colors voice on|off|<name>. */
export async function soundsCommand($: Engine, sub: 'sounds' | 'voice', arg: string | undefined, rest: string, usage = '/colors sounds'): Promise<string> {
  if (sub === 'sounds') {
    const r = await pickFrom($, 'Sound pack', Object.keys(SOUND_PACKS), 'sounds', arg, usage, ['classic'])
    if (r.changed) await playEvent($, 'done')
    return r.text
  }
  if (arg === 'off' || arg === 'on') {
    await savePrefs($, p => ({ ...p, voice: arg === 'on' }))
    if (arg === 'on') void sayAloud($, 'Voice on. I will tell you when I am done.')
    return `Voice ${arg}.`
  }
  if (rest !== '') {
    await savePrefs($, p => ({ ...p, voice: true, voiceName: rest }))
    void sayAloud($, 'Hello! This is my new voice.', rest)
    return `Voice on, using "${rest}". If you hear nothing, that voice isn't installed on this Mac.`
  }
  const after = await savePrefs($, p => ({ ...p, voice: !p.voice }))
  return `Voice ${after.voice ? 'on' : 'off'}. Pick a Mac voice by name, like Samantha.`
}
