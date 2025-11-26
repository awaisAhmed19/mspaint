export default class RectElipse {
  constructor(canvas, ctx, options = {}, manager) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.manager = manager;

    this.start = null;
    this.end = null;
    this.isDrawing = false;

    this.radius = options.radius || 10;
    this.mode = options.mode || 1; // 1=stroke 2=white border 3=solid fill
    this.fillColor = options.color || manager?.color || "#000";

    this.bufferCanvas = document.createElement("canvas");
    this.bufferCtx = this.bufferCanvas.getContext("2d");

    this.syncSize();
  }

  syncSize() {
    this.bufferCanvas.width = this.canvas.width;
    this.bufferCanvas.height = this.canvas.height;
  }

  // ─────────────────────────────────────────
  // Lifecycle
  // ─────────────────────────────────────────

  onActivate() {
    this.syncSize();
    this.canvas.style.cursor = "crosshair";
  }

  onDeactivate() {
    this.reset();
    this.canvas.style.cursor = "default";
  }

  // ─────────────────────────────────────────
  // External React Options
  // ─────────────────────────────────────────

  updateOptions(opts) {
    if (opts.mode !== undefined) this.mode = opts.mode;
    if (opts.color !== undefined) this.fillColor = opts.color;
    if (opts.radius !== undefined) this.radius = opts.radius;
  }

  // ─────────────────────────────────────────
  // Events
  // ─────────────────────────────────────────

  onStart(e) {
    this.start = this.manager.getMousePos(e);
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
    if (!this.isDrawing || !this.start) return;

    this.end = this.manager.getMousePos(e);

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(this.bufferCanvas, 0, 0);

    const { x, y, width, height } = this.computeRect();
    this.drawRoundedRect(this.ctx, x, y, width, height);
  }

  onStop() {
    if (!this.isDrawing || !this.start || !this.end) return;

    const { x, y, width, height } = this.computeRect();
    this.drawRoundedRect(this.ctx, x, y, width, height);

    this.manager?.logUndo?.("RectEllipse");

    this.reset();
  }

  // ─────────────────────────────────────────
  // Core Logic
  // ─────────────────────────────────────────

  computeRect() {
    const dx = this.end.x - this.start.x;
    const dy = this.end.y - this.start.y;

    return {
      width: Math.abs(dx),
      height: Math.abs(dy),
      x: dx > 0 ? this.start.x : this.start.x + dx,
      y: dy > 0 ? this.start.y : this.start.y + dy,
    };
  }

  drawRoundedRect(ctx, x, y, width, height) {
    const r = Math.min(this.radius, Math.min(width / 2, height / 2));

    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + width - r, y);
    ctx.arcTo(x + width, y, x + width, y + r, r);
    ctx.lineTo(x + width, y + height - r);
    ctx.arcTo(x + width, y + height, x + width - r, y + height, r);
    ctx.lineTo(x + r, y + height);
    ctx.arcTo(x, y + height, x, y + height - r, r);
    ctx.lineTo(x, y + r);
    ctx.arcTo(x, y, x + r, y, r);
    ctx.closePath();

    if (this.mode === 1) {
      ctx.strokeStyle = this.fillColor;
      ctx.stroke();
    } else if (this.mode === 2) {
      ctx.fillStyle = "white";
      ctx.strokeStyle = this.fillColor;
      ctx.fill();
      ctx.stroke();
    } else if (this.mode === 3) {
      ctx.fillStyle = this.fillColor;
      ctx.fill();
    }
  }

  // ─────────────────────────────────────────
  // Helpers
  // ─────────────────────────────────────────

  reset() {
    this.start = null;
    this.end = null;
    this.isDrawing = false;
  }

  setMode(m) {
    this.mode = m;
  }

  setColor(c) {
    this.fillColor = c;
  }
}

import React from "react";

export function RectElipseOptions({ onSelect, selected }) {
  const modes = [
    { id: "roundedrect-border", mode: 1 },
    { id: "filled-roundedrect-border", mode: 2 },
    { id: "filled-roundedrect", mode: 3 },
  ];

  return (
    <div className="roundedrect-tool">
      {modes.map((m) => (
        <button
          key={m.mode}
          id={m.id}
          value={m.mode}
          className={`rectOption ${selected === m.mode ? "pressed" : ""}`}
          onClick={() => onSelect({ mode: m.mode })}
        />
      ))}
    </div>
  );
}
