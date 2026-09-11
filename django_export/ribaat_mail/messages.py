"""Registry of every transactional message.

One entry per email. `subject` is the Arabic subject line lifted from the
template's {% block title %}; `required` documents the context keys the body
reads, so a missing value fails loudly in tests instead of rendering a blank.

Subjects may contain {placeholders} — they are formatted with the same context
that renders the body.
"""

MESSAGES = {
    # --- auth -------------------------------------------------------------
    "email_verification": {
        "html": "emails/auth/email_verification.html",
        "text": "emails/txt/auth/email_verification.txt",
        "subject": "تفعيل البريد الإلكتروني",
        "required": ["user_name", "action_url", "expiry_hours"],
    },
    "password_reset": {
        "html": "emails/auth/password_reset.html",
        "text": "emails/txt/auth/password_reset.txt",
        "subject": "إعادة تعيين كلمة المرور",
        "required": ["user_name", "action_url", "expiry_minutes"],
    },
    "otp_code": {
        "html": "emails/auth/otp_code.html",
        "text": "emails/txt/auth/otp_code.txt",
        "subject": "رمز التحقق",
        "required": ["user_name", "otp_code", "expiry_minutes"],
    },
    "welcome": {
        "html": "emails/auth/welcome.html",
        "text": "emails/txt/auth/welcome.txt",
        "subject": "مرحبًا بك في منصة رباط الحنابلة",
        "required": ["user_name", "action_url"],
    },
    "password_changed": {
        "html": "emails/auth/password_changed.html",
        "text": "emails/txt/auth/password_changed.txt",
        "subject": "تم تغيير كلمة المرور",
        "required": ["user_name", "changed_at", "device_name", "ip_address"],
    },
    "new_signin_alert": {
        "html": "emails/auth/new_signin_alert.html",
        "text": "emails/txt/auth/new_signin_alert.txt",
        "subject": "تسجيل دخول جديد إلى حسابك",
        "required": [
            "user_name", "signin_at", "device_name", "location",
            "ip_address", "action_url",
        ],
    },

    # --- academic ---------------------------------------------------------
    "course_enrollment": {
        "html": "emails/academic/course_enrollment.html",
        "text": "emails/txt/academic/course_enrollment.txt",
        "subject": "تأكيد التسجيل في {course_title}",
        "required": [
            "student_name", "course_title", "teacher_name", "lessons_count",
            "course_duration", "course_code", "course_url",
        ],
    },
    "path_enrollment": {
        "html": "emails/academic/path_enrollment.html",
        "text": "emails/txt/academic/path_enrollment.txt",
        "subject": "تأكيد الالتحاق بـ{path_title}",
        "required": [
            "student_name", "path_title", "path_level", "courses_count",
            "first_course_title", "path_url",
        ],
    },
    "new_lecture": {
        "html": "emails/academic/new_lecture.html",
        "text": "emails/txt/academic/new_lecture.txt",
        "subject": "درس جديد في {course_title}",
        "required": [
            "student_name", "course_title", "lecture_title", "teacher_name",
            "lecture_duration", "published_at", "lecture_url",
        ],
    },
    "course_unlocked": {
        "html": "emails/academic/course_unlocked.html",
        "text": "emails/txt/academic/course_unlocked.txt",
        "subject": "إتاحة {course_title}",
        "required": [
            "student_name", "prerequisite_title", "course_title",
            "teacher_name", "lessons_count", "path_title", "course_url",
        ],
    },
    "certificate_issued_course": {
        "html": "emails/academic/certificate_issued_course.html",
        "text": "emails/txt/academic/certificate_issued_course.txt",
        "subject": "شهادة إتمام {course_title}",
        "required": [
            "student_name", "course_title", "issue_date", "certificate_id",
            "certificate_url", "verify_url", "qr_url",
        ],
    },
    "certificate_issued_path": {
        "html": "emails/academic/certificate_issued_path.html",
        "text": "emails/txt/academic/certificate_issued_path.txt",
        "subject": "شهادة إتمام {path_title}",
        "required": [
            "student_name", "path_title", "courses_count", "sanad_note",
            "issue_date", "certificate_id", "certificate_url", "verify_url",
            "qr_url",
        ],
    },
    "admin_announcement": {
        "html": "emails/academic/admin_announcement.html",
        "text": "emails/txt/academic/admin_announcement.txt",
        "subject": "{announcement_title}",
        "required": [
            "student_name", "announcement_title", "announcement_body",
            "issued_by", "announced_at", "announcement_scope",
            "announcement_url",
        ],
    },

    # --- billing ----------------------------------------------------------
    "payment_receipt": {
        "html": "emails/billing/payment_receipt.html",
        "text": "emails/txt/billing/payment_receipt.txt",
        "subject": "إيصال دفع {receipt_number}",
        "required": [
            "student_name", "receipt_number", "item_title",
            "payment_method_label", "paid_at", "amount", "currency",
            "receipt_url",
        ],
    },
    "invoice": {
        "html": "emails/billing/invoice.html",
        "text": "emails/txt/billing/invoice.txt",
        "subject": "فاتورة {invoice_number}",
        "required": [
            "student_name", "invoice_number", "issue_date", "due_date",
            "invoice_status", "invoice_lines", "subtotal", "discount",
            "total", "currency", "invoice_url",
        ],
    },
    "payment_failed": {
        "html": "emails/billing/payment_failed.html",
        "text": "emails/txt/billing/payment_failed.txt",
        "subject": "تعذّر إتمام عملية الدفع",
        "required": [
            "student_name", "item_title", "amount_with_currency",
            "payment_method_label", "attempted_at", "failure_reason",
            "hold_until", "retry_url",
        ],
    },
    "refund": {
        "html": "emails/billing/refund.html",
        "text": "emails/txt/billing/refund.txt",
        "subject": "إشعار استرداد مبلغ {refund_reference}",
        "required": [
            "student_name", "refund_reference", "item_title",
            "refund_amount_with_currency", "refund_method", "receipt_number",
            "refunded_at", "refund_expected_days", "receipt_url",
        ],
    },
}
