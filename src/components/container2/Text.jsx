export default class TextTool {
  constructor(canvas, ctx, options = {}, manager) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.manager = manager;

    this.bufferCanvas = document.createElement("canvas");
    this.bufferCtx = this.bufferCanvas.getContext("2d");

    this.activeText = null;
    this.isEditing = false;
    this.texts = [];

    this.syncSize();
  }

  syncSize() {
    this.bufferCanvas.width = this.canvas.width;
    this.bufferCanvas.height = this.canvas.height;
  }

  // ─────────────────────────────────────
  // Activation
  // ─────────────────────────────────────
  onActivate() {
    this.canvas.style.cursor = "text";
  }

  onDeactivate() {
    this.commitText();
    this.canvas.style.cursor = "default";
  }

  // ─────────────────────────────────────
  // Mouse Events
  // ─────────────────────────────────────
  onStart(e) {
    const pos = this.manager.getMousePos(e);

    const hit = this.findTextAt(pos);
    if (hit) {
      this.startEditing(hit, pos);
    } else {
      this.createText(pos);
    }
  }

  onDraw(e) {
    if (!this.isEditing || !this.activeText) return;
    const pos = this.manager.getMousePos(e);
    this.updateCaret(pos);
  }

  onStop() {}

  // ─────────────────────────────────────
  // Keyboard Input
  // ─────────────────────────────────────
  onKeyDown(e) {
    if (!this.isEditing || !this.activeText) return;

    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      this.commitText();
      this.manager.redraw();
      return;
    }

    if (e.key === "Escape") {
      this.cancelEditing();
      return;
    }

    this.handleTyping(e);
    this.manager.redraw();
  }

  // ─────────────────────────────────────
  // Creating / Editing Text
  // ─────────────────────────────────────
  createText(pos) {
    this.commitText();

    const newText = {
      id: Date.now(),
      x: pos.x,
      y: pos.y,
      text: "",
      fontSize: 20,
      fontFamily: "Arial",
      color: this.manager.color || "black",
      width: 0,
      caretPos: 0,
      caretX: pos.x,
      caretY: pos.y,
    };

    this.texts.push(newText);
    this.activeText = newText;
    this.isEditing = true;
    this.manager.redraw();
  }

  startEditing(textObj, pos) {
    this.commitText();
    this.activeText = textObj;
    this.isEditing = true;
    this.updateCaret(pos);
  }

  commitText() {
    if (!this.activeText || !this.isEditing) return;

    this.measureWidth();
    this.isEditing = false;

    this.manager?.logUndo?.("Text");
  }

  cancelEditing() {
    if (!this.activeText) return;

    if (this.activeText.text.trim() === "") {
      this.texts = this.texts.filter((t) => t.id !== this.activeText.id);
    }

    this.activeText = null;
    this.isEditing = false;
    this.manager.redraw();
  }

  // ─────────────────────────────────────
  // Typing
  // ─────────────────────────────────────
  handleTyping(e) {
    const t = this.activeText;

    if (e.key === "Backspace") {
      e.preventDefault();
      if (t.caretPos > 0) {
        t.text = t.text.slice(0, t.caretPos - 1) + t.text.slice(t.caretPos);
        t.caretPos--;
      }
      this.updateCaretFromText();
      return;
    }

    if (e.key.length === 1) {
      t.text = t.text.slice(0, t.caretPos) + e.key + t.text.slice(t.caretPos);
      t.caretPos++;
      this.updateCaretFromText();
    }
  }

  // ─────────────────────────────────────
  // Caret Logic
  // ─────────────────────────────────────
  updateCaret(mousePos) {
    const t = this.activeText;
    this.ctx.font = `${t.fontSize}px ${t.fontFamily}`;

    let closest = { index: 0, dist: Infinity };

    for (let i = 0; i <= t.text.length; i++) {
      const partial = t.text.substring(0, i);
      const lines = partial.split("\n");
      const line = lines[lines.length - 1];
      const x = t.x + this.ctx.measureText(line).width;
      const y = t.y + (lines.length - 1) * t.fontSize * 1.2;

      const d = Math.hypot(mousePos.x - x, mousePos.y - y);

      if (d < closest.dist) {
        closest = { index: i, dist: d };
        t.caretX = x;
        t.caretY = y;
      }
    }

    t.caretPos = closest.index;
  }

  updateCaretFromText() {
    const t = this.activeText;
    this.ctx.font = `${t.fontSize}px ${t.fontFamily}`;

    const before = t.text.substring(0, t.caretPos);
    const lines = before.split("\n");
    const line = lines[lines.length - 1];

    t.caretX = t.x + this.ctx.measureText(line).width;
    t.caretY = t.y + (lines.length - 1) * t.fontSize * 1.2;
  }

  measureWidth() {
    const t = this.activeText;
    this.ctx.font = `${t.fontSize}px ${t.fontFamily}`;
    const widths = t.text
      .split("\n")
      .map((line) => this.ctx.measureText(line).width);

    t.width = Math.max(...widths, 0);
  }

  // ─────────────────────────────────────
  // Rendering
  // ─────────────────────────────────────
  renderOverlay() {
    this.renderTexts();
    if (this.isEditing) {
      this.renderCaret();
    }
  }

  renderTexts() {
    for (const t of this.texts) {
      this.ctx.font = `${t.fontSize}px ${t.fontFamily}`;
      this.ctx.fillStyle = t.color;

      const lines = t.text.split("\n");

      lines.forEach((line, i) => {
        this.ctx.fillText(line, t.x, t.y + i * t.fontSize * 1.2);
      });

      if (this.isEditing && t === this.activeText) {
        const height = lines.length * t.fontSize * 1.2;

        this.ctx.strokeStyle = "#0099ff";
        this.ctx.setLineDash([4, 4]);
        this.ctx.strokeRect(
          t.x - 4,
          t.y - t.fontSize,
          t.width + 40,
          height + 8,
        );
        this.ctx.setLineDash([]);
      }
    }
  }

  renderCaret() {
    const t = this.activeText;
    const blink = Date.now() % 1000 > 500;
    if (!blink) return;

    this.ctx.save();
    this.ctx.strokeStyle = "black";
    this.ctx.beginPath();
    this.ctx.moveTo(t.caretX, t.caretY - t.fontSize * 1.1);
    this.ctx.lineTo(t.caretX, t.caretY + 4);
    this.ctx.stroke();
    this.ctx.restore();
  }

  // ─────────────────────────────────────
  // Hit Detection
  // ─────────────────────────────────────
  findTextAt(pos) {
    for (const t of [...this.texts].reverse()) {
      const lines = t.text.split("\n");
      const height = lines.length * t.fontSize * 1.2;

      if (
        pos.x >= t.x - 10 &&
        pos.x <= t.x + t.width + 40 &&
        pos.y >= t.y - t.fontSize &&
        pos.y <= t.y + height
      ) {
        return t;
      }
    }
    return null;
  }

  // ─────────────────────────────────────
  // External API (if needed)
  // ─────────────────────────────────────
  setFontSize(size) {
    if (this.activeText) this.activeText.fontSize = size;
  }

  setFontFamily(family) {
    if (this.activeText) this.activeText.fontFamily = family;
  }
}
