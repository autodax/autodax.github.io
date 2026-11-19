# Ear Trainer (ear.html)

Live at https://autodax.github.io/ear.html. Steve uses it as a home-screen web app on his iPhone.

Scale-degree ear training in the style of Functional Ear Trainer (Alain Benbassat's method): a
cadence sets the key, a note plays, you name its scale degree, then the note resolves stepwise to
the nearest tonic. The goal is to hear a melody and play it on a keyboard in any key, all the way
to melodic dictation.

## Files

- `ear.html`: the whole app.
- `ear/piano/`: Salamander Grand Piano samples (CC BY 3.0, Alexander Holm, velocity layer 8),
  AAC `.m4a` named by MIDI note number (21 = A0 … 108 = C8), one every 3 keys. Credit is in
  `ear/piano/README.md` and in the app's Settings.
- `ear/icon-180.png`, `ear/icon-512.png`: orange eighth note (one flag) on pure black.
- `ear/manifest.json`: home-screen web app settings.

## Decisions (Steve's)

- Answers as numbers 1–7, never solfège. The number pad shows 1 2 3 4 / 5 6 7 1 (upper 1 counts as 1).
- Major keys until fully mastered, then minor and modes. Chords later; design for them.
- Resolution goes to the nearest tonic: 1–4 step down, 5–7 step up.
- The key stays fixed for a round of questions (no "new key every note"). Round length is
  adjustable, 5–30 (default 8). On one-octave levels the octave (below / middle / above) also
  changes each round, and the cadence moves with it.
- New keys come before more octaves in the ladder.
- Start with number answers; later require playing the melody on the keyboard in the key heard.
- Car mode: cadence, then note → pause → resolution, with the cadence repeating every N notes
  (adjustable). No spoken numbers (removed at his request). Ranges: 1, 2, 3 or 4 octaves.
- Piano sound: Salamander full quality (chosen by ear over Splendid Grand and MusyngKite).
- iPhone only for now. Sing-back mode is wanted later.
- Sync: a private GitHub gist, one user. Multi-user sign-in (Firebase) was discussed and put off.
- No redirect pages when renaming (he removed music.html rather than redirect it).

## Level ladder (LEVELS in ear.html)

1. Home base: 1 3 5 · 2. Add 2 and 4 · 3. Add 6 · 4. Full major scale (all key of C, one octave)
5. New key every round (one octave) · 6. Three octaves, new key every round
7–9. Two-, three-, four-note phrases (numbers)
10–14. Keyboard ("Play it"): single notes, 2, 3, 4 notes, then 6-note melodic dictation
Shown as "coming later": minor & modes, chromatic notes, chord tones, sing-back, rhythm.

Mastery: last 20 answers (15 for phrases) at ≥90% (80% for phrases), every degree ≥75% recently,
typical correct answer under the speed limit (3 s default, adjustable). About 30% of questions
drill the most-confused pair; about 20% are review from mastered levels.

## How ear.html is organized

Sections are marked with `/* ===== … ===== */` banners, in this order: theory data (scale-step
positions `s`, `posMidi`, `resolution`, `cadence`), LEVELS, state and storage, audio engine `A`,
adaptive engine, Train mode, Car mode, UI (header, Settings, Progress), sync, boot.

- Progress: localStorage `music.ear.v1`. `save()` marks a local change (sets `S.updatedAt`);
  `saveRaw()` doesn't.
- Sync token and gist id: localStorage `music.ear.sync`, never in progress files, exports or the gist.
  Gist file `ear-trainer-progress.json`. Every write checks the gist first; if both sides
  changed, the user picks which to keep. Pushes every 10 answers, on Stop, and when leaving the app.
- Audio: nearest sample within 3 semitones, otherwise a simple synth. Release time depends on
  pitch (bass rings longer). Samples are cached (Cache Storage `music-samples-v2`).

## Every release

- Bump `APP_VERSION` (format `YYYY-MM-DD.N`). Installed copies compare it to decide to update.
  Without a bump, Steve's phone won't pick up the change.
- Updates load from `ear.html?v=<version>` and try only once per version (sessionStorage
  `ear.updateTried`). A plain reload can return iOS's cached old page and loop forever.

## iPhone lessons (home-screen web app)

- The app reports a viewport one status bar shorter than the screen (812 on an 874 screen), and
  the bottom ~62 pt gets painted but not drawn. `fitHeight()` extends the app only when
  `innerHeight + top inset == screen height` at zoom 1, and the tab bar sits above that dead
  zone (`--deadzone`). Don't guess heights: earlier attempts pushed the tab bar off-screen.
- iOS blurs the status-bar area: the header gets extra top padding in home-screen mode (`.standalone`).
- Form controls under 16 px make iOS zoom in, and the zoom can stick. Keep inputs and selects at
  16 px; viewport has `maximum-scale=1`; `resetZoom()` runs at start and after editing.
  Safari's per-site Page Zoom (Settings → Apps → Safari → Page Zoom) also changes the layout.
- The home-screen app has its own storage, separate from Safari tabs. Removing the icon deletes
  its data, so export or sync first. The icon image is saved when added; a new icon needs the
  app removed and re-added.
- Web Audio is muted by the silent switch unless routed as playback (`navigator.audioSession`
  plus a looping silent audio element). Web apps pause when the screen locks, so Car mode keeps
  the screen on. Web MIDI isn't available on iOS.

## Pending ideas (not yet decided or built)

- Functional Ear Trainer features Steve wants to compare against: separate cadence and note
  tempos, a "give up" button, auto-advance choices (after correct / mistake / giving up), octave
  markers on answers, keyboard input switchable on any level, more resolution styles and speed.
- Keyboard levels: whether to require the exact octave, and a landscape keyboard with about
  three octaves. Steve will decide when he reaches the keyboard levels.
- Minor keys and modes, chromatic notes, chords, sing-back, rhythm in dictation.
