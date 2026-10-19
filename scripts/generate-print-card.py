"""Build the two-sided business card with printer bleed and trim metadata."""

from io import BytesIO
import json
from pathlib import Path

from pypdf import PdfReader, PdfWriter
from pypdf.generic import RectangleObject
from reportlab.graphics import renderPDF
from reportlab.graphics.barcode.qr import QrCodeWidget
from reportlab.graphics.shapes import Drawing
from reportlab.lib.colors import HexColor
from reportlab.lib.units import inch, mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
TRIM_WIDTH = 3.5 * inch
TRIM_HEIGHT = 2 * inch
BLEED = 3 * mm
SAFE_MARGIN = 4 * mm
PAGE_WIDTH = TRIM_WIDTH + 2 * BLEED
PAGE_HEIGHT = TRIM_HEIGHT + 2 * BLEED
SAFE_LEFT = BLEED + SAFE_MARGIN
SAFE_RIGHT = BLEED + TRIM_WIDTH - SAFE_MARGIN
OUTPUT_NAME = "axel-coracero-tarjeta-imprenta.pdf"
PRINT_URL = json.loads((ROOT / "scripts/card-links.json").read_text(encoding="utf-8"))["print"]


def register_fonts() -> None:
    font_pairs = (
        (Path("C:/Windows/Fonts/arial.ttf"), Path("C:/Windows/Fonts/arialbd.ttf")),
        (
            Path("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"),
            Path("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"),
        ),
    )
    for regular, bold in font_pairs:
        if regular.exists() and bold.exists():
            pdfmetrics.registerFont(TTFont("CardRegular", str(regular)))
            pdfmetrics.registerFont(TTFont("CardBold", str(bold)))
            return
    raise FileNotFoundError("Arial or DejaVu Sans fonts are required to generate the card")


def draw_line(pdf: canvas.Canvas, text: str, x: float, y: float, font: str, size: float) -> None:
    if x + pdfmetrics.stringWidth(text, font, size) > SAFE_RIGHT:
        raise ValueError(f"Text exceeds the safe area: {text}")
    pdf.setFont(font, size)
    pdf.drawString(x, y, text)


def draw_front(pdf: canvas.Canvas) -> None:
    pdf.setFillColor(HexColor("#f5f4ef"))
    pdf.rect(0, 0, PAGE_WIDTH, PAGE_HEIGHT, stroke=0, fill=1)
    pdf.setFillColor(HexColor("#8da8ff"))
    pdf.rect(0, 0, BLEED + 4, PAGE_HEIGHT, stroke=0, fill=1)

    pdf.setFillColor(HexColor("#17243a"))
    draw_line(pdf, "Axel Coracero", SAFE_LEFT, 116, "CardBold", 22)
    draw_line(pdf, "Hagamos tu día más fácil.", SAFE_LEFT, 91, "CardRegular", 13)

    pdf.setFillColor(HexColor("#4d5b6a"))
    draw_line(pdf, "Páginas web · Bots de mensajes", SAFE_LEFT, 66, "CardRegular", 8.5)
    draw_line(pdf, "Herramientas a medida", SAFE_LEFT, 54, "CardRegular", 8.5)
    pdf.setFillColor(HexColor("#17243a"))
    draw_line(pdf, "WhatsApp: +52 418 177 4447", SAFE_LEFT, 29, "CardBold", 8.5)


def draw_back(pdf: canvas.Canvas) -> None:
    pdf.setFillColor(HexColor("#17243a"))
    pdf.rect(0, 0, PAGE_WIDTH, PAGE_HEIGHT, stroke=0, fill=1)

    qr_background = 72
    qr_size = 62
    qr_x = (PAGE_WIDTH - qr_background) / 2
    qr_y = 64
    pdf.setFillColor(HexColor("#ffffff"))
    pdf.rect(qr_x, qr_y, qr_background, qr_background, stroke=0, fill=1)

    qr_code = QrCodeWidget(PRINT_URL, barLevel="M")
    left, bottom, right, top = qr_code.getBounds()
    qr_scale = qr_size / (right - left)
    drawing = Drawing(qr_size, qr_size, transform=[qr_scale, 0, 0, qr_scale, 0, 0])
    drawing.add(qr_code)
    renderPDF.draw(drawing, pdf, qr_x + 5, qr_y + 5)

    pdf.setFillColor(HexColor("#ffffff"))
    pdf.setFont("CardBold", 8)
    pdf.drawCentredString(PAGE_WIDTH / 2, 46, "ESCANEA Y EXPLORA MIS DEMOS")
    pdf.setFillColor(HexColor("#d4def0"))
    pdf.setFont("CardRegular", 7.5)
    pdf.drawCentredString(PAGE_WIDTH / 2, 31, "coracer0.github.io/presentasion/")


def build_pdf() -> bytes:
    buffer = BytesIO()
    pdf = canvas.Canvas(buffer, pagesize=(PAGE_WIDTH, PAGE_HEIGHT), pageCompression=1)
    pdf.setTitle("Tarjeta de Axel Coracero - 3 mm de sangrado")
    pdf.setAuthor("Axel Coracero")
    draw_front(pdf)
    pdf.showPage()
    draw_back(pdf)
    pdf.showPage()
    pdf.save()

    writer = PdfWriter()
    for page in PdfReader(BytesIO(buffer.getvalue())).pages:
        page.trimbox = RectangleObject([BLEED, BLEED, BLEED + TRIM_WIDTH, BLEED + TRIM_HEIGHT])
        page.bleedbox = RectangleObject([0, 0, PAGE_WIDTH, PAGE_HEIGHT])
        writer.add_page(page)
    writer.add_metadata({"/Title": "Tarjeta de Axel Coracero - imprenta", "/Author": "Axel Coracero"})
    output = BytesIO()
    writer.write(output)
    return output.getvalue()


def main() -> None:
    register_fonts()
    pdf_bytes = build_pdf()
    for directory in (ROOT / "output/pdf", ROOT / "public"):
        directory.mkdir(parents=True, exist_ok=True)
        (directory / OUTPUT_NAME).write_bytes(pdf_bytes)


if __name__ == "__main__":
    main()
