#!/usr/bin/env node
// Builds an accessible light + dark color palette from a hex color, a mood or a
// named theme, checks every text color against WCAG contrast, and prints it as
// CSS variables, Tailwind config, SCSS or JSON. Optionally writes a swatch SVG.
//   node palette.mjs --color "#6c5ce7"
//   node palette.mjs --mood calm --format tailwind
//   node palette.mjs --theme sakura --format json --swatch palette.svg
//   node palette.mjs --list
// Self-contained: needs only Node.js 18+, reads no other files, writes only --out and --swatch.
// From Claude Color Themes: github.com/notchkillerAI/claude-code-color-themes

import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname } from 'node:path'

// Writes a file, creating its folder first if needed.
function save(file, text) {
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, text)
}

// 209 named themes from Claude Color Themes (github.com/notchkillerAI/claude-code-color-themes).
// Each is [hue 0-360, tint strength 0-100].
const GROUPS = {
 "Soft pastels": {
  "matcha-latte": [80,30],
  "digital-lavender": [265,40],
  "butter-yellow": [50,55],
  "sorbet-peach": [22,55],
  "cotton-candy": [330,45],
  "baby-blue": [205,45],
  "mint-cream": [155,35],
  "lilac-haze": [275,30],
  "strawberry-milk": [345,40],
  "pistachio-gelato": [90,40],
  "seafoam": [165,35],
  "blush-pink": [350,35],
  "periwinkle": [235,40],
  "honeydew": [100,30],
  "apricot-crush": [28,55],
  "powder-blue": [200,30],
  "rose-quartz": [340,30],
  "vanilla-bean": [45,30],
  "lemon-sorbet": [55,55],
  "creamsicle": [30,60]
 },
 "Earthy & cozy": {
  "olive": [68,35],
  "espresso": [25,30],
  "terracotta": [15,45],
  "clay-pot": [18,35],
  "sage-green": [100,20],
  "moss-stone": [85,25],
  "oat-milk": [40,20],
  "cinnamon-roll": [22,40],
  "chai": [30,35],
  "caramel-drizzle": [32,45],
  "desert-sand": [38,30],
  "burnt-sienna": [14,50],
  "cedarwood": [20,25],
  "walnut": [25,22],
  "mushroom": [30,10],
  "linen": [38,16],
  "khaki-trail": [55,22],
  "hazelnut": [28,30],
  "tobacco": [30,40],
  "fig": [320,20]
 },
 "Bold & vibrant": {
  "electric-blue": [215,70],
  "hot-pink": [330,65],
  "cherry-red": [355,60],
  "tangerine-dream": [25,70],
  "lime-zest": [80,65],
  "cobalt": [225,60],
  "ultraviolet": [270,60],
  "emerald-city": [145,55],
  "saffron": [40,70],
  "fuchsia-pop": [320,65],
  "turquoise": [180,55],
  "scarlet": [5,60],
  "royal-purple": [280,55],
  "sunflower": [48,70],
  "jade-glow": [158,50],
  "amber-glow": [36,65],
  "magenta-rush": [315,60],
  "ocean-depth": [205,55],
  "ruby": [350,55],
  "kiwi": [90,55]
 },
 "Dark & moody": {
  "midnight-navy": [225,40],
  "obsidian": [240,8],
  "deep-forest": [145,35],
  "merlot": [345,35],
  "aubergine": [295,30],
  "charcoal": [0,0],
  "graphite": [220,6],
  "storm-cloud": [210,18],
  "ink": [230,35],
  "smoked-plum": [300,20],
  "petrol": [195,40],
  "dark-chocolate": [20,30],
  "oxblood": [355,40],
  "slate": [215,12],
  "gunmetal": [205,10],
  "night-sky": [240,35],
  "spruce": [170,30],
  "ember": [10,50],
  "noir-teal": [185,35],
  "black-cherry": [340,35]
 },
 "Aesthetic vibes": {
  "y2k": [300,45],
  "vaporwave": [310,50],
  "synthwave": [285,55],
  "cyberpunk": [300,65],
  "cottagecore": [95,30],
  "dark-academia": [30,30],
  "coastal": [200,25],
  "mermaidcore": [180,50],
  "cyber-mint": [160,60],
  "aurora": [165,50],
  "sunset-boulevard": [15,55],
  "golden-hour": [38,55],
  "nordic-frost": [210,18],
  "tokyo-neon": [325,65],
  "miami-nights": [175,55],
  "lofi": [260,20],
  "retro-80s": [290,55],
  "solarpunk": [110,45],
  "pink-power": [330,60],
  "galaxy": [250,40]
 },
 "Nature escapes": {
  "lagoon": [185,50],
  "tropical": [170,55],
  "zen-garden": [110,20],
  "moonlight": [230,15],
  "sakura": [335,30],
  "rainforest": [140,45],
  "glacier": [200,30],
  "volcano": [8,55],
  "savanna": [45,35],
  "bamboo": [85,35],
  "tundra": [190,12],
  "coral-reef": [5,50],
  "lotus": [330,25],
  "pine-forest": [160,30],
  "meadow": [95,40],
  "desert-bloom": [350,30],
  "northern-lights": [150,55],
  "ocean-breeze": [190,40],
  "wildflower": [285,35],
  "autumn-leaf": [25,50]
 },
 "Gemstones": {
  "amethyst": [275,50],
  "sapphire": [225,60],
  "emerald": [150,55],
  "garnet": [350,50],
  "topaz": [40,65],
  "opal": [190,25],
  "onyx": [230,6],
  "pearl": [40,8],
  "citrine": [50,70],
  "aquamarine": [180,45],
  "tanzanite": [255,55],
  "malachite": [155,50],
  "moonstone": [215,12],
  "peridot": [85,55],
  "tourmaline": [330,45],
  "lapis": [230,60],
  "black-opal": [260,20],
  "rose-gold": [15,35],
  "tigers-eye": [32,55],
  "quartz": [300,10]
 },
 "Sweets & drinks": {
  "bubble-tea": [30,35],
  "macaron": [330,40],
  "blueberry-muffin": [240,35],
  "mint-chip": [155,40],
  "cherry-cola": [355,45],
  "iced-latte": [30,25],
  "lavender-honey": [270,30],
  "mango-lassi": [42,65],
  "taro": [280,30],
  "cookie-dough": [35,40],
  "raspberry-sorbet": [340,55],
  "pina-colada": [55,45],
  "earl-grey": [220,10],
  "hot-cocoa": [18,35],
  "key-lime": [75,50],
  "tiramisu": [28,25],
  "blue-raspberry": [200,65],
  "peach-tea": [25,50],
  "grape-soda": [285,50],
  "yuzu": [60,65]
 },
 "Places & journeys": {
  "santorini": [210,55],
  "kyoto": [350,35],
  "iceland": [195,20],
  "sahara": [35,45],
  "amazon": [135,45],
  "paris-dusk": [260,30],
  "marrakech": [15,50],
  "bali": [160,40],
  "seoul-night": [280,45],
  "havana": [20,50],
  "fjord": [205,30],
  "tuscany": [40,40],
  "maldives": [180,60],
  "patagonia": [200,15],
  "cairo": [42,45],
  "swiss-alps": [210,15],
  "mumbai-monsoon": [195,30],
  "jaipur": [345,45],
  "kerala": [130,45],
  "goa": [175,50]
 },
 "Motion vibes": {
  "psych-currents": [285,55],
  "shooting-star": [300,60],
  "night-drive": [265,55],
  "starlight-express": [215,50],
  "acid-wave": [75,70],
  "dream-pop": [330,40],
  "kaleidoscope": [20,60],
  "lava-lounge": [15,60],
  "lava-lime": [90,55],
  "chill-wave": [175,45],
  "mesh-candy": [320,45],
  "mesh-ocean": [200,50],
  "mesh-sunset": [25,55],
  "glow-up": [45,65],
  "holographic": [260,35],
  "hyperspace": [230,50],
  "warp-drive": [190,60],
  "city-bokeh": [40,50],
  "fairy-lights": [50,45],
  "midnight-jazz": [225,40],
  "solar-system": [35,40],
  "cosmic-orbit": [260,45],
  "bass-drop": [290,60],
  "lofi-beats": [250,30],
  "rave": [320,70],
  "raindrop-ripples": [200,35],
  "koi-pond": [25,50],
  "topo-map": [100,30],
  "desert-dunes": [35,40]
 }
}

const args = {}
const argv = process.argv.slice(2)
for (let i = 0; i < argv.length; i++) {
  const a = argv[i]
  if (!a.startsWith('--')) continue
  const next = argv[i + 1]
  if (next === undefined || next.startsWith('--')) args[a.slice(2)] = true
  else { args[a.slice(2)] = next; i++ }
}

const THEMES = Object.assign({}, ...Object.values(GROUPS))
const MOODS = {
  calm: [200, 25], energetic: [15, 65], luxury: [45, 40], nature: [120, 35], playful: [320, 55],
  professional: [215, 30], romantic: [340, 40], mysterious: [270, 40], retro: [30, 45], futuristic: [190, 60],
  warm: [25, 45], cool: [205, 35], minimal: [220, 5], cozy: [30, 30], fresh: [150, 45], bold: [0, 70],
  elegant: [280, 20], earthy: [35, 30], oceanic: [195, 50], tropical: [170, 55], sunset: [20, 60],
  forest: [140, 35], candy: [330, 50], cyberpunk: [300, 65], pastel: [280, 30], trustworthy: [210, 45],
  creative: [290, 50], healthy: [100, 40], friendly: [40, 55], serious: [230, 15],
}

function fail(message) {
  console.error(`Error: ${message}`)
  process.exit(1)
}

if (args.list) {
  for (const [group, themes] of Object.entries(GROUPS)) console.log(`${group}: ${Object.keys(themes).join(', ')}`)
  console.log(`\nMoods: ${Object.keys(MOODS).join(', ')}`)
  process.exit(0)
}

// ---------- color math ----------

function hsl(h, s, l) {
  s = Math.max(0, Math.min(100, s)) / 100
  l = Math.max(0, Math.min(100, l)) / 100
  const k = n => (n + h / 30) % 12
  const a = s * Math.min(l, 1 - l)
  const f = n => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))
  return '#' + [f(0), f(8), f(4)].map(x => Math.round(x * 255).toString(16).padStart(2, '0')).join('')
}

function hueSat(hex) {
  const [r, g, b] = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16) / 255)
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const l = (max + min) / 2
  const d = max - min
  if (d === 0) return [0, 0]
  const s = d / (1 - Math.abs(2 * l - 1))
  const h = max === r ? ((g - b) / d) % 6 : max === g ? (b - r) / d + 2 : (r - g) / d + 4
  return [Math.round((h * 60 + 360) % 360), Math.round(Math.min(s, 0.75) * 100)]
}

function luminance(hex) {
  const [r, g, b] = [1, 3, 5].map(i => {
    const c = parseInt(hex.slice(i, i + 2), 16) / 255
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

const contrast = (a, b) => {
  const [x, y] = [luminance(a), luminance(b)].sort((p, q) => q - p)
  return (x + 0.05) / (y + 0.05)
}

/** Moves lightness away from the background until the pair reaches `target`. */
function reach(h, s, l, bg, target, darker) {
  let color = hsl(h, s, l)
  for (let i = 0; i < 100 && contrast(color, bg) < target; i++) {
    l += darker ? -1 : 1
    color = hsl(h, s, l)
  }
  return color
}

// ---------- the palette ----------

let hue
let sat
let source
if (args.color) {
  const c = String(args.color).startsWith('#') ? String(args.color) : `#${args.color}`
  if (!/^#[0-9a-fA-F]{6}$/.test(c)) fail('--color must be a six-digit hex color like "#6c5ce7".')
  ;[hue, sat] = hueSat(c.toLowerCase())
  source = c.toLowerCase()
} else if (args.mood) {
  const m = MOODS[String(args.mood).toLowerCase()]
  if (m === undefined) fail(`unknown mood. Try one of: ${Object.keys(MOODS).join(', ')}.`)
  ;[hue, sat] = m
  source = `mood: ${args.mood}`
} else if (args.theme) {
  const t = THEMES[String(args.theme).toLowerCase().replace(/\s+/g, '-')]
  if (t === undefined) fail('unknown theme. Run with --list to see all 209.')
  ;[hue, sat] = t
  source = `theme: ${args.theme}`
} else {
  fail('give --color "#hex", --mood <word> or --theme <name>. Run with --list for names.')
}

function mode(dark) {
  const bg = dark ? hsl(hue, sat * 0.6, 8) : hsl(hue, sat * 0.5, 97)
  const surface = dark ? hsl(hue, sat * 0.6, 12) : hsl(hue, sat * 0.5, 93)
  const surface2 = dark ? hsl(hue, sat * 0.6, 16) : hsl(hue, sat * 0.5, 89)
  const border = dark ? hsl(hue, sat * 0.4, 26) : hsl(hue, sat * 0.4, 78)
  const text = reach(hue, sat * 0.3, dark ? 92 : 12, bg, 7, !dark)
  const muted = reach(hue, sat * 0.3, dark ? 70 : 38, bg, 4.5, !dark)
  const accentSat = Math.max(sat, 50)
  const accent = reach(hue, accentSat, dark ? 66 : 42, bg, 4.5, !dark)
  const onAccent = contrast('#ffffff', accent) >= contrast('#111111', accent) ? '#ffffff' : '#111111'
  const role = (h, s) => reach(h, s, dark ? 64 : 40, bg, 4.5, !dark)
  return {
    background: bg,
    surface,
    'surface-2': surface2,
    border,
    text,
    'text-muted': muted,
    accent,
    'on-accent': onAccent,
    success: role(140, 55),
    warning: role(38, 85),
    danger: role(4, 70),
    info: role(205, 70),
  }
}

const light = mode(false)
const dark = mode(true)

// ---------- checks ----------

const checks = []
for (const [name, p] of [['light', light], ['dark', dark]]) {
  for (const key of ['text', 'text-muted', 'accent', 'success', 'warning', 'danger', 'info']) {
    const ratio = contrast(p[key], p.background)
    const need = key === 'text' ? 7 : 4.5
    checks.push(`${ratio >= need ? '✓' : '✗'} ${name.padEnd(5)} ${key.padEnd(10)} ${ratio.toFixed(2)}:1 on background (needs ${need}:1)`)
  }
  const btn = contrast(p['on-accent'], p.accent)
  checks.push(`${btn >= 4.5 ? '✓' : '~'} ${name.padEnd(5)} button text ${btn.toFixed(2)}:1 on accent${btn >= 4.5 ? '' : ' (fine for large or bold text, 3:1)'}`)
}

// ---------- output ----------

const format = String(args.format ?? 'css')
const prefix = String(args.prefix ?? 'color')
let output
if (format === 'css') {
  const vars = p => Object.entries(p).map(([k, v]) => `  --${prefix}-${k}: ${v};`).join('\n')
  output = `/* Palette from ${source}. Light by default, dark when the system asks. */\n:root {\n${vars(light)}\n}\n\n@media (prefers-color-scheme: dark) {\n  :root {\n${vars(dark).replace(/^/gm, '  ')}\n  }\n}\n`
} else if (format === 'scss') {
  output = `// Palette from ${source}\n` +
    Object.entries(light).map(([k, v]) => `$${prefix}-${k}: ${v};`).join('\n') + '\n' +
    Object.entries(dark).map(([k, v]) => `$${prefix}-${k}-dark: ${v};`).join('\n') + '\n'
} else if (format === 'tailwind') {
  const obj = Object.fromEntries(Object.keys(light).map(k => [k, { DEFAULT: light[k], dark: dark[k] }]))
  output = `// tailwind.config.js: palette from ${source}. Use e.g. bg-background dark:bg-background-dark\nmodule.exports = {\n  theme: {\n    extend: {\n      colors: ${JSON.stringify(obj, null, 2).replace(/\n/g, '\n      ')},\n    },\n  },\n}\n`
} else if (format === 'json') {
  output = JSON.stringify({ source, light, dark }, null, 2) + '\n'
} else {
  fail('--format must be css, scss, tailwind or json.')
}

if (args.out) {
  save(String(args.out), output)
  console.log(`Wrote ${args.out} (${format})`)
} else {
  console.log(output)
}

if (args.swatch) {
  const row = (p, y, label) =>
    `<text x="20" y="${y - 12}" font-size="15" font-weight="700" fill="#888">${label}</text>` +
    Object.entries(p).map(([k, v], i) => {
      const x = 20 + i * 96
      return `<rect x="${x}" y="${y}" width="88" height="64" rx="10" fill="${v}" stroke="#8884"/>` +
        `<text x="${x + 44}" y="${y + 84}" font-size="11" text-anchor="middle" fill="#888">${k}</text>` +
        `<text x="${x + 44}" y="${y + 99}" font-size="11" text-anchor="middle" fill="#888" font-family="monospace">${v}</text>`
    }).join('')
  const width = 40 + Object.keys(light).length * 96
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="290" viewBox="0 0 ${width} 290" font-family="-apple-system,Segoe UI,Helvetica,Arial,sans-serif">${row(light, 40, 'Light')}${row(dark, 180, 'Dark')}</svg>\n`
  save(String(args.swatch), svg)
  console.log(`Wrote swatch ${args.swatch}`)
}

console.error('\nContrast checks (WCAG):\n' + checks.join('\n'))
