export class CurveLineTool {
  begin(ctx) {
    ctx.renderer.beginStroke(ctx.pos, ctx.color, ctx.size);
  }

  update(ctx) {
    ctx.renderer.drawTo(ctx.pos);
  }

  end(ctx) {
    ctx.renderer.endStroke();
  }
}
export class CurveLineRenderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");

    this.bufferCanvas = document.createElement("canvas");
    this.bufferCtx = this.bufferCanvas.getContext("2d");

    this.bufferCanvas.width = this.canvas.width;
    this.bufferCanvas.height = this.canvas.height;

    this.start = null;
    this.end = null;
    this.cp1 = null;
    this.cp2 = null;

    this.phase = 1;
    this.draggingCp1 = false;
    this.draggingCp2 = false;
    this.color = "#000";
    this.size = 1;
  }

  beginStroke(pos, color, size) {
    this.color = color;
    this.size = size;

    if (this.phase === 1) {
      if (!this.start) {
        this.start = pos;
        return;
      }

      if (!this.end) {
        this.end = pos;

        const midX = (this.start.x + this.end.x) / 2;
        const midY = (this.start.y + this.end.y) / 2;

        this.cp1 = {
          x: (this.start.x + midX) / 2,
          y: (this.start.y + midY) / 2,
        };
        this.cp2 = { x: (this.end.x + midX) / 2, y: (this.end.y + midY) / 2 };

        this.phase = 2;
        this.drawPreview();
        return;
      }
    }

    if (this.phase === 2) {
      if (this.cp1 && this.isInside(pos, this.cp1)) {
        this.draggingCp1 = true;
        return;
      }
      if (this.cp2 && this.isInside(pos, this.cp2)) {
        this.draggingCp2 = true;
        return;
      }
    }
  }

  drawTo(pos) {
    if (this.phase === 1 && this.start) {
      this.end = pos;
      this.updateDefaultControlPoints();
      this.drawPreview();
      return;
    }

    if (this.phase === 2) {
      if (this.draggingCp1) {
        this.cp1.x = pos.x;
        this.cp1.y = pos.y;
        this.drawPreview();
      } else if (this.draggingCp2) {
        this.cp2.x = pos.x;
        this.cp2.y = pos.y;
        this.drawPreview();
      }
    }
  }

  endStroke() {
    if (this.phase === 2) {
      if (this.draggingCp1 || this.draggingCp2) {
        this.draggingCp1 = false;
        this.draggingCp2 = false;
        return;
      }

      this.commitStroke();
    }
  }

  updateDefaultControlPoints() {
    if (!this.start || !this.end) return;

    const midX = (this.start.x + this.end.x) / 2;
    const midY = (this.start.y + this.end.y) / 2;

    this.cp1 = { x: (this.start.x + midX) / 2, y: (this.start.y + midY) / 2 };
    this.cp2 = { x: (this.end.x + midX) / 2, y: (this.end.y + midY) / 2 };
  }

  drawPreview() {
    if (!this.start || !this.end || !this.cp1 || !this.cp2) return;

    this.bufferCtx.clearRect(
      0,
      0,
      this.bufferCanvas.width,
      this.bufferCanvas.height,
    );
    this.bufferCtx.drawImage(this.canvas, 0, 0);

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(this.bufferCanvas, 0, 0);

    this.ctx.strokeStyle = this.color;
    this.ctx.lineWidth = this.lineWidth;

    this.ctx.beginPath();
    this.ctx.moveTo(this.start.x, this.start.y);
    this.ctx.bezierCurveTo(
      this.cp1.x,
      this.cp1.y,
      this.cp2.x,
      this.cp2.y,
      this.end.x,
      this.end.y,
    );
    this.ctx.stroke();
  }

  commitStroke() {
    if (!this.start || !this.end || !this.cp1 || !this.cp2) return;

    this.ctx.strokeStyle = this.color;
    this.ctx.lineWidth = this.lineWidth;

    this.ctx.beginPath();
    this.ctx.moveTo(this.start.x, this.start.y);
    this.ctx.bezierCurveTo(
      this.cp1.x,
      this.cp1.y,
      this.cp2.x,
      this.cp2.y,
      this.end.x,
      this.end.y,
    );
    this.ctx.stroke();

    this.reset();
  }

  isInside(p, cp) {
    const dx = p.x - cp.x;
    const dy = p.y - cp.y;
    return dx * dx + dy * dy < 100 * 100;
  }

  reset() {
    this.start = null;
    this.end = null;
    this.cp1 = null;
    this.cp2 = null;
    this.phase = 1;
    this.draggingCp1 = false;
    this.draggingCp2 = false;
  }
}
