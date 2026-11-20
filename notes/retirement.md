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

## iPhone and Mac

- Steve uses the Wizard on both his iPhone and his Mac. Check layout at desktop width as well as phone width.

- Viewport is locked to the page width on phones (`minimum-scale=1`, no sideways panning).
- The Wizard is scaled to 115% on iPhone in the page itself (not through Safari's zoom setting).

## Yearly check-in date

- The yearly check-in (run next year's Wizard, set Roth contributions and withholding, convert the Roth top-up) is Dec 15, set in `lastNov()` in the Wizard. Steve chose it. Fidelity's own pages say only that a Roth conversion must be done by Dec 31 to count for the year; they give no earlier recommended date or processing time.

## Paying next year's tax (Wizard, Step 3)

- Setting `tpm`: quarterly estimated payments (default), extra paycheck withholding, or both; `wper` is the
  extra withholding per full paycheck for "both". It applies to next year's tax only; the current year's
  quarterly payments are unchanged.
- Extra withholding E (per paycheck x full paychecks; the two small prorated checks are not counted) lowers
  take-home pay by E, so the monthly transfers rise. In the code, `fund(E)` in `compute()` redoes the
  funding and the tax; for "withholding only" it repeats until E covers the tax left after regular withholding.
- The plan item, Actions in brief and calendar (Oracle HR withholding change on Dec 15, quarterly dates) all follow the choice.
- Steve sets extra withholding in Oracle HR at USF (not a W-4), so the plan says "Oracle HR". It stays in effect until changed, so the plan adds a Dec 15 reminder in the following year to change it or reset it to $0.
- With withholding only, the plan also shows the least extra withholding per paycheck that avoids a penalty (the safe harbor).


## Withholding on nine-month pay

- Payroll figures each paycheck as if it repeated all year (26 periods), so with about 19.5 pay periods it withholds more than the annual estimate (about $3,000 more on $138k). The Wizard uses `payrollWH`; the tax estimators have a "Paychecks in the year" box (`npay`) that does the same. Blank = 26.

## Medicare figures

- 2027 Part B premium ($209.40) and IRMAA tiers (single: $112,000 / $141,000 / $177,000 / $212,000 / $500,000) are the official CMS figures, published Nov 17, 2026. They are in the three 2027 files. The 2026 Wizard uses them only for next year's (2027) Medicare line; its other IRMAA figures and the 2026 Roth planner and tax estimator still carry the 2026 tiers. The 2028 figures come out about mid-November 2027.

## "Even out" conversion sizing

- Without a spending amount chosen, "Even out" sizes the yearly conversion at my safe spending (the most I can spend after tax with my target chance of lasting), the same figure the long-range check table shows as "This plan". The statement quotes that figure, so the two always agree. The Wizard and the Roth planner use the same basis (the 32-case test compares them).
