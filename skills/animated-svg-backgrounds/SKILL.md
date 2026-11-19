---
name: animated-svg-backgrounds
description: Generate lightweight animated SVG backgrounds and GitHub README banners (falling petals, shooting stars, synthwave grid, mesh gradient, aurora, code rain, lava lamp and 20 more scenes) tinted to any color. Use when the user wants an animated banner, hero image, README header, website background, or a moving decorative SVG.
summary: 27 animated SVG banners and backgrounds for READMEs and websites, tinted to any color, with an optional title. Pure SVG and CSS, no JavaScript, usually under 20 KB.
version: 1.0.0
tags: [svg, animation, readme, banner, background, design, github, synthwave]
keywords: [animated banner, readme header, svg background, hero image, animated svg, github readme banner]
use_cases:
  - Add an animated banner with a title to a GitHub README
  - Create a moving background for a landing page or portfolio
  - Make a synthwave, space, nature or psychedelic hero image in a brand color
docs_url: https://github.com/notchkillerAI/claude-code-color-themes
---

# Animated SVG backgrounds

Requires: Node.js 18 or newer.

**Before running a script,** check Node.js with `node --version`. If it's missing or
older than 18, tell the user to install the LTS version from https://nodejs.org (or
`brew install node` on a Mac) and stop there; don't try other ways to run the script.
Output folders are created automatically.

Make animated, pure-SVG backgrounds and banners with one command. Every scene is
tinted from a single color, animates with plain CSS (no JavaScript), is usually
under 20 KB, and shows a finished still image when the viewer has reduced motion
turned on. The result plays inside GitHub READMEs, `<img>` tags and CSS backgrounds.

## The scripts

Three self-contained scripts, one per family of scenes. Each needs only Node.js,
reads no other files, and writes only the file named by `--out`. Run the one that
holds the chosen scene, passing the options below.

| Script | Scenes |
| --- | --- |
| `scripts/scenes-space.mjs` | `stars`, `aurora`, `shootingstars`, `grid`, `warp`, `orbits`, `coderain`, `equalizer` |
| `scripts/scenes-nature.mjs` | `petals`, `leaves`, `snow`, `rain`, `waves`, `fireflies`, `sunset`, `clouds`, `ripples`, `contours` |
| `scripts/scenes-dreamy.mjs` | `psychflow`, `mesh`, `lavalamp`, `bokeh`, `bubbles`, `lanterns`, `hearts`, `confetti`, `crystals` |

Pick a scene by vibe:

| Vibe | Scenes |
| --- | --- |
| Retro, synthwave, 80s | `shootingstars`, `grid` |
| Dreamy, psychedelic | `psychflow`, `lavalamp`, `mesh` |
| Space, sci-fi | `stars`, `warp`, `orbits`, `aurora` |
| Nature, calm | `petals`, `leaves`, `snow`, `rain`, `waves`, `fireflies`, `clouds`, `ripples` |
| Party, fun | `confetti`, `bubbles`, `hearts`, `equalizer`, `bokeh` |
| Developer, technical | `coderain`, `contours`, `crystals` |
| Warm, cozy | `sunset`, `lanterns` |

## Steps

1. **Choose the scene and a color.** Use the user's brand color if they have one;
   otherwise pick one that suits the scene, for example `#e86a92` for petals,
   `#ff2fb0` for shootingstars, `#2aa7c9` for waves.

2. **Run the script** for that scene with node:
   ```bash
   # Full background
   node scenes-nature.mjs --scene petals --color "#e86a92" --out background.svg

   # README banner with a title (1600 x 560 is a good banner shape)
   node scenes-space.mjs --scene shootingstars --color "#ff2fb0" \
     --width 1600 --height 560 --title "Project Name" --subtitle "One-line pitch" --out assets/banner.svg

   # See the scenes in one script
   node scenes-dreamy.mjs --list
   ```

   Options:
   - `--scene <name>` and `--color "#rrggbb"`
   - `--width` and `--height` in pixels, 100 to 4000 (default 1600 x 900)
   - `--mode dark` (default), `light`, or `auto` to follow the viewer's system setting
   - `--title` and `--subtitle` add text in the lower left
   - `--out <file>` (create the folder first if needed)

3. **Put it to use** and tell the user where it went:
   - README: `<img src="assets/banner.svg" alt="Project banner" width="100%">`
   - HTML: `<img src="background.svg" alt="">`, or CSS `background: url(background.svg) center / cover;`
   - Give banners that carry a title a meaningful `alt` text.

## Tips

- Keep titles short: up to about 20 characters fits at 1600 px wide.
- `--mode auto` follows the reader's light or dark mode; dark is the safest default
  for banners with white text.
- Behind body text, prefer calm scenes (`stars`, `mesh`, `clouds`, `contours`) so the
  content stays readable.
- Opening the SVG in a browser shows it animating exactly as it will on GitHub.

## Limits

- The motion is CSS inside the SVG: it plays in browsers and on GitHub, but tools that
  turn SVGs into still images (some chat apps, PDF exports) show one frame.
- Very small sizes (under about 300 px wide) crop most of the scene.
- Fonts aren't embedded; titles use the viewer's system font.
