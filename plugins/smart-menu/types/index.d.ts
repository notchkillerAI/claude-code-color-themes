export type AutoMode = 'off' | 'time' | 'daily' | 'season'

export type Prefs = {
  /** A theme name, or a #rrggbb custom color. */
  theme: string
  /** 'auto', 'off', or a scene name. */
  scene: string
  glow: boolean
  auto: AutoMode
  contrast: boolean
  code: boolean
  sound: boolean
  favorites: string[]
  recent: string[]
  /** Saved custom palettes: name to #rrggbb. */
  saved: Record<string, string>
  previous?: string
  /** The ambient bar above the prompt. */
  bar: boolean
  clock: boolean
  hour12: boolean
  quote: boolean
  focusMin: number
  breakMin: number
  /** Style extras: a name from each list, or 'off'. */
  spinner: string
  prompt: string
  cards: string
  badges: string
  /** 'auto' (match the theme), 'design' (the design's own) or a color set. */
  badgeColors: string
  sounds: string
  voice: boolean
  voiceName: string
}

export type SessionStats = {
  turns: number
  workMs: number
  longestMs: number
  tools: Record<string, number>
  files: string[]
  errors: number
}

export type FocusTimer = {
  mode: 'idle' | 'focus' | 'break'
  /** When the running phase ends, ms since the epoch; 0 while paused or idle. */
  endsAt: number
  /** Ms left, kept while paused. */
  left: number
  isPaused: boolean
  /** Focus sessions finished this session. */
  rounds: number
}

declare module 'claude-code' {
  interface PluginState {
    'smart-menu': { prefs: Shaped<Prefs>; tab: string; timer: FocusTimer; now: number; quoteShift: number; stats: SessionStats }
  }
}
