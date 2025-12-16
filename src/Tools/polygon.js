export class PolygonTool {
  constructor(meta) {
    this.meta = meta;
  }
  begin(ctx) {
    ctx.renderer.beginStroke(ctx.pos, ctx.color, ctx.type);
  }

  update(ctx) {
    ctx.renderer.drawTo(ctx.pos);
  }

  end(ctx) {
    ctx.renderer.endStroke();
  }
}
export class PolygonRenderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");

    this.bufferCanvas = document.createElement("canvas");
    this.bufferCanvas.width = canvas.width;
    this.bufferCanvas.height = canvas.height;
    this.bufferCtx = this.bufferCanvas.getContext("2d");

    this.canvas.style.cursor = "crosshair";

    this.polygonComplete = false;

    this.threshold = 10; // or even 8

    this.points = [];
    this.last = null;
    this.pos = null;
    this.color = null;
    this.type = null;
  }

  beginStroke(pos, color, type) {
    console.log(pos);
    this.pos = pos;
    this.color = color;
    this.type = type;

    if (this.polygonComplete) {
      this.points = [];
      this.polygonComplete = false;
    }
    this.points.push(this.pos);

    if (this.points.length > 1) {
      this.drawLine(this.points[this.points.length - 2], this.pos);
    }

    // Close shape automatically if first point is hit
    if (this.points.length > 2 && this.isClose(this.pos, this.points[0])) {
      this.finishPolygon();
    }
  }

  drawTo(pos) {
    if (this.points.length === 0) return;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // redraw committed edges
    this.ctx.beginPath();
    this.ctx.moveTo(this.points[0].x, this.points[0].y);
    for (let i = 1; i < this.points.length; i++) {
      this.ctx.lineTo(this.points[i].x, this.points[i].y);
    }

    // preview edge
    this.ctx.lineTo(pos.x, pos.y);
    this.ctx.strokeStyle = this.color;
    this.ctx.stroke();
  }

  endStroke() {
    // DO NOTHING
  }

  finishPolygon() {
    if (this.points.length < 3) return;

    this.bufferCtx.clearRect(
      0,
      0,
      this.bufferCanvas.width,
      this.bufferCanvas.height,
    );

    // close shape
    this.drawLine(this.points[this.points.length - 1], this.points[0]);

    this.polygonComplete = true;

    if (this.type === 2) {
      this.ctx.fillStyle = "white";
      this.fillPolygon();
    } else if (this.type === 3) {
      this.ctx.fillStyle = this.color;
      this.fillPolygon();
    }

    this.points = [];
  }

  drawLine(a, b) {
    this.ctx.strokeStyle = this.color;
    this.ctx.beginPath();
    this.ctx.moveTo(a.x, a.y);
    this.ctx.lineTo(b.x, b.y);
    this.ctx.stroke();
  }

  fillPolygon() {
    if (this.points.length < 3) return;

    this.ctx.beginPath();
    this.ctx.moveTo(this.points[0].x, this.points[0].y);

    for (let i = 1; i < this.points.length; i++) {
      this.ctx.lineTo(this.points[i].x, this.points[i].y);
    }

    this.ctx.closePath();
    this.ctx.fill();
  }

  isClose(a, b) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    return dx * dx + dy * dy < this.threshold * this.threshold;
  }
}
