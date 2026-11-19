import { exp, length, min, picture, pointers, scene, shader, values, vec3, vec4 } from 'claude-code/shader'

// A soft light in the theme's accent color that follows the pointer over the
// backdrop, and fades out after it leaves.
const tint = values({ r: [0, 1], g: [0, 1], b: [0, 1] })

const glow = picture(p => {
  const base = scene.sample(p.uv)
  let light = 0
  for (const ptr of pointers) {
    const d = length(p.point - ptr.at)
    const fade = 1 - min(ptr.gone * 1.5, 1)
    light = light + exp(-d / 160) * 0.45 * fade + exp(-d / 28) * 0.25 * fade
  }
  return vec4(base.rgb + vec3(tint.r, tint.g, tint.b) * light, 1)
})

export default shader({ fps: 30, passes: [glow] })
