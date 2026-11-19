import type { PromptAutocompleteInput, PromptAutocompleteSuggestion } from 'claude-code'

// Type-ahead for a slash command's arguments: as the person types each letter
// after the command, the list narrows to the names that contain it.

export type Choice = { name: string; description?: string }

export type Grammar = {
  /** What can come first after the command. */
  first: Choice[]
  /** What can follow a given first word. */
  next?: Record<string, Choice[]>
  /** The menu shown while the command itself is typed (`/col…`); `first` when absent. */
  menu?: Choice[]
}

const LIMIT = 24

/** Best matches first: starts with the typed text, then a word starts with it, then contains it. */
export function rank(choices: Choice[], typed: string): Choice[] {
  const q = typed.toLowerCase().replace(/\s+/g, '-')
  const score = (name: string): number => {
    const n = name.toLowerCase()
    if (n === q) return 0
    if (n.startsWith(q)) return 1
    if (n.split('-').some(part => part.startsWith(q))) return 2
    if (n.includes(q)) return 3
    return -1
  }
  return choices
    .map(choice => ({ choice, s: score(choice.name) }))
    .filter(x => x.s >= 0)
    .sort((a, b) => a.s - b.s || a.choice.name.localeCompare(b.choice.name))
    .map(x => x.choice)
}

/** Rows for the token being typed after `/command`, or undefined when it isn't that command. */
export function suggest(e: PromptAutocompleteInput, command: string, grammar: Grammar): PromptAutocompleteSuggestion[] | undefined {
  const before = e.text.slice(0, e.start)
  // Typing the command itself (`/co`, `/colors`): show the whole menu, each row
  // filling in `/colors <choice> `, so the list pops up like a search box.
  if (before.trim() === '' && e.token.startsWith('/') && e.token.length >= 3 && `/${command}`.startsWith(e.token.toLowerCase())) {
    return (grammar.menu ?? grammar.first).map(c => ({
      text: `/${command} ${c.name}`,
      label: `/${command} ${c.name}`,
      ...(c.description !== undefined ? { description: c.description } : {}),
    }))
  }
  const m = new RegExp(`^\\s*/${command}\\s+(.*)$`, 's').exec(before)
  if (m === null) return undefined
  const words = (m[1] ?? '').trim().split(/\s+/).filter(w => w !== '')
  const pool = words.length === 0 ? grammar.first : words.length === 1 ? grammar.next?.[(words[0] ?? '').toLowerCase()] : undefined
  if (pool === undefined) return undefined
  return rank(pool, e.token)
    .slice(0, LIMIT)
    .map(c => ({ text: c.name, ...(c.description !== undefined ? { description: c.description } : {}) }))
}

export const ON_OFF: Choice[] = [
  { name: 'on', description: 'Turn on' },
  { name: 'off', description: 'Turn off' },
]

export const choices = (names: string[], describe?: (name: string) => string | undefined): Choice[] =>
  names.map(name => {
    const description = describe?.(name)
    return description !== undefined ? { name, description } : { name }
  })
