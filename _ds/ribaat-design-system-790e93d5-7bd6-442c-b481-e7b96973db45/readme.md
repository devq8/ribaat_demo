# Ribaat Design System

Design system for **منصة رباط الحنابلة (Ribaat.net)** — an Arabic-language Islamic
education platform based in Kuwait offering structured courses (دورات), lectures
(دروس) and certification programs/tracks (المسارات) in Qur'an, Hadith, Seerah,
Fiqh and ʿAqīdah. The product is being rebuilt from a Laravel/Academy-LMS stack
into Django with server-rendered templates for v1 (Arabic-only UI, RTL-first),
with a future DRF API planned for Flutter/iPad apps.

## Sources used to build this system

- **`uploads/Artboard 46.pdf`** — the brand's vector logo artboard. This PDF had
  no extractable text or images, only vector paths (no fonts/rasters), so it was
  rendered by manually replaying its PDF operator list on a canvas (pdf.js's
  built-in renderer hung indefinitely in this sandbox on this file — a
  vector-only, image-free, 328-op page — so `run_script` was used to walk
  `getOperatorList()` and redraw the paths directly). The result is the source
  of every logo asset in `assets/logos/` and of the exact brand colors
  (`#607247` olive-green, `#8C5F35` brown) used throughout the tokens.
- **GitHub repo `devq8/ribaat`** — named as the codebase for this rebuild, but
  **could not be accessed**: `devq8/ribaat` 404s on both `main` and `master`,
  and does not appear in the list of repos this connection can see. An
  "Install GitHub App" prompt was shown; if you are the repo owner, click
  Install (or check the repo name/visibility) and ask Claude to retry — a
  second pass reading real templates, CSS and component code from that repo
  would meaningfully sharpen this system (exact spacing, radii, real color
  values beyond the logo, the actual component inventory, RTL edge cases
  already solved in code, etc). **Explore `github.com/devq8/ribaat` yourself
  once access is confirmed** — it is the ground truth this system could not read.
- **The live production site, `https://www.ribaat.net`** — fetched directly
  (homepage, login, course catalogue, a course detail page) to recover real
  product copy, information architecture, and UI conventions: course card
  anatomy, the login flow, course category taxonomy, and the curriculum/day
  structure of a course. This is real shipped copy and structure, not a
  screenshot guess — but it does not expose exact CSS values, so **all pixel-level
  visual decisions below (radii, shadows, exact spacing) are this system's own
  reasonable interpretation**, not confirmed brand values, until the codebase
  can be read.

**Bottom line: treat this as a strong first pass built from the real logo and
real product copy, not a pixel-accurate port of existing code.** The single
biggest thing that would improve it is GitHub access to `devq8/ribaat`.

## Company & product context

- **Ribaat (رباط الحنابلة)** — "مدرسة شرعية تأصيلية" (a foundational Sharia
  school) — teaches classical Islamic texts (متون) across ʿAqīdah, Fiqh,
  Hadith, Seerah, Usul al-Fiqh and Adab, taught by named scholars (e.g. د. عبد
  العزيز العيدان, د. أنس اليتامى) through recorded video lessons (دروس) grouped
  into courses (دورات), which are in turn grouped into leveled tracks/programs
  (المسارات، e.g. المستوى الأول / المستوى الثاني) that lead to certificates
  (شهادات) with sanad-style attribution ("إجازة بالسند المتصل").
- **Four roles**: Student (الطالب), Teacher (المعلم), Staff, Admin — each needs
  a distinct dashboard. Only the Student-facing surface is visible on the live
  site; Teacher/Staff/Admin views in this system are this system's own
  extrapolation from the shared visual language, clearly since no source
  exposed those screens.
- **Prerequisite gating & certification** are core UI moments: a course lists
  its curriculum by day (اليوم الأول، اليوم الثاني…) with per-day lesson counts
  and durations; enrolling issues access; completing a course/track issues a
  certificate that can be verified via a public lookup
  (`/student/certificates` — "الاستعلام عن شهادة").
- **RTL is mandatory.** The UI is Arabic-only for v1; multilingual infrastructure
  is kept dormant but not exposed. Every layout, component and page in this
  system is authored RTL-first (`dir="rtl"`, logical CSS properties).

## Content fundamentals

- **Register/voice**: formal, restrained classical Arabic. No marketing hype,
  no casual "you"-first copywriting voice. Labels are literal and functional:
  `تسجيل الدخول` (Log in), `تسجيل حساب` (Create account), `سجل` (Enrol), `الاستعلام
  عن شهادة` (Verify a certificate). The one superlative on the homepage —
  "أفضل البرامج الدراسية التعليمية" (the best educational study programs) — is
  mild by marketing standards and is the exception, not the rule.
- **Titles are canonical scholarly text names** and must never be altered,
  translated, or "simplified": `ثلاثة الأصول`, `القواعد الأربع`, `الأربعين
  النووية`, `متن الورقات في أصول الفقه`, `نواقض الإسلام`. Treat course/book
  titles as fixed proper nouns.
- **Instructors are addressed with academic honorifics**: always `د.` (Dr.)
  before a scholar's name, e.g. `د. عبد العزيز العيدان`. Teacher cards show
  student count and course count as their credibility signal, not bios/photos
  primarily.
- **Islamic honorifics are non-negotiable and must render correctly**:
  ﷺ (ṣallā Allāhu ʿalayhi wa sallam) after the Prophet's name, رضي الله عنه /
  رضي الله عنها after a companion's name, رحمه الله after a deceased scholar's
  name. Never omit, abbreviate to "PBUH"-style Latin shorthand, or paraphrase
  these. Set them in the body font at normal size — never shrink or gray them
  out as if they were disposable metadata.
- **Qur'an and Hadith citations follow fixed conventions**: Qur'an ayat are
  quoted with the surah name and ayah number cited afterward
  (e.g. "﴿ ... ﴾ (سورة البقرة: ٢٥٥)"), commonly set with the ornamental ﴿ ﴾
  brackets around the ayah text; Hadith citations name the narrator and source
  ("رواه البخاري ومسلم"). These sit in a visually distinct citation block (see
  `components/content/QuranCitation.jsx` / `HadithCitation.jsx`), never plain
  inline body text.
- **Numbers/time**: durations are shown as `HH:MM:SS` ("عدد الساعات 04:42:00"),
  counts are shown plainly ("٩ الدروس" / "9 الدروس" — the live site mixes
  Western digits into Arabic text; keep Western digits for counts/durations,
  they read faster in a UI).
- **No emoji anywhere in the product UI.** (Emoji appear only in the school's
  Telegram/social marketing, which is out of scope for this product UI.)
- **Vibe**: calm, unhurried, academic, trustworthy — a school register, not a
  consumer-app register. Prefer whitespace and restraint over badges, streaks,
  gamification, or urgency language ("لا تفوت!", countdown timers) anywhere in
  the student experience.

## Visual foundations

- **Colors**: two brand hues pulled directly from the logo — an olive green
  `#607247` (primary) and a warm brown `#8C5F35` (accent) — extended into full
  ramps in `tokens/colors.css`. Neutrals are warm/parchment (`--ribaat-ink-*`,
  `--ribaat-paper-*`), never cool gray — this keeps the "old manuscript /
  academic study" feel rather than a cold SaaS feel. Semantic colors
  (success/warning/danger/info) are muted, desaturated versions of
  green/amber/red/blue — never neon or saturated.
- **Type**: two families. `Amiri` (a classical Naskh serif) for headings, the
  wordmark-adjacent moments, and Qur'an/Hadith citation blocks — it reads as
  "manuscript," fitting an Islamic studies school. `IBM Plex Sans Arabic` for
  all UI/body/forms — clean, highly legible at small sizes, excellent Arabic
  metrics. **Both are Google Fonts substitutions**, self-hosted in
  `assets/fonts/` — no brand font files were provided. Flagged for the brand
  team; swap `tokens/fonts.css` if real fonts exist. Never apply
  `letter-spacing` to Arabic text.
- **Spacing**: 4px base scale (`--space-1` … `--space-24`), generous by
  default — this is a reading-heavy, academic product, not a dense dashboard.
- **Backgrounds**: flat parchment/paper surfaces, no gradients, no textures,
  no full-bleed decorative imagery. The only imagery is functional: course
  thumbnails (real photos of the teacher or subject matter) and instructor
  photos. This system uses neutral placeholder blocks for that photography —
  never invented stock imagery.
- **Animation**: restrained. Standard ease (`--ease-standard`,
  `cubic-bezier(0.2,0,0,1)`), fast/normal/slow durations (120/200/320ms) for
  hover/focus/open-close only. No bounce, no spring, no decorative looping
  animation — nothing in this product should feel playful or urgent.
- **Hover states**: primary buttons darken one step (`--ribaat-green-600` →
  `--ribaat-green-700`); ghost/text buttons gain a soft tint background
  (`--ribaat-green-100`); links darken and are never re-colored to a
  different hue.
- **Press/active states**: darken one further step + a 1px inset scale is
  avoided (no "squish" bounce) — calm platforms don't need kinetic feedback.
- **Borders**: hairline (`1px`), warm-neutral (`--border-subtle` /
  `--border-default`), used generously to separate list rows and cards instead
  of relying purely on shadow.
- **Shadows**: very low elevation, warm-tinted (never pure black) —
  `--shadow-sm/md/lg`. Cards mostly rely on a hairline border + a whisper of
  shadow, not heavy drop shadow.
- **Corner radii**: moderate, calm rounding — `--radius-sm` 6px (chips/inputs),
  `--radius-md` 10px (buttons, small cards), `--radius-lg` 14px (large cards,
  modals). Nothing fully pill-shaped except badges/tags/avatars.
  *(Exact radii were not confirmed against source code — reasonable
  interpretation pending repo access.)*
- **Cards**: white/paper surface (`--surface-card`), `1px` hairline border,
  `--radius-lg`, `--shadow-sm` at rest, `--shadow-md` on hover if interactive.
- **Transparency/blur**: used sparingly — only on the modal/drawer scrim
  (`--surface-overlay`, a translucent warm-black, no blur) — never on cards or
  navigation.
- **Layout**: RTL-first throughout; primary nav and breadcrumbs read
  right-to-left; a course's curriculum list, forms, and tables all mirror.
  Fixed/sticky elements are limited to the top nav bar.

## Iconography

No icon codebase, sprite, or icon font could be recovered (`devq8/ribaat` was
inaccessible; the live site's icons are small raster/CSS-sprite images not
worth scraping as a "system"). **This system substitutes
[Lucide](https://lucide.dev) icons via CDN** (`lucide-static`/`lucide` — MIT,
outline style, 1.5–2px stroke) as a neutral, calm stand-in that matches the
restrained academic tone (no filled/glossy icon style). This substitution is
flagged here and in `components/`. Unicode glyphs are used only for the two
honorific glyphs (ﷺ، ﴿﴾) which are typographic content, not iconography.

## Intentional additions

The source material (PDF logo + live site) did not expose a component
library, so this system authors a **standard component set** sized to what
the product visibly needs: `Button`, `Input`, `Select`, `Checkbox`, `Badge`
(role/level tags), `Card` (course card), `Avatar` (instructor), `Tabs`
(course description/about-teacher), `ProgressBar` (course completion), plus
two Islamic-content-specific primitives that have no generic-UI-kit
equivalent: `QuranCitation` and `HadithCitation`.

## Index

- `styles.css` — root stylesheet, import-only entry point.
- `tokens/` — `colors.css`, `typography.css`, `spacing.css`, `effects.css` (radius/shadow/motion), `fonts.css` (`@font-face`).
- `assets/logos/` — `ribaat-logo-full.png` (full lockup), `ribaat-mark.png` (mark only), `ribaat-wordmark.png`, `ribaat-tagline.png` — all rendered from the source PDF, transparent background.
- `assets/fonts/` — self-hosted Amiri + IBM Plex Sans Arabic woff2 subsets.
- `guidelines/` — foundation specimen cards (colors, type, spacing, brand mark, iconography).
- `components/` — reusable primitives, grouped by concern:
  - `components/core/` — Button, Badge, Avatar, ProgressBar
  - `components/forms/` — Input, Select, Checkbox
  - `components/navigation/` — Tabs, Breadcrumbs
  - `components/content/` — CourseCard, QuranCitation, HadithCitation
- `ui_kits/student/` — Student-facing surfaces: login/sign-up, course catalogue, course detail (curriculum), lesson player, certificate lookup, student dashboard.
- `ui_kits/teacher/`, `ui_kits/staff/`, `ui_kits/admin/` — the three other role dashboards, extrapolated from the same visual system (no source screens existed for these).
- `SKILL.md` — portable skill file for use in Claude Code.
