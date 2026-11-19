# Claude Code skills

Three free skills that teach Claude Code new jobs. Unlike the plugins in this repo, a
skill is just instructions (plus small scripts) that Claude reads when the job comes up.

| Skill | Ask Claude Code something like | Needs |
| --- | --- | --- |
| 🌠 [`animated-svg-backgrounds`](animated-svg-backgrounds/SKILL.md) | "Add an animated synthwave banner titled 'My App' to my README." | Node.js 18+ |
| 🎨 [`color-palette-studio`](color-palette-studio/SKILL.md) | "Make a light and dark palette from #6c5ce7 for my Tailwind project." | Node.js 18+ |
| ✨ [`claude-code-vibes`](claude-code-vibes/SKILL.md) | "Make my Claude Code look retro synthwave." | Claude Code |

- **Animated SVG Backgrounds**: 27 animated scenes (shooting stars, psychedelic flow,
  mesh gradient, aurora, code rain, sakura petals…) as tiny SVG files that play in GitHub
  READMEs and websites, tinted to any color, with an optional title.
- **Color Palette Studio**: one color, mood or theme name into a full light and dark UI
  palette, with every text color checked for WCAG contrast. Outputs CSS, Tailwind, SCSS
  or JSON.
- **Claude Code Vibes**: sets up the theme plugins from this repo and suggests a matching
  theme, spinner, badges and sounds for the vibe you describe.

## Install

**Already have the all-in-one `olive-theme` plugin?** The skills are included; nothing to install.

**Option 1: copy them into Claude Code's skills folder** (all projects):

```bash
git clone https://github.com/notchkillerAI/claude-code-color-themes.git
mkdir -p ~/.claude/skills
cp -R claude-code-color-themes/skills/animated-svg-backgrounds ~/.claude/skills/
cp -R claude-code-color-themes/skills/color-palette-studio ~/.claude/skills/
cp -R claude-code-color-themes/skills/claude-code-vibes ~/.claude/skills/
```

For a single project instead, copy them into that project's `.claude/skills/` folder.

**Option 2: Agensi.** The same skills are listed for free on [agensi.io](https://www.agensi.io),
where an agent connected to Agensi can load them without installing anything.

Then start a new Claude Code session and just ask. Claude picks the right skill on its own.

## Use the scripts directly

The scripts work without Claude too:

```bash
node skills/animated-svg-backgrounds/scripts/scenes-space.mjs --list
node skills/animated-svg-backgrounds/scripts/scenes-space.mjs --scene shootingstars --color "#ff2fb0" \
  --width 1600 --height 560 --title "My App" --out banner.svg
node skills/color-palette-studio/scripts/palette.mjs --mood calm --format tailwind
```

Each script is a single self-contained file: it needs only Node.js 18+, reads no other
files, and writes only the files you name.
