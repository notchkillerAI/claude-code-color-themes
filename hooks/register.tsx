import { atom, read, update } from 'claude-code'
import { ON_OFF, choices, suggest } from './autocomplete.js'
import type { Grammar } from './autocomplete.js'
import type { EngineInterface as Engine, Register, ThemeSetArgs } from 'claude-code'

import type { AutoMode, Prefs } from '../types'
import { barCommand, registerBar, startBar, startFocus } from './bar.js' // bundle-only
import { DEFAULTS } from './defaults.js'
// bundle-only:start
import { BADGE_COLOR_NAMES, BADGE_NAMES, badgeColorsCommand, badgesCommand, BADGES, BADGE_COLORS, registerBadges } from './badges.js'
import { cardsCommand, CARD_STYLES, registerCards } from './cards.js'
import { registerMenu } from './menu.js'
import { promptCommand, PROMPT_STYLES, registerPromptColors } from './promptcolors.js'
import { doneLine, playEvent, soundsCommand, SOUND_PACKS } from './sounds.js'
import { SPINNER_NAMES, registerSpinners, spinnerCommand, SPINNERS } from './spinners.js'
import { recordTool, recordTurn, registerStats, statsCommand } from './stats.js'
// bundle-only:end
import { makeColors } from './make-colors.js'
import { SCENES, SCENE_KINDS, sceneFor, sceneSvg } from './scenes.js'
import type { SceneKind } from './scenes.js'
import {
  GROUPS,
  HEX,
  THEMES,
  fullDefinition,
  groupOf,
  hsl,
  hueSatOf,
  paletteFor,
  surpriseColor,
  titleOf,
} from './themes.js'

const PLUGIN = 'olive-theme'

// ---------- type-ahead for /colors ----------

const themeChoices = () =>
  choices(NAMES, name => {
    const kind = sceneFor(name, hueSatOf(name)[0])
    return `${SCENES[kind].emoji} ${groupOf(name) ?? 'theme'} · ${SCENES[kind].label.toLowerCase()}`
  })

const SUBCOMMANDS = [
  { name: 'panel', description: 'Open the theme picker panel' },
  { name: 'random', description: 'A random theme' },
  { name: 'surprise', description: 'A brand-new random palette' },
  { name: 'custom', description: 'Make a theme from a #hex color' },
  { name: 'save', description: 'Keep the current custom color as a palette' },
  { name: 'delete', description: 'Remove a saved palette' },
  { name: 'favorite', description: 'Star or unstar a theme' },
  { name: 'undo', description: 'Back to the theme before' },
  { name: 'scene', description: 'Pick the animated background' },
  { name: 'glow', description: 'Light that follows your mouse' },
  { name: 'auto', description: 'Themes by time, day or season' },
  { name: 'contrast', description: 'Stronger borders' },
  { name: 'code', description: 'Matching code colors' },
  { name: 'sound', description: 'Sounds on or off' },
  { name: 'help', description: 'Every command' },
  // bundle-only:start
  { name: 'bar', description: 'Ambient bar on or off' },
  { name: 'clock', description: 'Clock in the bar' },
  { name: 'quote', description: 'Daily quote in the bar' },
  { name: 'focus', description: 'Start a focus timer' },
  { name: 'break', description: 'Break length' },
  { name: 'spinner', description: 'Themed thinking spinners' },
  { name: 'prompt', description: 'Prompt highlighting style' },
  { name: 'cards', description: 'Tool card style' },
  { name: 'badges', description: 'Message badge design' },
  { name: 'badge-colors', description: 'Message badge colors' },
  { name: 'sounds', description: 'Sound pack' },
  { name: 'voice', description: 'Spoken "All done!"' },
  { name: 'stats', description: 'Session dashboard' },
  // bundle-only:end
]

function grammar(prefs: Prefs): Grammar {
  const themes = themeChoices()
  const saved = choices(Object.keys(prefs.saved), name => `your palette ${prefs.saved[name] ?? ''}`)
  const listOff = [{ name: 'list', description: 'Show every option' }, { name: 'off', description: 'Turn off' }]
  return {
    first: [...themes, ...saved, ...SUBCOMMANDS],
    next: {
      scene: [
        { name: 'auto', description: 'Match each theme' },
        { name: 'off', description: 'No scene' },
        ...SCENE_KINDS.filter(k => k !== 'plain').map(k => ({ name: k, description: `${SCENES[k].emoji} ${SCENES[k].label}` })),
      ],
      auto: [
        { name: 'time', description: 'Morning, day, evening and night themes' },
        { name: 'daily', description: 'A new theme every day' },
        { name: 'season', description: 'Spring, summer, autumn and winter' },
        { name: 'off', description: 'Back to your own pick' },
      ],
      glow: ON_OFF,
      contrast: ON_OFF,
      code: ON_OFF,
      sound: ON_OFF,
      favorite: themes,
      delete: saved,
      // bundle-only:start
      bar: ON_OFF,
      clock: [...ON_OFF, { name: '12h', description: '9:42 PM' }, { name: '24h', description: '21:42' }],
      quote: [...ON_OFF, { name: 'next', description: 'Show another quote' }],
      focus: choices(['15', '25', '45', '50', '90', 'pause', 'stop', 'status'], n => (/^\d/.test(n) ? `${n} minute focus` : undefined)),
      break: choices(['5', '10', '15'], n => `${n} minute breaks`),
      spinner: [...choices(SPINNER_NAMES, n => (n === 'auto' ? 'Match the theme' : `${SPINNERS[n]?.verbs[0] ?? ''}${SPINNERS[n]?.suffix ?? ''}`)), ...listOff],
      prompt: [...choices(Object.keys(PROMPT_STYLES)), ...listOff],
      cards: [...choices(Object.keys(CARD_STYLES), n => `${CARD_STYLES[n]?.border ?? ''} border`), ...listOff],
      badges: [...choices(BADGE_NAMES, n => (n === 'auto' ? 'Match the theme' : `${BADGES[n]?.you ?? ''} · ${BADGES[n]?.claude ?? ''}`)), ...listOff],
      'badge-colors': [...choices(BADGE_COLOR_NAMES, n => (n === 'auto' ? 'Match the theme' : n === 'design' ? "The design's own colors" : undefined)), ...listOff],
      sounds: [...choices(['classic', ...Object.keys(SOUND_PACKS)]), ...listOff],
      voice: [...ON_OFF, ...choices(['Samantha', 'Daniel', 'Karen', 'Moira', 'Tessa', 'Alex'], () => 'A Mac voice')],
      // bundle-only:end
    },
  }
}
const PANE = 'color-themes'
const NAMES = Object.keys(THEMES)
const AUTO_MODES: AutoMode[] = ['off', 'time', 'daily', 'season']
const SPECIAL_TABS = ['Favorites', 'Recent', 'My palettes']


// Kept for the session (and redrawn on change); persisted in $.store.
const prefsAtom = atom({ plugin: 'olive-theme', key: 'prefs' } as const, DEFAULTS, { shape: 'prefs-1' })
const tabAtom = atom({ plugin: 'olive-theme', key: 'tab' } as const, 'Favorites')

// What the auto timer last applied, so it only repaints on a change.
let lastApplied = ''

// ---------- helpers ----------

function isSceneKind(value: string): value is SceneKind {
  return (SCENE_KINDS as string[]).includes(value)
}

/** A theme's name as people see it, using a saved palette's name if there is one. */
function displayName(prefs: Prefs, theme: string): string {
  if (HEX.test(theme)) {
    const saved = Object.entries(prefs.saved).find(([, hex]) => hex === theme)
    if (saved !== undefined) return `${saved[0]} (${theme})`
  }
  return titleOf(theme)
}

function sceneOf(prefs: Prefs, theme: string): SceneKind | undefined {
  if (prefs.scene === 'off') return prefs.glow ? 'plain' : undefined
  if (isSceneKind(prefs.scene)) return prefs.scene
  return sceneFor(theme, hueSatOf(theme)[0])
}

function sceneLabel(prefs: Prefs): string {
  if (prefs.scene === 'off') return 'off'
  if (isSceneKind(prefs.scene)) return `${SCENES[prefs.scene].emoji} ${prefs.scene}`
  return 'auto'
}

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  return {
    r: parseInt(hex.slice(1, 3), 16) / 255,
    g: parseInt(hex.slice(3, 5), 16) / 255,
    b: parseInt(hex.slice(5, 7), 16) / 255,
  }
}

/** Local hour, month and day of the year, from the Mac's own clock. */
async function localTime($: Engine): Promise<{ hour: number; month: number; day: string }> {
  try {
    const { exitCode, stdout } = await $.process.run(['date', '+%H %m %Y%m%d'], { timeoutMs: 5000 })
    const [h, m, d] = stdout.trim().split(' ')
    if (exitCode === 0 && h !== undefined && m !== undefined && d !== undefined) {
      return { hour: Number(h), month: Number(m), day: d }
    }
  } catch {
    // Fall through to the module's own clock.
  }
  const now = new Date(await $.clock.now())
  const day = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`
  return { hour: now.getHours(), month: now.getMonth() + 1, day }
}

/** The theme to show now: the person's pick, or what an auto mode chooses. */
async function effective($: Engine, prefs: Prefs): Promise<{ theme: string; scheme?: 'light' | 'dark'; why?: string }> {
  if (prefs.auto === 'off') return { theme: prefs.theme }
  const { hour, month, day } = await localTime($)
  if (prefs.auto === 'time') {
    if (hour >= 5 && hour < 11) return { theme: 'matcha-latte', scheme: 'light', why: 'morning' }
    if (hour >= 11 && hour < 17) return { theme: 'coastal', scheme: 'light', why: 'afternoon' }
    if (hour >= 17 && hour < 21) return { theme: 'golden-hour', scheme: 'dark', why: 'evening' }
    return { theme: 'midnight-navy', scheme: 'dark', why: 'night' }
  }
  if (prefs.auto === 'daily') {
    let hash = 0
    for (const ch of day) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0
    return { theme: NAMES[hash % NAMES.length] ?? 'olive', why: 'theme of the day' }
  }
  if (month >= 3 && month <= 5) return { theme: 'sakura', why: 'spring' }
  if (month >= 6 && month <= 8) return { theme: 'tropical', why: 'summer' }
  if (month >= 9 && month <= 11) return { theme: 'autumn-leaf', why: 'autumn' }
  return { theme: 'nordic-frost', why: 'winter' }
}

/** Paints the app from the preferences. Answers a problem, or undefined. */
async function apply($: Engine, prefs: Prefs): Promise<string | undefined> {
  const now = await effective($, prefs)
  const { theme, problems } = makeColors(fullDefinition(now.theme, { contrast: prefs.contrast, code: prefs.code }))
  const unpainted = problems.find(line => line.startsWith("Desktop won't paint"))
  if (unpainted !== undefined) return unpainted

  const kind = sceneOf(prefs, now.theme)
  const key = HEX.test(now.theme) ? `x${now.theme.slice(1).toLowerCase()}` : now.theme
  const look: ThemeSetArgs = {
    colors: theme,
    ...(kind !== undefined ? { backdrop: { scene: `${kind}--${key}${prefs.glow ? '--g' : ''}` } } : {}),
    ...(now.scheme !== undefined ? { overrideColorScheme: now.scheme } : {}),
  }
  const set = await $.theme.set(look)
  lastApplied = `${now.theme}|${now.scheme ?? ''}`

  const emoji = kind !== undefined ? SCENES[kind].emoji : '🎨'
  const auto = now.why !== undefined ? ` · auto: ${now.why}` : ''
  $.ui.status(set.isDrawn ? `${emoji} ${displayName(prefs, now.theme)}${auto}` : set.reason)
  return undefined
}

/** Changes the preferences, saves them, and repaints. */
async function change($: Engine, fn: (prefs: Prefs) => Prefs): Promise<{ prefs: Prefs; problem?: string }> {
  const prefs = await update($, prefsAtom, p => fn({ ...DEFAULTS, ...p }))
  await $.store.set('prefs', prefs)
  const problem = await apply($, prefs)
  return { prefs, problem }
}

/** Switches to a theme by hand, which turns auto mode off. */
function choose($: Engine, theme: string): ReturnType<typeof change> {
  return change($, p => ({
    ...p,
    previous: p.theme,
    theme,
    auto: 'off',
    recent: [theme, ...p.recent.filter(t => t !== theme)].slice(0, 12),
  }))
}

function toggleFavorite($: Engine, theme: string): ReturnType<typeof change> {
  return change($, p => ({
    ...p,
    favorites: p.favorites.includes(theme) ? p.favorites.filter(t => t !== theme) : [...p.favorites, theme],
  }))
}

function cycle<T>(list: readonly T[], current: T): T {
  return list[(list.indexOf(current) + 1) % list.length] ?? current
}

function randomOther(current: string): string {
  const others = NAMES.filter(n => n !== current)
  return others[Math.floor(Math.random() * others.length)] ?? 'olive'
}

/** A theme name, a saved palette, or a hex color typed by the person. */
function resolveTheme(prefs: Prefs, raw: string): string | undefined {
  const name = raw.trim().toLowerCase().replace(/^custom\s+/, '').replace(/\s+/g, '-')
  if (name in THEMES) return name
  if (/^#?[0-9a-f]{6}$/.test(name)) return name.startsWith('#') ? name : `#${name}`
  const saved = Object.entries(prefs.saved).find(([n]) => n.toLowerCase().replace(/\s+/g, '-') === name)
  return saved?.[1]
}

const onOff = (value: string | undefined, current: boolean): boolean =>
  value === 'on' ? true : value === 'off' ? false : !current

const HELP = [
  'Commands:',
  '  /colors panel              open the theme picker panel',
  '  /colors <name>             switch theme (try sakura, tokyo neon, golden hour)',
  '  /colors custom #ff6b6b     make a theme from any color',
  '  /colors random             a random theme',
  '  /colors surprise           a brand-new random palette',
  '  /colors save <name>        keep the current custom color as a palette',
  '  /colors delete <name>      remove a saved palette',
  '  /colors favorite           star or unstar the current theme',
  '  /colors undo               go back to the theme before',
  `  /colors scene <auto|off|${SCENE_KINDS.filter(k => k !== 'plain').join('|')}>`,
  '  /colors glow on|off        light that follows your mouse',
  '  /colors auto time|daily|season|off',
  '  /colors contrast on|off    stronger borders',
  '  /colors code on|off        matching code highlighting',
  '  /colors sound on|off       a chime when a long task finishes',
  // bundle-only:start
  '',
  'Ambient bar (above the prompt):',
  '  /colors bar on|off         show or hide the bar',
  '  /colors clock on|off|12h|24h',
  '  /colors quote on|off|next',
  '  /colors focus [minutes]    start a focus timer (default 25)',
  '  /colors focus pause|stop|status',
  '  /colors break <minutes>    break length (default 5)',
  '',
  'Style extras (add "list" to see all, "off" to turn off):',
  `  /colors spinner <name>     ${Object.keys(SPINNERS).length} spinners, or auto to match the theme`,
  `  /colors prompt <name>      ${Object.keys(PROMPT_STYLES).length} prompt highlighting styles`,
  `  /colors cards <name>       ${Object.keys(CARD_STYLES).length} tool card styles`,
  `  /colors badges <name>      ${Object.keys(BADGES).length} message badge designs, or auto to match the theme`,
  `  /colors badge-colors <set> ${Object.keys(BADGE_COLORS).length} badge color sets, auto (theme) or design`,
  `  /colors sounds <name>      ${Object.keys(SOUND_PACKS).length} sound packs`,
  '  /colors voice on|off|<Mac voice name>',
  '  /colors stats              session dashboard',
  // bundle-only:end
].join('\n')

// bundle-only:start
const EXTRA_KEYS = {
  spinner: [...SPINNER_NAMES, 'off'],
  prompt: [...Object.keys(PROMPT_STYLES), 'off'],
  cards: [...Object.keys(CARD_STYLES), 'off'],
  badges: [...BADGE_NAMES, 'off'],
  badgeColors: BADGE_COLOR_NAMES,
  sounds: ['classic', ...Object.keys(SOUND_PACKS), 'off'],
}
// bundle-only:end

function listing(prefs: Prefs): string {
  return [
    `Now: ${displayName(prefs, prefs.theme)} · scene: ${sceneLabel(prefs)} · glow: ${prefs.glow ? 'on' : 'off'} · auto: ${prefs.auto}`,
    `${NAMES.length} themes. Type /colors panel to pick by sight.`,
    '',
    ...Object.entries(GROUPS).map(([group, themes]) => `${group}: ${Object.keys(themes).join(', ')}`),
    ...(Object.keys(prefs.saved).length > 0 ? [`My palettes: ${Object.keys(prefs.saved).join(', ')}`] : []),
    '',
    HELP,
  ].join('\n')
}

// ---------- hooks ----------

// bundle-only:start
const BAR = {
  themeLabel: (prefs: Prefs) => {
    const shown = lastApplied.split('|')[0] || prefs.theme
    const kind = sceneOf(prefs, shown)
    return `${kind !== undefined ? SCENES[kind].emoji : '🎨'} ${displayName(prefs, shown)}${prefs.auto !== 'off' ? ' · auto' : ''}`
  },
}
// bundle-only:end

export const register: Register = on => {
  // bundle-only:start
  registerBar(on, BAR)
  registerSpinners(on, theme => sceneOf(DEFAULTS, theme))
  registerPromptColors(on)
  registerCards(on)
  registerBadges(on, prefs => {
    const kind = sceneOf(prefs, prefs.theme)
    const [hue] = hueSatOf(prefs.theme)
    return { emoji: kind !== undefined ? SCENES[kind].emoji : '✦', you: hsl((hue + 180) % 360, 60, 68), claude: paletteFor(prefs.theme).glow }
  })
  registerStats(on)
  registerMenu(on)

  // One hook per event: stats and sounds share these.
  on('tool.call', async ($, e, next) => {
    if (e.tool === 'AskUserQuestion') void playEvent($, 'ask', 'I have a question for you.')
    const result = await next(e)
    await recordTool($, e, result)
    if ('isError' in result && result.isError === true) void playEvent($, 'error')
    return result
  })
  on('turn.complete', async ($, e, next) => {
    const result = await next(e)
    await recordTurn($, e)
    if (e.agentId === undefined && !e.isAborted && e.durationMs > 20_000) await playEvent($, 'done', doneLine(e.turnId))
    return result
  })
  // bundle-only:end

  on('session.start', async ($, e, next) => {
    await $.command.register({
      name: 'colors',
      description: `${NAMES.length} color themes, animated scenes, a picker panel and custom colors`,
      argumentHint: 'panel | <name> | custom #hex | scene | auto | help',
    })

    // Load what was saved, including the single theme an older version kept.
    const stored = await $.store.get('prefs')
    const legacy = await $.store.get('theme')
    const base: Prefs =
      stored !== null && typeof stored === 'object' ? { ...DEFAULTS, ...(stored as Partial<Prefs>) } : { ...DEFAULTS }
    if (stored === undefined && typeof legacy === 'string' && (legacy in THEMES || HEX.test(legacy))) {
      base.theme = legacy
    }
    const prefs = await update($, prefsAtom, () => base)
    const problem = await apply($, prefs)
    if (problem !== undefined) $.ui.status(problem)

    await startBar($, BAR) // bundle-only

    // Auto themes follow the clock: check every minute, repaint on a change.
    $.clock.every(60_000, () => {
      void (async () => {
        const current = await read($, prefsAtom)
        if (current.auto === 'off') return
        const now = await effective($, current)
        if (`${now.theme}|${now.scheme ?? ''}` !== lastApplied) await apply($, current)
      })()
    })

    return next(e)
  })

  // As each letter is typed after /colors, the list narrows to matching names.
  on('prompt.autocomplete', async ($, e, next) => {
    if (!/^\s*\/colors\s/.test(e.text)) return next(e)
    const prefs = await read($, prefsAtom)
    const mine = suggest(e, 'colors', grammar(prefs))
    if (mine === undefined) return next(e)
    const theirs = await next(e)
    return { suggestions: [...theirs.suggestions, ...mine] }
  })

  on('command.run', { command: 'colors' }, async ($, e) => {
    const prefs = await read($, prefsAtom)
    const words = e.args.trim().split(/\s+/).filter(w => w !== '')
    const sub = (words[0] ?? '').toLowerCase()
    const rest = words.slice(1).join(' ')
    const arg = words[1]?.toLowerCase()

    const done = (result: { problem?: string }, text: string) =>
      result.problem !== undefined ? { text: `That couldn't be painted: ${result.problem}` } : { text }

    switch (sub) {
      case '':
      case 'list':
      case 'help':
        return { text: listing(prefs) }
      case 'panel':
      case 'open':
      case 'picker': {
        const opened = await $.ui.open({ id: PANE, title: '🎨 Color themes' })
        return { text: opened.isPlaced ? 'Theme picker opened.' : 'The picker panel opens in the desktop app or a fullscreen terminal.' }
      }
      case 'random': {
        const theme = randomOther(prefs.theme)
        $.ui.toast(`🎲 ${titleOf(theme)}`)
        return done(await choose($, theme), `Switched to ${titleOf(theme)}.`)
      }
      case 'surprise': {
        const hex = surpriseColor()
        $.ui.toast(`✨ ${hex}`)
        return done(await choose($, hex), `Surprise palette ${hex}. Like it? Keep it with /colors save <name>.`)
      }
      case 'save': {
        if (rest === '') return { text: 'Give it a name: /colors save my-favorite' }
        if (!HEX.test(prefs.theme)) return { text: `${titleOf(prefs.theme)} is already built in. Save works for custom and surprise colors.` }
        const hex = prefs.theme
        await change($, p => ({ ...p, saved: { ...p.saved, [rest]: hex } }))
        return { text: `Saved ${hex} as "${rest}". Switch back any time with /colors ${rest}.` }
      }
      case 'delete': {
        const name = Object.keys(prefs.saved).find(n => n.toLowerCase() === rest.toLowerCase())
        if (name === undefined) return { text: `No saved palette named "${rest}".` }
        await change($, p => {
          const saved = { ...p.saved }
          delete saved[name]
          return { ...p, saved }
        })
        return { text: `Deleted "${name}".` }
      }
      case 'favorite':
      case 'fav':
      case 'star': {
        const theme = rest === '' ? prefs.theme : resolveTheme(prefs, rest)
        if (theme === undefined) return { text: `No theme named "${rest}".` }
        const { prefs: after } = await toggleFavorite($, theme)
        return { text: after.favorites.includes(theme) ? `★ Added ${titleOf(theme)} to favorites.` : `Removed ${titleOf(theme)} from favorites.` }
      }
      case 'undo': {
        if (prefs.previous === undefined) return { text: 'Nothing to undo yet.' }
        return done(await choose($, prefs.previous), `Back to ${displayName(prefs, prefs.previous)}.`)
      }
      case 'scene': {
        const kind = arg ?? cycle(['auto', 'off', ...SCENE_KINDS.filter(k => k !== 'plain')], prefs.scene)
        if (kind !== 'auto' && kind !== 'off' && !isSceneKind(kind)) {
          return { text: `Scenes: auto, off, ${SCENE_KINDS.filter(k => k !== 'plain').join(', ')}.` }
        }
        await change($, p => ({ ...p, scene: kind }))
        return { text: kind === 'auto' ? 'Scene: matched to each theme.' : kind === 'off' ? 'Scene off.' : `Scene: ${SCENES[kind].emoji} ${SCENES[kind].label}.` }
      }
      case 'glow': {
        const { prefs: after } = await change($, p => ({ ...p, glow: onOff(arg, p.glow) }))
        return { text: `Mouse glow ${after.glow ? 'on' : 'off'}.` }
      }
      case 'contrast': {
        const { prefs: after } = await change($, p => ({ ...p, contrast: onOff(arg, p.contrast) }))
        return { text: `High contrast ${after.contrast ? 'on' : 'off'}.` }
      }
      case 'code': {
        const { prefs: after } = await change($, p => ({ ...p, code: onOff(arg, p.code) }))
        return { text: `Matching code colors ${after.code ? 'on' : 'off'}.` }
      }
      case 'sound': {
        const { prefs: after } = await change($, p => ({ ...p, sound: onOff(arg, p.sound) }))
        if (after.sound) void $.audio.play({ asset: 'sounds/chime.wav' }).catch(() => undefined)
        return { text: `Finish chime ${after.sound ? 'on' : 'off'}.` }
      }
      // bundle-only:start
      case 'bar':
      case 'clock':
      case 'quote':
      case 'quotes':
      case 'focus':
      case 'pomodoro':
      case 'timer':
      case 'break':
        return { text: await barCommand($, sub, arg) }
      case 'spinner':
      case 'spinners':
        return { text: await spinnerCommand($, arg) }
      case 'prompt':
      case 'typing':
        return { text: await promptCommand($, arg) }
      case 'cards':
      case 'tools':
        return { text: await cardsCommand($, arg) }
      case 'badges':
      case 'messages':
        return { text: await badgesCommand($, arg) }
      case 'badge-colors':
      case 'badgecolors':
        return { text: await badgeColorsCommand($, arg) }
      case 'sounds':
      case 'pack':
        return { text: await soundsCommand($, 'sounds', arg, rest) }
      case 'voice':
        return { text: await soundsCommand($, 'voice', arg, rest, '/colors voice') }
      case 'stats':
      case 'dashboard':
        return { text: await statsCommand($) }
      // bundle-only:end
      case 'auto': {
        const mode = (arg ?? cycle(AUTO_MODES, prefs.auto)) as AutoMode
        if (!AUTO_MODES.includes(mode)) return { text: 'Auto modes: time, daily, season, off.' }
        await change($, p => ({ ...p, auto: mode }))
        const labels: Record<AutoMode, string> = {
          off: 'Auto themes off. Your own pick is back.',
          time: 'Auto: fresh pastels in the morning, coastal blue by day, golden hour in the evening, midnight navy at night.',
          daily: 'Auto: a new theme every day.',
          season: 'Auto: sakura in spring, tropical in summer, autumn leaves in fall, nordic frost in winter.',
        }
        return { text: labels[mode] }
      }
      default: {
        const theme = resolveTheme(prefs, e.args)
        if (theme === undefined) {
          const typed = e.args.trim().toLowerCase()
          if (typed.startsWith('#') || typed.startsWith('custom')) {
            return { text: `"${e.args.trim()}" isn't a valid color. Use six hex digits, like /colors custom #ff6b6b.` }
          }
          const first = typed.split(/[\s-]/)[0] ?? typed
          const close = NAMES.filter(n => n.includes(first)).slice(0, 8)
          return { text: `No theme named "${typed}".${close.length > 0 ? ` Did you mean: ${close.join(', ')}?` : ''} Type /colors to see them all.` }
        }
        $.ui.toast(`Theme: ${displayName(prefs, theme)}`)
        return done(await choose($, theme), `Switched to ${displayName(prefs, theme)}.`)
      }
    }
  })

  // The animated scene behind the conversation.
  on('ui.render', { component: 'Backdrop' }, ($, e, next) => {
    if (e.surface !== 'desktop' && e.surface !== 'mobile') return next(e)
    if (e.props.plugin !== PLUGIN) return next(e)
    const [kind, key, glow] = e.props.scene.split('--')
    if (kind === undefined || key === undefined || !isSceneKind(kind)) return next(e)
    const theme = /^x[0-9a-f]{6}$/.test(key) ? `#${key.slice(1)}` : key
    const palette = paletteFor(theme)
    const { Svg, Shader } = $.ui.resolve(e)
    const art = <Svg source={sceneSvg(kind, theme, palette)} alt={SCENES[kind].label} isInteractive />
    if (glow === 'g' && e.surface === 'desktop') {
      return (
        <Shader module="./glow.ts" values={hexToRgb(palette.glow)}>
          {art}
        </Shader>
      )
    }
    return art
  })

  // The theme picker panel.
  on('ui.render', { component: 'Pane', requestId: PANE }, async ($, e) => {
    const { Box, Text, Button } = $.ui.resolve(e)
    const prefs = await read($, prefsAtom)
    const tab = await read($, tabAtom)
    const tabs = [...SPECIAL_TABS, ...Object.keys(GROUPS)]
    const list =
      tab === 'Favorites'
        ? prefs.favorites
        : tab === 'Recent'
          ? prefs.recent
          : tab === 'My palettes'
            ? Object.values(prefs.saved)
            : Object.keys(GROUPS[tab] ?? {})
    const empty: Record<string, string> = {
      Favorites: 'No favorites yet. Tap ☆ next to any theme.',
      Recent: 'Themes you pick show up here.',
      'My palettes': 'Try ✨ Surprise, then /colors save <name> to keep one.',
    }
    const kind = sceneOf(prefs, prefs.theme)

    return (
      <Box flexDirection="column" gap={1}>
        <Box flexDirection="column">
          <Text bold>
            {kind !== undefined ? SCENES[kind].emoji : '🎨'} {displayName(prefs, prefs.theme)}
          </Text>
          <Text dimColor>
            {prefs.auto !== 'off' ? `Auto mode: ${prefs.auto}. Picking a theme turns it off.` : 'Tap a theme to switch. ☆ adds it to favorites.'}
          </Text>
        </Box>

        <Box flexDirection="row" flexWrap="wrap" columnGap={1} rowGap={1}>
          <Button key="random" onPress={() => void choose($, randomOther(prefs.theme))}>🎲 Random</Button>
          <Button key="surprise" onPress={() => void choose($, surpriseColor())}>✨ Surprise</Button>
          <Button key="undo" onPress={() => void (prefs.previous !== undefined ? choose($, prefs.previous) : undefined)}>↩ Undo</Button>
          <Button key="fav-current" onPress={() => void toggleFavorite($, prefs.theme)}>
            {prefs.favorites.includes(prefs.theme) ? '★ Favorited' : '☆ Favorite'}
          </Button>
        </Box>

        <Box flexDirection="row" flexWrap="wrap" columnGap={1} rowGap={1}>
          <Button key="scene" onPress={() => void change($, p => ({ ...p, scene: cycle(['auto', 'off', ...SCENE_KINDS.filter(k => k !== 'plain')], p.scene) }))}>
            Scene: {sceneLabel(prefs)}
          </Button>
          <Button key="glow" onPress={() => void change($, p => ({ ...p, glow: !p.glow }))}>Glow: {prefs.glow ? 'on' : 'off'}</Button>
          <Button key="auto" onPress={() => void change($, p => ({ ...p, auto: cycle(AUTO_MODES, p.auto) }))}>Auto: {prefs.auto}</Button>
          <Button key="contrast" onPress={() => void change($, p => ({ ...p, contrast: !p.contrast }))}>Contrast: {prefs.contrast ? 'high' : 'normal'}</Button>
          <Button key="code" onPress={() => void change($, p => ({ ...p, code: !p.code }))}>Code colors: {prefs.code ? 'on' : 'off'}</Button>
          <Button key="sound" onPress={() => void change($, p => ({ ...p, sound: !p.sound }))}>Chime: {prefs.sound ? 'on' : 'off'}</Button>
        </Box>

        {/* bundle-only:start */}
        <Box flexDirection="row" flexWrap="wrap" columnGap={1} rowGap={1}>
          <Button key="bar" onPress={() => void change($, p => ({ ...p, bar: !p.bar }))}>Bar: {prefs.bar ? 'on' : 'off'}</Button>
          <Button key="clock" onPress={() => void change($, p => ({ ...p, clock: !p.clock }))}>Clock: {prefs.clock ? 'on' : 'off'}</Button>
          <Button key="hour12" onPress={() => void change($, p => ({ ...p, hour12: !p.hour12 }))}>{prefs.hour12 ? '12-hour' : '24-hour'}</Button>
          <Button key="quote" onPress={() => void change($, p => ({ ...p, quote: !p.quote }))}>Quote: {prefs.quote ? 'on' : 'off'}</Button>
          <Button key="focus" onPress={() => void startFocus($, prefs)}>🍅 Start {String(prefs.focusMin)}m focus</Button>
        </Box>

        <Box flexDirection="row" flexWrap="wrap" columnGap={1} rowGap={1}>
          <Button key="x-spinner" onPress={() => void change($, p => ({ ...p, spinner: cycle(EXTRA_KEYS.spinner, p.spinner) }))}>⏳ Spinner: {prefs.spinner}</Button>
          <Button key="x-prompt" onPress={() => void change($, p => ({ ...p, prompt: cycle(EXTRA_KEYS.prompt, p.prompt) }))}>⌨️ Prompt: {prefs.prompt}</Button>
          <Button key="x-cards" onPress={() => void change($, p => ({ ...p, cards: cycle(EXTRA_KEYS.cards, p.cards) }))}>🧰 Cards: {prefs.cards}</Button>
          <Button key="x-badges" onPress={() => void change($, p => ({ ...p, badges: cycle(EXTRA_KEYS.badges, p.badges) }))}>💬 Badges: {prefs.badges}</Button>
          <Button key="x-badge-colors" onPress={() => void change($, p => ({ ...p, badgeColors: cycle(EXTRA_KEYS.badgeColors, p.badgeColors) }))}>🎨 Badge colors: {prefs.badgeColors}</Button>
          <Button key="x-sounds" onPress={() => void change($, p => ({ ...p, sounds: cycle(EXTRA_KEYS.sounds, p.sounds) }))}>🔔 Sounds: {prefs.sounds}</Button>
          <Button key="x-voice" onPress={() => void change($, p => ({ ...p, voice: !p.voice }))}>🗣️ Voice: {prefs.voice ? 'on' : 'off'}</Button>
          <Button key="x-stats" onPress={() => void $.ui.open({ id: 'session-stats', title: '📊 Session stats' })}>📊 Stats</Button>
        </Box>
        {/* bundle-only:end */}

        <Box flexDirection="row" flexWrap="wrap" columnGap={1} rowGap={1}>
          {tabs.map(t => (
            <Button key={`tab-${t}`} variant={t === tab ? 'primary' : 'secondary'} onPress={() => void update($, tabAtom, () => t)}>
              {t}
            </Button>
          ))}
        </Box>

        <Box flexDirection="column">
          {list.length === 0 ? <Text dimColor>{empty[tab] ?? 'Nothing here yet.'}</Text> : null}
          {list.map(theme => (
            <Box key={`row-${theme}`} flexDirection="row" columnGap={1}>
              <Button key={`star-${theme}`} plain onPress={() => void toggleFavorite($, theme)}>
                {prefs.favorites.includes(theme) ? '★' : '☆'}
              </Button>
              <Button key={`pick-${theme}`} plain onPress={() => void choose($, theme)}>
                <Text color={paletteFor(theme).glow}>●</Text>
                <Text color={paletteFor(theme).accent}>●</Text> {displayName(prefs, theme)}
                {theme === prefs.theme ? ' ✓' : ''}
              </Button>
            </Box>
          ))}
        </Box>
      </Box>
    )
  })
}
