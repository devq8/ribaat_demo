# Ribaat transactional emails — Django package

Drop-in package: 17 messages, one shared shell, plain-text alternatives,
a registry with subject lines, and locale formatting helpers.

```
django_export/
  templates/emails/            ← copy into your templates dir
    base.html                  shared shell (logo, card, footer, dark mode)
    partials/                  button · datarow · divider · rule · cert_block
    auth/ academic/ billing/   the 17 HTML bodies
    txt/                       the 17 plain-text bodies, same tree
  ribaat_mail/                 ← copy in as a Django app-less package
    messages.py                registry: key → templates, subject, required context
    sender.py                  send() / render()
    formatting.py              ar_date · ar_time · ar_datetime · duration · kd
    tests.py                   renders all 17 with sample context
    preview_urls.py            optional DEBUG-only browser preview
  static/email/                logos + certificate seal — upload to your CDN
                               ribaat-logo-onlight.png      368×170, shown at 140×65
                               ribaat-logo-ondark.png       368×170, shown at 140×65
                               ribaat-cert-seal-onlight.png 240×240, shown at 76×76
                               ribaat-cert-seal-ondark.png  240×240, shown at 76×76
```

## What ships

40 templates (17 HTML + 17 text + shell + 5 partials), 6 Python modules, 4 PNGs.
Largest rendered message is ~25KB — a quarter of Gmail's 102KB clip threshold.

## Install

1. Copy `templates/emails/` into a directory on `TEMPLATES['DIRS']` (or into
   any app's `templates/`). The paths inside are absolute — `emails/base.html`,
   `emails/partials/button.html` — so the `emails/` folder name must survive.
2. Copy `ribaat_mail/` next to your other packages. It needs no `AppConfig` and
   does not have to be in `INSTALLED_APPS`; it only imports `django.conf`,
   `django.core.mail` and `django.template`.
3. Move `preview_urls.py` inside `ribaat_mail/` (it ships one level up here only
   so the tree reads clearly).
4. Upload `static/email/*.png` to the CDN and point `RIBAAT_EMAIL_ASSET_BASE` at
   its origin. Email clients cannot resolve relative or `{% static %}` paths —
   the URLs must be absolute `https://`.

## Settings

```python
RIBAAT_EMAIL_ASSET_BASE = "https://cdn.ribaat.net"   # required, no trailing slash
RIBAAT_FROM_EMAIL       = "منصة رباط الحنابلة <no-reply@ribaat.net>"
RIBAAT_REPLY_TO         = ["support@ribaat.net"]     # optional
RIBAAT_SITE_NAME        = "منصة رباط الحنابلة"
RIBAAT_INSTITUTION_ADDRESS = "دولة الكويت"
RIBAAT_SUPPORT_EMAIL    = "support@ribaat.net"
```

The shell reads `site_name`, `institution_address`, `support_email` and
`asset_base`; `sender.py` injects all four from settings, so no view or task
needs to pass them.

## Sending

```python
from ribaat_mail import send
from ribaat_mail.formatting import ar_datetime, kd

send(
    "payment_receipt",
    to=student.email,
    context={
        "student_name": student.full_name,
        "receipt_number": receipt.number,
        "item_title": receipt.description,
        "payment_method_label": receipt.method_label,
        "paid_at": ar_datetime(receipt.paid_at),
        "amount": kd(receipt.amount),
        "currency": "د.ك",
        "receipt_url": receipt.get_absolute_url(),
    },
)
```

`send()` raises `MissingContext` if a required key is absent, so a broken call
fails at the call site rather than mailing a half-empty message. Use
`render(key, context)` to get `(subject, text, html)` without delivering — useful
for queueing through Celery or a provider API.

## The certificate QR code

Templates 11 and 12 show a verification QR beside the serial. The image is
**per-certificate and must be hosted** — email clients cannot render inline SVG
or generate anything, so `qr_url` has to be an absolute `https://` URL to a PNG.

Generate it once when the certificate is issued and store it next to the
certificate record:

```python
import qrcode                      # pip install "qrcode[pil]"
from django.core.files.base import ContentFile
from io import BytesIO

def build_qr(certificate):
    url = f"https://www.ribaat.net/student/certificates?id={certificate.serial}"
    img = qrcode.make(url, error_correction=qrcode.constants.ERROR_CORRECT_M,
                      box_size=8, border=4)
    buf = BytesIO()
    img.save(buf, format="PNG")
    certificate.qr.save(f"{certificate.serial}.png", ContentFile(buf.getvalue()))
```

Then pass `"qr_url": certificate.qr.url` in the send context (absolute — use
`request.build_absolute_uri` or a CDN-backed storage URL).

Rules the design depends on: **dark modules on a light background in both colour
schemes** (the block is never inverted for dark mode — scanners need the
contrast), ECC level M or higher, a 4-module quiet zone, and at least 88×88 CSS
pixels rendered. The serial is always printed as live text beside it, so a client
that blocks images still carries everything needed to verify.

## Formatting contract

Templates do no formatting. Pass values already rendered as strings:

| Kind | Helper | Example |
| --- | --- | --- |
| Date | `ar_date(d)` | `12 يوليو 2026` |
| Date + time | `ar_datetime(dt)` | `12 يوليو 2026 — 9:14 PM` |
| Time only | `ar_time(dt)` | `9:14 PM` |
| Duration | `duration(seconds)` | `04:42:00` |
| Money | `kd(amount)` | `25.000` (pair with `currency`) |
| Money inline | `kd_with_currency(a)` | `25.000 د.ك` |

Gregorian dates only, Western digits everywhere, 12-hour clock with AM/PM,
KD with three decimals and no tax fields.

## Timezone

`ar_time` formats whatever datetime it is handed. Convert to Kuwait time before
calling it:

```python
from django.utils import timezone
import zoneinfo
local = timezone.localtime(dt, zoneinfo.ZoneInfo("Asia/Kuwait"))
```

Or set `TIME_ZONE = "Asia/Kuwait"` and pass `timezone.localtime(dt)`.

## Escaping

Django autoescapes every variable, so user-supplied names and titles are safe by
default. One exception: `announcement_body` renders through `|linebreaksbr`,
which escapes first and then converts newlines — also safe. Never mark any email
context value `mark_safe`.

## Tests

`python manage.py test ribaat_mail` renders all 17 with representative context
and asserts: subject non-empty, no unresolved `{{ }}` or `{% %}`, and HTML under
Gmail's 102KB clipping threshold.

## Not included, by decision

- **No unsubscribe or preference link.** Every message here is operational, not
  a subscription. If marketing email is ever added it needs its own shell.
- **No tax or commercial-registration fields** on the invoice.
- **No tracking pixels, no external CSS, no JavaScript, no web fonts as a
  dependency** — the Google Fonts link degrades to Tahoma silently.

## Pre-flight checklist

- [ ] `RIBAAT_EMAIL_ASSET_BASE` set to an absolute `https://` origin, no trailing slash
- [ ] the four PNGs uploaded under `<asset_base>/email/`
- [ ] QR generation wired into certificate issuance (see above), `qr_url` absolute
- [ ] `RIBAAT_FROM_EMAIL` set — display name confirmed with the client
- [ ] `RIBAAT_INSTITUTION_ADDRESS` set to the real postal address
- [ ] `TIME_ZONE` / `localtime` conversion to `Asia/Kuwait` before formatting times
- [ ] `python manage.py test ribaat_mail` passes
- [ ] one live send per message reviewed in Gmail, Outlook desktop, and iOS Mail

## Still open

Sender display name, final Arabic copy, refund/payment-failure policy figures
(`hold_until`, `refund_expected_days`), the CDN origin, and whether
`user_name` (auth) and `student_name` (academic/billing) should be unified into
one key. See `emails/README.md` for the full design documentation.
