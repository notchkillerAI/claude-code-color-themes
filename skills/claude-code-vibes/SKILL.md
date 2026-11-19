---
name: claude-code-vibes
description: Set up and personalize the look and feel of Claude Code with the free, open-source Claude Color Themes plugins (209 themes, 27 animated backgrounds, a focus-timer bar, themed spinners, prompt colors, tool cards, message badges, sound packs and a stats panel). Use when the user wants to theme, decorate, customize, or change the colors, background, spinner or sounds of Claude Code itself, or asks for a cozy, retro, synthwave or aesthetic Claude Code setup.
summary: Tell Claude the vibe you want and it sets up the free Claude Color Themes plugins for Claude Code, then suggests a matching theme, spinner, badges and sounds.
version: 1.1.0
tags: [claude-code, theme, customization, aesthetic, productivity, focus-timer]
keywords: [claude code theme, customize claude code, claude code colors, claude code background, synthwave theme]
use_cases:
  - Give Claude Code a cozy, retro, space or calm look
  - Install only some pieces, such as the focus-timer bar or sound packs
  - Get a matching theme, spinner and badge combination for a vibe
docs_url: https://github.com/notchkillerAI/claude-code-color-themes
---

# Claude Code vibes

Requires: Claude Code, and its `claude` command in a terminal for the install step. Works in Claude Code only.

Help the user give Claude Code itself a new look using the free, open-source
Claude Color Themes plugins: github.com/notchkillerAI/claude-code-color-themes

## Where this works

- **Claude Code** on macOS, Windows and Linux. Themes, animated backgrounds and the mouse glow
  show in the **Claude desktop app**; the bar, spinners, prompt colors, tool cards, badges,
  sounds and stats also work in the terminal.
- **Agents that can run commands** (Claude Code itself, or any agent with a terminal on the
  same computer) can run the install for the user.
- **Chat apps that can't run commands** (Claude.ai, ChatGPT and similar): give the user the
  install commands and the desktop app steps below to do themselves.

## 1. Find out what they want

Ask briefly, in one message, unless they already said:
- **The vibe**: cozy, retro or synthwave, calm, space, nature, cute, minimal, dark and moody…
- **Everything, or just some pieces**: colors and animated backgrounds, the clock and focus
  timer bar, spinners, prompt colors, tool cards, message badges, sounds, stats.

## 2. Install

Plugins are installed from a terminal with the `claude` command. Run the install for
what they chose (each is one command; the first one also adds the marketplace):

```bash
# Everything in one (controlled with /colors)
claude plugin install olive-theme --marketplace notchkillerAI/claude-code-color-themes

# Or only the pieces they want
claude plugin install color-themes   --marketplace notchkillerAI/claude-code-color-themes
claude plugin install ambient-bar    --marketplace notchkillerAI/claude-code-color-themes
claude plugin install fun-spinners   --marketplace notchkillerAI/claude-code-color-themes
claude plugin install prompt-colors  --marketplace notchkillerAI/claude-code-color-themes
claude plugin install tool-cards     --marketplace notchkillerAI/claude-code-color-themes
claude plugin install message-badges --marketplace notchkillerAI/claude-code-color-themes
claude plugin install sound-packs    --marketplace notchkillerAI/claude-code-color-themes
claude plugin install session-stats  --marketplace notchkillerAI/claude-code-color-themes
claude plugin install smart-menu     --marketplace notchkillerAI/claude-code-color-themes
```

Install either `olive-theme` (everything) or the separate plugins, never both, or
features show twice. If `claude` isn't found, Claude Code's command-line tool isn't on
the user's PATH: point them to the official setup guide at
https://docs.claude.com/en/docs/claude-code/setup.

In the Claude desktop app they can instead click **+** next to the prompt box, then
**Plugins** → **Add marketplace** → `notchkillerAI/claude-code-color-themes` → **Add plugin**.

## 3. Tell them to start a new session

Plugins load when a session starts. The current session won't have them.

## 4. Suggest their first commands

You can't type slash commands for the user, so give them a short, copyable list that
fits their vibe. Picks by vibe:

| Vibe | Theme | Spinner | Badges | Sounds |
| --- | --- | --- | --- | --- |
| Retro / synthwave | `shooting-star` or `synthwave` | `synthwave` | `neon-pill` | `arcade` |
| Psychedelic / dreamy | `psych-currents` or `dream-pop` | `psych` | `sparkles` | `dreamy` |
| Cozy | `chai`, `hot-cocoa` or `olive` | `coffee` | `cozy` | `kalimba` |
| Calm / nature | `zen-garden`, `sakura` or `northern-lights` | `zen` | `nature` | `zen` |
| Space | `galaxy`, `hyperspace` or `solar-system` | `space` | `space` | `space` |
| Developer / dark | `onyx`, `midnight-navy` or `noir-teal` | `robot` | `terminal` | `retro` |
| Cute | `cotton-candy`, `bubble-tea` or `macaron` | `cat` | `kawaii` | `bubbles` |

With `olive-theme` everything goes through `/colors`:

```
/colors shooting-star          the theme (+ its animated scene)
/colors panel                  pick by sight in a side panel
/colors spinner synthwave
/colors badges neon-pill
/colors sounds arcade
/colors focus 25               start a focus timer in the bar
/colors custom #ff6b6b         a theme from any color
```

With separate plugins, the commands are `/colors …`, `/bar …`, `/spinner …`,
`/prompt-colors …`, `/tool-cards …`, `/badges …`, `/sounds …` and `/session-stats`.
Typing a command and a few letters shows matching names, so nothing needs memorizing.

## Good to know (tell the user when relevant)

- Themes, animated scenes and the mouse glow show in the **Claude desktop app**. The
  terminal and IDE extensions don't draw themes, but the bar, spinners, prompt colors,
  tool cards, badges, sounds and stats work there too.
- These change Claude Code only, not the regular Claude chat.
- Sounds and the spoken voice work on macOS, Windows and Linux (Linux needs a sound player such as `paplay` and `spd-say` or `espeak` for the voice).
- Their own picture can be the background: `/colors wallpaper ~/Pictures/photo.jpg` (jpg, png, gif, bmp, tiff and svg everywhere; webp and heic on macOS and Linux; Linux needs ImageMagick or ffmpeg).
- Animated scenes can be turned off with `/colors scene off` to save battery.
