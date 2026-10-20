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
FULL_NAME = "Osmar Axel Coracero Godínez"


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


def draw_triangle(pdf: canvas.Canvas, points: tuple[tuple[float, float], ...], filled: bool = True) -> None:
    path = pdf.beginPath()
    path.moveTo(*points[0])
    for point in points[1:]:
        path.lineTo(*point)
    path.close()
    pdf.drawPath(path, stroke=0 if filled else 1, fill=1 if filled else 0)


def draw_front_shapes(pdf: canvas.Canvas) -> None:
    pdf.setFillColor(HexColor("#8da8ff"))
    pdf.rect(0, 0, BLEED + 4, PAGE_HEIGHT, stroke=0, fill=1)
    draw_triangle(pdf, ((PAGE_WIDTH, PAGE_HEIGHT), (PAGE_WIDTH - 57, PAGE_HEIGHT), (PAGE_WIDTH, PAGE_HEIGHT - 57)))
    pdf.setStrokeColor(HexColor("#4e67ad"))
    pdf.setLineWidth(1.7)
    draw_triangle(pdf, ((202, 105), (241, 105), (221.5, 74)), filled=False)
    pdf.setFillColor(HexColor("#49af92"))
    draw_triangle(pdf, ((217, 78), (245, 78), (231, 56)))
    pdf.setStrokeColor(HexColor("#4e67ad"))
    pdf.line(208, 44, 239, 44)
    pdf.line(239, 44, 232, 49)
    pdf.line(239, 44, 232, 39)
    pdf.setFillColor(HexColor("#17243a"))
    pdf.rect(0, 0, PAGE_WIDTH, 34, stroke=0, fill=1)
    pdf.setFillColor(HexColor("#49af92"))
    draw_triangle(pdf, ((PAGE_WIDTH - 36, 34), (PAGE_WIDTH, 34), (PAGE_WIDTH, 0)))


def draw_service(pdf: canvas.Canvas, text: str, y: float, color: str) -> None:
    pdf.setFillColor(HexColor(color))
    draw_triangle(pdf, ((SAFE_LEFT, y + 1), (SAFE_LEFT + 7, y + 1), (SAFE_LEFT + 3.5, y + 7)))
    pdf.setFillColor(HexColor("#17243a"))
    draw_line(pdf, text, SAFE_LEFT + 13, y, "CardBold", 8)


def draw_front(pdf: canvas.Canvas) -> None:
    pdf.setFillColor(HexColor("#f5f4ef"))
    pdf.rect(0, 0, PAGE_WIDTH, PAGE_HEIGHT, stroke=0, fill=1)
    draw_front_shapes(pdf)
    pdf.setFillColor(HexColor("#17243a"))
    draw_line(pdf, "Osmar Axel", SAFE_LEFT, 119, "CardBold", 21)
    draw_line(pdf, "Coracero Godínez", SAFE_LEFT, 99, "CardBold", 17)
    pdf.setFillColor(HexColor("#4d5b6a"))
    draw_line(pdf, "Hagamos tu día más fácil.", SAFE_LEFT, 82, "CardRegular", 9.5)
    draw_service(pdf, "Web, campañas y automatizaciones", 67, "#8da8ff")
    draw_service(pdf, "Computadoras y programas", 55, "#49af92")
    draw_service(pdf, "Hogar inteligente", 43, "#e5a47c")
    pdf.setFillColor(HexColor("#ffffff"))
    draw_line(pdf, "WhatsApp  ·  +52 418 177 4447", SAFE_LEFT, 23, "CardBold", 8.5)


def draw_back_shapes(pdf: canvas.Canvas) -> None:
    pdf.setFillColor(HexColor("#8da8ff"))
    draw_triangle(pdf, ((0, PAGE_HEIGHT), (56, PAGE_HEIGHT), (0, PAGE_HEIGHT - 56)))
    pdf.setFillColor(HexColor("#49af92"))
    draw_triangle(pdf, ((PAGE_WIDTH, 0), (PAGE_WIDTH - 56, 0), (PAGE_WIDTH, 56)))
    pdf.setStrokeColor(HexColor("#a7bcff"))
    pdf.setLineWidth(1.7)
    pdf.line(54, 101, 82, 101)
    pdf.line(82, 101, 75, 106)
    pdf.line(82, 101, 75, 96)
    pdf.line(215, 101, 187, 101)
    pdf.line(187, 101, 194, 106)
    pdf.line(187, 101, 194, 96)


def draw_back(pdf: canvas.Canvas) -> None:
    pdf.setFillColor(HexColor("#17243a"))
    pdf.rect(0, 0, PAGE_WIDTH, PAGE_HEIGHT, stroke=0, fill=1)
    draw_back_shapes(pdf)

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
    pdf.drawCentredString(PAGE_WIDTH / 2, 46, "ESCANEA Y CONOCE LO QUE HAGO")
    pdf.setFillColor(HexColor("#d4def0"))
    pdf.setFont("CardRegular", 7.5)
    pdf.drawCentredString(PAGE_WIDTH / 2, 31, "coracer0.github.io/presentasion/")


def build_pdf() -> bytes:
    buffer = BytesIO()
    pdf = canvas.Canvas(buffer, pagesize=(PAGE_WIDTH, PAGE_HEIGHT), pageCompression=1)
    pdf.setTitle(f"Tarjeta de {FULL_NAME} - 3 mm de sangrado")
    pdf.setAuthor(FULL_NAME)
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
    writer.add_metadata({"/Title": f"Tarjeta de {FULL_NAME} - imprenta", "/Author": FULL_NAME})
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
