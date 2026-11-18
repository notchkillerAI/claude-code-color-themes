import { makeColors } from './make-colors.js'

type Definition = Parameters<typeof makeColors>[0]

// Each theme is a hue (0-360) and how strongly it tints the surfaces (0-100).
export const GROUPS: Record<string, Record<string, [number, number]>> = {
  'Soft pastels': {
    'matcha-latte': [80, 30], 'digital-lavender': [265, 40], 'butter-yellow': [50, 55], 'sorbet-peach': [22, 55],
    'cotton-candy': [330, 45], 'baby-blue': [205, 45], 'mint-cream': [155, 35], 'lilac-haze': [275, 30],
    'strawberry-milk': [345, 40], 'pistachio-gelato': [90, 40], seafoam: [165, 35], 'blush-pink': [350, 35],
    periwinkle: [235, 40], honeydew: [100, 30], 'apricot-crush': [28, 55], 'powder-blue': [200, 30],
    'rose-quartz': [340, 30], 'vanilla-bean': [45, 30], 'lemon-sorbet': [55, 55], creamsicle: [30, 60],
  },
  'Earthy & cozy': {
    olive: [68, 35], espresso: [25, 30], terracotta: [15, 45], 'clay-pot': [18, 35], 'sage-green': [100, 20],
    'moss-stone': [85, 25], 'oat-milk': [40, 20], 'cinnamon-roll': [22, 40], chai: [30, 35],
    'caramel-drizzle': [32, 45], 'desert-sand': [38, 30], 'burnt-sienna': [14, 50], cedarwood: [20, 25],
    walnut: [25, 22], mushroom: [30, 10], linen: [38, 16], 'khaki-trail': [55, 22], hazelnut: [28, 30],
    tobacco: [30, 40], fig: [320, 20],
  },
  'Bold & vibrant': {
    'electric-blue': [215, 70], 'hot-pink': [330, 65], 'cherry-red': [355, 60], 'tangerine-dream': [25, 70],
    'lime-zest': [80, 65], cobalt: [225, 60], ultraviolet: [270, 60], 'emerald-city': [145, 55],
    saffron: [40, 70], 'fuchsia-pop': [320, 65], turquoise: [180, 55], scarlet: [5, 60],
    'royal-purple': [280, 55], sunflower: [48, 70], 'jade-glow': [158, 50], 'amber-glow': [36, 65],
    'magenta-rush': [315, 60], 'ocean-depth': [205, 55], ruby: [350, 55], kiwi: [90, 55],
  },
  'Dark & moody': {
    'midnight-navy': [225, 40], obsidian: [240, 8], 'deep-forest': [145, 35], merlot: [345, 35],
    aubergine: [295, 30], charcoal: [0, 0], graphite: [220, 6], 'storm-cloud': [210, 18], ink: [230, 35],
    'smoked-plum': [300, 20], petrol: [195, 40], 'dark-chocolate': [20, 30], oxblood: [355, 40],
    slate: [215, 12], gunmetal: [205, 10], 'night-sky': [240, 35], spruce: [170, 30], ember: [10, 50],
    'noir-teal': [185, 35], 'black-cherry': [340, 35],
  },
  'Aesthetic vibes': {
    y2k: [300, 45], vaporwave: [310, 50], synthwave: [285, 55], cyberpunk: [300, 65], cottagecore: [95, 30],
    'dark-academia': [30, 30], coastal: [200, 25], mermaidcore: [180, 50], 'cyber-mint': [160, 60],
    aurora: [165, 50], 'sunset-boulevard': [15, 55], 'golden-hour': [38, 55], 'nordic-frost': [210, 18],
    'tokyo-neon': [325, 65], 'miami-nights': [175, 55], lofi: [260, 20], 'retro-80s': [290, 55],
    solarpunk: [110, 45], 'pink-power': [330, 60], galaxy: [250, 40],
  },
  'Nature escapes': {
    lagoon: [185, 50], tropical: [170, 55], 'zen-garden': [110, 20], moonlight: [230, 15], sakura: [335, 30],
    rainforest: [140, 45], glacier: [200, 30], volcano: [8, 55], savanna: [45, 35], bamboo: [85, 35],
    tundra: [190, 12], 'coral-reef': [5, 50], lotus: [330, 25], 'pine-forest': [160, 30], meadow: [95, 40],
    'desert-bloom': [350, 30], 'northern-lights': [150, 55], 'ocean-breeze': [190, 40], wildflower: [285, 35],
    'autumn-leaf': [25, 50],
  },
}

export const THEMES: Record<string, [number, number]> = Object.assign({}, ...Object.values(GROUPS))

const ROLES = { danger: '#b3392f', success: '#3f7d3a', warning: '#a86f14', pro: '#6d4f94' }

// The hand-tuned dark olive the person chose first.
const OLIVE: Definition = {
  label: 'Olive',
  roles: { accent: '#5a6a14', ...ROLES, success: '#4f7a2a', danger: '#b0412e', warning: '#a8780f', pro: '#7a5c8c' },
  light: {
    gray: {
      anchors: {
        'surface-0': '#d3d8ac', 'surface-1': '#dadfb7', 'surface-2': '#e1e5c3',
        'text-primary': '#1b2008', 'text-secondary': '#454b2a', 'text-muted': '#5a6038',
      },
    },
  },
  dark: {
    gray: {
      anchors: {
        'surface-0': '#191c08', 'surface-1': '#1f230b', 'surface-2': '#24290e', 'surface-3': '#272c11',
        'text-primary': '#eef0d8', 'text-secondary': '#cdd1ac', 'text-muted': '#aeb38a',
      },
    },
  },
}

export function hsl(h: number, s: number, l: number): string {
  s /= 100
  l /= 100
  const k = (n: number) => (n + h / 30) % 12
  const a = s * Math.min(l, 1 - l)
  const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))
  return '#' + [f(0), f(8), f(4)].map(x => Math.round(x * 255).toString(16).padStart(2, '0')).join('')
}

const title = (name: string) => name.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join(' ')

/** A theme from a hue and tint strength, or from a #hex color. */
export function definitionFor(name: string, hue: number, sat: number): Definition {
  if (name === 'olive') {
    return OLIVE
  }
  const surf = sat * 0.9
  const ink = sat * 0.5
  return {
    label: title(name),
    roles: { accent: hsl(hue, Math.max(sat, 45), 38), ...ROLES },
    light: {
      gray: {
        anchors: {
          'surface-0': hsl(hue, surf, 87), 'surface-1': hsl(hue, surf, 90), 'surface-2': hsl(hue, surf, 93),
          'text-primary': hsl(hue, ink, 10), 'text-secondary': hsl(hue, ink, 27), 'text-muted': hsl(hue, ink * 0.8, 35),
        },
      },
    },
    dark: {
      gray: {
        anchors: {
          'surface-0': hsl(hue, surf * 0.8, 7), 'surface-1': hsl(hue, surf * 0.8, 9),
          'surface-2': hsl(hue, surf * 0.8, 11), 'surface-3': hsl(hue, surf * 0.8, 12),
          'text-primary': hsl(hue, ink * 0.6, 93), 'text-secondary': hsl(hue, ink * 0.6, 80),
          'text-muted': hsl(hue, ink * 0.5, 68),
        },
      },
    },
  }
}

/** Hue and saturation of a #rrggbb color, for custom themes. */
export function hueOf(hex: string): [number, number] {
  const [r, g, b] = [1, 3, 5].map(i => parseInt(hex.slice(i, i + 2), 16) / 255)
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const l = (max + min) / 2
  const d = max - min
  if (d === 0) {
    return [0, 0]
  }
  const s = d / (1 - Math.abs(2 * l - 1))
  let h = max === r ? ((g - b) / d) % 6 : max === g ? (b - r) / d + 2 : (r - g) / d + 4
  h = (h * 60 + 360) % 360
  return [Math.round(h), Math.round(Math.min(s, 0.7) * 100)]
}
