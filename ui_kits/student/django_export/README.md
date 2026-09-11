# Handoff: Student Dashboard → Django templates

## What this is
A static HTML + CSS translation of the `StudentDashboard` design (built as an
interactive prototype elsewhere in this project) into server-renderable
**Django templates** using `{% include %}` partials, `{% for %}/{% if %}`
instead of the prototype's component bindings, and `{% static %}` asset
paths. This is a **design reference**, not drop-in production code — wire the
context variables to real querysets/views, confirm URL names, and add CSRF /
auth as your project's conventions require.

The prototype used the Ribaat Design System's React components (`Button`,
`Badge`, `Avatar`, `ProgressBar`, `Tabs`). Since Django templates render on
the server with no React runtime, every component was translated 1:1 into a
plain CSS class (`.rb-btn`, `.rb-badge`, `.rb-avatar`, `.rb-progress-*`,
`.rb-tab`) with the exact same tokens, colors, radii and states — see
`static/dashboard/dashboard.css`. If the real component library later ships
a CSS export, prefer that over this hand-translation.

## Folder layout
```
django_export/
  templates/dashboard/
    dashboard.html              — page shell, includes the four sections below
    _header.html                — top nav + logout
    _enrolled_courses.html      — "دوراتي" grid / empty state
    _track_stepper.html         — "مساري" tabs + horizontal/vertical stepper
    _recommended_carousel.html  — "ماذا تدرس بعد ذلك؟" scroll carousel
  static/dashboard/
    dashboard.css               — component styles (Button/Badge/Avatar/etc. as CSS)
    tokens/                     — colors, colors-dark, typography, spacing, effects
    assets/fonts/               — Amiri + IBM Plex Sans Arabic (woff2, self-hosted)
    img/ribaat-wordmark.png
```
Drop `templates/dashboard/` into your app's template directory and
`static/dashboard/` into your static files (adjust `{% static %}` paths if
your `STATIC_URL` differs).

## Context the view must provide
```python
{
  "student_name": "ماجد",
  "has_enrollments": True,
  "stats_line": "دورتان قيد الدراسة · دورة واحدة مكتملة · شهادة واحدة صادرة",
  "color_scheme": "light",  # or "dark" — drives [data-theme] token overrides
  "enrolled_courses": [
    {"title": "...", "slug": "...", "instructor": "...", "progress": 62,
     "badge_tone": "brand", "badge_label": "قيد الدراسة",
     "cta_variant": "primary", "cta_label": "متابعة", "meta_line": "..."},
    ...
  ],
  "tracks": [
    {"value": "level1", "label": "المستوى الأول", "is_active": True,
     "progress_pct": 43,
     "steps": [
       {"title": "...", "subtitle": "...", "status": "completed",
        "icon": "check", "badge_tone": "success", "badge_label": "مكتمل",
        "show_action": False, "action_label": "", "action_url": "",
        "is_last": False},
       ...
     ]},
    {"value": "level2", "label": "المستوى الثاني", "is_active": False, "steps": [...]},
  ],
  "recommended_courses": [
    {"title": "...", "slug": "...", "instructor": "...", "category": "عقيدة",
     "meta_line": "02:54:00 — مستوى مبتدئ", "hint": None},
    ...
  ],
}
```
`step.status` drives color via CSS modifier classes — one of `completed`,
`current`, `available`, `locked`, `certificate-locked` (see the
`.rb-step--*` rules in `dashboard.css`). `step.icon` is a Lucide icon name
(`check`, `circle`, `play`, `lock`, `award`) rendered via the Lucide CDN
script already included in `dashboard.html`.

## Things that need real wiring
- **URL names**: `home`, `courses`, `dashboard`, `certificate_lookup`,
  `logout`, `course_lesson`, `course_detail` are placeholders — swap for your
  actual `{% url %}` names or hardcoded paths.
- **Track tab switching**: ships as a `?track=` query-param link (full page
  reload, no JS required). If you want it client-side, render both track
  panels and toggle `hidden` on click — markup doesn't change either way.
- **Recommended carousel**: prev/next buttons are enhanced with the small
  inline `<script>` at the bottom of `_recommended_carousel.html`; the row
  itself is natively scrollable/swipeable without JS.
- **Dark mode**: set `data-theme="dark"` on `.rb-page` (already parameterized
  via `color_scheme` in the context) — `colors-dark.css` supplies the
  overrides, no extra markup needed.
- **Course thumbnails**: currently an outline "book" glyph placeholder inside
  `.rb-card-thumb` — replace with real course cover photos when available.

## Fidelity
High-fidelity — colors, spacing, type, radii and states are the confirmed
design-system tokens (see `static/dashboard/tokens/`), not approximations.

---

# Handoff: Course Catalogue → Django templates

## What this is
The catalogue ("الدورات") screen, translated the same way as the dashboard
above: flat `.rb-*` CSS classes instead of React components, plain
`{% include %}` partials, and **standard GET query-param filtering** — no
SPA, no fetch/XHR. Every filter, the sort control, and pagination are either
`<a href="?...">` links or `<select>`s that live inside one `<form method="get">`
and re-submit the full page. The two `onchange="…submit()"` calls on the
teacher/level/sort selects are a progressive enhancement only — the form
still works with JS disabled via manual submission (add a "تطبيق" button in
your integration if you want a no-JS-visible submit affordance).

## Folder layout
```
django_export/
  templates/catalogue/
    catalogue.html       — page shell: header, filter form, sidebar + results, drawer
    _header.html         — top nav + logout ("الدورات" active)
    _filters.html         — shared filter fields (search/category chips/teacher/level),
                            included once for the desktop sidebar and once for the
                            tablet/mobile drawer
    _results_grid.html    — card grid, "عرض المزيد" pagination link, empty state
  static/catalogue/
    catalogue.css         — component styles (chips, drawer, card, empty state, etc.)
    tokens/               — colors, colors-dark, typography, spacing, effects
    assets/fonts/         — Amiri + IBM Plex Sans Arabic (woff2, self-hosted)
    img/ribaat-wordmark.png
  catalogue_preview.html  — static preview with Django tags resolved to sample data
```

## Why filters are a sidebar (not a top bar)
Kept as a **persistent left/right sidebar on desktop** so the results grid —
the actual content students scan — stays the dominant element and the widest
column. On tablet the sidebar collapses into a slide-in drawer opened by a
"تصفية" link; on mobile the same drawer becomes a bottom sheet, since a
persistent filter bar doesn't fit next to a single-column grid. The drawer's
open/close state is itself a query param (`?filters=open`), so it works
without any JS.

## Context the view must provide
```python
{
  "student_name": "ماجد",
  "color_scheme": "light",  # or "dark"
  "query": {"q": "", "teacher": "", "level": "", "sort": "latest", "categories": ["حديث"]},
  "category_choices": [
    {"value": "تفسير", "label": "تفسير", "active": False, "toggle_url": "?category=تفسير&..."},
    # ... one per discipline in ["تفسير","حديث","فقه","عقيدة","سيرة","أصول الفقه","أدب"],
    # `toggle_url` = current query string with this category added/removed
  ],
  "teacher_choices": [{"value": "عبد العزيز العيدان", "label": "د. عبد العزيز العيدان", "active": False}, ...],
  "level_choices": [{"value": "level1", "label": "المستوى الأول", "active": False}, ...],
  "has_active_filters": True,
  "active_filter_chips": [{"label": "حديث", "remove_url": "?..."}, ...],  # one per active filter, for the removable-chip row
  "clear_all_url": "?",
  "result_count": 2,
  "courses": [
    {"title": "...", "slug": "...", "instructor": "...", "category": "حديث",
     "lectures": 11, "duration": "06:20:00", "enrolled": False, "locked": True,
     "track_note": "يتطلب إتمام متن الورقات في أصول الفقه"},
    ...
  ],
  "page_obj": <django.core.paginator Page>,   # only page_obj.has_next is used
  "next_page_url": "?...&page=2",
  "filters_open": False,          # True when request.GET.get("filters") == "open"
  "filters_open_url": "?...&filters=open",
  "filters_close_url": "?...",    # current query string minus `filters`
}
```
`course.locked` renders a disabled "مقفلة" button + a lock-icon note
(`track_note`); a course inside a track with no unmet prerequisite instead
gets a plain "route"-icon note ("ضمن مسار … — لا يتطلب شرطاً سابقاً"); a
fully standalone course has no note at all. `course.enrolled` swaps the CTA
to "متابعة" and adds a small "مسجّل" badge on the thumbnail.

## Things that need real wiring
- **URL names**: `courses` (this page's own `action`), plus `home`,
  `dashboard`, `certificate_lookup`, `logout`, `course_detail`,
  `course_lesson` — same placeholders as the dashboard export.
- **Query-string helpers**: `toggle_url`/`remove_url`/`clear_all_url`/
  `next_page_url`/`filters_open_url`/`filters_close_url` are all "current
  query string, one param changed" — write a small view helper (or a
  `django-filter`-style `FilterSet` + a template tag) rather than
  hand-building these per request.
- **Sorting**: `query.sort` (`latest` / `popular` / `level`) should drive
  your queryset's `.order_by(...)` — no client logic involved.
- **Pagination**: swap in Django's `Paginator`; `_results_grid.html` only
  reads `page_obj.has_next`.
- **Course thumbnails**: same book-glyph placeholder as the dashboard cards;
  replace with real cover photos when available.

## Fidelity
High-fidelity — same token set and component vocabulary as the dashboard
export. Filter/drawer interaction pattern (query-param driven, no JS
required for correctness) is this system's own reasonable interpretation for
a server-rendered Django screen, not a confirmed port of existing code.
