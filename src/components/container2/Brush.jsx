import React from "react";

// =============================================================
// Brush Tool Class (JS version, no TypeScript)
// =============================================================

export default class Brush {
  constructor(canvas, ctx, options = {}, manager) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.manager = manager;

    this.isDrawing = false;
    this.oldPos = null;

    this.brushSize = options.size || 1;
    this.currentColor = options.color || manager.color;

    this.angledSettings = {
      7: { lineLength: 9, angle: (3 * Math.PI) / 4 },
      8: { lineLength: 6, angle: (3 * Math.PI) / 4 },
      9: { lineLength: 3, angle: (3 * Math.PI) / 4 },
      10: { lineLength: 9, angle: Math.PI / 4 },
      11: { lineLength: 6, angle: Math.PI / 4 },
      12: { lineLength: 3, angle: Math.PI / 4 },
    };

    this.canvas.style.cursor = "crosshair";
  }

  // React options panel updates this
  updateOptions(opts) {
    if (opts.size !== undefined) this.brushSize = opts.size;
    if (opts.color !== undefined) this.currentColor = opts.color;
  }

  onStart(e) {
    this.isDrawing = true;
    this.oldPos = this.manager.getMousePos(e);

    const ctx = this.ctx;

    switch (this.brushSize) {
      case 1:
        ctx.lineWidth = 3;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        break;
      case 2:
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        break;
      case 3:
        ctx.lineWidth = 1;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        break;
      case 4:
        ctx.lineWidth = 3;
        ctx.lineCap = "square";
        ctx.lineJoin = "bevel";
        break;
      case 5:
        ctx.lineWidth = 2;
        ctx.lineCap = "square";
        ctx.lineJoin = "bevel";
        break;
      case 6:
        ctx.lineWidth = 1;
        ctx.lineCap = "square";
        ctx.lineJoin = "bevel";
        break;
      default:
        ctx.lineWidth = 1;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
    }
  }

  onDraw(e) {
    if (!this.isDrawing || !this.oldPos) return;

    const ctx = this.ctx;
    const pos = this.manager.getMousePos(e);
    ctx.strokeStyle = this.currentColor;

    // Angled brushes (sizes 7–12)
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
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.lineTo(
          x0 + lineLength * Math.cos(angle),
          y0 + lineLength * Math.sin(angle),
        );
        ctx.stroke();

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
    }

    // Normal brushes 1–6
    else {
      ctx.beginPath();
      ctx.moveTo(this.oldPos.x, this.oldPos.y);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    }

    this.oldPos = pos;
  }

  onStop() {
    this.isDrawing = false;
  }

  setColor(color) {
    this.currentColor = color;
  }
}

export function BrushOptions({ onSelect, selected }) {
  const sizes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  return (
    <div className="BrushOptions">
      {sizes.map((s) => (
        <button
          key={s}
          id={`BrushOption${s}`}
          className={`brushOption ${selected === s ? "pressed" : ""}`}
          value={s}
          onClick={() => onSelect({ size: s })}
        />
      ))}
    </div>
  );
}
