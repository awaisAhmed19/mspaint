import React from "react";

// ===========================================================
// EllipseTool - JS version (AirBrush-style constructor)
// ===========================================================

export default class EllipseTool {
  constructor(canvas, ctx, options = {}, manager) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.manager = manager;

    this.bufferCanvas = document.createElement("canvas");
    this.bufferCtx = this.bufferCanvas.getContext("2d");

    this.startPos = null;
    this.endPos = null;
    this.isDrawing = false;

    this.mode = options.mode || 1; // 1 stroke, 2 white+stroke, 3 fill
    this.strokeColor = options.color || manager.color;

    this.syncSize();
    this.canvas.style.cursor = "crosshair";
  }

  updateOptions(opts) {
    if (opts.mode !== undefined) this.mode = opts.mode;
    if (opts.color !== undefined) this.strokeColor = opts.color;
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
    this.canvas.style.cursor = "default";
  }

  onStart(e) {
    this.startPos = this.manager.getMousePos(e);
    this.isDrawing = true;

    this.bufferCtx.clearRect(
      0,
      0,
      this.bufferCanvas.width,
      this.bufferCanvas.height,
    );
    this.bufferCtx.drawImage(this.canvas, 0, 0);
  }

  onDraw(e) {
    if (!this.isDrawing || !this.startPos) return;

    this.endPos = this.manager.getMousePos(e);

    const { x: x1, y: y1 } = this.startPos;
    const { x: x2, y: y2 } = this.endPos;

    const rx = Math.abs(x2 - x1) / 2;
    const ry = Math.abs(y2 - y1) / 2;
    const cx = x1 + (x2 - x1) / 2;
    const cy = y1 + (y2 - y1) / 2;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(this.bufferCanvas, 0, 0);

    this.drawEllipse(this.ctx, cx, cy, rx, ry);
  }

  onStop() {
    if (!this.isDrawing || !this.startPos || !this.endPos) return;

    this.isDrawing = false;

    const { x: x1, y: y1 } = this.startPos;
    const { x: x2, y: y2 } = this.endPos;

    const rx = Math.abs(x2 - x1) / 2;
    const ry = Math.abs(y2 - y1) / 2;
    const cx = x1 + (x2 - x1) / 2;
    const cy = y1 + (y2 - y1) / 2;

    this.drawEllipse(this.ctx, cx, cy, rx, ry);
    this.manager.logUndo("Ellipse");
    this.reset();
  }

  drawEllipse(ctx, cx, cy, rx, ry) {
    ctx.beginPath();
    ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);

    if (this.mode === 1) {
      ctx.strokeStyle = this.strokeColor;
      ctx.stroke();
    } else if (this.mode === 2) {
      ctx.fillStyle = "white";
      ctx.strokeStyle = this.strokeColor;
      ctx.fill();
      ctx.stroke();
    } else if (this.mode === 3) {
      ctx.fillStyle = this.strokeColor;
      ctx.fill();
    }
  }

  reset() {
    this.startPos = null;
    this.endPos = null;
    this.isDrawing = false;
    this.bufferCtx.clearRect(
      0,
      0,
      this.bufferCanvas.width,
      this.bufferCanvas.height,
    );
  }
}

// ===========================================================
// React Options Panel - EXACT DOM AS YOUR ORIGINAL HTML
// ===========================================================

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
