"""Optional: browse every email in the browser during development.

    # urls.py
    if settings.DEBUG:
        urlpatterns += [path("_email/", include("ribaat_mail.preview_urls"))]

    /_email/                     index of all messages
    /_email/payment_receipt/     the HTML body
    /_email/payment_receipt/txt/ the plain-text body
"""
from django.http import HttpResponse, HttpResponseNotFound
from django.urls import path

from .messages import MESSAGES
from .tests import SAMPLES
from . import render


def index(request):
    links = "".join(
        f'<li><a href="{k}/">{k}</a> · <a href="{k}/txt/">txt</a></li>'
        for k in MESSAGES
    )
    return HttpResponse(f"<ul dir='ltr'>{links}</ul>")


def preview(request, key, fmt=None):
    if key not in MESSAGES:
        return HttpResponseNotFound(key)
    subject, text, html = render(key, SAMPLES.get(key, {}))
    if fmt == "txt":
        return HttpResponse(f"Subject: {subject}\n\n{text}", content_type="text/plain; charset=utf-8")
    return HttpResponse(html)


urlpatterns = [
    path("", index),
    path("<str:key>/", preview),
    path("<str:key>/<str:fmt>/", preview),
]
