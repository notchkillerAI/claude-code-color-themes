import { atom, read } from 'claude-code'
import type { EngineInterface as Engine, On } from 'claude-code'

import type { Prefs } from '../types'
import { DEFAULTS } from './defaults.js'
import { pickFrom } from './prefs.js'

const prefsAtom = atom({ plugin: 'olive-theme', key: 'prefs' } as const, DEFAULTS, { shape: 'prefs-1' })

// Message badges: a design (the icons and words) and a color set, chosen apart,
// so any design can wear any colors, or the current theme's.

type Look = 'text' | 'pill' | 'outline'
type Badge = { you: string; claude: string; youColor: string; claudeColor: string; look: Look }
const b = (you: string, claude: string, youColor: string, claudeColor: string, look: Look = 'text'): Badge => ({ you, claude, youColor, claudeColor, look })

export const BADGES: Record<string, Badge> = {
  classic: b('◆ You', '✦ Claude', '#7fb8e8', '#d78bd8'),
  sparkle: b('✨ You', '🌟 Claude', '#ffd166', '#c86bfa'),
  space: b('👩‍🚀 You', '🛸 Claude', '#29e7ff', '#a35bff'),
  synthwave: b('▶ YOU', '◀ CLAUDE', '#29e7ff', '#ff2fb0'),
  chat: b('💬 You', '🗨️ Claude', '#5fd3e8', '#ff8a65'),
  cozy: b('☕ You', '🍵 Claude', '#cd853f', '#8fbf4a'),
  nature: b('🌱 You', '🌳 Claude', '#8fbf4a', '#5c9e3a'),
  ocean: b('🐚 You', '🐳 Claude', '#5fd3e8', '#2a7fc9'),
  sakura: b('🌷 You', '🌸 Claude', '#f7a1c4', '#e86a92'),
  cats: b('🐱 You', '🦁 Claude', '#ffb347', '#e8a33d'),
  gaming: b('🎮 P1', '👾 P2', '#3effa8', '#ff4fd8'),
  music: b('🎤 You', '🎸 Claude', '#ff6fd8', '#ffe066'),
  magic: b('🧙 You', '🔮 Claude', '#9f8fef', '#c3a6ff'),
  robots: b('🧑‍💻 You', '🤖 Claude', '#7fdbff', '#a0a0a0'),
  royal: b('👑 You', '💎 Claude', '#d4af37', '#7fdbff'),
  minimal: b('— you', '— claude', '#a0a0a0', '#a0a0a0'),
  arrows: b('› you', '» claude', '#88c0d0', '#bd93f9'),
  brackets: b('[you]', '[claude]', '#50fa7b', '#ff79c6'),
  hearts: b('💙 You', '💜 Claude', '#5fa8ff', '#b57edc'),
  weather: b('☀️ You', '🌙 Claude', '#ffd166', '#9f8fef'),
  food: b('🍕 You', '🍜 Claude', '#ff7a45', '#ffd166'),
  sports: b('⚽ You', '🏀 Claude', '#77dd77', '#ff9f1c'),
  // Chip designs: the name sits on a colored pill.
  pill: b(' You ', ' Claude ', '#7fb8e8', '#d78bd8', 'pill'),
  'pill-icons': b(' ◆ You ', ' ✦ Claude ', '#5fd3e8', '#c86bfa', 'pill'),
  'neon-pill': b(' YOU ', ' CLAUDE ', '#29e7ff', '#ff2fb0', 'pill'),
  'sakura-pill': b(' 🌷 you ', ' 🌸 claude ', '#f7a1c4', '#e86a92', 'pill'),
  'mint-pill': b(' you ', ' claude ', '#8ee6c4', '#7fdbff', 'pill'),
  'sunset-pill': b(' ☀ you ', ' ☾ claude ', '#ffb347', '#ff6f91', 'pill'),
  // Outline designs: underlined, quieter.
  underline: b('you', 'claude', '#88c0d0', '#d08770', 'outline'),
  'italic-serif': b('— You', '— Claude', '#c9a227', '#b57edc', 'outline'),
  // More icon pairs.
  stars: b('★ You', '☆ Claude', '#ffd166', '#a59ef0'),
  diamonds: b('◇ You', '◈ Claude', '#7fdbff', '#ff79c6'),
  moon: b('🌑 You', '🌕 Claude', '#9f8fef', '#ffd166'),
  planets: b('🌍 You', '🪐 Claude', '#5fd3e8', '#e8a33d'),
  flowers: b('🌼 You', '🌺 Claude', '#ffd166', '#ff6f91'),
  fruit: b('🍓 You', '🍑 Claude', '#ff6b6b', '#ffb347'),
  boba: b('🧋 You', '🍵 Claude', '#c9a27e', '#8fbf4a'),
  crystal: b('🔷 You', '💜 Claude', '#5fa8ff', '#b57edc'),
  fire: b('🔥 You', '⚡ Claude', '#ff7a45', '#ffe066'),
  surf: b('🏄 You', '🐬 Claude', '#2fbf9f', '#4a9fd6'),
  retro: b('[P1]', '[CPU]', '#00ff41', '#ff2fb0'),
  terminal: b('$ you', '> claude', '#50fa7b', '#8be9fd'),
  kawaii: b('(•‿•) you', '(◕ᴗ◕) claude', '#f7a1c4', '#a59ef0'),
  spooky: b('👻 You', '🎃 Claude', '#d0d0d0', '#ff9f1c'),
  fantasy: b('🐉 You', '🦄 Claude', '#5c9e3a', '#c86bfa'),
  sparkles: b('⋆ you ⋆', '✧ claude ✧', '#ffd6f5', '#c9b8ff'),
  rocket: b('🧑‍🚀 You', '🚀 Claude', '#7fdbff', '#ff7a45'),
  wizard: b('📜 You', '🪄 Claude', '#e0c3a0', '#b57edc'),
}

// Color sets for the badges: [you, claude].
export const BADGE_COLORS: Record<string, [string, string]> = {
  neon: ['#3ef0ff', '#ff4fd8'],
  pastel: ['#7fb8e8', '#e8a0c8'],
  synthwave: ['#29e7ff', '#ff2fb0'],
  ocean: ['#5fd3e8', '#2a7fc9'],
  forest: ['#8fbf4a', '#3f8a5c'],
  sunset: ['#ffb347', '#ff5e7e'],
  candy: ['#7ee8fa', '#ff6ec7'],
  lavender: ['#a59ef0', '#d6a2e8'],
  gold: ['#ffd700', '#d4af37'],
  ice: ['#b3ecff', '#6ca0dc'],
  cherry: ['#f7a1c4', '#d9455f'],
  mint: ['#8ee6c4', '#3effa8'],
  dracula: ['#8be9fd', '#ff79c6'],
  nord: ['#88c0d0', '#b48ead'],
  gruvbox: ['#83a598', '#fe8019'],
  monokai: ['#66d9ef', '#f92672'],
  cyber: ['#00f0ff', '#fcee0a'],
  vapor: ['#01cdfe', '#ff71ce'],
  autumn: ['#daa520', '#b22222'],
  earth: ['#a5a58d', '#cb997e'],
  mono: ['#d0d0d0', '#ffffff'],
  matrix: ['#7dff9a', '#00ff41'],
}

/** Text style for the plugin's own text: the app's own font can't be changed. */
function fontOf(prefs: Prefs): { mono?: boolean; bold?: boolean; italic?: boolean } {
  const f = (prefs as Prefs & { font?: string }).font
  return f === 'mono' ? { mono: true } : f === 'bold' ? { bold: true } : f === 'italic' ? { italic: true } : {}
}
/** What the current theme offers the badges: its scene's emoji and two colors. */
export type ThemeBadge = { emoji: string; you: string; claude: string }

export const BADGE_NAMES = ['auto', ...Object.keys(BADGES)]
export const BADGE_COLOR_NAMES = ['auto', 'design', ...Object.keys(BADGE_COLORS)]

export async function badgesCommand($: Engine, arg: string | undefined, usage = '/colors badges'): Promise<string> {
  return (await pickFrom($, 'Message badges', Object.keys(BADGES), 'badges', arg, usage, ['auto'])).text
}

export async function badgeColorsCommand($: Engine, arg: string | undefined, usage = '/colors badge-colors'): Promise<string> {
  const r = await pickFrom($, 'Badge colors', Object.keys(BADGE_COLORS), 'badgeColors', arg, usage, ['auto', 'design'])
  return r.text.replace('Badge colors: off.', 'Badge colors: off (badges keep their own design colors).')
}

/** The badge to draw now: the design, painted in the chosen colors. */
function resolve(prefs: Prefs, themed: ThemeBadge | undefined): Badge | undefined {
  if (prefs.badges === 'off') return undefined
  const design: Badge | undefined =
    prefs.badges === 'auto'
      ? b(`◆ You`, `${themed?.emoji ?? '✦'} Claude`, themed?.you ?? '#7fb8e8', themed?.claude ?? '#d78bd8')
      : BADGES[prefs.badges]
  if (design === undefined) return undefined
  const pick = prefs.badgeColors ?? 'auto'
  const colors: [string, string] | undefined =
    pick === 'auto' ? (themed !== undefined ? [themed.you, themed.claude] : undefined) : BADGE_COLORS[pick]
  return colors !== undefined ? { ...design, youColor: colors[0], claudeColor: colors[1] } : design
}

/**
 * A small label above your messages and Claude's replies. `themed` reads the
 * current theme for the 'auto' design and colors; it answers undefined where
 * no theme plugin is installed, and the design's own colors are used.
 */
export function registerBadges(on: On, themed: (prefs: Prefs) => ThemeBadge | undefined = () => undefined): void {
  on('ui.render', { component: 'UserMessage' }, async ($, e, next) => {
    const prefs = await read($, prefsAtom)
    const badge = resolve(prefs, themed(prefs))
    if (badge === undefined || e.props.from !== undefined) return next(e)
    const row = await next(e)
    const { Box, Text } = $.ui.resolve(e)
    return (
      <Box flexDirection="column">
        {badge.look === 'pill' ? (
          <Text backgroundColor={badge.youColor} color="#111111" bold>{badge.you}</Text>
        ) : badge.look === 'outline' ? (
          <Text color={badge.youColor} italic underline>{badge.you}</Text>
        ) : (
          <Text color={badge.youColor} bold {...fontOf(prefs)}>{badge.you}</Text>
        )}
        {row}
      </Box>
    )
  })

  on('ui.render', { component: 'AssistantMessage' }, async ($, e, next) => {
    const prefs = await read($, prefsAtom)
    const badge = resolve(prefs, themed(prefs))
    if (badge === undefined || !e.props.isFirstOfReply) return next(e)
    const row = await next(e)
    const { Box, Text } = $.ui.resolve(e)
    return (
      <Box flexDirection="column">
        {badge.look === 'pill' ? (
          <Text backgroundColor={badge.claudeColor} color="#111111" bold>{badge.claude}</Text>
        ) : badge.look === 'outline' ? (
          <Text color={badge.claudeColor} italic underline>{badge.claude}</Text>
        ) : (
          <Text color={badge.claudeColor} bold {...fontOf(prefs)}>{badge.claude}</Text>
        )}
        {row}
      </Box>
    )
  })
}
