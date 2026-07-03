from __future__ import annotations

import os
import re
import sqlite3
import uuid
from pathlib import Path
from urllib.parse import urlparse

from dotenv import load_dotenv
from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS

from emailer import send_snapshot_email
from pdf_receipt import ClaimReceipt, build_claim_snapshot_pdf

ROOT = Path(__file__).resolve().parent
MVP_ROOT = ROOT.parent
WEB_ROOT = MVP_ROOT / "web"
PDF_ROOT = ROOT / "generated"
SCHEMA_PATH = ROOT / "schema.sql"

load_dotenv(ROOT / ".env")

app = Flask(__name__, static_folder=str(WEB_ROOT), static_url_path="")
CORS(app, resources={r"/api/*": {"origins": "*"}})


def db_path() -> Path:
    return ROOT / os.getenv("DATABASE_PATH", "auditgpt.db")


def get_db() -> sqlite3.Connection:
    conn = sqlite3.connect(db_path())
    conn.row_factory = sqlite3.Row
    return conn


def init_db() -> None:
    with get_db() as conn:
        conn.executescript(SCHEMA_PATH.read_text())


@app.route("/")
def index():
    return send_from_directory(WEB_ROOT, "index.html")


@app.route("/<path:path>")
def static_files(path: str):
    return send_from_directory(WEB_ROOT, path)


@app.post("/api/snapshot")
def create_snapshot():
    payload = request.get_json(silent=True) or request.form.to_dict()
    clinic_name = clean_text(payload.get("clinic_name", ""), max_len=120)
    clinic_url = clean_url(payload.get("clinic_url", ""))
    email = clean_email(payload.get("email", ""))

    errors = {}
    if not clinic_name:
        errors["clinic_name"] = "Clinic name is required."
    if not clinic_url:
        errors["clinic_url"] = "A valid website URL is required."
    if not email:
        errors["email"] = "A valid email is required."
    if errors:
        return jsonify({"ok": False, "errors": errors}), 400

    init_db()
    receipt_id = f"AGPT-{uuid.uuid4().hex[:10].upper()}"
    pdf_path = build_claim_snapshot_pdf(
        ClaimReceipt(
            clinic_name=clinic_name,
            clinic_url=clinic_url,
            claim_analyzed="Homepage and visible offer language queued for initial snapshot review.",
            risk_level="Medium",
            evidence_gap=(
                "A free snapshot has not completed a full source review. The paid $497 audit "
                "reviews selected claims against visible evidence, source references, and safer rewrite options."
            ),
            safer_rewrite=(
                "Use specific, supportable service descriptions and avoid certain outcome language, "
                "medical certainty, or unsupported before/after implications."
            ),
            references=[
                "FTC health products advertising guidance",
                "FDA public enforcement and warning-letter sources where applicable",
                "Clinic website and public marketing pages supplied by requester",
            ],
            receipt_id=receipt_id,
        ),
        PDF_ROOT,
    )

    with get_db() as conn:
        cursor = conn.execute(
            """
            INSERT INTO snapshot_requests (clinic_name, clinic_url, email, status, pdf_path)
            VALUES (?, ?, ?, ?, ?)
            """,
            (clinic_name, clinic_url, email, "snapshot_generated", str(pdf_path)),
        )
        request_id = cursor.lastrowid
        audit_cursor = conn.execute(
            """
            INSERT INTO audits (request_id, clinic_name, clinic_url, package_type, status)
            VALUES (?, ?, ?, ?, ?)
            """,
            (request_id, clinic_name, clinic_url, "free_snapshot", "snapshot_generated"),
        )
        audit_id = audit_cursor.lastrowid
        conn.execute(
            """
            INSERT INTO claim_records (
              audit_id, claim_text, source_url, source_surface, risk_level, risk_category,
              evidence_gap, suggested_rewrite, vertical, status, reference_notes
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """,
            (
                audit_id,
                "Initial visible marketing claims queued for review.",
                clinic_url,
                "website",
                "Medium",
                "unreviewed_marketing_claim",
                "Free snapshot created. Full evidence review requires paid audit.",
                "Prefer supportable, specific service language with clear limits.",
                "med_spa",
                "queued",
                "Auto-created from free snapshot request.",
            ),
        )
        conn.commit()

    email_status = send_snapshot_email(email, clinic_name, pdf_path)
    return jsonify(
        {
            "ok": True,
            "request_id": request_id,
            "receipt_id": receipt_id,
            "email_status": email_status,
            "pdf_path": str(pdf_path),
            "next_step": "Offer the $497 Reviewed Claim Audit.",
        }
    )


@app.get("/api/health")
def health():
    init_db()
    return jsonify({"ok": True, "database": str(db_path())})


def clean_text(value: str, max_len: int = 500) -> str:
    return re.sub(r"\s+", " ", str(value).strip())[:max_len]


def clean_email(value: str) -> str:
    value = str(value).strip().lower()
    if re.match(r"^[^@\s]+@[^@\s]+\.[^@\s]+$", value):
        return value
    return ""


def clean_url(value: str) -> str:
    value = str(value).strip()
    if value and not value.startswith(("http://", "https://")):
        value = "https://" + value
    parsed = urlparse(value)
    if parsed.scheme in {"http", "https"} and parsed.netloc and "." in parsed.netloc:
        return value[:500]
    return ""


if __name__ == "__main__":
    init_db()
    app.run(host="0.0.0.0", port=int(os.getenv("PORT", "8080")), debug=True)
