import { atom, read } from 'claude-code'
import type { EngineInterface as Engine, On } from 'claude-code'

import { DEFAULTS } from './defaults.js'
import { pickFrom } from './prefs.js'

const prefsAtom = atom({ plugin: 'prompt-colors', key: 'prefs' } as const, DEFAULTS, { shape: 'prefs-1' })

// ---------- prompt highlighting palettes ----------

type PromptStyle = { cmd: string; mention: string; path: string; url: string; code: string; num: string; key: string; tag: string }
const ps = (cmd: string, mention: string, path: string, url: string, code: string, num: string, key: string, tag: string): PromptStyle => ({ cmd, mention, path, url, code, num, key, tag })

export const PROMPT_STYLES: Record<string, PromptStyle> = {
  neon: ps('#ff4fd8', '#3ef0ff', '#b6ff3e', '#7c8bff', '#ffd23e', '#ff8a3e', '#ff3e6c', '#3effa8'),
  pastel: ps('#d78bd8', '#7fb8e8', '#8fcf9f', '#9a9ee8', '#e8b86b', '#e89a7a', '#e87a9a', '#7ad0c8'),
  synthwave: ps('#ff2fb0', '#29e7ff', '#ffb627', '#a35bff', '#ff6fd8', '#ffe066', '#ff3864', '#2de2e6'),
  ocean: ps('#2aa7c9', '#5fd3e8', '#2fbf9f', '#4a7fd6', '#86c5e8', '#3d9bd6', '#e8705a', '#46c9b0'),
  forest: ps('#5c9e3a', '#8fbf4a', '#a3c45c', '#4a8a6a', '#c9b35c', '#d68a3a', '#c94a3a', '#6fb07a'),
  sunset: ps('#ff7a45', '#ffb347', '#ff5e7e', '#c86bfa', '#ffd166', '#f78c6b', '#ef476f', '#ffa07a'),
  candy: ps('#ff6ec7', '#7ee8fa', '#a3f7bf', '#b19cd9', '#fdfd96', '#ffb7b2', '#ff6961', '#77dd77'),
  dracula: ps('#ff79c6', '#8be9fd', '#50fa7b', '#bd93f9', '#f1fa8c', '#ffb86c', '#ff5555', '#8be9fd'),
  nord: ps('#88c0d0', '#81a1c1', '#a3be8c', '#5e81ac', '#ebcb8b', '#d08770', '#bf616a', '#8fbcbb'),
  monokai: ps('#f92672', '#66d9ef', '#a6e22e', '#ae81ff', '#e6db74', '#fd971f', '#f92672', '#66d9ef'),
  solar: ps('#d33682', '#2aa198', '#859900', '#268bd2', '#b58900', '#cb4b16', '#dc322f', '#6c71c4'),
  gruvbox: ps('#d3869b', '#83a598', '#b8bb26', '#458588', '#fabd2f', '#fe8019', '#fb4934', '#8ec07c'),
  matrix: ps('#00ff41', '#00d13a', '#39ff14', '#00b32c', '#7dff9a', '#00ff41', '#ff3b3b', '#00e676'),
  sakura: ps('#e86a92', '#f7a1c4', '#c6879f', '#a26ea1', '#f5c0d1', '#e8909c', '#d9455f', '#f39bb5'),
  autumn: ps('#d2691e', '#cd853f', '#b8860b', '#a0522d', '#daa520', '#e2725b', '#b22222', '#cc7722'),
  ice: ps('#7fdbff', '#b3ecff', '#a0e7e5', '#6ca0dc', '#e0f7fa', '#91c8f6', '#ff7b9c', '#bde0fe'),
  gold: ps('#d4af37', '#f1c40f', '#c9a227', '#b8860b', '#ffd700', '#e1ad01', '#c0392b', '#e5c158'),
  cyber: ps('#00f0ff', '#ff00a0', '#fcee0a', '#7a00ff', '#00ff9f', '#ff6c00', '#ff003c', '#00f0ff'),
  lavender: ps('#b57edc', '#9f8fef', '#c3a6ff', '#8c7ae6', '#e0c3fc', '#d6a2e8', '#e17055', '#a29bfe'),
  citrus: ps('#ffb000', '#a8e10c', '#ff6f00', '#00c2a8', '#ffe135', '#ff9f1c', '#ff4040', '#7bd389'),
  mono: ps('#ffffff', '#d0d0d0', '#bdbdbd', '#a0a0a0', '#e0e0e0', '#c0c0c0', '#ff6b6b', '#d0d0d0'),
  retro: ps('#ff6b35', '#f7c59f', '#2ec4b6', '#9b5de5', '#efefd0', '#ff9f1c', '#e71d36', '#00bbf9'),
  vapor: ps('#ff71ce', '#01cdfe', '#05ffa1', '#b967ff', '#fffb96', '#ff9de2', '#ff5370', '#01cdfe'),
  earth: ps('#a47148', '#7f9172', '#c8b273', '#6b705c', '#ddbea9', '#cb997e', '#9c3d34', '#a5a58d'),
}

function highlight(text: string, style: PromptStyle): { start: number; end: number; color: string; bold?: boolean; underline?: boolean }[] {
  const out: { start: number; end: number; color: string; bold?: boolean; underline?: boolean }[] = []
  const rules: [RegExp, string, boolean?, boolean?][] = [
    [/https?:\/\/\S+/g, style.url, false, true],
    [/`[^`\n]+`/g, style.code],
    [/(^|\s)(\/[a-z][\w:-]*)/g, style.cmd, true],
    [/(^|\s)(@[\w./-]+)/g, style.mention, true],
    [/(^|\s)(#\w[\w-]*)/g, style.tag],
    [/\b[\w./-]+\.(?:tsx?|jsx?|py|ipynb|md|json|css|html|rs|go|java|c|cpp|h|rb|sh|ya?ml|toml|txt|csv|sql)\b/g, style.path],
    [/\b(?:TODO|FIXME|bug|fix|error|urgent|important|asap)\b/gi, style.key, true],
    [/\b\d+(?:\.\d+)?\b/g, style.num],
  ]
  const taken: boolean[] = []
  for (const [re, color, bold, underline] of rules) {
    for (const m of text.matchAll(re)) {
      const lead = m[2] !== undefined ? m[0].length - m[2].length : 0
      const start = (m.index ?? 0) + lead
      const end = (m.index ?? 0) + m[0].length
      let free = true
      for (let i = start; i < end; i++) if (taken[i] === true) free = false
      if (!free) continue
      for (let i = start; i < end; i++) taken[i] = true
      out.push({ start, end, color, ...(bold === true ? { bold } : {}), ...(underline === true ? { underline } : {}) })
    }
  }
  return out
}

async function repaint($: Engine): Promise<void> {
  const prefs = await read($, prefsAtom)
  const style = PROMPT_STYLES[prefs.prompt]
  const box = await $.prompt.read()
  await $.prompt.paint({ text: box.text, decorations: style === undefined ? [] : highlight(box.text, style) })
}

export async function promptCommand($: Engine, arg: string | undefined, usage = '/colors prompt'): Promise<string> {
  const r = await pickFrom($, 'Prompt colors', Object.keys(PROMPT_STYLES), 'prompt', arg, usage)
  if (r.changed) await repaint($)
  return r.text
}

/** Colors commands, mentions, files and more as the person types. */
export function registerPromptColors(on: On): void {
  on('prompt.edit', async ($, e, next) => {
    const result = await next(e)
    const prefs = await read($, prefsAtom)
    if (prefs.prompt !== 'off') await repaint($)
    return result
  })

  on('prompt.change', async ($, e, next) => {
    const result = await next(e)
    const prefs = await read($, prefsAtom)
    if (prefs.prompt !== 'off') await repaint($)
    return result
  })
}
