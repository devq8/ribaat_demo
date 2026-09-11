# Ribaat — Student Dashboard (React + Vite)

Structural export of the Student Dashboard design. **No visual changes were made
during this step** — this is the same screen, split into components.

## Ground rules this export follows

- Every colour, type size, weight, spacing, radius, shadow and motion value is a
  `var(--ribaat-*)` / `var(--text-*)` / `var(--space-*)` / `var(--radius-*)`
  reference to the Ribaat Design System. **No literal hex values anywhere.**
- Every Arabic string lives in `src/strings/ar.js`. No Arabic copy in JSX.
- Layout components (page frame, nav, columns, footer) are separated from
  presentational components (cards, panels, rows).
- Every data-driven region ships `loading`, `empty` and `error` variants as
  named exports alongside the region itself, all catalogued in
  `src/variants/StateGallery.jsx`.

## Setup

```bash
npm install
npm run dev
```

Two integration points before it runs against real design-system code:

1. **Design system.** Copy the design-system folder to `public/ds` (so the
   `@import` paths in `src/styles/global.css` resolve) and load
   `_ds_bundle.js` in `index.html`. `src/ds/index.js` is the single adapter —
   when the design system ships as an npm package, rewrite that one file and
   nothing else changes.
2. **Assets.** Course artwork and logos are referenced from `/assets/…`; copy
   `assets/courses` and `assets/logos` into `public/assets`.

## Structure

```
src/
  pages/          route containers — own data + status, pass plain props down
  layout/         page chrome and geometry
  components/
    dashboard/    presentational components
    states/       shared loading / empty / error primitives
  data/           fixtures + derivation helpers (no JSX)
  strings/        ar.js — all Arabic copy
  hooks/          useBreakpoint
  variants/       StateGallery — every region × every state, labelled
  ds/             design-system adapter
  styles/         global.css — token imports, resets, skeleton keyframes
```

## Components

### Pages

| Component | Props | Notes |
|---|---|---|
| `StudentDashboardPage` | `theme` | Populated dashboard. Owns fixtures and per-region `status`. |
| `StudentDashboardEmptyPage` | `theme` | Zero-enrollment secondary screen; same chrome. |

### Layout

| Component | Props | Tokens used |
|---|---|---|
| `DashboardLayout` | `theme`, `layout`, `studentName`, `children` | `--surface-page`, `--font-sans`, `--duration-normal`, `--ease-standard` |
| `TopNav` | `theme`, `layout`, `studentName` | `--surface-card`, `--border-subtle`, `--text-base`, `--text-brand`, `--text-secondary`, `--weight-semibold` |
| `AccountMenu` | `studentName`, `onSignOut`, `onNavigate` | `--surface-card`, `--surface-sunken`, `--radius-md`, `--radius-sm`, `--shadow-md`, `--state-danger-fg`, `--space-1..4`, `--space-10` |
| `DashboardColumns` | `layout`, `children`, `rail` | `--space-4` (rail gap); geometry from `layoutConfig` |
| `SiteFooter` | `theme`, `layout` | `--surface-card`, `--border-subtle`, `--text-sm/xs`, `--text-muted`, `--leading-relaxed`, `--space-2/6/8` |
| `layoutConfig.js` | — | `--container-max`, `--space-*`, `--text-xl`, `--text-2xl` |
| `useBreakpoint()` | — | none (JS only) |

### Presentational — dashboard

| Component | Props | Tokens used |
|---|---|---|
| `WelcomeHeader` | `studentName`, `statsLine`, `titleSize` | `--font-display`, `--weight-bold`, `--text-muted`, `--text-sm`, `--space-2/6` |
| `AnnouncementsPanel` | `status`, `items[]`, `onRetry` | `--state-warning-bg`, `--state-warning-fg`, `--radius-lg`, `--text-sm`, `--space-2/5` |
| `AnnouncementRow` | `day`, `date`, `text` | `--state-warning-fg`, `--text-xs/sm`, `--text-primary`, `--leading-normal` |
| `EnrolledCoursesSection` | `status`, `inProgress[]`, `completed[]`, `hasEnrollments`, `columns`, `onContinue`, `onBrowse`, `onRetry` | `--space-5`; composes DS `Tabs`, `Button` |
| `CourseGrid` | `columns`, `children` | `--space-5/6` |
| `ContinueLearningCard` | `course`, `onContinue` | `--surface-card`, `--border-subtle`, `--radius-lg`, `--shadow-sm`, `--text-md/sm/xs`, `--weight-semibold`, `--space-1/2/5` |
| `CourseThumbnail` | `art`, `title`, `badge` | `--ribaat-green-100`, `--ribaat-green-600`, `--space-2` |
| `RecommendedCoursesCarousel` | `status`, `courses[]`, `cardWidth`, `onEnrol`, `onRetry` | `--surface-card`, `--border-default`, `--font-display`, `--text-xl/sm`, `--space-1/2/3/5/6` |
| `RecommendedCourseCard` | `course`, `width`, `onEnrol` | same card tokens as `ContinueLearningCard`; DS `Badge` tone `accent` |
| `PathProgressPanel` | `status`, `steps[]`, `trackLabel`, `isComplete`, `detailsHref`, `onClaimCertificate`, `onExplore`, `onRetry` | `--surface-card`, `--radius-lg`, `--font-display`, `--text-md/xs`, `--text-brand`, `--space-1/3/5` |
| `PathStep` | `title`, `status`, `hasConnector` | via `pathModel`: `--ribaat-green-600/300`, `--surface-sunken`, `--border-brand`, `--border-subtle`, `--ribaat-brown-100/600`, `--text-muted/primary/secondary/accent/on-brand` |
| `PathCertificateCallout` | `onClaim` | `--ribaat-brown-100/200/300/600`, `--text-accent`, `--radius-lg`, `--font-display` |
| `EventsCalendarPanel` | `status`, `events[]`, `daysInMonth`, `firstWeekdayOffset`, `today`, `initialDay`, `onRetry` | `--surface-card`, `--border-subtle`, `--radius-lg`, `--font-display`, `--text-md/xs` |
| `CalendarMonthGrid` | `cells[]`, `onSelectDay` | `--ribaat-green-100/600`, `--border-default`, `--radius-sm`, `--text-brand`, `--weight-semibold` |
| `CalendarLegend` | — | `--ribaat-blue-600`, `--ribaat-brown-600`, `--ribaat-green-600`, `--text-muted` |
| `CalendarDayAgenda` | `label`, `events[]` | `--border-subtle`, `--text-xs`, `--text-primary/muted`, `--space-2/3` |

### Shared state primitives

| Component | Props | Tokens used |
|---|---|---|
| `SkeletonBlock` | `height`, `width`, `radius` | `--surface-sunken`, `--radius-sm`, `--duration-slow`, `--ease-standard` |
| `SkeletonCourseCard` | — | card tokens + `--space-2/4/10` |
| `EmptyState` | `icon`, `title`, `body`, `actionLabel`, `onAction`, `padding` | `--surface-card`, `--border-subtle`, `--radius-lg`, `--text-md/sm`, `--text-muted` |
| `ErrorState` | `title`, `body`, `retryLabel`, `onRetry`, `padding` | `--state-danger-fg`, `--surface-card`, `--radius-lg`, `--text-md/sm` |
| `STATUS` | — | `'loading' \| 'error' \| 'empty' \| 'ready'` |

## State variants per region

| Region | Loading | Empty | Error |
|---|---|---|---|
| Announcements | `AnnouncementsPanelLoading` | `AnnouncementsPanelEmpty` | `AnnouncementsPanelError` |
| Enrolled courses | `EnrolledCoursesLoading` | `EnrolledCoursesEmpty`, `InProgressEmpty`, `CompletedEmpty` | `EnrolledCoursesError` |
| Recommended carousel | `RecommendedCarouselLoading` | `RecommendedCarouselEmpty` | `RecommendedCarouselError` |
| Path progress | `PathProgressLoading` | `PathProgressEmpty` | `PathProgressError` |
| Events calendar | `EventsCalendarLoading` | `EventsCalendarEmpty` | `EventsCalendarError` |

Render `src/variants/StateGallery.jsx` to see all of them on one page.

## Design-system extensions to fold back into `components/`

Built here because the design system has no equivalent primitive yet:

1. **`PathStep` / path stepper** — vertical, prerequisite-gated track stepper.
   Two variants exist in the design: the compact passive rail (this export) and
   the full interactive stepper on the المسارات page. Worth publishing as one
   `TrackStepper` with `variant="compact" | "full"`.
2. **`EventsCalendarPanel`** — month grid with typed event dots, day selection
   and an agenda list.
3. **`AnnouncementsPanel`** — warning-toned notice list.
4. **`EmptyState` / `ErrorState` / `Skeleton`** — the design system has no
   state primitives; these three should live in `components/feedback/`.

## Notes for the next pass

- **Off-scale values.** A few measurements inherited from the design do not sit
  on the 4px `--space-*` scale and are kept as literals so nothing shifts
  visually: `14px`, `18px`, `22px`, `26px`, `30px`, `36px`, `46px`, `56px`,
  `108px`, `228px`, `258px`, `320px`. Normalising them is a design decision,
  not a refactor — left untouched here.
- **Missing type tokens.** `--text-2xs` (11px) and `--text-3xs` (9–10px) are
  referenced with fallbacks in the calendar and path captions; the design system
  should add them rather than keeping the fallbacks.
- **Sub-scale space token.** `--space-7` (28px) and `--space-14` (56px) are
  referenced with fallbacks in `layoutConfig`; add or drop them deliberately.
- **Dark mode** is driven entirely by `data-theme="dark"` on the layout root and
  the `colors-dark.css` token layer. No component reads the theme except for the
  logo inversion filter in `TopNav` / `SiteFooter`.
