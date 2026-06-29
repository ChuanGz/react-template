#!/usr/bin/env python3
"""Build the React Template visual white paper as a selectable-text A4 PDF."""

from pathlib import Path
from textwrap import wrap

from reportlab.lib.colors import HexColor, white
from reportlab.lib.pagesizes import A4
from reportlab.pdfgen import canvas


OUT = Path(__file__).with_name("react-template-white-paper.pdf")
W, H = A4

NAVY = HexColor("#152238")
INK = HexColor("#1F2937")
CREAM = HexColor("#FFF8EE")
PAPER = HexColor("#FFFDF9")
CORAL = HexColor("#F4775C")
MINT = HexColor("#7CCDB5")
GOLD = HexColor("#F5BE62")
BLUE = HexColor("#6E8DD5")
MUTED = HexColor("#667085")
PALE_BLUE = HexColor("#EAF0FF")
PALE_MINT = HexColor("#E9F7F2")
PALE_CORAL = HexColor("#FFF0EC")
LINE = HexColor("#D7DCE5")

M = 46


def set_fill(c, color):
    c.setFillColor(color)


def text(c, x, y, value, size=10, color=INK, font="Helvetica", leading=None):
    c.setFont(font, size)
    c.setFillColor(color)
    if leading is None or "\n" not in value:
        c.drawString(x, y, value)
        return y
    for line in value.split("\n"):
        c.drawString(x, y, line)
        y -= leading
    return y


def wrapped(c, x, y, value, width_chars, size=10, color=INK,
            font="Helvetica", leading=14):
    lines = []
    for para in value.split("\n"):
        lines.extend(wrap(para, width=width_chars) or [""])
    c.setFont(font, size)
    c.setFillColor(color)
    for line in lines:
        c.drawString(x, y, line)
        y -= leading
    return y


def label(c, x, y, value, color=CORAL):
    c.setFont("Helvetica-Bold", 7.5)
    c.setFillColor(color)
    c.drawString(x, y, value.upper())


def pill(c, x, y, value, fill, fg=NAVY, width=None):
    if width is None:
        width = max(38, 8 + len(value) * 5.2)
    c.setFillColor(fill)
    c.roundRect(x, y, width, 22, 11, stroke=0, fill=1)
    c.setFillColor(fg)
    c.setFont("Helvetica-Bold", 7.5)
    c.drawCentredString(x + width / 2, y + 7.3, value)
    return width


def footer(c, page, dark=False):
    color = HexColor("#B9C3D3") if dark else MUTED
    c.setFont("Helvetica", 7)
    c.setFillColor(color)
    c.drawString(M, 24, "REACT TEMPLATE  /  EVIDENCE-LED WHITE PAPER")
    c.drawRightString(W - M, 24, f"{page:02d}")


def title(c, value, subtitle=None, dark=False):
    color = white if dark else NAVY
    c.setFont("Helvetica-Bold", 27)
    c.setFillColor(color)
    c.drawString(M, H - 84, value)
    if subtitle:
        wrapped(c, M, H - 108, subtitle, 78, 10, HexColor("#C9D2E1") if dark else MUTED,
                leading=14)


def card(c, x, y, w, h, fill=PAPER, radius=14, stroke=None):
    c.setFillColor(fill)
    if stroke:
        c.setStrokeColor(stroke)
        c.setLineWidth(0.8)
        c.roundRect(x, y, w, h, radius, stroke=1, fill=1)
    else:
        c.roundRect(x, y, w, h, radius, stroke=0, fill=1)


def arrow(c, x1, y1, x2, y2, color=CORAL, width=2):
    c.setStrokeColor(color)
    c.setFillColor(color)
    c.setLineWidth(width)
    c.line(x1, y1, x2, y2)
    import math
    a = math.atan2(y2 - y1, x2 - x1)
    s = 7
    pts = []
    for d in (2.65, -2.65):
        pts.append((x2 + s * math.cos(a + d), y2 + s * math.sin(a + d)))
    p = c.beginPath()
    p.moveTo(x2, y2)
    p.lineTo(*pts[0])
    p.lineTo(*pts[1])
    p.close()
    c.drawPath(p, stroke=0, fill=1)


def icon_check(c, cx, cy, color=MINT, scale=1):
    c.setStrokeColor(color)
    c.setLineWidth(2.5 * scale)
    c.setLineCap(1)
    c.line(cx - 7 * scale, cy, cx - 2 * scale, cy - 5 * scale)
    c.line(cx - 2 * scale, cy - 5 * scale, cx + 8 * scale, cy + 7 * scale)


def icon_blocks(c, cx, cy, color=BLUE):
    c.setStrokeColor(color)
    c.setLineWidth(1.8)
    for dx, dy in [(-12, 7), (5, 7), (-12, -10), (5, -10)]:
        c.roundRect(cx + dx, cy + dy, 12, 12, 2, stroke=1, fill=0)


def icon_shield(c, cx, cy, color=CORAL):
    c.setStrokeColor(color)
    c.setLineWidth(1.8)
    p = c.beginPath()
    p.moveTo(cx, cy + 13)
    p.lineTo(cx + 11, cy + 8)
    p.lineTo(cx + 9, cy - 6)
    p.curveTo(cx + 7, cy - 12, cx, cy - 15, cx, cy - 15)
    p.curveTo(cx, cy - 15, cx - 7, cy - 12, cx - 9, cy - 6)
    p.lineTo(cx - 11, cy + 8)
    p.close()
    c.drawPath(p, stroke=1, fill=0)


def cover(c):
    c.setFillColor(CREAM)
    c.rect(0, 0, W, H, stroke=0, fill=1)

    # Editorial vector illustration: a clean core receiving opt-in modules.
    hero_bottom = 410
    c.setFillColor(PAPER)
    c.rect(0, hero_bottom, W, H - hero_bottom, stroke=0, fill=1)
    c.setStrokeColor(HexColor("#E6E2DA"))
    c.setLineWidth(0.5)
    for x in range(25, 595, 32):
        c.line(x, hero_bottom + 20, x, H - 18)
    for y in range(hero_bottom + 22, 842, 32):
        c.line(20, y, W - 20, y)

    # Core stack.
    cx, cy = 297, 606
    for i, (name, color, off) in enumerate([
        ("VITE", BLUE, 0), ("TYPESCRIPT", MINT, 40), ("REACT", CORAL, 80)
    ]):
        card(c, cx - 92 + i * 8, cy - 48 + off / 4, 184, 74, fill=color, radius=16)
        c.setFillColor(NAVY if color != BLUE else white)
        c.setFont("Helvetica-Bold", 15)
        c.drawCentredString(cx + i * 8, cy - 17 + off / 4, name)

    # Orbiting capability cards.
    modules = [
        (96, 720, "ROUTER", MINT), (396, 728, "AUTH", CORAL),
        (70, 515, "TEST", GOLD), (412, 520, "UI", BLUE),
    ]
    for x, y, name, color in modules:
        card(c, x, y, 105, 54, fill=color, radius=13)
        c.setFont("Helvetica-Bold", 10)
        c.setFillColor(NAVY if color != BLUE else white)
        c.drawCentredString(x + 52.5, y + 21, name)
        arrow(c, x + (105 if x < cx else 0), y + 27,
              cx - (98 if x < cx else -98), cy + (10 if y > cy else -10),
              color=HexColor("#AAB2C0"), width=1.2)

    c.setFillColor(NAVY)
    c.rect(0, 0, W, hero_bottom, stroke=0, fill=1)
    x = M
    x += pill(c, x, 363, "REACT", MINT) + 8
    x += pill(c, x, 363, "TYPESCRIPT", CORAL) + 8
    pill(c, x, 363, "VITE", GOLD)

    text(c, M, 313, "Start small.", 31, white, "Helvetica-Bold")
    text(c, M, 273, "Add only what", 31, white, "Helvetica-Bold")
    text(c, M, 233, "the app earns.", 31, white, "Helvetica-Bold")
    text(c, M, 178, "An option-driven React generator white paper", 13, MINT,
         "Helvetica-Bold")
    wrapped(c, M, 150,
            "A small core. Explicit capabilities. Contradictions rejected before files exist.",
            67, 10, HexColor("#CDD5E2"), leading=15)
    label(c, M, 56, "Engineering contract  /  Generator design", CORAL)
    footer(c, 1, dark=True)
    c.showPage()


def evidence(c):
    c.setFillColor(PAPER)
    c.rect(0, 0, W, H, stroke=0, fill=1)
    label(c, M, H - 47, "Contract at a glance", CORAL)
    title(c, "Proof before posture.",
          "Repository facts, not productivity theater.")

    gap = 14
    cw = (W - 2 * M - gap) / 2
    ch = 145
    cards = [
        (M, 520, "28", "PUBLIC OPTIONS",
         "17 boolean and 11 enumerated choices.", PALE_MINT, MINT),
        (M + cw + gap, 520, "47", "TESTS PASSED",
         "Current local repository test run; zero failed.", PALE_BLUE, BLUE),
        (M, 355, "3", "CONFLICT RULES",
         "Each contradiction has actionable error coverage.", PALE_CORAL, CORAL),
        (M + cw + gap, 355, "1", "AUTO IMPLICATION",
         "shadcn intentionally enables Tailwind.", HexColor("#FFF6E2"), GOLD),
    ]
    for x, y, number, heading, body, fill, accent in cards:
        card(c, x, y, cw, ch, fill=fill, radius=16)
        text(c, x + 18, y + 91, number, 34, NAVY, "Helvetica-Bold")
        label(c, x + 18, y + 68, heading, accent)
        wrapped(c, x + 18, y + 43, body, 33, 9, MUTED, leading=13)

    card(c, M, 148, W - 2 * M, 164, fill=NAVY, radius=18)
    text(c, M + 22, 268, "What those numbers actually prove", 16, white,
         "Helvetica-Bold")
    icon_check(c, M + 31, 226, MINT, 0.8)
    text(c, M + 53, 221, "The option surface has an executable validator contract.",
         9.5, HexColor("#D9E1EC"))
    icon_check(c, M + 31, 193, MINT, 0.8)
    text(c, M + 53, 188, "Presence, absence, implications, and conflicts are tested.",
         9.5, HexColor("#D9E1EC"))
    text(c, M + 22, 164,
         "They do not claim adoption, speed gains, or production performance.",
         8.5, GOLD, "Helvetica-Bold")
    footer(c, 2)
    c.showPage()


def before_after(c):
    c.setFillColor(CREAM)
    c.rect(0, 0, W, H, stroke=0, fill=1)
    label(c, M, H - 47, "Before / after", CORAL)
    title(c, "A starter should not be a suitcase.",
          "The useful change is not more code. It is visible choice.")

    panel_y, panel_h = 270, 420
    panel_w = (W - 2 * M - 18) / 2
    # Before.
    card(c, M, panel_y, panel_w, panel_h, fill=white, radius=18)
    label(c, M + 18, panel_y + panel_h - 28, "Conventional starter", MUTED)
    text(c, M + 18, panel_y + panel_h - 62, "Everything arrives", 18, NAVY,
         "Helvetica-Bold")
    text(c, M + 18, panel_y + panel_h - 84, "before the decision.", 18, NAVY,
         "Helvetica-Bold")
    tags = ["router", "state", "UI kit", "auth", "charts", "forms",
            "mock API", "i18n", "realtime", "table", "theme", "e2e"]
    colors = [PALE_CORAL, PALE_BLUE, PALE_MINT, HexColor("#FFF6E2")]
    tx, ty = M + 18, panel_y + 260
    for i, tag in enumerate(tags):
        tw = max(49, 16 + len(tag) * 5.2)
        if tx + tw > M + panel_w - 18:
            tx = M + 18
            ty -= 36
        pill(c, tx, ty, tag.upper(), colors[i % len(colors)], width=tw)
        tx += tw + 7
    wrapped(c, M + 18, panel_y + 75,
            "Unused dependencies and structure become cleanup work - or permanent ambiguity.",
            36, 9.2, MUTED, leading=14)

    # After.
    x2 = M + panel_w + 18
    card(c, x2, panel_y, panel_w, panel_h, fill=NAVY, radius=18)
    label(c, x2 + 18, panel_y + panel_h - 28, "Option-driven generator", MINT)
    text(c, x2 + 18, panel_y + panel_h - 62, "Core first.", 18, white,
         "Helvetica-Bold")
    text(c, x2 + 18, panel_y + panel_h - 84, "Capabilities opt in.", 18, white,
         "Helvetica-Bold")
    core_y = panel_y + 235
    for i, (name, color) in enumerate([("REACT", CORAL), ("TS", MINT), ("VITE", BLUE)]):
        card(c, x2 + 22 + i * 65, core_y, 54, 54, fill=color, radius=11)
        c.setFillColor(NAVY if color != BLUE else white)
        c.setFont("Helvetica-Bold", 8.5)
        c.drawCentredString(x2 + 49 + i * 65, core_y + 22, name)
    arrow(c, x2 + panel_w / 2, core_y - 15, x2 + panel_w / 2,
          core_y - 58, MINT, 1.6)
    text(c, x2 + 22, core_y - 88, "SELECTED ONLY", 7.5, MINT, "Helvetica-Bold")
    wrapped(c, x2 + 22, core_y - 112,
            "Dependencies  /  configuration  /  source  /  tests",
            33, 9.2, HexColor("#D9E1EC"), leading=14)
    wrapped(c, x2 + 22, panel_y + 75,
            "Disabled capabilities leave no owned artifacts behind.",
            33, 9.2, HexColor("#D9E1EC"), leading=14)

    card(c, M, 121, W - 2 * M, 112, fill=CORAL, radius=16)
    label(c, M + 20, 200, "Minimal configuration", NAVY)
    text(c, M + 20, 166, "2 runtime dependencies", 22, NAVY, "Helvetica-Bold")
    text(c, M + 300, 170, "React + ReactDOM", 12, NAVY, "Helvetica-Bold")
    wrapped(c, M + 300, 150,
            "Verified by the dependency-plan contract test.", 32, 8.5, NAVY,
            leading=12)
    footer(c, 3)
    c.showPage()


def flow(c):
    c.setFillColor(PAPER)
    c.rect(0, 0, W, H, stroke=0, fill=1)
    label(c, M, H - 47, "What ships", CORAL)
    title(c, "Decide. Validate. Then write.",
          "The filesystem is the last step, not the scratchpad.")

    nodes = [
        ("01", "PARSE", "Read explicit --option=value flags.", BLUE, icon_blocks),
        ("02", "VALIDATE", "Normalize values and reject unknown input.", MINT, icon_check),
        ("03", "RESOLVE", "Apply one documented implication; test conflicts.", GOLD, icon_shield),
        ("04", "COMPOSE", "Plan selected dependencies, files, config, and tests.", CORAL, icon_blocks),
        ("05", "WRITE", "Create the application only after the plan is valid.", BLUE, icon_check),
    ]
    y = 650
    for i, (num, heading, body, accent, icon_fn) in enumerate(nodes):
        card(c, M, y - 74, W - 2 * M, 78, fill=white, radius=14, stroke=LINE)
        card(c, M + 14, y - 58, 46, 46, fill=accent, radius=12)
        c.setFillColor(NAVY if accent != BLUE else white)
        c.setFont("Helvetica-Bold", 10)
        c.drawCentredString(M + 37, y - 40, num)
        label(c, M + 77, y - 27, heading, accent)
        text(c, M + 77, y - 50, body, 9.6, INK)
        if i < len(nodes) - 1:
            arrow(c, W - M - 26, y - 74, W - M - 26, y - 91, CORAL, 1.5)
        y -= 101

    card(c, M, 95, W - 2 * M, 74, fill=NAVY, radius=14)
    label(c, M + 18, 142, "Boundary after generation", MINT)
    text(c, M + 18, 118,
         "Install, build, test, and deployment checks remain explicit user or CI work.",
         9.2, HexColor("#D9E1EC"))
    footer(c, 4)
    c.showPage()


def reality(c):
    c.setFillColor(NAVY)
    c.rect(0, 0, W, H, stroke=0, fill=1)
    label(c, M, H - 47, "Reality check", CORAL)
    title(c, "Generated is not certified.",
          "A consistent artifact is the start of application ownership, not the end.",
          dark=True)

    text(c, M, 620, "GENERATED CODE", 13, MINT, "Helvetica-Bold")
    text(c, M + 150, 620, "+", 22, GOLD, "Helvetica-Bold")
    text(c, M + 187, 620, "PROJECT CONTEXT", 13, CORAL, "Helvetica-Bold")
    text(c, M + 357, 620, "=", 22, GOLD, "Helvetica-Bold")
    text(c, M + 392, 620, "READINESS", 13, white, "Helvetica-Bold")
    c.setStrokeColor(HexColor("#34435A"))
    c.setLineWidth(1)
    c.line(M, 592, W - M, 592)

    cards = [
        ("REVIEW", "Check generated choices against the product and team.", MINT, icon_check),
        ("DEPLOY", "Validate runtime, data, observability, and failure behavior.", BLUE, icon_blocks),
        ("SECURE", "Assess identity, secrets, permissions, and threat context.", CORAL, icon_shield),
    ]
    y = 490
    for heading, body, accent, icon_fn in cards:
        card(c, M, y - 76, W - 2 * M, 82, fill=HexColor("#202E45"), radius=14)
        c.setFillColor(HexColor("#263A54"))
        c.circle(M + 34, y - 35, 20, stroke=0, fill=1)
        if icon_fn == icon_check:
            icon_fn(c, M + 34, y - 35, accent, 0.75)
        else:
            icon_fn(c, M + 34, y - 35, accent)
        label(c, M + 69, y - 25, heading, accent)
        text(c, M + 69, y - 51, body, 9.4, HexColor("#D9E1EC"))
        y -= 104

    card(c, M, 106, W - 2 * M, 104, fill=CREAM, radius=16)
    label(c, M + 18, 177, "One deliberate non-goal", CORAL)
    text(c, M + 18, 151, "No post-generation capability installer.", 15, NAVY,
         "Helvetica-Bold")
    wrapped(c, M + 18, 130,
            "Existing applications require merging, source analysis, and a migration contract.",
            77, 8.8, MUTED, leading=12)
    footer(c, 5, dark=True)
    c.showPage()


def takeaway(c):
    c.setFillColor(CREAM)
    c.rect(0, 0, W, H, stroke=0, fill=1)
    label(c, M, H - 47, "Takeaway", CORAL)
    title(c, "Five rules worth keeping.",
          "The template is code. The contract is the real product.")

    rules = [
        ("01", "Keep the core boring.", "A default earns its place only when nearly every app needs it.", MINT),
        ("02", "Test absence.", "A disabled capability must leave no owned artifact behind.", BLUE),
        ("03", "Fail before files.", "Contradictions should stop generation with an actionable message.", CORAL),
        ("04", "Give ownership away.", "Generated applications own their code and later architecture.", GOLD),
        ("05", "Verify the artifact.", "Build and test generated projects, not only option functions.", MINT),
    ]
    y = 657
    for num, heading, body, accent in rules:
        card(c, M, y - 74, W - 2 * M, 78, fill=white, radius=14)
        card(c, M + 14, y - 57, 42, 42, fill=accent, radius=11)
        c.setFont("Helvetica-Bold", 9)
        c.setFillColor(NAVY if accent != BLUE else white)
        c.drawCentredString(M + 35, y - 41, num)
        text(c, M + 72, y - 29, heading, 12, NAVY, "Helvetica-Bold")
        text(c, M + 72, y - 52, body, 8.8, MUTED)
        y -= 92

    card(c, M, 91, W - 2 * M, 92, fill=NAVY, radius=16)
    text(c, M + 20, 147, "SHORT VERSION", 7.5, CORAL, "Helvetica-Bold")
    text(c, M + 20, 119, "Pack a toolbox, not a furnished apartment.", 16, white,
         "Helvetica-Bold")
    footer(c, 6)
    c.showPage()


def build():
    c = canvas.Canvas(str(OUT), pagesize=A4, pageCompression=1)
    c.setTitle("React Template - Start small. Add only what the app earns.")
    c.setSubject("An evidence-led white paper on option-driven React generation")
    c.setAuthor("ChuanGz")
    c.setCreator("React Template white paper build script")
    cover(c)
    evidence(c)
    before_after(c)
    flow(c)
    reality(c)
    takeaway(c)
    c.save()
    print(OUT)


if __name__ == "__main__":
    build()
