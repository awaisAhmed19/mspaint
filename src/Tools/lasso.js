export class LassoTool {
  constructor(meta) {
    this.meta = meta;
    console.log("[LassoTool] constructed", meta);
  }

  begin(ctx) {
    console.log("[LassoTool] begin", {
      pos: ctx.pos,
    });
    ctx.renderer.begin(ctx.pos);
  }

  update(ctx) {
    console.log("[LassoTool] update", {
      pos: ctx.pos,
    });
    ctx.renderer.update(ctx.pos);
  }

  end(ctx) {
    console.log("[LassoTool] end", {
      pos: ctx.pos,
    });
    ctx.renderer.end(ctx.pos);
  }
}
export class LassoRenderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");

    this.bufferCanvas = document.createElement("canvas");
    this.bufferCtx = this.bufferCanvas.getContext("2d");

    this.bufferCanvas.width = canvas.width;
    this.bufferCanvas.height = canvas.height;

    this.padding = 10;

    console.log("[LassoRenderer] constructed", {
      width: canvas.width,
      height: canvas.height,
    });

    this.resetState();
  }

  /* ---------- unified lifecycle ---------- */

  begin(pos) {
    console.log("[LassoRenderer] begin", {
      pos,
      isSelected: this.isSelected,
      isDragging: this.isDragging,
    });

    if (this.isSelected && this.isPointInsideSelection(pos)) {
      console.log("[LassoRenderer] → startDragging");
      this.startDragging(pos);
    } else {
      console.log("[LassoRenderer] → startLasso");
      this.clearSelection();
      this.startLasso(pos);
    }
  }

  update(pos) {
    console.log("[LassoRenderer] update", {
      pos,
      isDrawing: this.isDrawing,
      isDragging: this.isDragging,
      polygonSize: this.polygon.length,
    });

    if (this.isDragging) {
      this.dragging(pos);
    } else if (this.isDrawing) {
      this.drawLasso(pos);
    }
  }

  end(pos) {
    console.log("[LassoRenderer] end", {
      pos,
      isDrawing: this.isDrawing,
      isDragging: this.isDragging,
    });

    if (this.isDragging) {
      this.stopDragging();
    } else if (this.isDrawing) {
      this.stopLasso(pos);
    }
  }

  /* ---------- state ---------- */

  resetState() {
    console.log("[LassoRenderer] resetState");

    this.isDrawing = false;
    this.isDragging = false;
    this.isSelected = false;

    this.polygon = [];
    this.start = null;
    this.selectedBlob = null;

    this.bufferCtx.clearRect(
      0,
      0,
      this.bufferCanvas.width,
      this.bufferCanvas.height,
    );
  }

  clearSelection() {
    console.log("[LassoRenderer] clearSelection");
    this.isSelected = false;
    this.selectedBlob = null;
  }

  /* ---------- lasso drawing ---------- */

  startLasso(pos) {
    console.log("[LassoRenderer] startLasso", pos);

    this.isDrawing = true;
    this.polygon = [pos];
    this.start = pos;

    this.bufferCtx.clearRect(
      0,
      0,
      this.bufferCanvas.width,
      this.bufferCanvas.height,
    );

    this.bufferCtx.beginPath();
    this.bufferCtx.moveTo(pos.x, pos.y);
  }

  drawLasso(pos) {
    const last = this.polygon[this.polygon.length - 1];
    const dist = last ? Math.hypot(pos.x - last.x, pos.y - last.y) : 0;

    if (!last || dist > 2) {
      this.polygon.push(pos);
      this.bufferCtx.lineTo(pos.x, pos.y);
      this.bufferCtx.stroke();

      console.log("[LassoRenderer] drawLasso", {
        pos,
        polygonSize: this.polygon.length,
        dist,
      });
    }
  }

  stopLasso() {
    console.log("[LassoRenderer] stopLasso", {
      polygonSize: this.polygon.length,
    });

    if (this.polygon.length < 3) {
      console.warn("[LassoRenderer] polygon too small, reset");
      this.resetState();
      return;
    }

    this.isDrawing = false;
    this.isSelected = true;

    this.bufferCtx.closePath();
    this.bufferCtx.stroke();

    const box = this.boundingBox();
    if (!box) return;

    console.log("[LassoRenderer] selection bounding box", box);

    const { x, y, w, h } = box;

    const off = document.createElement("canvas");
    off.width = w;
    off.height = h;
    const offCtx = off.getContext("2d");

    offCtx.beginPath();
    this.polygon.forEach((p, i) => {
      const px = p.x - x;
      const py = p.y - y;
      i === 0 ? offCtx.moveTo(px, py) : offCtx.lineTo(px, py);
    });
    offCtx.closePath();
    offCtx.clip();

    offCtx.drawImage(this.canvas, x, y, w, h, 0, 0, w, h);

    this.ctx.save();
    this.ctx.beginPath();
    this.polygon.forEach((p, i) => {
      i === 0 ? this.ctx.moveTo(p.x, p.y) : this.ctx.lineTo(p.x, p.y);
    });
    this.ctx.closePath();
    this.ctx.clip();
    this.ctx.clearRect(x, y, w, h);
    this.ctx.restore();

    this.selectedBlob = { canvas: off, x, y, w, h };

    console.log("[LassoRenderer] selection created", this.selectedBlob);
  }

  /* ---------- dragging ---------- */

  isPointInsideSelection(pos) {
    if (!this.selectedBlob) return false;
    const b = this.selectedBlob;
    return (
      pos.x >= b.x && pos.x <= b.x + b.w && pos.y >= b.y && pos.y <= b.y + b.h
    );
  }

  startDragging(pos) {
    console.log("[LassoRenderer] startDragging", pos);

    this.isDragging = true;
    this.offsetX = pos.x - this.selectedBlob.x;
    this.offsetY = pos.y - this.selectedBlob.y;
  }

  dragging(pos) {
    this.selectedBlob.x = pos.x - this.offsetX;
    this.selectedBlob.y = pos.y - this.offsetY;

    console.log("[LassoRenderer] dragging", {
      pos,
      blobX: this.selectedBlob.x,
      blobY: this.selectedBlob.y,
    });

    this.renderOverlay();
  }

  stopDragging() {
    console.log("[LassoRenderer] stopDragging", this.selectedBlob);

    this.isDragging = false;

    this.ctx.drawImage(
      this.selectedBlob.canvas,
      this.selectedBlob.x,
      this.selectedBlob.y,
    );
  }

  /* ---------- helpers ---------- */

  boundingBox() {
    const xs = this.polygon.map((p) => p.x);
    const ys = this.polygon.map((p) => p.y);

    const minX = Math.min(...xs) - this.padding;
    const minY = Math.min(...ys) - this.padding;
    const maxX = Math.max(...xs) + this.padding;
    const maxY = Math.max(...ys) + this.padding;

    return {
      x: minX,
      y: minY,
      w: maxX - minX,
      h: maxY - minY,
    };
  }

  renderOverlay() {
    this.bufferCtx.clearRect(
      0,
      0,
      this.bufferCanvas.width,
      this.bufferCanvas.height,
    );

    if (this.isSelected && this.selectedBlob) {
      const b = this.selectedBlob;
      this.bufferCtx.drawImage(b.canvas, b.x, b.y);
    }
  }
}
