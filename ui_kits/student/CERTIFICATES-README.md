# Student · الإجازات والشهادات — README

The certificates screen: the content region only. No navigation, sidebar, or user menu, and
nothing borrowed from the public landing page.

Files:

- `StudentCertificates.dc.html` — the screen. One component, five states via the `state` prop:
  `empty` · `single` · `full` · `loading` · `error`, each × `viewport` (desktop / tablet / phone)
  × `colorScheme` (light / dark).
- `Certificates Frames.dc.html` — index of the review boards.
- `Certificates Frames Empty.dc.html` — the empty state, six frames.
- `Certificates Frames Forty Desktop.dc.html` — forty documents at 1280px, light and dark.
- `Certificates Frames Forty Small.dc.html` — forty documents at 834px and 390px.
- `Certificates Frames One.dc.html` — the record holding one document.
- `Certificates Frames States.dc.html` — loading and error, light and dark.

The boards are split deliberately, and at most two populated screens sit in one file. Sixteen
live mounts in a single board blocked the main thread for 10–25s and could not be captured at
all; the capture path clones the entire document, hidden frames included, so the only fix is
fewer mounts per file. Measured working budget is roughly 1,000 nodes / 13,000px per board — one
populated screen is about 420 nodes and 2,400–4,200px, so two per file is the ceiling.

## The screen

Order, top to bottom, and it is the same order in every populated state:

1. **Orientation** — programme / level / academic year in both calendars, the title, what the
   record holds, and one line on its current condition. In `single` and `full` a triad of
   counts follows: إجازات, شهادات, academic years. These count the student's own study and
   nothing else.
2. **ما يأتي بعد** — the next مقرر (title, teacher, lesson count, duration, one action), then the
   مستوى it belongs to with progress and a text equivalent, then the six مقررات of that مستوى with
   the next one marked. This block is present in `empty`, `single` and `full`; it is where the
   motivation lives, because it stays true at every stage.
3. **The record** (`single`, `full`) — grouped برنامج → مستوى, newest level first. Each مستوى is a
   collapsible section: `<h3>` containing a `<button aria-expanded aria-controls>` whose whole
   header is the control, with the level title, both calendar years, its state (مُتمّ / قائم), a
   summary of what it holds, and a text toggle label. The current level is open; completed levels
   are closed. That collapse, plus the شهادة sitting in each level's head, is what makes forty
   documents readable and stops the شهادات being buried.
   - **شهادة** — a compact institutional capstone strip at the top of its level: التقدير, النسبة,
     the متون count, and the issue date in both calendars. When the level is still running the
     strip stays but states that the شهادة is issued at its end.
   - **إجازة** — a double-ruled, sealed card in a 3 / 2 / 1-column grid, with the كتاب in Amiri,
     `بإجازة من د. …` at body size on its own line, the إسناد described by chain count, and the
     date in both calendars.
4. **The two documents** (`empty` only) — the إجازة and شهادة shown in the form they will take,
   fields empty. The student learns the grammar of their record before they hold any of it.
5. A quiet footer on view / download / verification.

**إجازة vs شهادة — form and scale, not colour.** In the record, an إجازة is a two-frame card
(outer border + inner rule) carrying a ring seal, with its title in Amiri at `--text-lg` and the
مُجيز's name at `--text-base` — the name is the largest non-title thing on the card. A شهادة is a
single-frame horizontal strip on the sunken page surface with its metadata in a `<dl>` row, no
seal, no inner rule. On the empty screen the same distinction is made by width (1.7 : 1) and
display size (`--text-3xl` vs `--text-xl`). Removing all colour from either leaves the hierarchy
intact.

**Motivation, and its limits.** Counts are of the student's own record; progress is toward the
current مستوى and the برنامج; two milestone marks exist — the first إجازة, and a completed مستوى
(carried by the شهادة strip itself). There is no comparison with other students, no ranking, no
percentile, no streak, no absence warning, no countdown, no scarcity, no rating, no price, no
emoji, no exclamation mark. The إجازة plate on the empty screen states that granting depends on
the teaching shaykh's sanad in the كتاب and that finishing a مقرر does not by itself produce one;
nothing anywhere promises an إجازة. مسار appears nowhere — مستوى throughout.

**Loading** renders the header immediately and defers only the record: a breathing skeleton
(`aria-hidden`) plus a polite live region reading جارٍ تحميل سجلّ الوثائق, so the state is never
carried by the skeleton alone. **Error** says the documents are safe and the fault is in the
display, gives the status code with both dates, and offers retry plus a way back. It uses no
danger colour — the record is not in danger.

## Component inventory

| Element | Source |
| --- | --- |
| `Button` — primary: the next-مقرر action and the error retry | design system bundle, `RibaatDesignSystem_790e93.Button` |
| Document action pair (عرض / تنزيل) — plain `<button>`s reproducing `Button`'s `outline` and `ghost` variants by token reference | derived from `components/core/Button.jsx`; see the departure note below |
| Next-مقرر card | composed on system card conventions — new to this screen |
| Level progress meter | composed; `role="progressbar"` + `aria-valuetext`, always paired with visible text — new to this screen |
| Level مقررات checklist | `<ol>`, Amiri titles, hairline rows — new to this screen |
| Collapsible مستوى group | `<h3>` + `<button aria-expanded aria-controls>` + panel — new to this screen |
| Seal mark — nested rings in `--ribaat-brown-300`, drawn from tokens (no raster) | new to this screen |
| شهادة capstone strip | new to this screen |
| إجازة document card (double rule + seal) | new to this screen |
| إجازة / شهادة empty plates | new to this screen |
| Record skeleton, error card | new to this screen |

No new foundations. Every new element above is built from existing tokens in the system's
existing language.

**One deliberate departure from the bundle.** At forty documents the record needs eighty action
controls; mounting eighty React `Button` instances cost roughly 45–60s of main-thread work and
made the review board impossible to capture. The document actions are therefore plain `<button>`
elements carrying `Button`'s exact `outline` and `ghost` values (transparent ground,
`--text-brand`, `--border-brand`, `--radius-md`, `--text-sm`, semibold, `--ribaat-green-100`
hover), and collapsed levels now render no document cards at all. The real DS `Button` is kept
for the two primary actions. If the system gains a lighter non-React button, or the record gains
virtualisation, this should return to the bundle component.

## Tokens consumed

Colour — `--surface-page`, `--surface-card`, `--surface-sunken`, `--surface-brand`,
`--border-subtle`, `--border-default`, `--text-primary`, `--text-secondary`, `--text-brand`,
`--text-accent`, `--text-link`, `--text-link-hover`, `--focus-ring`, `--ribaat-green-300`,
`--ribaat-brown-100/200/300`.
Type — `--font-display`, `--font-sans`, `--text-xs` → `--text-3xl`, `--leading-tight`,
`--leading-normal`, `--weight-semibold`, `--weight-bold`.
Space — `--space-1` → `--space-20`, `--container-max`.
Effects — `--radius-sm/md/lg/pill`, `--shadow-sm/md`, `--border-width`, `--duration-slow`,
`--ease-standard`.
Dark — the existing `[data-theme="dark"]` layer in `tokens/colors-dark.css`, unchanged.

No literal hex or px values in the screen. Layout uses logical properties throughout
(`padding-inline`, `border-block-end`, `margin-inline`, `text-align: start`).

## Accessibility

`h1 → h2 → h3 → h4 → h5` with no skipped levels. `<button>` for every action and expand control,
`<a>` for navigation; no click handler on a `div`. Each مستوى toggle is a real button, keyboard
operable, carrying `aria-expanded` and `aria-controls` pointing at its panel, with a visible text
label that changes with state. `role="progressbar"` with `aria-valuemin/max/now/valuetext` plus a
visible text equivalent — no meaning is carried by bar length or colour alone. Loading uses
`aria-busy` and a polite live region. `:focus-visible` ring from `--focus-ring`.
`prefers-reduced-motion: reduce` removes all animation and transition. Every label at or below
`--text-sm` uses `--text-secondary` (6.08 : 1 light, AA in dark); `--text-muted` is not used on
this screen — see the flag below.

## Flagged — not resolved here

1. **Public sharing of a document.** An إجازة exposes the student's full name, the مُجيز, and the
   full إسناد chain; a شهادة exposes التقدير and النسبة. Whether either may be shared outside the
   institution, and whether a shareable view should redact grades, is policy. Nothing on this
   screen shares; every document offers only view and download.
2. **Announcing a milestone outside this screen.** A first إجازة is a real moment; surfacing it in
   a dashboard, an email, or anywhere another student can see it runs directly into the رياء
   concern. The two milestone marks here are visible only to the student, on this screen.
3. **معدل across a برنامج.** Whether a programme-level average is shown at all, and whether it is
   a mean of level نسب or weighted by مقرر count, is undecided. Each شهادة shows its own النسبة;
   no cross-programme معدل is displayed anywhere.
4. **Tokens this screen wanted and did not find:**
   - **`--text-muted` is not AA-safe at small sizes.** `#82795F` on `--surface-page` is 3.99 : 1
     (light) and `#93876C` on `--surface-card` is 4.16 : 1 (dark) — both under 4.5 : 1 for text at
     12–14px. This screen therefore uses `--text-secondary` everywhere at `--text-sm` and below.
     Either the token needs darkening (light) / lightening (dark), or the system should document
     it as large-text-only.
   - a **document surface** distinct from `--surface-card` — the إجازة cards want a faintly warmer
     paper than a UI card. Approximated with `--ribaat-brown-200` rules and a
     `--ribaat-brown-100` note block.
   - a **dashed rule** border token for empty/awaiting fields (hand-set as
     `var(--border-width) dashed var(--border-default)`).
   - a display size **between `--text-2xl` (36px) and `--text-3xl` (48px)** — the إجازة plate title
     wants ~40px on tablet.
   - the dark layer has **no `--ribaat-brown-300` / `--ribaat-green-300` override**. Both are used
     here as ornamental rules (إجازة card frames, next-مقرر border) and read as bright warm lines
     on dark. Acceptable, but they were designed for light and should get explicit dark values.
   - **no small-size mark.** `assets/logos/ribaat-mark.png` is a 1490×430 lockup (3.5 : 1); inside
     a circular seal well it renders as a horizontal smudge, and forty copies of a full-size
     raster made the screen uncapturable and unprintable. The seals here are therefore nested
     rings drawn from `--ribaat-brown-300`. The system needs a square, single-glyph mark (or an
     SVG) for uses at 32–64px.
   - **no skeleton token** (surface or animation) exists; the loading state reuses
     `--surface-sunken` with a local `@keyframes`.
5. **Whether naming the next مقرر's teacher risks implying an إجازة.** The teacher is labelled as
   the مقرر's teacher, never as a مُجيز, and only مُجيزون of documents actually held are named as
   such. Confirm that reading is right.
6. **The forty-document ceiling.** Collapse handles forty. Beyond a three-year برنامج — a student
   across two برامج, or eighty documents — this screen will want a filter or per-level paging. Not
   designed; flagging before it becomes a real number.

## Content note

Book titles, مُجيزون, dates, grades and counts in the populated states are plausible sample data
for layout review, not real records. The مقررات named in the empty state and المستوى الأول come
from the design system's own examples; the remaining متون and all شيوخ names are placeholders and
should be replaced with real registry data before this ships.
