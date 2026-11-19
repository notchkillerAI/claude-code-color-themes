#!/usr/bin/env node
// Animated SVG scenes (space). Space, retro and tech scenes: stars, northern lights, synthwave shooting stars, neon grid, hyperspace, orbits, code rain and an equalizer.
// Self-contained: needs only Node.js 18+, reads no other files, writes only --out.
//   node scenes-space.mjs --list
//   node scenes-space.mjs --scene stars --color "#a35bff" --out background.svg
// From Claude Color Themes: github.com/notchkillerAI/claude-code-color-themes

import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname } from 'node:path'

// Writes a file, creating its folder first if needed.
function save(file, text) {
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, text)
}

const SCENES = {
  stars: { emoji: '✨', label: 'Twinkling stars' },
  aurora: { emoji: '🌌', label: 'Northern lights' },
  shootingstars: { emoji: '🌠', label: 'Shooting stars' },
  grid: { emoji: '🌆', label: 'Neon grid' },
  warp: { emoji: '🚀', label: 'Hyperspace' },
  orbits: { emoji: '🪐', label: 'Orbits' },
  coderain: { emoji: '💻', label: 'Code rain' },
  equalizer: { emoji: '🎵', label: 'Equalizer' },
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

function stars(p) {
  const style =
    TWINKLE +
    `@keyframes shoot{0%,88%{transform:translate(0,0);opacity:0}90%{opacity:1}100%{transform:translate(-520px,300px);opacity:0}}` +
    `.sh{animation:shoot 14s linear infinite}`
  const body =
    '<g class="lo">' +
    starField(p, 53, 150) +
    `<path class="sh" d="M1400 80 l-90 52" stroke="${p.glow}" stroke-width="2" stroke-linecap="round" opacity="0"/>` +
    `<path class="sh" style="animation-delay:-7s" d="M1100 40 l-90 52" stroke="${p.glow}" stroke-width="2" stroke-linecap="round" opacity="0"/>` +
    '</g>'
  return frame(p, style, body)
}

function aurora(p) {
  const c1 = p.glow
  const c2 = hsl((p.hue + 50) % 360, 70, 60)
  const c3 = hsl((p.hue + 300) % 360, 60, 62)
  const defs =
    `<linearGradient id="a1" x1="0" x2="1"><stop offset="0" stop-color="${c1}" stop-opacity="0"/><stop offset=".5" stop-color="${c1}"/><stop offset="1" stop-color="${c2}" stop-opacity="0"/></linearGradient>` +
    `<linearGradient id="a2" x1="0" x2="1"><stop offset="0" stop-color="${c3}" stop-opacity="0"/><stop offset=".5" stop-color="${c2}"/><stop offset="1" stop-color="${c1}" stop-opacity="0"/></linearGradient>`
  const style =
    `@keyframes sway{0%,100%{transform:translateX(-120px) scaleY(1)}50%{transform:translateX(120px) scaleY(1.25)}}` +
    `@keyframes glowp{0%,100%{opacity:.35}50%{opacity:.75}}` +
    `.band{animation:sway ease-in-out infinite,glowp ease-in-out infinite;transform-box:fill-box;transform-origin:center}`
  const band = (d, fill, dur, delay) =>
    `<g class="band" style="animation-duration:${dur}s,${dur * 0.7}s;animation-delay:${delay}s" fill="none" stroke="url(#${fill})" stroke-linecap="round">` +
    [300, 230, 170, 120, 75, 35].map((w, k) => `<path d="${d}" stroke-width="${w}" opacity="${n(0.05 + k * 0.035)}"/>`).join('') + `</g>`
  const body =
    `<g class="lo">` +
    band('M-100 260 C300 120 600 380 900 220 S1500 120 1700 260', 'a1', 26, -3) +
    band('M-100 360 C350 240 650 460 1000 300 S1500 220 1700 340', 'a2', 34, -11) +
    band('M-100 180 C400 80 800 300 1100 160 S1500 80 1700 200', 'a1', 30, -19) +
    `</g>` +
    `<g opacity=".35">${starField(p, 59, 90)}</g>`
  return frame(p, style + TWINKLE, body, defs)
}

function shootingstars(p) {
  const pink = hsl((p.hue + 330) % 360, 85, 62)
  const sun1 = hsl(45, 95, 62)
  const r = seeded(151)
  const floor = rollingFloor(640, 12, 7, 'sfl')
  const defs =
    `<linearGradient id="sky2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${hsl(p.hue, 60, 12)}" stop-opacity=".9"/><stop offset=".7" stop-color="${hsl((p.hue + 330) % 360, 70, 30)}" stop-opacity=".75"/><stop offset="1" stop-color="${pink}" stop-opacity=".6"/></linearGradient>` +
    `<linearGradient id="sun2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${sun1}"/><stop offset="1" stop-color="${pink}"/></linearGradient>` +
    `<linearGradient id="tail" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ffffff" stop-opacity="0"/><stop offset="1" stop-color="#ffffff"/></linearGradient>` +
    `<clipPath id="sunclip"><rect x="1050" y="360" width="500" height="280"/></clipPath><clipPath id="sundisc"><circle cx="1300" cy="560" r="190"/></clipPath>`
  const style =
    TWINKLE +
    `@keyframes streak{0%{transform:translate(0,0);opacity:0}8%{opacity:1}45%{opacity:.9}60%{transform:translate(-760px,456px);opacity:0}100%{transform:translate(-760px,456px);opacity:0}}` +
    `.st{animation:streak 6s linear infinite;will-change:transform,opacity}` +
    floor.style
  let streaks = ''
  // One leaves every half second, from a different place each time: a steady stream.
  for (let i = 0; i < 12; i++) {
    streaks += `<g transform="translate(${n(500 + r() * 1300)},${n(-40 + r() * 300)}) rotate(149)"><rect class="st" width="${n(120 + r() * 80)}" height="2.4" rx="1.2" fill="url(#tail)" style="animation-delay:-${n(i * 0.5)}s"/></g>`
  }
  let stripes = ''
  for (let i = 0; i < 6; i++) stripes += `<rect x="1040" y="${520 + i * 20}" width="520" height="${3 + i * 2}" fill="${hsl(p.hue, 60, 14)}"/>`
  const horizon = 640
  let vlines = ''
  for (let i = -18; i <= 18; i++) vlines += `<path d="M${800 + i * 28} ${horizon} L${800 + i * 200} ${H + 40}"/>`
  const body =
    `<rect width="${W}" height="${H}" fill="url(#sky2)"/>` +
    `<g opacity=".8">${starField({ ...p, glow: '#ffffff' }, 157, 120)}</g>` +
    `<g clip-path="url(#sunclip)"><g clip-path="url(#sundisc)"><circle cx="1300" cy="560" r="190" fill="url(#sun2)"/>${stripes}</g></g>` +
    streaks +
    `<rect y="${horizon}" width="${W}" height="${H - horizon}" fill="${hsl(p.hue, 60, 8)}" opacity=".85"/>` +
    `<g stroke="${pink}" stroke-width="2" opacity=".75">${vlines}${floor.lines}</g>` +
    `<path d="M0 ${horizon} H${W}" stroke="${sun1}" stroke-width="3"/>`
  return frame(p, style, body, defs)
}

/**
 * A perspective floor that rolls forever: every line starts at the horizon,
 * speeds up as it comes closer, and leaves past the bottom, each one evenly
 * staggered, so there is never a jump or a reset.
 */
function rollingFloor(horizon, count, seconds, name) {
  const travel = H - horizon + 60
  const style =
    `@keyframes ${name}{0%{transform:translateY(0);opacity:0}6%{opacity:1}100%{transform:translateY(${travel}px);opacity:1}}` +
    `.${name}{animation:${name} ${seconds}s cubic-bezier(.55,0,.9,.6) infinite;will-change:transform}`
  let lines = ''
  for (let k = 0; k < count; k++) {
    lines += `<path class="${name}" d="M-200 ${horizon} H${W + 200}" style="animation-delay:-${n((k * seconds) / count)}s"/>`
  }
  return { style, lines }
}

function grid(p) {
  const neon = p.glow
  const neon2 = hsl((p.hue + 60) % 360, 85, 62)
  const floor = rollingFloor(640, 10, 6, 'gfl')
  const defs =
    `<linearGradient id="sunG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${neon2}"/><stop offset="1" stop-color="${neon}"/></linearGradient>` +
    `<linearGradient id="fade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${neon}" stop-opacity="0"/><stop offset="1" stop-color="${neon}" stop-opacity=".9"/></linearGradient>` +
    `<clipPath id="half"><rect x="1120" y="40" width="440" height="230"/></clipPath>`
  const style =
    floor.style +
    `@keyframes hum{0%,100%{opacity:.75}50%{opacity:1}}.sunr{animation:hum 6s ease-in-out infinite}`
  const horizon = 640
  let vertical = ''
  for (let i = -16; i <= 16; i++) {
    vertical += `<path d="M${800 + i * 30} ${horizon} L${800 + i * 190} ${H + 40}" />`
  }
  let stripes = ''
  for (let i = 0; i < 6; i++) {
    stripes += `<rect x="1100" y="${170 + i * 18}" width="480" height="${3 + i * 1.5}" class="bg"/>`
  }
  const body =
    `<g class="lo">` +
    `<g class="sunr"><circle cx="1340" cy="270" r="200" fill="url(#sunG)" clip-path="url(#half)" opacity=".85"/>${stripes}</g>` +
    `<rect y="${horizon}" width="${W}" height="${H - horizon}" fill="url(#fade)" opacity=".18"/>` +
    `<g stroke="${neon}" stroke-width="2" opacity=".6">${vertical}</g>` +
    `<g stroke="${neon}" stroke-width="2" opacity=".6">${floor.lines}</g>` +
    `<path d="M0 ${horizon} H${W}" stroke="${neon2}" stroke-width="3" opacity=".9"/>` +
    `</g>`
  return frame(p, style, body, defs)
}

function warp(p) {
  const r = seeded(173)
  const cx = 1180
  const cy = 300
  const style =
    `@keyframes zoom{0%{transform:scale(.05);opacity:0}15%{opacity:1}100%{transform:scale(1.6);opacity:0}}` +
    `.z{animation:zoom ease-in infinite;transform-origin:${cx}px ${cy}px}`
  let body = `<g class="lo" stroke-linecap="round">`
  for (let i = 0; i < 70; i++) {
    const a = r() * Math.PI * 2
    const d1 = 120 + r() * 700
    const d2 = d1 + 40 + r() * 90
    const dur = n(2.5 + r() * 3.5)
    const c = r() > 0.75 ? p.glow : hsl(p.hue, 30, 90)
    body += `<path class="z" d="M${n(cx + Math.cos(a) * d1)} ${n(cy + Math.sin(a) * d1)} L${n(cx + Math.cos(a) * d2)} ${n(cy + Math.sin(a) * d2)}" stroke="${c}" stroke-width="${n(1 + r() * 2)}" style="animation-duration:${dur}s;animation-delay:${n(-r() * dur)}s"/>`
  }
  return frame(p, style, body + '</g>')
}

function orbits(p) {
  const cx = 1330
  const cy = 230
  const defs = `<radialGradient id="star0"><stop offset="0" stop-color="${hsl(45, 95, 75)}"/><stop offset=".5" stop-color="${hsl((p.hue + 20) % 360, 90, 60)}" stop-opacity=".7"/><stop offset="1" stop-color="${p.glow}" stop-opacity="0"/></radialGradient>`
  const style = `@keyframes spin{to{transform:rotate(360deg)}}.orb{animation:spin linear infinite;transform-origin:${cx}px ${cy}px}`
  const planets = [
    [90, 7, 9, p.glow],
    [150, 10, 16, hsl((p.hue + 40) % 360, 70, 62)],
    [220, 13, 26, hsl((p.hue + 200) % 360, 60, 62)],
    [300, 9, 38, hsl((p.hue + 320) % 360, 65, 66)],
    [390, 16, 60, hsl((p.hue + 90) % 360, 55, 60)],
    [480, 8, 85, p.glow],
  ]
  let body = `<g class="lo">${starField(p, 181, 90)}<circle cx="${cx}" cy="${cy}" r="70" fill="url(#star0)"/>`
  for (const [rad, size, dur, c] of planets) {
    body += `<circle cx="${cx}" cy="${cy}" r="${rad}" fill="none" stroke="${p.glow}" stroke-opacity=".25" stroke-dasharray="2 6"/>`
    body += `<g class="orb" style="animation-duration:${dur}s;animation-delay:-${n(dur * 0.37)}s"><circle cx="${cx + rad}" cy="${cy}" r="${size}" fill="${c}"/></g>`
  }
  return frame(p, style + TWINKLE, body + '</g>', defs)
}

function coderain(p) {
  const r = seeded(127)
  const ink = hsl(p.hue, 75, 66)
  const glyphs = '01{}<>/=;:+*#$%&[]()λ∑∆'
  const style =
    `@keyframes drop{from{transform:translateY(-${H + 420}px)}to{transform:translateY(${H + 40}px)}}` +
    `.col{animation:drop linear infinite;font-family:Menlo,Consolas,monospace;font-size:20px;font-weight:bold}`
  let body = '<g class="lo">'
  for (let c = 0; c < 38; c++) {
    const x = n(c * (W / 38) + r() * 12)
    const len = 7 + Math.floor(r() * 9)
    const dur = n(7 + r() * 9)
    let spans = ''
    for (let k = 0; k < len; k++) {
      const ch = glyphs[Math.floor(r() * glyphs.length)] ?? '0'
      const head = k === len - 1
      spans += `<tspan x="${x}" dy="22" fill="${head ? '#ffffff' : ink}" fill-opacity="${n(head ? 1 : 0.35 + (k / len) * 0.6)}">${ch.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')}</tspan>`
    }
    body += `<text class="col" y="${n(r() * H)}" style="animation-duration:${dur}s;animation-delay:${n(-r() * dur)}s">${spans}</text>`
  }
  return frame(p, style, body + '</g>')
}

function equalizer(p) {
  const r = seeded(191)
  const style =
    `@keyframes eq{0%,100%{transform:scaleY(.15)}50%{transform:scaleY(1)}}` +
    `.eq{animation:eq ease-in-out infinite;transform-box:fill-box;transform-origin:bottom}`
  const defs = `<linearGradient id="eqg" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="${p.glow}"/><stop offset="1" stop-color="${hsl((p.hue + 60) % 360, 85, 66)}"/></linearGradient>`
  const bars = 48
  const bw = W / bars
  let body = `<g class="lo">`
  for (let i = 0; i < bars; i++) {
    const h = n(80 + r() * 220)
    const dur = n(0.6 + r() * 1.2)
    body += `<rect class="eq" x="${n(i * bw + 3)}" y="${n(H - h)}" width="${n(bw - 6)}" height="${h}" rx="3" fill="url(#eqg)" opacity=".7" style="animation-duration:${dur}s;animation-delay:-${n(r() * dur)}s"/>`
    void 0
  }
  return frame(p, style, body + '</g>', defs)
}

const BUILDERS = { stars, aurora, shootingstars, grid, warp, orbits, coderain, equalizer }

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
