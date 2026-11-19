// Animated backdrop scenes, drawn as SVG with slow CSS motion.
// Every particle has a resting place in the plain markup, so a person who
// asked for reduced motion still sees a finished, still scene.

export type Palette = {
  /** Page color in light mode. */
  light: string
  /** Page color in dark mode. */
  dark: string
  /** The theme's accent. */
  accent: string
  /** A brighter accent, for things that glow. */
  glow: string
  /** The theme's hue, 0-360. */
  hue: number
}

export const SCENES = {
  petals: { emoji: '🌸', label: 'Falling petals' },
  leaves: { emoji: '🍂', label: 'Autumn leaves' },
  snow: { emoji: '❄️', label: 'Gentle snowfall' },
  stars: { emoji: '✨', label: 'Twinkling stars' },
  aurora: { emoji: '🌌', label: 'Northern lights' },
  waves: { emoji: '🌊', label: 'Ocean waves' },
  rain: { emoji: '🌧️', label: 'Soft rain' },
  fireflies: { emoji: '🌿', label: 'Fireflies' },
  sunset: { emoji: '🌅', label: 'Sunset clouds' },
  bubbles: { emoji: '🫧', label: 'Rising bubbles' },
  grid: { emoji: '🌆', label: 'Neon grid' },
  lanterns: { emoji: '🏮', label: 'Floating lanterns' },
  coderain: { emoji: '💻', label: 'Code rain' },
  confetti: { emoji: '🎉', label: 'Confetti' },
  hearts: { emoji: '💗', label: 'Floating hearts' },
  crystals: { emoji: '💎', label: 'Drifting crystals' },
  clouds: { emoji: '☁️', label: 'Dreamy clouds' },
  psychflow: { emoji: '🌀', label: 'Psychedelic flow' },
  shootingstars: { emoji: '🌠', label: 'Shooting stars' },
  lavalamp: { emoji: '🫠', label: 'Lava lamp' },
  mesh: { emoji: '🍬', label: 'Mesh gradient' },
  warp: { emoji: '🚀', label: 'Hyperspace' },
  bokeh: { emoji: '🎇', label: 'Bokeh lights' },
  orbits: { emoji: '🪐', label: 'Orbits' },
  equalizer: { emoji: '🎵', label: 'Equalizer' },
  ripples: { emoji: '💧', label: 'Ripples' },
  contours: { emoji: '🗺️', label: 'Topographic' },
  plain: { emoji: '🎨', label: 'Plain' },
} as const

export type SceneKind = keyof typeof SCENES

export const SCENE_KINDS = Object.keys(SCENES) as SceneKind[]

const W = 1600
const H = 1000

// A small seeded random source, so a scene draws the same every time.
function seeded(seed: number): () => number {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const n = (x: number) => Math.round(x * 10) / 10

function hsl(h: number, s: number, l: number): string {
  s /= 100
  l /= 100
  const k = (m: number) => (m + h / 30) % 12
  const a = s * Math.min(l, 1 - l)
  const f = (m: number) => l - a * Math.max(-1, Math.min(k(m) - 3, Math.min(9 - k(m), 1)))
  return '#' + [f(0), f(8), f(4)].map(x => Math.round(x * 255).toString(16).padStart(2, '0')).join('')
}

function frame(p: Palette, style: string, body: string, defs = ''): string {
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

/** Things drifting down the screen: petals, leaves, snow, rain. */
function falling(
  p: Palette,
  seed: number,
  count: number,
  shape: (r: () => number, i: number) => string,
  speed: [number, number],
  sway: number,
  spin: boolean,
): string {
  const r = seeded(seed)
  const style =
    `@keyframes fall{from{transform:translate(${-sway}px,-${H}px) rotate(0deg)}` +
    `50%{transform:translate(${sway}px,0) rotate(${spin ? 200 : 0}deg)}` +
    `to{transform:translate(${-sway}px,${H}px) rotate(${spin ? 400 : 0}deg)}}` +
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

function petals(p: Palette): string {
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

function leaves(p: Palette): string {
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

function snow(p: Palette): string {
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

function rain(p: Palette): string {
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

const TWINKLE =
  `@keyframes tw{0%,100%{opacity:.3}50%{opacity:1}}` +
  `.t0{animation:tw 4s ease-in-out infinite}.t1{animation:tw 5.5s ease-in-out infinite -1.5s}` +
  `.t2{animation:tw 7s ease-in-out infinite -3s}.t3{animation:tw 9s ease-in-out infinite -5s}`

/** Stars in four groups that twinkle out of step: four animations, not one per star. */
function starField(p: Palette, seed: number, count: number): string {
  const r = seeded(seed)
  const groups = ['', '', '', '']
  for (let i = 0; i < count; i++) {
    const big = r() > 0.9
    groups[i % 4] += `<circle cx="${n(r() * W)}" cy="${n(r() * H)}" r="${n(big ? 1.8 + r() * 1.4 : 0.6 + r() * 1.1)}" fill="${big ? p.glow : hsl(p.hue, 25, 88)}"/>`
  }
  return groups.map((g, k) => `<g class="t${k}">${g}</g>`).join('')
}

function stars(p: Palette): string {
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

function aurora(p: Palette): string {
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
  const band = (d: string, fill: string, dur: number, delay: number) =>
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

function waves(p: Palette): string {
  const tones = [hsl(p.hue, 55, 70), p.glow, p.accent, hsl(p.hue, 60, 30)]
  const style =
    `@keyframes roll{from{transform:translateX(0)}to{transform:translateX(-800px)}}` +
    `@keyframes bob{0%,100%{transform:translateY(0)}50%{transform:translateY(14px)}}` +
    `.w{animation:roll linear infinite}.b{animation:bob ease-in-out infinite}`
  const wave = (y: number, amp: number, fill: string, op: number, dur: number) => {
    let d = `M0 ${y}`
    for (let x = 0; x < W + 800; x += 400) {
      d += ` Q${x + 100} ${y - amp} ${x + 200} ${y} T${x + 400} ${y}`
    }
    d += ` V${H} H0Z`
    return `<g class="b" style="animation-duration:${n(dur * 0.45)}s"><path class="w" d="${d}" fill="${fill}" opacity="${op}" style="animation-duration:${dur}s"/></g>`
  }
  const body =
    `<g class="lo">` +
    wave(760, 26, tones[0]!, 0.35, 38) +
    wave(810, 32, tones[1]!, 0.35, 30) +
    wave(865, 22, tones[2]!, 0.35, 24) +
    wave(920, 18, tones[3]!, 0.35, 19) +
    `</g>`
  return frame(p, style, body)
}

function fireflies(p: Palette): string {
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

function sunset(p: Palette): string {
  const sun = hsl((p.hue + 10) % 360, 85, 62)
  const sky = hsl((p.hue + 330) % 360, 70, 70)
  const defs =
    `<radialGradient id="sun"><stop offset="0" stop-color="${sun}"/><stop offset=".45" stop-color="${sun}" stop-opacity=".6"/><stop offset="1" stop-color="${sun}" stop-opacity="0"/></radialGradient>` +
    `<linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${sky}" stop-opacity=".45"/><stop offset=".6" stop-color="${p.glow}" stop-opacity=".12"/><stop offset="1" stop-color="${p.glow}" stop-opacity="0"/></linearGradient>` +
    `<radialGradient id="soft"><stop offset="0" stop-color="${hsl((p.hue + 340) % 360, 60, 85)}"/><stop offset=".6" stop-color="${hsl((p.hue + 340) % 360, 60, 85)}" stop-opacity=".7"/><stop offset="1" stop-color="${hsl((p.hue + 340) % 360, 60, 85)}" stop-opacity="0"/></radialGradient>`
  const style =
    `@keyframes cloud{from{transform:translateX(-500px)}to{transform:translateX(${W + 500}px)}}` +
    `@keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.06)}}` +
    `.c{animation:cloud linear infinite}.sun{animation:pulse 12s ease-in-out infinite;transform-box:fill-box;transform-origin:center}`
  const r = seeded(79)
  let clouds = ''
  for (let i = 0; i < 7; i++) {
    const dur = n(90 + r() * 80)
    const y = n(60 + r() * 260)
    const s = 0.7 + r() * 0.8
    clouds += `<g transform="translate(${n(r() * W - 600)},0)"><g class="c" style="animation-duration:${dur}s;animation-delay:${n(-r() * dur)}s" fill="url(#soft)" opacity=".6"><ellipse cx="0" cy="${y}" rx="${n(150 * s)}" ry="${n(34 * s)}"/><ellipse cx="${n(70 * s)}" cy="${n(y - 20 * s)}" rx="${n(90 * s)}" ry="${n(30 * s)}"/></g></g>`
  }
  const body =
    `<rect width="${W}" height="${H}" fill="url(#sky)"/>` +
    `<circle class="sun" cx="1330" cy="250" r="230" fill="url(#sun)" opacity=".7"/>` +
    `<g class="lo">${clouds}</g>`
  return frame(p, style, body, defs)
}

function bubbles(p: Palette): string {
  const r = seeded(83)
  const style =
    `@keyframes rise{from{transform:translate(0,${H}px)}50%{transform:translate(30px,0)}to{transform:translate(0,-${H}px)}}` +
    `.bb{animation:rise linear infinite}`
  let body = '<g class="lo">'
  for (let i = 0; i < 38; i++) {
    const dur = n(16 + r() * 22)
    const rad = n(4 + r() * 18)
    body += `<g transform="translate(${n(r() * W)},${n(r() * H)})"><g class="bb" style="animation-duration:${dur}s;animation-delay:${n(-r() * dur)}s"><circle r="${rad}" fill="${p.glow}" fill-opacity=".08" stroke="${p.glow}" stroke-opacity=".55" stroke-width="1.5"/><circle cx="${n(-rad * 0.35)}" cy="${n(-rad * 0.35)}" r="${n(rad * 0.22)}" fill="#ffffff" opacity=".6"/></g></g>`
  }
  return frame(p, style, body + '</g>')
}

function grid(p: Palette): string {
  const neon = p.glow
  const neon2 = hsl((p.hue + 60) % 360, 85, 62)
  const defs =
    `<linearGradient id="sunG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${neon2}"/><stop offset="1" stop-color="${neon}"/></linearGradient>` +
    `<linearGradient id="fade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${neon}" stop-opacity="0"/><stop offset="1" stop-color="${neon}" stop-opacity=".9"/></linearGradient>` +
    `<clipPath id="half"><rect x="1120" y="40" width="440" height="230"/></clipPath>`
  const style =
    `@keyframes move{from{transform:translateY(0)}to{transform:translateY(60px)}}` +
    `.mv{animation:move 3s linear infinite}` +
    `@keyframes hum{0%,100%{opacity:.75}50%{opacity:1}}.sunr{animation:hum 6s ease-in-out infinite}`
  const horizon = 640
  let vertical = ''
  for (let i = -16; i <= 16; i++) {
    vertical += `<path d="M${800 + i * 30} ${horizon} L${800 + i * 190} ${H + 40}" />`
  }
  let horizontal = ''
  for (let i = 0; i < 8; i++) {
    const y = horizon + 10 + i * i * 8 + i * 22
    horizontal += `<path d="M-200 ${y} H${W + 200}"/>`
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
    `<g stroke="${neon}" stroke-width="2" opacity=".6"><g class="mv">${horizontal}</g></g>` +
    `<path d="M0 ${horizon} H${W}" stroke="${neon2}" stroke-width="3" opacity=".9"/>` +
    `</g>`
  return frame(p, style, body, defs)
}

/** Things drifting up the screen: lanterns, hearts. */
const risingStyle = (sway: number) =>
  `@keyframes up{from{transform:translate(0,${H}px)}50%{transform:translate(${sway}px,0)}to{transform:translate(0,-${H}px)}}.u{animation:up linear infinite}`

function rising(seed: number, count: number, shape: (r: () => number, i: number) => string, speed: [number, number]): string {
  const r = seeded(seed)
  let body = '<g class="lo">'
  for (let i = 0; i < count; i++) {
    const dur = n(speed[0] + r() * (speed[1] - speed[0]))
    body += `<g transform="translate(${n(r() * W)},${n(r() * H)})"><g class="u" style="animation-duration:${dur}s;animation-delay:${n(-r() * dur)}s">${shape(r, i)}</g></g>`
  }
  return body + '</g>'
}

function lanterns(p: Palette): string {
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

function hearts(p: Palette): string {
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

function confetti(p: Palette): string {
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

function coderain(p: Palette): string {
  const r = seeded(127)
  const ink = hsl(p.hue, 75, 66)
  const glyphs = '01{}<>/=;:+*#$%&[]()λ∑∆'
  const style =
    `@keyframes drop{from{transform:translateY(-${H}px)}to{transform:translateY(${H}px)}}` +
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

function crystals(p: Palette): string {
  const r = seeded(131)
  const tones = [p.glow, hsl((p.hue + 30) % 360, 70, 70), hsl((p.hue + 330) % 360, 60, 75)]
  const style =
    `@keyframes float{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-40px) rotate(25deg)}}` +
    `.cr{animation:float ease-in-out infinite;transform-box:fill-box;transform-origin:center}`
  const poly = (sides: number, rad: number) => {
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

function clouds(p: Palette): string {
  const r = seeded(137)
  const tones = [hsl(p.hue, 60, 86), hsl((p.hue + 40) % 360, 55, 84), hsl((p.hue + 320) % 360, 55, 85)]
  const defs = tones.map((c, k) => `<radialGradient id="pf${k}"><stop offset="0" stop-color="${c}"/><stop offset=".6" stop-color="${c}" stop-opacity=".7"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></radialGradient>`).join('')
  const style =
    `@keyframes drift2{from{transform:translateX(-700px)}to{transform:translateX(${W + 700}px)}}` +
    `.cl{animation:drift2 linear infinite}` + TWINKLE
  let body = '<g class="lo">'
  for (let i = 0; i < 12; i++) {
    const dur = n(110 + r() * 90)
    const y = n(r() * H)
    const s = 0.7 + r() * 1.1
    body += `<g transform="translate(${n(r() * W - 700)},0)"><g class="cl" fill="url(#pf${i % 3})" opacity=".55" style="animation-duration:${dur}s;animation-delay:${n(-r() * dur)}s"><ellipse cy="${y}" rx="${n(190 * s)}" ry="${n(60 * s)}"/><ellipse cx="${n(110 * s)}" cy="${n(y - 30 * s)}" rx="${n(120 * s)}" ry="${n(55 * s)}"/></g></g>`
  }
  body += `<g opacity=".5">${starField({ ...p, glow: hsl(p.hue, 40, 95) }, 139, 40)}</g>`
  return frame(p, style, body + '</g>', defs)
}

function psychflow(p: Palette): string {
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

function shootingstars(p: Palette): string {
  const pink = hsl((p.hue + 330) % 360, 85, 62)
  const sun1 = hsl(45, 95, 62)
  const r = seeded(151)
  const defs =
    `<linearGradient id="sky2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${hsl(p.hue, 60, 12)}" stop-opacity=".9"/><stop offset=".7" stop-color="${hsl((p.hue + 330) % 360, 70, 30)}" stop-opacity=".75"/><stop offset="1" stop-color="${pink}" stop-opacity=".6"/></linearGradient>` +
    `<linearGradient id="sun2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${sun1}"/><stop offset="1" stop-color="${pink}"/></linearGradient>` +
    `<linearGradient id="tail" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ffffff" stop-opacity="0"/><stop offset="1" stop-color="#ffffff"/></linearGradient>` +
    `<clipPath id="sunclip"><rect x="1050" y="360" width="500" height="280"/></clipPath><clipPath id="sundisc"><circle cx="1300" cy="560" r="190"/></clipPath>`
  const style =
    TWINKLE +
    `@keyframes streak{0%{transform:translate(0,0);opacity:0}6%{opacity:1}22%{transform:translate(-700px,420px);opacity:0}100%{transform:translate(-700px,420px);opacity:0}}` +
    `.st{animation:streak linear infinite}` +
    `@keyframes floor{from{transform:translateY(0)}to{transform:translateY(48px)}}.fm{animation:floor 2.4s linear infinite}`
  let streaks = ''
  for (let i = 0; i < 14; i++) {
    const dur = n(5 + r() * 7)
    streaks += `<g transform="translate(${n(500 + r() * 1300)},${n(-40 + r() * 300)}) rotate(149)"><rect class="st" width="160" height="2.4" rx="1.2" fill="url(#tail)" style="animation-duration:${dur}s;animation-delay:${n(-r() * dur)}s"/></g>`
  }
  let stripes = ''
  for (let i = 0; i < 6; i++) stripes += `<rect x="1040" y="${520 + i * 20}" width="520" height="${3 + i * 2}" fill="${hsl(p.hue, 60, 14)}"/>`
  const horizon = 640
  let vlines = ''
  for (let i = -18; i <= 18; i++) vlines += `<path d="M${800 + i * 28} ${horizon} L${800 + i * 200} ${H + 40}"/>`
  let hlines = ''
  for (let i = 0; i < 9; i++) hlines += `<path d="M-200 ${horizon + 8 + i * i * 6 + i * 18} H${W + 200}"/>`
  const body =
    `<rect width="${W}" height="${H}" fill="url(#sky2)"/>` +
    `<g opacity=".8">${starField({ ...p, glow: '#ffffff' }, 157, 120)}</g>` +
    `<g clip-path="url(#sunclip)"><g clip-path="url(#sundisc)"><circle cx="1300" cy="560" r="190" fill="url(#sun2)"/>${stripes}</g></g>` +
    streaks +
    `<rect y="${horizon}" width="${W}" height="${H - horizon}" fill="${hsl(p.hue, 60, 8)}" opacity=".85"/>` +
    `<g stroke="${pink}" stroke-width="2" opacity=".75">${vlines}<g class="fm">${hlines}</g></g>` +
    `<path d="M0 ${horizon} H${W}" stroke="${sun1}" stroke-width="3"/>`
  return frame(p, style, body, defs)
}

function lavalamp(p: Palette): string {
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

function mesh(p: Palette): string {
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

function warp(p: Palette): string {
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

function bokeh(p: Palette): string {
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

function orbits(p: Palette): string {
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
  ] as const
  let body = `<g class="lo">${starField(p, 181, 90)}<circle cx="${cx}" cy="${cy}" r="70" fill="url(#star0)"/>`
  for (const [rad, size, dur, c] of planets) {
    body += `<circle cx="${cx}" cy="${cy}" r="${rad}" fill="none" stroke="${p.glow}" stroke-opacity=".25" stroke-dasharray="2 6"/>`
    body += `<g class="orb" style="animation-duration:${dur}s;animation-delay:-${n(dur * 0.37)}s"><circle cx="${cx + rad}" cy="${cy}" r="${size}" fill="${c}"/></g>`
  }
  return frame(p, style + TWINKLE, body + '</g>', defs)
}

function equalizer(p: Palette): string {
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

function ripples(p: Palette): string {
  const r = seeded(193)
  const style =
    `@keyframes ring{0%{transform:scale(.1);opacity:.9}100%{transform:scale(1);opacity:0}}` +
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

function contours(p: Palette): string {
  const r = seeded(197)
  const style =
    `@keyframes breathe{0%,100%{transform:scale(1) rotate(0deg)}50%{transform:scale(1.05) rotate(4deg)}}` +
    `.ct{animation:breathe ease-in-out infinite;transform-box:fill-box;transform-origin:center}`
  let body = `<g class="lo" fill="none" stroke="${p.glow}" stroke-width="1.6">`
  const centers = [[260, 240], [1300, 300], [900, 820], [180, 860], [1500, 900]] as const
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

function plain(p: Palette): string {
  return frame(p, '', '')
}

const BUILDERS: Record<SceneKind, (p: Palette) => string> = {
  petals, leaves, snow, stars, aurora, waves, rain, fireflies, sunset, bubbles, grid, lanterns, coderain, confetti, hearts, crystals, clouds,
  psychflow, shootingstars, lavalamp, mesh, warp, bokeh, orbits, equalizer, ripples, contours, plain,
}

const cache = new Map<string, string>()

/** The scene's SVG, made once per scene and palette. */
export function sceneSvg(kind: SceneKind, key: string, p: Palette): string {
  const id = `${kind}|${key}`
  let svg = cache.get(id)
  if (svg === undefined) {
    svg = BUILDERS[kind](p)
    cache.set(id, svg)
  }
  return svg
}

// Which scene suits which theme, when the scene is left on auto.
const BY_THEME: Record<string, SceneKind> = {}
const assign = (kind: SceneKind, names: string) => {
  for (const name of names.split(' ')) BY_THEME[name] = kind
}
assign('petals', 'sakura blush-pink rose-quartz strawberry-milk cotton-candy lotus desert-bloom pink-power')
assign('aurora', 'northern-lights aurora cyber-mint jade-glow emerald-city')
assign('stars', 'galaxy night-sky midnight-navy obsidian moonlight ink digital-lavender merlot aubergine smoked-plum black-cherry oxblood')
assign('waves', 'ocean-depth ocean-breeze lagoon coastal tropical turquoise seafoam baby-blue powder-blue petrol noir-teal coral-reef')
assign('rain', 'storm-cloud lofi slate gunmetal graphite charcoal')
assign('snow', 'nordic-frost glacier tundra linen')
assign('fireflies', 'olive moss-stone sage-green deep-forest pine-forest rainforest spruce bamboo zen-garden matcha-latte meadow kiwi lime-zest solarpunk cottagecore honeydew pistachio-gelato mint-cream')
assign('leaves', 'autumn-leaf terracotta burnt-sienna cinnamon-roll caramel-drizzle hazelnut walnut espresso chai tobacco cedarwood clay-pot dark-academia mushroom oat-milk khaki-trail desert-sand savanna fig dark-chocolate')
assign('sunset', 'sunset-boulevard golden-hour sunflower tangerine-dream amber-glow saffron apricot-crush sorbet-peach creamsicle butter-yellow lemon-sorbet vanilla-bean volcano ember scarlet cherry-red ruby')
assign('bubbles', 'mermaidcore periwinkle lilac-haze wildflower')
assign('lanterns', 'kyoto seoul-night jaipur marrakech cairo tigers-eye havana')
assign('coderain', 'onyx black-opal')
assign('confetti', 'macaron bubble-tea cookie-dough raspberry-sorbet grape-soda blue-raspberry cherry-cola taro mango-lassi yuzu key-lime pina-colada')
assign('hearts', 'rose-gold tourmaline garnet paris-dusk lavender-honey peach-tea')
assign('crystals', 'amethyst sapphire emerald topaz opal citrine aquamarine tanzanite peridot lapis quartz moonstone pearl malachite')
assign('clouds', 'iced-latte tiramisu blueberry-muffin mint-chip earl-grey swiss-alps patagonia')
assign('waves', 'santorini maldives goa fjord')
assign('sunset', 'sahara tuscany hot-cocoa')
assign('fireflies', 'amazon bali kerala')
assign('snow', 'iceland')
assign('rain', 'mumbai-monsoon')
assign('psychflow', 'psych-currents acid-wave dream-pop kaleidoscope')
assign('shootingstars', 'shooting-star night-drive starlight-express')
assign('lavalamp', 'lava-lounge lava-lime chill-wave')
assign('mesh', 'mesh-candy mesh-ocean mesh-sunset glow-up holographic')
assign('warp', 'hyperspace warp-drive')
assign('bokeh', 'city-bokeh fairy-lights midnight-jazz')
assign('orbits', 'solar-system cosmic-orbit')
assign('equalizer', 'bass-drop lofi-beats rave')
assign('ripples', 'raindrop-ripples koi-pond')
assign('contours', 'topo-map desert-dunes')
assign('grid', 'synthwave retro-80s vaporwave cyberpunk y2k tokyo-neon miami-nights electric-blue hot-pink fuchsia-pop magenta-rush ultraviolet royal-purple cobalt')

/** The scene that suits a theme, by name, else by hue. */
export function sceneFor(name: string, hue: number): SceneKind {
  const known = BY_THEME[name]
  if (known !== undefined) return known
  if (hue >= 300 || hue < 10) return 'petals'
  if (hue < 60) return 'sunset'
  if (hue < 170) return 'fireflies'
  if (hue < 230) return 'waves'
  return 'stars'
}
