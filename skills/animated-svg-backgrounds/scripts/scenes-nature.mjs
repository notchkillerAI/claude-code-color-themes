#!/usr/bin/env node
// Animated SVG scenes (nature). Nature and calm scenes: falling petals, autumn leaves, snow, rain, ocean waves, fireflies, sunset clouds, dreamy clouds, ripples and topographic lines.
// Self-contained: needs only Node.js 18+, reads no other files, writes only --out.
//   node scenes-nature.mjs --list
//   node scenes-nature.mjs --scene petals --color "#a35bff" --out background.svg
// From Claude Color Themes: github.com/notchkillerAI/claude-code-color-themes

import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname } from 'node:path'

// Writes a file, creating its folder first if needed.
function save(file, text) {
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, text)
}

const SCENES = {
  petals: { emoji: '🌸', label: 'Falling petals' },
  leaves: { emoji: '🍂', label: 'Autumn leaves' },
  snow: { emoji: '❄️', label: 'Gentle snowfall' },
  rain: { emoji: '🌧️', label: 'Soft rain' },
  waves: { emoji: '🌊', label: 'Ocean waves' },
  fireflies: { emoji: '🌿', label: 'Fireflies' },
  sunset: { emoji: '🌅', label: 'Sunset clouds' },
  clouds: { emoji: '☁️', label: 'Dreamy clouds' },
  ripples: { emoji: '💧', label: 'Ripples' },
  contours: { emoji: '🗺️', label: 'Topographic' },
}

const W = 1600

const H = 1000

function seeded(seed) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const n = (x) => Math.round(x * 10) / 10


function frame(p, style, body, defs = '') {
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice">` +
    `<defs>${defs}</defs>` +
    `<style>` +
    `.bg{fill:${p.light}}` +
    `.lo{opacity:.55}` +
    `@media (prefers-color-scheme: dark){.bg{fill:${p.dark}}.lo{opacity:.8}}` +
    style +
    `</style>` +
    `<rect class="bg" width="${W}" height="${H}"/>` +
    body +
    `</svg>`
  )
}

function falling(
  p,
  seed,
  count,
  shape,
  speed,
  sway,
  spin,
) {
  const r = seeded(seed)
  const style =
    `@keyframes fall{from{transform:translate(${-sway}px,-${H + 80}px) rotate(0deg)}` +
    `50%{transform:translate(${sway}px,0) rotate(${spin ? 200 : 0}deg)}` +
    `to{transform:translate(${-sway}px,${H + 80}px) rotate(${spin ? 400 : 0}deg)}}` +
    `.f{animation:fall linear infinite;transform-box:fill-box;transform-origin:center}`
  let body = '<g class="lo">'
  for (let i = 0; i < count; i++) {
    const x = n(r() * W)
    const y = n(r() * H)
    const dur = n(speed[0] + r() * (speed[1] - speed[0]))
    const delay = n(-r() * dur)
    body +=
      `<g transform="translate(${x},${y})"><g class="f" style="animation-duration:${dur}s;animation-delay:${delay}s">` +
      shape(r, i) +
      `</g></g>`
  }
  return frame(p, style, body + '</g>')
}

const TWINKLE =
  `@keyframes tw{0%,100%{opacity:.3}50%{opacity:1}}` +
  `.t0{animation:tw 4s ease-in-out infinite}.t1{animation:tw 5.5s ease-in-out infinite -1.5s}` +
  `.t2{animation:tw 7s ease-in-out infinite -3s}.t3{animation:tw 9s ease-in-out infinite -5s}`

function starField(p, seed, count) {
  const r = seeded(seed)
  const groups = ['', '', '', '']
  for (let i = 0; i < count; i++) {
    const big = r() > 0.9
    groups[i % 4] += `<circle cx="${n(r() * W)}" cy="${n(r() * H)}" r="${n(big ? 1.8 + r() * 1.4 : 0.6 + r() * 1.1)}" fill="${big ? p.glow : hsl(p.hue, 25, 88)}"/>`
  }
  return groups.map((g, k) => `<g class="t${k}">${g}</g>`).join('')
}

function petals(p) {
  const pinks = [p.glow, hsl(p.hue, 70, 82), hsl((p.hue + 340) % 360, 65, 76)]
  return falling(
    p,
    11,
    64,
    (r, i) => {
      const s = 0.7 + r() * 0.9
      return `<path d="M0 0 C${n(8 * s)} ${n(-10 * s)} ${n(20 * s)} ${n(-4 * s)} ${n(16 * s)} ${n(6 * s)} C${n(12 * s)} ${n(12 * s)} ${n(3 * s)} ${n(9 * s)} 0 0Z" fill="${pinks[i % 3]}"/>`
    },
    [16, 30],
    70,
    true,
  )
}

function leaves(p) {
  const warm = [p.glow, hsl((p.hue + 15) % 360, 70, 52), hsl((p.hue + 345) % 360, 65, 45), hsl(40, 75, 55)]
  return falling(
    p,
    23,
    44,
    (r, i) => {
      const s = 0.8 + r() * 1
      return `<path d="M0 0 Q${n(10 * s)} ${n(-14 * s)} ${n(26 * s)} 0 Q${n(10 * s)} ${n(14 * s)} 0 0Z" fill="${warm[i % 4]}"/><path d="M0 0 L${n(26 * s)} 0" stroke="${p.dark}" stroke-opacity=".25" stroke-width="1"/>`
    },
    [18, 32],
    110,
    true,
  )
}

function snow(p) {
  const flake = hsl(p.hue, 30, 92)
  return falling(
    p,
    37,
    60,
    r => `<circle r="${n(1.5 + r() * 3.5)}" fill="${flake}" stroke="${p.accent}" stroke-opacity=".25" stroke-width=".6"/>`,
    [14, 34],
    40,
    false,
  )
}

function rain(p) {
  return falling(
    p,
    41,
    70,
    r => `<path d="M0 0 l-6 ${n(26 + r() * 22)}" stroke="${p.glow}" stroke-opacity=".5" stroke-width="1.4" stroke-linecap="round"/>`,
    [2.4, 4.2],
    20,
    false,
  )
}

function waves(p) {
  const tones = [hsl(p.hue, 55, 70), p.glow, p.accent, hsl(p.hue, 60, 30)]
  const style =
    `@keyframes roll{from{transform:translateX(0)}to{transform:translateX(-800px)}}` +
    `@keyframes bob{0%,100%{transform:translateY(0)}50%{transform:translateY(14px)}}` +
    `.w{animation:roll linear infinite}.b{animation:bob ease-in-out infinite}`
  const wave = (y, amp, fill, op, dur) => {
    let d = `M0 ${y}`
    for (let x = 0; x < W + 800; x += 400) {
      d += ` Q${x + 100} ${y - amp} ${x + 200} ${y} T${x + 400} ${y}`
    }
    d += ` V${H} H0Z`
    return `<g class="b" style="animation-duration:${n(dur * 0.45)}s"><path class="w" d="${d}" fill="${fill}" opacity="${op}" style="animation-duration:${dur}s"/></g>`
  }
  const body =
    `<g class="lo">` +
    wave(760, 26, tones[0] , 0.35, 38) +
    wave(810, 32, tones[1] , 0.35, 30) +
    wave(865, 22, tones[2] , 0.35, 24) +
    wave(920, 18, tones[3] , 0.35, 19) +
    `</g>`
  return frame(p, style, body)
}

function fireflies(p) {
  const r = seeded(67)
  const defs = `<radialGradient id="ff"><stop offset="0" stop-color="${p.glow}"/><stop offset=".25" stop-color="${p.glow}" stop-opacity=".6"/><stop offset="1" stop-color="${p.glow}" stop-opacity="0"/></radialGradient>`
  const style =
    `@keyframes drift{0%{transform:translate(0,0)}25%{transform:translate(40px,-30px)}50%{transform:translate(10px,-60px)}75%{transform:translate(-35px,-25px)}100%{transform:translate(0,0)}}` +
    `@keyframes blink{0%,100%{opacity:.15}45%,55%{opacity:1}}` +
    `.ff{animation:drift ease-in-out infinite,blink ease-in-out infinite}`
  let body = '<g class="lo">'
  for (let i = 0; i < 46; i++) {
    const dur = n(9 + r() * 10)
    body += `<circle class="ff" cx="${n(r() * W)}" cy="${n(180 + r() * (H - 180))}" r="${n(9 + r() * 10)}" fill="url(#ff)" style="animation-duration:${dur}s,${n(2.5 + r() * 4)}s;animation-delay:${n(-r() * dur)}s,${n(-r() * 5)}s"/>`
  }
  return frame(p, style, body + '</g>', defs)
}

function sunset(p) {
  const sun = hsl((p.hue + 10) % 360, 85, 62)
  const sky = hsl((p.hue + 330) % 360, 70, 70)
  const defs =
    `<radialGradient id="sun"><stop offset="0" stop-color="${sun}"/><stop offset=".45" stop-color="${sun}" stop-opacity=".6"/><stop offset="1" stop-color="${sun}" stop-opacity="0"/></radialGradient>` +
    `<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${sky}" stop-opacity=".45"/><stop offset=".6" stop-color="${p.glow}" stop-opacity=".12"/><stop offset="1" stop-color="${p.glow}" stop-opacity="0"/></linearGradient>` +
    `<radialGradient id="soft"><stop offset="0" stop-color="${hsl((p.hue + 340) % 360, 60, 85)}"/><stop offset=".6" stop-color="${hsl((p.hue + 340) % 360, 60, 85)}" stop-opacity=".7"/><stop offset="1" stop-color="${hsl((p.hue + 340) % 360, 60, 85)}" stop-opacity="0"/></radialGradient>`
  const style =
    `@keyframes cloud{from{transform:translateX(-900px)}to{transform:translateX(${W + 900}px)}}` +
    `@keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.06)}}` +
    `.c{animation:cloud linear infinite}.sun{animation:pulse 12s ease-in-out infinite;transform-box:fill-box;transform-origin:center}`
  const r = seeded(79)
  let clouds = ''
  for (let i = 0; i < 7; i++) {
    const dur = n(90 + r() * 80)
    const y = n(60 + r() * 260)
    const s = 0.7 + r() * 0.8
    clouds += `<g><g class="c" style="animation-duration:${dur}s;animation-delay:${n(-r() * dur)}s" fill="url(#soft)" opacity=".6"><ellipse cx="0" cy="${y}" rx="${n(150 * s)}" ry="${n(34 * s)}"/><ellipse cx="${n(70 * s)}" cy="${n(y - 20 * s)}" rx="${n(90 * s)}" ry="${n(30 * s)}"/></g></g>`
  }
  const body =
    `<rect width="${W}" height="${H}" fill="url(#sky)"/>` +
    `<circle class="sun" cx="1330" cy="250" r="230" fill="url(#sun)" opacity=".7"/>` +
    `<g class="lo">${clouds}</g>`
  return frame(p, style, body, defs)
}

function clouds(p) {
  const r = seeded(137)
  const tones = [hsl(p.hue, 60, 86), hsl((p.hue + 40) % 360, 55, 84), hsl((p.hue + 320) % 360, 55, 85)]
  const defs = tones.map((c, k) => `<radialGradient id="pf${k}"><stop offset="0" stop-color="${c}"/><stop offset=".6" stop-color="${c}" stop-opacity=".7"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></radialGradient>`).join('')
  const style =
    `@keyframes drift2{from{transform:translateX(-1000px)}to{transform:translateX(${W + 1000}px)}}` +
    `.cl{animation:drift2 linear infinite}` + TWINKLE
  let body = '<g class="lo">'
  for (let i = 0; i < 12; i++) {
    const dur = n(110 + r() * 90)
    const y = n(r() * H)
    const s = 0.7 + r() * 1.1
    body += `<g><g class="cl" fill="url(#pf${i % 3})" opacity=".55" style="animation-duration:${dur}s;animation-delay:${n(-r() * dur)}s"><ellipse cy="${y}" rx="${n(190 * s)}" ry="${n(60 * s)}"/><ellipse cx="${n(110 * s)}" cy="${n(y - 30 * s)}" rx="${n(120 * s)}" ry="${n(55 * s)}"/></g></g>`
  }
  body += `<g opacity=".5">${starField({ ...p, glow: hsl(p.hue, 40, 95) }, 139, 40)}</g>`
  return frame(p, style, body + '</g>', defs)
}

function ripples(p) {
  const r = seeded(193)
  const style =
    `@keyframes ring{0%{transform:scale(.1);opacity:0}8%{opacity:.9}100%{transform:scale(1);opacity:0}}` +
    `.rg{animation:ring ease-out infinite;transform-box:fill-box;transform-origin:center}`
  let body = `<g class="lo" fill="none">`
  for (let i = 0; i < 16; i++) {
    const x = n(r() * W)
    const y = n(r() * H)
    const dur = n(5 + r() * 5)
    const delay = n(-r() * dur)
    for (let k = 0; k < 3; k++) {
      body += `<circle class="rg" cx="${x}" cy="${y}" r="${n(120 + r() * 60)}" stroke="${k === 0 ? p.glow : hsl(p.hue, 50, 80)}" stroke-width="${2 - k * 0.5}" style="animation-duration:${dur}s;animation-delay:${n(delay - k * 0.6)}s"/>`
    }
  }
  return frame(p, style, body + '</g>')
}

function contours(p) {
  const r = seeded(197)
  const style =
    `@keyframes breathe{0%,100%{transform:scale(1) rotate(0deg)}50%{transform:scale(1.05) rotate(4deg)}}` +
    `.ct{animation:breathe ease-in-out infinite;transform-box:fill-box;transform-origin:center}`
  let body = `<g class="lo" fill="none" stroke="${p.glow}" stroke-width="1.6">`
  const centers = [[260, 240], [1300, 300], [900, 820], [180, 860], [1500, 900]]
  for (const [cx, cy] of centers) {
    const dur = n(20 + r() * 20)
    let g = ''
    for (let k = 1; k <= 9; k++) {
      const base = k * 34
      let d = ''
      for (let a = 0; a <= 24; a++) {
        const ang = (a / 24) * Math.PI * 2
        const wob = base + Math.sin(ang * 3 + k) * 10 + Math.cos(ang * 2 - k) * 8
        d += `${a === 0 ? 'M' : 'L'}${n(cx + Math.cos(ang) * wob)} ${n(cy + Math.sin(ang) * wob * 0.8)} `
      }
      g += `<path d="${d}Z" opacity="${n(0.25 + (k % 3) * 0.15)}"/>`
    }
    body += `<g class="ct" style="animation-duration:${dur}s;animation-delay:-${n(r() * dur)}s">${g}</g>`
  }
  return frame(p, style, body + '</g>')
}

const BUILDERS = { petals, leaves, snow, rain, waves, fireflies, sunset, clouds, ripples, contours }

const args = {}
const argv = process.argv.slice(2)
for (let i = 0; i < argv.length; i++) {
  const a = argv[i]
  if (!a.startsWith('--')) continue
  const key = a.slice(2)
  const next = argv[i + 1]
  if (next === undefined || next.startsWith('--')) args[key] = true
  else { args[key] = next; i++ }
}

const kinds = Object.keys(SCENES)

if (args.list) {
  for (const k of kinds) console.log(`${k.padEnd(14)} ${SCENES[k].emoji}  ${SCENES[k].label}`)
  process.exit(0)
}

function fail(message) {
  console.error(`Error: ${message}`)
  process.exit(1)
}

const scene = String(args.scene ?? 'stars')
if (!kinds.includes(scene)) fail(`unknown scene "${scene}". Run with --list to see the ${kinds.length} in this script.`)
const color = String(args.color ?? '#a35bff')
if (!/^#?[0-9a-fA-F]{6}$/.test(color)) fail(`--color must be a six-digit hex color like "#ff6b6b".`)
const mode = String(args.mode ?? 'dark')
if (!['dark', 'light', 'auto'].includes(mode)) fail('--mode must be dark, light or auto.')
const width = Number(args.width ?? 1600)
const height = Number(args.height ?? 900)
if (!(width >= 100 && width <= 4000 && height >= 60 && height <= 4000)) fail('--width and --height must be between 100 and 4000.')

function hsl(h, s, l) {
  s /= 100
  l /= 100
  const k = n => (n + h / 30) % 12
  const a = s * Math.min(l, 1 - l)
  const f = n => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))
  return '#' + [f(0), f(8), f(4)].map(x => Math.round(x * 255).toString(16).padStart(2, '0')).join('')
}

function hueSat(hex) {
  const h6 = hex.replace('#', '')
  const [r, g, b] = [0, 2, 4].map(i => parseInt(h6.slice(i, i + 2), 16) / 255)
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const l = (max + min) / 2
  const d = max - min
  if (d === 0) return [0, 0]
  const s = d / (1 - Math.abs(2 * l - 1))
  let h = max === r ? ((g - b) / d) % 6 : max === g ? (b - r) / d + 2 : (r - g) / d + 4
  return [Math.round((h * 60 + 360) % 360), Math.round(Math.min(s, 0.7) * 100)]
}

const [hue, sat] = hueSat(color)
const palette = {
  light: hsl(hue, sat * 0.9, 87),
  dark: hsl(hue, sat * 0.72, 7),
  accent: hsl(hue, Math.max(sat, 45), 38),
  glow: hsl(hue, Math.max(sat, 55), 64),
  hue,
}

let svg = BUILDERS[scene](palette)

// The scenes follow the viewer's light or dark mode; --mode can pin one.
const media = /@media \(prefers-color-scheme: dark\)\{(\.bg\{fill:[^}]+\}\.lo\{opacity:\.8\})\}/
if (mode === 'dark') svg = svg.replace(media, '$1').replace(/\.bg\{fill:#[0-9a-f]{6}\}\.lo\{opacity:\.55\}/, '')
if (mode === 'light') svg = svg.replace(media, '')

// Size: the art is drawn on a 1600 x 1000 canvas and cropped to fit.
svg = svg.replace('<svg ', `<svg width="${width}" height="${height}" `)

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
if (args.title || args.subtitle) {
  const ink = mode === 'light' ? '#1a1a1a' : '#ffffff'
  const sub = mode === 'light' ? palette.accent : hsl(hue, 70, 85)
  // The art is a 1600 x 1000 canvas cropped to the chosen shape, so place the
  // text inside the part that stays visible, sized to its width.
  const ratio = width / height
  const visW = ratio < 1.6 ? 1000 * ratio : 1600
  const visH = ratio < 1.6 ? 1000 : 1600 / ratio
  const x0 = (1600 - visW) / 2
  const y0 = (1000 - visH) / 2
  const size = Math.round(Math.min(96, visW / 13, visH / 6))
  const left = Math.round(x0 + visW * 0.06)
  const base = Math.round(y0 + visH * 0.55)
  const block =
    `<g font-family="-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif">` +
    (args.title ? `<text x="${left}" y="${base}" font-size="${size}" font-weight="800" fill="${ink}">${esc(args.title)}</text>` : '') +
    (args.subtitle ? `<text x="${left + 4}" y="${base + Math.round(size * 0.72)}" font-size="${Math.round(size * 0.36)}" fill="${sub}">${esc(args.subtitle)}</text>` : '') +
    `</g>`
  svg = svg.replace(/<\/svg>$/, `${block}</svg>`)
}

const out = String(args.out ?? `${scene}.svg`)
save(out, svg)
console.log(`Wrote ${out}: ${SCENES[scene].emoji} ${SCENES[scene].label}, ${width}x${height}, ${mode} mode, ${(svg.length / 1024).toFixed(1)} KB`)
