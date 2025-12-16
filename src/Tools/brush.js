export class BrushTool {
  constructor(meta) {
    this.meta = meta;
  }
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
export class BrushRenderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.canvas.style.cursor = "crosshair";

    this.brushSize = 1;
    this.oldPos = null;

    this.angledSettings = {
      7: { lineLength: 9, angle: (3 * Math.PI) / 4 },
      8: { lineLength: 6, angle: (3 * Math.PI) / 4 },
      9: { lineLength: 3, angle: (3 * Math.PI) / 4 },
      10: { lineLength: 9, angle: Math.PI / 4 },
      11: { lineLength: 6, angle: Math.PI / 4 },
      12: { lineLength: 3, angle: Math.PI / 4 },
    };
  }

  beginStroke(pos, color, size) {
    this.brushSize = size;
    this.oldPos = pos;

    // defaults (important)
    this.ctx.lineWidth = 1;
    this.ctx.lineCap = "round";
    this.ctx.lineJoin = "round";

    this.ctx.strokeStyle = color;

    switch (this.brushSize) {
      case 1:
        this.ctx.lineWidth = 3;
        break;
      case 2:
        this.ctx.lineWidth = 2;
        break;
      case 3:
        this.ctx.lineWidth = 1;
        break;
      case 4:
        this.ctx.lineWidth = 3;
        this.ctx.lineCap = "square";
        this.ctx.lineJoin = "bevel";
        break;
      case 5:
        this.ctx.lineWidth = 2;
        this.ctx.lineCap = "square";
        this.ctx.lineJoin = "bevel";
        break;
      case 6:
        this.ctx.lineWidth = 1;
        this.ctx.lineCap = "square";
        this.ctx.lineJoin = "bevel";
        break;
      default:
        break;
    }

    this.ctx.beginPath();
    this.ctx.moveTo(pos.x, pos.y);
  }

  drawTo(pos) {
    if (!this.oldPos) return;

    if (this.brushSize >= 7 && this.brushSize <= 12) {
      const { lineLength, angle } = this.angledSettings[this.brushSize];

      let x0 = this.oldPos.x;
      let y0 = this.oldPos.y;
      let x1 = pos.x;
      let y1 = pos.y;

      const dx = Math.abs(x1 - x0);
      const dy = Math.abs(y1 - y0);
      const sx = x0 < x1 ? 1 : -1;
      const sy = y0 < y1 ? 1 : -1;
      let err = dx - dy;

      while (true) {
        this.ctx.beginPath();
        this.ctx.moveTo(x0, y0);
        this.ctx.lineTo(
          x0 + lineLength * Math.cos(angle),
          y0 + lineLength * Math.sin(angle),
        );
        this.ctx.stroke();

        if (x0 === x1 && y0 === y1) break;

        const e2 = 2 * err;
        if (e2 > -dy) {
          err -= dy;
          x0 += sx;
        }
        if (e2 < dx) {
          err += dx;
          y0 += sy;
        }
      }
    } else {
      this.ctx.lineTo(pos.x, pos.y);
      this.ctx.stroke();
    }

    this.oldPos = pos;
  }

  endStroke() {
    this.ctx.closePath();
    this.oldPos = null;
  }
}
