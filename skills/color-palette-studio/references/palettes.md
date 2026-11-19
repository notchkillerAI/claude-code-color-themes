# Ready-made palettes

For agents that can't run scripts: copy the palette for a mood or theme straight into the user's project.
Every text color here already passes WCAG contrast (7:1 body text, 4.5:1 the rest) on its background.
Each block is CSS: light by default, dark under `prefers-color-scheme: dark`. For Tailwind, SCSS or JSON, convert the same values.

# Moods

## Mood: calm

```css
:root {
  --color-background: #f6f8f8;
  --color-surface: #ebeeef;
  --color-surface-2: #dfe4e6;
  --color-border: #c1c9cd;
  --color-text: #1c1f21;
  --color-text-muted: #5a6368;
  --color-accent: #337799;
  --color-on-accent: #ffffff;
  --color-success: #268245;
  --color-warning: #9c670d;
  --color-danger: #ad281f;
  --color-info: #1f72ad;
}
@media (prefers-color-scheme: dark) {
  :root {
    --color-background: #111517;
    --color-surface: #1a2023;
    --color-surface-2: #232b2f;
    --color-border: #3c4549;
    --color-text: #e9ebec;
    --color-text-muted: #adb4b8;
    --color-accent: #7db7d4;
    --color-on-accent: #111111;
    --color-success: #71d692;
    --color-warning: #f1b855;
    --color-danger: #e36c63;
    --color-info: #63aee3;
  }
}
```

## Mood: energetic

```css
:root {
  --color-background: #faf6f5;
  --color-surface: #f3eae7;
  --color-surface-2: #ecdeda;
  --color-border: #d5c0b8;
  --color-text: #251c19;
  --color-text-muted: #74574e;
  --color-accent: #b14825;
  --color-on-accent: #ffffff;
  --color-success: #257e43;
  --color-warning: #97640c;
  --color-danger: #ad281f;
  --color-info: #1f72ad;
}
@media (prefers-color-scheme: dark) {
  :root {
    --color-background: #1c100c;
    --color-surface: #2b1913;
    --color-surface-2: #392119;
    --color-border: #543a31;
    --color-text: #efe9e7;
    --color-text-muted: #c1aba4;
    --color-accent: #e18c70;
    --color-on-accent: #111111;
    --color-success: #71d692;
    --color-warning: #f1b855;
    --color-danger: #e36c63;
    --color-info: #63aee3;
  }
}
```

## Mood: luxury

```css
:root {
  --color-background: #f9f8f6;
  --color-surface: #f1efea;
  --color-surface-2: #e9e6dd;
  --color-border: #d0cbbe;
  --color-text: #22201b;
  --color-text-muted: #6d6755;
  --color-accent: #86702d;
  --color-on-accent: #ffffff;
  --color-success: #268245;
  --color-warning: #9c670d;
  --color-danger: #ad281f;
  --color-info: #1f72ad;
}
@media (prefers-color-scheme: dark) {
  :root {
    --color-background: #191710;
    --color-surface: #262217;
    --color-surface-2: #332e1f;
    --color-border: #4d4838;
    --color-text: #edece8;
    --color-text-muted: #bcb7a9;
    --color-accent: #d4be7d;
    --color-on-accent: #111111;
    --color-success: #71d692;
    --color-warning: #f1b855;
    --color-danger: #e36c63;
    --color-info: #63aee3;
  }
}
```

## Mood: nature

```css
:root {
  --color-background: #f6f9f6;
  --color-surface: #eaf0ea;
  --color-surface-2: #dee8de;
  --color-border: #bfcfbf;
  --color-text: #1b221b;
  --color-text-muted: #576b57;
  --color-accent: #2b822b;
  --color-on-accent: #ffffff;
  --color-success: #268245;
  --color-warning: #9c670d;
  --color-danger: #ad281f;
  --color-info: #1f72ad;
}
@media (prefers-color-scheme: dark) {
  :root {
    --color-background: #101910;
    --color-surface: #182518;
    --color-surface-2: #203120;
    --color-border: #394c39;
    --color-text: #e8ede8;
    --color-text-muted: #aabbaa;
    --color-accent: #7dd47d;
    --color-on-accent: #111111;
    --color-success: #71d692;
    --color-warning: #f1b855;
    --color-danger: #e36c63;
    --color-info: #63aee3;
  }
}
```

## Mood: playful

```css
:root {
  --color-background: #f9f5f8;
  --color-surface: #f2e8ef;
  --color-surface-2: #ebdbe6;
  --color-border: #d3bbcb;
  --color-text: #241a20;
  --color-text-muted: #715166;
  --color-accent: #a6307f;
  --color-on-accent: #ffffff;
  --color-success: #257e43;
  --color-warning: #97640c;
  --color-danger: #ad281f;
  --color-info: #1f72ad;
}
@media (prefers-color-scheme: dark) {
  :root {
    --color-background: #1b0e17;
    --color-surface: #291522;
    --color-surface-2: #361b2d;
    --color-border: #513447;
    --color-text: #eee7ec;
    --color-text-muted: #bfa6b7;
    --color-accent: #d879b8;
    --color-on-accent: #111111;
    --color-success: #71d692;
    --color-warning: #f1b855;
    --color-danger: #e36c63;
    --color-info: #63aee3;
  }
}
```

## Mood: professional

```css
:root {
  --color-background: #f6f7f8;
  --color-surface: #eaedf0;
  --color-surface-2: #dfe2e7;
  --color-border: #c0c6ce;
  --color-text: #1c1e21;
  --color-text-muted: #585f6a;
  --color-accent: #3662a1;
  --color-on-accent: #ffffff;
  --color-success: #257e43;
  --color-warning: #97640c;
  --color-danger: #ad281f;
  --color-info: #1f72ad;
}
@media (prefers-color-scheme: dark) {
  :root {
    --color-background: #111418;
    --color-surface: #191e24;
    --color-surface-2: #212830;
    --color-border: #3a414a;
    --color-text: #e9eaec;
    --color-text-muted: #acb1b9;
    --color-accent: #7da1d4;
    --color-on-accent: #111111;
    --color-success: #71d692;
    --color-warning: #f1b855;
    --color-danger: #e36c63;
    --color-info: #63aee3;
  }
}
```

## Mood: romantic

```css
:root {
  --color-background: #f9f6f7;
  --color-surface: #f1eaec;
  --color-surface-2: #e9dde1;
  --color-border: #d0bec4;
  --color-text: #221b1d;
  --color-text-muted: #6d555d;
  --color-accent: #a13659;
  --color-on-accent: #ffffff;
  --color-success: #257e43;
  --color-warning: #97640c;
  --color-danger: #ad281f;
  --color-info: #1f72ad;
}
@media (prefers-color-scheme: dark) {
  :root {
    --color-background: #191013;
    --color-surface: #26171c;
    --color-surface-2: #331f26;
    --color-border: #4d383f;
    --color-text: #ede8ea;
    --color-text-muted: #bca9af;
    --color-accent: #d47d9a;
    --color-on-accent: #111111;
    --color-success: #71d692;
    --color-warning: #f1b855;
    --color-danger: #e36c63;
    --color-info: #63aee3;
  }
}
```

## Mood: mysterious

```css
:root {
  --color-background: #f7f6f9;
  --color-surface: #edeaf1;
  --color-surface-2: #e3dde9;
  --color-border: #c7bed0;
  --color-text: #1f1b22;
  --color-text-muted: #61556d;
  --color-accent: #6b36a1;
  --color-on-accent: #ffffff;
  --color-success: #257e43;
  --color-warning: #97640c;
  --color-danger: #ad281f;
  --color-info: #1f72ad;
}
@media (prefers-color-scheme: dark) {
  :root {
    --color-background: #141019;
    --color-surface: #1f1726;
    --color-surface-2: #291f33;
    --color-border: #42384d;
    --color-text: #ebe8ed;
    --color-text-muted: #b3a9bc;
    --color-accent: #a87dd4;
    --color-on-accent: #111111;
    --color-success: #71d692;
    --color-warning: #f1b855;
    --color-danger: #e36c63;
    --color-info: #63aee3;
  }
}
```

## Mood: retro

```css
:root {
  --color-background: #f9f7f6;
  --color-surface: #f1ede9;
  --color-surface-2: #e9e3dd;
  --color-border: #d1c7bd;
  --color-text: #231f1a;
  --color-text-muted: #6e6154;
  --color-accent: #996633;
  --color-on-accent: #ffffff;
  --color-success: #268245;
  --color-warning: #9c670d;
  --color-danger: #ad281f;
  --color-info: #1f72ad;
}
@media (prefers-color-scheme: dark) {
  :root {
    --color-background: #1a140f;
    --color-surface: #271f16;
    --color-surface-2: #34291e;
    --color-border: #4e4236;
    --color-text: #edebe8;
    --color-text-muted: #bdb3a8;
    --color-accent: #d4a87d;
    --color-on-accent: #111111;
    --color-success: #71d692;
    --color-warning: #f1b855;
    --color-danger: #e36c63;
    --color-info: #63aee3;
  }
}
```

## Mood: futuristic

```css
:root {
  --color-background: #f5f9fa;
  --color-surface: #e8f1f3;
  --color-surface-2: #dbe9eb;
  --color-border: #b9d0d4;
  --color-text: #192224;
  --color-text-muted: #4f6d72;
  --color-accent: #23798b;
  --color-on-accent: #ffffff;
  --color-success: #268245;
  --color-warning: #9c670d;
  --color-danger: #ad281f;
  --color-info: #1f72ad;
}
@media (prefers-color-scheme: dark) {
  :root {
    --color-background: #0d191c;
    --color-surface: #14262a;
    --color-surface-2: #1a3337;
    --color-border: #324d52;
    --color-text: #e7edee;
    --color-text-muted: #a5bcc0;
    --color-accent: #74cbdc;
    --color-on-accent: #111111;
    --color-success: #71d692;
    --color-warning: #f1b855;
    --color-danger: #e36c63;
    --color-info: #63aee3;
  }
}
```

## Mood: warm

```css
:root {
  --color-background: #f9f7f6;
  --color-surface: #f1ece9;
  --color-surface-2: #e9e2dd;
  --color-border: #d1c5bd;
  --color-text: #231e1a;
  --color-text-muted: #6e5f54;
  --color-accent: #a16236;
  --color-on-accent: #ffffff;
  --color-success: #268245;
  --color-warning: #9c670d;
  --color-danger: #ad281f;
  --color-info: #1f72ad;
}
@media (prefers-color-scheme: dark) {
  :root {
    --color-background: #1a130f;
    --color-surface: #271d16;
    --color-surface-2: #34271e;
    --color-border: #4e4036;
    --color-text: #edeae8;
    --color-text-muted: #bdb1a8;
    --color-accent: #d4a17d;
    --color-on-accent: #111111;
    --color-success: #71d692;
    --color-warning: #f1b855;
    --color-danger: #e36c63;
    --color-info: #63aee3;
  }
}
```

## Mood: cool

```css
:root {
  --color-background: #f6f8f9;
  --color-surface: #eaeef0;
  --color-surface-2: #dee4e8;
  --color-border: #bfc8cf;
  --color-text: #1b1f22;
  --color-text-muted: #57636b;
  --color-accent: #3674a1;
  --color-on-accent: #ffffff;
  --color-success: #268245;
  --color-warning: #9c670d;
  --color-danger: #ad281f;
  --color-info: #1f72ad;
}
@media (prefers-color-scheme: dark) {
  :root {
    --color-background: #101519;
    --color-surface: #182025;
    --color-surface-2: #202a31;
    --color-border: #39444c;
    --color-text: #e8ebed;
    --color-text-muted: #aab4bb;
    --color-accent: #7db0d4;
    --color-on-accent: #111111;
    --color-success: #71d692;
    --color-warning: #f1b855;
    --color-danger: #e36c63;
    --color-info: #63aee3;
  }
}
```

## Mood: minimal

```css
:root {
  --color-background: #f7f7f8;
  --color-surface: #ededee;
  --color-surface-2: #e2e3e4;
  --color-border: #c6c7c8;
  --color-text: #1e1e1f;
  --color-text-muted: #5f6062;
  --color-accent: #3659a1;
  --color-on-accent: #ffffff;
  --color-success: #257e43;
  --color-warning: #97640c;
  --color-danger: #ad281f;
  --color-info: #1f72ad;
}
@media (prefers-color-scheme: dark) {
  :root {
    --color-background: #141415;
    --color-surface: #1e1e20;
    --color-surface-2: #28282a;
    --color-border: #414244;
    --color-text: #eaeaeb;
    --color-text-muted: #b1b2b4;
    --color-accent: #7d9ad4;
    --color-on-accent: #111111;
    --color-success: #71d692;
    --color-warning: #f1b855;
    --color-danger: #e36c63;
    --color-info: #63aee3;
  }
}
```

## Mood: cozy

```css
:root {
  --color-background: #f8f7f6;
  --color-surface: #f0edea;
  --color-surface-2: #e7e3df;
  --color-border: #cec7c0;
  --color-text: #211f1c;
  --color-text-muted: #6a6158;
  --color-accent: #996633;
  --color-on-accent: #ffffff;
  --color-success: #268245;
  --color-warning: #9c670d;
  --color-danger: #ad281f;
  --color-info: #1f72ad;
}
@media (prefers-color-scheme: dark) {
  :root {
    --color-background: #181411;
    --color-surface: #241f19;
    --color-surface-2: #302921;
    --color-border: #4a423a;
    --color-text: #ecebe9;
    --color-text-muted: #b9b3ac;
    --color-accent: #d4a87d;
    --color-on-accent: #111111;
    --color-success: #71d692;
    --color-warning: #f1b855;
    --color-danger: #e36c63;
    --color-info: #63aee3;
  }
}
```

## Mood: fresh

```css
:root {
  --color-background: #f6f9f7;
  --color-surface: #e9f1ed;
  --color-surface-2: #dde9e3;
  --color-border: #bdd1c7;
  --color-text: #1a231f;
  --color-text-muted: #546e61;
  --color-accent: #2a7e54;
  --color-on-accent: #ffffff;
  --color-success: #268245;
  --color-warning: #9c670d;
  --color-danger: #ad281f;
  --color-info: #1f72ad;
}
@media (prefers-color-scheme: dark) {
  :root {
    --color-background: #0f1a14;
    --color-surface: #16271f;
    --color-surface-2: #1e3429;
    --color-border: #364e42;
    --color-text: #e8edeb;
    --color-text-muted: #a8bdb3;
    --color-accent: #7dd4a8;
    --color-on-accent: #111111;
    --color-success: #71d692;
    --color-warning: #f1b855;
    --color-danger: #e36c63;
    --color-info: #63aee3;
  }
}
```

## Mood: bold

```css
:root {
  --color-background: #faf5f5;
  --color-surface: #f3e7e7;
  --color-surface-2: #edd9d9;
  --color-border: #d7b7b7;
  --color-text: #251818;
  --color-text-muted: #754d4d;
  --color-accent: #b62020;
  --color-on-accent: #ffffff;
  --color-success: #257e43;
  --color-warning: #97640c;
  --color-danger: #ad281f;
  --color-info: #1f72ad;
}
@media (prefers-color-scheme: dark) {
  :root {
    --color-background: #1d0c0c;
    --color-surface: #2b1212;
    --color-surface-2: #3a1818;
    --color-border: #553030;
    --color-text: #efe6e6;
    --color-text-muted: #c3a2a2;
    --color-accent: #e56c6c;
    --color-on-accent: #111111;
    --color-success: #71d692;
    --color-warning: #f1b855;
    --color-danger: #e36c63;
    --color-info: #63aee3;
  }
}
```

## Mood: elegant

```css
:root {
  --color-background: #f8f7f8;
  --color-surface: #eeebef;
  --color-surface-2: #e4e0e6;
  --color-border: #c8c2cb;
  --color-text: #1f1d20;
  --color-text-muted: #635b67;
  --color-accent: #7d36a1;
  --color-on-accent: #ffffff;
  --color-success: #268245;
  --color-warning: #9c670d;
  --color-danger: #ad281f;
  --color-info: #1f72ad;
}
@media (prefers-color-scheme: dark) {
  :root {
    --color-background: #151217;
    --color-surface: #201b22;
    --color-surface-2: #2a242e;
    --color-border: #443d48;
    --color-text: #ebe9ec;
    --color-text-muted: #b4aeb7;
    --color-accent: #b77dd4;
    --color-on-accent: #111111;
    --color-success: #71d692;
    --color-warning: #f1b855;
    --color-danger: #e36c63;
    --color-info: #63aee3;
  }
}
```

## Mood: earthy

```css
:root {
  --color-background: #f8f8f6;
  --color-surface: #f0eeea;
  --color-surface-2: #e7e4df;
  --color-border: #cec8c0;
  --color-text: #211f1c;
  --color-text-muted: #6a6258;
  --color-accent: #916930;
  --color-on-accent: #ffffff;
  --color-success: #268245;
  --color-warning: #9c670d;
  --color-danger: #ad281f;
  --color-info: #1f72ad;
}
@media (prefers-color-scheme: dark) {
  :root {
    --color-background: #181511;
    --color-surface: #242019;
    --color-surface-2: #302a21;
    --color-border: #4a443a;
    --color-text: #ecebe9;
    --color-text-muted: #b9b4ac;
    --color-accent: #d4b07d;
    --color-on-accent: #111111;
    --color-success: #71d692;
    --color-warning: #f1b855;
    --color-danger: #e36c63;
    --color-info: #63aee3;
  }
}
```

## Mood: oceanic

```css
:root {
  --color-background: #f5f8f9;
  --color-surface: #e9eff2;
  --color-surface-2: #dce6ea;
  --color-border: #bccdd2;
  --color-text: #1a2123;
  --color-text-muted: #52686f;
  --color-accent: #307991;
  --color-on-accent: #ffffff;
  --color-success: #268245;
  --color-warning: #9c670d;
  --color-danger: #ad281f;
  --color-info: #1f72ad;
}
@media (prefers-color-scheme: dark) {
  :root {
    --color-background: #0e171b;
    --color-surface: #152328;
    --color-surface-2: #1d2f35;
    --color-border: #354950;
    --color-text: #e8ecee;
    --color-text-muted: #a7b8be;
    --color-accent: #7dbed4;
    --color-on-accent: #111111;
    --color-success: #71d692;
    --color-warning: #f1b855;
    --color-danger: #e36c63;
    --color-info: #63aee3;
  }
}
```

## Mood: tropical

```css
:root {
  --color-background: #f5f9f9;
  --color-surface: #e8f2f0;
  --color-surface-2: #dbebe8;
  --color-border: #bbd3cf;
  --color-text: #1a2422;
  --color-text-muted: #51716c;
  --color-accent: #257e70;
  --color-on-accent: #ffffff;
  --color-success: #268245;
  --color-warning: #9c670d;
  --color-danger: #ad281f;
  --color-info: #1f72ad;
}
@media (prefers-color-scheme: dark) {
  :root {
    --color-background: #0e1b19;
    --color-surface: #152925;
    --color-surface-2: #1b3632;
    --color-border: #34514c;
    --color-text: #e7eeed;
    --color-text-muted: #a6bfbb;
    --color-accent: #79d8c8;
    --color-on-accent: #111111;
    --color-success: #71d692;
    --color-warning: #f1b855;
    --color-danger: #e36c63;
    --color-info: #63aee3;
  }
}
```

## Mood: sunset

```css
:root {
  --color-background: #faf7f5;
  --color-surface: #f3ebe8;
  --color-surface-2: #ebe0db;
  --color-border: #d4c2b9;
  --color-text: #241d19;
  --color-text-muted: #725b4f;
  --color-accent: #ab562b;
  --color-on-accent: #ffffff;
  --color-success: #268245;
  --color-warning: #9c670d;
  --color-danger: #ad281f;
  --color-info: #1f72ad;
}
@media (prefers-color-scheme: dark) {
  :root {
    --color-background: #1c120d;
    --color-surface: #2a1b14;
    --color-surface-2: #37241a;
    --color-border: #523d32;
    --color-text: #eee9e7;
    --color-text-muted: #c0aea5;
    --color-accent: #dc9774;
    --color-on-accent: #111111;
    --color-success: #71d692;
    --color-warning: #f1b855;
    --color-danger: #e36c63;
    --color-info: #63aee3;
  }
}
```

## Mood: forest

```css
:root {
  --color-background: #f6f9f7;
  --color-surface: #eaf0ec;
  --color-surface-2: #dee8e1;
  --color-border: #bfcfc4;
  --color-text: #1b221e;
  --color-text-muted: #576b5e;
  --color-accent: #2b8248;
  --color-on-accent: #ffffff;
  --color-success: #268245;
  --color-warning: #9c670d;
  --color-danger: #ad281f;
  --color-info: #1f72ad;
}
@media (prefers-color-scheme: dark) {
  :root {
    --color-background: #101913;
    --color-surface: #18251c;
    --color-surface-2: #203126;
    --color-border: #394c3f;
    --color-text: #e8edea;
    --color-text-muted: #aabbb0;
    --color-accent: #7dd49a;
    --color-on-accent: #111111;
    --color-success: #71d692;
    --color-warning: #f1b855;
    --color-danger: #e36c63;
    --color-info: #63aee3;
  }
}
```

## Mood: candy

```css
:root {
  --color-background: #f9f5f7;
  --color-surface: #f2e9ed;
  --color-surface-2: #eadce3;
  --color-border: #d2bcc7;
  --color-text: #231a1f;
  --color-text-muted: #6f5261;
  --color-accent: #a1366b;
  --color-on-accent: #ffffff;
  --color-success: #257e43;
  --color-warning: #97640c;
  --color-danger: #ad281f;
  --color-info: #1f72ad;
}
@media (prefers-color-scheme: dark) {
  :root {
    --color-background: #1b0e14;
    --color-surface: #28151f;
    --color-surface-2: #351d29;
    --color-border: #503542;
    --color-text: #eee8eb;
    --color-text-muted: #bea7b3;
    --color-accent: #d47da8;
    --color-on-accent: #111111;
    --color-success: #71d692;
    --color-warning: #f1b855;
    --color-danger: #e36c63;
    --color-info: #63aee3;
  }
}
```

## Mood: cyberpunk

```css
:root {
  --color-background: #faf5fa;
  --color-surface: #f3e7f3;
  --color-surface-2: #ecdaec;
  --color-border: #d5b8d5;
  --color-text: #251925;
  --color-text-muted: #744e74;
  --color-accent: #b125b1;
  --color-on-accent: #ffffff;
  --color-success: #257e43;
  --color-warning: #97640c;
  --color-danger: #ad281f;
  --color-info: #1f72ad;
}
@media (prefers-color-scheme: dark) {
  :root {
    --color-background: #1c0c1c;
    --color-surface: #2b132b;
    --color-surface-2: #391939;
    --color-border: #543154;
    --color-text: #efe7ef;
    --color-text-muted: #c1a4c1;
    --color-accent: #e170e1;
    --color-on-accent: #111111;
    --color-success: #71d692;
    --color-warning: #f1b855;
    --color-danger: #e36c63;
    --color-info: #63aee3;
  }
}
```

## Mood: pastel

```css
:root {
  --color-background: #f8f6f8;
  --color-surface: #eeeaf0;
  --color-surface-2: #e4dfe7;
  --color-border: #c9c0ce;
  --color-text: #201c21;
  --color-text-muted: #64586a;
  --color-accent: #7d36a1;
  --color-on-accent: #ffffff;
  --color-success: #257e43;
  --color-warning: #97640c;
  --color-danger: #ad281f;
  --color-info: #1f72ad;
}
@media (prefers-color-scheme: dark) {
  :root {
    --color-background: #161118;
    --color-surface: #201924;
    --color-surface-2: #2b2130;
    --color-border: #453a4a;
    --color-text: #ebe9ec;
    --color-text-muted: #b5acb9;
    --color-accent: #b77dd4;
    --color-on-accent: #111111;
    --color-success: #71d692;
    --color-warning: #f1b855;
    --color-danger: #e36c63;
    --color-info: #63aee3;
  }
}
```

## Mood: trustworthy

```css
:root {
  --color-background: #f6f7f9;
  --color-surface: #e9edf1;
  --color-surface-2: #dde3e9;
  --color-border: #bdc7d1;
  --color-text: #1a1f23;
  --color-text-muted: #54616e;
  --color-accent: #366ba1;
  --color-on-accent: #ffffff;
  --color-success: #257e43;
  --color-warning: #97640c;
  --color-danger: #ad281f;
  --color-info: #1f72ad;
}
@media (prefers-color-scheme: dark) {
  :root {
    --color-background: #0f141a;
    --color-surface: #161f27;
    --color-surface-2: #1e2934;
    --color-border: #36424e;
    --color-text: #e8ebed;
    --color-text-muted: #a8b3bd;
    --color-accent: #7da8d4;
    --color-on-accent: #111111;
    --color-success: #71d692;
    --color-warning: #f1b855;
    --color-danger: #e36c63;
    --color-info: #63aee3;
  }
}
```

## Mood: creative

```css
:root {
  --color-background: #f9f5f9;
  --color-surface: #f0e9f2;
  --color-surface-2: #e8dcea;
  --color-border: #cebcd2;
  --color-text: #221a23;
  --color-text-muted: #6b526f;
  --color-accent: #8f36a1;
  --color-on-accent: #ffffff;
  --color-success: #257e43;
  --color-warning: #97640c;
  --color-danger: #ad281f;
  --color-info: #1f72ad;
}
@media (prefers-color-scheme: dark) {
  :root {
    --color-background: #180e1b;
    --color-surface: #251528;
    --color-surface-2: #311d35;
    --color-border: #4b3550;
    --color-text: #ede8ee;
    --color-text-muted: #baa7be;
    --color-accent: #c57dd4;
    --color-on-accent: #111111;
    --color-success: #71d692;
    --color-warning: #f1b855;
    --color-danger: #e36c63;
    --color-info: #63aee3;
  }
}
```

## Mood: healthy

```css
:root {
  --color-background: #f7f9f6;
  --color-surface: #ecf1ea;
  --color-surface-2: #e1e9dd;
  --color-border: #c4d0be;
  --color-text: #1d221b;
  --color-text-muted: #5d6d55;
  --color-accent: #467e2a;
  --color-on-accent: #ffffff;
  --color-success: #268245;
  --color-warning: #9c670d;
  --color-danger: #ad281f;
  --color-info: #1f72ad;
}
@media (prefers-color-scheme: dark) {
  :root {
    --color-background: #131910;
    --color-surface: #1c2617;
    --color-surface-2: #26331f;
    --color-border: #3f4d38;
    --color-text: #eaede8;
    --color-text-muted: #afbca9;
    --color-accent: #9ad47d;
    --color-on-accent: #111111;
    --color-success: #71d692;
    --color-warning: #f1b855;
    --color-danger: #e36c63;
    --color-info: #63aee3;
  }
}
```

## Mood: friendly

```css
:root {
  --color-background: #f9f8f5;
  --color-surface: #f2efe8;
  --color-surface-2: #ebe6db;
  --color-border: #d3cbbb;
  --color-text: #24201a;
  --color-text-muted: #716651;
  --color-accent: #8e6d29;
  --color-on-accent: #ffffff;
  --color-success: #268245;
  --color-warning: #9c670d;
  --color-danger: #ad281f;
  --color-info: #1f72ad;
}
@media (prefers-color-scheme: dark) {
  :root {
    --color-background: #1b170e;
    --color-surface: #292215;
    --color-surface-2: #362d1b;
    --color-border: #514734;
    --color-text: #eeece7;
    --color-text-muted: #bfb7a6;
    --color-accent: #d8b879;
    --color-on-accent: #111111;
    --color-success: #71d692;
    --color-warning: #f1b855;
    --color-danger: #e36c63;
    --color-info: #63aee3;
  }
}
```

## Mood: serious

```css
:root {
  --color-background: #f7f7f8;
  --color-surface: #ececee;
  --color-surface-2: #e1e2e5;
  --color-border: #c4c5ca;
  --color-text: #1d1e20;
  --color-text-muted: #5d5e65;
  --color-accent: #3647a1;
  --color-on-accent: #ffffff;
  --color-success: #257e43;
  --color-warning: #97640c;
  --color-danger: #ad281f;
  --color-info: #1f72ad;
}
@media (prefers-color-scheme: dark) {
  :root {
    --color-background: #131316;
    --color-surface: #1c1d21;
    --color-surface-2: #25262c;
    --color-border: #3e4046;
    --color-text: #eaeaec;
    --color-text-muted: #afb0b6;
    --color-accent: #7d8bd4;
    --color-on-accent: #111111;
    --color-success: #71d692;
    --color-warning: #f1b855;
    --color-danger: #e36c63;
    --color-info: #63aee3;
  }
}
```

# Named themes

## Theme: olive

```css
:root {
  --color-background: #f8f9f6;
  --color-surface: #eff0ea;
  --color-surface-2: #e7e8de;
  --color-border: #cdcfbf;
  --color-text: #21221b;
  --color-text-muted: #686b57;
  --color-accent: #6c7728;
  --color-on-accent: #ffffff;
  --color-success: #268245;
  --color-warning: #9c670d;
  --color-danger: #ad281f;
  --color-info: #1f72ad;
}
@media (prefers-color-scheme: dark) {
  :root {
    --color-background: #181910;
    --color-surface: #232518;
    --color-surface-2: #2f3120;
    --color-border: #494c39;
    --color-text: #ecede8;
    --color-text-muted: #b8bbaa;
    --color-accent: #c8d47d;
    --color-on-accent: #111111;
    --color-success: #71d692;
    --color-warning: #f1b855;
    --color-danger: #e36c63;
    --color-info: #63aee3;
  }
}
```

## Theme: sakura

```css
:root {
  --color-background: #f8f6f7;
  --color-surface: #f0eaed;
  --color-surface-2: #e7dfe2;
  --color-border: #cec0c6;
  --color-text: #211c1e;
  --color-text-muted: #6a585f;
  --color-accent: #a13662;
  --color-on-accent: #ffffff;
  --color-success: #257e43;
  --color-warning: #97640c;
  --color-danger: #ad281f;
  --color-info: #1f72ad;
}
@media (prefers-color-scheme: dark) {
  :root {
    --color-background: #181114;
    --color-surface: #24191e;
    --color-surface-2: #302128;
    --color-border: #4a3a41;
    --color-text: #ece9ea;
    --color-text-muted: #b9acb1;
    --color-accent: #d47da1;
    --color-on-accent: #111111;
    --color-success: #71d692;
    --color-warning: #f1b855;
    --color-danger: #e36c63;
    --color-info: #63aee3;
  }
}
```

## Theme: golden-hour

```css
:root {
  --color-background: #f9f8f5;
  --color-surface: #f2eee8;
  --color-surface-2: #ebe5db;
  --color-border: #d3cabb;
  --color-text: #24201a;
  --color-text-muted: #716551;
  --color-accent: #8e6929;
  --color-on-accent: #ffffff;
  --color-success: #268245;
  --color-warning: #9c670d;
  --color-danger: #ad281f;
  --color-info: #1f72ad;
}
@media (prefers-color-scheme: dark) {
  :root {
    --color-background: #1b160e;
    --color-surface: #292115;
    --color-surface-2: #362c1b;
    --color-border: #514634;
    --color-text: #eeebe7;
    --color-text-muted: #bfb6a6;
    --color-accent: #d8b579;
    --color-on-accent: #111111;
    --color-success: #71d692;
    --color-warning: #f1b855;
    --color-danger: #e36c63;
    --color-info: #63aee3;
  }
}
```

## Theme: tokyo-neon

```css
:root {
  --color-background: #faf5f8;
  --color-surface: #f3e7ee;
  --color-surface-2: #ecdae4;
  --color-border: #d5b8c9;
  --color-text: #251920;
  --color-text-muted: #744e64;
  --color-accent: #b12577;
  --color-on-accent: #ffffff;
  --color-success: #257e43;
  --color-warning: #97640c;
  --color-danger: #ad281f;
  --color-info: #1f72ad;
}
@media (prefers-color-scheme: dark) {
  :root {
    --color-background: #1c0c16;
    --color-surface: #2b1321;
    --color-surface-2: #39192b;
    --color-border: #543145;
    --color-text: #efe7eb;
    --color-text-muted: #c1a4b5;
    --color-accent: #e170b2;
    --color-on-accent: #111111;
    --color-success: #71d692;
    --color-warning: #f1b855;
    --color-danger: #e36c63;
    --color-info: #63aee3;
  }
}
```

## Theme: matcha-latte

```css
:root {
  --color-background: #f8f8f6;
  --color-surface: #eef0ea;
  --color-surface-2: #e4e7df;
  --color-border: #c9cec0;
  --color-text: #20211c;
  --color-text-muted: #646a58;
  --color-accent: #5f7a29;
  --color-on-accent: #ffffff;
  --color-success: #268245;
  --color-warning: #9c670d;
  --color-danger: #ad281f;
  --color-info: #1f72ad;
}
@media (prefers-color-scheme: dark) {
  :root {
    --color-background: #161811;
    --color-surface: #202419;
    --color-surface-2: #2b3021;
    --color-border: #454a3a;
    --color-text: #ebece9;
    --color-text-muted: #b5b9ac;
    --color-accent: #b7d47d;
    --color-on-accent: #111111;
    --color-success: #71d692;
    --color-warning: #f1b855;
    --color-danger: #e36c63;
    --color-info: #63aee3;
  }
}
```

## Theme: midnight-navy

```css
:root {
  --color-background: #f6f7f9;
  --color-surface: #eaebf1;
  --color-surface-2: #dde0e9;
  --color-border: #bec2d0;
  --color-text: #1b1d22;
  --color-text-muted: #555b6d;
  --color-accent: #3650a1;
  --color-on-accent: #ffffff;
  --color-success: #257e43;
  --color-warning: #97640c;
  --color-danger: #ad281f;
  --color-info: #1f72ad;
}
@media (prefers-color-scheme: dark) {
  :root {
    --color-background: #101219;
    --color-surface: #171b26;
    --color-surface-2: #1f2433;
    --color-border: #383d4d;
    --color-text: #e8e9ed;
    --color-text-muted: #a9aebc;
    --color-accent: #7d93d4;
    --color-on-accent: #111111;
    --color-success: #71d692;
    --color-warning: #f1b855;
    --color-danger: #e36c63;
    --color-info: #63aee3;
  }
}
```

## Theme: psych-currents

```css
:root {
  --color-background: #f8f5f9;
  --color-surface: #f0e8f2;
  --color-surface-2: #e7dbeb;
  --color-border: #cdbbd3;
  --color-text: #211a24;
  --color-text-muted: #695171;
  --color-accent: #8930a6;
  --color-on-accent: #ffffff;
  --color-success: #257e43;
  --color-warning: #97640c;
  --color-danger: #ad281f;
  --color-info: #1f72ad;
}
@media (prefers-color-scheme: dark) {
  :root {
    --color-background: #180e1b;
    --color-surface: #241529;
    --color-surface-2: #301b36;
    --color-border: #4a3451;
    --color-text: #ece7ee;
    --color-text-muted: #b9a6bf;
    --color-accent: #c079d8;
    --color-on-accent: #111111;
    --color-success: #71d692;
    --color-warning: #f1b855;
    --color-danger: #e36c63;
    --color-info: #63aee3;
  }
}
```

## Theme: shooting-star

```css
:root {
  --color-background: #faf5fa;
  --color-surface: #f3e8f3;
  --color-surface-2: #ebdbeb;
  --color-border: #d4b9d4;
  --color-text: #241924;
  --color-text-muted: #724f72;
  --color-accent: #ab2bab;
  --color-on-accent: #ffffff;
  --color-success: #257e43;
  --color-warning: #97640c;
  --color-danger: #ad281f;
  --color-info: #1f72ad;
}
@media (prefers-color-scheme: dark) {
  :root {
    --color-background: #1c0d1c;
    --color-surface: #2a142a;
    --color-surface-2: #371a37;
    --color-border: #523252;
    --color-text: #eee7ee;
    --color-text-muted: #c0a5c0;
    --color-accent: #dc74dc;
    --color-on-accent: #111111;
    --color-success: #71d692;
    --color-warning: #f1b855;
    --color-danger: #e36c63;
    --color-info: #63aee3;
  }
}
```

## Theme: northern-lights

```css
:root {
  --color-background: #f5f9f7;
  --color-surface: #e8f2ed;
  --color-surface-2: #dbebe3;
  --color-border: #bbd3c7;
  --color-text: #1a241f;
  --color-text-muted: #517161;
  --color-accent: #257e52;
  --color-on-accent: #ffffff;
  --color-success: #268245;
  --color-warning: #9c670d;
  --color-danger: #ad281f;
  --color-info: #1f72ad;
}
@media (prefers-color-scheme: dark) {
  :root {
    --color-background: #0e1b14;
    --color-surface: #15291f;
    --color-surface-2: #1b3629;
    --color-border: #345142;
    --color-text: #e7eeeb;
    --color-text-muted: #a6bfb3;
    --color-accent: #79d8a8;
    --color-on-accent: #111111;
    --color-success: #71d692;
    --color-warning: #f1b855;
    --color-danger: #e36c63;
    --color-info: #63aee3;
  }
}
```

## Theme: lavender-honey

```css
:root {
  --color-background: #f7f6f8;
  --color-surface: #edeaf0;
  --color-surface-2: #e3dfe7;
  --color-border: #c7c0ce;
  --color-text: #1f1c21;
  --color-text-muted: #61586a;
  --color-accent: #6b36a1;
  --color-on-accent: #ffffff;
  --color-success: #257e43;
  --color-warning: #97640c;
  --color-danger: #ad281f;
  --color-info: #1f72ad;
}
@media (prefers-color-scheme: dark) {
  :root {
    --color-background: #141118;
    --color-surface: #1f1924;
    --color-surface-2: #292130;
    --color-border: #423a4a;
    --color-text: #ebe9ec;
    --color-text-muted: #b3acb9;
    --color-accent: #a87dd4;
    --color-on-accent: #111111;
    --color-success: #71d692;
    --color-warning: #f1b855;
    --color-danger: #e36c63;
    --color-info: #63aee3;
  }
}
```

## Theme: ocean-depth

```css
:root {
  --color-background: #f5f8f9;
  --color-surface: #e8eef2;
  --color-surface-2: #dbe4eb;
  --color-border: #bbc9d3;
  --color-text: #1a1f24;
  --color-text-muted: #516471;
  --color-accent: #3075a6;
  --color-on-accent: #ffffff;
  --color-success: #268245;
  --color-warning: #9c670d;
  --color-danger: #ad281f;
  --color-info: #1f72ad;
}
@media (prefers-color-scheme: dark) {
  :root {
    --color-background: #0e161b;
    --color-surface: #152029;
    --color-surface-2: #1b2b36;
    --color-border: #344551;
    --color-text: #e7ebee;
    --color-text-muted: #a6b5bf;
    --color-accent: #79b0d8;
    --color-on-accent: #111111;
    --color-success: #71d692;
    --color-warning: #f1b855;
    --color-danger: #e36c63;
    --color-info: #63aee3;
  }
}
```

## Theme: dark-academia

```css
:root {
  --color-background: #f8f7f6;
  --color-surface: #f0edea;
  --color-surface-2: #e7e3df;
  --color-border: #cec7c0;
  --color-text: #211f1c;
  --color-text-muted: #6a6158;
  --color-accent: #996633;
  --color-on-accent: #ffffff;
  --color-success: #268245;
  --color-warning: #9c670d;
  --color-danger: #ad281f;
  --color-info: #1f72ad;
}
@media (prefers-color-scheme: dark) {
  :root {
    --color-background: #181411;
    --color-surface: #241f19;
    --color-surface-2: #302921;
    --color-border: #4a423a;
    --color-text: #ecebe9;
    --color-text-muted: #b9b3ac;
    --color-accent: #d4a87d;
    --color-on-accent: #111111;
    --color-success: #71d692;
    --color-warning: #f1b855;
    --color-danger: #e36c63;
    --color-info: #63aee3;
  }
}
```

## Theme: cotton-candy

```css
:root {
  --color-background: #f9f6f7;
  --color-surface: #f1e9ed;
  --color-surface-2: #e9dde3;
  --color-border: #d1bdc7;
  --color-text: #231a1f;
  --color-text-muted: #6e5461;
  --color-accent: #a1366b;
  --color-on-accent: #ffffff;
  --color-success: #257e43;
  --color-warning: #97640c;
  --color-danger: #ad281f;
  --color-info: #1f72ad;
}
@media (prefers-color-scheme: dark) {
  :root {
    --color-background: #1a0f14;
    --color-surface: #27161f;
    --color-surface-2: #341e29;
    --color-border: #4e3642;
    --color-text: #ede8eb;
    --color-text-muted: #bda8b3;
    --color-accent: #d47da8;
    --color-on-accent: #111111;
    --color-success: #71d692;
    --color-warning: #f1b855;
    --color-danger: #e36c63;
    --color-info: #63aee3;
  }
}
```

## Theme: espresso

```css
:root {
  --color-background: #f8f7f6;
  --color-surface: #f0edea;
  --color-surface-2: #e7e2df;
  --color-border: #cec6c0;
  --color-text: #211e1c;
  --color-text-muted: #6a5f58;
  --color-accent: #a16236;
  --color-on-accent: #ffffff;
  --color-success: #268245;
  --color-warning: #9c670d;
  --color-danger: #ad281f;
  --color-info: #1f72ad;
}
@media (prefers-color-scheme: dark) {
  :root {
    --color-background: #181411;
    --color-surface: #241e19;
    --color-surface-2: #302821;
    --color-border: #4a413a;
    --color-text: #eceae9;
    --color-text-muted: #b9b1ac;
    --color-accent: #d4a17d;
    --color-on-accent: #111111;
    --color-success: #71d692;
    --color-warning: #f1b855;
    --color-danger: #e36c63;
    --color-info: #63aee3;
  }
}
```

## Theme: nordic-frost

```css
:root {
  --color-background: #f7f7f8;
  --color-surface: #ecedef;
  --color-surface-2: #e0e3e5;
  --color-border: #c3c7cb;
  --color-text: #1d1f20;
  --color-text-muted: #5c6166;
  --color-accent: #366ba1;
  --color-on-accent: #ffffff;
  --color-success: #257e43;
  --color-warning: #97640c;
  --color-danger: #ad281f;
  --color-info: #1f72ad;
}
@media (prefers-color-scheme: dark) {
  :root {
    --color-background: #121417;
    --color-surface: #1b1f22;
    --color-surface-2: #24292d;
    --color-border: #3e4247;
    --color-text: #e9ebec;
    --color-text-muted: #aeb3b7;
    --color-accent: #7da8d4;
    --color-on-accent: #111111;
    --color-success: #71d692;
    --color-warning: #f1b855;
    --color-danger: #e36c63;
    --color-info: #63aee3;
  }
}
```

## Theme: mint-cream

```css
:root {
  --color-background: #f6f9f8;
  --color-surface: #eaf0ee;
  --color-surface-2: #dee8e4;
  --color-border: #bfcfc8;
  --color-text: #1b221f;
  --color-text-muted: #576b63;
  --color-accent: #2a7e5b;
  --color-on-accent: #ffffff;
  --color-success: #268245;
  --color-warning: #9c670d;
  --color-danger: #ad281f;
  --color-info: #1f72ad;
}
@media (prefers-color-scheme: dark) {
  :root {
    --color-background: #101915;
    --color-surface: #182520;
    --color-surface-2: #20312a;
    --color-border: #394c44;
    --color-text: #e8edeb;
    --color-text-muted: #aabbb4;
    --color-accent: #7dd4b0;
    --color-on-accent: #111111;
    --color-success: #71d692;
    --color-warning: #f1b855;
    --color-danger: #e36c63;
    --color-info: #63aee3;
  }
}
```

## Theme: sunset-boulevard

```css
:root {
  --color-background: #f9f6f5;
  --color-surface: #f2ebe8;
  --color-surface-2: #ebdfdb;
  --color-border: #d3c1bb;
  --color-text: #241c1a;
  --color-text-muted: #715951;
  --color-accent: #a64e30;
  --color-on-accent: #ffffff;
  --color-success: #257e43;
  --color-warning: #97640c;
  --color-danger: #ad281f;
  --color-info: #1f72ad;
}
@media (prefers-color-scheme: dark) {
  :root {
    --color-background: #1b110e;
    --color-surface: #291a15;
    --color-surface-2: #36221b;
    --color-border: #513b34;
    --color-text: #eee9e7;
    --color-text-muted: #bfaca6;
    --color-accent: #d89079;
    --color-on-accent: #111111;
    --color-success: #71d692;
    --color-warning: #f1b855;
    --color-danger: #e36c63;
    --color-info: #63aee3;
  }
}
```

## Theme: synthwave

```css
:root {
  --color-background: #f8f5f9;
  --color-surface: #f0e8f2;
  --color-surface-2: #e7dbeb;
  --color-border: #cdbbd3;
  --color-text: #211a24;
  --color-text-muted: #695171;
  --color-accent: #8930a6;
  --color-on-accent: #ffffff;
  --color-success: #257e43;
  --color-warning: #97640c;
  --color-danger: #ad281f;
  --color-info: #1f72ad;
}
@media (prefers-color-scheme: dark) {
  :root {
    --color-background: #180e1b;
    --color-surface: #241529;
    --color-surface-2: #301b36;
    --color-border: #4a3451;
    --color-text: #ece7ee;
    --color-text-muted: #b9a6bf;
    --color-accent: #c079d8;
    --color-on-accent: #111111;
    --color-success: #71d692;
    --color-warning: #f1b855;
    --color-danger: #e36c63;
    --color-info: #63aee3;
  }
}
```

## Theme: rose-quartz

```css
:root {
  --color-background: #f8f6f7;
  --color-surface: #f0eaec;
  --color-surface-2: #e7dfe2;
  --color-border: #cec0c5;
  --color-text: #211c1e;
  --color-text-muted: #6a585e;
  --color-accent: #a13659;
  --color-on-accent: #ffffff;
  --color-success: #257e43;
  --color-warning: #97640c;
  --color-danger: #ad281f;
  --color-info: #1f72ad;
}
@media (prefers-color-scheme: dark) {
  :root {
    --color-background: #181113;
    --color-surface: #24191d;
    --color-surface-2: #302126;
    --color-border: #4a3a40;
    --color-text: #ece9ea;
    --color-text-muted: #b9acb0;
    --color-accent: #d47d9a;
    --color-on-accent: #111111;
    --color-success: #71d692;
    --color-warning: #f1b855;
    --color-danger: #e36c63;
    --color-info: #63aee3;
  }
}
```
