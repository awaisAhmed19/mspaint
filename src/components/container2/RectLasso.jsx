export default class RectLasso {
  constructor(canvas, ctx, options = {}, manager) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.manager = manager;

    this.isDrawing = false;
    this.isDragging = false;
    this.isSelected = false;

    this.start = null;
    this.end = null;

    this.selectedImage = null;
    this.selectedOffsetX = 0;
    this.selectedOffsetY = 0;

    this.currentX = 0;
    this.currentY = 0;

    // Offscreen canvases
    this.bufferCanvas = document.createElement("canvas");
    this.bufferCtx = this.bufferCanvas.getContext("2d");

    this.selectionCanvas = document.createElement("canvas");
    this.selectionCtx = this.selectionCanvas.getContext("2d");

    this.syncSizes();
  }

  syncSizes() {
    this.bufferCanvas.width = this.canvas.width;
    this.bufferCanvas.height = this.canvas.height;

    this.selectionCanvas.width = this.canvas.width;
    this.selectionCanvas.height = this.canvas.height;
  }

  // ─────────────────────────────────────────────
  // Lifecycle
  // ─────────────────────────────────────────────

  onActivate() {
    this.resetState();
    this.syncSizes();
    this.ctx.lineWidth = 1;
    this.canvas.style.cursor = "crosshair";
  }

  onDeactivate() {
    this.resetState();
    this.canvas.style.cursor = "default";
  }

  // ─────────────────────────────────────────────
  // Event Handling
  // ─────────────────────────────────────────────

  onStart(e) {
    if (this.isDragging) this.startDragging(e);
    else this.startRect(e);
  }

  onDraw(e) {
    if (this.isDragging) this.dragMove(e);
    else if (this.isDrawing) this.drawRect(e);
  }

  onStop(e) {
    if (this.isDragging) this.stopDragging();
    else if (this.isDrawing) this.finishRect(e);
  }

  // ─────────────────────────────────────────────
  // RECT SELECTION PHASE
  // ─────────────────────────────────────────────

  startRect(e) {
    this.isDrawing = true;

    this.start = this.manager.getMousePos(e);
    this.end = { ...this.start };

    this.bufferCtx.clearRect(
      0,
      0,
      this.bufferCanvas.width,
      this.bufferCanvas.height,
    );

    this.bufferCtx.setLineDash([5, 3]);
    this.bufferCtx.strokeStyle = "black";
  }

  drawRect(e) {
    if (!this.start) return;

    this.end = this.manager.getMousePos(e);

    this.bufferCtx.clearRect(
      0,
      0,
      this.bufferCanvas.width,
      this.bufferCanvas.height,
    );

    const w = this.end.x - this.start.x;
    const h = this.end.y - this.start.y;

    this.bufferCtx.strokeRect(this.start.x, this.start.y, w, h);
  }

  finishRect(e) {
    if (!this.start) return;

    this.isDrawing = false;
    this.isSelected = true;

    this.end = this.manager.getMousePos(e);

    const x = Math.min(this.start.x, this.end.x);
    const y = Math.min(this.start.y, this.end.y);
    const w = Math.abs(this.end.x - this.start.x);
    const h = Math.abs(this.end.y - this.start.y);

    if (w === 0 || h === 0) {
      this.resetState();
      return;
    }

    // Extract selected pixels
    this.selectedImage = this.ctx.getImageData(x, y, w, h);

    // Clear from canvas
    this.ctx.clearRect(x, y, w, h);

    // Keep its current screen position
    this.currentX = x;
    this.currentY = y;

    this.selectionCtx.clearRect(
      0,
      0,
      this.selectionCanvas.width,
      this.selectionCanvas.height,
    );
    this.selectionCtx.putImageData(this.selectedImage, x, y);

    this.isDragging = true;
    this.manager.redraw();
  }

  // ─────────────────────────────────────────────
  // DRAGGING phase
  // ─────────────────────────────────────────────

  startDragging(e) {
    const pos = this.manager.getMousePos(e);
    if (!this.selectedImage) return;

    if (
      pos.x >= this.currentX &&
      pos.x <= this.currentX + this.selectedImage.width &&
      pos.y >= this.currentY &&
      pos.y <= this.currentY + this.selectedImage.height
    ) {
      this.isDragging = true;
      this.selectedOffsetX = pos.x - this.currentX;
      this.selectedOffsetY = pos.y - this.currentY;
    }
  }

  dragMove(e) {
    if (!this.selectedImage || !this.isDragging) return;

    const pos = this.manager.getMousePos(e);

    this.currentX = pos.x - this.selectedOffsetX;
    this.currentY = pos.y - this.selectedOffsetY;

    this.manager.redraw();
  }

  stopDragging() {
    if (!this.selectedImage) return;

    this.isDragging = false;

    // Commit final placement
    this.ctx.putImageData(this.selectedImage, this.currentX, this.currentY);

    this.resetState();
    this.manager.redraw();
  }

  // ─────────────────────────────────────────────
  // Overlay (Draw selection preview)
  // ─────────────────────────────────────────────

  renderOverlay() {
    if (!this.isSelected || !this.selectedImage) return;

    this.bufferCtx.clearRect(
      0,
      0,
      this.bufferCanvas.width,
      this.bufferCanvas.height,
    );

    this.bufferCtx.putImageData(
      this.selectedImage,
      this.currentX,
      this.currentY,
    );
  }

  // ─────────────────────────────────────────────
  // Helpers
  // ─────────────────────────────────────────────

  resetState() {
    this.isDrawing = false;
    this.isDragging = false;
    this.isSelected = false;

    this.start = null;
    this.end = null;
    this.selectedImage = null;

    this.bufferCtx.clearRect(
      0,
      0,
      this.bufferCanvas.width,
      this.bufferCanvas.height,
    );
    this.selectionCtx.clearRect(
      0,
      0,
      this.selectionCanvas.width,
      this.selectionCanvas.height,
    );
  }

  getBufferCanvas() {
    return this.bufferCanvas;
  }
}
