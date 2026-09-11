# رباط — Public landing page (Django)

Server-rendered Django templates, one vanilla stylesheet, one small vanilla JS file.
No Node, no bundler, no CSS framework, no CDN calls. RTL throughout, Arabic only.

---

## 1. File map

```
ribaat_landing/
├── templates/landing/
│   ├── base.html                  document shell, meta/OG/Twitter, theme bootstrap, font + token links
│   ├── landing.html               extends base; JSON-LD; {% include %} list of the nine sections
│   └── partials/
│       ├── header.html            sticky header, nav, theme toggle, mobile nav
│       ├── hero.html              eyebrow, headline, subhead, two CTAs, fact line
│       ├── about.html             ٠١ التعريف بالمنصة
│       ├── tracks.html            ٠٢ المسارات العلمية  ← primary conversion surface
│       ├── sciences.html          ٠٣ العلوم المقرَّرة
│       ├── how.html               ٠٤ كيف تسير الدراسة
│       ├── faculty.html           ٠٥ هيئة التدريس
│       ├── certificates.html      ٠٦ شهادات الإتمام
│       ├── faq.html               ٠٧ الأسئلة الشائعة (native <details>)
│       ├── cta.html               closing band: ayah + ابدأ الطلب معنا
│       └── footer.html            site footer
└── static/ribaat/
    ├── css/landing.css            the single stylesheet
    ├── css/tokens/*.css           Ribaat Design System tokens (copied verbatim, see §3)
    ├── js/landing.js              theme toggle, header state, mobile nav, accordion, reveal
    ├── fonts/*.woff2              Amiri + IBM Plex Sans Arabic, Arabic + Latin subsets
    └── img/                       logo assets
```

Each section is an independent `{% include %}`; reorder or delete lines in
`landing.html` and nothing else breaks. The only cross-section coupling is the
section numerals (`٠١`–`٠٧`), which are literal text in each partial — renumber
by hand if you reorder.

Wire-up: point a `TemplateView` at `landing/landing.html`, add
`ribaat_landing/templates` to `TEMPLATES['DIRS']` and `ribaat_landing/static`
to `STATICFILES_DIRS` (or move the two trees into an app).

### Hard-coded content
Track cards, sciences, faculty and FAQ entries are written directly in their
partials. To drive them from the database, replace the repeated `<article>` /
`<li>` / `<details>` blocks with a `{% for %}` — the markup inside each is
already uniform.

### Placeholder links
`/register/`, `/login/`, `/student/certificates/`, `/privacy/`, `/tracks/<slug>/`
are literal paths. Swap for `{% url %}` once the routes exist.

---

## 2. Preview

`Ribaat Landing.preview.html` at the project root is a **generated** flat render
of the templates (Django tags resolved, `{% static %}` rewritten to relative
paths) so the page can be reviewed in a browser without a Django server. It is
not a deliverable — do not edit it; edit the templates and regenerate.

---

## 3. Tokens consumed

All token files are copied verbatim from the Ribaat Design System, except
`fonts.css` (url() paths rewritten for the static tree) and `colors-dark.css`
(one addition, below).

| File | What the page uses |
| --- | --- |
| `colors.css` | `--surface-page/card/sunken/brand/brand-strong`, `--border-subtle/default/brand`, `--text-primary/secondary/muted/brand/accent/on-brand`, `--text-link`, `--focus-ring`, `--ribaat-green-100/200/300/700/800/900`, `--ribaat-paper-000` |
| `colors-dark.css` | the whole `[data-theme="dark"]` override set |
| `typography.css` | `--font-display`, `--font-sans`, `--font-mono`, `--text-xs`…`--text-md`, `--leading-tight/normal/relaxed`, `--weight-*`, `--tracking-normal` |
| `spacing.css` | `--space-1`…`--space-16`, `--container-max`, `--container-padding` |
| `effects.css` | `--radius-sm/md/lg/pill`, `--shadow-sm/md`, `--ease-standard`, `--duration-fast/normal/slow` |
| `fonts.css` | Amiri 400/700, IBM Plex Sans Arabic 400/500/600/700 |

### Additions proposed back to the design system

1. **`colors-dark.css` — OS-preference fallback.** The DS file only defines
   `[data-theme="dark"]`. Appended a `@media (prefers-color-scheme: dark)`
   copy scoped to `:root:not([data-theme="light"])` so dark mode is correct
   with JavaScript disabled. (Plain CSS cannot share one declaration block
   across two selectors when one is inside `@media`, hence the duplication.)

2. **`landing.css` — a display type scale.** The DS scale stops at
   `--text-3xl` (48px), which is not enough range for a marketing hero.
   Three fluid steps are defined at the top of `landing.css`:
   `--display-1: clamp(2.5rem, 6.4vw, 5rem)`,
   `--display-2: clamp(1.875rem, 3.4vw, 3rem)`,
   `--display-3: clamp(1.5rem, 2vw, 1.875rem)`.
   Worth folding into `typography.css` if other marketing pages follow.

3. **`--lattice`** — a 45° two-axis hairline pattern built from
   `--border-default`, derived from the angular strapwork of the brand mark.
   Used at low opacity behind the hero, inside faculty photo placeholders, and
   over the closing band. Theme-aware, no image asset.

No other literal colour, spacing, radius or motion values appear in the
stylesheet. The remaining literals are layout geometry only: grid track sizes,
breakpoints (`900px`, `860px`, `760px`, `560px`), hairline widths, icon sizes,
aspect ratios.

---

## 4. Theming

`data-theme` on `<html>`; token overrides only, one stylesheet.

- No attribute → `prefers-color-scheme` decides (works with JS off).
- A 9-line inline script in `<head>`, before the stylesheets, reads
  `localStorage['ribaat-theme']` and sets the attribute before first paint —
  no FOUC.
- The header toggle writes the explicit choice; while no explicit choice is
  stored the page keeps following the OS.
- Neither theme uses pure black or pure white: light page `#FBF9F3`, dark page
  `#201E18`, cards `#FFFEFA` / `#2B2820`.

**Wordmark treatment:** the header and footer use the brand *mark* PNG (olive +
brown, legible on both surfaces) plus the full name set live in Amiri, which
inherits `--text-primary`. This avoids needing a second logo file per theme.
A dark-surface wordmark PNG is still listed in §6 for social/OG use.

**Contrast** (WCAG AA, both themes):

| Pair | Light | Dark |
| --- | --- | --- |
| body text on page | 14.8:1 | 12.3:1 |
| secondary text on page | 6.3:1 | 8.6:1 |
| primary button label on green | 6.9:1 | 5.5:1 |
| text on closing band | 10.1:1 | 6.4:1 |
| badge text on tint | 5.8:1 | 5.1:1 |

`--text-muted` is **not used for text anywhere on this page.** Measured against
the real surfaces it is 4.1:1 on the page and 4.3:1 on cards — under the 4.5:1
minimum for text below 18.66px bold / 24px. Every small label, numeral, caption
and placeholder string that would naturally take it (section numerals, spec-sheet
labels, footer headings, certificate meta, affiliation placeholders) uses
`--text-secondary` instead. Worth raising with the design system: the token is
unsafe at UI label sizes and could use a darker small-text step.

---

## 5. JavaScript & accessibility

`landing.js` is ~4KB unminified, no dependencies, everything optional:

- **Theme toggle** — persists to `localStorage`, follows the OS until an
  explicit choice is made.
- **Header scroll state** — adds `.is-scrolled`; with JS off the header simply
  renders in its scrolled state (`html:not(.js)` rule).
- **Mobile nav** — `aria-expanded` / `aria-controls`, Escape closes and returns
  focus, closes on link activation and on resize past 900px.
- **Accordion** — native `<details>`/`<summary>`, fully operable and announced
  without JS; the script only adds one-open-at-a-time. The open/close
  animation is CSS.
- **Scroll reveal** — `IntersectionObserver`, with a geometry fallback on
  scroll/resize and a short self-terminating poll for embedded viewers that
  do not emit scroll events. Reveal styles are gated behind `html.js`, so
  with JS off nothing is ever hidden.

Other: skip link, semantic landmarks, `h1 → h2 → h3` order with no skips,
`:focus-visible` rings on every interactive element, decorative images
`aria-hidden` with empty `alt`, `prefers-reduced-motion` honoured globally
(one blanket rule) and specifically for reveal and smooth scrolling, all
below-fold imagery `loading="lazy"` with intrinsic `width`/`height` to avoid
layout shift.

---

## 6. Required static assets

Not produced here — placeholders are in place and the page is complete without
them, but these should land before launch.

| File | Size | Purpose | Status |
| --- | --- | --- | --- |
| `img/faculty/<slug>.jpg` | 640×800 (4:5), ≤120KB | Faculty portraits, one per member | **missing** — neutral placeholder blocks render instead; markup is commented in `faculty.html` |
| `img/og-image.png` | 1200×630 | Open Graph / Twitter card | **missing** — meta tags reference it |
| `img/favicon.svg` | any, square | Browser icon | **missing** |
| `img/apple-touch-icon.png` | 180×180 | iOS home screen | **missing** |
| `img/ribaat-wordmark-on-dark.png` | 1490×170, transparent | Light-ink wordmark for dark surfaces and social cards | **missing** — not needed by the page itself (see §4) |
| `img/ribaat-mark.png` | 1490×426, transparent | Brand mark — header, footer, certificate | present |
| `img/ribaat-wordmark.png` | 1490×170, transparent | Wordmark — unused by this page, kept for reuse | present |
| `img/ribaat-logo-full.png` | — | Full lockup — JSON-LD `logo` | present |

I cannot generate photographs. The faculty placeholders are neutral tinted
blocks carrying the lattice pattern; no figurative imagery is drawn anywhere.

---

## 7. Flagged — needs a decision before launch

1. **Digit style.** Arabic-Indic (٠١٢٣) is used everywhere, matching the
   supplied copy: section numerals, step numbers, course counts, the September
   ٢٠٢٦ date. The one exception is the certificate verification number
   (`RB-2026-000184`), which is a Latin-alphanumeric code. Confirm before this
   is applied to the authenticated app too — durations rendered `HH:MM:SS` and
   course counts elsewhere in the product currently use Western digits.
2. **Hijri date.** The September ٢٠٢٦ term start is stated in Gregorian only.
   Should it carry a Hijri equivalent (e.g. ربيع الأول ١٤٤٨)? If yes, decide
   whether it appears in the hero fact line, the FAQ answer, the closing band,
   or all three — the string occurs in all three places.
3. **Faculty photographs.** Uniform studio portraits or mixed sources? The card
   currently assumes a 4:5 crop with `object-fit: cover`. Mixed sources will
   need a tighter treatment (fixed crop guidance, or a flat tint overlay to
   even out backgrounds). Please confirm before the portraits are shot.
4. **Faculty names.** Only two names were available (د. عبد العزيز العيدان,
   د. أنس اليتامى, from the design system's product notes) and their
   specialisations are inferred, not confirmed. The other two cards are marked
   placeholders. Every affiliation line is a placeholder — none was supplied.
5. **Track data is illustrative.** Track names, course counts, durations,
   certificate names and the sample متون listed on each card are plausible
   placeholders drawn from the classical Hanbali curriculum, not the real
   catalogue. Replace with the actual programme before launch.
6. **A second citation was NOT added.** The layout has one scriptural moment,
   in the closing band, as specified. No placeholder was needed.

---

## 8. Arabic copy

Copy supplied in the brief is used verbatim. Every line I wrote is collected in
`arabic-copy-added.md` for review.


---

## 9. Redesign pass — hero + faculty (for review)

The first version of this page was rejected as dull. The diagnosis: restraint with
nothing in it. This pass rebuilds the two sections that carry the page and stops
there, per the brief. Nothing below section 8 supersedes it; the remaining eight
sections are still the earlier version and are **not** part of this review.

### What changed

**A dark ink field opens the page.** `body.page-landing` defines `--ink-bg`,
`--ink-bg-raised`, `--ink-fg`, `--ink-fg-dim`, `--ink-line` from the DS
ink ramp, and the header plus hero sit inside it in both themes. The page opens on
ink and resolves into paper at the faculty section — the tonal shift the brief asked
for, not one flat background.

**The header is static on the landing page, not sticky.** A sticky bar would scroll
across the manuscript plate, which is prohibited outright for Qur'anic material.
`position: sticky` remains the default for every inner page that inherits
`base.html`; only `.page-landing` opts out. **If the hero scan chosen is
non-Qur'anic (a colophon, binding or ijāzah notation), sticky can be restored — say
which and it goes back.**

**Hero is asymmetric and full-bleed.** A 38/62 grid: name, proposition, enrolment
slot and CTAs in the inline-start column, the manuscript plate bleeding off the
inline-end and block-end edges. No centred headline stack. The plate is never
overlaid — the credit line sits in the ink field beneath it, outside the image box.
Nothing is layered on the image at any breakpoint.

**Monumental type.** `رباط الحنابلة` at `clamp(3.25rem, 5.4vw, 6rem)` in Amiri,
set as graphic material rather than a label. The 120px+ setting of the classical
text names (`زاد المستقنع`, `الروض المربع`, `لمعة الاعتقاد`) belongs to
المسارات and is not in this pass.

**Geometry as structure.** Two overlaid hairline squares — the octagram
construction — scale off each empty image field, with an inset frame margin on the
plate in the manner of a manuscript border. A `--strapwork` lattice is also
defined in `landing.css` for section fields. Both are hairline and structural;
neither is spot ornament.

**Faculty is the dominant register.** `المشايخ` is a horizontal scroll-snapped
rail at `min(76vw, 21rem)` per card, 4:5 crop, bleeding to the viewport edge and
aligned to the container edge on the inline-start. It reads correctly at six
portraits and at twenty: the track always scrolls, and the progress rule is
computed from real scroll extent, not a fixed count — it starts at the visible
fraction of the rail and fills to the inline end, so it reports both how much
rail there is and where you are in it. Keyboard: the track itself is
focusable and arrow-scrollable; the two arrow buttons are a mouse affordance and
are hidden on touch. Uniform treatment is applied in CSS
(`filter: grayscale(1) contrast(1.05)`) so mixed source photographs read as a
deliberate set — **do not pre-treat the source files.**

**Enrolment state slot** is now its own partial, `partials/enrolment.html`, driven
by one view-supplied dict (`state`, `label`, `detail`). One footprint
(`min-block-size: 5.75rem`), three appearances via `[data-state]`: filled green
square for `open`, filled brown for `running`, hairline for `upcoming`. The
term status is not in hero copy, so the page does not go stale in October. All three
render in a review strip at the foot of the generated preview; that strip is a
preview artefact and is not in any template.

**Registration handoff, part one.** `data-preload-app` on the hero CTA prefetches
the React entry chunk once, on first hover/focus/touch, at idle priority. Point it
at the real bundle path — `/static/app/main.js` is a guess. The matching auth-screen
background/header and the Ribaat loading treatment are **not** in this pass; they
come with the closing CTA.

### Empty image states

Both the plate and the portrait frames render a designed empty state — ink or
sunken field, octagram construction, dimension note — because **I cannot generate
or source photographs.** The layout is built to receive real files and the
placeholder is what you see until they arrive. Drop the scans and portraits in and
I will wire them; the markup for each is already written and commented in place.

### Assets this pass needs

| Asset | Path | Size | Crop |
|---|---|---|---|
| Hero manuscript scan | `img/manuscript/hero.jpg` | 1600×2000 min | Vertical, dramatic. Illuminated margin, colophon, binding or ijāzah notation preferred. If Qur'anic: āyah boundaries only. |
| Faculty portraits | `img/faculty/<slug>.jpg` | 640×800 | 4:5, untreated, consistent eye line |

Two portraits are now in place: `abdulaziz-al-eidan.jpg` (٠١) and
`anas-al-yatama.jpg` (٠٢). Cards ٠٣–٠٦ still render the placeholder frame.

### Flagged — this pass

1. **Portrait count.** Six cards are in the fixture. The real count is unknown, and
   the rail is built for anything from six to twenty. Confirm the number.
2. **Portrait resolution — needs better files.** The two supplied portraits are
   347×347 and 364×364. The rail renders each card at 336×420 CSS px, so they are
   already being upscaled vertically at 1× and are roughly a quarter of the pixels a
   retina screen wants (672×840). They read acceptably at this size and will look
   soft on a good display. If larger originals exist, they are worth having; if these
   are the only files, the honest fix is a smaller card, which costs the section its
   dominance.
3. **Portrait treatment.** Both are video frames from different rooms — one indoor
   warm, one cooler — so the CSS applies one warm monochrome
   (`grayscale → sepia → saturate → hue-rotate`) to make the set read as deliberate
   rather than assorted. Crop is `object-position: center 22%` to hold the eye line
   as the square source is cropped to 4:5. Both decisions are worth a look at full
   size before more portraits are added, since every later portrait inherits them.
4. **Microphones are in frame** in both portraits. They are consistent with each
   other, which helps, but confirm this is acceptable for the institution's only
   original photography.
5. **Names and ijāzāt.** Only `د. عبد العزيز العيدان` and `د. أنس اليتامى` are
   real, and their specialisation lines are my inference. Cards 3–6 are placeholders
   (`اسم الشيخ`). Every ijāzah line reads `تُدرج الإجازات والمتون المروية هنا` —
   I did not invent scholarly credentials.
6. **Qur'anic manuscript usage.** None yet, because no image is in place. The moment
   a Qur'anic scan is chosen it must be reviewed against the constraints above, and
   the sticky-header decision revisited.
7. **Copy I wrote.** `الفصل القادم` as the label for enrolment state 3 (the brief
   gave the detail line only), and the placeholder strings
   `وصف المخطوط ومصدره` / `تُدرج الإجازات والمتون المروية هنا`.
8. **Manuscript credit format.** The figcaption structure is drafted; the exact QDL
   attribution wording their licence requires needs confirming.
9. **New tokens this pass needed.** None. The ink field, plate, enrolment slot and
   rail are composed entirely from existing DS ramps; `--strapwork` and
   `--display-*` remain the only page-level additions, already listed in §3.

### Rail implementation notes

Three things had to be worked around and are commented in place, so they are not
tidied away by mistake:

- **RTL `scrollLeft` conventions.** Engines report the rail's scroll offset as
  `0..-max`, `max..0` or `0..max`. The code anchors on the resting value at load
  and measures distance from it, so it is correct under all three without probing
  or feature-sniffing.
- **Arrow controls set `scrollLeft` directly.** Under
  `scroll-snap-type: inline mandatory`, animated scrolls (`scrollTo` with
  `behavior: 'smooth'`, or CSS `scroll-behavior`) are dropped and re-snapped to
  the origin by some engines, which leaves the buttons dead. The snap supplies the
  movement.
- **Scroll syncs run directly in their passive listeners, not through
  `requestAnimationFrame`.** Some embedded contexts expose rAF but never invoke
  its callbacks, which silently drops the work and freezes the rule and the arrow
  disabled states during a swipe — the phone's primary way of operating the rail.
  The rail also listens for `wheel`/`touchmove`/`touchend`/`pointerup`/`keyup`
  alongside `scroll`, because `scroll` is suppressed on inner scrollers in some
  of those same contexts.
- **The progress rule is one `inline-size`.** Percentage insets, percentage
  margins and `var()`-driven transforms all failed to apply to that element in
  testing. A single JS-published fraction driving `inline-size` is what survives,
  and it degrades to a full-width rule with JS off.


---

## 10. Full page restored, and the preview's tweaks layer

The review pass deliberately compiled only the hero and المشايخ. The preview now
renders the whole page again, in the brief's order:

| # | Section | Partial | Notes |
|---|---|---|---|
| — | Hero | `hero.html` | ink field, manuscript plate, enrolment slot, CTAs |
| ٠١ | عن المنصة | `about.html` | institutional statement, brief's copy verbatim |
| ٠٢ | المسارات الدراسية | `tracks.html` | numbered editorial index + monumental متون band |
| ٠٣ | العلوم المقرَّرة | `sciences.html` | unchanged from the earlier pass |
| ٠٤ | كيف تسير الدراسة | `how.html` | sticky split, pinned numeral |
| ٠٥ | المشايخ | `faculty.html` | two portraits |
| ٠٦ | تابعنا على قناتنا في يوتيوب | `lecture.html` | title, one line, link out |
| ٠٧ | شهادات الإتمام | `certificates.html` | unchanged from the earlier pass |
| ٠٨ | الأسئلة الشائعة | `faq.html` | brief's six questions |
| — | Closing | `cta.html` | ﴿وَقُل رَّبِّ زِدْنِي عِلْمًا﴾ + repeat CTA |

**المسارات is an index, not a grid.** Numbered rows, the متون listed under each,
one link to the Prospectus. No prices, counts, ratings or badges. The five tracks
and every متن listed are illustrative and marked `is-placeholder`.

**كيف تسير الدراسة** pins a numeral panel with `position: sticky` while the four
steps scroll past; `landing.js` only marks which step is in view, and with JS off
the first numeral shows.

**من دروس المنصة is a facade.** Nothing is requested from youtube.com until the
play control is pressed, at which point the `youtube-nocookie` iframe is created.
`data-video="REPLACE_WITH_ID"` and the lesson metadata are placeholders.

### The hero image

`img/hero/reading.webp` — a student reading in a muṣḥaf, supplied by the school.
Full bleed, full opacity, no tint, no recolouring, nothing overlaid.

The source is landscape (1500×1130) where the plate was drawn for a tall crop, so
the plate geometry changed with it: desktop height `min(64svh, 620px)` instead of
`min(78svh, 720px)`, phone aspect `clamp(280px, 46vw, 560px)`, and
`object-position: 52% 54%` — centre-weighted so the muṣḥaf and the reader stay in
frame together and the open page is never sliced through.

**The muṣḥaf is open in frame, so the Qur'anic-usage constraints apply.** In force
on the page: nothing is layered over the plate at any breakpoint, the script is
never faded, tinted or recoloured, the header on this page is static so no page
furniture scrolls across it, and there is no CTA over the image. **This usage needs
review before launch.** The earlier manuscript-colophon photograph and the drawn
facsimile are both deleted.

### Preview-only tweaks layer

`static/ribaat/css/preview-tweaks.css` + `static/ribaat/js/preview-tweaks.js`
are loaded by the generated preview and by nothing else — no Django template
references them. Three controls, each reshaping the page rather than nudging a
value:

1. **البناء اللوني** — where ink stops and paper starts: `حبرٌ ثم ورق` (the
   design as delivered), `ورقٌ كامل` (the ink field becomes parchment, header and
   hero included), `حبرٌ كامل` (about, مجانية and the lecture go to ink, so only the
   index and the rail stay on paper).
2. **حضور المادة** — how much the imagery and monumental type own: moves the hero's
   text column between 46% and 30%, the portrait card between 17rem and 27rem, and
   the متون band between 0.66× and 1.3×, together.
3. **البنية الهندسية** — `بلا` / `خطوط` / `حقول`: whether the octagram
   construction and the strapwork fields articulate the sections at all.

The chip hides itself while the hero is on screen and returns once the hero has
scrolled past. Every viewport corner is taken up there — the inline-end corners sit
inside the manuscript plate, which nothing may be layered over, and the inline-start
corners sit on the enrolment slot and the CTAs — so standing down is the only
placement that respects the plate. Scroll one screen and it appears.

Every tweak resolves to an existing design-system token; none introduces a colour.
The values live on `<html>` as `data-tone` / `data-material` / `data-geometry`,
and `landing.css` reads `--hero-panel` and `--rail-card` with fallbacks so it
remains complete on its own.

### Flagged — this pass

1. **Qur'anic content in the hero photograph — needs sign-off.** A muṣḥaf is open
   and legible in the frame. The constraints are honoured as listed above, but the
   usage itself is exactly the kind the brief asked to be flagged.
2. **The photograph's credit line is empty.** The caption reads طالبٌ يقرأ في المصحف
   and then a placeholder. If the image is licensed rather than the school's own,
   the credit must name the source, and the licence has to permit this use.
3. **Resolution.** 1500×1130 against a plate of roughly 900×620 CSS px on desktop:
   fine at 1×, soft on a retina display.
4. **Every FAQ answer is mine**, written to the brief's six questions; all six need
   scholarly review. Same for the lesson title and duration in من دروس المنصة.
5. **The tracks and their متون are illustrative.** Nothing in that section is
   confirmed curriculum.
6. **سبتمبر ٢٠٢٦ has no Hijri equivalent** anywhere on the page yet — still open
   from the earlier pass.
7. **العلوم المقرَّرة and شهادات الإتمام are from the pre-redesign pass** and have
   not been reworked to the new register. They are the two weakest sections on the
   page now; say the word and they get the same treatment.


---

## 12. No colour transitions

Every `transition` on `color`, `background-color`, `border-color` or
`background` has been removed from `landing.css` and the preview's tweaks sheet.

Reason: every colour on this page comes from a `var()` token, and tokens are
flipped wholesale — by `data-theme`, and by the preview's `data-tone`. This engine
does not re-resolve a `var()`-driven colour while a transition is declared on that
property; the declaration freezes at its initial computed value. In practice that
left the site header painting ink while its own `--ink-bg` had already resolved to
paper, with paper-white brand and nav text on top of it — unreadable. Same failure
class as `transition: inline-size` on the rail's progress fill (§9), same fix.

Consequence: hover tints change instantly rather than over 120–200ms. That is a
small loss against the design system's motion guidance, and it is the right trade —
a frozen repaint is a broken page, and instant is well within "restrained".
Non-colour transitions (transform, opacity, box-shadow, spacing) are untouched, so
the scroll reveal, the accordion, the pinned numeral and the arrow nudge all still
animate.


---

## 13. Hero rebuilt: the photograph fills the section

The split hero is gone. The photograph now fills the whole section and the copy
sits on an **opaque ink panel** over the inline-start side — a solid surface, not a
translucent scrim, so the image is covered rather than tinted. No gradient, no
blur, no glass.

**The Qur'anic constraints are what fix the composition, not taste.** The muṣḥaf is
open and legible in the frame, so:

- The crop (`object-position: 38% 76%`) places the muṣḥaf in the inline-**end**
  half. The panel occupies the inline-**start** side only, at
  `clamp(24rem, var(--hero-panel, 46%), 40rem)`. Measured at 924px wide: the
  muṣḥaf lands around x 92–323, the panel starts at x 499. Nothing reaches it.
- The credit line lives **inside the panel**, not over the image.
- On phone and tablet the panel drops below the image entirely, so nothing overlaps
  at any breakpoint.
- The header stays static on this page, so no furniture scrolls across the script.

If the crop is ever retuned, the one rule to preserve is that the muṣḥaf stays clear
of the panel's inline extent.

### Video instead of a still

Straightforward: replace the `<img>` in `hero.html` with a muted, looping,
`playsinline` `<video>` using this same file as its `poster`. Same box, same crop
rules, same constraint — and the same question needs answering first, because a
moving image of a muṣḥaf being read is a heavier decision than a still. Say the word
and I will wire it, with `prefers-reduced-motion` falling back to the poster frame.

### Three layout defects found and fixed here, worth recording

1. `min-block-size` on the hero pinned its single grid row, so when the panel's
   content exceeded it the negative free space **overlapped the rows**. Now
   `grid-template-rows: minmax(min(84svh, 880px), auto)` — at least that tall, and
   free to grow.
2. The panel as a grid with `align-content: center` never contributed its real
   content height to that `auto` track. It is a **flex column** with
   `justify-content: center`, whose intrinsic height does include its items.
3. **`--space-7` does not exist in this design system.** The scale runs
   1,2,3,4,5,6,8,10,12,16,20,24. `gap: var(--space-7)` was therefore invalid, the
   gap collapsed to `normal`, and `align-content: normal` then stretched the auto
   rows until items overflowed their own tracks. The panel now uses
   `gap: var(--space-8)` with `align-content: start`. Worth knowing before writing
   any new spacing in this project.


---

## 14. Hero: full-bleed image, copy on top

The image now fills the section from edge to edge and the copy sits on top of it.
Legibility comes from `.hero__scrim`: a solid layer of `--ink-bg` whose **mask**
does the fading, so the tint is one design-system colour at varying coverage — not
a hue-shifted gradient, no blur, no glass.

**Where the scrim stops is a constraint, not a taste call.** The muṣḥaf is open and
legible in the frame, and the script may not be covered, shadowed or tinted:

- Desktop: the hero is wider than the source's 4:3, so `object-fit: cover` scales
  to width and the muṣḥaf's horizontal position is **fixed** at roughly 10–35% from
  the inline-end edge whatever the viewport. The scrim's mask reaches full
  transparency at 58% from the inline-start edge — x≈388 at a 924px viewport,
  x≈605 at 1440px — while the muṣḥaf ends around x≈330 and x≈504 respectively. It
  clears the script at every desktop width, and the copy column
  (`clamp(24rem, var(--hero-panel, 46%), 42rem)`) sits inside the fully opaque end.
- Phone and tablet: a portrait hero crops the source horizontally, which would move
  the muṣḥaf unpredictably, so the crop (`object-position: 74% 42%`) deliberately
  puts it **out of shot**. No Qur'anic script is visible at those widths, and the
  copy sits over the reader behind a block-end scrim.
- The credit line stays inside the copy block. The header stays static.

The material-presence tweak moves the scrim with the copy: `مقتصد` extends it to
66%, `طاغٍ` pulls it back to 48% so more of the photograph reads. Both still end
short of the muṣḥaf.

**If the crop or the mask is ever retuned, re-check that clearance first.** It is the
one measurement on this page that is a review condition rather than a preference.


---

## 15. Hero video

The hero background is now the school's own lecture footage —
`static/ribaat/video/hero-loop.webm`, a **7-second loop at 854×480, 26 KB**, cut
from `uploads/videoplayback.mp4`. It is the
institution's own material, which is worth far more than any sourced image, and it
resolves the constraint problem: **no Qur'anic script is in frame** — the shaykh
reads from a tablet — so the strict no-overlay rules that governed the muṣḥaf still
do not apply. The composition still keeps the subject clear: the copy and the opaque
end of the scrim sit over the carved panel on the inline-start side.

**How it loads.** The poster still paints first and carries `fetchpriority="high"`.
Nothing about the video is fetched until the window has **loaded**, then only when
the browser is idle, and then only if the hero is in view — `preload="none"` alone
is not enough, because assigning `.src` starts the fetch, and doing that at
DOMContentLoaded holds the load event open behind the footage (it made the page
unreviewable once). `landing.js` also only starts it when motion is welcome and the
connection can carry it — `prefers-reduced-motion`, `saveData` and 2G all skip
it entirely, and it fades in on `playing`, so a refused autoplay leaves the poster
standing. It is `muted loop playsinline`, `aria-hidden`, `tabindex="-1"`, and
`preload="none"` so nothing is fetched before that decision is made.

### How the clip was made, and what to redo properly

The supplied file was **10.9 MB and 173 seconds** — a whole lecture. Loaded as a
background it kept the page from ever reaching `load`, which made the design
unreviewable, so I cut a loop from it here: 7 seconds from around 0:03, redrawn to a
canvas and re-encoded to VP8 WebM at 854×480. The 10.9 MB MP4 is **no longer in
`static/`**; the master stays at `uploads/videoplayback.mp4`.

Redo the encode properly before launch:

1. **Cut from a higher-resolution master.** The supplied file is 854×480, and my
   loop cannot be better than its source. That is soft for a full-bleed hero above
   roughly 1200px of viewport width — the scrim hides much of it, not all.
2. **My re-encode shifts the colour slightly** (a washed, desaturated cast against
   the original's warmth — a VP8 BT.601/709 mismatch from the canvas round-trip).
   A real `ffmpeg` cut of the same seconds will not do this.
3. **Ship two sources** — WebM/AV1 plus H.264 MP4 — for Safari coverage, at roughly
   1–2 MB each, and export the poster from the same encode. The current poster
   (`img/hero/lesson-poster.jpg`, 854×480, 53 KB) is a clean decode of frame 0.4s of
   my loop, so the still and the footage match exactly with no visible swap.

The earlier muṣḥaf still (`img/hero/reading.webp`) is no longer referenced. It is
left in place in case the still is wanted back; if it returns, §14's clearance
measurements apply again.

**The footage identifies itself.** Its lower third reads «فضل العلم» — الشيخ د. أنس
اليتامى, which matches the school's own faculty listing (إمام مسجد العجيري بقرطبة),
so the hero credit now carries real attribution instead of a placeholder. Only the
recording date is still unknown.

The preview's asset URLs now carry a `?v=` stamp, because a stale cached
`landing.js` masked this whole problem for one round of review.

---

## 16. Real facts recovered from the school's own sites

Read from `ribat-hanbali.com` (the school's site) and `ribaat.net` (the platform).
**Two of these make copy currently on the page factually wrong.** I have not
rewritten those sections yet — say the word and I will.

### Corrections needed

- **Fees — resolved.** The page used to say "لا رسومَ تسجيل، ولا اشتراكات، ولا مقرراتٍ
  مدفوعة", which overstated it: the school's own answer is narrower — registration is
  free, **but the student buys the course books**, sold at دار ركائز للنشر (الوقفية)
  in حولي. That second sentence has since been cut on the user's instruction, so the
  section now states only الدراسة في رباط الحنابلة مجانية بالكامل. Whether the book
  cost should be stated somewhere on the page is still open.
- **Structure.** The page presents five invented مسارات. The real curriculum is
  **three المراحل**: الأولى (فصلان دراسيان) — ثلاثة الأصول، القواعد الأربع، نواقض
  الإسلام، أخصر المختصرات، شرح متن الورقات، الأربعين النووية، منحة الوهاب بشرح فصول
  في الآداب؛ الثانية (أربعة فصول) — كتاب التوحيد، العقيدة الواسطية، الإفادات شرح
  أخصر المختصرات، السبك الأحمد شرح مختصر ابن المبرد، الفتوحات الربانية لشرح الدرة
  المضية؛ الثالثة (أربعة فصول) — الدلائل والإشارات شرح أخصر المختصرات، حلية الأصول
  شرح غاية السول.

### Facts worth putting on the page

- **The institution.** تابعة لـمركز ركائز للدراسات والبحوث, a waqf research centre,
  licensed by وزارة الإعلام (ملف ٥٥٢), وزارة التجارة (سجل ٤٧٨٩٩١) and
  وزارة الأوقاف (ترخيص ٢٠٢٣/٣٣٧٥٠). This is the strongest credibility material on
  either site and the page currently omits it.
- **How study actually runs.** Two evenings a week (السبت والثلاثاء), after Maghrib
  and after Isha; a 12-week term and a summer term of up to 4 weeks; at
  مسجد العجيري (قرطبة) and مسجد عبدالله بن مسعود (العديلية); a weekly revision slot
  with a مشرف علمي; periodic and end-of-term exams; minimum age 15. Attendance is
  required of in-person students. This is much more concrete than the four generic
  steps now in كيف تسير الدراسة.
- **Remote study exists** and is aimed at students outside Kuwait, at women, and at
  those who cannot travel — recorded lessons on YouTube/Telegram plus the same
  exams, and the certificate states حضوري or عن بعد.
- **The two shaykhs, with real affiliations.** د. أنس بن عادل اليتامى — إمام مسجد
  العجيري بقرطبة. د. عبدالعزيز بن عدنان العيدان — إمام مسجد عبدالله بن مسعود
  بالعديلية. The faculty rail's caption lines can stop being placeholders.
- **Real lessons for من دروس المنصة**, with the platform's own durations:
  الرغيد شرح كتاب التوحيد (د. عبد العزيز العيدان، ٢٠:٠١:٠٠)، الإفادات شرح أخصر
  المختصرات (د. أنس اليتامى، ١٩:١١:٠٠)، شرح نخبة الفكر في مصطلح أهل الأثر
  (٠٦:١٨:٠٠).
- **The platform's own three claims**: إجازة بالسند المتصل · مدرسة شرعية تأصيلية ·
  مناهج علمية محررة.
- **Real destinations** for the CTAs and footer, replacing my placeholder paths:
  `ribaat.net/student/sign_up`، `/student/login`، `/student/certificates`،
  `/courses`. Contact: ribat.hanbali@gmail.com، واتساب ٩٦٥٦٦٩٤٣٣٦٤+، and the
  YouTube/Telegram/Instagram/X channels under `ribat_hanbali`.

### Still unconfirmed

**سبتمبر ٢٠٢٦ is not stated anywhere on either site** — the school says only
"يتم الإعلان عن بداية الفصل ونهايته في موقع المدرسة". The hero's dated enrolment
state rests on the brief alone and needs confirming before launch.


---

## 17. Chevron direction audit

Every chevron on the page was pointing the wrong way. All three derive from the same
glyph — a square carrying its `border-block-end` and `border-inline-start` — whose
bordered corner points block-end + inline-start: **south-east in RTL** (inline-start
is the right edge) and south-west in LTR. The rotation needed to swing that corner
onto the inline axis is therefore different per direction and cannot be shared
between them, which is what the old values assumed.

Measured as compass bearings (clockwise from east, and CSS `rotate` adds
clockwise):

| glyph | was (RTL) | rendered | should point | now |
|---|---|---|---|---|
| `.arrow` (index / link / track "go") | `-45deg` | east — right | **west — left** | `135deg` |
| `.rail__chev--next` (التالي) | `-45deg` | east — right | **west — left** | `135deg` |
| `.rail__chev--prev` (السابق) | `135deg` | west — left | **east — right** | `-45deg` |

The LTR overrides were worse — they resolved to north and south, i.e. chevrons
pointing up and down. They are now `-135deg` forward and `45deg` backward. The page
ships RTL-only, but the base template's shell is meant to be inherited, so leaving
broken LTR values in place would have propagated.

The rule, recorded in the stylesheet:

    forward (with the reading direction)   RTL → 135deg    LTR → -135deg
    backward (against it)                  RTL →  -45deg   LTR →   45deg

In Arabic, forward is left. السابق moves back toward the rail's start, which in RTL
is its right edge.

**Two marks are intentionally exempt.** The FAQ `+`/`−` sign is two bars and has no
direction. The facade's play triangle points right in Arabic interfaces as it does
anywhere else — playback is a transport metaphor, not reading order — so it is now
defined once with physical properties (`border-left` makes a right-pointing
triangle) and no `[dir]` override. It previously used logical borders plus a
`scaleX(-1)` flip that cancelled out to the same glyph, and would have silently
reversed if either half were edited.


---

## 18. من دروس المنصة now links to the YouTube channel

The section no longer embeds a single lesson. The whole panel is one link out to
`youtube.com/@ribat_hanbali`, the school's own channel.

This simplifies the section rather than complicating it. The old facade existed only
to keep youtube.com out of the page until a visitor pressed play; with a channel link
there is no player and no iframe at any point, so **nothing is fetched from YouTube
at all**. The click-to-load module is gone from `landing.js`, and so are the two
placeholders it needed: the `REPLACE_WITH_ID` video id, and the invented lesson
title and duration that README §10 flagged for review.

The still behind the panel is a frame of the school's own footage, under a solid ink
cover at fixed opacity — coverage, not a hue-shifted wash, the same vocabulary as the
hero scrim. **The copy sits at the panel's block-end for a specific reason**: the
footage has the school's watermark burned into its inline-start top corner, spelling
the same words as the panel's title, and a cover darkens mark and type equally, so at
block-start the two interleaved. If the crop ever changes, keep the copy clear of
that corner. The caption states what the channel is for, taken from the school's own
FAQ: lessons are published to YouTube and Telegram for revision and catching up.

Open questions: whether a specific playlist would serve better than the channel root
(the channel has no single "start here" ordering), and whether the Telegram channel
named in the caption should be a link too.


---

## 19. Enrolment state as a tweak

The tweaks panel has a fourth group — now framed as the school year rather than the
slot alone (see §21) — switching the hero in place between the three phases. The copy is the brief's,
verbatim. Measured across all three: same footprint (369×96 at desktop) with only the
mark and the two text lines changing — green disc for open, brown for a term in
progress, hollow ring for a future term. It also writes `data-enrolment` on
`<html>`, so section-level copy can key off the state later without more JS.

The review strip at the foot of the preview still shows all three side by side. The
two answer different questions: the strip is for comparing the appearances, the tweak
is for judging one of them in its real setting, over the footage, next to the CTAs.

**One decision this surfaces, which I have not made.** In state 2 (الفصل جارٍ) and
state 3 (الفصل القادم), enrolment is not open — but the hero's primary CTA still
reads ابدأ التسجيل and still points at the registration app. The brief specified three
appearances for the slot and said nothing about the CTA, so I have not touched it.
Three plausible answers: the CTA keeps its wording and the app explains the term is
closed; it becomes a secondary action (تصفّح المسارات promoted to primary); or it
switches to a notify-me action, which would need a new endpoint. Worth deciding before
launch, since the page will sit in state 2 for most of the year.

Both tweak layers stay out of the Django templates: `preview-tweaks.css` and
`preview-tweaks.js` are injected only by the preview compile.


---

## 20. Sticky header, and section subtitles under their titles

### The header sticks now

It was pinned static for one reason: a sticky bar may not scroll across Qur'anic
script, and the hero used to carry an open muṣḥaf (§14). The hero is now the school's
own lecture footage with no script in frame (§15), so the ban lifts. **If a Qur'anic
still ever returns to the hero, the header must go back to static** — the rule says so
where it lives.

It has two appearances, and the flip is measured from the hero's own bottom edge
rather than a fixed scroll offset, so it lands exactly as the bar leaves the footage:

- over the hero — the ink field it already belonged to: `#211F19` with `#FBF9F3`
  brand text, no hairline
- past the hero — the page surface: `#FBF9F3` with `#211F19` brand text,
  `#635C48` nav links and a `#E2DAC5` hairline

One trap worth recording: the paper-state rules must not group their selectors in
`:where()`. It contributes no specificity, which tied the theme-toggle rule at
(0,3,0) with the ink-field rule further down the sheet — the toggle kept its ink
colours on paper and its icon sat at 1.74:1, below the 3:1 a non-text control needs.
Written out, the selectors reach (0,4,0) and win. Same trap would have hit
`.nav-toggle`, which is the only way into the menu on phone.

Instant, not transitioned, per §12. Driven by the same belt-and-braces set as the
rail — an IntersectionObserver on the hero's boundary plus
`wheel`/`touchmove`/`keyup`/`resize`/`scroll` — because scroll events are suppressed
in some embedded contexts. Without JS the class never arrives, so the bar simply does
not stick and stays in its ink colours over the ink hero; nothing is lost.
`scroll-padding-block-start: 6rem` keeps in-page anchors clear of it.

### Section heads stack

The section title and its lede were side by side in two columns on desktop. They now
stack at every width, so the subtitle reads directly under its title — applied to all
five sections that use the pattern (about, tracks, sciences, faculty, lecture),
measured at a 20px gap with both edges aligned to the same inline-start. The lede's
own `--measure` still governs line length, and the head block is capped at 62rem so
it does not run the full page width.


---

## 21. The tweak is the school year, not just the slot

The fourth tweak group is **زمن الفصل الدراسي**: قبل البداية · أثناء الفصل · بعد
الانتهاء. It still drives the three enrolment states, but it is labelled by the phase
of the year, because that is the question being asked of the page — what does this look
like in September, in November, in June.

Each phase now moves two things:

| phase | slot | primary action |
|---|---|---|
| قبل البداية | التسجيل مفتوح — يبدأ الفصل الدراسي في سبتمبر ٢٠٢٦ | ابدأ التسجيل |
| أثناء الفصل | الفصل الدراسي جارٍ — يُعلَن عن التسجيل للفصل القادم في حينه | تصفّح المسارات |
| بعد الانتهاء | الفصل القادم — يبدأ التسجيل للفصل القادم في ١ يوليو ٢٠٢٧ | تصفّح المسارات |

Measured across all three: the slot holds one footprint (369×96) and the action row
holds one height (59px), so nothing reflows between phases — only the mark, two lines
of copy, and which button is filled.

**The action swap is my proposal, not received copy, and needs your decision.** §19
raised it as an open question; this makes it visible instead of theoretical. It
invents no new text — both ابدأ التسجيل and تصفّح المسارات already exist in the hero,
and the phase only decides which one is filled and which is outlined. The alternatives
remain: leave ابدأ التسجيل primary in every phase and let the app explain that the term
is closed, or add a notify-me action, which would need an endpoint that does not exist
yet. The page will sit in أثناء الفصل for most of the year, so this is worth settling
before launch.


---

## 22. One note on the fee statement's punctuation

The sentence now reads, verbatim as given:

> الدراسة في رباط الحنابلة مجانية بالكامل٫

The final character is **U+066B ARABIC DECIMAL SEPARATOR** (٫), not a full stop. It
is set as received and not corrected. If a sentence end was intended, it should be
either "." or the Arabic comma "،" — worth a glance before launch, since a decimal
separator will read as a typo to an Arabic reader and screen readers announce it
differently.


---

## 23. Four content edits from review

All four are the user's instructions, applied as given.

1. **مجانية بالكامل** — the second sentence is cut; the statement is now
   الدراسة في رباط الحنابلة مجانية بالكامل٫ alone. This also settles the accuracy
   problem from §16 (the school does charge for books), though whether the book cost
   should be stated anywhere is still open. See §22 on that final character.
2. **من دروس المنصة → تابعنا على قناتنا في يوتيوب** — the panel, the still and the
   play control are gone. The section is now a title, one factual line about where
   lessons are published, and the link out. It carries no media, fetches nothing
   from YouTube, and the whole `.facade` block (about 3,200 characters of CSS,
   including the play triangle audited in §17) has been deleted rather than left
   dead. The section keeps `id="lecture"` so existing anchors still resolve; its
   class is now `.section--channel`.
3. **شهادات الإتمام** — the sentence now reads "عند إنهاء بعض المقررات" rather than
   "كل مقرر", which is a meaningful narrowing: not every course issues a
   certificate.
4. **الاستعلام عن شهادة** link removed from that section. The route is still reachable
   from the footer, so the page has not lost it — worth confirming that is where you
   want it.


---

## 24. The review strip (removed — see §30)

Each of the three cases in the strip at the foot of the preview is now a button that
applies itself to the hero, and the panel group and the strip stay in step whichever
one you use — the active case is outlined and labelled الحالة المعروضة الآن, the
matching panel radio re-checks itself, and clicking takes the view back to the hero,
where the change shows.

That answers the same question two ways on purpose. The strip is for comparing the
three appearances against each other; the panel group is for setting a phase and then
reading the whole page in it. Both are preview-only — neither the strip nor the tweak
layer is in the Django templates.


---

## 25. Name and slogan

The name is **رباط الحنابلة** throughout — header brand, footer, certificate specimen,
legal line, `og:site_name`, and the JSON-LD organisation. The old
منصة رباط الحنابلة التعليمية appears nowhere.

The slogan is **مدرسة شرعية تأصيلية**, and it replaces the hero eyebrow, which is the
tagline slot on this page. Note it displaces الكويت from that line; the country is
still stated in the footer and in `og:locale`, so it has not been lost.

One place I joined the two rather than choosing between them: the document title and
the og/twitter titles read **رباط الحنابلة — مدرسة شرعية تأصيلية**, because a bare name
in a search result or a shared link says very little. It is also in the JSON-LD as a
proper `slogan` field. Say the word if you want the title to be the name alone.


---

## 26. The متون band is gone

Removed on request: the monumental type band that closed المسارات
(زاد المستقنع · الروض المربع · لمعة الاعتقاد at ~124px). Its markup, its CSS block,
the `--matn-scale` variable and the three tweak-layer rules that styled it are all
deleted — nothing dead left behind. The `.index__matn` lists inside each index row
are a different thing and stay.

It was the page's one instance of type-as-image, which the brief asked for, so
المسارات now ends on the index itself. Two consequences worth knowing: the section is
plainer than the brief intended, and the material-presence tweak's طاغٍ setting has
less to act on — it now moves the hero and the portrait rail only. If the section
wants weight again, the honest version would use real متون from the actual three
مراحل (§16) rather than an illustrative set.


---

## 27. The tracks index is now an accordion

Each row is a native `<details>`: closed it shows the numeral and the track name with
a ± mark; open it shows the متون and the link to the Prospectus. Measured at 134px
closed and 386px open, five rows, one open at a time.

Three details worth recording:

- **The heading is the summary's only child.** `<summary><h3>…</h3></summary>` is the
  one arrangement that keeps both the document outline (h2 → h3) and a valid summary
  content model, so the row grid lives on the `<h3>` rather than on the summary.
- **The link moved into the panel.** It used to be on the title; a link inside a
  summary nests one interactive element in another, which breaks keyboard and screen
  reader behaviour. The summary is the only control in the closed row now.
- **The accordion module handles both groups.** It used `querySelector`, so with two
  accordions on the page (tracks and FAQ) only the first would have had
  one-open-at-a-time — and the tracks index comes first in the DOM, so the FAQ would
  have quietly lost it. It is `querySelectorAll` with a per-group closure now.

Works with JS off: native `<details>` still opens, and the only thing lost is the
one-open-at-a-time behaviour. The ± mark matches the FAQ's, since both are accordions
and should read the same.

**What is inside the panel is still illustrative.** It is the same متون list that was
in the row before, and the five مسارات remain invented — the school teaches three
المراحل (§16). The accordion makes the shape right; the content still needs replacing,
and a real panel would carry the courses, the prerequisites and the term count.


---

## 28. A stylesheet duplication, and how to avoid repeating it

When the accordion block replaced the old index block, the edit cut from the index
comment to a `/* --- Sciences --- */` marker that sits **earlier** in the sheet than
the index rules. The end offset was therefore lower than the start, and the slice
re-appended a 16,380-character region: everything from Sciences to the old index
block appeared twice, and the stale `.index__row { display: grid }` — later in the
file — won. The result was a row 64px wide with the track name crushed to zero width.

The duplicate span has been removed, verified three ways: every section marker now
appears exactly once, braces balance at 327/327, comments at 57/57, and
`.index__go` (which no longer exists in the markup) is gone from the sheet. The
stylesheet is 992 lines, down from 1,346.

Measured after the fix at 924px: `.index__row` is `list-item` with no grid, the
title's grid is `64px 750px 14px`, the track name is 750px wide, and an open panel
spans the full 876px row with a 64px inline-start indent.

**The lesson for future edits to this sheet:** never slice between two markers without
asserting the end offset is greater than the start. The section comments are not in
the same order as the page.


---

## 29. Two more removals

**مجانية بالكامل is gone** — the include, the partial, its CSS block and the four
tweak-layer rules that referenced it. Nothing dead left: `free` appears nowhere in
the templates or the stylesheets. The page is 11 sections.

Worth being explicit about what left with it: the page **no longer says anywhere that
study is free**. That was one of the two propositions the brief opened with. It is
still in the meta description and the JSON-LD (`isAccessibleForFree: true`), but not
in anything a visitor reads. If that is deliberate, fine — if not, the natural home is
one clause in عن المنصة or a line in the FAQ, which already answers
هل الدراسة مجانيةٌ حقًّا.

**المشايخ now follows the section shell exactly** — the hairline divider is back and
the block padding is the standard `clamp(56px, 8vw, 112px)` instead of
`clamp(64px, 9vw, 128px)`, so it sits in the same rhythm as every other section.


---

## 30. The review strip is gone

Removed on request: the three enrolment states are switched from the tweaks panel, so
a static strip repeating them at the foot of the page was a second answer to the same
question. Its markup no longer comes out of the preview compile, its
click-to-apply code is out of `preview-tweaks.js`, and its styles are out of both
stylesheets — including the `.states` block that had been sitting in the **shipped**
`landing.css` even though it was only ever a preview artefact. That was the right thing
to take with it.

What this costs: the three states can no longer be compared side by side, only viewed
one at a time in place. If a side-by-side view is ever wanted again for a review
conversation, it belongs in a separate file rather than at the bottom of the page.

The preview now differs from the Django page in exactly one way — the tweaks panel.


---

## 31. منصة → مدرسة, and the certificate lookup

**Every visible منصة is now مدرسة**, which follows the school's own register — it calls
itself مدرسة شرعية تأصيلية, and رباط الحنابلة is a school, not a platform. Changed:
عن المدرسة (section heading and footer link), تشمل الدراسة في المدرسة,
تُصدر المدرسة شهادةَ إتمامٍ, the FAQ's اختبار المقرر في المدرسة, the footer's المدرسة
column heading, رباطُ الحنابلة مدرسةٌ تعليميةٌ in the opening statement, and the meta
description and JSON-LD description. Nothing reads منصة anywhere in the templates now.

One knock-on worth raising: the site is deployed at **ribaat.net** and the product it
belongs to is the platform. If any surface outside this page (the app shell, emails,
the certificate PDF) still says منصة, the two will disagree — worth a sweep there too.

**الاستعلام عن شهادة is removed entirely**, from the footer as well as from شهادات
الإتمام where it went earlier. The route `/student/certificates/` is no longer linked
from this page at all. It exists on the live platform, so if a visitor is meant to be
able to verify a certificate without logging in, this page currently gives them no way
to reach it.


---

## 32. The hero video's load gating, fixed properly

The footage was not loading at all in review: `networkState` 0, no `currentSrc`, the
poster standing in for it. The gating chain depended on two callbacks that **exist but
never fire** in some embedded hosts — `requestIdleCallback` and
`IntersectionObserver` — so the fallbacks written as `if (window.requestIdleCallback)`
and `if (!('IntersectionObserver' in window))` were dead code in exactly the host that
needed them. This is the third time the same trap has caught this page: rAF callbacks
never invoked, then document scroll events suppressed (§12), now these.

**The rule for this codebase: race the mechanisms, never feature-detect them.** Both
layers now do:

- **Starting the load** — `requestIdleCallback` *and* an 800ms timer; an immediate
  `getBoundingClientRect` in-view test alongside the observer; a 1,500ms backstop; and
  a 2,500ms timer in case the `load` event itself never arrives (it may also have
  fired before the deferred script attached). `start()` guards on `v.currentSrc`, so
  being called three times over is harmless.
- **Revealing it** — `playing` alone was not enough either; the same hosts swallow
  media events, which left the clip decoding invisibly behind the poster at
  `opacity: 0`. It now reveals on `playing`, `canplay`, `loadeddata` or
  `timeupdate`, plus a 250ms poll on `readyState >= 2` that clears itself.

Verified after the fix: `readyState` 4, `data-ready` set, `opacity: 1`, playing at
854×480, no media error. The reduced-motion, `saveData` and 2G opt-outs are untouched —
those are decisions, not callbacks, so they still short-circuit before any of this runs.


---

## 33. كيف تسير الدراسة: the step layout was measuring the wrong thing

Each step's description was rendering in a 92px track, about ten characters a line,
and the four steps had wildly unequal heights (79 / 105 / 79 / 158px). The
three-column step layout — 3rem numeral, 15rem title, 1fr description — was gated on
`@media (min-width: 900px)`, but the steps do not live at viewport width: they sit in
the 428px column that the sticky figure leaves behind. 48 + 240 + two 24px gaps left
92px for the text.

It is now a **container query on `.split__steps`** (`@container (min-width: 44rem)`),
so the three-column form appears only when the steps column itself can hold it — at a
1200px wrap that column is ~752px and the form applies; at 924px it stays stacked.
Measured after the fix at 924px: each step is `32px 372px`, every description runs on
one line at 372px, and the four steps are 111 / 111 / 111 / 112px tall.

Where container queries are unsupported the stacked form stands, which is the correct
narrow layout anyway — so this degrades rather than breaking.

**The general point, and it is the same one as §32 and §28:** a media query asks about
the viewport. If what constrains an element is a column inside the page, the viewport
is the wrong thing to ask, and the answer will be right at the width you tested and
wrong everywhere else.


---

## 34. The hero video: two separate faults, both now understood

The clip failed twice for reasons that looked identical from the outside and were not.

**Fault one — the file.** The 7-second `hero-loop.webm` I cut with `MediaRecorder` +
`canvas.captureStream()` has no Duration in its Segment Info and no Cues. It decoded in
the iframe that produced it and stalled at `HAVE_NOTHING` elsewhere, with
`duration: null` and no error event — proven by feeding the same 26,207 bytes to a
fresh element through a blob URL, where it also refused. **Decodability of a
MediaRecorder capture is engine-dependent, so it can never be a shipped asset.** It has
been deleted. The source is now `hero.mp4`, the school's own recording, which is the
only properly muxed encode available here.

**Fault two — the server.** With the good file in place the element still sat at
`readyState 0`. The preview's static server **ignores Range requests**: a
`Range: bytes=0-1023` returns `200` with no `Accept-Ranges`, no `Content-Range` and
no `Content-Length`. A `<video src>` cannot build a playable buffer from a plain
unknown-length response, and again fails silently with `v.error === null`. The same
bytes fetched whole and handed over as a blob reach `readyState 4` at 854×480
immediately.

`landing.js` therefore has one more fallback: if nothing has decoded three seconds
after the src is set, fetch the asset once and swap in a blob URL — followed by
`v.load()`, without which a stalled element ignores the new src entirely. On a
correctly configured server (WhiteNoise, nginx) this never fires. Verified after the
fix: `readyState 4`, 854×480, `data-ready` set, `opacity: 1`.

A media fragment (`#t=0,8`) was tried to limit the transfer and made things worse — it
forces an opening seek that this serving layer answers in a way the decoder never
recovers from. The 8-second loop is enforced in the `timeupdate` handler instead, which
needs no seek.

### Still the launch blocker it was in §15

The live asset is 10.9 MB and 173 seconds, and the blob fallback means a browser on a
range-less server downloads all of it. **Cut it properly before launch:** an `ffmpeg`
trim of `uploads/videoplayback.mp4` to the same opening ~8 seconds, emitted as H.264
MP4 **and** a WebM with duration and cues written, both listed as `<source>` elements,
at roughly 1–2 MB each. At that size every one of these fallbacks stops mattering.


---

## 37. Tablet and phone, designed rather than inherited

Measured in real device-width frames (390, 834, 1024) rather than by narrowing the
desktop window, because several of this page's layouts are driven by container width,
not viewport width (§33).

**Tablet portrait, 600–899, was the neglected band** — it was being served the phone
hero at twice the width. At 834px the lede ran to a ~780px measure, the two hero
buttons stretched to 385px each, and the enrolment card sat at 400px agreeing with
neither. Now:

- hero copy is inline-start aligned with a 32rem measure, and the card/button pair
  uses the same width-binding mechanism as desktop (§35) — measured 349px each, all
  edge deltas 0
- the متون panel indents to the track name (3.5rem) as it does on desktop
- the sticky split figure appears from 700px, not 900px, at a 14rem column instead of
  desktop's 24rem, so the steps keep a workable measure beside it
- the certificate specimen sits beside its text from 720px

**Phone (≤599)** keeps the layout it had — copy over a block-end scrim, full-width
stacked actions, one portrait plus a peek of the next. What was wrong there was touch,
not layout.

**Hit areas are now a pointer question, not a width question**:
`@media (max-width: 899px), (hover: none), (pointer: coarse)` — an iPad in landscape
is 1024px wide and still a finger. The theme and menu toggles were 40px (the menu
toggle is the only route into the nav below 900px); footer nav links were 21px tall,
and `min-block-size` does nothing to an inline box, so they become `inline-flex`.
Prose links in the legal line are left alone — they are not navigation.

Verified at all three widths: no horizontal overflow, no control under 44px on phone
or tablet portrait, and the harness (`scraps/responsive-harness.html`) is kept for
re-checking after layout changes.

## 43. A theme switch, at last — and why the head script is inline

§42's note that "there is no switch" no longer holds: the header has one. The dark
token set was already complete (`colors-dark.css` covers both the `[data-theme]`
scope and `prefers-color-scheme`), so this pass added only the control, not a
palette.

Three pieces, all in the shared shell, so every page that includes the header gets
it — landing, privacy, and anything built on `page.html`:

- **`base.html`** — the inline `<head>` script now also reads `localStorage
  ribaat-theme` and sets `data-theme` on `<html>` before the stylesheets load.
  It must stay inline and stay in `<head>`: deferred or external, the page paints
  light first and flashes. It is wrapped in try/catch because blocked storage
  should fall through to the OS setting, not throw.
- **`header.html` + `.theme-toggle`** — a 40px button matching `.nav-toggle`,
  carrying both a sun and a moon. **Which icon shows is decided in CSS, not JS** —
  `[data-theme="dark"]` and the `prefers-color-scheme` block each flip the pair —
  so the icon is correct at first paint with no script. The button is
  `display: none` under `html:not(.js)`, since without JS it cannot do anything and
  the OS setting is already being honoured.
- **`landing.js`** — click handler, storage write, and the accessible label. The
  label names the state the button moves *to* (الوضع الداكن on a light page): it is
  an action. `aria-pressed` tracks the current state. If the reader has never
  chosen, an OS change still repaints and the label follows it live.

The switch is also added to the ink-field header rules, so it takes ink colours
over the hero and paper colours past it, like the sign-in button beside it.

The theme block's state updater is named `syncTheme`, not `sync`. The header
block further down declares its own `var sync` inside the same IIFE, and `var` is
function-scoped — the later declaration silently overwrote the theme one, so every
click repainted the page (CSS) but called the header's scroll sync, leaving the
button announced as "switch to dark, not pressed" in dark mode. Screenshots pass
that bug because the icon swap is CSS-driven. Keep names in this file unique.

One thing JS does have to maintain: the two media-scoped `<meta name="theme-color">`
tags only track the OS, so once an override is set they are stale. The handler
writes the resolved colour into the first of them.

Both generated previews carry the switch. `landing.css`/`landing.js` are referenced
with `?v=2` there to defeat the preview cache.


## 42. Inner pages: one shell, and سياسة الخصوصية as its first instance

Anything that is a title and prose — policies, terms, an about page — now extends
`landing/page.html` rather than repeating the shell. It inherits `base.html`, so
the header and footer are the same partials the landing page uses, and it adds
`static/ribaat/css/page.css`, which carries only inner-page styles (head band,
prose, side index, print). `landing.css` is untouched by this pass.

A page fills six blocks: `doc_eyebrow`, `doc_title`, `doc_lede`, `doc_meta`,
`doc_index`, `doc_content`. Everything is optional except the title and the
content — a page with no index simply has none, and the body becomes one column.

**The header and footer anchors are now root-relative on inner pages.** They read
`{{ nav_root }}#tracks`; `base.html` includes both partials with no `nav_root`,
so the landing page is unchanged, and `page.html` overrides those two includes
with `nav_root="/"` so a nav item from a policy page goes home first. This is why
`base.html` gained `{% block header %}` / `{% block footer %}`.

The header has two states here as it does on the landing page: it carries the head
band's sunken surface at rest so there is no seam, and takes the paper surface and
the hairline once scrolled.

`Ribaat Privacy.preview.html` is the generated flat render, same convention as the
landing preview — do not edit it, edit the templates. Its nav anchors point at
`Ribaat Landing.preview.html`, which is what `/` resolves to with no server.

### The privacy copy needs legal review

I wrote it. Real, from the school's own sites: the two contact addresses, the
minimum age of 15, and the parent body (مركز ركائز للدراسات والبحوث). **Drafted and
unconfirmed** — every one of these carries `.is-placeholder` in the markup so it is
visible on the page as an open question: the exact fields collected at
registration, the cookie statement, the retention periods (permanent for
certificates, 12 months for logs), the 30-day response window, the certificate
lookup exposing a name, and the last-updated date. Confirm them before launch, and
note that §31 removed the certificate lookup from this site's navigation while this
policy still refers to it.


## 36. The hero video, finally: a lazy Blob is not a resource

Two more faults behind the same symptom, both found by isolating the element from the
bytes:

1. **`response.blob()` here is lazily backed by the range-less response.** Reading it
   through a `blob:` URL stalls exactly as the direct load did — `loadstart`,
   `stalled`, no metadata, `error === null`. Copying the bytes first
   (`arrayBuffer()` → `new Blob([buf], {type})`) reaches HAVE_ENOUGH_DATA on the
   identical bytes. The MIME type was correct all along; materialisation was the fix.
2. **A stalled element stays wedged.** The fallback now clones the node, feeds the
   clone, and swaps it in — and sets `preload="auto"` on the clone, because
   `cloneNode` copies the `preload="none"` that is correct for first paint and wrong
   for bytes already in memory.

Reveal is bound through a function so it follows the swapped-in node, fires on any of
`playing`/`canplay`/`loadeddata`/`loadedmetadata`+`videoWidth`/`timeupdate`, and polls
for 60s — materialising 11MB took ~20s here, and a 10s poll gave up first. A capped
resume handles a decode that stalls and leaves the element paused mid-clip.

Verified: `readyState 4`, 854×480, `data-ready` set, opacity 1, playing.

**Every one of these workarounds exists because the asset is 11MB and the server
ignores Range.** The ffmpeg trim in §34 — ~8 seconds, MP4 + WebM, 1–2MB — deletes the
fallback, the clone, the long poll and the resume. It is still the launch blocker.

## 35. The enrolment card is bound to the buttons' width

The card was 369px against a 349px action row — both flush on the inline-start edge,
20px apart on the other. The card's width was a `min(100%, 25rem)` cap while the row
is content-sized, so they were never going to agree.

They now share one grid column (`.hero__act`) sized to the buttons themselves:

- `grid-template-columns: max-content` — **not** `min-content`, which is each label
  wrapped as tightly as it will go and squeezed both buttons onto two lines (84px tall).
- `.hero__actions { flex-wrap: nowrap }` so the row's contribution is both buttons plus
  their gap on one line.
- `.hero__act .enrol { inline-size: 0; min-inline-size: 100% }` so the card's long
  detail line does not widen the track — it only fills whatever the buttons decided.

Measured: card and row both 349px, all three edge deltas 0, buttons back to 156×59 and
177×59 on single lines. No number is written down anywhere, so if a label is
retranslated both boxes move together. Below 900px the wrapper is a plain stacked grid
and the buttons keep their full-width phone behaviour.


---

## 38. The hero is a carousel, and every slide is editor-configurable

The hero is now a **stack of slides in one grid cell**, driven by a `hero_slides`
list in the view. One slide is current; the rest are faded out, `aria-hidden`,
and `inert` so nothing inside them can be tabbed to.

### What an editor controls, per slide

| key | values | effect |
| --- | --- | --- |
| `media` | `video` / `image` / `none` | what shows behind the copy |
| `video` | static path | only read when `media == 'video'` |
| `image` | static path | the still — and the poster frame on a video slide |
| `alt` | text | required whenever `image` is set |
| `focus` | `object-position` | e.g. `'46% 30%'`; omitted falls back to the responsive default |
| `show_text` | bool | `False` renders a media-only slide; the credit line still shows |
| `label` | text | the slide's name in the index (required when there is >1 slide) |
| `eyebrow` / `title` / `lede` | text | the copy |
| `show_enrolment` | bool | the term-state slot; normally only the first slide |
| `actions` | list | `{label, href, style: 'primary'\|'onink', preload}` |
| `credit` | text | provenance line for that slide's media |

`media` governs what is **shown**, not what is in the markup: the still stays in
the document on a video slide because it is also the poster frame, and it is what
stands if the footage is refused, throttled, or unwelcome.

Only the **first** slide holds the `<h1>`. The rest are `<h2>` at a lower rank
(`.hero__title--sub`), so the document keeps one top-level heading however many
slides are added.

### Degradation

The first slide carries `.is-current` **in the markup**. With JavaScript off the
hero is simply that slide — no flash, no empty box, every link still live. The
index is only rendered when there is more than one slide, and
`.hero:has(.hero__nav)` is what reserves the strip it sits in, so a single-slide
hero has exactly the padding it had before.

### Auto-advance

On by default at 8 seconds a slide. `hero_interval` (ms) changes the pace; `0`
makes it manual. It **stops for good** at the visitor's first use of the index or
the arrows, pauses on hover and focus, pauses on a hidden tab, and never runs
under `prefers-reduced-motion` — a reader who has started reading is never moved
off the slide they chose.

### The index

Not dots. The slides are named parts of one argument, so the index names them — an
Arabic-Indic numeral and a word, underlined in the accent on the current one. It
sits outside the slides, so it does not fade with them. Two 44px arrow buttons sit
one against each edge of the hero, centred on the slide, using the page's own
chevron glyphs and its direction audit (§17) — in RTL السابق is on the right and
التالي on the left — with a reserved column (`--hero-arrow-space`) so they never
land on the copy panel. Below 900px they stand down: the copy is bottom-aligned
and full-bleed there, its height varies by slide and by viewport height, and the
arrows are positioned against the hero rather than against the copy — so any
fraction of the hero that clears slide 1 at one size lands on it at another. The
index is already three named 44px targets on the same screen, and tapping is the
touch idiom besides. Arrow keys also move between steps (RTL: ArrowLeft
advances); coarse pointers get the 44px target on the steps too (§35).

### Video

`landing.js` now initialises **one video instance per slide** rather than a single
document-wide one. A slide's footage only starts decoding when its slide is
current — the carousel dispatches `hero:activate` on arrival and pauses the video
on departure — so a three-slide hero with two videos never decodes both.

### Preview

The tweaks panel gained three groups: **خلفية الشريحة** (فيديو / صورة / بلا خلفية),
**نصّ الشريحة** (نصّ كامل / بلا نصّ), and **تقليب الشرائح** (يدوي / تلقائي). The first
two are **per-slide, session-only overrides keyed by slide id** — they are never
persisted and never stamped onto a slide the reader has not changed, so a fresh
load always shows exactly what Django authored. Moving to another slide re-reads
that slide's own settings into the panel without writing anything back. (An
earlier build kept one global value for these and persisted it; visiting the
type-only slide and reloading then wiped the footage off slide 1. The old keys are
discarded on read.)

### Still illustrative

The two added slides (المسارات، الشهادات) — copy, actions, and slide 2's image —
are placeholders in the same sense as the FAQ answers: they need scholarly review
and real material before launch.


---

## 39. No theme switch, and a sign-in action in the header

**The theme toggle is gone.** The page follows the operating system's appearance
setting through `prefers-color-scheme` in the stylesheet, and nothing else. No
`data-theme` attribute is written, no `ribaat-theme` key is read or stored, and
the boot script in `base.html` now only marks the document as scripted — so first
paint is correct with or without JavaScript, and there is no FOUC to avoid.
Removed with it: the toggle markup, its `.theme-toggle*` rules (including both
ink-field and past-hero states and the print and coarse-pointer clauses), and the
toggle branch in `landing.js`. `data-theme` still works if a future build wants
to reintroduce an override — every token override in §4 is unchanged.

**تسجيل الدخول** joins التسجيل in the header actions, as a ghost button carrying
the ink-field and past-hero treatments the toggle used to have. Both actions also
appear in the mobile panel (`.mobile-nav__actions`), where the ghost button gets
its own on-ink colours; both are hidden from the bar itself below 560px, where the
panel is the only place they belong.


---

## 40. Responsive audit at 390 / 834 / 1024

Measured in the harness rather than by narrowing a desktop window. The layouts
came back clean: no horizontal overflow at any of the three widths
(`documentElement.scrollWidth` equals the viewport in each), nothing clipped by
an `overflow: hidden` ancestor, no text below 12px, and no text column squeezed
under 120px. §37's phone / tablet-portrait / desktop bands are doing their job.

What was actually wrong was **hit area**, and only in the two navigation bands:

| element | was | now |
| --- | --- | --- |
| `.brand` | 23px | 44px |
| `.site-nav__list a` | 23px | 44px |
| `.site-header__auth .btn` | 38px | 44px |
| `.hero__step` | 30px | 44px |

All four now sit in the same block as the rest of the hit areas
(`max-width: 899px`, `hover: none`, `pointer: coarse` — §35's rule that a coarse
pointer needs the target at every width, with the width clause as the fallback
for browsers that report no pointer). The hero index previously had its own
pointer-only rule; folding it in means one rule governs them all, and an iPad in
landscape at 1024px is covered by the pointer clause the same way a phone is.

Prose links in the footer's legal line are still left alone — they are not
navigation (§35).


---

## 41. Two things the responsive pass missed

**The page was responsive in layout but not in payload.** The video gate read
only reduced-motion, Save-Data and 2G, which let the untrimmed 11.9MB / 173s
`hero.mp4` (§34) through on any phone on 3G, 4G or 5G — and the range-less-server
fallback then fetched the whole file a SECOND time, so a mobile visitor could pull
~24MB for a hero background. Two changes:

- `wanted()` now also requires `(min-width: 900px)` — the band where the hero is a
  full-bleed desktop composition. Below it the poster still is the design and
  stands alone, which it was already built to do. **Remove the width clause once
  the asset is the 1–2MB cut.**
- The fallback refuses any response over `MAX_BLOB_BYTES` (4MB) and cancels the
  body. It exists for a server that does not honour Range requests, not to turn a
  stalled stream into a second full download.

**The hero arrows are back below 900px.** They had been set to `display: none` for
the whole band — which removed, on mobile and tablet, the control that was
specifically asked for. They now sit on the **index strip** at the block-end: the
one band of the hero nothing else occupies, so no fraction of the hero has to be
guessed at. They sit at its inline-end, which leaves the index's inline-start edge
— and so its shared edge with the credit line — exactly where it was; the nav's
inline-end padding reserves their width so a step can never wrap under them.
`--hero-nav-space` grows to 4.75rem in that band to keep the copy clear of the
taller strip.

### Preview could not be loaded to verify

Every attempt to load a page in the preview this turn timed out, including a
112-byte static HTML file with no assets — so this is the preview environment, not
the page. The two changes above are unverified visually. Re-check at 390 and 834:
the arrows on the index strip (no overlap with the last step, index still flush
with the credit line) and `[data-hero-video].currentSrc` empty below 900px.


---

## 44. One page for every system message

`templates/landing/message.html` + `static/ribaat/css/message.css`. **Its
primary case is the page the verification link itself lands on** — the student
clicks the link in the email, the token is consumed, and this page confirms it and
puts one action in front of them (الدخول إلى الحساب). Both previews open on that
state. The same template also serves the verification-sent notice, an expired link, enrolment confirmation, a
donation receipt, a failed payment, a completed password reset, a request under
review, and 404 / 500 — one template, one context dict, no per-message page.

The view supplies `msg`: `tone`, `eyebrow`, `title`, `lede`,
`facts` (label / value / mono pairs), `actions` (label / href / style) and
`note`. Everything except the title is optional; a state with no facts simply
has none, and the note block is not rendered at all. 404 and 500 render the same
template from `handler404` / `handler500` with a fixed dict.

**`tone` drives the mark and nothing else** — a filled green disc for something
that has happened, brown for something in progress, a hollow ring for something
that has not (danger colour for a failure, neutral for an error page). It is the
enrolment slot's vocabulary (§19), inside the same hairline square construction.
Every state is also stated in words, so no meaning rests on the colour, and the
mark is `aria-hidden`.

### The plate, and the box treatment chosen

One layout: a 36rem plate centred in what the header leaves of the viewport, on
paper. Two layouts were reviewed (a sunken band in the `page.html` register, and
this plate); the plate was chosen, and the band's rules are deleted rather than
commented out. Five box treatments were then reviewed on the plate — hairline
card with an inset rule, no box at all, a squared card with a green block-start
edge, a sunken well, and the certificate frame. **The certificate frame was
chosen**: two hairlines, the outer in `--ribaat-ink-300`, the inner in
`--ribaat-brown-300` at a `--space-2` inset, and no shadow — the frame is the
elevation. Its corners are `--radius-sm` rather than the right angles shown in
review, so the page stays inside the design system's radius scale; at 6px it
still reads as a document frame rather than a card.

The header takes the page surface at rest here (the page opens on paper, not on a
band) and its hairline once scrolled.

Print rules drop the header, footer and the action row and keep the pairs, since
a receipt gets printed.

### Previews

`Ribaat Message.preview.html` renders all ten states, one at a time — opening on
the verified-email confirmation, which is the page's primary case — with a **preview-only** state
switcher pinned at the foot. The switcher's markup, styles and script are
injected by the preview compile and are in no Django template. With JavaScript
off, the first state stands and the switcher does nothing.

### Flagged

1. **Every line of copy on these ten states is mine**, written to the formal
   register, and needs review before launch — particularly the donation wording
   (`جزاك الله خيرًا`) and the failure explanation (`رُفضت العملية من جهة الإصدار`),
   which is the kind of string a payment gateway usually supplies verbatim.
2. **Payments are donations/subscriptions only** per the brief — there is no paid
   course. The receipt state is written as a تبرّع, not a purchase, and the amount
   `٢٠٫٠٠٠ د.ك`, the operation numbers and كي-نت are placeholders.
3. **Digit style follows §7**: Arabic-Indic for dates, counts and amounts, Latin
   for reference codes (`RB-D-2026-004192`), which take `.mono`.
4. **No countdown, no auto-redirect** anywhere on this page. A verification page
   is the classic place for both, and both are urgency devices the design system
   rules out; the resend action is a plain button and the cooldown, if the view
   wants one, belongs in the button's disabled state rather than in a ticking
   number.
5. **The resend and change-email actions have no endpoints yet** (`href="#"`).
6. **`noindex, nofollow`** is set on this template. Confirm before the 404 page
   is served from it — a 404 is usually left indexable-but-404, which is fine
   either way, but it is a deliberate choice not an oversight.
