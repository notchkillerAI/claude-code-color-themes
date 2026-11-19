import { atom, read, update } from 'claude-code'
import type { EngineInterface as Engine, On, ToolCallInput, ToolCallResult, TurnCompleteInput } from 'claude-code'

// A session dashboard: time, turns, tools, files and context.
const statsAtom = atom(
  { plugin: 'olive-theme', key: 'stats' } as const,
  { turns: 0, workMs: 0, longestMs: 0, tools: {}, files: [], errors: 0 },
)
export const STATS_PANE = 'session-stats'

const ICONS: Record<string, string> = {
  Bash: '💻', Edit: '✏️', MultiEdit: '✏️', Write: '📝', Read: '📖', Grep: '🔍', Glob: '🗂️', WebFetch: '🌐', WebSearch: '🔎',
  Agent: '🤖', Task: '🤖', TodoWrite: '✅', NotebookEdit: '📓', AskUserQuestion: '❓', Skill: '🧩',
}

/** Counts one tool call; the plugin's tool.call hook calls it with the result. */
export async function recordTool($: Engine, e: ToolCallInput, result: ToolCallResult): Promise<void> {
  const input = e as unknown as { file_path?: string; notebook_path?: string }
  const file = ['Edit', 'Write', 'MultiEdit', 'NotebookEdit'].includes(e.tool as string) ? (input.file_path ?? input.notebook_path) : undefined
  const errored = 'isError' in result && result.isError === true
  await update($, statsAtom, s => ({
    ...s,
    tools: { ...s.tools, [e.tool]: (s.tools[e.tool] ?? 0) + 1 },
    files: file !== undefined && !s.files.includes(file) ? [...s.files, file].slice(-200) : s.files,
    errors: s.errors + (errored ? 1 : 0),
  }))
}

/** Counts one finished turn of the main conversation. */
export async function recordTurn($: Engine, e: TurnCompleteInput): Promise<void> {
  if (e.agentId !== undefined) return
  await update($, statsAtom, s => ({ ...s, turns: s.turns + 1, workMs: s.workMs + e.durationMs, longestMs: Math.max(s.longestMs, e.durationMs) }))
}

export async function statsCommand($: Engine): Promise<string> {
  const opened = await $.ui.open({ id: STATS_PANE, title: '📊 Session stats' })
  return opened.isPlaced ? 'Stats panel opened.' : 'The stats panel opens in the desktop app or a fullscreen terminal.'
}

export function registerStats(on: On): void {
  on('ui.render', { component: 'Pane', requestId: STATS_PANE }, async ($, e) => {
    const { Box, Text } = $.ui.resolve(e)
    const s = await read($, statsAtom)
    const usage = await $.session.usage().catch(() => undefined)
    const now = await $.clock.now()
    const sessionMin = usage !== undefined ? Math.max(0, Math.round((now - usage.startedAt) / 60_000)) : 0
    const tools = Object.entries(s.tools).sort((a, b2) => b2[1] - a[1])
    const max = Math.max(1, ...tools.map(([, n]) => n))
    const pct = usage?.context.percent
    const bar = (value: number, of: number, width = 18) => '█'.repeat(Math.round((value / of) * width)).padEnd(width, '░')
    return (
      <Box flexDirection="column" gap={1}>
        <Box flexDirection="column">
          <Text bold>📊 This session</Text>
          <Text>⏱️ {String(sessionMin)} min open · 🧠 {String(Math.round(s.workMs / 60_000))} min of Claude working</Text>
          <Text>💬 {String(s.turns)} turns · 🔧 {String(tools.reduce((a, [, n]) => a + n, 0))} tool calls · ❌ {String(s.errors)} errors</Text>
          <Text>🏁 Longest turn: {String(Math.round(s.longestMs / 1000))}s</Text>
          {pct !== undefined ? <Text>📦 Context: {bar(pct, 100)} {String(Math.round(pct))}%</Text> : null}
          {usage?.cost !== undefined ? <Text>💰 Cost so far: ${usage.cost.usd.toFixed(2)}</Text> : null}
        </Box>
        <Box flexDirection="column">
          <Text bold>🔧 Tools used</Text>
          {tools.length === 0 ? <Text dimColor>None yet.</Text> : null}
          {tools.slice(0, 10).map(([tool, count]) => (
            <Text>
              {(ICONS[tool] ?? '🔧')} {tool.padEnd(12)} {bar(count, max, 14)} {String(count)}
            </Text>
          ))}
        </Box>
        <Box flexDirection="column">
          <Text bold>📝 Files changed ({String(s.files.length)})</Text>
          {s.files.length === 0 ? <Text dimColor>No edits yet.</Text> : null}
          {s.files.slice(-12).map(f => (
            <Text dimColor wrap="truncate-start">{f}</Text>
          ))}
        </Box>
      </Box>
    )
  })
}
