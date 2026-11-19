<p align="center">
  <img src="assets/hero.svg" alt="Claude Color Themes: an animated retro synthwave banner with shooting stars" width="100%">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/themes-209-ff2fb0?style=for-the-badge" alt="209 themes">
  <img src="https://img.shields.io/badge/animated%20scenes-27-a35bff?style=for-the-badge" alt="27 animated scenes">
  <img src="https://img.shields.io/badge/plugins-10-29e7ff?style=for-the-badge" alt="10 plugins">
  <img src="https://img.shields.io/badge/for-Claude%20Code-5a6a14?style=for-the-badge" alt="For Claude Code">
</p>

<p align="center">
  <b>Make Claude Code look and feel like yours.</b><br>
  Animated backgrounds, 209 colour themes, a focus timer, fun spinners, colourful prompts, sound packs and more.<br>
  Install everything, or just the pieces you like.
</p>

<p align="center">
  <a href="#-install">Install</a> •
  <a href="#-animated-scenes">Animated scenes</a> •
  <a href="#-themes">Themes</a> •
  <a href="#-custom-colors">Custom colours</a> •
  <a href="#-more-customization">More customization</a> •
  <a href="#-every-theme">Every theme</a> •
  <a href="#%EF%B8%8F-limitations">Limitations</a>
</p>

---

## 📦 Install

This repository is a **marketplace of 10 plugins**. Install **everything** with one line, or **pick only what you like**. Every piece works on its own.

### Option 1: everything

At the prompt of a Claude Code terminal session:

```
/plugin install olive-theme --marketplace notchkillerAI/claude-code-color-themes
```

Answer `y` to add the marketplace, then press **Enter** to install for your user. Everything is then controlled with **`/colors`** (type `/colors` to see all commands, or `/colors panel` for buttons).

### Option 2: pick and choose

| Plugin | What you get | Try |
| --- | --- | --- |
| 🎁 **Everything**<br><code>olive-theme</code> | All of the below in one plugin, controlled with `/colors` | `/colors panel` |
| 🎨 Color themes<br><code>color-themes</code> | 209 themes, 27 animated scenes, mouse glow, picker panel, auto themes, custom colours | `/colors sakura` |
| 📊 Ambient bar<br><code>ambient-bar</code> | Clock, 🍅 focus timer and a daily quote above the prompt | `/bar focus 25` |
| ⏳ Fun spinners<br><code>fun-spinners</code> | 27 themed "thinking" spinners | `/spinner coffee` |
| ⌨️ Prompt colors<br><code>prompt-colors</code> | 24 styles that colour `/commands`, `@files`, links and TODOs as you type | `/prompt-colors neon` |
| 🧰 Tool cards<br><code>tool-cards</code> | 22 card styles around each tool step, with icons, status and test-result bars | `/tool-cards neon` |
| 💬 Message badges<br><code>message-badges</code> | 22 badge styles above your messages and Claude's replies | `/badges space` |
| 🔔 Sound packs<br><code>sound-packs</code> | 25 sound packs for done / error / question, plus a spoken "All done!" | `/sounds arcade` |
| 📈 Session stats<br><code>session-stats</code> | A dashboard: time, turns, tools, files changed, context and cost | `/session-stats` |
| 🖱️ Smart menu<br><code>smart-menu</code> | Right-click: Explain, Find bugs, Improve, Explain simply, Make a theme from a colour | right-click selected text |

Install any of them, one line each:

```
/plugin install color-themes --marketplace notchkillerAI/claude-code-color-themes
/plugin install ambient-bar --marketplace notchkillerAI/claude-code-color-themes
/plugin install fun-spinners --marketplace notchkillerAI/claude-code-color-themes
/plugin install prompt-colors --marketplace notchkillerAI/claude-code-color-themes
/plugin install tool-cards --marketplace notchkillerAI/claude-code-color-themes
/plugin install message-badges --marketplace notchkillerAI/claude-code-color-themes
/plugin install sound-packs --marketplace notchkillerAI/claude-code-color-themes
/plugin install session-stats --marketplace notchkillerAI/claude-code-color-themes
/plugin install smart-menu --marketplace notchkillerAI/claude-code-color-themes
```

> 💡 Choose **either** `olive-theme` (everything) **or** the separate plugins, not both, or features will show twice.

<details>
<summary>Other ways to install</summary>

**From a shell** (works for any plugin name above)

```bash
claude plugin install olive-theme --marketplace notchkillerAI/claude-code-color-themes
```

**In the Claude desktop app**

1. Click **+** next to the prompt box
2. Choose **Plugins** → **Add marketplace**
3. Enter `notchkillerAI/claude-code-color-themes`
4. Click **Add plugin** and pick the ones you want

</details>

After installing, **start a new session**. Plugins load when a session starts, in any folder.

## 🌌 Animated scenes

Every theme comes with a slow, animated background scene behind the conversation, and a soft glow that follows your mouse. Scenes are matched to each theme automatically, or you can put any scene on any theme:

```
/colors scene psychflow     pick a scene
/colors scene auto          match the theme (default)
/colors scene off           no scene
/colors glow off            turn off the mouse glow
```

<table>
<tr><td width="33%" valign="top"><img src="assets/scenes/psychflow.svg" alt="Psychedelic flow animated scene" width="100%"><br><b>Psychedelic flow</b> · <code>psychflow</code><br><sub>Liquid stripes in purple, magenta, orange and blue that ripple and slowly change colour.<br>Try <code>/colors psych-currents</code></sub></td><td width="33%" valign="top"><img src="assets/scenes/shootingstars.svg" alt="Shooting stars animated scene" width="100%"><br><b>Shooting stars</b> · <code>shootingstars</code><br><sub>A retro synthwave night: striped sunset sun, neon grid, twinkling sky and shooting stars.<br>Try <code>/colors shooting-star</code></sub></td><td width="33%" valign="top"><img src="assets/scenes/grid.svg" alt="Neon grid animated scene" width="100%"><br><b>Neon grid</b> · <code>grid</code><br><sub>An 80s outrun floor rolling towards you under a striped sun.<br>Try <code>/colors synthwave</code></sub></td></tr>
<tr><td width="33%" valign="top"><img src="assets/scenes/mesh.svg" alt="Mesh gradient animated scene" width="100%"><br><b>Mesh gradient</b> · <code>mesh</code><br><sub>Huge soft colour blobs drifting into each other, the trendy blurred-gradient look.<br>Try <code>/colors mesh-candy</code></sub></td><td width="33%" valign="top"><img src="assets/scenes/lavalamp.svg" alt="Lava lamp animated scene" width="100%"><br><b>Lava lamp</b> · <code>lavalamp</code><br><sub>Glowing blobs that rise, stretch and sink like a lava lamp.<br>Try <code>/colors lava-lounge</code></sub></td><td width="33%" valign="top"><img src="assets/scenes/aurora.svg" alt="Northern lights animated scene" width="100%"><br><b>Northern lights</b> · <code>aurora</code><br><sub>Blurred ribbons of light swaying over a starry sky.<br>Try <code>/colors northern-lights</code></sub></td></tr>
<tr><td width="33%" valign="top"><img src="assets/scenes/stars.svg" alt="Twinkling stars animated scene" width="100%"><br><b>Twinkling stars</b> · <code>stars</code><br><sub>A calm starfield with the odd shooting star.<br>Try <code>/colors galaxy</code></sub></td><td width="33%" valign="top"><img src="assets/scenes/warp.svg" alt="Hyperspace animated scene" width="100%"><br><b>Hyperspace</b> · <code>warp</code><br><sub>Star streaks rushing out of a vanishing point.<br>Try <code>/colors hyperspace</code></sub></td><td width="33%" valign="top"><img src="assets/scenes/orbits.svg" alt="Orbits animated scene" width="100%"><br><b>Orbits</b> · <code>orbits</code><br><sub>Planets circling a glowing sun in the corner.<br>Try <code>/colors solar-system</code></sub></td></tr>
<tr><td width="33%" valign="top"><img src="assets/scenes/equalizer.svg" alt="Equalizer animated scene" width="100%"><br><b>Equalizer</b> · <code>equalizer</code><br><sub>Bars bouncing like a music visualizer along the edges.<br>Try <code>/colors bass-drop</code></sub></td><td width="33%" valign="top"><img src="assets/scenes/bokeh.svg" alt="Bokeh lights animated scene" width="100%"><br><b>Bokeh lights</b> · <code>bokeh</code><br><sub>Out-of-focus city lights gently pulsing.<br>Try <code>/colors city-bokeh</code></sub></td><td width="33%" valign="top"><img src="assets/scenes/petals.svg" alt="Falling petals animated scene" width="100%"><br><b>Falling petals</b> · <code>petals</code><br><sub>Cherry-blossom petals tumbling and spinning down.<br>Try <code>/colors sakura</code></sub></td></tr>
<tr><td width="33%" valign="top"><img src="assets/scenes/leaves.svg" alt="Autumn leaves animated scene" width="100%"><br><b>Autumn leaves</b> · <code>leaves</code><br><sub>Warm leaves drifting down in a breeze.<br>Try <code>/colors autumn-leaf</code></sub></td><td width="33%" valign="top"><img src="assets/scenes/snow.svg" alt="Snowfall animated scene" width="100%"><br><b>Snowfall</b> · <code>snow</code><br><sub>Soft flakes falling and swaying.<br>Try <code>/colors nordic-frost</code></sub></td><td width="33%" valign="top"><img src="assets/scenes/rain.svg" alt="Soft rain animated scene" width="100%"><br><b>Soft rain</b> · <code>rain</code><br><sub>Light slanted rain, perfect for lofi focus.<br>Try <code>/colors storm-cloud</code></sub></td></tr>
<tr><td width="33%" valign="top"><img src="assets/scenes/waves.svg" alt="Ocean waves animated scene" width="100%"><br><b>Ocean waves</b> · <code>waves</code><br><sub>Layered waves rolling along the bottom.<br>Try <code>/colors ocean-depth</code></sub></td><td width="33%" valign="top"><img src="assets/scenes/ripples.svg" alt="Ripples animated scene" width="100%"><br><b>Ripples</b> · <code>ripples</code><br><sub>Rings spreading across still water.<br>Try <code>/colors koi-pond</code></sub></td><td width="33%" valign="top"><img src="assets/scenes/bubbles.svg" alt="Rising bubbles animated scene" width="100%"><br><b>Rising bubbles</b> · <code>bubbles</code><br><sub>Shiny bubbles floating up.<br>Try <code>/colors mermaidcore</code></sub></td></tr>
<tr><td width="33%" valign="top"><img src="assets/scenes/fireflies.svg" alt="Fireflies animated scene" width="100%"><br><b>Fireflies</b> · <code>fireflies</code><br><sub>Little glowing lights drifting and blinking.<br>Try <code>/colors olive</code></sub></td><td width="33%" valign="top"><img src="assets/scenes/sunset.svg" alt="Sunset clouds animated scene" width="100%"><br><b>Sunset clouds</b> · <code>sunset</code><br><sub>A glowing sun with clouds sliding past.<br>Try <code>/colors golden-hour</code></sub></td><td width="33%" valign="top"><img src="assets/scenes/clouds.svg" alt="Dreamy clouds animated scene" width="100%"><br><b>Dreamy clouds</b> · <code>clouds</code><br><sub>Big pastel clouds drifting slowly.<br>Try <code>/colors iced-latte</code></sub></td></tr>
<tr><td width="33%" valign="top"><img src="assets/scenes/lanterns.svg" alt="Floating lanterns animated scene" width="100%"><br><b>Floating lanterns</b> · <code>lanterns</code><br><sub>Warm paper lanterns rising into the night.<br>Try <code>/colors kyoto</code></sub></td><td width="33%" valign="top"><img src="assets/scenes/hearts.svg" alt="Floating hearts animated scene" width="100%"><br><b>Floating hearts</b> · <code>hearts</code><br><sub>Little hearts floating upwards.<br>Try <code>/colors rose-gold</code></sub></td><td width="33%" valign="top"><img src="assets/scenes/crystals.svg" alt="Drifting crystals animated scene" width="100%"><br><b>Drifting crystals</b> · <code>crystals</code><br><sub>Glassy gem shapes floating and turning.<br>Try <code>/colors amethyst</code></sub></td></tr>
<tr><td width="33%" valign="top"><img src="assets/scenes/confetti.svg" alt="Confetti animated scene" width="100%"><br><b>Confetti</b> · <code>confetti</code><br><sub>Colourful confetti tumbling down.<br>Try <code>/colors macaron</code></sub></td><td width="33%" valign="top"><img src="assets/scenes/coderain.svg" alt="Code rain animated scene" width="100%"><br><b>Code rain</b> · <code>coderain</code><br><sub>Columns of falling code symbols.<br>Try <code>/colors onyx</code></sub></td><td width="33%" valign="top"><img src="assets/scenes/contours.svg" alt="Topographic animated scene" width="100%"><br><b>Topographic</b> · <code>contours</code><br><sub>Contour lines of a map, slowly breathing.<br>Try <code>/colors topo-map</code></sub></td></tr>
</table>

<sub>These previews are the real scenes, animated right here in the README. In the app they're tinted with whatever theme you choose, in light and dark mode.</sub>

## 🎨 Themes

209 themes in 10 collections. Each card shows the theme in light mode (top) and dark mode (bottom) with its accent colour.

| | |
| --- | --- |
| **✨ Motion vibes**: themes built around their animated scene, like `psych-currents`, `shooting-star`, `mesh-candy`, `hyperspace` and `bass-drop` | <img src="assets/motion-vibes.svg" width="100%"> |
| **🌸 Soft pastels** | <img src="assets/soft-pastels.svg" width="100%"> |
| **🍂 Earthy & cozy** | <img src="assets/earthy-cozy.svg" width="100%"> |
| **⚡ Bold & vibrant** | <img src="assets/bold-vibrant.svg" width="100%"> |
| **🌙 Dark & moody** | <img src="assets/dark-moody.svg" width="100%"> |
| **💿 Aesthetic vibes** | <img src="assets/aesthetic-vibes.svg" width="100%"> |
| **🌿 Nature escapes** | <img src="assets/nature-escapes.svg" width="100%"> |
| **💎 Gemstones** | <img src="assets/gemstones.svg" width="100%"> |
| **🧋 Sweets & drinks** | <img src="assets/sweets-drinks.svg" width="100%"> |
| **✈️ Places & journeys** | <img src="assets/places-journeys.svg" width="100%"> |

### Theme commands

| Command | What it does |
| --- | --- |
| `/colors` | List every theme and command |
| `/colors panel` | A side panel to pick themes by sight, star favourites and flip every setting |
| `/colors sakura` | Switch theme (`/colors golden hour` works too) |
| `/colors random` · `/colors surprise` | A random theme · a brand-new random palette |
| `/colors save my-blue` | Keep a custom or surprise colour as your own palette |
| `/colors favorite` · `/colors undo` | Star the current theme · go back |
| `/colors auto time` | Pastels in the morning, coastal by day, golden hour in the evening, midnight navy at night |
| `/colors auto daily` · `season` · `off` | A theme of the day · seasonal themes · back to your pick |
| `/colors contrast on` · `/colors code off` | Stronger borders · turn off matching code colours |

## 🖌️ Custom colours

1. **Pick a colour** from any colour picker, such as [coolors.co](https://coolors.co) or [Adobe Color](https://color.adobe.com).
2. **Type it:** `/colors custom #ff6b6b` (the `#` and the word `custom` are optional).
3. **Enjoy:** you get a full light and dark theme, readable contrast and a matching scene.

<p align="center"><img src="assets/custom.svg" alt="Custom colour examples" width="100%"></p>

**Tips:** rich mid-tones like `#6c5ce7` make striking themes; pale colours give calm ones. Keep one with `/colors save <name>`. You can also **right-click** any hex colour in the chat and choose **Make a theme from it** (with `smart-menu` or `olive-theme`).

## 🧩 More customization

Each of these is its own plugin, and is also included in the all-in-one `olive-theme`. Add `list` to see every style and `off` to turn it off.

| Feature | Standalone command | In `olive-theme` | What it looks like |
| --- | --- | --- | --- |
| 📊 **Ambient bar** | `/bar focus 50` · `/bar clock 24h` · `/bar quote next` · `/bar off` | `/colors focus 50` … | `🌸 Sakura   🕐 9:42 PM · Thu 19 Nov   🍅 24:13 ⏸ ⏹   ✨ Small commits, big wins. ↻` |
| ⏳ **Spinners** (27) | `/spinner coffee` | `/colors spinner coffee` | *Brewing ☕* · *Wishing 🌠* · *Swirling 🌀* · *Leveling up 🎮* |
| ⌨️ **Prompt colors** (24) | `/prompt-colors neon` | `/colors prompt neon` | `/commands`, `@files`, `app.py`, links, `TODO`, numbers each in their own colour |
| 🧰 **Tool cards** (22) | `/tool-cards neon` | `/colors cards neon` | `╭ 💻 Bash  ✓ done ╮` with a `██████████░ 18/20 passed` test bar |
| 💬 **Message badges** (22) | `/badges space` | `/colors badges space` | `👩‍🚀 You` · `🛸 Claude` |
| 🔔 **Sound packs** (25) | `/sounds arcade` · `/sounds voice on` | `/colors sounds arcade` · `/colors voice on` | Different sounds for done, error and question; your Mac can say "All done!" |
| 📈 **Session stats** | `/session-stats` | `/colors stats` | Time, turns, tool bar chart, files changed, context %, cost |
| 🖱️ **Smart menu** | right-click selected text | right-click | 💡 Explain · 🐞 Find bugs · ✨ Improve · 🧒 Explain simply · 🎨 Make a theme |

<details>
<summary>All the style names</summary>

- **Spinners:** sparkle, coffee, tea, space, synthwave, psych, shootingstar, ocean, forest, sakura, autumn, winter, baking, cooking, music, lofi, gaming, magic, robot, science, cat, dog, ninja, pirate, garden, zen, dots (or `auto` to match your theme)
- **Prompt colors:** neon, pastel, synthwave, ocean, forest, sunset, candy, dracula, nord, monokai, solar, gruvbox, matrix, sakura, autumn, ice, gold, cyber, lavender, citrus, mono, retro, vapor, earth
- **Tool cards:** soft, neon, ocean, forest, sunset, lavender, gold, mint, cherry, ice, boxy, double, bold, classic, terminal, synthwave, dracula, nord, gruvbox, cyber, minimal, emoji
- **Message badges:** classic, sparkle, space, synthwave, chat, cozy, nature, ocean, sakura, cats, gaming, music, magic, robots, royal, minimal, arrows, brackets, hearts, weather, food, sports
- **Sound packs:** chime, bells, marimba, arcade, coin, levelup, synthwave, dreamy, harp, zen, bubbles, piano, doorbell, sparkle, robot, lofi, space, kalimba, pop, victory, ocean, retro, gentle, jazz, wind (plus `classic`)

</details>

## 📋 Every theme

Click a collection to see each theme, its command and its key colours.

<details>
<summary><b>Soft pastels</b> — 20 themes</summary>

| Theme | Command | Light background | Dark background | Accent |
| --- | --- | --- | --- | --- |
| **Matcha Latte** | `/colors matcha-latte` | ![#e1e7d5](https://img.shields.io/badge/-%23e1e7d5-e1e7d5?style=flat-square) | ![#13160e](https://img.shields.io/badge/-%2313160e-13160e?style=flat-square) | ![#6f8d35](https://img.shields.io/badge/-%236f8d35-6f8d35?style=flat-square) |
| **Digital Lavender** | `/colors digital-lavender` | ![#dcd2ea](https://img.shields.io/badge/-%23dcd2ea-dcd2ea?style=flat-square) | ![#110d17](https://img.shields.io/badge/-%23110d17-110d17?style=flat-square) | ![#5a358d](https://img.shields.io/badge/-%235a358d-5a358d?style=flat-square) |
| **Butter Yellow** | `/colors butter-yellow` | ![#eee9cd](https://img.shields.io/badge/-%23eee9cd-eee9cd?style=flat-square) | ![#19170b](https://img.shields.io/badge/-%2319170b-19170b?style=flat-square) | ![#96842c](https://img.shields.io/badge/-%2396842c-96842c?style=flat-square) |
| **Sorbet Peach** | `/colors sorbet-peach` | ![#eed9cd](https://img.shields.io/badge/-%23eed9cd-eed9cd?style=flat-square) | ![#19100b](https://img.shields.io/badge/-%2319100b-19100b?style=flat-square) | ![#96532c](https://img.shields.io/badge/-%2396532c-96532c?style=flat-square) |
| **Cotton Candy** | `/colors cotton-candy` | ![#ebd0de](https://img.shields.io/badge/-%23ebd0de-ebd0de?style=flat-square) | ![#180c12](https://img.shields.io/badge/-%23180c12-180c12?style=flat-square) | ![#8d3561](https://img.shields.io/badge/-%238d3561-8d3561?style=flat-square) |
| **Baby Blue** | `/colors baby-blue` | ![#d0e0eb](https://img.shields.io/badge/-%23d0e0eb-d0e0eb?style=flat-square) | ![#0c1318](https://img.shields.io/badge/-%230c1318-0c1318?style=flat-square) | ![#35688d](https://img.shields.io/badge/-%2335688d-35688d?style=flat-square) |
| **Mint Cream** | `/colors mint-cream` | ![#d3e8e0](https://img.shields.io/badge/-%23d3e8e0-d3e8e0?style=flat-square) | ![#0d1613](https://img.shields.io/badge/-%230d1613-0d1613?style=flat-square) | ![#358d68](https://img.shields.io/badge/-%23358d68-358d68?style=flat-square) |
| **Lilac Haze** | `/colors lilac-haze` | ![#dfd5e7](https://img.shields.io/badge/-%23dfd5e7-dfd5e7?style=flat-square) | ![#120e16](https://img.shields.io/badge/-%23120e16-120e16?style=flat-square) | ![#68358d](https://img.shields.io/badge/-%2368358d-68358d?style=flat-square) |
| **Strawberry Milk** | `/colors strawberry-milk` | ![#ead2d8](https://img.shields.io/badge/-%23ead2d8-ead2d8?style=flat-square) | ![#170d0f](https://img.shields.io/badge/-%23170d0f-170d0f?style=flat-square) | ![#8d354b](https://img.shields.io/badge/-%238d354b-8d354b?style=flat-square) |
| **Pistachio Gelato** | `/colors pistachio-gelato` | ![#deead2](https://img.shields.io/badge/-%23deead2-deead2?style=flat-square) | ![#12170d](https://img.shields.io/badge/-%2312170d-12170d?style=flat-square) | ![#618d35](https://img.shields.io/badge/-%23618d35-618d35?style=flat-square) |
| **Seafoam** | `/colors seafoam` | ![#d3e8e3](https://img.shields.io/badge/-%23d3e8e3-d3e8e3?style=flat-square) | ![#0d1614](https://img.shields.io/badge/-%230d1614-0d1614?style=flat-square) | ![#358d77](https://img.shields.io/badge/-%23358d77-358d77?style=flat-square) |
| **Blush Pink** | `/colors blush-pink` | ![#e8d3d7](https://img.shields.io/badge/-%23e8d3d7-e8d3d7?style=flat-square) | ![#160d0f](https://img.shields.io/badge/-%23160d0f-160d0f?style=flat-square) | ![#8d3544](https://img.shields.io/badge/-%238d3544-8d3544?style=flat-square) |
| **Periwinkle** | `/colors periwinkle` | ![#d2d4ea](https://img.shields.io/badge/-%23d2d4ea-d2d4ea?style=flat-square) | ![#0d0e17](https://img.shields.io/badge/-%230d0e17-0d0e17?style=flat-square) | ![#353d8d](https://img.shields.io/badge/-%23353d8d-353d8d?style=flat-square) |
| **Honeydew** | `/colors honeydew` | ![#dbe7d5](https://img.shields.io/badge/-%23dbe7d5-dbe7d5?style=flat-square) | ![#11160e](https://img.shields.io/badge/-%2311160e-11160e?style=flat-square) | ![#528d35](https://img.shields.io/badge/-%23528d35-528d35?style=flat-square) |
| **Apricot Crush** | `/colors apricot-crush` | ![#eeddcd](https://img.shields.io/badge/-%23eeddcd-eeddcd?style=flat-square) | ![#19110b](https://img.shields.io/badge/-%2319110b-19110b?style=flat-square) | ![#965d2c](https://img.shields.io/badge/-%23965d2c-965d2c?style=flat-square) |
| **Powder Blue** | `/colors powder-blue` | ![#d5e1e7](https://img.shields.io/badge/-%23d5e1e7-d5e1e7?style=flat-square) | ![#0e1316](https://img.shields.io/badge/-%230e1316-0e1316?style=flat-square) | ![#356f8d](https://img.shields.io/badge/-%23356f8d-356f8d?style=flat-square) |
| **Rose Quartz** | `/colors rose-quartz` | ![#e7d5db](https://img.shields.io/badge/-%23e7d5db-e7d5db?style=flat-square) | ![#160e11](https://img.shields.io/badge/-%23160e11-160e11?style=flat-square) | ![#8d3552](https://img.shields.io/badge/-%238d3552-8d3552?style=flat-square) |
| **Vanilla Bean** | `/colors vanilla-bean` | ![#e7e2d5](https://img.shields.io/badge/-%23e7e2d5-e7e2d5?style=flat-square) | ![#16140e](https://img.shields.io/badge/-%2316140e-16140e?style=flat-square) | ![#8d7735](https://img.shields.io/badge/-%238d7735-8d7735?style=flat-square) |
| **Lemon Sorbet** | `/colors lemon-sorbet` | ![#eeeccd](https://img.shields.io/badge/-%23eeeccd-eeeccd?style=flat-square) | ![#19180b](https://img.shields.io/badge/-%2319180b-19180b?style=flat-square) | ![#968d2c](https://img.shields.io/badge/-%23968d2c-968d2c?style=flat-square) |
| **Creamsicle** | `/colors creamsicle` | ![#f0decc](https://img.shields.io/badge/-%23f0decc-f0decc?style=flat-square) | ![#1a120a](https://img.shields.io/badge/-%231a120a-1a120a?style=flat-square) | ![#9b6127](https://img.shields.io/badge/-%239b6127-9b6127?style=flat-square) |

</details>

<details>
<summary><b>Earthy & cozy</b> — 20 themes</summary>

| Theme | Command | Light background | Dark background | Accent |
| --- | --- | --- | --- | --- |
| **Olive** | `/colors olive` | ![#d3d8ac](https://img.shields.io/badge/-%23d3d8ac-d3d8ac?style=flat-square) | ![#191c08](https://img.shields.io/badge/-%23191c08-191c08?style=flat-square) | ![#5a6a14](https://img.shields.io/badge/-%235a6a14-5a6a14?style=flat-square) |
| **Espresso** | `/colors espresso` | ![#e7dcd5](https://img.shields.io/badge/-%23e7dcd5-e7dcd5?style=flat-square) | ![#16110e](https://img.shields.io/badge/-%2316110e-16110e?style=flat-square) | ![#8d5a35](https://img.shields.io/badge/-%238d5a35-8d5a35?style=flat-square) |
| **Terracotta** | `/colors terracotta` | ![#ebd7d0](https://img.shields.io/badge/-%23ebd7d0-ebd7d0?style=flat-square) | ![#180f0c](https://img.shields.io/badge/-%23180f0c-180f0c?style=flat-square) | ![#8d4b35](https://img.shields.io/badge/-%238d4b35-8d4b35?style=flat-square) |
| **Clay Pot** | `/colors clay-pot` | ![#e8dad3](https://img.shields.io/badge/-%23e8dad3-e8dad3?style=flat-square) | ![#16100d](https://img.shields.io/badge/-%2316100d-16100d?style=flat-square) | ![#8d4f35](https://img.shields.io/badge/-%238d4f35-8d4f35?style=flat-square) |
| **Sage Green** | `/colors sage-green` | ![#dce4d8](https://img.shields.io/badge/-%23dce4d8-dce4d8?style=flat-square) | ![#11140f](https://img.shields.io/badge/-%2311140f-11140f?style=flat-square) | ![#528d35](https://img.shields.io/badge/-%23528d35-528d35?style=flat-square) |
| **Moss Stone** | `/colors moss-stone` | ![#dfe5d6](https://img.shields.io/badge/-%23dfe5d6-dfe5d6?style=flat-square) | ![#12150f](https://img.shields.io/badge/-%2312150f-12150f?style=flat-square) | ![#688d35](https://img.shields.io/badge/-%23688d35-688d35?style=flat-square) |
| **Oat Milk** | `/colors oat-milk` | ![#e4e0d8](https://img.shields.io/badge/-%23e4e0d8-e4e0d8?style=flat-square) | ![#14130f](https://img.shields.io/badge/-%2314130f-14130f?style=flat-square) | ![#8d6f35](https://img.shields.io/badge/-%238d6f35-8d6f35?style=flat-square) |
| **Cinnamon Roll** | `/colors cinnamon-roll` | ![#eadbd2](https://img.shields.io/badge/-%23eadbd2-eadbd2?style=flat-square) | ![#17100d](https://img.shields.io/badge/-%2317100d-17100d?style=flat-square) | ![#8d5535](https://img.shields.io/badge/-%238d5535-8d5535?style=flat-square) |
| **Chai** | `/colors chai` | ![#e8ded3](https://img.shields.io/badge/-%23e8ded3-e8ded3?style=flat-square) | ![#16120d](https://img.shields.io/badge/-%2316120d-16120d?style=flat-square) | ![#8d6135](https://img.shields.io/badge/-%238d6135-8d6135?style=flat-square) |
| **Caramel Drizzle** | `/colors caramel-drizzle` | ![#ebdfd0](https://img.shields.io/badge/-%23ebdfd0-ebdfd0?style=flat-square) | ![#18120c](https://img.shields.io/badge/-%2318120c-18120c?style=flat-square) | ![#8d6435](https://img.shields.io/badge/-%238d6435-8d6435?style=flat-square) |
| **Desert Sand** | `/colors desert-sand` | ![#e7e0d5](https://img.shields.io/badge/-%23e7e0d5-e7e0d5?style=flat-square) | ![#16130e](https://img.shields.io/badge/-%2316130e-16130e?style=flat-square) | ![#8d6d35](https://img.shields.io/badge/-%238d6d35-8d6d35?style=flat-square) |
| **Burnt Sienna** | `/colors burnt-sienna` | ![#edd6cf](https://img.shields.io/badge/-%23edd6cf-edd6cf?style=flat-square) | ![#180e0b](https://img.shields.io/badge/-%23180e0b-180e0b?style=flat-square) | ![#914730](https://img.shields.io/badge/-%23914730-914730?style=flat-square) |
| **Cedarwood** | `/colors cedarwood` | ![#e5dbd6](https://img.shields.io/badge/-%23e5dbd6-e5dbd6?style=flat-square) | ![#15110f](https://img.shields.io/badge/-%2315110f-15110f?style=flat-square) | ![#8d5235](https://img.shields.io/badge/-%238d5235-8d5235?style=flat-square) |
| **Walnut** | `/colors walnut` | ![#e4ddd7](https://img.shields.io/badge/-%23e4ddd7-e4ddd7?style=flat-square) | ![#15110f](https://img.shields.io/badge/-%2315110f-15110f?style=flat-square) | ![#8d5a35](https://img.shields.io/badge/-%238d5a35-8d5a35?style=flat-square) |
| **Mushroom** | `/colors mushroom` | ![#e1dedb](https://img.shields.io/badge/-%23e1dedb-e1dedb?style=flat-square) | ![#131211](https://img.shields.io/badge/-%23131211-131211?style=flat-square) | ![#8d6135](https://img.shields.io/badge/-%238d6135-8d6135?style=flat-square) |
| **Linen** | `/colors linen` | ![#e3dfd9](https://img.shields.io/badge/-%23e3dfd9-e3dfd9?style=flat-square) | ![#141210](https://img.shields.io/badge/-%23141210-141210?style=flat-square) | ![#8d6d35](https://img.shields.io/badge/-%238d6d35-8d6d35?style=flat-square) |
| **Khaki Trail** | `/colors khaki-trail` | ![#e4e3d7](https://img.shields.io/badge/-%23e4e3d7-e4e3d7?style=flat-square) | ![#15140f](https://img.shields.io/badge/-%2315140f-15140f?style=flat-square) | ![#8d8535](https://img.shields.io/badge/-%238d8535-8d8535?style=flat-square) |
| **Hazelnut** | `/colors hazelnut` | ![#e7ddd5](https://img.shields.io/badge/-%23e7ddd5-e7ddd5?style=flat-square) | ![#16120e](https://img.shields.io/badge/-%2316120e-16120e?style=flat-square) | ![#8d5e35](https://img.shields.io/badge/-%238d5e35-8d5e35?style=flat-square) |
| **Tobacco** | `/colors tobacco` | ![#eaded2](https://img.shields.io/badge/-%23eaded2-eaded2?style=flat-square) | ![#17120d](https://img.shields.io/badge/-%2317120d-17120d?style=flat-square) | ![#8d6135](https://img.shields.io/badge/-%238d6135-8d6135?style=flat-square) |
| **Fig** | `/colors fig` | ![#e4d8e0](https://img.shields.io/badge/-%23e4d8e0-e4d8e0?style=flat-square) | ![#140f13](https://img.shields.io/badge/-%23140f13-140f13?style=flat-square) | ![#8d356f](https://img.shields.io/badge/-%238d356f-8d356f?style=flat-square) |

</details>

<details>
<summary><b>Bold & vibrant</b> — 20 themes</summary>

| Theme | Command | Light background | Dark background | Accent |
| --- | --- | --- | --- | --- |
| **Electric Blue** | `/colors electric-blue` | ![#c9daf3](https://img.shields.io/badge/-%23c9daf3-c9daf3?style=flat-square) | ![#09101b](https://img.shields.io/badge/-%2309101b-09101b?style=flat-square) | ![#1d56a5](https://img.shields.io/badge/-%231d56a5-1d56a5?style=flat-square) |
| **Hot Pink** | `/colors hot-pink` | ![#f1cade](https://img.shields.io/badge/-%23f1cade-f1cade?style=flat-square) | ![#1a0912](https://img.shields.io/badge/-%231a0912-1a0912?style=flat-square) | ![#a02261](https://img.shields.io/badge/-%23a02261-a02261?style=flat-square) |
| **Cherry Red** | `/colors cherry-red` | ![#f0cccf](https://img.shields.io/badge/-%23f0cccf-f0cccf?style=flat-square) | ![#1a0a0b](https://img.shields.io/badge/-%231a0a0b-1a0a0b?style=flat-square) | ![#9b2730](https://img.shields.io/badge/-%239b2730-9b2730?style=flat-square) |
| **Tangerine Dream** | `/colors tangerine-dream` | ![#f3dac9](https://img.shields.io/badge/-%23f3dac9-f3dac9?style=flat-square) | ![#1b1009](https://img.shields.io/badge/-%231b1009-1b1009?style=flat-square) | ![#a5561d](https://img.shields.io/badge/-%23a5561d-a5561d?style=flat-square) |
| **Lime Zest** | `/colors lime-zest` | ![#e4f1ca](https://img.shields.io/badge/-%23e4f1ca-e4f1ca?style=flat-square) | ![#151a09](https://img.shields.io/badge/-%23151a09-151a09?style=flat-square) | ![#76a022](https://img.shields.io/badge/-%2376a022-76a022?style=flat-square) |
| **Cobalt** | `/colors cobalt` | ![#ccd5f0](https://img.shields.io/badge/-%23ccd5f0-ccd5f0?style=flat-square) | ![#0a0e1a](https://img.shields.io/badge/-%230a0e1a-0a0e1a?style=flat-square) | ![#27449b](https://img.shields.io/badge/-%2327449b-27449b?style=flat-square) |
| **Ultraviolet** | `/colors ultraviolet` | ![#deccf0](https://img.shields.io/badge/-%23deccf0-deccf0?style=flat-square) | ![#120a1a](https://img.shields.io/badge/-%23120a1a-120a1a?style=flat-square) | ![#61279b](https://img.shields.io/badge/-%2361279b-61279b?style=flat-square) |
| **Emerald City** | `/colors emerald-city` | ![#cdeedb](https://img.shields.io/badge/-%23cdeedb-cdeedb?style=flat-square) | ![#0b1911](https://img.shields.io/badge/-%230b1911-0b1911?style=flat-square) | ![#2c9658](https://img.shields.io/badge/-%232c9658-2c9658?style=flat-square) |
| **Saffron** | `/colors saffron` | ![#f3e5c9](https://img.shields.io/badge/-%23f3e5c9-f3e5c9?style=flat-square) | ![#1b1509](https://img.shields.io/badge/-%231b1509-1b1509?style=flat-square) | ![#a5781d](https://img.shields.io/badge/-%23a5781d-a5781d?style=flat-square) |
| **Fuchsia Pop** | `/colors fuchsia-pop` | ![#f1cae4](https://img.shields.io/badge/-%23f1cae4-f1cae4?style=flat-square) | ![#1a0915](https://img.shields.io/badge/-%231a0915-1a0915?style=flat-square) | ![#a02276](https://img.shields.io/badge/-%23a02276-a02276?style=flat-square) |
| **Turquoise** | `/colors turquoise` | ![#cdeeee](https://img.shields.io/badge/-%23cdeeee-cdeeee?style=flat-square) | ![#0b1919](https://img.shields.io/badge/-%230b1919-0b1919?style=flat-square) | ![#2c9696](https://img.shields.io/badge/-%232c9696-2c9696?style=flat-square) |
| **Scarlet** | `/colors scarlet` | ![#f0cfcc](https://img.shields.io/badge/-%23f0cfcc-f0cfcc?style=flat-square) | ![#1a0b0a](https://img.shields.io/badge/-%231a0b0a-1a0b0a?style=flat-square) | ![#9b3027](https://img.shields.io/badge/-%239b3027-9b3027?style=flat-square) |
| **Royal Purple** | `/colors royal-purple` | ![#e3cdee](https://img.shields.io/badge/-%23e3cdee-e3cdee?style=flat-square) | ![#140b19](https://img.shields.io/badge/-%23140b19-140b19?style=flat-square) | ![#732c96](https://img.shields.io/badge/-%23732c96-732c96?style=flat-square) |
| **Sunflower** | `/colors sunflower` | ![#f3eac9](https://img.shields.io/badge/-%23f3eac9-f3eac9?style=flat-square) | ![#1b1709](https://img.shields.io/badge/-%231b1709-1b1709?style=flat-square) | ![#a58a1d](https://img.shields.io/badge/-%23a58a1d-a58a1d?style=flat-square) |
| **Jade Glow** | `/colors jade-glow` | ![#cfede2](https://img.shields.io/badge/-%23cfede2-cfede2?style=flat-square) | ![#0b1814](https://img.shields.io/badge/-%230b1814-0b1814?style=flat-square) | ![#30916e](https://img.shields.io/badge/-%2330916e-30916e?style=flat-square) |
| **Amber Glow** | `/colors amber-glow` | ![#f1e2ca](https://img.shields.io/badge/-%23f1e2ca-f1e2ca?style=flat-square) | ![#1a1409](https://img.shields.io/badge/-%231a1409-1a1409?style=flat-square) | ![#a06d22](https://img.shields.io/badge/-%23a06d22-a06d22?style=flat-square) |
| **Magenta Rush** | `/colors magenta-rush` | ![#f0cce7](https://img.shields.io/badge/-%23f0cce7-f0cce7?style=flat-square) | ![#1a0a16](https://img.shields.io/badge/-%231a0a16-1a0a16?style=flat-square) | ![#9b277e](https://img.shields.io/badge/-%239b277e-9b277e?style=flat-square) |
| **Ocean Depth** | `/colors ocean-depth` | ![#cde1ee](https://img.shields.io/badge/-%23cde1ee-cde1ee?style=flat-square) | ![#0b1319](https://img.shields.io/badge/-%230b1319-0b1319?style=flat-square) | ![#2c6a96](https://img.shields.io/badge/-%232c6a96-2c6a96?style=flat-square) |
| **Ruby** | `/colors ruby` | ![#eecdd3](https://img.shields.io/badge/-%23eecdd3-eecdd3?style=flat-square) | ![#190b0d](https://img.shields.io/badge/-%23190b0d-190b0d?style=flat-square) | ![#962c3d](https://img.shields.io/badge/-%23962c3d-962c3d?style=flat-square) |
| **Kiwi** | `/colors kiwi` | ![#deeecd](https://img.shields.io/badge/-%23deeecd-deeecd?style=flat-square) | ![#12190b](https://img.shields.io/badge/-%2312190b-12190b?style=flat-square) | ![#61962c](https://img.shields.io/badge/-%2361962c-61962c?style=flat-square) |

</details>

<details>
<summary><b>Dark & moody</b> — 20 themes</summary>

| Theme | Command | Light background | Dark background | Accent |
| --- | --- | --- | --- | --- |
| **Midnight Navy** | `/colors midnight-navy` | ![#d2d8ea](https://img.shields.io/badge/-%23d2d8ea-d2d8ea?style=flat-square) | ![#0d0f17](https://img.shields.io/badge/-%230d0f17-0d0f17?style=flat-square) | ![#354b8d](https://img.shields.io/badge/-%23354b8d-354b8d?style=flat-square) |
| **Obsidian** | `/colors obsidian` | ![#dbdbe0](https://img.shields.io/badge/-%23dbdbe0-dbdbe0?style=flat-square) | ![#111113](https://img.shields.io/badge/-%23111113-111113?style=flat-square) | ![#35358d](https://img.shields.io/badge/-%2335358d-35358d?style=flat-square) |
| **Deep Forest** | `/colors deep-forest` | ![#d3e8dc](https://img.shields.io/badge/-%23d3e8dc-d3e8dc?style=flat-square) | ![#0d1611](https://img.shields.io/badge/-%230d1611-0d1611?style=flat-square) | ![#358d5a](https://img.shields.io/badge/-%23358d5a-358d5a?style=flat-square) |
| **Merlot** | `/colors merlot` | ![#e8d3d9](https://img.shields.io/badge/-%23e8d3d9-e8d3d9?style=flat-square) | ![#160d10](https://img.shields.io/badge/-%23160d10-160d10?style=flat-square) | ![#8d354b](https://img.shields.io/badge/-%238d354b-8d354b?style=flat-square) |
| **Aubergine** | `/colors aubergine` | ![#e5d5e7](https://img.shields.io/badge/-%23e5d5e7-e5d5e7?style=flat-square) | ![#150e16](https://img.shields.io/badge/-%23150e16-150e16?style=flat-square) | ![#85358d](https://img.shields.io/badge/-%2385358d-85358d?style=flat-square) |
| **Charcoal** | `/colors charcoal` | ![#dedede](https://img.shields.io/badge/-%23dedede-dedede?style=flat-square) | ![#121212](https://img.shields.io/badge/-%23121212-121212?style=flat-square) | ![#8d3535](https://img.shields.io/badge/-%238d3535-8d3535?style=flat-square) |
| **Graphite** | `/colors graphite` | ![#dcdde0](https://img.shields.io/badge/-%23dcdde0-dcdde0?style=flat-square) | ![#111213](https://img.shields.io/badge/-%23111213-111213?style=flat-square) | ![#35528d](https://img.shields.io/badge/-%2335528d-35528d?style=flat-square) |
| **Storm Cloud** | `/colors storm-cloud` | ![#d8dee3](https://img.shields.io/badge/-%23d8dee3-d8dee3?style=flat-square) | ![#101214](https://img.shields.io/badge/-%23101214-101214?style=flat-square) | ![#35618d](https://img.shields.io/badge/-%2335618d-35618d?style=flat-square) |
| **Ink** | `/colors ink` | ![#d3d7e8](https://img.shields.io/badge/-%23d3d7e8-d3d7e8?style=flat-square) | ![#0d0f16](https://img.shields.io/badge/-%230d0f16-0d0f16?style=flat-square) | ![#35448d](https://img.shields.io/badge/-%2335448d-35448d?style=flat-square) |
| **Smoked Plum** | `/colors smoked-plum` | ![#e4d8e4](https://img.shields.io/badge/-%23e4d8e4-e4d8e4?style=flat-square) | ![#140f14](https://img.shields.io/badge/-%23140f14-140f14?style=flat-square) | ![#8d358d](https://img.shields.io/badge/-%238d358d-8d358d?style=flat-square) |
| **Petrol** | `/colors petrol` | ![#d2e4ea](https://img.shields.io/badge/-%23d2e4ea-d2e4ea?style=flat-square) | ![#0d1417](https://img.shields.io/badge/-%230d1417-0d1417?style=flat-square) | ![#35778d](https://img.shields.io/badge/-%2335778d-35778d?style=flat-square) |
| **Dark Chocolate** | `/colors dark-chocolate` | ![#e7dbd5](https://img.shields.io/badge/-%23e7dbd5-e7dbd5?style=flat-square) | ![#16110e](https://img.shields.io/badge/-%2316110e-16110e?style=flat-square) | ![#8d5235](https://img.shields.io/badge/-%238d5235-8d5235?style=flat-square) |
| **Oxblood** | `/colors oxblood` | ![#ead2d4](https://img.shields.io/badge/-%23ead2d4-ead2d4?style=flat-square) | ![#170d0e](https://img.shields.io/badge/-%23170d0e-170d0e?style=flat-square) | ![#8d353d](https://img.shields.io/badge/-%238d353d-8d353d?style=flat-square) |
| **Slate** | `/colors slate` | ![#dadde1](https://img.shields.io/badge/-%23dadde1-dadde1?style=flat-square) | ![#101213](https://img.shields.io/badge/-%23101213-101213?style=flat-square) | ![#355a8d](https://img.shields.io/badge/-%23355a8d-355a8d?style=flat-square) |
| **Gunmetal** | `/colors gunmetal` | ![#dbdee1](https://img.shields.io/badge/-%23dbdee1-dbdee1?style=flat-square) | ![#111213](https://img.shields.io/badge/-%23111213-111213?style=flat-square) | ![#35688d](https://img.shields.io/badge/-%2335688d-35688d?style=flat-square) |
| **Night Sky** | `/colors night-sky` | ![#d3d3e8](https://img.shields.io/badge/-%23d3d3e8-d3d3e8?style=flat-square) | ![#0d0d16](https://img.shields.io/badge/-%230d0d16-0d0d16?style=flat-square) | ![#35358d](https://img.shields.io/badge/-%2335358d-35358d?style=flat-square) |
| **Spruce** | `/colors spruce` | ![#d5e7e4](https://img.shields.io/badge/-%23d5e7e4-d5e7e4?style=flat-square) | ![#0e1614](https://img.shields.io/badge/-%230e1614-0e1614?style=flat-square) | ![#358d7e](https://img.shields.io/badge/-%23358d7e-358d7e?style=flat-square) |
| **Ember** | `/colors ember` | ![#edd4cf](https://img.shields.io/badge/-%23edd4cf-edd4cf?style=flat-square) | ![#180e0b](https://img.shields.io/badge/-%23180e0b-180e0b?style=flat-square) | ![#914130](https://img.shields.io/badge/-%23914130-914130?style=flat-square) |
| **Noir Teal** | `/colors noir-teal` | ![#d3e7e8](https://img.shields.io/badge/-%23d3e7e8-d3e7e8?style=flat-square) | ![#0d1616](https://img.shields.io/badge/-%230d1616-0d1616?style=flat-square) | ![#35858d](https://img.shields.io/badge/-%2335858d-35858d?style=flat-square) |
| **Black Cherry** | `/colors black-cherry` | ![#e8d3da](https://img.shields.io/badge/-%23e8d3da-e8d3da?style=flat-square) | ![#160d10](https://img.shields.io/badge/-%23160d10-160d10?style=flat-square) | ![#8d3552](https://img.shields.io/badge/-%238d3552-8d3552?style=flat-square) |

</details>

<details>
<summary><b>Aesthetic vibes</b> — 20 themes</summary>

| Theme | Command | Light background | Dark background | Accent |
| --- | --- | --- | --- | --- |
| **Y2k** | `/colors y2k` | ![#ebd0eb](https://img.shields.io/badge/-%23ebd0eb-ebd0eb?style=flat-square) | ![#180c18](https://img.shields.io/badge/-%23180c18-180c18?style=flat-square) | ![#8d358d](https://img.shields.io/badge/-%238d358d-8d358d?style=flat-square) |
| **Vaporwave** | `/colors vaporwave` | ![#edcfe8](https://img.shields.io/badge/-%23edcfe8-edcfe8?style=flat-square) | ![#180b16](https://img.shields.io/badge/-%23180b16-180b16?style=flat-square) | ![#913081](https://img.shields.io/badge/-%23913081-913081?style=flat-square) |
| **Synthwave** | `/colors synthwave` | ![#e6cdee](https://img.shields.io/badge/-%23e6cdee-e6cdee?style=flat-square) | ![#150b19](https://img.shields.io/badge/-%23150b19-150b19?style=flat-square) | ![#7c2c96](https://img.shields.io/badge/-%237c2c96-7c2c96?style=flat-square) |
| **Cyberpunk** | `/colors cyberpunk` | ![#f1caf1](https://img.shields.io/badge/-%23f1caf1-f1caf1?style=flat-square) | ![#1a091a](https://img.shields.io/badge/-%231a091a-1a091a?style=flat-square) | ![#a022a0](https://img.shields.io/badge/-%23a022a0-a022a0?style=flat-square) |
| **Cottagecore** | `/colors cottagecore` | ![#dce7d5](https://img.shields.io/badge/-%23dce7d5-dce7d5?style=flat-square) | ![#11160e](https://img.shields.io/badge/-%2311160e-11160e?style=flat-square) | ![#5a8d35](https://img.shields.io/badge/-%235a8d35-5a8d35?style=flat-square) |
| **Dark Academia** | `/colors dark-academia` | ![#e7ded5](https://img.shields.io/badge/-%23e7ded5-e7ded5?style=flat-square) | ![#16120e](https://img.shields.io/badge/-%2316120e-16120e?style=flat-square) | ![#8d6135](https://img.shields.io/badge/-%238d6135-8d6135?style=flat-square) |
| **Coastal** | `/colors coastal` | ![#d6e0e5](https://img.shields.io/badge/-%23d6e0e5-d6e0e5?style=flat-square) | ![#0f1315](https://img.shields.io/badge/-%230f1315-0f1315?style=flat-square) | ![#356f8d](https://img.shields.io/badge/-%23356f8d-356f8d?style=flat-square) |
| **Mermaidcore** | `/colors mermaidcore` | ![#cfeded](https://img.shields.io/badge/-%23cfeded-cfeded?style=flat-square) | ![#0b1818](https://img.shields.io/badge/-%230b1818-0b1818?style=flat-square) | ![#309191](https://img.shields.io/badge/-%23309191-309191?style=flat-square) |
| **Cyber Mint** | `/colors cyber-mint` | ![#ccf0e4](https://img.shields.io/badge/-%23ccf0e4-ccf0e4?style=flat-square) | ![#0a1a14](https://img.shields.io/badge/-%230a1a14-0a1a14?style=flat-square) | ![#279b74](https://img.shields.io/badge/-%23279b74-279b74?style=flat-square) |
| **Aurora** | `/colors aurora` | ![#cfede5](https://img.shields.io/badge/-%23cfede5-cfede5?style=flat-square) | ![#0b1815](https://img.shields.io/badge/-%230b1815-0b1815?style=flat-square) | ![#309179](https://img.shields.io/badge/-%23309179-309179?style=flat-square) |
| **Sunset Boulevard** | `/colors sunset-boulevard` | ![#eed6cd](https://img.shields.io/badge/-%23eed6cd-eed6cd?style=flat-square) | ![#190e0b](https://img.shields.io/badge/-%23190e0b-190e0b?style=flat-square) | ![#96462c](https://img.shields.io/badge/-%2396462c-96462c?style=flat-square) |
| **Golden Hour** | `/colors golden-hour` | ![#eee2cd](https://img.shields.io/badge/-%23eee2cd-eee2cd?style=flat-square) | ![#19140b](https://img.shields.io/badge/-%2319140b-19140b?style=flat-square) | ![#966f2c](https://img.shields.io/badge/-%23966f2c-966f2c?style=flat-square) |
| **Nordic Frost** | `/colors nordic-frost` | ![#d8dee3](https://img.shields.io/badge/-%23d8dee3-d8dee3?style=flat-square) | ![#101214](https://img.shields.io/badge/-%23101214-101214?style=flat-square) | ![#35618d](https://img.shields.io/badge/-%2335618d-35618d?style=flat-square) |
| **Tokyo Neon** | `/colors tokyo-neon` | ![#f1cae1](https://img.shields.io/badge/-%23f1cae1-f1cae1?style=flat-square) | ![#1a0913](https://img.shields.io/badge/-%231a0913-1a0913?style=flat-square) | ![#a0226b](https://img.shields.io/badge/-%23a0226b-a0226b?style=flat-square) |
| **Miami Nights** | `/colors miami-nights` | ![#cdeeec](https://img.shields.io/badge/-%23cdeeec-cdeeec?style=flat-square) | ![#0b1918](https://img.shields.io/badge/-%230b1918-0b1918?style=flat-square) | ![#2c968d](https://img.shields.io/badge/-%232c968d-2c968d?style=flat-square) |
| **Lofi** | `/colors lofi` | ![#dcd8e4](https://img.shields.io/badge/-%23dcd8e4-dcd8e4?style=flat-square) | ![#110f14](https://img.shields.io/badge/-%23110f14-110f14?style=flat-square) | ![#52358d](https://img.shields.io/badge/-%2352358d-52358d?style=flat-square) |
| **Retro 80s** | `/colors retro-80s` | ![#e9cdee](https://img.shields.io/badge/-%23e9cdee-e9cdee?style=flat-square) | ![#170b19](https://img.shields.io/badge/-%23170b19-170b19?style=flat-square) | ![#842c96](https://img.shields.io/badge/-%23842c96-842c96?style=flat-square) |
| **Solarpunk** | `/colors solarpunk` | ![#d5ebd0](https://img.shields.io/badge/-%23d5ebd0-d5ebd0?style=flat-square) | ![#0e180c](https://img.shields.io/badge/-%230e180c-0e180c?style=flat-square) | ![#448d35](https://img.shields.io/badge/-%23448d35-448d35?style=flat-square) |
| **Pink Power** | `/colors pink-power` | ![#f0ccde](https://img.shields.io/badge/-%23f0ccde-f0ccde?style=flat-square) | ![#1a0a12](https://img.shields.io/badge/-%231a0a12-1a0a12?style=flat-square) | ![#9b2761](https://img.shields.io/badge/-%239b2761-9b2761?style=flat-square) |
| **Galaxy** | `/colors galaxy` | ![#d6d2ea](https://img.shields.io/badge/-%23d6d2ea-d6d2ea?style=flat-square) | ![#0e0d17](https://img.shields.io/badge/-%230e0d17-0e0d17?style=flat-square) | ![#44358d](https://img.shields.io/badge/-%2344358d-44358d?style=flat-square) |

</details>

<details>
<summary><b>Nature escapes</b> — 20 themes</summary>

| Theme | Command | Light background | Dark background | Accent |
| --- | --- | --- | --- | --- |
| **Lagoon** | `/colors lagoon` | ![#cfeaed](https://img.shields.io/badge/-%23cfeaed-cfeaed?style=flat-square) | ![#0b1718](https://img.shields.io/badge/-%230b1718-0b1718?style=flat-square) | ![#308991](https://img.shields.io/badge/-%23308991-308991?style=flat-square) |
| **Tropical** | `/colors tropical` | ![#cdeee9](https://img.shields.io/badge/-%23cdeee9-cdeee9?style=flat-square) | ![#0b1917](https://img.shields.io/badge/-%230b1917-0b1917?style=flat-square) | ![#2c9684](https://img.shields.io/badge/-%232c9684-2c9684?style=flat-square) |
| **Zen Garden** | `/colors zen-garden` | ![#dae4d8](https://img.shields.io/badge/-%23dae4d8-dae4d8?style=flat-square) | ![#10140f](https://img.shields.io/badge/-%2310140f-10140f?style=flat-square) | ![#448d35](https://img.shields.io/badge/-%23448d35-448d35?style=flat-square) |
| **Moonlight** | `/colors moonlight` | ![#d9dbe2](https://img.shields.io/badge/-%23d9dbe2-d9dbe2?style=flat-square) | ![#101114](https://img.shields.io/badge/-%23101114-101114?style=flat-square) | ![#35448d](https://img.shields.io/badge/-%2335448d-35448d?style=flat-square) |
| **Sakura** | `/colors sakura` | ![#e7d5dc](https://img.shields.io/badge/-%23e7d5dc-e7d5dc?style=flat-square) | ![#160e11](https://img.shields.io/badge/-%23160e11-160e11?style=flat-square) | ![#8d355a](https://img.shields.io/badge/-%238d355a-8d355a?style=flat-square) |
| **Rainforest** | `/colors rainforest` | ![#d0ebd9](https://img.shields.io/badge/-%23d0ebd9-d0ebd9?style=flat-square) | ![#0c1810](https://img.shields.io/badge/-%230c1810-0c1810?style=flat-square) | ![#358d52](https://img.shields.io/badge/-%23358d52-358d52?style=flat-square) |
| **Glacier** | `/colors glacier` | ![#d5e1e7](https://img.shields.io/badge/-%23d5e1e7-d5e1e7?style=flat-square) | ![#0e1316](https://img.shields.io/badge/-%230e1316-0e1316?style=flat-square) | ![#356f8d](https://img.shields.io/badge/-%23356f8d-356f8d?style=flat-square) |
| **Volcano** | `/colors volcano` | ![#eed2cd](https://img.shields.io/badge/-%23eed2cd-eed2cd?style=flat-square) | ![#190d0b](https://img.shields.io/badge/-%23190d0b-190d0b?style=flat-square) | ![#963a2c](https://img.shields.io/badge/-%23963a2c-963a2c?style=flat-square) |
| **Savanna** | `/colors savanna` | ![#e8e3d3](https://img.shields.io/badge/-%23e8e3d3-e8e3d3?style=flat-square) | ![#16140d](https://img.shields.io/badge/-%2316140d-16140d?style=flat-square) | ![#8d7735](https://img.shields.io/badge/-%238d7735-8d7735?style=flat-square) |
| **Bamboo** | `/colors bamboo` | ![#e0e8d3](https://img.shields.io/badge/-%23e0e8d3-e0e8d3?style=flat-square) | ![#13160d](https://img.shields.io/badge/-%2313160d-13160d?style=flat-square) | ![#688d35](https://img.shields.io/badge/-%23688d35-688d35?style=flat-square) |
| **Tundra** | `/colors tundra` | ![#dae0e1](https://img.shields.io/badge/-%23dae0e1-dae0e1?style=flat-square) | ![#101313](https://img.shields.io/badge/-%23101313-101313?style=flat-square) | ![#357e8d](https://img.shields.io/badge/-%23357e8d-357e8d?style=flat-square) |
| **Coral Reef** | `/colors coral-reef` | ![#edd1cf](https://img.shields.io/badge/-%23edd1cf-edd1cf?style=flat-square) | ![#180c0b](https://img.shields.io/badge/-%23180c0b-180c0b?style=flat-square) | ![#913930](https://img.shields.io/badge/-%23913930-913930?style=flat-square) |
| **Lotus** | `/colors lotus` | ![#e5d6de](https://img.shields.io/badge/-%23e5d6de-e5d6de?style=flat-square) | ![#150f12](https://img.shields.io/badge/-%23150f12-150f12?style=flat-square) | ![#8d3561](https://img.shields.io/badge/-%238d3561-8d3561?style=flat-square) |
| **Pine Forest** | `/colors pine-forest` | ![#d5e7e1](https://img.shields.io/badge/-%23d5e7e1-d5e7e1?style=flat-square) | ![#0e1613](https://img.shields.io/badge/-%230e1613-0e1613?style=flat-square) | ![#358d6f](https://img.shields.io/badge/-%23358d6f-358d6f?style=flat-square) |
| **Meadow** | `/colors meadow` | ![#dcead2](https://img.shields.io/badge/-%23dcead2-dcead2?style=flat-square) | ![#11170d](https://img.shields.io/badge/-%2311170d-11170d?style=flat-square) | ![#5a8d35](https://img.shields.io/badge/-%235a8d35-5a8d35?style=flat-square) |
| **Desert Bloom** | `/colors desert-bloom` | ![#e7d5d8](https://img.shields.io/badge/-%23e7d5d8-e7d5d8?style=flat-square) | ![#160e0f](https://img.shields.io/badge/-%23160e0f-160e0f?style=flat-square) | ![#8d3544](https://img.shields.io/badge/-%238d3544-8d3544?style=flat-square) |
| **Northern Lights** | `/colors northern-lights` | ![#cdeede](https://img.shields.io/badge/-%23cdeede-cdeede?style=flat-square) | ![#0b1912](https://img.shields.io/badge/-%230b1912-0b1912?style=flat-square) | ![#2c9661](https://img.shields.io/badge/-%232c9661-2c9661?style=flat-square) |
| **Ocean Breeze** | `/colors ocean-breeze` | ![#d2e6ea](https://img.shields.io/badge/-%23d2e6ea-d2e6ea?style=flat-square) | ![#0d1517](https://img.shields.io/badge/-%230d1517-0d1517?style=flat-square) | ![#357e8d](https://img.shields.io/badge/-%23357e8d-357e8d?style=flat-square) |
| **Wildflower** | `/colors wildflower` | ![#e3d3e8](https://img.shields.io/badge/-%23e3d3e8-e3d3e8?style=flat-square) | ![#140d16](https://img.shields.io/badge/-%23140d16-140d16?style=flat-square) | ![#77358d](https://img.shields.io/badge/-%2377358d-77358d?style=flat-square) |
| **Autumn Leaf** | `/colors autumn-leaf` | ![#eddbcf](https://img.shields.io/badge/-%23eddbcf-eddbcf?style=flat-square) | ![#18110b](https://img.shields.io/badge/-%2318110b-18110b?style=flat-square) | ![#915930](https://img.shields.io/badge/-%23915930-915930?style=flat-square) |

</details>

<details>
<summary><b>Gemstones</b> — 20 themes</summary>

| Theme | Command | Light background | Dark background | Accent |
| --- | --- | --- | --- | --- |
| **Amethyst** | `/colors amethyst` | ![#e0cfed](https://img.shields.io/badge/-%23e0cfed-e0cfed?style=flat-square) | ![#130b18](https://img.shields.io/badge/-%23130b18-130b18?style=flat-square) | ![#693091](https://img.shields.io/badge/-%23693091-693091?style=flat-square) |
| **Sapphire** | `/colors sapphire` | ![#ccd5f0](https://img.shields.io/badge/-%23ccd5f0-ccd5f0?style=flat-square) | ![#0a0e1a](https://img.shields.io/badge/-%230a0e1a-0a0e1a?style=flat-square) | ![#27449b](https://img.shields.io/badge/-%2327449b-27449b?style=flat-square) |
| **Emerald** | `/colors emerald` | ![#cdeede](https://img.shields.io/badge/-%23cdeede-cdeede?style=flat-square) | ![#0b1912](https://img.shields.io/badge/-%230b1912-0b1912?style=flat-square) | ![#2c9661](https://img.shields.io/badge/-%232c9661-2c9661?style=flat-square) |
| **Garnet** | `/colors garnet` | ![#edcfd4](https://img.shields.io/badge/-%23edcfd4-edcfd4?style=flat-square) | ![#180b0e](https://img.shields.io/badge/-%23180b0e-180b0e?style=flat-square) | ![#913041](https://img.shields.io/badge/-%23913041-913041?style=flat-square) |
| **Topaz** | `/colors topaz` | ![#f1e4ca](https://img.shields.io/badge/-%23f1e4ca-f1e4ca?style=flat-square) | ![#1a1509](https://img.shields.io/badge/-%231a1509-1a1509?style=flat-square) | ![#a07622](https://img.shields.io/badge/-%23a07622-a07622?style=flat-square) |
| **Opal** | `/colors opal` | ![#d6e3e5](https://img.shields.io/badge/-%23d6e3e5-d6e3e5?style=flat-square) | ![#0f1415](https://img.shields.io/badge/-%230f1415-0f1415?style=flat-square) | ![#357e8d](https://img.shields.io/badge/-%23357e8d-357e8d?style=flat-square) |
| **Onyx** | `/colors onyx` | ![#dcdde0](https://img.shields.io/badge/-%23dcdde0-dcdde0?style=flat-square) | ![#111113](https://img.shields.io/badge/-%23111113-111113?style=flat-square) | ![#35448d](https://img.shields.io/badge/-%2335448d-35448d?style=flat-square) |
| **Pearl** | `/colors pearl` | ![#e0dfdb](https://img.shields.io/badge/-%23e0dfdb-e0dfdb?style=flat-square) | ![#131211](https://img.shields.io/badge/-%23131211-131211?style=flat-square) | ![#8d6f35](https://img.shields.io/badge/-%238d6f35-8d6f35?style=flat-square) |
| **Citrine** | `/colors citrine` | ![#f3ecc9](https://img.shields.io/badge/-%23f3ecc9-f3ecc9?style=flat-square) | ![#1b1809](https://img.shields.io/badge/-%231b1809-1b1809?style=flat-square) | ![#a58e1d](https://img.shields.io/badge/-%23a58e1d-a58e1d?style=flat-square) |
| **Aquamarine** | `/colors aquamarine` | ![#d0ebeb](https://img.shields.io/badge/-%23d0ebeb-d0ebeb?style=flat-square) | ![#0c1818](https://img.shields.io/badge/-%230c1818-0c1818?style=flat-square) | ![#358d8d](https://img.shields.io/badge/-%23358d8d-358d8d?style=flat-square) |
| **Tanzanite** | `/colors tanzanite` | ![#d6cdee](https://img.shields.io/badge/-%23d6cdee-d6cdee?style=flat-square) | ![#0e0b19](https://img.shields.io/badge/-%230e0b19-0e0b19?style=flat-square) | ![#462c96](https://img.shields.io/badge/-%23462c96-462c96?style=flat-square) |
| **Malachite** | `/colors malachite` | ![#cfede0](https://img.shields.io/badge/-%23cfede0-cfede0?style=flat-square) | ![#0b1813](https://img.shields.io/badge/-%230b1813-0b1813?style=flat-square) | ![#309169](https://img.shields.io/badge/-%23309169-309169?style=flat-square) |
| **Moonstone** | `/colors moonstone` | ![#dadde1](https://img.shields.io/badge/-%23dadde1-dadde1?style=flat-square) | ![#101213](https://img.shields.io/badge/-%23101213-101213?style=flat-square) | ![#355a8d](https://img.shields.io/badge/-%23355a8d-355a8d?style=flat-square) |
| **Peridot** | `/colors peridot` | ![#e1eecd](https://img.shields.io/badge/-%23e1eecd-e1eecd?style=flat-square) | ![#13190b](https://img.shields.io/badge/-%2313190b-13190b?style=flat-square) | ![#6a962c](https://img.shields.io/badge/-%236a962c-6a962c?style=flat-square) |
| **Tourmaline** | `/colors tourmaline` | ![#ebd0de](https://img.shields.io/badge/-%23ebd0de-ebd0de?style=flat-square) | ![#180c12](https://img.shields.io/badge/-%23180c12-180c12?style=flat-square) | ![#8d3561](https://img.shields.io/badge/-%238d3561-8d3561?style=flat-square) |
| **Lapis** | `/colors lapis` | ![#ccd2f0](https://img.shields.io/badge/-%23ccd2f0-ccd2f0?style=flat-square) | ![#0a0d1a](https://img.shields.io/badge/-%230a0d1a-0a0d1a?style=flat-square) | ![#273a9b](https://img.shields.io/badge/-%23273a9b-273a9b?style=flat-square) |
| **Black Opal** | `/colors black-opal` | ![#dcd8e4](https://img.shields.io/badge/-%23dcd8e4-dcd8e4?style=flat-square) | ![#110f14](https://img.shields.io/badge/-%23110f14-110f14?style=flat-square) | ![#52358d](https://img.shields.io/badge/-%2352358d-52358d?style=flat-square) |
| **Rose Gold** | `/colors rose-gold` | ![#e8d9d3](https://img.shields.io/badge/-%23e8d9d3-e8d9d3?style=flat-square) | ![#16100d](https://img.shields.io/badge/-%2316100d-16100d?style=flat-square) | ![#8d4b35](https://img.shields.io/badge/-%238d4b35-8d4b35?style=flat-square) |
| **Tigers Eye** | `/colors tigers-eye` | ![#eedfcd](https://img.shields.io/badge/-%23eedfcd-eedfcd?style=flat-square) | ![#19120b](https://img.shields.io/badge/-%2319120b-19120b?style=flat-square) | ![#96642c](https://img.shields.io/badge/-%2396642c-96642c?style=flat-square) |
| **Quartz** | `/colors quartz` | ![#e1dbe1](https://img.shields.io/badge/-%23e1dbe1-e1dbe1?style=flat-square) | ![#131113](https://img.shields.io/badge/-%23131113-131113?style=flat-square) | ![#8d358d](https://img.shields.io/badge/-%238d358d-8d358d?style=flat-square) |

</details>

<details>
<summary><b>Sweets & drinks</b> — 20 themes</summary>

| Theme | Command | Light background | Dark background | Accent |
| --- | --- | --- | --- | --- |
| **Bubble Tea** | `/colors bubble-tea` | ![#e8ded3](https://img.shields.io/badge/-%23e8ded3-e8ded3?style=flat-square) | ![#16120d](https://img.shields.io/badge/-%2316120d-16120d?style=flat-square) | ![#8d6135](https://img.shields.io/badge/-%238d6135-8d6135?style=flat-square) |
| **Macaron** | `/colors macaron` | ![#ead2de](https://img.shields.io/badge/-%23ead2de-ead2de?style=flat-square) | ![#170d12](https://img.shields.io/badge/-%23170d12-170d12?style=flat-square) | ![#8d3561](https://img.shields.io/badge/-%238d3561-8d3561?style=flat-square) |
| **Blueberry Muffin** | `/colors blueberry-muffin` | ![#d3d3e8](https://img.shields.io/badge/-%23d3d3e8-d3d3e8?style=flat-square) | ![#0d0d16](https://img.shields.io/badge/-%230d0d16-0d0d16?style=flat-square) | ![#35358d](https://img.shields.io/badge/-%2335358d-35358d?style=flat-square) |
| **Mint Chip** | `/colors mint-chip` | ![#d2eae0](https://img.shields.io/badge/-%23d2eae0-d2eae0?style=flat-square) | ![#0d1713](https://img.shields.io/badge/-%230d1713-0d1713?style=flat-square) | ![#358d68](https://img.shields.io/badge/-%23358d68-358d68?style=flat-square) |
| **Cherry Cola** | `/colors cherry-cola` | ![#ebd0d3](https://img.shields.io/badge/-%23ebd0d3-ebd0d3?style=flat-square) | ![#180c0d](https://img.shields.io/badge/-%23180c0d-180c0d?style=flat-square) | ![#8d353d](https://img.shields.io/badge/-%238d353d-8d353d?style=flat-square) |
| **Iced Latte** | `/colors iced-latte` | ![#e5ded6](https://img.shields.io/badge/-%23e5ded6-e5ded6?style=flat-square) | ![#15120f](https://img.shields.io/badge/-%2315120f-15120f?style=flat-square) | ![#8d6135](https://img.shields.io/badge/-%238d6135-8d6135?style=flat-square) |
| **Lavender Honey** | `/colors lavender-honey` | ![#ded5e7](https://img.shields.io/badge/-%23ded5e7-ded5e7?style=flat-square) | ![#120e16](https://img.shields.io/badge/-%23120e16-120e16?style=flat-square) | ![#61358d](https://img.shields.io/badge/-%2361358d-61358d?style=flat-square) |
| **Mango Lassi** | `/colors mango-lassi` | ![#f1e6ca](https://img.shields.io/badge/-%23f1e6ca-f1e6ca?style=flat-square) | ![#1a1509](https://img.shields.io/badge/-%231a1509-1a1509?style=flat-square) | ![#a07a22](https://img.shields.io/badge/-%23a07a22-a07a22?style=flat-square) |
| **Taro** | `/colors taro` | ![#e1d5e7](https://img.shields.io/badge/-%23e1d5e7-e1d5e7?style=flat-square) | ![#130e16](https://img.shields.io/badge/-%23130e16-130e16?style=flat-square) | ![#6f358d](https://img.shields.io/badge/-%236f358d-6f358d?style=flat-square) |
| **Cookie Dough** | `/colors cookie-dough` | ![#eae0d2](https://img.shields.io/badge/-%23eae0d2-eae0d2?style=flat-square) | ![#17130d](https://img.shields.io/badge/-%2317130d-17130d?style=flat-square) | ![#8d6835](https://img.shields.io/badge/-%238d6835-8d6835?style=flat-square) |
| **Raspberry Sorbet** | `/colors raspberry-sorbet` | ![#eecdd8](https://img.shields.io/badge/-%23eecdd8-eecdd8?style=flat-square) | ![#190b0f](https://img.shields.io/badge/-%23190b0f-190b0f?style=flat-square) | ![#962c4f](https://img.shields.io/badge/-%23962c4f-962c4f?style=flat-square) |
| **Pina Colada** | `/colors pina-colada` | ![#ebe9d0](https://img.shields.io/badge/-%23ebe9d0-ebe9d0?style=flat-square) | ![#18170c](https://img.shields.io/badge/-%2318170c-18170c?style=flat-square) | ![#8d8535](https://img.shields.io/badge/-%238d8535-8d8535?style=flat-square) |
| **Earl Grey** | `/colors earl-grey` | ![#dbdde1](https://img.shields.io/badge/-%23dbdde1-dbdde1?style=flat-square) | ![#111113](https://img.shields.io/badge/-%23111113-111113?style=flat-square) | ![#35528d](https://img.shields.io/badge/-%2335528d-35528d?style=flat-square) |
| **Hot Cocoa** | `/colors hot-cocoa` | ![#e8dad3](https://img.shields.io/badge/-%23e8dad3-e8dad3?style=flat-square) | ![#16100d](https://img.shields.io/badge/-%2316100d-16100d?style=flat-square) | ![#8d4f35](https://img.shields.io/badge/-%238d4f35-8d4f35?style=flat-square) |
| **Key Lime** | `/colors key-lime` | ![#e5edcf](https://img.shields.io/badge/-%23e5edcf-e5edcf?style=flat-square) | ![#15180b](https://img.shields.io/badge/-%2315180b-15180b?style=flat-square) | ![#799130](https://img.shields.io/badge/-%23799130-799130?style=flat-square) |
| **Tiramisu** | `/colors tiramisu` | ![#e5ddd6](https://img.shields.io/badge/-%23e5ddd6-e5ddd6?style=flat-square) | ![#15120f](https://img.shields.io/badge/-%2315120f-15120f?style=flat-square) | ![#8d5e35](https://img.shields.io/badge/-%238d5e35-8d5e35?style=flat-square) |
| **Blue Raspberry** | `/colors blue-raspberry` | ![#cae4f1](https://img.shields.io/badge/-%23cae4f1-cae4f1?style=flat-square) | ![#09151a](https://img.shields.io/badge/-%2309151a-09151a?style=flat-square) | ![#2276a0](https://img.shields.io/badge/-%232276a0-2276a0?style=flat-square) |
| **Peach Tea** | `/colors peach-tea` | ![#eddbcf](https://img.shields.io/badge/-%23eddbcf-eddbcf?style=flat-square) | ![#18110b](https://img.shields.io/badge/-%2318110b-18110b?style=flat-square) | ![#915930](https://img.shields.io/badge/-%23915930-915930?style=flat-square) |
| **Grape Soda** | `/colors grape-soda` | ![#e5cfed](https://img.shields.io/badge/-%23e5cfed-e5cfed?style=flat-square) | ![#150b18](https://img.shields.io/badge/-%23150b18-150b18?style=flat-square) | ![#793091](https://img.shields.io/badge/-%23793091-793091?style=flat-square) |
| **Yuzu** | `/colors yuzu` | ![#f1f1ca](https://img.shields.io/badge/-%23f1f1ca-f1f1ca?style=flat-square) | ![#1a1a09](https://img.shields.io/badge/-%231a1a09-1a1a09?style=flat-square) | ![#a0a022](https://img.shields.io/badge/-%23a0a022-a0a022?style=flat-square) |

</details>

<details>
<summary><b>Places & journeys</b> — 20 themes</summary>

| Theme | Command | Light background | Dark background | Accent |
| --- | --- | --- | --- | --- |
| **Santorini** | `/colors santorini` | ![#cddeee](https://img.shields.io/badge/-%23cddeee-cddeee?style=flat-square) | ![#0b1219](https://img.shields.io/badge/-%230b1219-0b1219?style=flat-square) | ![#2c6196](https://img.shields.io/badge/-%232c6196-2c6196?style=flat-square) |
| **Kyoto** | `/colors kyoto` | ![#e8d3d7](https://img.shields.io/badge/-%23e8d3d7-e8d3d7?style=flat-square) | ![#160d0f](https://img.shields.io/badge/-%23160d0f-160d0f?style=flat-square) | ![#8d3544](https://img.shields.io/badge/-%238d3544-8d3544?style=flat-square) |
| **Iceland** | `/colors iceland` | ![#d8e1e4](https://img.shields.io/badge/-%23d8e1e4-d8e1e4?style=flat-square) | ![#0f1314](https://img.shields.io/badge/-%230f1314-0f1314?style=flat-square) | ![#35778d](https://img.shields.io/badge/-%2335778d-35778d?style=flat-square) |
| **Sahara** | `/colors sahara` | ![#ebe0d0](https://img.shields.io/badge/-%23ebe0d0-ebe0d0?style=flat-square) | ![#18130c](https://img.shields.io/badge/-%2318130c-18130c?style=flat-square) | ![#8d6835](https://img.shields.io/badge/-%238d6835-8d6835?style=flat-square) |
| **Amazon** | `/colors amazon` | ![#d0ebd7](https://img.shields.io/badge/-%23d0ebd7-d0ebd7?style=flat-square) | ![#0c180f](https://img.shields.io/badge/-%230c180f-0c180f?style=flat-square) | ![#358d4b](https://img.shields.io/badge/-%23358d4b-358d4b?style=flat-square) |
| **Paris Dusk** | `/colors paris-dusk` | ![#dbd5e7](https://img.shields.io/badge/-%23dbd5e7-dbd5e7?style=flat-square) | ![#110e16](https://img.shields.io/badge/-%23110e16-110e16?style=flat-square) | ![#52358d](https://img.shields.io/badge/-%2352358d-52358d?style=flat-square) |
| **Marrakech** | `/colors marrakech` | ![#edd6cf](https://img.shields.io/badge/-%23edd6cf-edd6cf?style=flat-square) | ![#180f0b](https://img.shields.io/badge/-%23180f0b-180f0b?style=flat-square) | ![#914930](https://img.shields.io/badge/-%23914930-914930?style=flat-square) |
| **Bali** | `/colors bali` | ![#d2eae2](https://img.shields.io/badge/-%23d2eae2-d2eae2?style=flat-square) | ![#0d1714](https://img.shields.io/badge/-%230d1714-0d1714?style=flat-square) | ![#358d6f](https://img.shields.io/badge/-%23358d6f-358d6f?style=flat-square) |
| **Seoul Night** | `/colors seoul-night` | ![#e2d0eb](https://img.shields.io/badge/-%23e2d0eb-e2d0eb?style=flat-square) | ![#140c18](https://img.shields.io/badge/-%23140c18-140c18?style=flat-square) | ![#6f358d](https://img.shields.io/badge/-%236f358d-6f358d?style=flat-square) |
| **Havana** | `/colors havana` | ![#edd9cf](https://img.shields.io/badge/-%23edd9cf-edd9cf?style=flat-square) | ![#18100b](https://img.shields.io/badge/-%2318100b-18100b?style=flat-square) | ![#915130](https://img.shields.io/badge/-%23915130-915130?style=flat-square) |
| **Fjord** | `/colors fjord` | ![#d5dfe7](https://img.shields.io/badge/-%23d5dfe7-d5dfe7?style=flat-square) | ![#0e1216](https://img.shields.io/badge/-%230e1216-0e1216?style=flat-square) | ![#35688d](https://img.shields.io/badge/-%2335688d-35688d?style=flat-square) |
| **Tuscany** | `/colors tuscany` | ![#eae2d2](https://img.shields.io/badge/-%23eae2d2-eae2d2?style=flat-square) | ![#17140d](https://img.shields.io/badge/-%2317140d-17140d?style=flat-square) | ![#8d6f35](https://img.shields.io/badge/-%238d6f35-8d6f35?style=flat-square) |
| **Maldives** | `/colors maldives` | ![#ccf0f0](https://img.shields.io/badge/-%23ccf0f0-ccf0f0?style=flat-square) | ![#0a1a1a](https://img.shields.io/badge/-%230a1a1a-0a1a1a?style=flat-square) | ![#279b9b](https://img.shields.io/badge/-%23279b9b-279b9b?style=flat-square) |
| **Patagonia** | `/colors patagonia` | ![#d9dfe2](https://img.shields.io/badge/-%23d9dfe2-d9dfe2?style=flat-square) | ![#101214](https://img.shields.io/badge/-%23101214-101214?style=flat-square) | ![#356f8d](https://img.shields.io/badge/-%23356f8d-356f8d?style=flat-square) |
| **Cairo** | `/colors cairo` | ![#ebe3d0](https://img.shields.io/badge/-%23ebe3d0-ebe3d0?style=flat-square) | ![#18140c](https://img.shields.io/badge/-%2318140c-18140c?style=flat-square) | ![#8d7235](https://img.shields.io/badge/-%238d7235-8d7235?style=flat-square) |
| **Swiss Alps** | `/colors swiss-alps` | ![#d9dee2](https://img.shields.io/badge/-%23d9dee2-d9dee2?style=flat-square) | ![#101214](https://img.shields.io/badge/-%23101214-101214?style=flat-square) | ![#35618d](https://img.shields.io/badge/-%2335618d-35618d?style=flat-square) |
| **Mumbai Monsoon** | `/colors mumbai-monsoon` | ![#d5e2e7](https://img.shields.io/badge/-%23d5e2e7-d5e2e7?style=flat-square) | ![#0e1416](https://img.shields.io/badge/-%230e1416-0e1416?style=flat-square) | ![#35778d](https://img.shields.io/badge/-%2335778d-35778d?style=flat-square) |
| **Jaipur** | `/colors jaipur` | ![#ebd0d7](https://img.shields.io/badge/-%23ebd0d7-ebd0d7?style=flat-square) | ![#180c0f](https://img.shields.io/badge/-%23180c0f-180c0f?style=flat-square) | ![#8d354b](https://img.shields.io/badge/-%238d354b-8d354b?style=flat-square) |
| **Kerala** | `/colors kerala` | ![#d0ebd5](https://img.shields.io/badge/-%23d0ebd5-d0ebd5?style=flat-square) | ![#0c180e](https://img.shields.io/badge/-%230c180e-0c180e?style=flat-square) | ![#358d44](https://img.shields.io/badge/-%23358d44-358d44?style=flat-square) |
| **Goa** | `/colors goa` | ![#cfedea](https://img.shields.io/badge/-%23cfedea-cfedea?style=flat-square) | ![#0b1817](https://img.shields.io/badge/-%230b1817-0b1817?style=flat-square) | ![#309189](https://img.shields.io/badge/-%23309189-309189?style=flat-square) |

</details>

<details>
<summary><b>Motion vibes</b> — 29 themes</summary>

| Theme | Command | Light background | Dark background | Accent |
| --- | --- | --- | --- | --- |
| **Psych Currents** | `/colors psych-currents` | ![#e6cdee](https://img.shields.io/badge/-%23e6cdee-e6cdee?style=flat-square) | ![#150b19](https://img.shields.io/badge/-%23150b19-150b19?style=flat-square) | ![#7c2c96](https://img.shields.io/badge/-%237c2c96-7c2c96?style=flat-square) |
| **Shooting Star** | `/colors shooting-star` | ![#f0ccf0](https://img.shields.io/badge/-%23f0ccf0-f0ccf0?style=flat-square) | ![#1a0a1a](https://img.shields.io/badge/-%231a0a1a-1a0a1a?style=flat-square) | ![#9b279b](https://img.shields.io/badge/-%239b279b-9b279b?style=flat-square) |
| **Night Drive** | `/colors night-drive` | ![#dbcdee](https://img.shields.io/badge/-%23dbcdee-dbcdee?style=flat-square) | ![#110b19](https://img.shields.io/badge/-%23110b19-110b19?style=flat-square) | ![#582c96](https://img.shields.io/badge/-%23582c96-582c96?style=flat-square) |
| **Starlight Express** | `/colors starlight-express` | ![#cfdbed](https://img.shields.io/badge/-%23cfdbed-cfdbed?style=flat-square) | ![#0b1118](https://img.shields.io/badge/-%230b1118-0b1118?style=flat-square) | ![#305991](https://img.shields.io/badge/-%23305991-305991?style=flat-square) |
| **Acid Wave** | `/colors acid-wave` | ![#e8f3c9](https://img.shields.io/badge/-%23e8f3c9-e8f3c9?style=flat-square) | ![#161b09](https://img.shields.io/badge/-%23161b09-161b09?style=flat-square) | ![#83a51d](https://img.shields.io/badge/-%2383a51d-83a51d?style=flat-square) |
| **Dream Pop** | `/colors dream-pop` | ![#ead2de](https://img.shields.io/badge/-%23ead2de-ead2de?style=flat-square) | ![#170d12](https://img.shields.io/badge/-%23170d12-170d12?style=flat-square) | ![#8d3561](https://img.shields.io/badge/-%238d3561-8d3561?style=flat-square) |
| **Kaleidoscope** | `/colors kaleidoscope` | ![#f0d8cc](https://img.shields.io/badge/-%23f0d8cc-f0d8cc?style=flat-square) | ![#1a0f0a](https://img.shields.io/badge/-%231a0f0a-1a0f0a?style=flat-square) | ![#9b4e27](https://img.shields.io/badge/-%239b4e27-9b4e27?style=flat-square) |
| **Lava Lounge** | `/colors lava-lounge` | ![#f0d5cc](https://img.shields.io/badge/-%23f0d5cc-f0d5cc?style=flat-square) | ![#1a0e0a](https://img.shields.io/badge/-%231a0e0a-1a0e0a?style=flat-square) | ![#9b4427](https://img.shields.io/badge/-%239b4427-9b4427?style=flat-square) |
| **Lava Lime** | `/colors lava-lime` | ![#deeecd](https://img.shields.io/badge/-%23deeecd-deeecd?style=flat-square) | ![#12190b](https://img.shields.io/badge/-%2312190b-12190b?style=flat-square) | ![#61962c](https://img.shields.io/badge/-%2361962c-61962c?style=flat-square) |
| **Chill Wave** | `/colors chill-wave` | ![#d0ebe9](https://img.shields.io/badge/-%23d0ebe9-d0ebe9?style=flat-square) | ![#0c1817](https://img.shields.io/badge/-%230c1817-0c1817?style=flat-square) | ![#358d85](https://img.shields.io/badge/-%23358d85-358d85?style=flat-square) |
| **Mesh Candy** | `/colors mesh-candy` | ![#ebd0e2](https://img.shields.io/badge/-%23ebd0e2-ebd0e2?style=flat-square) | ![#180c14](https://img.shields.io/badge/-%23180c14-180c14?style=flat-square) | ![#8d356f](https://img.shields.io/badge/-%238d356f-8d356f?style=flat-square) |
| **Mesh Ocean** | `/colors mesh-ocean` | ![#cfe3ed](https://img.shields.io/badge/-%23cfe3ed-cfe3ed?style=flat-square) | ![#0b1418](https://img.shields.io/badge/-%230b1418-0b1418?style=flat-square) | ![#307191](https://img.shields.io/badge/-%23307191-307191?style=flat-square) |
| **Mesh Sunset** | `/colors mesh-sunset` | ![#eedbcd](https://img.shields.io/badge/-%23eedbcd-eedbcd?style=flat-square) | ![#19110b](https://img.shields.io/badge/-%2319110b-19110b?style=flat-square) | ![#96582c](https://img.shields.io/badge/-%2396582c-96582c?style=flat-square) |
| **Glow Up** | `/colors glow-up` | ![#f1e8ca](https://img.shields.io/badge/-%23f1e8ca-f1e8ca?style=flat-square) | ![#1a1609](https://img.shields.io/badge/-%231a1609-1a1609?style=flat-square) | ![#a08022](https://img.shields.io/badge/-%23a08022-a08022?style=flat-square) |
| **Holographic** | `/colors holographic` | ![#dad3e8](https://img.shields.io/badge/-%23dad3e8-dad3e8?style=flat-square) | ![#100d16](https://img.shields.io/badge/-%23100d16-100d16?style=flat-square) | ![#52358d](https://img.shields.io/badge/-%2352358d-52358d?style=flat-square) |
| **Hyperspace** | `/colors hyperspace` | ![#cfd4ed](https://img.shields.io/badge/-%23cfd4ed-cfd4ed?style=flat-square) | ![#0b0e18](https://img.shields.io/badge/-%230b0e18-0b0e18?style=flat-square) | ![#304191](https://img.shields.io/badge/-%23304191-304191?style=flat-square) |
| **Warp Drive** | `/colors warp-drive` | ![#cceaf0](https://img.shields.io/badge/-%23cceaf0-cceaf0?style=flat-square) | ![#0a171a](https://img.shields.io/badge/-%230a171a-0a171a?style=flat-square) | ![#27889b](https://img.shields.io/badge/-%2327889b-27889b?style=flat-square) |
| **City Bokeh** | `/colors city-bokeh` | ![#ede3cf](https://img.shields.io/badge/-%23ede3cf-ede3cf?style=flat-square) | ![#18140b](https://img.shields.io/badge/-%2318140b-18140b?style=flat-square) | ![#917130](https://img.shields.io/badge/-%23917130-917130?style=flat-square) |
| **Fairy Lights** | `/colors fairy-lights` | ![#ebe7d0](https://img.shields.io/badge/-%23ebe7d0-ebe7d0?style=flat-square) | ![#18160c](https://img.shields.io/badge/-%2318160c-18160c?style=flat-square) | ![#8d7e35](https://img.shields.io/badge/-%238d7e35-8d7e35?style=flat-square) |
| **Midnight Jazz** | `/colors midnight-jazz` | ![#d2d8ea](https://img.shields.io/badge/-%23d2d8ea-d2d8ea?style=flat-square) | ![#0d0f17](https://img.shields.io/badge/-%230d0f17-0d0f17?style=flat-square) | ![#354b8d](https://img.shields.io/badge/-%23354b8d-354b8d?style=flat-square) |
| **Solar System** | `/colors solar-system` | ![#eae0d2](https://img.shields.io/badge/-%23eae0d2-eae0d2?style=flat-square) | ![#17130d](https://img.shields.io/badge/-%2317130d-17130d?style=flat-square) | ![#8d6835](https://img.shields.io/badge/-%238d6835-8d6835?style=flat-square) |
| **Cosmic Orbit** | `/colors cosmic-orbit` | ![#d9d0eb](https://img.shields.io/badge/-%23d9d0eb-d9d0eb?style=flat-square) | ![#100c18](https://img.shields.io/badge/-%23100c18-100c18?style=flat-square) | ![#52358d](https://img.shields.io/badge/-%2352358d-52358d?style=flat-square) |
| **Bass Drop** | `/colors bass-drop` | ![#eaccf0](https://img.shields.io/badge/-%23eaccf0-eaccf0?style=flat-square) | ![#170a1a](https://img.shields.io/badge/-%23170a1a-170a1a?style=flat-square) | ![#88279b](https://img.shields.io/badge/-%2388279b-88279b?style=flat-square) |
| **Lofi Beats** | `/colors lofi-beats` | ![#d8d5e7](https://img.shields.io/badge/-%23d8d5e7-d8d5e7?style=flat-square) | ![#0f0e16](https://img.shields.io/badge/-%230f0e16-0f0e16?style=flat-square) | ![#44358d](https://img.shields.io/badge/-%2344358d-44358d?style=flat-square) |
| **Rave** | `/colors rave` | ![#f3c9e5](https://img.shields.io/badge/-%23f3c9e5-f3c9e5?style=flat-square) | ![#1b0915](https://img.shields.io/badge/-%231b0915-1b0915?style=flat-square) | ![#a51d78](https://img.shields.io/badge/-%23a51d78-a51d78?style=flat-square) |
| **Raindrop Ripples** | `/colors raindrop-ripples` | ![#d3e1e8](https://img.shields.io/badge/-%23d3e1e8-d3e1e8?style=flat-square) | ![#0d1316](https://img.shields.io/badge/-%230d1316-0d1316?style=flat-square) | ![#356f8d](https://img.shields.io/badge/-%23356f8d-356f8d?style=flat-square) |
| **Koi Pond** | `/colors koi-pond` | ![#eddbcf](https://img.shields.io/badge/-%23eddbcf-eddbcf?style=flat-square) | ![#18110b](https://img.shields.io/badge/-%2318110b-18110b?style=flat-square) | ![#915930](https://img.shields.io/badge/-%23915930-915930?style=flat-square) |
| **Topo Map** | `/colors topo-map` | ![#dbe7d5](https://img.shields.io/badge/-%23dbe7d5-dbe7d5?style=flat-square) | ![#11160e](https://img.shields.io/badge/-%2311160e-11160e?style=flat-square) | ![#528d35](https://img.shields.io/badge/-%23528d35-528d35?style=flat-square) |
| **Desert Dunes** | `/colors desert-dunes` | ![#eae0d2](https://img.shields.io/badge/-%23eae0d2-eae0d2?style=flat-square) | ![#17130d](https://img.shields.io/badge/-%2317130d-17130d?style=flat-square) | ![#8d6835](https://img.shields.io/badge/-%238d6835-8d6835?style=flat-square) |

</details>


## ⚠️ Limitations

Good to know before you install:

- **Claude Code only.** These are Claude Code plugins. They don't change the normal Claude chat on claude.ai or the Chat tab of the desktop app, which only offer Light, Dark and System.
- **Themes, scenes and the mouse glow need the Claude desktop app.** The terminal and the VS Code / JetBrains extensions don't draw themes or backgrounds. The ambient bar, spinners, prompt colours, tool cards, badges, sounds and stats work in the terminal too.
- **Phones:** the Claude mobile app can't install plugins. It shows the theme only when you open a session running on a computer that has the plugin.
- **A recent Claude Code is required.** These use Claude Code's plugin hooks, so update Claude Code if a command doesn't appear.
- **New sessions only.** After installing or updating, start a new session. Already-open sessions don't pick up the plugin.
- **Install one way, not both.** Installing `olive-theme` and a separate plugin together shows that feature twice.
- **Settings are per plugin.** The separate plugins each remember their own settings; they don't share them with `olive-theme`.
- **The mouse glow is desktop-app only**, and scenes stand still if your Mac has **Reduce Motion** turned on.
- **Animated scenes use a little GPU and battery.** Turn them off any time with `/colors scene off`.
- **Some parts keep Claude's own look:** permission prompts, and the desktop app's step descriptions in the spinner (it adds the icon instead).
- **Code highlighting styles** depend on what the app offers. If it doesn't know one, it keeps its usual code colours.
- **The theme picker and stats panels** open in the desktop app or a fullscreen terminal.
- **Sounds and voice** play on macOS. Linux and Windows terminals stay silent, and a voice name must be installed on your Mac.
- **Auto themes** follow your computer's clock; seasons follow the northern hemisphere.
- **Session stats** start fresh in each session.
- **Make a theme from a colour** in the right-click menu needs `olive-theme` or `color-themes` installed too.
- **Plugin APIs can change.** These use Claude Code's newer plugin features, so a future Claude Code update may need a plugin update.

---

<p align="center">
  Made with 💚 by <a href="https://github.com/notchkillerAI">Arpan Bhattacharya</a>
</p>
