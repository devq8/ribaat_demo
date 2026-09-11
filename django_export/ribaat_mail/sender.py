"""Render and send a Ribaat transactional email.

    from ribaat_mail import send

    send(
        "payment_receipt",
        to=student.email,
        context={
            "student_name": student.full_name,
            "receipt_number": receipt.number,
            ...
        },
    )

Sends multipart/alternative: the plain-text body first, the HTML body as the
alternative, exactly as every mail client expects.
"""
from django.conf import settings
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string

from .messages import MESSAGES


class UnknownMessage(KeyError):
    pass


class MissingContext(KeyError):
    pass


def _base_context(extra):
    """Values every template reads from the shared shell."""
    ctx = {
        "site_name": getattr(settings, "RIBAAT_SITE_NAME", "منصة رباط الحنابلة"),
        "institution_address": getattr(
            settings, "RIBAAT_INSTITUTION_ADDRESS", "دولة الكويت"
        ),
        "support_email": getattr(
            settings, "RIBAAT_SUPPORT_EMAIL", "support@ribaat.net"
        ),
        # Absolute https:// origin the two logo files are served from.
        # base.html builds {{ asset_base }}/email/ribaat-logo-onlight.png
        "asset_base": settings.RIBAAT_EMAIL_ASSET_BASE.rstrip("/"),
    }
    ctx.update(extra or {})
    return ctx


def render(key, context=None):
    """Return (subject, text_body, html_body) without sending."""
    try:
        spec = MESSAGES[key]
    except KeyError:
        raise UnknownMessage(f"No such email: {key!r}") from None

    ctx = _base_context(context)

    missing = [k for k in spec["required"] if k not in ctx]
    if missing:
        raise MissingContext(f"{key}: missing context {', '.join(missing)}")

    subject = spec["subject"].format(**ctx)
    text = render_to_string(spec["text"], ctx)
    html = render_to_string(spec["html"], ctx)
    return subject, text, html


def send(key, to, context=None, reply_to=None, attachments=None, **kwargs):
    """Render and deliver. `to` may be a string or a list of addresses."""
    subject, text, html = render(key, context)
    recipients = [to] if isinstance(to, str) else list(to)

    message = EmailMultiAlternatives(
        subject=subject,
        body=text,
        from_email=getattr(
            settings, "RIBAAT_FROM_EMAIL", settings.DEFAULT_FROM_EMAIL
        ),
        to=recipients,
        reply_to=reply_to or getattr(settings, "RIBAAT_REPLY_TO", None),
        **kwargs,
    )
    message.attach_alternative(html, "text/html")
    for attachment in attachments or []:
        message.attach(*attachment)
    message.send()
    return message
