---
name: color-palette-studio
description: Build an accessible light and dark color palette (background, surfaces, text, accent, success, warning, danger, info) from one hex color, a mood word, or one of 209 named themes, with every text color checked against WCAG contrast, and output it as CSS variables, Tailwind config, SCSS or JSON. Use when the user wants a color scheme, a theme, dark mode colors, brand colors turned into a UI palette, or asks whether colors are readable.
summary: One color, mood or named theme in; a complete light and dark UI palette out, with every text color checked for WCAG contrast. Outputs CSS variables, Tailwind, SCSS or JSON.
version: 1.1.0
tags: [color, palette, theme, dark-mode, accessibility, wcag, tailwind, css]
keywords: [color palette, dark mode colors, ui palette, wcag contrast, tailwind colors, css variables, brand colors]
use_cases:
  - Turn a brand color into a full light and dark UI palette
  - Add dark mode colors to an existing CSS or Tailwind project
  - Check whether a color scheme has readable contrast
docs_url: https://github.com/notchkillerAI/claude-code-color-themes
---

# Color palette studio

Requires: Node.js 18 or newer.

**Before running a script,** check Node.js with `node --version`. If it's missing or
older than 18, tell the user they can install the LTS version from https://nodejs.org
(`brew install node` on a Mac, `winget install OpenJS.NodeJS.LTS` on Windows, or their
package manager on Linux), and meanwhile use the ready-made files described under
"If you can't run commands". Output folders are created automatically.

Turn a single color, a mood, or a named theme into a complete, readable UI palette
for both light and dark mode, then drop it straight into the user's project.

## Where this works

| Where | What happens |
| --- | --- |
| **Agents that can run commands**: Claude Code, Codex CLI, Gemini CLI, Cursor (agent mode), VS Code with Copilot agent mode, Cline, Kiro, OpenClaw and similar | Full skill: runs the script for any color, mood or theme and saves the palette into the project |
| **Chat apps that can't run commands**: Claude.ai, ChatGPT, Grok, DeepSeek and similar | Uses the ready-made files in `references/` instead (see below) |
| **Operating systems** | macOS, Windows and Linux: the scripts are plain Node.js. In PowerShell the same commands work as written. |

## If you can't run commands

Open `references/palettes.md`: ready-made, contrast-checked palettes (light and dark CSS) for
all 30 moods and 19 popular themes. Give the user the matching block, converted to Tailwind,
SCSS or JSON if they asked. For a custom hex color, pick the closest mood or theme by hue and
say it is the nearest ready-made match; for an exact palette from their own color, suggest an
agent that can run commands.

## How to use

The generator is `scripts/palette.mjs`: one self-contained script that needs only
Node.js, reads no other files, and writes only the files named by `--out` and `--swatch`.

1. **Find the starting point** from what the user said:
   - A brand or favorite color: `--color "#6c5ce7"`
   - A feeling: `--mood calm` (also energetic, luxury, nature, playful, professional,
     romantic, mysterious, retro, futuristic, warm, cool, minimal, cozy, fresh, bold,
     elegant, earthy, oceanic, tropical, sunset, forest, candy, cyberpunk, pastel,
     trustworthy, creative, healthy, friendly, serious)
   - A named theme: `--theme sakura` (209 themes such as golden-hour, tokyo-neon,
     matcha-latte, midnight-navy, psych-currents; list them with `--list`)

2. **Match the project's styling** with `--format`:
   - `css` (default): CSS custom properties, light by default and dark under
     `prefers-color-scheme: dark`
   - `tailwind`: a `tailwind.config.js` colors block (`bg-background dark:bg-background-dark`)
   - `scss`: `$color-*` and `$color-*-dark` variables
   - `json`: `{ light, dark }` for design tokens or any other tool
   - `--prefix brand` renames `--color-*` to `--brand-*`

3. **Run it**, writing into the project when the user wants the file:
   ```bash
   node palette.mjs --color "#6c5ce7" --format css --out src/styles/palette.css
   node palette.mjs --mood calm --format tailwind
   node palette.mjs --theme sakura --format json --swatch palette.svg
   ```
   `--swatch file.svg` also writes a picture of both palettes to show the user.

4. **Report the contrast checks.** The script prints them to stderr: text is held
   to 7:1 and every other text color to 4.5:1 against the background, so the
   palette is readable by default. Mention any `~` line (button text below 4.5:1),
   which is fine for large or bold labels.

5. **Wire it in.** If the project already has color variables, map the new tokens
   onto the existing names rather than renaming the whole codebase. Then show the
   user where each token is used (background, cards, borders, body text, links and
   buttons, status messages).

## What the tokens mean

| Token | Use |
| --- | --- |
| `background` | Page background |
| `surface`, `surface-2` | Cards, panels, menus (each a step lighter in dark mode, darker in light) |
| `border` | Dividers and outlines |
| `text`, `text-muted` | Body text, secondary text |
| `accent`, `on-accent` | Links and primary buttons, and the text on those buttons |
| `success`, `warning`, `danger`, `info` | Status messages, kept green, amber, red and blue in every palette |

## Limits

- Contrast is checked against the page background. Text placed on `surface-2` or on
  images should be checked again.
- Very pale or near-gray inputs give calm, low-color palettes by design.
