export class RectLassoTool {
  constructor(meta) {
    this.meta = meta;
    console.log("[ReactLassoTool] constructed", meta);
  }

  begin(ctx) {
    console.log("[ReactLassoTool] begin", {
      pos: ctx.pos,
    });
    ctx.renderer.begin(ctx.pos);
  }

  update(ctx) {
    // console.log("[ReactLassoTool] update", {
    //   pos: ctx.pos,
    // });
    ctx.renderer.update(ctx.pos);
  }

  end(ctx) {
    console.log("[ReactLassoTool] end", {
      pos: ctx.pos,
    });
    ctx.renderer.end(ctx.pos);
  }
}
export class RectLassoRenderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");

    // --- buffers ---
    this.bufferCanvas = document.createElement("canvas");
    this.bufferCtx = this.bufferCanvas.getContext("2d");

    this.selectionCanvas = document.createElement("canvas");
    this.selectionCtx = this.selectionCanvas.getContext("2d");

    [this.bufferCanvas, this.selectionCanvas].forEach((c, i) => {
      c.width = canvas.width;
      c.height = canvas.height;
      c.style.position = "absolute";
      c.style.top = "0";
      c.style.left = "0";
      c.style.pointerEvents = "none";
      c.style.zIndex = 10 + i;
      c.style.display = "none";
    });

    canvas.parentNode.appendChild(this.bufferCanvas);
    canvas.parentNode.appendChild(this.selectionCanvas);

    this.bufferCtx.lineWidth = 1;
    this.bufferCtx.setLineDash([5, 3]);
    this.bufferCtx.strokeStyle = "black";

    // state
    this.isDrawing = false;
    this.isDragging = false;
    this.isSelected = false;

    this.startpos = null;
    this.endpos = null;

    this.selectedImageData = null;
    this.offsetX = 0;
    this.offsetY = 0;
  }

  /* ================= lifecycle ================= */

  begin(pos) {
    if (this.isSelected) this.startDragging(pos);
    else this.startRect(pos);
  }

  update(pos) {
    if (this.isDragging) this.drag(pos);
    else if (this.isDrawing) this.drawRect(pos);
  }

  end(pos) {
    if (this.isDragging) this.stopDragging();
    else if (this.isDrawing) this.finishRect(pos);
  }

  /* ================= rectangle draw ================= */

  startRect(pos) {
    this.isDrawing = true;
    this.startpos = pos;
    this.endpos = pos;

    this.bufferCanvas.style.display = "block";
    this.selectionCanvas.style.display = "none";

    this.bufferCtx.clearRect(
      0,
      0,
      this.bufferCanvas.width,
      this.bufferCanvas.height,
    );
  }

  drawRect(pos) {
    this.endpos = pos;

    const w = this.endpos.x - this.startpos.x;
    const h = this.endpos.y - this.startpos.y;

    this.bufferCtx.clearRect(
      0,
      0,
      this.bufferCanvas.width,
      this.bufferCanvas.height,
    );

    this.bufferCtx.strokeRect(this.startpos.x, this.startpos.y, w, h);
  }

  finishRect(pos) {
    this.isDrawing = false;
    this.isSelected = true;
    this.endpos = pos;

    const x = Math.min(this.startpos.x, this.endpos.x);
    const y = Math.min(this.startpos.y, this.endpos.y);
    const w = Math.abs(this.endpos.x - this.startpos.x);
    const h = Math.abs(this.endpos.y - this.startpos.y);

    if (!w || !h) {
      this.reset();
      return;
    }

    this.selectedImageData = this.ctx.getImageData(x, y, w, h);

    this.ctx.save();
    this.ctx.globalCompositeOperation = "source-over";
    this.ctx.fillStyle = "#ffffff"; // or your canvas bg color
    this.ctx.fillRect(x, y, w, h);
    this.ctx.restore();

    this.selectionCtx.clearRect(
      0,
      0,
      this.selectionCanvas.width,
      this.selectionCanvas.height,
    );
    this.selectionCtx.putImageData(this.selectedImageData, x, y);

    this.bufferCanvas.style.display = "block";
    this.selectionCanvas.style.display = "block";
  }

  /* ================= dragging ================= */

  startDragging(pos) {
    if (!this.selectedImageData) return;

    const selX = Math.min(this.startpos.x, this.endpos.x);
    const selY = Math.min(this.startpos.y, this.endpos.y);

    if (
      pos.x >= selX &&
      pos.x <= selX + this.selectedImageData.width &&
      pos.y >= selY &&
      pos.y <= selY + this.selectedImageData.height
    ) {
      this.isDragging = true;
      this.offsetX = pos.x - selX;
      this.offsetY = pos.y - selY;
    }
  }

  drag(pos) {
    if (!this.isDragging) return;

    const dx = pos.x - this.offsetX;
    const dy = pos.y - this.offsetY;

    // move pixels
    this.selectionCtx.clearRect(
      0,
      0,
      this.selectionCanvas.width,
      this.selectionCanvas.height,
    );
    this.selectionCtx.putImageData(this.selectedImageData, dx, dy);

    // update geometry
    this.startpos = { x: dx, y: dy };
    this.endpos = {
      x: dx + this.selectedImageData.width,
      y: dy + this.selectedImageData.height,
    };

    // 🔥 redraw selection rectangle
    this.bufferCtx.clearRect(
      0,
      0,
      this.bufferCanvas.width,
      this.bufferCanvas.height,
    );
    this.bufferCtx.strokeRect(
      this.startpos.x,
      this.startpos.y,
      this.selectedImageData.width,
      this.selectedImageData.height,
    );
  }

  stopDragging() {
    if (!this.isDragging) return;

    this.ctx.putImageData(
      this.selectedImageData,
      this.startpos.x,
      this.startpos.y,
    );

    this.reset();
  }

  /* ================= helpers ================= */

  reset() {
    this.isDrawing = false;
    this.isDragging = false;
    this.isSelected = false;

    this.startpos = null;
    this.endpos = null;
    this.selectedImageData = null;

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

    this.bufferCanvas.style.display = "none";
    this.selectionCanvas.style.display = "none";
  }
}
