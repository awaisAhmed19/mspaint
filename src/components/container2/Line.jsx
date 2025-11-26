export default class LineTool {
  constructor(canvas, ctx, options = {}, manager) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.manager = manager;

    this.lineWidth = options.size || 1;
    this.color = options.color || manager?.color || "#000";

    this.bufferCanvas = document.createElement("canvas");
    this.bufferCtx = this.bufferCanvas.getContext("2d");

    this.syncSize();

    this.isDrawing = false;
    this.start = null;
    this.end = null;
  }

  syncSize() {
    this.bufferCanvas.width = this.canvas.width;
    this.bufferCanvas.height = this.canvas.height;
  }

  // ─────────────────────────────
  // Lifecycle
  // ─────────────────────────────

  onActivate() {
    this.syncSize();
    this.canvas.style.cursor = "crosshair";
  }

  onDeactivate() {
    this.resetState();
    this.canvas.style.cursor = "default";
  }

  // ─────────────────────────────
  // Options from React
  // ─────────────────────────────

  updateOptions(opts) {
    if (opts.size !== undefined) this.lineWidth = opts.size;
    if (opts.color !== undefined) this.color = opts.color;
  }

  // ─────────────────────────────
  // Drawing Events
  // ─────────────────────────────

  onStart(e) {
    this.isDrawing = true;
    const pos = this.manager.getMousePos(e);

    this.start = pos;
    this.end = pos;

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

    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    ctx.drawImage(this.bufferCanvas, 0, 0);

    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.lineWidth;

    ctx.beginPath();
    ctx.moveTo(this.start.x, this.start.y);
    ctx.lineTo(this.end.x, this.end.y);
    ctx.stroke();
  }

  onStop() {
    if (!this.isDrawing) return;

    this.isDrawing = false;
    this.manager?.logUndo?.("Line");

    this.resetState();
  }

  renderOverlay() {}

  resetState() {
    this.isDrawing = false;
    this.start = null;
    this.end = null;
  }
}

import React from "react";

export function LineOptions({ onSelect, selected }) {
  const sizes = [1, 2, 3, 4, 5];

  return (
    <div className="LineOptions">
      {sizes.map((s) => (
        <button
          key={s}
          id={`Line${s}px`}
          value={s}
          className={`Loptions ${selected === s ? "pressed" : ""}`}
          onClick={() => onSelect({ size: s })}
        />
      ))}
    </div>
  );
}
