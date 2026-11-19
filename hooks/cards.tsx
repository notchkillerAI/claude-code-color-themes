import { atom, read } from 'claude-code'
import type { EngineInterface as Engine, On } from 'claude-code'

import { DEFAULTS } from './defaults.js'
import { pickFrom } from './prefs.js'

const prefsAtom = atom({ plugin: 'olive-theme', key: 'prefs' } as const, DEFAULTS, { shape: 'prefs-1' })

// ---------- tool card styles ----------

type CardStyle = { border: string; color: string; dim: boolean; chip: 'emoji' | 'tag' | 'arrow' }
const cs = (border: string, color: string, chip: CardStyle['chip'] = 'emoji', dim = false): CardStyle => ({ border, color, dim, chip })

export const CARD_STYLES: Record<string, CardStyle> = {
  soft: cs('round', '#8a8f98', 'emoji', true),
  neon: cs('round', '#ff4fd8'),
  ocean: cs('round', '#2aa7c9'),
  forest: cs('round', '#6fb07a'),
  sunset: cs('round', '#ff7a45'),
  lavender: cs('round', '#b57edc'),
  gold: cs('round', '#d4af37'),
  mint: cs('round', '#3effa8'),
  cherry: cs('round', '#e86a92'),
  ice: cs('round', '#7fdbff'),
  boxy: cs('single', '#8a8f98', 'tag'),
  double: cs('double', '#9f8fef', 'tag'),
  bold: cs('bold', '#ff7a45', 'tag'),
  classic: cs('classic', '#a0a0a0', 'tag', true),
  terminal: cs('single', '#00ff41', 'arrow'),
  synthwave: cs('double', '#ff2fb0', 'arrow'),
  dracula: cs('round', '#bd93f9', 'tag'),
  nord: cs('round', '#88c0d0', 'tag'),
  gruvbox: cs('single', '#fabd2f', 'tag'),
  cyber: cs('bold', '#00f0ff', 'arrow'),
  minimal: cs('none', '#8a8f98', 'arrow', true),
  emoji: cs('none', '#8a8f98', 'emoji', true),
}

export const TOOL_ICONS: Record<string, string> = {
  Bash: '💻', Edit: '✏️', MultiEdit: '✏️', Write: '📝', Read: '📖', Grep: '🔍', Glob: '🗂️', WebFetch: '🌐', WebSearch: '🔎',
  Agent: '🤖', Task: '🤖', TodoWrite: '✅', NotebookEdit: '📓', AskUserQuestion: '❓', Skill: '🧩',
}

function testSummary(output: unknown): { pass: number; fail: number } | undefined {
  const text = typeof output === 'string' ? output : JSON.stringify(output ?? '')
  const pass = /(\d+)\s+(?:pass(?:ed|ing)?|✓)/i.exec(text)
  const fail = /(\d+)\s+(?:fail(?:ed|ing|ures?)?|✗)/i.exec(text)
  if (pass === null && fail === null) return undefined
  return { pass: Number(pass?.[1] ?? 0), fail: Number(fail?.[1] ?? 0) }
}

export async function cardsCommand($: Engine, arg: string | undefined, usage = '/colors cards'): Promise<string> {
  return (await pickFrom($, 'Tool cards', Object.keys(CARD_STYLES), 'cards', arg, usage)).text
}

/** A border, an icon, a status and a test bar around each tool row. */
export function registerCards(on: On): void {
  on('ui.render', { component: 'ToolUse' }, async ($, e, next) => {
    const prefs = await read($, prefsAtom)
    const style = CARD_STYLES[prefs.cards]
    if (style === undefined) return next(e)
    const row = await next(e)
    const { Box, Text } = $.ui.resolve(e)
    const icon = TOOL_ICONS[e.props.tool] ?? '🔧'
    const status = e.props.isErrored ? '❌ failed' : e.props.isInterrupted ? '⏹ stopped' : e.props.isRunning ? '⏳ running' : '✓ done'
    const head = style.chip === 'tag' ? `[${e.props.tool}]` : style.chip === 'arrow' ? `▸ ${e.props.tool}` : `${icon} ${e.props.tool}`
    const tests = e.props.tool === 'Bash' && !e.props.isRunning ? testSummary(e.props.output) : undefined
    const total = tests !== undefined ? tests.pass + tests.fail : 0
    const filled = total > 0 && tests !== undefined ? Math.round((tests.pass / total) * 20) : 0
    return (
      <Box flexDirection="column" {...(style.border !== 'none' ? { borderStyle: style.border, borderColor: style.color, paddingX: 1 } : {})}>
        <Box flexDirection="row" columnGap={2}>
          <Text color={style.color} bold dimColor={style.dim}>{head}</Text>
          <Text dimColor>{status}</Text>
        </Box>
        {row}
        {tests !== undefined && total > 0 ? (
          <Box flexDirection="row" columnGap={1}>
            <Text color="#3fbf6f">{'█'.repeat(filled)}</Text>
            <Text color="#e05252">{'█'.repeat(20 - filled)}</Text>
            <Text dimColor>
              {String(tests.pass)}/{String(total)} passed
            </Text>
          </Box>
        ) : null}
      </Box>
    )
  })
}
