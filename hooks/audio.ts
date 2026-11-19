import type { EngineInterface as Engine } from 'claude-code'

// Sound and speech on every system. Claude Code's own player covers macOS; on
// Windows and Linux it plays nothing in a terminal, so those use the system's
// own tools: PowerShell's sound player and speech engine on Windows, and
// paplay / aplay / pw-play / ffplay and spd-say / espeak on Linux.

let platform: string | undefined

async function os($: Engine): Promise<string> {
  if (platform === undefined) {
    try {
      platform = (await $.session.info()).platform ?? 'unknown'
    } catch {
      platform = 'unknown'
    }
  }
  return platform
}

const quiet = (p: Promise<unknown>) => void p.catch(() => undefined)

/** Plays a WAV: the plugin's own file (`asset`), or WAV bytes as base64. */
export async function playWav($: Engine, clip: { asset: string } | { base64: string }): Promise<void> {
  const system = await os($)
  if (system !== 'windows' && system !== 'linux' && system !== 'wsl') {
    quiet('asset' in clip ? $.audio.play({ asset: clip.asset }) : $.audio.play({ base64: clip.base64, mime: 'audio/wav' }))
    return
  }
  const file = 'asset' in clip ? `${$.plugin.root}/${clip.asset}` : undefined
  if (system === 'windows') {
    const script =
      file !== undefined
        ? `(New-Object Media.SoundPlayer $env:COLORS_WAV).PlaySync()`
        : `$p=Join-Path $env:TEMP ('colors-sound-'+[guid]::NewGuid()+'.wav');` +
          `[IO.File]::WriteAllBytes($p,[Convert]::FromBase64String([Console]::In.ReadToEnd()));` +
          `(New-Object Media.SoundPlayer $p).PlaySync();Remove-Item $p`
    quiet(
      $.process.run(['powershell', '-NoProfile', '-NonInteractive', '-Command', script], {
        ...(file !== undefined ? { env: { COLORS_WAV: file } } : { stdin: 'base64' in clip ? clip.base64 : '' }),
        timeoutMs: 20_000,
      }),
    )
    return
  }
  // Linux and WSL: the first player that exists wins.
  const play = `for p in paplay "aplay -q" pw-play "ffplay -nodisp -autoexit -loglevel quiet"; do set -- $p; command -v "$1" >/dev/null 2>&1 && { "$@" "$F"; exit; }; done`
  const script =
    file !== undefined
      ? `F="$COLORS_WAV"; ${play}`
      : `F=$(mktemp /tmp/colors-sound-XXXXXX.wav) && base64 -d > "$F" && { ${play}; }; rm -f "$F"`
  quiet(
    $.process.run(['sh', '-c', script], {
      ...(file !== undefined ? { env: { COLORS_WAV: file } } : { stdin: 'base64' in clip ? clip.base64 : '' }),
      timeoutMs: 20_000,
    }),
  )
}

/** Speaks a line with the system's voice; `voice` names one, or '' for the default. */
export async function sayAloud($: Engine, text: string, voice = ''): Promise<void> {
  const system = await os($)
  try {
    await $.audio.speak(text, voice !== '' ? { voice } : undefined)
    return
  } catch {
    // Fall through to the system's own speech tools.
  }
  if (system === 'windows') {
    quiet(
      $.process.run(
        [
          'powershell', '-NoProfile', '-NonInteractive', '-Command',
          `Add-Type -AssemblyName System.Speech;$s=New-Object System.Speech.Synthesis.SpeechSynthesizer;` +
            `if($env:COLORS_VOICE){try{$s.SelectVoice($env:COLORS_VOICE)}catch{}};$s.Speak($env:COLORS_TEXT)`,
        ],
        { env: { COLORS_TEXT: text, COLORS_VOICE: voice }, timeoutMs: 30_000 },
      ),
    )
  } else if (system === 'linux' || system === 'wsl') {
    quiet(
      $.process.run(
        ['sh', '-c', 'command -v spd-say >/dev/null && exec spd-say -w "$COLORS_TEXT"; command -v espeak-ng >/dev/null && exec espeak-ng "$COLORS_TEXT"; command -v espeak >/dev/null && exec espeak "$COLORS_TEXT"'],
        { env: { COLORS_TEXT: text }, timeoutMs: 30_000 },
      ),
    )
  }
}
