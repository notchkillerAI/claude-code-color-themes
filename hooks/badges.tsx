import { atom, read } from 'claude-code'
import type { EngineInterface as Engine, On } from 'claude-code'

import { DEFAULTS } from './defaults.js'
import { pickFrom } from './prefs.js'

const prefsAtom = atom({ plugin: 'olive-theme', key: 'prefs' } as const, DEFAULTS, { shape: 'prefs-1' })

// ---------- message badge styles ----------

type Badge = { you: string; claude: string; youColor: string; claudeColor: string }
const b = (you: string, claude: string, youColor: string, claudeColor: string): Badge => ({ you, claude, youColor, claudeColor })

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
}

export async function badgesCommand($: Engine, arg: string | undefined, usage = '/colors badges'): Promise<string> {
  return (await pickFrom($, 'Message badges', Object.keys(BADGES), 'badges', arg, usage)).text
}

/** A small label above your messages and Claude's replies. */
export function registerBadges(on: On): void {
  on('ui.render', { component: 'UserMessage' }, async ($, e, next) => {
    const prefs = await read($, prefsAtom)
    const badge = BADGES[prefs.badges]
    if (badge === undefined || e.props.from !== undefined) return next(e)
    const row = await next(e)
    const { Box, Text } = $.ui.resolve(e)
    return (
      <Box flexDirection="column">
        <Text color={badge.youColor} bold>{badge.you}</Text>
        {row}
      </Box>
    )
  })

  on('ui.render', { component: 'AssistantMessage' }, async ($, e, next) => {
    const prefs = await read($, prefsAtom)
    const badge = BADGES[prefs.badges]
    if (badge === undefined || !e.props.isFirstOfReply) return next(e)
    const row = await next(e)
    const { Box, Text } = $.ui.resolve(e)
    return (
      <Box flexDirection="column">
        <Text color={badge.claudeColor} bold>{badge.claude}</Text>
        {row}
      </Box>
    )
  })
}
