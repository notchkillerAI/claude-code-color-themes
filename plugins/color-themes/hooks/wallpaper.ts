import type { EngineInterface as Engine } from 'claude-code'

// Your own picture as the backdrop. A backdrop must be pure vector, so a photo
// is shrunk with the system's own image tool (sips on macOS, .NET on Windows,
// ImageMagick or ffmpeg on Linux), read back as a small BMP, and redrawn as
// colored vector strips: a soft, painterly version of the picture. An .svg
// file is used as it is, when it follows the backdrop rules.

export type Fit = 'cover' | 'contain' | 'stretch'
export type Look = 'soft' | 'sharp'
export type Wallpaper = { svg: string; color: string; source: string; width: number; height: number }

const MAX_CHARS = 120_000
const RASTER = /\.(png|jpe?g|gif|bmp|webp|heic|heif|tiff?)$/i

type Pixels = { width: number; height: number; rgb: Uint8Array }

/** Reads a BMP (24 or 32 bits, top-down or bottom-up). */
function parseBmp(bytes: Uint8Array): Pixels {
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength)
  if (bytes[0] !== 0x42 || bytes[1] !== 0x4d) throw new Error('the converted image is not a BMP')
  const offset = view.getUint32(10, true)
  const width = view.getInt32(18, true)
  const rawHeight = view.getInt32(22, true)
  const bpp = view.getUint16(28, true)
  if (bpp !== 24 && bpp !== 32) throw new Error(`unsupported BMP depth ${bpp}`)
  const height = Math.abs(rawHeight)
  const topDown = rawHeight < 0
  const stride = Math.ceil((width * bpp) / 32) * 4
  const rgb = new Uint8Array(width * height * 3)
  for (let y = 0; y < height; y++) {
    const row = offset + (topDown ? y : height - 1 - y) * stride
    for (let x = 0; x < width; x++) {
      const i = row + x * (bpp / 8)
      const o = (y * width + x) * 3
      rgb[o] = bytes[i + 2] ?? 0
      rgb[o + 1] = bytes[i + 1] ?? 0
      rgb[o + 2] = bytes[i] ?? 0
    }
  }
  return { width, height, rgb }
}

function hex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(v => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, '0')).join('')
}

/** The picture's main color, leaning on its more colorful pixels. */
function mainColor(p: Pixels): string {
  let r = 0
  let g = 0
  let b = 0
  let w = 0
  for (let i = 0; i < p.rgb.length; i += 3) {
    const R = p.rgb[i] ?? 0
    const G = p.rgb[i + 1] ?? 0
    const B = p.rgb[i + 2] ?? 0
    const weight = 1 + (Math.max(R, G, B) - Math.min(R, G, B)) / 16
    r += R * weight
    g += G * weight
    b += B * weight
    w += weight
  }
  return hex(r / w, g / w, b / w)
}

/** Redraws pixels as one path per color of horizontal runs; fewer levels if too big. */
function vectorize(p: Pixels, look: Look, fit: Fit, levels: number): string {
  const step = 256 / levels
  const q = (v: number) => Math.min(255, Math.round(Math.floor(v / step) * step + step / 2))
  const runs = new Map<string, string[]>()
  for (let y = 0; y < p.height; y++) {
    let x = 0
    while (x < p.width) {
      const i = (y * p.width + x) * 3
      const color = hex(q(p.rgb[i] ?? 0), q(p.rgb[i + 1] ?? 0), q(p.rgb[i + 2] ?? 0))
      let end = x + 1
      while (end < p.width) {
        const j = (y * p.width + end) * 3
        if (hex(q(p.rgb[j] ?? 0), q(p.rgb[j + 1] ?? 0), q(p.rgb[j + 2] ?? 0)) !== color) break
        end++
      }
      // Overlap each strip a little so no seams show between them.
      const list = runs.get(color) ?? []
      list.push(`M${x} ${y}h${end - x + 0.6}v1.6h-${end - x + 0.6}z`)
      runs.set(color, list)
      x = end
    }
  }
  const paths = [...runs].map(([color, d]) => `<path fill="${color}" d="${d.join('')}"/>`).join('')
  const ratio = fit === 'contain' ? 'xMidYMid meet' : fit === 'stretch' ? 'none' : 'xMidYMid slice'
  const blur = look === 'soft' ? `<defs><filter id="soft" x="-5%" y="-5%" width="110%" height="110%"><feGaussianBlur stdDeviation="0.7"/></filter></defs>` : ''
  const avg = mainColor(p)
  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${p.width} ${p.height}" preserveAspectRatio="${ratio}" shape-rendering="${look === 'sharp' ? 'crispEdges' : 'auto'}">` +
    blur +
    `<rect x="-2000" y="-2000" width="${p.width + 4000}" height="${p.height + 4000}" fill="${avg}"/>` +
    `<g${look === 'soft' ? ' filter="url(#soft)"' : ''}>${paths}</g></svg>`
  )
}

/** Turns `~` and quotes into a plain absolute path. */
async function resolvePath($: Engine, raw: string): Promise<string> {
  let path = raw.trim().replace(/^["']|["']$/g, '')
  if (path.startsWith('~')) {
    const info = await $.session.info()
    const config = info.configRoot ?? ''
    const home = config.replace(/[\\/]\.claude[\\/]?$/, '')
    path = home + path.slice(1)
  }
  return path
}

/** Shrinks the picture with the system's own tools and reads it back. */
async function shrink($: Engine, path: string, size: number): Promise<Pixels> {
  const info = await $.session.info()
  const platform = info.platform ?? 'unknown'
  if (platform === 'windows') {
    const script =
      `Add-Type -AssemblyName System.Drawing;` +
      `$i=[System.Drawing.Image]::FromFile($env:WALLPAPER_IN);` +
      `$r=[Math]::Min(1,${size}/[Math]::Max($i.Width,$i.Height));` +
      `$w=[Math]::Max(1,[int]($i.Width*$r));$h=[Math]::Max(1,[int]($i.Height*$r));` +
      `$b=New-Object System.Drawing.Bitmap $w,$h,([System.Drawing.Imaging.PixelFormat]::Format24bppRgb);` +
      `$g=[System.Drawing.Graphics]::FromImage($b);$g.InterpolationMode='HighQualityBicubic';$g.DrawImage($i,0,0,$w,$h);` +
      `$m=New-Object IO.MemoryStream;$b.Save($m,[System.Drawing.Imaging.ImageFormat]::Bmp);` +
      `[Console]::Out.Write([Convert]::ToBase64String($m.ToArray()))`
    const run = await $.process.run(['powershell', '-NoProfile', '-NonInteractive', '-Command', script], {
      env: { WALLPAPER_IN: path },
      timeoutMs: 60_000,
    })
    if (run.exitCode !== 0) throw new Error(run.stderr.trim().split('\n')[0] || 'Windows could not open that image')
    return parseBmp(Uint8Array.from(atob(run.stdout.trim()), c => c.charCodeAt(0)))
  }
  const tmp = `${info.scratchpadDir ?? '/tmp'}/colors-wallpaper-${Date.now()}.bmp`
  const tries: string[][] =
    platform === 'macos'
      ? [['sips', '-s', 'format', 'bmp', '-Z', String(size), path, '--out', tmp]]
      : [
          ['magick', path, '-auto-orient', '-resize', `${size}x${size}>`, '-type', 'TrueColor', `BMP3:${tmp}`],
          ['convert', path, '-auto-orient', '-resize', `${size}x${size}>`, '-type', 'TrueColor', `BMP3:${tmp}`],
          ['ffmpeg', '-y', '-loglevel', 'error', '-i', path, '-vf', `scale=w=${size}:h=${size}:force_original_aspect_ratio=decrease`, '-pix_fmt', 'bgr24', tmp],
        ]
  let last = ''
  for (const argv of tries) {
    try {
      const run = await $.process.run(argv, { timeoutMs: 60_000 })
      if (run.exitCode === 0 && (await $.fs.exists(tmp))) {
        const { base64 } = (await $.fs.read(tmp, { as: 'bytes' })) as { base64: string }
        return parseBmp(Uint8Array.from(atob(base64), c => c.charCodeAt(0)))
      }
      last = run.stderr.trim().split('\n')[0] ?? ''
    } catch (err) {
      last = String(err)
    }
  }
  throw new Error(
    platform === 'linux' || platform === 'wsl'
      ? 'no image tool found. Install ImageMagick (sudo apt install imagemagick) or ffmpeg, then try again.'
      : `the image could not be converted${last !== '' ? `: ${last}` : ''}`,
  )
}

/** Checks a user's SVG against the backdrop rules, in plain words. */
function svgProblem(svg: string): string | undefined {
  if (svg.length > 131_072) return `it is ${Math.round(svg.length / 1024)} KB; the limit is 128 KB`
  if (/<image\b|feImage|foreignObject/i.test(svg)) return 'it contains an embedded picture (<image>, feImage or foreignObject)'
  if (/@font-face|@import|<script|data:|base64/i.test(svg)) return 'it embeds a font, script or data URL'
  if (/(href|url\()\s*=?\s*["']?(?!#)[a-z]+:/i.test(svg)) return 'it links to an outside file'
  if (/<!DOCTYPE|<!ENTITY|CDATA/i.test(svg)) return 'it has a DOCTYPE, ENTITY or CDATA section'
  if (!/^\s*(<\?xml[^>]*\?>\s*)?(<!--[\s\S]*?-->\s*)?<svg[\s>]/i.test(svg)) return 'it does not start with <svg>'
  return undefined
}

/** Builds a wallpaper from a file path. */
export async function makeWallpaper($: Engine, raw: string, look: Look, fit: Fit): Promise<Wallpaper> {
  const path = await resolvePath($, raw)
  if (!(await $.fs.exists(path))) throw new Error(`no file at ${path}`)
  if (/\.svg$/i.test(path)) {
    const svg = String(await $.fs.read(path)).replace(/^\s*<\?xml[^>]*\?>/, '').trim()
    const problem = svgProblem(svg)
    if (problem !== undefined) throw new Error(`that SVG can't be a background: ${problem}`)
    const fitted = svg.replace(/preserveAspectRatio="[^"]*"/, '').replace('<svg', `<svg preserveAspectRatio="${fit === 'contain' ? 'xMidYMid meet' : fit === 'stretch' ? 'none' : 'xMidYMid slice'}"`)
    const color = /#[0-9a-f]{6}\b/i.exec(svg)?.[0]?.toLowerCase() ?? '#6c5ce7'
    return { svg: fitted, color, source: path, width: 0, height: 0 }
  }
  if (!RASTER.test(path)) throw new Error('use a .png, .jpg, .webp, .heic, .gif, .bmp, .tiff or .svg file')
  // Larger is sharper; step down until the drawing fits the backdrop's size limit.
  for (const [size, levels] of [[160, 12], [128, 10], [112, 8], [96, 8], [80, 6], [64, 6]] as const) {
    const pixels = await shrink($, path, look === 'sharp' ? size : Math.round(size * 0.75))
    const svg = vectorize(pixels, look, fit, levels)
    if (svg.length <= MAX_CHARS) return { svg, color: mainColor(pixels), source: path, width: pixels.width, height: pixels.height }
  }
  throw new Error('that picture has too much detail to draw as a background; try a simpler image or `soft`')
}

/** A smooth gradient wallpaper from 2 to 4 colors. */
export function gradientWallpaper(colors: string[], angle = 135): Wallpaper {
  const stops = colors.map((c, i) => `<stop offset="${(i / (colors.length - 1)).toFixed(2)}" stop-color="${c}"/>`).join('')
  const rad = (angle * Math.PI) / 180
  const x = (0.5 - Math.cos(rad) / 2).toFixed(3)
  const y = (0.5 - Math.sin(rad) / 2).toFixed(3)
  const x2 = (0.5 + Math.cos(rad) / 2).toFixed(3)
  const y2 = (0.5 + Math.sin(rad) / 2).toFixed(3)
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" preserveAspectRatio="none">` +
    `<defs><linearGradient id="g" x1="${x}" y1="${y}" x2="${x2}" y2="${y2}">${stops}</linearGradient></defs>` +
    `<rect width="1600" height="1000" fill="url(#g)"/></svg>`
  return { svg, color: colors[0] ?? '#6c5ce7', source: `gradient ${colors.join(' ')}`, width: 1600, height: 1000 }
}
