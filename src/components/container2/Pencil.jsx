export default class Pencil {
  constructor(canvas, ctx, options = {}, manager) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.manager = manager;

    this.isDrawing = false;

    // pencil always 1px, but allow color overrides
    this.color = options.color || manager?.color || "#000";
  }

  // ─────────────────────────────────────────
  // Lifecycle
  // ─────────────────────────────────────────

  onActivate() {
    this.canvas.style.cursor = "crosshair";

    this.ctx.lineWidth = 1;
    this.ctx.lineCap = "round";
    this.ctx.lineJoin = "round";
    this.ctx.strokeStyle = this.color;
  }

  onDeactivate() {
    this.canvas.style.cursor = "default";
    this.isDrawing = false;
    this.ctx.closePath();
  }

  // ─────────────────────────────────────────
  // Options (pencil has none)
  // ─────────────────────────────────────────
  updateOptions(opts) {
    // Pencil only supports color update
    if (opts.color !== undefined) {
      this.color = opts.color;
      this.ctx.strokeStyle = opts.color;
    }
  }

  // ─────────────────────────────────────────
  // Drawing events
  // ─────────────────────────────────────────

  onStart(e) {
    this.isDrawing = true;

    const pos = this.manager.getMousePos(e);

    this.ctx.beginPath();
    this.ctx.moveTo(pos.x, pos.y);
  }

  onDraw(e) {
    if (!this.isDrawing) return;

    const pos = this.manager.getMousePos(e);
    this.ctx.lineTo(pos.x, pos.y);
    this.ctx.stroke();
  }

  onStop() {
    if (!this.isDrawing) return;

    this.isDrawing = false;
    this.ctx.closePath();
    this.manager?.logUndo?.("Pencil");
  }

  // for uniform tool API
  setColor(color) {
    this.color = color;
    this.ctx.strokeStyle = color;
  }
}
