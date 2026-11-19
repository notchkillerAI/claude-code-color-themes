import { atom, read } from 'claude-code'
import type { EngineInterface as Engine, On } from 'claude-code'

import { DEFAULTS } from './defaults.js'
import { hash, pickFrom } from './prefs.js'

const prefsAtom = atom({ plugin: 'olive-theme', key: 'prefs' } as const, DEFAULTS, { shape: 'prefs-1' })

// ---------- spinners: a verb set and a trailing mark each ----------

type Spinner = { suffix: string; verbs: string[]; done: string }
const v = (s: string) => s.split(' ').map(w => w.replace(/_/g, ' '))

export const SPINNERS: Record<string, Spinner> = {
  sparkle: { suffix: ' ✨', verbs: v('Sparkling Polishing Shimmering Glittering Dazzling'), done: 'Sparkled' },
  coffee: { suffix: ' ☕', verbs: v('Brewing Steeping Percolating Frothing Grinding'), done: 'Brewed' },
  tea: { suffix: ' 🍵', verbs: v('Whisking Steeping Pouring Sipping Infusing'), done: 'Steeped' },
  space: { suffix: ' 🚀', verbs: v('Launching Orbiting Warping Docking Stargazing'), done: 'Landed' },
  synthwave: { suffix: ' 🌆', verbs: v('Cruising Synthesizing Neon-glowing Night-driving Arpeggiating'), done: 'Cruised' },
  psych: { suffix: ' 🌀', verbs: v('Swirling Kaleidoscoping Drifting Melting Tripping_out'), done: 'Swirled' },
  shootingstar: { suffix: ' 🌠', verbs: v('Wishing Streaking Shooting Twinkling Soaring'), done: 'Wished' },
  ocean: { suffix: ' 🌊', verbs: v('Surfing Diving Drifting Riding_waves Snorkeling'), done: 'Surfed' },
  forest: { suffix: ' 🌿', verbs: v('Growing Sprouting Blooming Rooting Foraging'), done: 'Grew' },
  sakura: { suffix: ' 🌸', verbs: v('Blossoming Petal-falling Blooming Drifting Fluttering'), done: 'Bloomed' },
  autumn: { suffix: ' 🍂', verbs: v('Raking Rustling Harvesting Crunching Cozying'), done: 'Harvested' },
  winter: { suffix: ' ❄️', verbs: v('Snowing Frosting Gliding Sledding Bundling_up'), done: 'Frosted' },
  baking: { suffix: ' 🧁', verbs: v('Baking Whisking Kneading Frosting Sprinkling'), done: 'Baked' },
  cooking: { suffix: ' 🍳', verbs: v('Sauteing Simmering Seasoning Plating Stirring'), done: 'Cooked' },
  music: { suffix: ' 🎵', verbs: v('Jamming Remixing Harmonizing Dropping_beats Tuning'), done: 'Jammed' },
  lofi: { suffix: ' 🎧', verbs: v('Vibing Chilling Looping Lo-fi-ing Daydreaming'), done: 'Vibed' },
  gaming: { suffix: ' 🎮', verbs: v('Leveling_up Grinding Speedrunning Questing Respawning'), done: 'Cleared' },
  magic: { suffix: ' 🪄', verbs: v('Conjuring Enchanting Spellcasting Transmuting Summoning'), done: 'Conjured' },
  robot: { suffix: ' 🤖', verbs: v('Computing Processing Beep-booping Calibrating Optimizing'), done: 'Computed' },
  science: { suffix: ' 🧪', verbs: v('Experimenting Hypothesizing Distilling Analyzing Synthesizing'), done: 'Discovered' },
  cat: { suffix: ' 🐱', verbs: v('Purring Pouncing Napping Kneading Zooming'), done: 'Purred' },
  dog: { suffix: ' 🐶', verbs: v('Fetching Sniffing Wagging Zooming Digging'), done: 'Fetched' },
  ninja: { suffix: ' 🥷', verbs: v('Sneaking Slicing Shadow-stepping Dashing Vanishing'), done: 'Sliced' },
  pirate: { suffix: ' 🏴‍☠️', verbs: v('Sailing Plundering Charting Hoisting Navigating'), done: 'Plundered' },
  garden: { suffix: ' 🌻', verbs: v('Planting Watering Pruning Blooming Composting'), done: 'Planted' },
  zen: { suffix: ' 🧘', verbs: v('Breathing Centering Meditating Flowing Balancing'), done: 'Centered' },
  dots: { suffix: ' ···', verbs: v('Thinking Working Crafting Building Considering'), done: 'Finished' },
}

/** The spinner pack that suits a theme, for spinner: auto. */
export function spinnerFor(theme: string, scene: string | undefined): string {
  const byScene: Record<string, string> = {
    petals: 'sakura', leaves: 'autumn', snow: 'winter', stars: 'space', aurora: 'space', waves: 'ocean', rain: 'lofi',
    fireflies: 'forest', sunset: 'tea', bubbles: 'ocean', grid: 'synthwave', lanterns: 'tea', coderain: 'robot',
    confetti: 'baking', hearts: 'sparkle', crystals: 'magic', clouds: 'coffee', psychflow: 'psych', shootingstars: 'shootingstar',
    lavalamp: 'psych', mesh: 'sparkle', warp: 'space', bokeh: 'music', orbits: 'space', equalizer: 'music', ripples: 'zen', contours: 'garden',
  }
  return byScene[scene ?? ''] ?? (theme.length % 2 === 0 ? 'sparkle' : 'dots')
}

export const SPINNER_NAMES = ['auto', ...Object.keys(SPINNERS)]

export async function spinnerCommand($: Engine, arg: string | undefined, usage = '/colors spinner'): Promise<string> {
  return (await pickFrom($, 'Spinner', Object.keys(SPINNERS), 'spinner', arg, usage, ['auto'])).text
}

/** Themed spinner words. `sceneOf` names the current scene, for spinner: auto. */
export function registerSpinners(on: On, sceneOf: (theme: string) => string | undefined): void {
  on('ui.render', { component: 'Spinner' }, async ($, e, next) => {
    const prefs = await read($, prefsAtom)
    if (prefs.spinner === 'off') return next(e)
    const name = prefs.spinner === 'auto' ? spinnerFor(prefs.theme, sceneOf(prefs.theme)) : prefs.spinner
    const pack = SPINNERS[name]
    if (pack === undefined) return next(e)
    const keepStep = e.surface === 'desktop' && e.props.word !== 'Working'
    const word = keepStep ? e.props.word : (pack.verbs[hash(`${e.requestId}${e.props.mode}`) % pack.verbs.length] ?? e.props.word)
    return next({ ...e, props: { ...e.props, word, suffix: pack.suffix } })
  })

  on('ui.render', { component: 'TurnDuration' }, async ($, e, next) => {
    const prefs = await read($, prefsAtom)
    if (prefs.spinner === 'off') return next(e)
    const name = prefs.spinner === 'auto' ? spinnerFor(prefs.theme, sceneOf(prefs.theme)) : prefs.spinner
    const pack = SPINNERS[name]
    return pack === undefined ? next(e) : next({ ...e, props: { ...e.props, word: pack.done } })
  })
}
