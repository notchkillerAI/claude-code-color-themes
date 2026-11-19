import { expect, test } from 'claude-code/testing'
import { SCENE_KINDS } from './scenes.js'

// Each scene, through the engine's own checks for a backdrop, with and
// without the glow, on desktop and mobile, for a few very different themes.
for (const kind of SCENE_KINDS) {
  test(`scene ${kind} draws`, async ($, on) => {
    on('command.register', () => ({ value: { command: 'colors' } }))
    on('theme.set', () => ({ value: { isDrawn: true, requestId: 'r' } }))
    on('store.get', () => ({ value: undefined }))
    on('process.run', () => ({ value: { exitCode: 0, stdout: '12 11 20261119\n', stderr: '', isStdoutTruncated: false, isStderrTruncated: false } }))
    on('ui.status', () => ({ value: undefined }))
    on('clock.every', () => new Promise(() => undefined))
    on('session.start', (_: unknown, e: { cwd: string }) => ({ cwd: e.cwd }))
    await $.session.start({ cwd: '/', surface: 'desktop', isInteractive: true })
    const failed: string[] = []
    for (const key of ['onyx', 'sakura', 'xff6b6b']) {
      for (const [surface, glow] of [['desktop', '--g'], ['desktop', ''], ['mobile', '--g']] as const) {
        const ui = await $.ui.mount({ plugin: 'olive-theme', component: 'Backdrop', surface, props: { scene: `${kind}--${key}${glow}`, plugin: 'olive-theme', glass: false } } as any)
        if ((await ui.find({ type: 'Svg' })) === undefined) failed.push(`${key}/${surface}${glow}`)
        await ui.unmount()
      }
    }
    expect(failed).toEqual([])
  })
}
