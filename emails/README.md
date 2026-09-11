# Ribaat — Transactional & Authentication Emails

17 production templates + one shared shell, Arabic-only, RTL, light + dark.
Preview gallery: `Email Templates.dc.html` (project root). Subject lines: `subjects.md`.

## File map

```
emails/
  base.html                  shared shell — brand lockup, card, footer, preheader, responsive + dark CSS
  partials/
    button.html              bulletproof CTA (VML for Outlook)   params: url, label
    divider.html             1px hairline rule
    datarow.html             one label/value line                params: label, value
    cert_block.html          certificate reference block         params: kicker, credential_title,
                                                                 holder_name, issue_date, certificate_id,
                                                                 qr_url
                             bracketed frame + school seal + verification QR,
                             following the certificates page
    rule.html                short olive rule set under every H1
  auth/        1–6           email_verification, password_reset, otp_code, welcome,
                             password_changed, new_signin_alert
  academic/    7–13          course_enrollment, path_enrollment, new_lecture, course_unlocked,
                             certificate_issued_course, certificate_issued_path,
                             admin_announcement
  billing/     14–17         payment_receipt, invoice, payment_failed, refund
  README.md                  this file — tokens, per-template variables, client matrix, open questions
  subjects.md                Arabic subject line + preheader for all 17 templates
  _preview/                  RENDERED previews only (sample data). Not for deployment.
```

Every body template is `{% extends "emails/base.html" %}` and fills three blocks:
`title`, `preheader`, `content`. The shell is never redesigned per email.

Deployment: copy `emails/` (minus `_preview/`) into a template dir on `TEMPLATE_DIRS`
and render with `render_to_string("emails/auth/password_reset.html", ctx)`.
Every template needs the global context below merged in — a context processor or a
`send_transactional(template, to, ctx)` helper is the natural place for it.

## Locale & format conventions (settled)

| Rule | Decision |
| --- | --- |
| Dates | **Gregorian only** — `12 يوليو 2026`. No Hijri, no dual date. |
| Digits | **Western (12345)** everywhere — counts, durations, amounts, dates, OTP, times. Matches the live site. |
| Time of day | **12-hour with AM/PM** — `12 يوليو 2026 — 9:14 PM`. Durations stay `HH:MM:SS` (`04:42:00`) since they are elapsed spans, not clock times. |
| Decimal separator | Western decimal point — `25.000 د.ك`. |
| Currency | **KD only** — `د.ك`, three decimals. No other currency, no tax or commercial-registration fields on invoices. |
| Sender | `no-reply@ribaat.net` (provisional — display name still to be confirmed). |
| Copy | Arabic wording is functional draft; final text will be supplied by the client. |

Django side: pass values already formatted. Times go through `{{ value|date:"j F Y — g:i A" }}`
(or an equivalent helper) in the send context — no digit transliteration is needed anywhere.

## Token map (design system → literal value used inline)

| Token | Light | Dark | Used for |
| --- | --- | --- | --- |
| `--ribaat-ink-100` | `#EFEADB` | `#191710` | outer page (deeper parchment so the card lifts) |
| `--surface-sunken` (adj.) | `#F7F3E8` | `#201D15` | data boxes, OTP box, invoice total row |
| `--surface-card` | `#FFFEFA` | `#262319` | message card |
| `--ribaat-brown-100/200` | `#F3EBDD` / `#E7DBC4` | `#201D15` / `#4A4536` | certificate panel |
| `--border-subtle` | `#E2DAC5` | `#3A362C` | card + row hairlines |
| `--border-default` | `#C9BFA6` | `#4A4536` | OTP box, certificate frame |
| `--text-primary` | `#211F19` | `#EDE6D6` | body copy, values |
| `--text-secondary` | `#635C48` | `#C4B99F` | labels, notes |
| `--text-muted` | `#82795F` | `#93876C` | footer, fallback links |
| `--surface-brand` | `#607247` | `#6B8151` | primary button fill, 4px card top rule, H1 rule |
| `--text-link` | `#4F6140` | `#A9BE8F` | links |
| `--surface-accent` | `#8C5F35` | `#96703F` | path-certificate frame, kicker |
| `--state-warning-bg/fg` | `#F3E7CC` / `#A97A24` | `#3A2F1C` / `#D3A85C` | security + payment-hold callouts |
| `--state-danger-bg/fg` | `#F4E3DF` / `#A6473B` | `#3C2420` / `#D98A7C` | account-compromise callout |
| `--radius-md / --radius-lg` | `10px` / `14px` | same | buttons+boxes / card |
| `--space-5 / --space-9` | `20px` / `36px` | same | box padding / card padding |
| type scale | `12 / 13 / 14 / 16 / 28px` | same | meta / label / note / body / H1 |
| `--font-sans` | `'IBM Plex Sans Arabic','Segoe UI',Tahoma,Arial,sans-serif` | | all UI + body |
| `--font-display` | `Amiri,'Traditional Arabic','Times New Roman',serif` | | H1, certificate title |
| `--font-mono` | `'IBM Plex Mono',Consolas,'Courier New',monospace` | | OTP, certificate id |

Line-height is set on every text cell together with `mso-line-height-rule: exactly`.
No `letter-spacing` anywhere on Arabic text (Latin/numeric OTP block excepted, and it
uses none either).

## Global context (required by every template)

| Variable | Type | Example |
| --- | --- | --- |
| `site_name` | str | منصة رباط الحنابلة |
| `asset_base` | str (URL) | `https://cdn.ribaat.net` |
| `institution_address` | str | *pending — see open questions* |
| `support_email` | str | `support@ribaat.net` |

Path and course titles are canonical proper nouns and already carry their own prefix
(«مسار العقيدة — المستوى الأول», «ثلاثة الأصول») — templates never prepend «مسار» or «مقرر»
to `path_title`, and never restate the level that the title already contains.

Recipient name: `user_name` in group A (any role), `student_name` in groups B and C
(recipient is definitionally an enrolled student). Flagged for a final decision.

## Per-template variables

### 1. `auth/email_verification.html`
| Variable | Type | Example |
| --- | --- | --- |
| `user_name` | str | عبد الرحمن الحمود |
| `action_url` | str (URL) | `https://www.ribaat.net/auth/verify/8f21c4a9e07b` |
| `expiry_hours` | int | 24 |

### 2. `auth/password_reset.html`
| Variable | Type | Example |
| --- | --- | --- |
| `user_name` | str | عبد الرحمن الحمود |
| `action_url` | str (URL) | `https://www.ribaat.net/auth/reset/2b71fe…` |
| `expiry_minutes` | int | 30 |

### 3. `auth/otp_code.html`
| Variable | Type | Example |
| --- | --- | --- |
| `user_name` | str | عبد الرحمن الحمود |
| `otp_code` | str | `482 197` |
| `expiry_minutes` | int | 10 |
| `support_email` | str | `support@ribaat.net` |

### 4. `auth/welcome.html`
| Variable | Type | Example |
| --- | --- | --- |
| `user_name` | str | عبد الرحمن الحمود |
| `action_url` | str (URL) | `https://www.ribaat.net/student` |

### 5. `auth/password_changed.html`
| Variable | Type | Example |
| --- | --- | --- |
| `user_name` | str | عبد الرحمن الحمود |
| `changed_at` | datetime (formatted) | 12 يوليو 2026 — 21:14 |
| `device_name` | str | Safari على iPad |
| `ip_address` | str | 176.108.42.17 |

### 6. `auth/new_signin_alert.html`
| Variable | Type | Example |
| --- | --- | --- |
| `user_name` | str | عبد الرحمن الحمود |
| `signin_at` | datetime (formatted) | 12 يوليو 2026 — 21:09 |
| `device_name` | str | Safari على iPad |
| `location` | str | الكويت — حولي |
| `ip_address` | str | 176.108.42.17 |
| `action_url` | str (URL) | `https://www.ribaat.net/student/settings/security` |

### 7. `academic/course_enrollment.html`
| Variable | Type | Example |
| --- | --- | --- |
| `student_name` | str | عبد الرحمن الحمود |
| `course_title` | str | ثلاثة الأصول |
| `teacher_name` | str | د. عبد العزيز العيدان |
| `lessons_count` | int | 9 |
| `course_duration` | str `HH:MM:SS` | 04:42:00 |
| `course_code` | str | AQD-101 |
| `course_url` | str (URL) | `https://www.ribaat.net/courses/thalathat-al-usul` |

### 8. `academic/path_enrollment.html`
| Variable | Type | Example |
| --- | --- | --- |
| `student_name` | str | عبد الرحمن الحمود |
| `path_title` | str | مسار العقيدة — المستوى الأول |
| `path_level` | str | المستوى الأول |
| `courses_count` | int | 5 |
| `first_course_title` | str | ثلاثة الأصول |
| `path_url` | str (URL) | `https://www.ribaat.net/paths/aqeedah-1` |

### 9. `academic/new_lecture.html`
| Variable | Type | Example |
| --- | --- | --- |
| `student_name` | str | عبد الرحمن الحمود |
| `course_title` | str | ثلاثة الأصول |
| `lecture_title` | str | الدرس الرابع — شرح الأصل الثاني |
| `teacher_name` | str | د. عبد العزيز العيدان |
| `lecture_duration` | str `HH:MM:SS` | 00:38:12 |
| `published_at` | date (formatted) | 12 يوليو 2026 |
| `lecture_url` | str (URL) | `https://www.ribaat.net/courses/…/lessons/4` |

### 10. `academic/course_unlocked.html`
| Variable | Type | Example |
| --- | --- | --- |
| `student_name` | str | عبد الرحمن الحمود |
| `prerequisite_title` | str | ثلاثة الأصول |
| `course_title` | str | القواعد الأربع |
| `teacher_name` | str | د. عبد العزيز العيدان |
| `lessons_count` | int | 6 |
| `path_title` | str | مسار العقيدة — المستوى الأول |
| `course_url` | str (URL) | `https://www.ribaat.net/courses/al-qawaid-al-arba` |

### 11. `academic/certificate_issued_course.html`
| Variable | Type | Example |
| --- | --- | --- |
| `student_name` | str | عبد الرحمن الحمود |
| `course_title` | str | ثلاثة الأصول |
| `issue_date` | date (formatted) | 12 يوليو 2026 |
| `certificate_id` | str | `RBT-2026-AQD-04173` |
| `certificate_url` | str (URL) | `https://www.ribaat.net/student/certificates/RBT-2026-AQD-04173` |
| `verify_url` | str (URL) | `https://www.ribaat.net/student/certificates?id=RBT-2026-AQD-04173` |

### 12. `academic/certificate_issued_path.html`
| Variable | Type | Example |
| --- | --- | --- |
| `student_name` | str | عبد الرحمن الحمود |
| `path_title` | str | مسار العقيدة — المستوى الأول |
| `courses_count` | int | 5 |
| `sanad_note` | str | إجازة بالسند المتصل |
| `issue_date` | date (formatted) | 12 يوليو 2026 |
| `certificate_id` | str | `RBT-2026-PTH-00218` |
| `certificate_url` | str (URL) | … |
| `verify_url` | str (URL) | … |

### 13. `academic/admin_announcement.html`
| Variable | Type | Example |
| --- | --- | --- |
| `student_name` | str | عبد الرحمن الحمود |
| `announcement_title` | str | تعليق نشر الدروس في عشر ذي الحجة |
| `announcement_body` | str (plain text, rendered with `linebreaksbr`) | نص الإعلان… |
| `issued_by` | str | إدارة المنصة |
| `announced_at` | date (formatted) | 12 يوليو 2026 |
| `announcement_scope` | str | طلاب مسار العقيدة — المستوى الأول |
| `announcement_url` | str (URL) | `https://www.ribaat.net/announcements/1042` |

`announcement_body` must be plain text — it is escaped, then only newlines become `<br>`.
Do not pass HTML.

### 14. `billing/payment_receipt.html`
| Variable | Type | Example |
| --- | --- | --- |
| `student_name` | str | عبد الرحمن الحمود |
| `receipt_number` | str | `RCP-2026-01184` |
| `item_title` | str | الالتحاق بمسار العقيدة — المستوى الأول |
| `payment_method_label` | str | كي‑نت — تنتهي بـ 4417 |
| `paid_at` | datetime (formatted) | 12 يوليو 2026 — 20:58 |
| `amount` | Decimal (formatted) | 25.000 |
| `currency` | str | د.ك |
| `receipt_url` | str (URL) | `https://www.ribaat.net/student/billing/RCP-2026-01184` |

### 15. `billing/invoice.html`
| Variable | Type | Example |
| --- | --- | --- |
| `student_name` | str | عبد الرحمن الحمود |
| `invoice_number` | str | `INV-2026-00742` |
| `issue_date` | date (formatted) | 12 يوليو 2026 |
| `due_date` | date (formatted) | 19 يوليو 2026 |
| `invoice_status` | str | غير مسددة |
| `invoice_lines` | list of `{description, amount}` | `[{description: "…", amount: "25.000"}]` |
| `subtotal` / `discount` / `total` | Decimal (formatted) | 30.000 / 5.000 / 25.000 |
| `currency` | str | د.ك |
| `invoice_url` | str (URL) | `https://www.ribaat.net/student/billing/INV-2026-00742` |

### 16. `billing/payment_failed.html`
| Variable | Type | Example |
| --- | --- | --- |
| `student_name` | str | عبد الرحمن الحمود |
| `item_title` | str | الالتحاق بمسار العقيدة — المستوى الأول |
| `amount_with_currency` | str | 25.000 د.ك |
| `payment_method_label` | str | كي‑نت — تنتهي بـ 4417 |
| `attempted_at` | datetime (formatted) | 12 يوليو 2026 — 20:58 |
| `failure_reason` | str | رفض من مزوّد الدفع (رصيد غير كافٍ) |
| `hold_until` | date (formatted) | 15 يوليو 2026 |
| `retry_url` | str (URL) | `https://www.ribaat.net/student/billing/retry/INV-2026-00742` |

`failure_reason` must be a mapped, human-readable Arabic string — never a raw gateway code.

### 17. `billing/refund.html`
| Variable | Type | Example |
| --- | --- | --- |
| `student_name` | str | عبد الرحمن الحمود |
| `refund_reference` | str | `RFD-2026-00219` |
| `item_title` | str | الالتحاق بمسار العقيدة — المستوى الأول |
| `refund_amount_with_currency` | str | 25.000 د.ك |
| `refund_method` | str | إلى وسيلة الدفع الأصلية (كي‑نت) |
| `receipt_number` | str | `RCP-2026-01184` |
| `refunded_at` | date (formatted) | 12 يوليو 2026 |
| `refund_expected_days` | int | 7 |
| `receipt_url` | str (URL) | … |

## Required hosted assets

Absolute HTTPS (CloudFront) under `{{ asset_base }}/email/`, 2x, scaled down in markup:

| File | Intrinsic | Rendered | Note |
| --- | --- | --- | --- |
| `ribaat-logo-onlight.png` | 368×170 | 140×65 | mark + wordmark from the supplied brand lockup, tagline cropped off (it is set as live text under the logo, legible at any size) |
| `ribaat-logo-ondark.png` | 368×170 | 140×65 | same artwork recoloured for dark backgrounds — olive → `#A9BE8F`, brown → `#C9A06B` |

| `ribaat-cert-seal-onlight.png` | 240×240 | 76×76 | the school seal, matching `ui_kits/student/StudentCertificates.dc.html` — square + square rotated 45°, double circle, «رباط». Templates 11–12 only. `alt=""` — decorative |
| `ribaat-cert-seal-ondark.png` | 240×240 | 76×76 | same seal in `#C9A06B` / `#8FA079` for dark backgrounds |
| `qr-<serial>.png` | 296×296 | 88×88 | **per-certificate, generated server-side** — not a shipped asset. Encodes `{{ verify_url }}`, ECC M, 4-module quiet zone. Always dark-on-light, in both colour schemes |

All four files are generated and sitting in `emails/_preview/assets/email/` — upload them
to `{{ asset_base }}/email/`.

These are the only images. Every layout is legible with images blocked (Arabic `alt`
on both, no background-image dependency).

## Client test matrix

| Client | Known caveats |
| --- | --- |
| Outlook 2016–2021 (Windows, Word engine) | No `border-radius` (square cards + square VML buttons), no `@media`, no `prefers-color-scheme` → always light. `* {font-family: Tahoma}` is forced in an MSO conditional, so Amiri never renders; all headings must read correctly in Tahoma (they do — no Amiri-only treatment). Explicit `width` attrs + `mso-line-height-rule: exactly` are set on every cell. |
| Gmail web | Full `<style>` + media-query support. Clipping threshold ~102KB; largest template here is ~24KB. Dark mode is Gmail's own partial inversion, not `prefers-color-scheme`. |
| Gmail iOS/Android app | `prefers-color-scheme` is not honoured for non-Google accounts; partial colour inversion instead. No text relies on the dark rules for contrast. |
| Apple Mail / iOS Mail | Best fidelity: dark rules and the logo swap both work as previewed. |
| Outlook.com / Windows Mail | Forced inversion; overridden via `[data-ogsc]` / `[data-ogsb]` on every surface, text and button class. Verify button cells first — they invert most aggressively. |
| Yahoo / AOL | Strips some `<style>`; inline styles carry the whole light design. |
| Mobile < 600px | Media query drops card padding to 20px, shrinks H1 to 24px, makes the CTA full-width (≥ 48px tall). Body text is 16px everywhere. |

Not yet run against a real client-testing service — the above is derived from client
capability, not observed output. Run Litmus/Email-on-Acid before launch, with an Arabic
locale device in the set.

## Open questions — still unresolved

1. **Sender display name** — from-address is `no-reply@ribaat.net` (provisional); the
   display name and reply-to are still open.
2. **Final Arabic copy** — every body text here is functional draft, to be replaced with
   the client's wording.
3. **Refund & payment-failure policy** — the `hold_until` window and
   `refund_expected_days` figures need a policy decision.
4. **Footer postal address** — `institution_address` is a placeholder.
5. **`asset_base`** — the CloudFront (or other CDN) origin the two logo files are served from.
6. **Assessment/exam notifications** — excluded; that feature is not designed yet.
7. **Recipient variable naming** — `user_name` (auth) vs `student_name` (academic/billing):
   confirm or unify.

The certificate panel deliberately repeats the certificates page's vocabulary: the
four 18px corner brackets (`--ribaat-brown-400`), the seal (square + rotated square +
double circle + «رباط»), and the QR-beside-serial verification block. A student who
has seen the page recognises the email as the same document.

Answered in this round: dates (Gregorian), digits (Western), time format (12-hour AM/PM), currency (KD, no tax
fields), unsubscribe (not applicable), sender address, and the logo assets.
