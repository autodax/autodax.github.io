# Retirement apps

Steve's retirement-planning tools. They run entirely in the browser; nothing is sent anywhere.
Personal figures belong in the apps' saved entries on his devices, never in this repo or these notes.

These notes were started from a quick read of the files; expand them as you work on these apps.

## Files

- `wizard2026.html`, `wizard2027.html`: Retirement Planning Wizard, one file per tax year. Strings
  the other tools together: accounts, Social Security and wages, taxes, Roth conversions, spending,
  and an "Actions in brief" to-do list with calendar events. Entries are saved in localStorage
  (`rpwState`) and in the link (`#z=…`); it can carry a plan forward to the next year's file.
- `roth2026.html`, `roth2027.html`: Roth Conversion Planner (same tax engine as the Wizard).
- `tax2026.html`, `tax2027.html`: Federal Tax Estimator, single filer.
- `spend2026.html`, `spend2027.html`: "What to Withdraw This Year" calculator.
- `index.html`: an older copy of the 2026 tax estimator (a few labels differ from tax2026.html).
- `roth.html`, `wizard.html`: small pages that forward to the 2026 versions.

## How the files are organized

- Each big file has a "how this file is organized" comment near the top of its script.
- **TAX FIGURES** (search for it) is the block to edit when the IRS or Medicare publishes new
  figures. Keep the figures the same across the Wizard, Roth planner and tax estimator for a year.
- A new tax year means new `*YYYY.html` files once that year's figures are published (usually
  October or November of the year before).
- Pay calendar: nine-month academic pay (biweekly paychecks during the academic year, small prorated
  checks at the start and end), used by the Wizard for withholding and contributions.

## iPhone

- Viewport is locked to the page width on phones (`minimum-scale=1`, no sideways panning).
- The Wizard is scaled to 115% on iPhone in the page itself (not through Safari's zoom setting).

## Paying next year's tax (Wizard, Step 3)

- Setting `tpm`: quarterly estimated payments (default), extra paycheck withholding, or both; `wper` is the
  extra withholding per full paycheck for "both". It applies to next year's tax only; the current year's
  quarterly payments are unchanged.
- Extra withholding E (per paycheck x full paychecks; the two small prorated checks are not counted) lowers
  take-home pay by E, so the monthly transfers rise. In the code, `fund(E)` in `compute()` redoes the
  funding and the tax; for "withholding only" it repeats until E covers the tax left after regular withholding.
- The plan item, Actions in brief and calendar (W-4 change on Nov 30, quarterly dates) all follow the choice.

