import { expect, test } from 'claude-code/testing'

type Look = { backdrop?: { scene: string }; overrideColorScheme?: string; colors?: { label?: string } }

// Stands in for the engine: answers the calls the mod makes and records each look.
function engine(on: any, hour = '22') {
  const looks: Look[] = []
  const store = new Map<string, unknown>()
  on('command.register', () => ({ value: { command: 'colors' } }))
  on('theme.set', (_: unknown, e: Look) => {
    looks.push(e)
    return { value: { isDrawn: true } }
  })
  on('store.get', (_: unknown, e: { key: string }) => ({ value: store.get(e.key) }))
  on('store.set', (_: unknown, e: { key: string; value: unknown }) => {
    store.set(e.key, e.value)
    return { value: undefined }
  })
  on('process.run', (_: unknown, e: { argv: string[] }) =>
    e.argv.includes('+%z')
      ? { value: { exitCode: 0, stdout: '+0000\n', stderr: '' } }
      : { value: { exitCode: 0, stdout: `${hour} 11 20261119\n`, stderr: '' } },
  )
  on('ui.status', () => ({ value: undefined }))
  // Each period of a timer is one call; it fires when answered. Hold them,
  // and let a test release one second's tick at a time.
  const held: Array<() => void> = []
  on('clock.every', (_: unknown, e: { ms: number }) =>
    e.ms === 1000 ? new Promise(resolve => held.push(() => resolve({ value: undefined }))) : new Promise(() => undefined),
  )
  const tick = () => held.splice(0).forEach(release => release())
  on('ui.open', () => ({ value: { isPlaced: true } }))
  on('session.start', (_: unknown, e: { cwd: string }) => ({ cwd: e.cwd }))
  return { looks, last: () => looks[looks.length - 1], tick }
}

const start = ($: any) => $.session.start({ cwd: '/', surface: 'desktop', isInteractive: true })
const colors = async ($: any, args: string): Promise<string> => (await $.command.run({ command: 'colors', args })).text

test('starts on olive with fireflies and the mouse glow', async ($, on) => {
  const app = engine(on)
  await start($)
  expect(app.last()?.colors?.label).toBe('Olive')
  expect(app.last()?.backdrop?.scene).toBe('fireflies--olive--g')
})

test('switches themes by name, with spaces, and picks a matching scene', async ($, on) => {
  const app = engine(on)
  await start($)
  expect(await colors($, 'sakura')).toBe('Switched to Sakura.')
  expect(app.last()?.backdrop?.scene).toBe('petals--sakura--g')
  expect(await colors($, 'tokyo neon')).toBe('Switched to Tokyo Neon.')
  expect(app.last()?.backdrop?.scene).toBe('grid--tokyo-neon--g')
})

test('custom colors, surprise and saved palettes', async ($, on) => {
  const app = engine(on)
  await start($)
  expect(await colors($, 'custom #ff6b6b')).toBe('Switched to Custom #ff6b6b.')
  expect(app.last()?.backdrop?.scene).toBe('petals--xff6b6b--g')
  expect(await colors($, 'save coral crush')).toContain('Saved #ff6b6b as "coral crush"')
  await colors($, 'olive')
  expect(await colors($, 'coral crush')).toBe('Switched to coral crush (#ff6b6b).')
  expect(await colors($, 'surprise')).toContain('Surprise palette #')
  expect(await colors($, 'custom #12345')).toContain("isn't a valid color")
})

test('scenes, glow and undo', async ($, on) => {
  const app = engine(on)
  await start($)
  await colors($, 'scene snow')
  expect(app.last()?.backdrop?.scene).toBe('snow--olive--g')
  await colors($, 'glow off')
  expect(app.last()?.backdrop?.scene).toBe('snow--olive')
  await colors($, 'scene off')
  expect(app.last()?.backdrop).toBeUndefined()
  await colors($, 'galaxy')
  expect(await colors($, 'undo')).toBe('Back to Olive.')
})

test('auto by time of day goes dark at night', async ($, on) => {
  const app = engine(on, '22')
  await start($)
  await colors($, 'auto time')
  expect(app.last()?.colors?.label).toBe('Midnight Navy')
  expect(app.last()?.overrideColorScheme).toBe('dark')
})

test('auto by season picks autumn in November', async ($, on) => {
  const app = engine(on)
  await start($)
  await colors($, 'auto season')
  expect(app.last()?.colors?.label).toBe('Autumn Leaf')
  expect(app.last()?.backdrop?.scene).toBe('leaves--autumn-leaf--g')
})

test('the picker panel switches themes and stars favorites, on every surface', async ($, on) => {
  const app = engine(on)
  await start($)
  for (const surface of ['desktop', 'terminal', 'vscode', 'mobile'] as const) {
    const ui = await $.ui.mount({
      plugin: 'olive-theme',
      component: 'Pane',
      requestId: 'color-themes',
      surface,
      props: { title: 'Color themes', isFocused: true, bodyColumns: 60, placement: 'dock', scroll: { offset: 0, bodyRows: 40 }, view: {} },
    })
    await ui.press({ key: 'tab-Soft pastels' })
    await ui.press({ key: 'pick-cotton-candy' })
    expect(app.last()?.colors?.label).toBe('Cotton Candy')
    await ui.press({ key: 'star-cotton-candy' })
    await ui.press({ key: 'tab-Favorites' })
    expect(await ui.find({ type: 'Button', key: 'pick-cotton-candy' })).toBeDefined()
    await ui.press({ key: 'star-cotton-candy' })
    await ui.unmount()
  }
})

test('the backdrop draws a glowing scene on desktop and the plain scene on mobile', async ($, on) => {
  engine(on)
  await start($)
  const props = { scene: 'petals--sakura--g', plugin: 'olive-theme', glass: false } as const
  const desk = await $.ui.mount({ plugin: 'olive-theme', component: 'Backdrop', surface: 'desktop', props })
  expect(await desk.find({ type: 'Shader' })).toBeDefined()
  expect(await desk.find({ type: 'Svg' })).toBeDefined()
  await desk.unmount()
  const phone = await $.ui.mount({ plugin: 'olive-theme', component: 'Backdrop', surface: 'mobile', props })
  expect(await phone.find({ type: 'Shader' })).toBeUndefined()
  expect(await phone.find({ type: 'Svg' })).toBeDefined()
  await phone.unmount()
})

const BAR = {
  plugin: 'olive-theme',
  component: 'AbovePrompt',
  props: { hasSurvey: false, isCollapsed: false, isWorking: false, maxRows: 6, bodyColumns: 100, scroll: { offset: 0, bodyRows: 6 }, view: {} },
} as const

test('the ambient bar shows the theme, the clock and a quote, on every surface', async ($, on) => {
  engine(on)
  on('clock.now', () => ({ value: Date.UTC(2026, 10, 19, 16, 5) }))
  await start($)
  for (const surface of ['desktop', 'terminal', 'vscode', 'mobile'] as const) {
    const ui = await $.ui.mount({ ...BAR, surface } as any)
    expect((await ui.find({ type: 'Text', text: /Olive/ }))?.text).toContain('🌿')
    expect((await ui.find({ type: 'Text', text: /🕐/ }))?.text).toBe('🕐 4:05 PM · Thu 19 Nov')
    expect(await ui.find({ type: 'Text', text: /✨/ })).toBeDefined()
    expect(await ui.find({ type: 'Button', key: 'quote-next' })).toBeDefined()
    await ui.unmount()
  }
})

test('the focus timer starts, pauses and stops from the bar', async ($, on) => {
  engine(on)
  on('clock.now', () => ({ value: Date.UTC(2026, 10, 19, 16, 5) }))
  await start($)
  const ui = await $.ui.mount({ ...BAR, surface: 'desktop' } as any)
  await ui.press({ key: 'focus-start' })
  expect((await ui.find({ type: 'Text', text: /🍅/ }))?.text).toContain('25:00')
  await ui.press({ key: 'focus-pause' })
  expect((await ui.find({ type: 'Text', text: /🍅/ }))?.text).toContain('paused')
  await ui.press({ key: 'focus-stop' })
  expect(await ui.find({ type: 'Button', key: 'focus-start' })).toBeDefined()
  await ui.unmount()
})

test('bar commands: custom focus length, 24-hour clock, and turning the bar off', async ($, on) => {
  engine(on)
  on('clock.now', () => ({ value: Date.UTC(2026, 10, 19, 16, 5) }))
  await start($)
  expect(await colors($, 'focus 50')).toBe('🍅 Focus for 50 minutes. Then a 5-minute break.')
  expect(await colors($, 'focus status')).toContain('50:00 left')
  expect(await colors($, 'focus stop')).toBe('⏹ Timer stopped.')
  expect(await colors($, 'focus 999')).toContain('1 to 240')
  expect(await colors($, 'break 10')).toBe('☕ Breaks are now 10 minutes.')
  expect(await colors($, 'clock 24h')).toBe('Clock on (24-hour).')
  const ui = await $.ui.mount({ ...BAR, surface: 'desktop' } as any)
  expect((await ui.find({ type: 'Text', text: /🕐/ }))?.text).toBe('🕐 16:05 · Thu 19 Nov')
  await ui.unmount()
  expect(await colors($, 'bar off')).toBe('Ambient bar off.')
  const off = await $.ui.mount({ ...BAR, surface: 'desktop' } as any)
  expect(await off.find({ type: 'Button', key: 'focus-start' })).toBeUndefined()
  await off.unmount()
})

test('a finished focus session turns into a break, with a toast', async ($, on) => {
  const app = engine(on)
  let now = Date.UTC(2026, 10, 19, 16, 0)
  const toasts: string[] = []
  on('clock.now', () => ({ value: now }))
  on('ui.toast', (_: unknown, e: { text: string }) => {
    toasts.push(e.text)
    return { value: undefined }
  })
  on('ui.notify', () => ({ value: { isNotified: true } }) as never)
  on('audio.play', () => ({ value: undefined }))
  await start($)
  await colors($, 'focus 1')
  now += 61_000
  app.tick()
  for (let i = 0; i < 200; i++) await Promise.resolve()
  expect(await colors($, 'focus status')).toContain('☕ Break')
  expect(toasts.join(' ')).toContain('Focus session 1 done')
})

test('new motion themes pick their signature scenes', async ($, on) => {
  const app = engine(on)
  on('ui.toast', () => ({ value: undefined }))
  await start($)
  await colors($, 'psych-currents')
  expect(app.last()?.backdrop?.scene).toBe('psychflow--psych-currents--g')
  await colors($, 'shooting star')
  expect(app.last()?.backdrop?.scene).toBe('shootingstars--shooting-star--g')
  await colors($, 'scene equalizer')
  expect(app.last()?.backdrop?.scene).toBe('equalizer--shooting-star--g')
})

test('the spinner takes themed words, and desktop keeps its step text', async ($, on) => {
  engine(on)
  on('ui.toast', () => ({ value: undefined }))
  // Stands in for the engine's own drawing of the spinner row.
  on('ui.render', ($: any, e: any) => {
    const { Text } = $.ui.resolve(e)
    return <Text>{`${e.props.word}${e.props.suffix}`}</Text>
  })
  await start($)
  await colors($, 'shooting-star')
  const term = await $.ui.mount({ plugin: 'olive-theme', component: 'Spinner', surface: 'terminal', requestId: 'r1', props: { word: 'Sauteing', message: null, suffix: '…', mode: 'thinking' } } as any)
  expect((await term.find({ type: 'Text' }))?.text).toMatch(/^(Wishing|Streaking|Shooting|Twinkling|Soaring) 🌠$/)
  await term.unmount()
  const desk = await $.ui.mount({ plugin: 'olive-theme', component: 'Spinner', surface: 'desktop', requestId: 'r1', props: { word: 'Creating notes.md', message: null, suffix: '…', mode: 'tool-use' } } as any)
  expect((await desk.find({ type: 'Text' }))?.text).toBe('Creating notes.md 🌠')
  await desk.unmount()
})

test('style extras: pick, list and turn off', async ($, on) => {
  engine(on)
  on('audio.play', () => ({ value: undefined }))
  on('prompt.read', () => ({ value: { text: '', cursor: 0 } }))
  on('prompt.paint', () => ({ value: { isPainted: true, text: '', cursor: 0 } }) as never)
  await start($)
  expect(await colors($, 'spinner list')).toContain('Spinner (27)')
  expect(await colors($, 'spinner coffee')).toBe('Spinner: coffee.')
  expect(await colors($, 'prompt synthwave')).toBe('Prompt colors: synthwave.')
  expect(await colors($, 'cards neon')).toBe('Tool cards: neon.')
  expect(await colors($, 'badges space')).toBe('Message badges: space.')
  expect(await colors($, 'sounds arcade')).toBe('Sound pack: arcade.')
  expect(await colors($, 'cards nope')).toContain('No tool cards named "nope"')
  expect(await colors($, 'badges off')).toBe('Message badges: off.')
})

test('typing paints commands, mentions and files in the prompt', async ($, on) => {
  engine(on)
  const painted: any[] = []
  const draft = 'fix /colors @notes.md in app.py TODO 42'
  on('prompt.read', () => ({ value: { text: draft, cursor: draft.length } }))
  on('prompt.paint', (_: unknown, e: any) => {
    painted.push(e)
    return { value: { isPainted: true, text: draft, cursor: draft.length } } as never
  })
  on('prompt.change', (_: unknown, e: any) => ({ text: e.text, cursor: e.cursor }) as never)
  await start($)
  await ($.prompt as any).change({ text: draft, cursor: draft.length, origin: { kind: 'paste' } } as any)
  const runs = painted[painted.length - 1].decorations.map((d: any) => draft.slice(d.start, d.end))
  expect(runs).toEqual(expect.arrayContaining(['/colors', '@notes.md', 'app.py', 'TODO', '42', 'fix']))
})

test('tool cards wrap the row with an icon, a status and a test bar', async ($, on) => {
  engine(on)
  await start($)
  await colors($, 'cards neon')
  const ui = await $.ui.mount({
    plugin: 'olive-theme', component: 'ToolUse', surface: 'desktop', requestId: 't1',
    props: { tool: 'Bash', input: { command: 'npm test' }, isRunning: false, isErrored: false, isInterrupted: false, output: '18 passed, 2 failed' },
  } as any)
  expect((await ui.find({ type: 'Text', text: /Bash/ }))?.text).toBe('💻 Bash')
  expect(await ui.find({ type: 'Text', text: /18\/20 passed/ })).toBeDefined()
  await ui.unmount()
})

test('message badges sit above your messages and Claude replies', async ($, on) => {
  engine(on)
  await start($)
  await colors($, 'badges space')
  const you = await $.ui.mount({ plugin: 'olive-theme', component: 'UserMessage', surface: 'desktop', requestId: 'm1', props: { text: 'hi', origin: { kind: 'composer' }, isExpanded: false } } as any)
  expect((await you.find({ type: 'Text', text: /You/ }))?.text).toBe('👩‍🚀 You')
  await you.unmount()
  const claude = await $.ui.mount({ plugin: 'olive-theme', component: 'AssistantMessage', surface: 'desktop', requestId: 'm2', props: { text: 'hello', isFirstOfReply: true } } as any)
  expect((await claude.find({ type: 'Text', text: /Claude/ }))?.text).toBe('🛸 Claude')
  await claude.unmount()
})

test('right-click on a color makes a theme of it', async ($, on) => {
  engine(on)
  await start($)
  const ui = await $.ui.mount({ plugin: 'olive-theme', component: 'ContextMenu', surface: 'desktop', props: { selection: { text: 'brand color is #6c5ce7' } } } as any)
  expect(await ui.find({ type: 'Button', key: 'explain' })).toBeDefined()
  expect(await ui.find({ type: 'Button', key: 'theme' })).toBeDefined()
  await ui.unmount()
})

test('the stats panel counts tools and edited files', async ($, on) => {
  engine(on)
  on('tool.call', () => ({ result: {} }) as never)
  on('clock.now', () => ({ value: 30 * 60_000 }))
  on('session.usage', () => ({ value: { startedAt: 0, context: { window: 200000, percent: 12 }, rateLimits: [], cost: { usd: 0.42 } } }) as never)
  await start($)
  await $.tool.call({ tool: 'Edit', file_path: '/x/app.py', old_string: 'a', new_string: 'b' } as any)
  await $.tool.call({ tool: 'Bash', command: 'ls' } as any)
  const ui = await $.ui.mount({ plugin: 'olive-theme', component: 'Pane', requestId: 'session-stats', surface: 'desktop', props: { title: 'Stats', isFocused: false, bodyColumns: 60, placement: 'dock', scroll: { offset: 0, bodyRows: 40 }, view: {} } } as any)
  expect(await ui.find({ type: 'Text', text: /app\.py/ })).toBeDefined()
  expect(await ui.find({ type: 'Text', text: /2 tool calls/ })).toBeDefined()
  expect(await ui.find({ type: 'Text', text: /\$0\.42/ })).toBeDefined()
  await ui.unmount()
})
