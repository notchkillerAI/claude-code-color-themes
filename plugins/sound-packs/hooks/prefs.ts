import { atom, update } from 'claude-code'
import type { EngineInterface as Engine } from 'claude-code'

import type { Prefs } from '../types'
import { DEFAULTS } from './defaults.js'

// Saving settings, shared by every feature file.
const prefsAtom = atom({ plugin: 'sound-packs', key: 'prefs' } as const, DEFAULTS, { shape: 'prefs-1' })

export async function savePrefs($: Engine, fn: (p: Prefs) => Prefs): Promise<Prefs> {
  const prefs = await update($, prefsAtom, p => fn({ ...DEFAULTS, ...p }))
  await $.store.set('prefs', prefs)
  return prefs
}

export function hash(s: string): number {
  let h = 0
  for (const ch of s) h = (h * 31 + ch.charCodeAt(0)) >>> 0
  return h
}

type PickKey = 'spinner' | 'prompt' | 'cards' | 'badges' | 'badgeColors' | 'sounds'

/** Sets one style by name, cycles to the next with no name, or lists them. */
export async function pickFrom(
  $: Engine,
  label: string,
  names: string[],
  key: PickKey,
  arg: string | undefined,
  usage: string,
  extra: string[] = [],
): Promise<{ text: string; changed: boolean }> {
  const all = [...extra, ...names, 'off']
  if (arg === 'list') {
    return { text: `${label} (${names.length}): ${names.join(', ')}. Also: ${[...extra, 'off'].join(', ')}.`, changed: false }
  }
  let next = arg
  if (next === undefined) {
    const prefs = await savePrefs($, p => p)
    next = all[(all.indexOf(String(prefs[key])) + 1) % all.length] ?? 'off'
  }
  if (!all.includes(next)) return { text: `No ${label.toLowerCase()} named "${next}". Try ${usage} list.`, changed: false }
  const chosen = next
  await savePrefs($, p => ({ ...p, [key]: chosen }))
  return { text: `${label}: ${chosen}.`, changed: true }
}
