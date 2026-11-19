import { atom, read, update } from 'claude-code'
import { playWav } from './audio.js'
import type { EngineInterface as Engine, On } from 'claude-code'

import type { FocusTimer, Prefs } from '../types'
import { DEFAULTS } from './defaults.js'
import { savePrefs } from './prefs.js'

// The ambient bar above the prompt: the theme, a clock, a focus timer and a
// line of motivation. Everything here is kept for the session; the person's
// choices live in the shared prefs.

const IDLE: FocusTimer = { mode: 'idle', endsAt: 0, left: 0, isPaused: false, rounds: 0 }
const prefsAtom = atom({ plugin: 'olive-theme', key: 'prefs' } as const, DEFAULTS, { shape: 'prefs-1' })
export const timerAtom = atom({ plugin: 'olive-theme', key: 'timer' } as const, IDLE)
const nowAtom = atom({ plugin: 'olive-theme', key: 'now' } as const, 0)
const quoteShiftAtom = atom({ plugin: 'olive-theme', key: 'quoteShift' } as const, 0)

// Original one-liners, one a day (↻ shows the next).
const QUOTES = [
  'Small commits, big wins.',
  'Make it work, then make it beautiful.',
  'Every bug fixed is a lesson learned.',
  'Done is a feature.',
  'Read the error message. Then read it again.',
  'Today’s code is tomorrow’s foundation.',
  'Progress over perfection.',
  'One function at a time.',
  'Name things like you’ll read them at 2 a.m.',
  'Simple code is kind code.',
  'Ship it, learn, repeat.',
  'Your future self will thank you for that comment.',
  'Stuck? Take a walk. The answer often follows.',
  'Tests are love letters to your future self.',
  'Curiosity compiles.',
  'Great things are built one keystroke at a time.',
  'Break it down until it feels easy.',
  'Delete code bravely.',
  'Clarity beats cleverness.',
  'Rest is part of the work.',
  'Hydrate. Then debug.',
  'Every expert was once a beginner who kept going.',
  'Focus on the next right step.',
  'Ask good questions; get great code.',
  'A clean diff is a happy reviewer.',
  'Build the thing you wish existed.',
  'Slow is smooth, smooth is fast.',
  'Celebrate the small green checks.',
  'Leave the code nicer than you found it.',
  'You’re closer than you think.',
  'Consistency beats intensity.',
  'Today is a good day to refactor.',
  'Think twice, type once.',
  'The best error is the one you prevent.',
  'Make it readable, then make it fast.',
  'Ideas are cheap; shipping is magic.',
  'Deep breath. You’ve got this.',
  'Keep it simple, keep it shipping.',
  'Learn something small every day.',
  'Good naming is half the documentation.',
]

let tzOffsetMin: number | undefined
let lastMinute = -1

async function offset($: Engine): Promise<number> {
  if (tzOffsetMin !== undefined) return tzOffsetMin
  try {
    const { exitCode, stdout } = await $.process.run(['date', '+%z'], { timeoutMs: 5000 })
    const m = /^([+-])(\d\d)(\d\d)/.exec(stdout.trim())
    if (exitCode === 0 && m !== null) {
      tzOffsetMin = (m[1] === '-' ? -1 : 1) * (Number(m[2]) * 60 + Number(m[3]))
      return tzOffsetMin
    }
  } catch {
    // Fall back below.
  }
  tzOffsetMin = -new Date().getTimezoneOffset()
  return tzOffsetMin
}

/** Local wall-clock parts for a moment, using the Mac's time zone. */
function local(ms: number, offsetMin: number): { h: number; m: number; weekday: string; day: number; month: string; dayIndex: number } {
  const d = new Date(ms + offsetMin * 60_000)
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  return {
    h: d.getUTCHours(),
    m: d.getUTCMinutes(),
    weekday: weekdays[d.getUTCDay()] ?? '',
    day: d.getUTCDate(),
    month: months[d.getUTCMonth()] ?? '',
    dayIndex: Math.floor((ms + offsetMin * 60_000) / 86_400_000),
  }
}

function clockText(ms: number, offsetMin: number, hour12: boolean): string {
  const t = local(ms, offsetMin)
  const mm = String(t.m).padStart(2, '0')
  const time = hour12 ? `${t.h % 12 === 0 ? 12 : t.h % 12}:${mm} ${t.h < 12 ? 'AM' : 'PM'}` : `${String(t.h).padStart(2, '0')}:${mm}`
  return `${time} · ${t.weekday} ${t.day} ${t.month}`
}

function greeting(ms: number, offsetMin: number): string {
  const hour = local(ms, offsetMin).h
  if (hour >= 5 && hour < 12) return '☀️ Good morning'
  if (hour >= 12 && hour < 17) return '🌤️ Good afternoon'
  if (hour >= 17 && hour < 22) return '🌆 Good evening'
  return '🌙 Late night'
}

function mmss(ms: number): string {
  const total = Math.max(0, Math.ceil(ms / 1000))
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, '0')}`
}

function remaining(timer: FocusTimer, now: number): number {
  return timer.isPaused ? timer.left : Math.max(0, timer.endsAt - now)
}

export type BarDeps = {
  /** The current theme as the bar shows it, such as "🌸 Sakura". */
  themeLabel: (prefs: Prefs) => string
}

// ---------- timer actions, shared by the bar's buttons and /colors focus ----------

export async function startFocus($: Engine, prefs: Prefs, minutes?: number): Promise<FocusTimer> {
  const now = await $.clock.now()
  const ms = (minutes ?? prefs.focusMin) * 60_000
  const timer = await update($, timerAtom, (t): FocusTimer => ({ ...t, mode: 'focus', endsAt: now + ms, left: ms, isPaused: false }))
  await update($, nowAtom, () => now)
  return timer
}

export async function pauseOrResume($: Engine): Promise<FocusTimer> {
  const now = await $.clock.now()
  const timer = await update($, timerAtom, t => {
    if (t.mode === 'idle') return t
    return t.isPaused
      ? { ...t, isPaused: false, endsAt: now + t.left }
      : { ...t, isPaused: true, left: Math.max(0, t.endsAt - now), endsAt: 0 }
  })
  await update($, nowAtom, () => now)
  return timer
}

export async function stopTimer($: Engine): Promise<FocusTimer> {
  return update($, timerAtom, t => ({ ...IDLE, rounds: t.rounds }))
}

export function nextQuote($: Engine): Promise<number> {
  return update($, quoteShiftAtom, n => n + 1)
}

export async function timerSummary($: Engine): Promise<string> {
  const timer = await read($, timerAtom)
  const now = await $.clock.now()
  if (timer.mode === 'idle') return `No timer running. ${timer.rounds} focus session${timer.rounds === 1 ? '' : 's'} done today.`
  return `${timer.mode === 'focus' ? '🍅 Focus' : '☕ Break'}: ${mmss(remaining(timer, now))} left${timer.isPaused ? ' (paused)' : ''}.`
}

// ---------- hooks ----------

/** Starts the bar's clock; the session.start hook calls it once. */
export async function startBar($: Engine, deps: BarDeps): Promise<void> {
    await offset($)
    await update($, nowAtom, () => 0)

    // One tick a second: finish timers, and redraw when the minute or the
    // countdown changes. A quiet bar writes once a minute.
    $.clock.every(1000, () => {
      void (async () => {
        const now = await $.clock.now()
        const timer = await read($, timerAtom)
        const running = timer.mode !== 'idle' && !timer.isPaused

        if (running && now >= timer.endsAt) {
          const prefs = await read($, prefsAtom)
          if (timer.mode === 'focus') {
            const rounds = timer.rounds + 1
            const ms = prefs.breakMin * 60_000
            await update($, timerAtom, () => ({ mode: 'break', endsAt: now + ms, left: ms, isPaused: false, rounds }))
            $.ui.toast(`🍅 Focus session ${rounds} done! ☕ ${prefs.breakMin} min break.`)
            void $.ui.notify(`Focus session ${rounds} done. Time for a ${prefs.breakMin} minute break.`, { title: '🍅 Focus complete' })
          } else {
            await update($, timerAtom, t => ({ ...IDLE, rounds: t.rounds }))
            $.ui.toast('☕ Break over. Ready for the next one?')
            void $.ui.notify('Break over. Start another focus session when you are ready.', { title: '☕ Break over' })
          }
          if (prefs.sound) await playWav($, { asset: 'sounds/chime.wav' })
        }

        const minute = Math.floor(now / 60_000)
        if (running || minute !== lastMinute) {
          lastMinute = minute
          await update($, nowAtom, () => now)
        }
      })()
    })
}

export function registerBar(on: On, deps: BarDeps): void {
  on('ui.render', { component: 'AbovePrompt' }, async ($, e, next) => {
    if (e.props.hasSurvey) return next(e)
    const prefs = await read($, prefsAtom)
    if (prefs.bar === false) return next(e)

    const { Box, Button, Text } = $.ui.resolve(e)
    const timer = await read($, timerAtom)
    const shift = await read($, quoteShiftAtom)
    const stamp = await read($, nowAtom)
    const now = stamp > 0 ? stamp : await $.clock.now()
    const tz = tzOffsetMin ?? 0
    const quote = QUOTES[(local(now, tz).dayIndex + shift) % QUOTES.length] ?? QUOTES[0]
    const left = remaining(timer, now)
    const narrow = e.props.bodyColumns < 70

    return (
      <Box flexDirection="column">
        <Box flexDirection="row" flexWrap="wrap" columnGap={2}>
          {deps.themeLabel(prefs) !== '' ? <Text bold {...fontOf(prefs)}>{deps.themeLabel(prefs)}</Text> : null}
          {prefs.clock !== false ? <Text {...fontOf(prefs)}>🕐 {clockText(now, tz, prefs.hour12 !== false)}</Text> : null}
          {prefs.clock !== false && !narrow ? <Text dimColor>{greeting(now, tz)}</Text> : null}
          <Box flexDirection="row" columnGap={1}>
            {timer.mode === 'idle' ? (
              <Button key="focus-start" plain onPress={() => void startFocus($, prefs)}>
                🍅 Focus {String(prefs.focusMin ?? 25)}m
              </Button>
            ) : (
              <Text bold>
                {timer.mode === 'focus' ? '🍅' : '☕'} {mmss(left)}
                {timer.isPaused ? ' paused' : ''}
              </Text>
            )}
            {timer.mode !== 'idle' ? (
              <Button key="focus-pause" plain onPress={() => void pauseOrResume($)}>
                {timer.isPaused ? '▶' : '⏸'}
              </Button>
            ) : null}
            {timer.mode !== 'idle' ? (
              <Button key="focus-stop" plain onPress={() => void stopTimer($)}>
                ⏹
              </Button>
            ) : null}
            {timer.rounds > 0 ? <Text dimColor>×{String(timer.rounds)}</Text> : null}
          </Box>
        </Box>
        {prefs.quote !== false ? (
          <Box flexDirection="row" columnGap={1}>
            <Text dimColor italic wrap="truncate-end" {...(fontOf(prefs).mono === true ? { mono: true } : {})}>
              ✨ {quote}
            </Text>
            <Button key="quote-next" plain onPress={() => void nextQuote($)}>
              ↻
            </Button>
          </Box>
        ) : null}
      </Box>
    )
  })
}

/** Text style for the plugin's own text: the app's own font can't be changed. */
function fontOf(prefs: Prefs): { mono?: boolean; bold?: boolean; italic?: boolean } {
  const f = (prefs as Prefs & { font?: string }).font
  return f === 'mono' ? { mono: true } : f === 'bold' ? { bold: true } : f === 'italic' ? { italic: true } : {}
}
const onOff = (value: string | undefined, current: boolean): boolean =>
  value === 'on' ? true : value === 'off' ? false : !current

/** Handles bar, clock, quote, focus and break settings. */
export async function barCommand($: Engine, sub: string, arg: string | undefined): Promise<string> {
  const prefs = await read($, prefsAtom)
  const reply = await (async (): Promise<{ text: string }> => {
    switch (sub) {
        case 'bar': {
          const after = await savePrefs($, p => ({ ...p, bar: onOff(arg, p.bar) }))
          return { text: `Ambient bar ${after.bar ? 'on' : 'off'}.` }
        }
        case 'clock': {
          const after = await savePrefs($, p =>
            arg === '12h' ? { ...p, clock: true, hour12: true } : arg === '24h' ? { ...p, clock: true, hour12: false } : { ...p, clock: onOff(arg, p.clock) },
          )
          return { text: after.clock ? `Clock on (${after.hour12 ? '12-hour' : '24-hour'}).` : 'Clock off.' }
        }
        case 'quote':
        case 'quotes': {
          if (arg === 'next') {
            await nextQuote($)
            return { text: 'Next quote.' }
          }
          const after = await savePrefs($, p => ({ ...p, quote: onOff(arg, p.quote) }))
          return { text: `Daily quote ${after.quote ? 'on' : 'off'}.` }
        }
        case 'focus':
        case 'pomodoro':
        case 'timer': {
          if (arg === 'pause' || arg === 'resume') {
            const t = await pauseOrResume($)
            return { text: t.mode === 'idle' ? 'No timer running.' : t.isPaused ? '⏸ Paused.' : '▶ Resumed.' }
          }
          if (arg === 'stop') {
            await stopTimer($)
            return { text: '⏹ Timer stopped.' }
          }
          if (arg === 'status') return { text: await timerSummary($) }
          const minutes = arg !== undefined ? Number(arg) : prefs.focusMin
          if (!Number.isFinite(minutes) || minutes < 1 || minutes > 240) return { text: 'Give minutes from 1 to 240, like /colors focus 50.' }
          if (arg !== undefined) await savePrefs($, p => ({ ...p, focusMin: minutes }))
          await startFocus($, prefs, minutes)
          return { text: `🍅 Focus for ${minutes} minutes. Then a ${prefs.breakMin}-minute break.` }
        }
        case 'break': {
          const minutes = Number(arg)
          if (!Number.isFinite(minutes) || minutes < 1 || minutes > 60) return { text: 'Give minutes from 1 to 60, like /colors break 10.' }
          await savePrefs($, p => ({ ...p, breakMin: minutes }))
          return { text: `☕ Breaks are now ${minutes} minutes.` }
        }

      default:
        return { text: BAR_HELP }
    }
  })()
  return reply.text
}

export const BAR_HELP = [
  'Ambient bar (above the prompt):',
  '  bar on|off           show or hide the bar',
  '  clock on|off|12h|24h',
  '  quote on|off|next',
  '  focus [minutes]      start a focus timer (default 25)',
  '  focus pause|stop|status',
  '  break <minutes>      break length (default 5)',
].join('\n')
