import React from "react";

// =============================================================
// Eraser Tool (JS Version)
// =============================================================

export default class Eraser {
  constructor(canvas, ctx, options = {}, manager) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.manager = manager;

    this.eraserSize = options.size || 3;
    this.isDrawing = false;
    this.lastPos = null;

    const cursorURL = "/static/cursors/eraser.png";
    this.canvas.style.cursor = `url(${cursorURL}) -45 -5, auto`;
  }

  updateOptions(opts) {
    if (opts.size !== undefined) this.eraserSize = opts.size;
  }

  onActivate() {
    const cursorURL = "/static/cursors/eraser.png";
    this.canvas.style.cursor = `url(${cursorURL}) -45 -5, auto`;
  }

  onDeactivate() {
    this.canvas.style.cursor = "default";
    this.isDrawing = false;
    this.lastPos = null;
    this.ctx.globalCompositeOperation = "source-over";
  }

  onStart(e) {
    this.isDrawing = true;
    this.lastPos = this.manager.getMousePos(e);
  }

  onDraw(e) {
    if (!this.isDrawing || !this.lastPos) return;

    const pos = this.manager.getMousePos(e);
    const size = this.eraserSize;

    const ctx = this.ctx;
    ctx.globalCompositeOperation = "destination-out";

    // Dot
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, size / 2, 0, Math.PI * 2);
    ctx.fill();

    // Stroke
    ctx.lineWidth = size;
    ctx.beginPath();
    ctx.moveTo(this.lastPos.x, this.lastPos.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();

    this.lastPos = pos;
  }

  onStop() {
    if (!this.isDrawing) return;

    this.isDrawing = false;
    this.lastPos = null;

    this.ctx.globalCompositeOperation = "source-over";

    this.manager.logUndo?.("Eraser");
  }
}

// =============================================================
// React Options Panel for Eraser
// EXACT MATCH TO YOUR HTML DOM
// =============================================================

export function EraserOptions({ onSelect, selected }) {
  const sizes = [
    { id: "Eraser1px", size: 3 },
    { id: "Eraser2px", size: 6 },
    { id: "Eraser3px", size: 9 },
    { id: "Eraser4px", size: 12 },
  ];

  return (
    <div className="EraserOptions">
      {sizes.map((s) => (
        <button
          key={s.size}
          id={s.id}
          value={s.size}
          className={`eOption ${selected === s.size ? "pressed" : ""}`}
          onClick={() => onSelect({ size: s.size })}
        />
      ))}
    </div>
  );
}
