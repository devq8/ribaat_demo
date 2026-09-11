"""Locale formatting for Ribaat email context.

Conventions settled with the client:
  · Dates are Gregorian only, Arabic month names.
  · Digits are Western (0-9) everywhere — no Arabic-Indic transliteration.
  · Clock times are 12-hour with AM/PM.  Durations stay HH:MM:SS.
  · Currency is KD (د.ك), three decimals, no tax or registration fields.

Every value passed into a template should be pre-formatted here — the templates
themselves contain no formatting filters beyond `linebreaksbr`.
"""
from datetime import date, datetime, timedelta
from decimal import Decimal

AR_MONTHS = [
    "يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو",
    "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر",
]

CURRENCY = "د.ك"


def ar_date(value: date) -> str:
    """12 يوليو 2026"""
    return f"{value.day} {AR_MONTHS[value.month - 1]} {value.year}"


def ar_time(value: datetime) -> str:
    """9:14 PM — 12-hour, no leading zero on the hour."""
    return value.strftime("%I:%M %p").lstrip("0")


def ar_datetime(value: datetime) -> str:
    """12 يوليو 2026 — 9:14 PM"""
    return f"{ar_date(value.date())} — {ar_time(value)}"


def duration(value) -> str:
    """HH:MM:SS. Accepts a timedelta or a number of seconds."""
    total = int(value.total_seconds() if isinstance(value, timedelta) else value)
    h, rem = divmod(total, 3600)
    m, s = divmod(rem, 60)
    return f"{h:02d}:{m:02d}:{s:02d}"


def kd(amount) -> str:
    """25.000 — bare amount, three decimals. Pair with CURRENCY in templates."""
    return f"{Decimal(amount):.3f}"


def kd_with_currency(amount) -> str:
    """25.000 د.ك"""
    return f"{kd(amount)} {CURRENCY}"
