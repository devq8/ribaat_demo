# شاشة تعذّر الاتصال — Offline / unreachable overlay

File: `Offline Overlay.dc.html` — one Design Component containing the live desktop model (`1a`), the full state matrix (`1b`), the recovery sequence (`1c`), and the open policy questions (`1d`).

## What it is

An overlay drawn by the already-running React app when its API requests fail. Not a route, not a server-rendered page. The app underneath stays mounted with its state; the overlay covers it, then withdraws.

- **No network at runtime.** Inline SVG only, no icon library, no remote images, no CDN. Type stacks are `Amiri, "Times New Roman", serif` and `"IBM Plex Sans Arabic", "Segoe UI", Tahoma, sans-serif` — if neither brand font is cached the fallback holds the same metrics-tolerant layout (no fixed-height text rows, no truncation-dependent copy).
- **Overlay, not navigation.** Rendered as a fixed full-viewport scrim + centred card, siblings of the app tree, so nothing unmounts. In the model the app beneath is shown as a real lesson view (nav, player, lesson list) at every frame.
- **Recovery is part of the design.** First successful request → scrim and card fade out over `--duration-slow`, a `role="status"` strip reads «عاد الاتصال. تابع من حيث توقفت.» for four seconds, focus returns to the element that had it.

## Component inventory

| Component | Purpose |
| --- | --- |
| `OfflineOverlay` (scrim + `role="alertdialog"` card) | The full-viewport layer; owns focus trap, focus restore, fade-out |
| `CauseGlyph` (3 inline SVGs, 48×48, 2px stroke) | Device offline / server unreachable / server erroring — distinguished by **form**: solid server rect + severed line + slash; dashed server rect + dashed line; two solid rects with a fault bar |
| `CauseMessage` | Title (Amiri), kicker, body. One copy set per cause |
| `OfflineChecklist` | Only rendered for *device offline* — the only cause where the student can act. Its presence/absence is a structural difference, not a colour one |
| `PersistenceNote` | «ما كتبته محفوظ على جهازك…» — bordered band, always present |
| `RetryControl` | Real `<button>` (44px min), primary → busy variant with an arc indicator |
| `RetryStatus` + `RetryTrack` | Countdown line (`aria-live="off"`) and a 3px track: determinate while waiting, indeterminate pulse while retrying |
| `AttemptLine` / `ReferenceCode` | `المحاولة ٣ من ٦`; monospace LTR reference code, server-error only |
| `ReconnectedStrip` | Post-recovery `role="status"` confirmation |

Cause differentiation is by wording, glyph construction, checklist presence, and reference-code presence — colour (`--state-info/warning/danger`) is the least load-bearing signal.

## Tokens consumed

All colour, spacing, radius, type, shadow and motion are `var(--*)` references — no literal hex or px in the design surfaces (fixed device-frame dimensions in the spec board are presentation chrome, not the screen).

- **Colour:** `--surface-page`, `--surface-card`, `--surface-sunken`, `--surface-overlay`, `--border-subtle`, `--border-default`, `--border-strong`, `--text-primary`, `--text-secondary`, `--text-muted`, `--text-brand`, `--text-on-brand`, `--ribaat-green-100/500/600/700`, `--state-info-fg/bg`, `--state-warning-fg/bg`, `--state-danger-fg/bg`, `--state-success-fg/bg`, `--focus-ring`
- **Type:** `--text-xs/sm/base/md/lg/xl/2xl`, `--leading-tight/normal`, `--weight-regular/semibold/bold`, `--font-mono`, Amiri + IBM Plex Sans Arabic stacks
- **Spacing:** `--space-1` … `--space-20`
- **Effects:** `--radius-sm/md/lg/pill`, `--shadow-sm/md/lg`, `--border-width`, `--ease-standard`, `--duration-fast/normal/slow`
- **Theme:** light and `[data-theme="dark"]` via `tokens/colors-dark.css`. The app knows its theme, so the overlay inherits it — it never forces one.

## Retry behaviour

Backoff `١٥ / ١٥ / ٣٠ / ٦٠ / ١٢٠ / ٣٠٠` seconds, six attempts. Countdown set plainly in Arabic-Indic digits as `MM:SS`, no urgency framing. Manual `إعادة المحاولة` is always available and resets nothing. States designed: waiting, retrying (button busy + disabled, track indeterminate), failed-again (attempt count + longer interval).

## Accessibility

- **Announcement:** the card is `role="alertdialog"` `aria-modal="true"` with `aria-labelledby`/`aria-describedby`, not `role="alert"`. Reason: the layer is modal and traps focus — `alertdialog` announces on appearance *and* conveys modality, whereas a bare `role="alert"` announces without telling assistive tech that the rest of the app is inert.
- **Background retry is silent:** the countdown/status line is `aria-live="off"` and is only read when the user moves to it, so automatic attempts never announce. A single `role="status"` announcement occurs on recovery.
- **Focus:** trapped inside the card while visible (Tab/Shift-Tab cycle), initial focus on the retry button, restored to the previously focused element on withdrawal. Retry is a real keyboard-operable `<button>`; focus ring `2px solid var(--focus-ring)` with 2px offset in both themes.
- **Motion:** the arc, the glyph pulse, the indeterminate track and the fade all have a defined static appearance under `prefers-reduced-motion: reduce` — animations removed, opacity forced to final value, the overlay appears and disappears instantly rather than crossfading.
- **RTL:** `dir="rtl"` throughout with logical properties only (`inset-inline`, `inset-block-start`, `padding-inline-start`, `border-block-start`, `margin-inline`).
- Contrast: body copy on `--surface-card` meets AA in both themes. The retry button uses `--surface-brand-strong` with `--text-on-brand` — `--ribaat-green-600` in dark mode is only 3.11:1 against `--text-on-brand` and would fail at body size. Cause colours are used for glyph fill on their own tinted background, never as text on page. Small labels inside the card (kicker, attempt line, reference code) use `--text-secondary` rather than `--text-muted`, which fails AA at `--text-xs` on `--surface-card` in dark mode. Each themed root declares `color: var(--text-primary)` so the token resolves inside the `[data-theme]` scope rather than inheriting light ink.

## Responsive

Phone 390×700 (primary case), tablet 834×620, desktop 1120×700. The card is `width: 100%; max-width: 540px` with a fluid scrim padding, so it fills the phone with a comfortable margin and centres on larger screens. Nothing is hidden at small sizes — the checklist, retry control, countdown and persistence note all appear on phone.

## Design system extension recorded

No new foundations introduced. Extensions in the system's existing language:

1. **`OfflineOverlay` pattern** — a new overlay/scrim pattern; uses the existing `--surface-overlay` scrim (no blur, per system rules) and a `--radius-lg` / `--shadow-lg` card.
2. **`CauseGlyph` geometry** — angular rect-and-line constructions in the system's Kufic register, replacing the Lucide substitution for this screen (Lucide cannot be loaded with no network).

## Flagged, not resolved

1. **Connection loss during an exam** — does the timer pause, are answers held locally, is the student warned before an attempt is consumed? Highest-stakes case, and an academic-policy decision. The current copy promises only that on-device text is not lost; it makes no claim about the timer or the attempt.
2. **Unsaved work elsewhere** — held locally and resubmitted on recovery, or does the student resubmit manually? The persistence note's wording depends on the answer.
3. **Reference code** — shown here for server errors only, as `RB-7F2C-40`. Confirm support can actually act on it; if not, remove it.
4. **`--text-muted` at `--text-xs` fails AA on `--surface-card` in dark mode** (4.15:1). Avoided here by using `--text-secondary`, but the muted token needs lightening in the dark layer if it is to be usable at small sizes.
5. **Missing dark-mode on-brand pair:** `--ribaat-green-600` + `--text-on-brand` fails AA in dark mode (3.11:1). This screen works around it with `--surface-brand-strong`, but the system needs a proper `--surface-brand` / on-brand pair that passes in both themes.
6. **Missing tokens:** no state *border* token (`--state-*-border`) — the recovery strip borrows `--state-success-fg` as its border; no dark-mode-specific overlay dim beyond `--surface-overlay`; `--font-mono` has no `@font-face`, so the reference code falls back to `ui-monospace`.
