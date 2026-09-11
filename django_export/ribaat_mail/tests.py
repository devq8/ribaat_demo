"""Smoke tests: every registered message renders with representative context.

Run:  python manage.py test ribaat_mail
"""
from datetime import datetime
from django.test import TestCase, override_settings

from .formatting import ar_date, ar_datetime, duration, kd, kd_with_currency
from .messages import MESSAGES
from . import render

NAME = "عبد الرحمن الحمود"
WHEN = datetime(2026, 7, 12, 21, 14)

SAMPLES = {
    "email_verification": {"user_name": NAME, "action_url": "https://www.ribaat.net/auth/verify/x", "expiry_hours": 24},
    "password_reset": {"user_name": NAME, "action_url": "https://www.ribaat.net/auth/reset/x", "expiry_minutes": 30},
    "otp_code": {"user_name": NAME, "otp_code": "482 197", "expiry_minutes": 10},
    "welcome": {"user_name": NAME, "action_url": "https://www.ribaat.net/student"},
    "password_changed": {"user_name": NAME, "changed_at": ar_datetime(WHEN), "device_name": "Safari على iPad", "ip_address": "176.108.42.17"},
    "new_signin_alert": {"user_name": NAME, "signin_at": ar_datetime(WHEN), "device_name": "Safari على iPad", "location": "الكويت", "ip_address": "176.108.42.17", "action_url": "https://www.ribaat.net/student/settings/security"},
    "course_enrollment": {"student_name": NAME, "course_title": "ثلاثة الأصول", "teacher_name": "د. عبد العزيز العيدان", "lessons_count": 9, "course_duration": duration(16920), "course_code": "AQD-101", "course_url": "https://www.ribaat.net/courses/x"},
    "path_enrollment": {"student_name": NAME, "path_title": "مسار العقيدة — المستوى الأول", "path_level": "المستوى الأول", "courses_count": 5, "first_course_title": "ثلاثة الأصول", "path_url": "https://www.ribaat.net/paths/x"},
    "new_lecture": {"student_name": NAME, "course_title": "ثلاثة الأصول", "lecture_title": "الدرس الرابع", "teacher_name": "د. عبد العزيز العيدان", "lecture_duration": duration(2292), "published_at": ar_date(WHEN.date()), "lecture_url": "https://www.ribaat.net/courses/x/lessons/4"},
    "course_unlocked": {"student_name": NAME, "prerequisite_title": "ثلاثة الأصول", "course_title": "القواعد الأربع", "teacher_name": "د. عبد العزيز العيدان", "lessons_count": 6, "path_title": "مسار العقيدة — المستوى الأول", "course_url": "https://www.ribaat.net/courses/y"},
    "certificate_issued_course": {"student_name": NAME, "course_title": "ثلاثة الأصول", "issue_date": ar_date(WHEN.date()), "certificate_id": "RBT-2026-AQD-04173", "certificate_url": "https://www.ribaat.net/student/certificates/x", "verify_url": "https://www.ribaat.net/student/certificates?id=x", "qr_url": "https://cdn.ribaat.net/certificates/qr/x.png"},
    "certificate_issued_path": {"student_name": NAME, "path_title": "مسار العقيدة — المستوى الأول", "courses_count": 5, "sanad_note": "إجازة بالسند المتصل", "issue_date": ar_date(WHEN.date()), "certificate_id": "RBT-2026-PTH-00218", "certificate_url": "https://www.ribaat.net/student/certificates/y", "verify_url": "https://www.ribaat.net/student/certificates?id=y", "qr_url": "https://cdn.ribaat.net/certificates/qr/y.png"},
    "admin_announcement": {"student_name": NAME, "announcement_title": "إعلان", "announcement_body": "نص الإعلان.", "issued_by": "إدارة المنصة", "announced_at": ar_date(WHEN.date()), "announcement_scope": "طلاب المسار", "announcement_url": "https://www.ribaat.net/announcements/1"},
    "payment_receipt": {"student_name": NAME, "receipt_number": "RCP-2026-01184", "item_title": "الالتحاق بمسار العقيدة", "payment_method_label": "كي‑نت — تنتهي بـ 4417", "paid_at": ar_datetime(WHEN), "amount": kd(25), "currency": "د.ك", "receipt_url": "https://www.ribaat.net/student/billing/x"},
    "invoice": {"student_name": NAME, "invoice_number": "INV-2026-00742", "issue_date": ar_date(WHEN.date()), "due_date": ar_date(WHEN.date()), "invoice_status": "غير مسددة", "invoice_lines": [{"description": "الالتحاق", "amount": kd(30)}], "subtotal": kd(30), "discount": kd(5), "total": kd(25), "currency": "د.ك", "invoice_url": "https://www.ribaat.net/student/billing/y"},
    "payment_failed": {"student_name": NAME, "item_title": "الالتحاق بمسار العقيدة", "amount_with_currency": kd_with_currency(25), "payment_method_label": "كي‑نت — تنتهي بـ 4417", "attempted_at": ar_datetime(WHEN), "failure_reason": "رفض من مزوّد الدفع", "hold_until": ar_date(WHEN.date()), "retry_url": "https://www.ribaat.net/student/billing/retry/x"},
    "refund": {"student_name": NAME, "refund_reference": "RFD-2026-00219", "item_title": "الالتحاق بمسار العقيدة", "refund_amount_with_currency": kd_with_currency(25), "refund_method": "إلى وسيلة الدفع الأصلية", "receipt_number": "RCP-2026-01184", "refunded_at": ar_date(WHEN.date()), "refund_expected_days": 7, "receipt_url": "https://www.ribaat.net/student/billing/x"},
}


@override_settings(RIBAAT_EMAIL_ASSET_BASE="https://cdn.ribaat.net")
class RenderAllMessages(TestCase):
    def test_every_message_has_a_sample(self):
        self.assertEqual(set(MESSAGES), set(SAMPLES))

    def test_all_render(self):
        for key, context in SAMPLES.items():
            with self.subTest(email=key):
                subject, text, html = render(key, context)
                self.assertTrue(subject.strip())
                self.assertTrue(text.strip())
                self.assertIn("<!doctype html>", html.lower())
                # nothing unresolved left behind
                self.assertNotIn("{{", html)
                self.assertNotIn("{%", html)
                # Gmail clips beyond ~102KB
                self.assertLess(len(html.encode()), 102_000)
