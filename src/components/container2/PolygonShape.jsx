export default class PolygonShape {
  constructor(canvas, ctx, options = {}, manager) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.manager = manager;

    this.points = [];
    this.isDrawing = false;
    this.polygonComplete = false;

    this.lineColor = options.color || manager?.color || "#000";
    this.fillMode = options.fillMode || 1; // 1=line, 2=white fill, 3=color fill

    this.threshold = 50;

    // preview buffer
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
  // Options from React
  // ─────────────────────────────────────────

  updateOptions(opts) {
    if (opts.color !== undefined) this.lineColor = opts.color;
    if (opts.fillMode !== undefined) this.fillMode = opts.fillMode;
  }

  // ─────────────────────────────────────────
  // Mouse Events
  // ─────────────────────────────────────────

  onStart(e) {
    const pos = this.manager.getMousePos(e);

    if (this.polygonComplete) {
      this.points = [];
      this.polygonComplete = false;
    }

    this.points.push(pos);
    this.isDrawing = true;

    // Draw permanent segment
    if (this.points.length > 1) {
      this.drawLine(this.points[this.points.length - 2], pos);
    }

    // Close shape automatically if first point is hit
    if (this.points.length > 2 && this.isClose(pos, this.points[0])) {
      this.finishPolygon();
    }
  }

  onDraw(e) {
    if (!this.isDrawing || this.polygonComplete || this.points.length === 0)
      return;

    const pos = this.manager.getMousePos(e);
    const last = this.points[this.points.length - 1];

    // live preview
    this.bufferCtx.clearRect(
      0,
      0,
      this.bufferCanvas.width,
      this.bufferCanvas.height,
    );
    this.bufferCtx.strokeStyle = this.lineColor;
    this.bufferCtx.beginPath();
    this.bufferCtx.moveTo(last.x, last.y);
    this.bufferCtx.lineTo(pos.x, pos.y);
    this.bufferCtx.stroke();
  }

  onStop() {
    this.isDrawing = false;
    this.manager?.logUndo?.("PolygonShape");
  }

  renderOverlay() {
    // draw preview buffer
    this.ctx.drawImage(this.bufferCanvas, 0, 0);
  }

  // ─────────────────────────────────────────
  // Polygon Logic
  // ─────────────────────────────────────────

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

    if (this.fillMode === 2) {
      this.ctx.fillStyle = "white";
      this.fillPolygon();
    } else if (this.fillMode === 3) {
      this.ctx.fillStyle = this.lineColor;
      this.fillPolygon();
    }

    this.points = [];
  }

  drawLine(a, b) {
    this.ctx.strokeStyle = this.lineColor;
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

  reset() {
    this.points = [];
    this.isDrawing = false;
    this.polygonComplete = false;
    this.bufferCtx.clearRect(
      0,
      0,
      this.bufferCanvas.width,
      this.bufferCanvas.height,
    );
  }

  // external UI API
  setColor(c) {
    this.lineColor = c;
  }

  setFillMode(m) {
    this.fillMode = m;
  }
}
import React from "react";

export function PolygonOptions({ onSelect, selected }) {
  const modes = [
    { id: "polygonborder", mode: 1 },
    { id: "filledpolygonborder", mode: 2 },
    { id: "filledpolygon", mode: 3 },
  ];

  return (
    <div className="polygontool">
      {modes.map((m) => (
        <button
          key={m.mode}
          id={m.id}
          value={m.mode}
          className={`polygonOption ${selected === m.mode ? "pressed" : ""}`}
          onClick={() => onSelect({ fillMode: m.mode })}
        />
      ))}
    </div>
  );
}
