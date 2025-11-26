export default class Lasso {
  constructor(canvas, ctx, options = {}, manager) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.manager = manager;

    // Offscreen buffers
    this.bufferCanvas = document.createElement("canvas");
    this.bufferCtx = this.bufferCanvas.getContext("2d");

    this.selectionCanvas = document.createElement("canvas");
    this.selectionCtx = this.selectionCanvas.getContext("2d");

    this.isDrawing = false;
    this.isDragging = false;
    this.isSelected = false;

    this.polygon = [];
    this.start = null;

    this.selectedBlob = null;

    this.offsetX = 0;
    this.offsetY = 0;

    this.padding = 10;

    this.syncSizes();
  }

  syncSizes() {
    const w = this.canvas.width;
    const h = this.canvas.height;
    this.bufferCanvas.width = w;
    this.bufferCanvas.height = h;
    this.selectionCanvas.width = w;
    this.selectionCanvas.height = h;
  }

  // ─────────────────────────────────────────
  // Lifecycle
  // ─────────────────────────────────────────

  onActivate() {
    this.resetState();
    this.syncSizes();
    this.canvas.style.cursor = "crosshair";
  }

  onDeactivate() {
    this.resetState();
    this.canvas.style.cursor = "default";
  }

  updateOptions() {} // lasso has no settings panel

  // ─────────────────────────────────────────
  // Event Routing
  // ─────────────────────────────────────────

  onStart(e) {
    if (this.isDragging) this.startDragging(e);
    else this.startLasso(e);
  }

  onDraw(e) {
    if (this.isDragging) this.dragging(e);
    else if (this.isDrawing) this.drawLasso(e);
  }

  onStop(e) {
    if (this.isDragging) this.stopDragging();
    else if (this.isDrawing) this.stopLasso(e);
  }

  // ─────────────────────────────────────────
  // Lasso Phase
  // ─────────────────────────────────────────

  startLasso(e) {
    this.isDrawing = true;
    this.isSelected = false;
    this.polygon = [];

    const pos = this.manager.getMousePos(e);

    this.start = pos;
    this.polygon.push(pos);

    this.bufferCtx.clearRect(
      0,
      0,
      this.bufferCanvas.width,
      this.bufferCanvas.height,
    );

    this.bufferCtx.beginPath();
    this.bufferCtx.moveTo(pos.x, pos.y);
  }

  drawLasso(e) {
    const pos = this.manager.getMousePos(e);
    this.polygon.push(pos);

    this.bufferCtx.lineTo(pos.x, pos.y);
    this.bufferCtx.stroke();
  }

  stopLasso(e) {
    if (this.polygon.length < 3) {
      this.resetState();
      return;
    }

    this.isDrawing = false;
    this.isDragging = true;
    this.isSelected = true;

    // Close polygon
    this.bufferCtx.lineTo(this.start.x, this.start.y);
    this.bufferCtx.stroke();
    this.bufferCtx.closePath();

    const box = this.boundingBox();
    if (!box) return;

    const { x, y, ex, ey } = box;
    const w = ex - x;
    const h = ey - y;

    const off = document.createElement("canvas");
    off.width = w;
    off.height = h;

    const offCtx = off.getContext("2d");

    // Clip selection
    offCtx.beginPath();
    this.polygon.forEach((p, i) => {
      const px = p.x - x;
      const py = p.y - y;
      if (i === 0) offCtx.moveTo(px, py);
      else offCtx.lineTo(px, py);
    });
    offCtx.closePath();
    offCtx.clip();

    // Draw selected content
    offCtx.drawImage(this.canvas, x, y, w, h, 0, 0, w, h);

    // Erase polygon area from main canvas
    this.ctx.save();
    this.ctx.beginPath();
    this.polygon.forEach((p, i) => {
      if (i === 0) this.ctx.moveTo(p.x, p.y);
      else this.ctx.lineTo(p.x, p.y);
    });
    this.ctx.closePath();
    this.ctx.clip();
    this.ctx.clearRect(x, y, w, h);
    this.ctx.restore();

    const background = this.ctx.getImageData(
      0,
      0,
      this.canvas.width,
      this.canvas.height,
    );

    this.selectedBlob = { canvas: off, x, y, w, h, background };

    this.manager.redraw?.();
  }

  // ─────────────────────────────────────────
  // Drag Phase
  // ─────────────────────────────────────────

  startDragging(e) {
    const pos = this.manager.getMousePos(e);
    const blob = this.selectedBlob;

    if (!blob) return;

    if (
      pos.x >= blob.x &&
      pos.x <= blob.x + blob.w &&
      pos.y >= blob.y &&
      pos.y <= blob.y + blob.h
    ) {
      this.isDragging = true;
      this.offsetX = pos.x - blob.x;
      this.offsetY = pos.y - blob.y;
    }
  }

  dragging(e) {
    if (!this.selectedBlob || !this.isDragging) return;

    const pos = this.manager.getMousePos(e);

    this.selectedBlob.x = pos.x - this.offsetX;
    this.selectedBlob.y = pos.y - this.offsetY;

    this.manager.redraw?.();
  }

  stopDragging() {
    if (!this.selectedBlob) return;

    this.isDragging = false;

    this.ctx.drawImage(
      this.selectedBlob.canvas,
      this.selectedBlob.x,
      this.selectedBlob.y,
    );

    this.manager.redraw?.();

    this.resetState();
  }

  // ─────────────────────────────────────────
  // Overlay Rendering
  // ─────────────────────────────────────────

  renderOverlay() {
    if (this.isSelected && this.selectedBlob) {
      const b = this.selectedBlob;
      this.bufferCtx.clearRect(
        0,
        0,
        this.bufferCanvas.width,
        this.bufferCanvas.height,
      );
      this.bufferCtx.drawImage(b.canvas, b.x, b.y);
    }
  }

  // ─────────────────────────────────────────
  // Helpers
  // ─────────────────────────────────────────

  boundingBox() {
    if (!this.polygon.length) return null;

    const xs = this.polygon.map((p) => p.x);
    const ys = this.polygon.map((p) => p.y);

    return {
      x: Math.min(...xs) - this.padding,
      y: Math.min(...ys) - this.padding,
      ex: Math.max(...xs) + this.padding,
      ey: Math.max(...ys) + this.padding,
    };
  }

  resetState() {
    this.isDrawing = false;
    this.isDragging = false;
    this.isSelected = false;

    this.polygon = [];
    this.start = null;
    this.selectedBlob = null;

    if (this.bufferCtx) {
      this.bufferCtx.clearRect(
        0,
        0,
        this.bufferCanvas.width,
        this.bufferCanvas.height,
      );
    }
  }

  getBufferCanvas() {
    return this.bufferCanvas;
  }
}
