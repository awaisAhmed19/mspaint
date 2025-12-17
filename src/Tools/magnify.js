export class MagnificationTool {
  constructor(meta) {
    this.meta = meta;
    this.stepIndex = 0;
    this.steps = 3;
    this.increment = 1.25; // 🔑 gentle zoom
    this.baseZoom = 1;
  }

  begin(ctx) {
    this.stepIndex++;

    if (this.stepIndex > this.steps) {
      this.stepIndex = 0;
      ctx.renderer.reset();
      return;
    }

    const nextZoom = ctx.renderer.zoom * this.increment;
    ctx.renderer.applyZoom(nextZoom);
  }

  update() {}
  end() {}
}

export class MagnificationRenderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");

    this.zoom = 1;
    this.minZoom = 0.1;
    this.maxZoom = 10;

    // base image (truth)
    this.baseCanvas = document.createElement("canvas");
    this.baseCtx = this.baseCanvas.getContext("2d");

    // working buffer
    this.bufferCanvas = document.createElement("canvas");
    this.bufferCtx = this.bufferCanvas.getContext("2d");

    this.captureBase();
  }

  captureBase() {
    this.baseCanvas.width = this.canvas.width;
    this.baseCanvas.height = this.canvas.height;
    this.baseCtx.drawImage(this.canvas, 0, 0);
  }
  /* ---------------- buffer sync ---------------- */

  syncBuffer() {
    this.bufferCanvas.width = this.canvas.width;
    this.bufferCanvas.height = this.canvas.height;
  }

  /* ---------------- public API ---------------- */

  applyZoom(factor) {
    const clamped = Math.max(this.minZoom, Math.min(this.maxZoom, factor));

    if (Math.abs(clamped - this.zoom) < 0.001) return;

    this.zoom = clamped;
    this.redraw();
  }
  /* ---------------- redraw logic ---------------- */

  redraw() {
    const baseW = this.baseCanvas.width;
    const baseH = this.baseCanvas.height;

    const newW = Math.round(baseW * this.zoom);
    const newH = Math.round(baseH * this.zoom);

    // resize canvas (resets context)
    this.canvas.width = newW;
    this.canvas.height = newH;

    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.scale(this.zoom, this.zoom);

    // ALWAYS draw from base image
    this.ctx.drawImage(this.baseCanvas, 0, 0);
  }

  /* ---------------- render contract ---------------- */

  reset() {
    this.zoom = 1;
    this.redraw();
  }

  render() {
    // no-op
    // magnification is a persistent view transform
  }
}
