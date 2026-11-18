import type { Register, ThemeSetArgs } from 'claude-code'

import { makeColors } from './make-colors.js'
import { GROUPS, THEMES, definitionFor, hueOf } from './themes.js'

const NAMES = Object.keys(THEMES)
const DEFAULT = 'olive'
const HEX = /^#[0-9a-f]{6}$/i

function build(name: string): { look: ThemeSetArgs; unpainted?: string } {
  const custom = HEX.test(name)
  const [hue, sat] = custom ? hueOf(name) : THEMES[name]
  const { theme, problems } = makeColors(definitionFor(custom ? `custom ${name}` : name, hue, sat))
  return { look: { colors: theme }, unpainted: problems.find(line => line.startsWith("Desktop won't paint")) }
}

function listing(current: string): string {
  return [
    `Current theme: ${current}. ${NAMES.length} themes to choose from.`,
    'Use /colors <name>, /colors random, or /colors custom #rrggbb for your own color.',
    '',
    ...Object.entries(GROUPS).map(([group, themes]) => `${group}: ${Object.keys(themes).join(', ')}`),
  ].join('\n')
}

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    await $.command.register({
      name: 'colors',
      description: `Pick one of ${NAMES.length} color themes, or a custom color`,
      argumentHint: '<name> | random | custom #rrggbb',
    })
    const saved = await $.store.get('theme')
    const name = typeof saved === 'string' && (saved in THEMES || HEX.test(saved)) ? saved : DEFAULT
    const { look, unpainted } = build(name)
    const set = await $.theme.set(look)
    if (unpainted !== undefined) {
      $.ui.status(unpainted)
    } else if (!set.isDrawn) {
      $.ui.status(set.reason)
    }
    return next(e)
  })

  on('command.run', { command: 'colors' }, async ($, e) => {
    let name = e.args.trim().toLowerCase().replace(/^custom\s+/, '').replace(/\s+/g, '-')
    const saved = await $.store.get('theme')
    const current = typeof saved === 'string' ? saved : DEFAULT

    if (name === '' || name === 'list') {
      return { text: listing(current) }
    }
    if (name === 'custom') {
      return { text: 'Give a color: /colors custom #7c9a5e (any six-digit hex color).' }
    }
    if (/^[0-9a-f]{6}$/.test(name)) {
      name = `#${name}`
    }
    if (name === 'random') {
      const others = NAMES.filter(n => n !== current)
      name = others[Math.floor(Math.random() * others.length)]
    }
    if (!(name in THEMES) && !HEX.test(name)) {
      const close = NAMES.filter(n => n.includes(name.split('-')[0])).slice(0, 8)
      return {
        text: `No theme named "${name}".${close.length ? ` Did you mean: ${close.join(', ')}?` : ''} Type /colors to see all ${NAMES.length}.`,
      }
    }

    const { look, unpainted } = build(name)
    if (unpainted !== undefined) {
      return { text: `That color can't be painted: ${unpainted}` }
    }
    await $.theme.set(look)
    await $.store.set('theme', name)
    $.ui.toast(`Theme: ${name}`)
    return { text: `Switched to ${name}.` }
  })
}
