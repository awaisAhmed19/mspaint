export default class RectShape {
  constructor(canvas, ctx, options = {}, manager) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.manager = manager;

    this.start = null;
    this.end = null;
    this.isDrawing = false;

    this.mode = options.mode || 1; // 1=stroke, 2=white fill+stroke, 3=color fill
    this.strokeColor = options.color || manager?.color || "#000";

    // Offscreen preview buffer
    this.bufferCanvas = document.createElement("canvas");
    this.bufferCtx = this.bufferCanvas.getContext("2d");

    this.syncSize();
  }

  syncSize() {
    this.bufferCanvas.width = this.canvas.width;
    this.bufferCanvas.height = this.canvas.height;
  }

  // ─────────────────────────────────────────────
  // Lifecycle
  // ─────────────────────────────────────────────

  onActivate() {
    this.syncSize();
    this.canvas.style.cursor = "crosshair";
  }

  onDeactivate() {
    this.reset();
    this.canvas.style.cursor = "default";
  }

  // ─────────────────────────────────────────────
  // Events
  // ─────────────────────────────────────────────

  onStart(e) {
    this.start = this.manager.getMousePos(e);
    this.isDrawing = true;

    // Take snapshot
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

    const x1 = this.start.x;
    const y1 = this.start.y;
    const x2 = this.end.x;
    const y2 = this.end.y;

    const w = x2 - x1;
    const h = y2 - y1;

    // Restore snapshot
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(this.bufferCanvas, 0, 0);

    this.ctx.beginPath();

    if (this.mode === 1) {
      this.ctx.strokeStyle = this.strokeColor;
      this.ctx.strokeRect(x1, y1, w, h);
    } else if (this.mode === 2) {
      this.ctx.fillStyle = "white";
      this.ctx.fillRect(x1, y1, w, h);
      this.ctx.strokeStyle = "black";
      this.ctx.strokeRect(x1, y1, w, h);
    } else if (this.mode === 3) {
      this.ctx.fillStyle = this.strokeColor;
      this.ctx.fillRect(x1, y1, w, h);
      this.ctx.strokeStyle = this.strokeColor;
      this.ctx.strokeRect(x1, y1, w, h);
    }
  }

  onStop() {
    if (!this.isDrawing || !this.start || !this.end) return;

    const x1 = this.start.x;
    const y1 = this.start.y;
    const x2 = this.end.x;
    const y2 = this.end.y;

    const w = x2 - x1;
    const h = y2 - y1;

    this.ctx.beginPath();

    if (this.mode === 1) {
      this.ctx.strokeStyle = this.strokeColor;
      this.ctx.strokeRect(x1, y1, w, h);
    } else if (this.mode === 2) {
      this.ctx.fillStyle = "white";
      this.ctx.fillRect(x1, y1, w, h);
      this.ctx.strokeStyle = "black";
      this.ctx.strokeRect(x1, y1, w, h);
    } else if (this.mode === 3) {
      this.ctx.fillStyle = this.strokeColor;
      this.ctx.fillRect(x1, y1, w, h);
      this.ctx.strokeStyle = this.strokeColor;
      this.ctx.strokeRect(x1, y1, w, h);
    }

    this.manager?.logUndo?.("RectShape");
    this.reset();
  }

  renderOverlay() {}

  // ─────────────────────────────────────────────
  // Helpers
  // ─────────────────────────────────────────────

  reset() {
    this.start = null;
    this.end = null;
    this.isDrawing = false;

    this.bufferCtx.clearRect(
      0,
      0,
      this.bufferCanvas.width,
      this.bufferCanvas.height,
    );
  }

  // External API
  updateOptions(opts) {
    if (opts.mode !== undefined) this.mode = opts.mode;
    if (opts.color !== undefined) this.strokeColor = opts.color;
  }
}
import React from "react";
export function RectShapeOptions({ selected, onSelect }) {
  const modes = [
    { id: "rectborder", mode: 1 },
    { id: "filledrectborder", mode: 2 },
    { id: "filledrect", mode: 3 },
  ];

  return (
    <div className="rectTool">
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
