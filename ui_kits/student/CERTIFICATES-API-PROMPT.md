# Prompt for Claude Code — Certificates API (Django)

Copy everything below the line into Claude Code, in the Django repo.

---

## Task

Build the read API that powers the student **الإجازات والشهادات** screen
(`ui_kits/student/StudentCertificates.dc.html` in the design project). The
frontend is already built and consumes a fixed shape — implement the backend to
match it exactly. Django + DRF, Arabic-only responses, RTL frontend.

Do not change the response field names or nesting: the UI reads them directly.

## Domain rules (these drive the data model)

There are exactly **two kinds of documents**, and they are not
interchangeable:

1. **شهادة اجتياز** — issued by the school. Two sub-kinds:
   - **Program certificate** — issued once, after ALL levels of a program are
     passed. The major document.
   - **Level certificate** — issued at the end of each level (one academic
     year). Minor; there can be several per program.
2. **إجازة بالسند المتصل** — granted by a named شيخ مُجيز for a **standalone
   course** (a دورة outside any program). Never tied to a program or level.

Other rules:
- A program has **1 to 5 levels** (never more). Level count varies per program;
  do not hardcode 3.
- Programs are separate entities: رباط الحنابلة، رباط الشافعية، رباط المالكية،
  and more later. A student may be enrolled in several, or none.
- A level is "current" when it is the first not-yet-passed level of a program
  the student is enrolled in.
- Every issued document has an immutable **serial** (verification code) and a
  **QR code** that encodes its public verification URL.
- Unearned certificates are still returned by the API — the UI shows them
  deactivated to encourage the student. Send them with `issued: false` and no
  serial/QR.

## Models

Create/extend in an app named `certificates` (reuse existing enrolment/course
models if they exist — inspect first, don't duplicate):

- `Program` — `name` (ar), `slug`, `level_count` (1–5, validated),
  `is_active`, `order`
- `ProgramLevel` — FK `program`, `index` (1-based), `name` (ar, e.g.
  المستوى الأول), `course_count`, unique together (program, index)
- `Enrollment` — FK `student`, FK `program`, `enrolled_at`, `status`
- `LevelCertificate` — FK `student`, FK `program_level`, `serial` (unique,
  e.g. `HB-1446-L001`), `grade_label` (ar: ممتاز / جيد جداً),
  `grade_percent`, `issued_on` (store Gregorian; also expose Hijri string),
  `pdf_file`
- `ProgramCertificate` — FK `student`, FK `program`, `serial` (e.g.
  `HB-1448-P001`), `grade_label`, `grade_percent`, `issued_on`, `pdf_file`
- `Ijaza` — FK `student`, FK `course` (standalone course), `mujiz` (FK to
  teacher/scholar), `serial`, `issued_on`, `pdf_file`
- Level progress: derive `courses_completed` from existing lesson/course
  completion records — do not store a duplicate counter.

Serials must be generated server-side and never re-issued. Add a DB unique
constraint plus a `django.db.models.Q`-based check that a student cannot hold
two certificates for the same level or program.

## Endpoints

All under `/api/student/certificates/`, DRF, session or token auth, always
scoped to `request.user` — never accept a student id in the query string.

### `GET /api/student/certificates/`

The single call that renders the whole screen. Response:

```json
{
  "summary": {
    "shahada_count": 6,
    "ijaza_count": 9,
    "enrolled_program_count": 2,
    "total_program_count": 3,
    "latest_shahada_label": "شهادة المستوى الأول",
    "latest_ijaza_label": "الموقظة في علم الحديث"
  },
  "programs": [
    {
      "id": "HB",
      "name": "رباط الحنابلة",
      "level_count": 3,
      "enrolled": true,
      "status_label": "مُتمّ",
      "program_certificate": {
        "issued": true,
        "serial": "HB-1448-P001",
        "grade_label": "ممتاز",
        "grade_percent": "٩٦٪",
        "issued_on_hijri": "٢ صفر ١٤٤٨هـ",
        "issued_on": "2026-07-28",
        "holder_name": "محمد بن أحمد الرشيدي",
        "qr_url": "https://ribaat.net/verify/HB-1448-P001",
        "qr_png": "/api/certificates/HB-1448-P001/qr.png",
        "pdf_url": "/api/certificates/HB-1448-P001/pdf",
        "levels_passed": 3
      },
      "levels": [
        {
          "index": 1,
          "name": "المستوى الأول",
          "issued": true,
          "serial": "HB-1446-L001",
          "grade_label": "ممتاز",
          "grade_percent": "٩٤٪",
          "issued_on_hijri": "١٨ صفر ١٤٤٦هـ",
          "course_count": 6,
          "courses_completed": 6,
          "is_current": false,
          "qr_url": "https://ribaat.net/verify/HB-1446-L001",
          "qr_png": "/api/certificates/HB-1446-L001/qr.png",
          "pdf_url": "/api/certificates/HB-1446-L001/pdf"
        }
      ]
    }
  ],
  "ijazat": [
    {
      "id": 104,
      "book_title": "الأربعون النووية",
      "mujiz_name": "د. خالد بن مبارك المطيري",
      "serial": "RB-1445-0104",
      "issued_on_hijri": "٢ رجب ١٤٤٥هـ",
      "issued_on_gregorian_ar": "١٤ يناير ٢٠٢٤م",
      "qr_url": "https://ribaat.net/verify/RB-1445-0104",
      "qr_png": "/api/certificates/RB-1445-0104/qr.png",
      "pdf_url": "/api/certificates/RB-1445-0104/pdf"
    }
  ]
}
```

Shape rules the UI depends on:
- `programs` includes **every active program**, enrolled or not, ordered by
  `Program.order`. Not-enrolled programs return `enrolled: false`,
  `program_certificate.issued: false`, and all levels `issued: false`.
- `levels` always has exactly `level_count` entries, in `index` order.
- On an unissued certificate omit `serial`, `qr_*`, `pdf_url` entirely (or
  `null`) — never fabricate placeholders.
- Exactly one level per enrolled program may have `is_current: true`.
- `grade_percent` and the Hijri dates are **pre-formatted Arabic-numeral
  strings** — the frontend does not format numbers. Send Arabic-Indic digits
  (٠١٢٣٤٥٦٧٨٩) for these display fields; keep ISO `issued_on` alongside for
  sorting/machine use.
- `holder_name` is the student's full name as it should be printed.

### `GET /api/certificates/<serial>/qr.png`

Server-rendered QR PNG encoding the verification URL. Support
`?theme=light|dark` (dark = light modules on dark ground — the UI has a dark
mode) and `?size=` (clamp 120–600px). Cache immutably; the content never
changes for a given serial.

### `GET /api/certificates/<serial>/pdf`

Streams the certificate PDF. Owner or staff only; 404 (not 403) for anyone
else so serials can't be probed.

### `GET /api/verify/<serial>/`

**Public, unauthenticated** verification lookup (this backs the
الاستعلام عن شهادة page). Returns only what a verifier may see — kind
(شهادة اجتياز / إجازة بالسند المتصل), program or book title, holder name,
issue date, and `valid: true|false`. No email, no internal ids, no progress
data. Rate-limit it (e.g. 30/hour/IP) and return the same `valid: false`
body for unknown and revoked serials.

## Non-functional

- Avoid N+1: one query per collection using `select_related` /
  `prefetch_related`; the whole main endpoint should be a bounded number of
  queries regardless of program/level count. Add a test asserting the query
  count with `assertNumQueries`.
- Hijri conversion in one utility (`hijri_converter` or equivalent), never
  inline; one helper that also renders Arabic-Indic digits.
- Permissions: a student sees only their own documents. Add a test that user A
  gets 404 on user B's PDF and QR.
- Tests to include: a student with nothing (all `issued: false`, programs still
  listed), a student mid-program (one `is_current` level, partial
  `courses_completed`), a student who completed a 5-level program, and a
  program with 1 level.
- `python manage.py makemigrations` + a data migration seeding the three known
  programs with their level counts and Arabic level names.
- Add DRF `@extend_schema` / drf-spectacular annotations so the shape is
  documented.

## Deliverables

1. Models + migrations (including the program seed migration).
2. Serializers matching the JSON above field-for-field.
3. Views/URLs for the four endpoints.
4. QR generation utility + Hijri/Arabic-numeral formatting utility.
5. Tests covering the four student scenarios, the permission checks, and the
   query-count budget.

Read the existing codebase first and reuse its enrolment, course, user and
teacher models rather than introducing parallel ones. Report anything in this
spec that conflicts with what's already there instead of silently diverging.
