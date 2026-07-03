from __future__ import annotations

import os
import smtplib
from email.message import EmailMessage
from pathlib import Path


def send_snapshot_email(to_email: str, clinic_name: str, pdf_path: Path) -> str:
    """Send a Claim Snapshot email.

    If credentials are missing, return a skipped status so local demos still
    work without pretending an email was sent.
    """
    sendgrid_key = os.getenv("SENDGRID_API_KEY")
    if sendgrid_key:
        return _send_with_sendgrid(sendgrid_key, to_email, clinic_name, pdf_path)

    smtp_host = os.getenv("SMTP_HOST")
    smtp_user = os.getenv("SMTP_USERNAME")
    smtp_password = os.getenv("SMTP_PASSWORD")
    if smtp_host and smtp_user and smtp_password:
        return _send_with_smtp(to_email, clinic_name, pdf_path)

    return "email_skipped_missing_credentials"


def _message(to_email: str, clinic_name: str, pdf_path: Path) -> EmailMessage:
    from_email = os.getenv("FROM_EMAIL", "receipts@scrutexity.com")
    msg = EmailMessage()
    msg["Subject"] = f"Your AuditGPT Claim Snapshot for {clinic_name}"
    msg["From"] = from_email
    msg["To"] = to_email
    msg.set_content(
        f"""Hi,

Attached is your AuditGPT Claim Snapshot receipt for {clinic_name}.

This is a conservative marketing-claim review artifact. It identifies visible
claim language, possible evidence gaps, and safer rewrite options. It is not
legal, medical, regulatory, or advertising-platform advice.

If you want a reviewed $497 Claim Audit, reply with "review" and the page or
campaign you want prioritized.

Scrutexity / AuditGPT
"""
    )
    msg.add_attachment(
        pdf_path.read_bytes(),
        maintype="application",
        subtype="pdf",
        filename=pdf_path.name,
    )
    return msg


def _send_with_smtp(to_email: str, clinic_name: str, pdf_path: Path) -> str:
    msg = _message(to_email, clinic_name, pdf_path)
    port = int(os.getenv("SMTP_PORT", "587"))
    with smtplib.SMTP(os.environ["SMTP_HOST"], port) as server:
        server.starttls()
        server.login(os.environ["SMTP_USERNAME"], os.environ["SMTP_PASSWORD"])
        server.send_message(msg)
    return "email_sent_smtp"


def _send_with_sendgrid(sendgrid_key: str, to_email: str, clinic_name: str, pdf_path: Path) -> str:
    from sendgrid import SendGridAPIClient
    from sendgrid.helpers.mail import Attachment, FileContent, FileName, FileType, Mail
    import base64

    from_email = os.getenv("FROM_EMAIL", "receipts@scrutexity.com")
    message = Mail(
        from_email=from_email,
        to_emails=to_email,
        subject=f"Your AuditGPT Claim Snapshot for {clinic_name}",
        plain_text_content=(
            "Attached is your conservative Claim Snapshot receipt. "
            "It is not legal, medical, regulatory, or advertising-platform advice."
        ),
    )
    attachment = Attachment(
        FileContent(base64.b64encode(pdf_path.read_bytes()).decode("ascii")),
        FileName(pdf_path.name),
        FileType("application/pdf"),
        "attachment",
    )
    message.attachment = attachment
    SendGridAPIClient(sendgrid_key).send(message)
    return "email_sent_sendgrid"
