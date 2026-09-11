# Handoff: Login & Signup Screens (Flutter, iPad + Web)

## Overview
Pre-authentication screens for the Ribaat student app: Login (تسجيل الدخول) and Signup (تسجيل حساب جديد). These sit before the dashboard/catalogue/course-view shell already built — no side nav here. Targets: iPad portrait, iPad landscape, and desktop-width web. RTL-first, Arabic-only UI, light + dark themes.

## About the Design Files
The bundled HTML file (`RibaatAuthScreens.dc.html`) is a **design reference built in this tool's own component format** — it renders correctly only inside this tool's runtime (loads a `support.js` shim and a custom `_ds_bundle.js`), not a standalone web page and NOT Flutter code. Do not embed or run it inside the Flutter app. Treat it purely as an interactive visual + behavioral spec: open it in the design tool to see exact spacing, states, and copy, then **build native Flutter widgets** that reproduce it, using Flutter's own layout system (Row/Column/Stack, MediaQuery breakpoints, TextFormField, etc.) and this app's existing widget library if one exists.

## Fidelity
**High-fidelity.** Colors, type, spacing, radii, and copy below are final — implement pixel-for-pixel where Flutter's layout model allows. Treat measurements as targets, not approximations.

## Design Tokens

### Colors — Light theme
| Token | Hex | Usage |
|---|---|---|
| surface.page | #FBF9F3 | screen background |
| surface.card | #FFFEFA | input backgrounds |
| surface.sunken | #EFEADB | pressed/tint state |
| surface.brandStrong | #3E4E32 | brand panel background (split layout) |
| border.subtle | #E2DAC5 | dividers |
| border.default | #C9BFA6 | input borders |
| text.primary | #211F19 | headings, primary text |
| text.secondary | #635C48 | secondary line text |
| text.muted | #82795F | hints, subheading |
| text.link | #4F6140 | links (forgot password, signup/login switch) |
| state.dangerFg | #A6473B | error text/icon/border |
| state.dangerBg | #F4E3DF | error banner background |
| brand.green600 | #607247 | primary button background |
| brand.green700 | #4F6140 | primary button pressed |

### Colors — Dark theme
| Token | Hex |
|---|---|
| surface.page | #201E18 |
| surface.card | #2B2820 |
| surface.sunken | #1B1913 |
| surface.brandStrong | #55663F |
| border.subtle | #3A362C |
| border.default | #4A4536 |
| text.primary | #EDE6D6 |
| text.secondary | #C4B99F |
| text.muted | #93876C |
| text.link | #A9BE8F |
| state.dangerFg | #D98A7C |
| state.dangerBg | #3C2420 |
| brand.green600 (btn bg) | #7C9161 |

### Typography
- Display font (wordmark, headings): **Amiri** (serif, Naskh). Fallback: Times New Roman.
- UI/body font: **IBM Plex Sans Arabic**. Fallback: Segoe UI, Tahoma.
- Scale: xs 12px / sm 14px / base 16px / md 18px / lg 22px / xl 28px / 2xl 36px / 3xl 48px.
- Line-height: normal 1.55 (Arabic needs more than Latin), relaxed 1.9 for citation-style copy.
- Weights: regular 400, medium 500, semibold 600, bold 700.
- **Never apply letter-spacing to Arabic text.**
- Screen heading uses font-display, 2xl (36px), bold. Subheading uses font-sans, sm (14px), muted color.

### Spacing / radii
- Base spacing scale: 4/8/12/16/20/24/32/40/48/64/80/96px.
- Radius: sm 6px (chips), md 10px (inputs, buttons), lg 14px (large cards), pill 999px (used for the social-login circular buttons — 52×52).
- Shadows: very low elevation, warm-tinted (never pure black), e.g. `0 1px 2px rgba(33,31,25,0.06)`.
- Motion: 120ms/200ms/320ms, ease `cubic-bezier(0.2,0,0,1)`. No bounce/spring.

## Layout
- **iPad portrait / narrow web**: single centered column, max-width 400 (logical px), logo mark (44×44) centered above the heading, scrollable if content overflows.
- **iPad landscape / wide web**: split two-pane layout. Right pane (RTL leading side) = brand panel, fixed height, does not scroll: olive-green (surface.brandStrong) background, centered content — mark icon (160×160 on this pass), wordmark image below it (68px tall), a thin 40×2px divider line at 35% white opacity, a one-line description in font-display/xl/relaxed-leading at 92% white, and a small caption line listing subjects ("قرآن · حديث · سيرة · فقه · عقيدة") at 60% white opacity.
- Left pane (RTL trailing side) = form column, independently scrollable (only this pane scrolls; the brand panel is fixed), centered content max-width 400px, padding 56–72px depending on breakpoint.
- Grid split ratio: iPad landscape ~50/50; web ~47/53 (form pane slightly wider). **Important**: give both panes a flex-shrink/min-width of 0 equivalent — the brand panel's fixed-size logo must not force the form pane to overflow/clip.
- All screens: RTL text direction, Arabic UI. Inputs/buttons never full-bleed even on wide screens — max 400px form width always.

## Screens

### 1. Login (تسجيل الدخول)
**Purpose**: authenticate an existing student.
**Heading**: "تسجيل الدخول" · **Subheading**: "أهلاً بعودتك إلى رباط الحنابلة".

**Fields**:
- Email/username input (label "البريد الإلكتروني", placeholder "name@example.com", min-height 44pt).
- Password input (label "كلمة المرور", placeholder "••••••••", min-height 44pt) with a show/hide eye-icon toggle — icon itself ~18px, but its tap zone is a full 44×44pt square at the input's leading inline edge (RTL: right side). Toggling swaps between an outline "eye" icon and an "eye with slash" icon; no layout shift.
- "نسيت كلمة المرور؟" link, baseline-aligned with the "كلمة المرور" label on the same row, text.link color, xs size.

**Primary action**: full-width button (48pt height), "تسجيل الدخول", primary variant (brand.green600 bg, white text, radius-md, semibold).

**Secondary line**: centered, sm text.secondary: "ليس لديك حساب؟ " + link "سجل الآن" (text.link) → navigates to Signup.

**Social login** (below primary button, above the secondary line): a thin "أو" divider (two 1px border.subtle lines flanking a small muted "أو" label), then 3 circular icon-only buttons (52×52pt, 1px border.default, surface.card background, fully rounded) centered in a row with 16pt gaps: Google (multi-color G mark, ~26px), Apple (glyph, currentColor), Facebook (blue "f" mark, #1877F2). Tap targets meet 44pt+ minimum. Icon only — no text label, with an accessible label for screen readers ("تسجيل الدخول بواسطة Google" etc).

**Validation / error state**: on invalid credentials, the email and password fields get a danger-colored border, the password field shows an inline hint "تحقق من كلمة المرور" (xs, danger-fg) beneath it, and a calm banner appears above the submit button: rounded (radius-md) box, 1px danger-fg border, danger-bg background, an outline alert icon, message "البريد الإلكتروني أو كلمة المرور غير صحيحة. يرجى المحاولة مرة أخرى." in danger-fg, sm size. No red flash/shake — stays calm and restrained.

**Loading state**: on submit, the button becomes disabled (50% opacity), its label is replaced with "جارٍ الدخول..." and a small (16px) spinning ring icon (continuous 0.8s linear rotation, no bounce/spring) replaces the leading icon slot. Fields remain visible but the button can't be re-tapped mid-request.

### 2. Signup (تسجيل حساب جديد)
**Purpose**: create a new student account.
**Heading**: "تسجيل حساب جديد" · **Subheading**: "أنشئ حسابك للبدء في رحلتك العلمية".

**Fields** (all 44pt min-height, radius-md, 1px border.default, surface.card bg):
1. Full name — label "الاسم الكامل", placeholder "الاسم كما سيظهر في الشهادة".
2. Email — label "البريد الإلكتروني", placeholder "name@example.com".
3. Password — label "كلمة المرور", placeholder "8 أحرف على الأقل", same eye-toggle pattern as Login. Below it, when idle: a muted xs hint "8 أحرف على الأقل" (chosen over a strength meter for a calmer academic tone — no colored strength bars).
4. Confirm password — label "تأكيد كلمة المرور", placeholder "أعد إدخال كلمة المرور", same eye-toggle pattern, independent visibility state from the password field.
5. Terms checkbox — label "أوافق على الشروط وسياسة الخصوصية", required before submit is valid (client-side gate — implement the actual gating logic in Flutter; the reference only shows the visual).

**Primary action**: identical treatment to Login's button — full-width, 48pt, "تسجيل" (busy: "جارٍ إنشاء الحساب...").
**Secondary line**: centered, sm text.secondary: "لديك حساب بالفعل؟ " + link "سجل الدخول" → navigates to Login.
**Social signup**: identical divider + 3-circular-icon row as Login, accessible labels "إنشاء حساب بواسطة Google/Apple/Facebook".

**Validation / error states** (same calm language as Login — danger border + inline xs danger-fg helper text under the offending field, no banners/shakes unless noted):
- Email already registered: email field gets danger border + inline text "هذا البريد الإلكتروني مسجل بالفعل" beneath it.
- Password too short: password field gets danger border + inline text "يجب ألا تقل كلمة المرور عن 8 أحرف" beneath it (replaces the neutral length hint).
- Confirm-password mismatch is not yet wired in the reference — recommend the same inline pattern: danger border + "كلمتا المرور غير متطابقتين" beneath the confirm field.

**Loading state**: identical pattern to Login (disabled button, spinner + "جارٍ إنشاء الحساب..." label).

## Interactions & Behavior
- Password visibility toggles are local per-field boolean state, independent for password vs. confirm-password.
- No hover states anywhere — touch-first (iPad) product; use Flutter's press/tap-down state (e.g. `InkWell`/`GestureDetector` with an opacity or background tint on press, not hover) for all interactive elements.
- Login/Signup are two states of one flow; the secondary line's link routes between them (named routes or simple auth-flow state in Flutter).
- All 44pt/44px references are literal minimum touch targets — verify actual rendered hit-test size in Flutter, not just visible icon size.
- Submit is disabled while a request is in flight and re-enabled on completion (success routes onward; failure re-enables fields and shows the error state above).

## Assets
- `assets/ribaat-mark.png` — icon-only brand mark (44×44 on portrait, 160×160 on the split brand panel — tint white via a color filter on the brand panel).
- `assets/ribaat-wordmark.png` — wordmark lockup (68px height on the brand panel).
- Social icons (Google, Apple, Facebook) are simple vector marks — recreate as SVG assets or vector icon widgets in Flutter; any faithful official mark works.
- No other imagery is used — the design system prohibits invented stock photography.

## Files
- `RibaatAuthScreens.dc.html` — interactive reference (open in the design tool; do not run standalone or embed in the app).
- `assets/` — the two logo PNGs referenced above.
- This `README.md`.
