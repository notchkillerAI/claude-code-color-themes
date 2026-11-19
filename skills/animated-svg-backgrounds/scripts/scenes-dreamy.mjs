#!/usr/bin/env node
// Animated SVG scenes (dreamy). Dreamy and fun scenes: psychedelic flow, mesh gradient, lava lamp, bokeh lights, bubbles, floating lanterns, hearts, confetti and drifting crystals.
// Self-contained: needs only Node.js 18+, reads no other files, writes only --out.
//   node scenes-dreamy.mjs --list
//   node scenes-dreamy.mjs --scene psychflow --color "#a35bff" --out background.svg
// From Claude Color Themes: github.com/notchkillerAI/claude-code-color-themes

import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname } from 'node:path'

// Writes a file, creating its folder first if needed.
function save(file, text) {
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(file, text)
}

const SCENES = {
  psychflow: { emoji: '🌀', label: 'Psychedelic flow' },
  mesh: { emoji: '🍬', label: 'Mesh gradient' },
  lavalamp: { emoji: '🫠', label: 'Lava lamp' },
  bokeh: { emoji: '🎇', label: 'Bokeh lights' },
  bubbles: { emoji: '🫧', label: 'Rising bubbles' },
  lanterns: { emoji: '🏮', label: 'Floating lanterns' },
  hearts: { emoji: '💗', label: 'Floating hearts' },
  confetti: { emoji: '🎉', label: 'Confetti' },
  crystals: { emoji: '💎', label: 'Drifting crystals' },
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

const risingStyle = (sway) =>
  `@keyframes up{from{transform:translate(0,${H + 120}px)}50%{transform:translate(${sway}px,0)}to{transform:translate(0,-${H + 120}px)}}.u{animation:up linear infinite}`

function rising(seed, count, shape, speed) {
  const r = seeded(seed)
  let body = '<g class="lo">'
  for (let i = 0; i < count; i++) {
    const dur = n(speed[0] + r() * (speed[1] - speed[0]))
    body += `<g transform="translate(${n(r() * W)},${n(r() * H)})"><g class="u" style="animation-duration:${dur}s;animation-delay:${n(-r() * dur)}s">${shape(r, i)}</g></g>`
  }
  return body + '</g>'
}

function psychflow(p) {
  const c = [p.glow, hsl((p.hue + 35) % 360, 85, 62), hsl((p.hue + 100) % 360, 90, 60), hsl((p.hue + 295) % 360, 85, 62)]
  const defs =
    `<linearGradient id="psy" x1="0" y1="0" x2="1" y2="1">` +
    `<stop offset="0" stop-color="${c[0]}"/><stop offset=".35" stop-color="${c[1]}"/><stop offset=".7" stop-color="${c[2]}"/><stop offset="1" stop-color="${c[3]}"/>` +
    `<animateTransform attributeName="gradientTransform" type="rotate" values="0 .5 .5;360 .5 .5" dur="40s" repeatCount="indefinite"/></linearGradient>`
  const style =
    `@keyframes flow{0%,100%{transform:translate(0,0) skewY(0deg)}50%{transform:translate(-60px,24px) skewY(3deg)}}` +
    `.fl{animation:flow ease-in-out infinite}`
  let body = '<g class="lo" fill="none" stroke="url(#psy)" stroke-width="10" stroke-linecap="round">'
  for (let i = 0; i < 30; i++) {
    const y = -80 + i * 40
    const amp = 40 + 30 * Math.sin(i * 0.5)
    let d = `M-200 ${y}`
    for (let x = -200; x < W + 200; x += 300) {
      d += ` C${x + 100} ${n(y - amp)} ${x + 200} ${n(y + amp)} ${x + 300} ${y}`
    }
    body += `<path class="fl" d="${d}" opacity="${n(0.35 + 0.5 * ((i % 5) / 5))}" style="animation-duration:${n(14 + (i % 7))}s;animation-delay:-${n(i * 0.7)}s"/>`
  }
  return frame(p, style, body + '</g>', defs)
}

function mesh(p) {
  const tones = [p.glow, hsl((p.hue + 60) % 360, 80, 66), hsl((p.hue + 300) % 360, 75, 68), hsl((p.hue + 180) % 360, 60, 66)]
  const defs = tones.map((c, k) => `<radialGradient id="mg${k}"><stop offset="0" stop-color="${c}"/><stop offset=".55" stop-color="${c}" stop-opacity=".55"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></radialGradient>`).join('')
  const style =
    `@keyframes m1{0%,100%{transform:translate(0,0)}33%{transform:translate(380px,160px)}66%{transform:translate(-200px,260px)}}` +
    `@keyframes m2{0%,100%{transform:translate(0,0)}33%{transform:translate(-340px,-120px)}66%{transform:translate(180px,-240px)}}` +
    `.m1{animation:m1 46s ease-in-out infinite}.m2{animation:m2 54s ease-in-out infinite}`
  const body =
    `<g class="lo" opacity=".8">` +
    `<circle class="m1" cx="250" cy="200" r="560" fill="url(#mg0)"/>` +
    `<circle class="m2" cx="1350" cy="250" r="580" fill="url(#mg1)"/>` +
    `<circle class="m2" style="animation-delay:-20s" cx="400" cy="850" r="540" fill="url(#mg2)"/>` +
    `<circle class="m1" style="animation-delay:-30s" cx="1250" cy="850" r="560" fill="url(#mg3)"/>` +
    `</g>`
  return frame(p, style, body, defs)
}

function lavalamp(p) {
  const r = seeded(163)
  const tones = [p.glow, hsl((p.hue + 30) % 360, 85, 62), hsl((p.hue + 340) % 360, 80, 58)]
  const defs = tones.map((c, k) => `<radialGradient id="lv${k}"><stop offset="0" stop-color="${c}"/><stop offset=".6" stop-color="${c}" stop-opacity=".85"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></radialGradient>`).join('')
  const style =
    `@keyframes blob{0%{transform:translate(0,140px) scale(1,1)}25%{transform:translate(30px,-80px) scale(1.2,.85)}50%{transform:translate(-20px,-260px) scale(.85,1.2)}75%{transform:translate(20px,-80px) scale(1.15,.9)}100%{transform:translate(0,140px) scale(1,1)}}` +
    `.bl{animation:blob ease-in-out infinite;transform-box:fill-box;transform-origin:center}`
  let body = `<g class="lo">`
  for (let i = 0; i < 14; i++) {
    const dur = n(18 + r() * 16)
    body += `<circle class="bl" cx="${n(r() * W)}" cy="${n(300 + r() * 600)}" r="${n(80 + r() * 110)}" fill="url(#lv${i % 3})" opacity=".6" style="animation-duration:${dur}s;animation-delay:${n(-r() * dur)}s"/>`
  }
  return frame(p, style, body + '</g>', defs)
}

function bokeh(p) {
  const r = seeded(179)
  const tones = [p.glow, hsl((p.hue + 35) % 360, 80, 66), hsl(45, 90, 70), hsl((p.hue + 320) % 360, 70, 70)]
  const defs = tones.map((c, k) => `<radialGradient id="bk${k}"><stop offset="0" stop-color="${c}" stop-opacity=".25"/><stop offset=".8" stop-color="${c}" stop-opacity=".5"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></radialGradient>`).join('')
  const style =
    `@keyframes bob2{0%,100%{transform:translate(0,0);opacity:.35}50%{transform:translate(30px,-40px);opacity:.85}}` +
    `.bk{animation:bob2 ease-in-out infinite}`
  let body = `<g class="lo">`
  for (let i = 0; i < 32; i++) {
    const dur = n(8 + r() * 12)
    const rad = n(16 + r() * 52)
    body += `<circle class="bk" cx="${n(r() * W)}" cy="${n(r() * H)}" r="${rad}" fill="url(#bk${i % 4})" style="animation-duration:${dur}s;animation-delay:${n(-r() * dur)}s"/>`
  }
  return frame(p, style, body + '</g>', defs)
}

function bubbles(p) {
  const r = seeded(83)
  const style =
    `@keyframes rise{from{transform:translate(0,${H + 80}px)}50%{transform:translate(30px,0)}to{transform:translate(0,-${H + 80}px)}}` +
    `.bb{animation:rise linear infinite}`
  let body = '<g class="lo">'
  for (let i = 0; i < 38; i++) {
    const dur = n(16 + r() * 22)
    const rad = n(4 + r() * 18)
    body += `<g transform="translate(${n(r() * W)},${n(r() * H)})"><g class="bb" style="animation-duration:${dur}s;animation-delay:${n(-r() * dur)}s"><circle r="${rad}" fill="${p.glow}" fill-opacity=".08" stroke="${p.glow}" stroke-opacity=".55" stroke-width="1.5"/><circle cx="${n(-rad * 0.35)}" cy="${n(-rad * 0.35)}" r="${n(rad * 0.22)}" fill="#ffffff" opacity=".6"/></g></g>`
  }
  return frame(p, style, body + '</g>')
}

function lanterns(p) {
  const warm = hsl((p.hue + 20) % 360, 90, 60)
  const defs =
    `<radialGradient id="halo"><stop offset="0" stop-color="${warm}" stop-opacity=".55"/><stop offset="1" stop-color="${warm}" stop-opacity="0"/></radialGradient>` +
    `<linearGradient id="lamp" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${hsl(45, 95, 72)}"/><stop offset="1" stop-color="${warm}"/></linearGradient>`
  const style = `@keyframes flick{0%,100%{opacity:.85}50%{opacity:1}}.lamp{animation:flick 3s ease-in-out infinite}`
  const body = rising(
    101,
    40,
    r => {
      const s = 0.6 + r() * 0.9
      return `<circle r="${n(46 * s)}" cy="${n(4 * s)}" fill="url(#halo)"/><g class="lamp"><rect x="${n(-11 * s)}" y="${n(-16 * s)}" width="${n(22 * s)}" height="${n(30 * s)}" rx="${n(8 * s)}" fill="url(#lamp)"/><rect x="${n(-7 * s)}" y="${n(-19 * s)}" width="${n(14 * s)}" height="${n(4 * s)}" rx="1" fill="${p.accent}" opacity=".6"/></g>`
    },
    [30, 55],
  )
  return frame(p, style + risingStyle(50), body, defs)
}

function hearts(p) {
  const tones = [p.glow, hsl((p.hue + 340) % 360, 75, 70), hsl((p.hue + 15) % 360, 70, 76)]
  const body = rising(
    107,
    34,
    (r, i) => {
      const s = 0.5 + r() * 1
      return `<path d="M0 ${n(6 * s)} C${n(-14 * s)} ${n(-4 * s)} ${n(-8 * s)} ${n(-16 * s)} 0 ${n(-8 * s)} C${n(8 * s)} ${n(-16 * s)} ${n(14 * s)} ${n(-4 * s)} 0 ${n(6 * s)}Z" fill="${tones[i % 3]}" opacity=".8"/>`
    },
    [20, 38],
  )
  return frame(p, risingStyle(40), body)
}

function confetti(p) {
  const tones = [0, 60, 140, 200, 280].map(d => hsl((p.hue + d) % 360, 75, 62))
  return falling(
    p,
    113,
    56,
    (r, i) => {
      const c = tones[i % tones.length]
      return r() > 0.5
        ? `<rect x="-5" y="-3" width="${n(8 + r() * 6)}" height="${n(4 + r() * 3)}" rx="1" fill="${c}"/>`
        : `<circle r="${n(2.5 + r() * 2.5)}" fill="${c}"/>`
    },
    [10, 20],
    60,
    true,
  )
}

function crystals(p) {
  const r = seeded(131)
  const tones = [p.glow, hsl((p.hue + 30) % 360, 70, 70), hsl((p.hue + 330) % 360, 60, 75)]
  const style =
    `@keyframes float{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-40px) rotate(25deg)}}` +
    `.cr{animation:float ease-in-out infinite;transform-box:fill-box;transform-origin:center}`
  const poly = (sides, rad) => {
    let pts = ''
    for (let k = 0; k < sides; k++) {
      const a = (Math.PI * 2 * k) / sides - Math.PI / 2
      pts += `${n(Math.cos(a) * rad)},${n(Math.sin(a) * rad * (sides === 4 ? 1.5 : 1))} `
    }
    return pts.trim()
  }
  let body = '<g class="lo">'
  for (let i = 0; i < 26; i++) {
    const rad = n(14 + r() * 40)
    const sides = [3, 4, 6][i % 3] ?? 6
    const c = tones[i % 3]
    const dur = n(12 + r() * 14)
    body += `<g transform="translate(${n(r() * W)},${n(r() * H)})"><polygon class="cr" points="${poly(sides, rad)}" fill="${c}" fill-opacity=".14" stroke="${c}" stroke-opacity=".7" stroke-width="1.5" style="animation-duration:${dur}s;animation-delay:${n(-r() * dur)}s"/></g>`
  }
  return frame(p, style, body + '</g>')
}

const BUILDERS = { psychflow, mesh, lavalamp, bokeh, bubbles, lanterns, hearts, confetti, crystals }

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
