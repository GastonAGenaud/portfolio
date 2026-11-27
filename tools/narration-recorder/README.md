# Narration Recorder

Desktop app (Electron) to record a human voice-over for the QA + AI guide
videos. It shows each video's script slide by slide, highlights the sentence
to read, shows how the video pronounces each English term, records one take
after another per slide, and exports the chosen takes, trimmed.

Recordings live in `<home>/Narration Recorder` (`takes/`, `export/`,
`state.json`), outside Documents because the takes add up to several GB.

## Keys

| Key       | Action                                             |
| --------- | -------------------------------------------------- |
| `R`       | Record / stop                                      |
| `Space`   | Pause / resume                                     |
| `→` / `N` | Next slide; while recording, keeps recording on it |
| `←`       | Previous slide                                     |
| `↓` / `↑` | Move the highlight one sentence                    |
| `Enter`   | Play the take in use, trimmed                      |
| `V`       | Play the slide with the published video            |
| `Delete`  | Delete the take in use                             |
| `Esc`     | Stop playback                                      |

Drag the yellow edges of the waveform to trim. "Recortar silencios" trims the
silence at both ends.

## From recording to video

1. Record every slide of a video and press **Exportar video**.
2. Copy `export/` from Windows to this machine and rebuild with that voice:

   ```bash
   node scripts/guide-videos/build.mjs --days 1 --langs es --voice <export folder>
   ```

   Each slide lasts as long as its take, so slides and voice line up by
   construction. Videos without a complete export are skipped.

## Development

```bash
node scripts/guide-videos/recorder-data.mjs   # regenerate app/narration-data.js
cd tools/narration-recorder
npm install
npm start                                     # run locally
npm run package:win                           # dist/Narration Recorder-win32-x64
```

UI test, from the repo root: `node tools/narration-recorder/test/ui.test.mjs`.
