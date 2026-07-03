from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path
from typing import Iterable

from reportlab.lib import colors
from reportlab.lib.pagesizes import LETTER
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle


@dataclass
class ClaimReceipt:
    clinic_name: str
    clinic_url: str
    claim_analyzed: str
    risk_level: str
    evidence_gap: str
    safer_rewrite: str
    references: list[str]
    receipt_id: str


def _styles() -> dict[str, ParagraphStyle]:
    base = getSampleStyleSheet()
    return {
        "title": ParagraphStyle(
            "title",
            parent=base["Title"],
            fontName="Helvetica-Bold",
            fontSize=22,
            leading=26,
            textColor=colors.HexColor("#10231d"),
            spaceAfter=12,
        ),
        "label": ParagraphStyle(
            "label",
            parent=base["BodyText"],
            fontName="Helvetica-Bold",
            fontSize=9,
            textColor=colors.HexColor("#5c6b63"),
            leading=12,
        ),
        "body": ParagraphStyle(
            "body",
            parent=base["BodyText"],
            fontSize=10.5,
            leading=15,
            textColor=colors.HexColor("#16231d"),
        ),
        "small": ParagraphStyle(
            "small",
            parent=base["BodyText"],
            fontSize=8,
            leading=11,
            textColor=colors.HexColor("#66746d"),
        ),
    }


def build_claim_snapshot_pdf(receipt: ClaimReceipt, output_dir: str | Path) -> Path:
    output_path = Path(output_dir)
    output_path.mkdir(parents=True, exist_ok=True)
    pdf_path = output_path / f"{receipt.receipt_id}.pdf"
    styles = _styles()

    doc = SimpleDocTemplate(
        str(pdf_path),
        pagesize=LETTER,
        rightMargin=0.65 * inch,
        leftMargin=0.65 * inch,
        topMargin=0.7 * inch,
        bottomMargin=0.65 * inch,
    )

    risk_color = {
        "High": colors.HexColor("#9f2d2d"),
        "Medium": colors.HexColor("#9a6a18"),
        "Low": colors.HexColor("#22724d"),
    }.get(receipt.risk_level, colors.HexColor("#5c6b63"))

    rows = [
        ["Clinic", receipt.clinic_name],
        ["URL reviewed", receipt.clinic_url],
        ["Receipt ID", receipt.receipt_id],
        ["Risk level", receipt.risk_level],
    ]
    meta = Table(rows, colWidths=[1.4 * inch, 4.9 * inch])
    meta.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (0, -1), colors.HexColor("#eff4ef")),
                ("TEXTCOLOR", (0, 0), (0, -1), colors.HexColor("#405149")),
                ("TEXTCOLOR", (1, 3), (1, 3), risk_color),
                ("FONTNAME", (0, 0), (0, -1), "Helvetica-Bold"),
                ("FONTNAME", (1, 3), (1, 3), "Helvetica-Bold"),
                ("GRID", (0, 0), (-1, -1), 0.25, colors.HexColor("#d8e0da")),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("PADDING", (0, 0), (-1, -1), 7),
            ]
        )
    )

    story = [
        Paragraph("AuditGPT Claim Snapshot Receipt", styles["title"]),
        Paragraph(
            "A conservative marketing-claim review receipt. This is not legal, medical, regulatory, or advertising-platform advice.",
            styles["small"],
        ),
        Spacer(1, 14),
        meta,
        Spacer(1, 16),
    ]
    story.extend(_section("Claim Analyzed", receipt.claim_analyzed, styles))
    story.extend(_section("Evidence Gap", receipt.evidence_gap, styles))
    story.extend(_section("Safer Rewrite", receipt.safer_rewrite, styles))
    story.extend(_section("References", _refs(receipt.references), styles))
    story.extend(
        [
            Spacer(1, 18),
            Paragraph(
                "Language note: this receipt uses reviewed, evidence gap, risk level, and safer rewrite. It is not a legal, medical, regulatory, or advertising-platform clearance artifact.",
                styles["small"],
            ),
        ]
    )
    doc.build(story)
    return pdf_path


def _section(label: str, value: str, styles: dict[str, ParagraphStyle]) -> list:
    return [
        Paragraph(label.upper(), styles["label"]),
        Paragraph(value.replace("\n", "<br/>"), styles["body"]),
        Spacer(1, 12),
    ]


def _refs(references: Iterable[str]) -> str:
    refs = list(references)
    if not refs:
        return "No source reference attached yet. A paid review should attach public source categories and URLs where available."
    return "<br/>".join(f"- {ref}" for ref in refs)
