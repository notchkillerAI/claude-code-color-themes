import type { On } from 'claude-code'

// Right-click actions on selected text or code.
export function registerMenu(on: On): void {
  on('ui.render', { component: 'ContextMenu' }, ($, e, next) => {
    const selected = e.props.selection?.text ?? e.props.code?.text
    if (selected === undefined || selected.trim() === '') return next(e)
    const { Box, Button } = $.ui.resolve(e)
    const hex = /#[0-9a-fA-F]{6}\b/.exec(selected)?.[0]
    const quoted = selected.trim().replace(/^/gm, '> ')
    const ask = (lead: string) => $.prompt.fill({ text: `${lead}\n\n${quoted}\n`, mode: 'insert' })
    return (
      <Box flexDirection="column">
        <Button key="explain" onPress={() => void ask('Explain this:')}>💡 Explain this</Button>
        <Button key="bugs" onPress={() => void ask('Find any bugs in this:')}>🐞 Find bugs</Button>
        <Button key="improve" onPress={() => void ask('Improve this:')}>✨ Improve this</Button>
        <Button key="simplify" onPress={() => void ask('Explain this in simple words:')}>🧒 Explain simply</Button>
        {hex !== undefined ? (
          <Button key="theme" onPress={() => void $.command.run({ command: 'colors', args: `custom ${hex}` })}>
            🎨 Make a theme from {hex}
          </Button>
        ) : null}
      </Box>
    )
  })
}
