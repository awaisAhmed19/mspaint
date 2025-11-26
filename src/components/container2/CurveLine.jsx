import React from "react";

// =============================================================
// CurveLine Tool (JS Version)
// =============================================================

export default class CurveLine {
  constructor(canvas, ctx, options = {}, manager) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.manager = manager;

    this.bufferCanvas = document.createElement("canvas");
    this.bufferCtx = this.bufferCanvas.getContext("2d");

    this.start = null;
    this.end = null;
    this.cp1 = null;
    this.cp2 = null;

    this.phase = 1;
    this.draggingCp1 = false;
    this.draggingCp2 = false;

    this.lineWidth = options.size || 1;
    this.color = options.color || manager.color;

    this.syncSize();
    this.canvas.style.cursor = "crosshair";
  }

  // allow React options panel tweaks
  updateOptions(opts) {
    if (opts.size !== undefined) this.lineWidth = opts.size;
    if (opts.color !== undefined) this.color = opts.color;
  }

  syncSize() {
    this.bufferCanvas.width = this.canvas.width;
    this.bufferCanvas.height = this.canvas.height;
  }

  onActivate() {
    this.syncSize();
    this.canvas.style.cursor = "crosshair";
  }

  onDeactivate() {
    this.reset();
  }

  onStart(e) {
    const pos = this.manager.getMousePos(e);

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

  onDraw(e) {
    const pos = this.manager.getMousePos(e);

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

  onStop() {
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

// =============================================================
// CurveLine Options React Component
// =============================================================

export function CurveLineOptions({ onSelect, selected }) {
  const sizes = [1, 2, 3, 4, 5];

  return (
    <div className="CurvedLineOptions">
      {sizes.map((s) => (
        <button
          key={s}
          id={`Line${s}px`}
          className={`Loptions ${selected === s ? "pressed" : ""}`}
          value={s}
          onClick={() => onSelect({ size: s })}
        />
      ))}
    </div>
  );
}
