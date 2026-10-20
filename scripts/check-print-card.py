"""Check the published business card's page boxes and visible destination."""

import json
from math import isclose
from pathlib import Path
from urllib.parse import urlparse

from pypdf import PdfReader


ROOT = Path(__file__).resolve().parents[1]
PDF = ROOT / "public/axel-coracero-tarjeta-imprenta.pdf"
PRINT_URL = json.loads((ROOT / "scripts/card-links.json").read_text(encoding="utf-8"))["print"]
DESTINATION = urlparse(PRINT_URL).netloc + urlparse(PRINT_URL).path
TRIM = (3.5 * 72, 2 * 72)
BLEED = 3 * 72 / 25.4


def dimensions(box) -> tuple[float, float]:
    return float(box.width), float(box.height)


def matches(actual: tuple[float, float], expected: tuple[float, float]) -> bool:
    return all(isclose(a, e, abs_tol=0.02) for a, e in zip(actual, expected))


def main() -> None:
    pages = PdfReader(PDF).pages
    if len(pages) != 2:
        raise ValueError("La tarjeta debe tener dos caras")
    for page in pages:
        if not matches(dimensions(page.trimbox), TRIM):
            raise ValueError("El tamaño de corte no es 3.5 × 2 pulgadas")
        expected_bleed = (TRIM[0] + 2 * BLEED, TRIM[1] + 2 * BLEED)
        if not matches(dimensions(page.bleedbox), expected_bleed):
            raise ValueError("El sangrado no es de 3 mm por lado")
    if DESTINATION not in (pages[1].extract_text() or ""):
        raise ValueError("La URL visible en el PDF no coincide con card-links.json")
    print("PDF: dos caras, corte, sangrado y URL visibles correctos")


if __name__ == "__main__":
    main()
