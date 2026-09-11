"""Ribaat transactional email package.

Public API:

    from ribaat_mail import send

    send("payment_receipt", to=user.email, context={...})

Everything else in this package is implementation detail.
"""
from .sender import send, render  # noqa: F401
