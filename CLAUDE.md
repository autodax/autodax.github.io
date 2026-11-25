# autodax.github.io: notes for Claude

This repo is Steve's personal website on GitHub Pages (https://autodax.github.io). Each app is one
self-contained HTML file (HTML, CSS and JavaScript together) with no build step and no server.
Pushing to `main` publishes within a minute or two.

**This repo is public.** Anything written here, including these notes, can be read by anyone.
Never put personal details in the repo: no addresses, account numbers, balances, salary, or tokens.

## Working with Steve

- Steve doesn't read code. Describe changes in plain language: what he'll see and do, not how
  it's built. Don't paste code into replies.
- For simple choice questions, Steve prefers buttons (multiple-choice dialogs) over plain-text questions. Open-ended questions can be plain text.
- He uses an iPhone (Safari, and apps saved to the home screen as web apps). Mobile-first.
- When a choice is visual (icons, layouts, sounds), show a few options side by side before
  committing to one.
- Do the work, test it, and push it; then say briefly what changed and anything he must do
  (for example, swipe the app away and reopen it).

## Projects in this repo

| Project | Files | Notes |
|---|---|---|
| Ear Trainer | moved to its own repo, `autodax/ear` (https://autodax.github.io/ear/). Nothing of it remains here except a tiny `ear-sw.js` that clears old phones' saved copy; delete it in a few months. | Notes live in the `ear` repo |
| Retirement apps (Wizard, Roth planner, tax estimator, withdrawal calculator) | moved to its own repo, autodax/money | Live at https://autodax.github.io/money/ ; notes are in that repo |

Keep work on one project from touching another project's files.

## Every change

1. `git fetch` and rebase onto `origin/main` before pushing. Other Claude sessions also push to
   this repo, so `main` often has commits you don't have.
2. Test before pushing. Headless Chrome with Playwright is enough for layout and logic. Use an
   iPhone-sized viewport (402 × 874; the home-screen web app reports 402 × 812).
3. Commit messages in plain language, describing what changed for the user.
4. Follow any per-project release steps in that project's notes (for example, the Ear Trainer's
   version number).

## Keeping these notes current

These files are the memory for this repo. When you learn something a future session would
otherwise have to rediscover (a decision Steve made, a preference, an iPhone quirk, how a part of
an app works, a pending idea), update the matching notes file in the same commit. Keep entries
short, keep the files tidy, and remove anything that's no longer true. Only Steve's stated
decisions go under "Decisions"; don't record guesses as decisions.
