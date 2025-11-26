export default class MagnificationTool {
  constructor(canvas, ctx, options = {}, manager) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.manager = manager;

    this.zoom = options.zoom || 1;

    this.minZoom = 0.1;
    this.maxZoom = 10;

    this.cursorUrl = "/static/cursors/magnifier.png";
    this.hotspotX = 15;
    this.hotspotY = 15;

    // offscreen buffer
    this.bufferCanvas = document.createElement("canvas");
    this.bufferCtx = this.bufferCanvas.getContext("2d");

    this.syncSize();
  }

  syncSize() {
    this.bufferCanvas.width = this.canvas.width;
    this.bufferCanvas.height = this.canvas.height;
  }

  // ────────────────────────────────
  // Lifecycle
  // ────────────────────────────────

  onActivate() {
    this.syncSize();
    this.canvas.style.cursor = `url(${this.cursorUrl}) ${this.hotspotX} ${this.hotspotY}, auto`;
  }

  onDeactivate() {
    this.canvas.style.cursor = "default";
  }

  // ────────────────────────────────
  // External UI (React) options
  // ────────────────────────────────

  updateOptions(opts) {
    if (opts.zoom !== undefined) {
      this.zoom = Math.max(this.minZoom, Math.min(this.maxZoom, opts.zoom));
    }
  }

  // ────────────────────────────────
  // Events
  // ────────────────────────────────

  onStart() {
    this.applyZoom(this.zoom);
  }

  onDraw() {}
  onStop() {}

  renderOverlay() {}

  // ────────────────────────────────
  // Core zoom logic
  // ────────────────────────────────

  applyZoom(factor) {
    // copy current canvas
    this.bufferCtx.clearRect(
      0,
      0,
      this.bufferCanvas.width,
      this.bufferCanvas.height,
    );
    this.bufferCtx.drawImage(this.canvas, 0, 0);

    // reset transform
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);

    // zoom
    this.ctx.scale(factor, factor);

    // redraw
    this.ctx.drawImage(this.bufferCanvas, 0, 0);

    this.manager?.redraw?.();
  }
}

import React from "react";

export function MagnificationOptions({ onSelect, selected }) {
  const zoomLevels = [1, 2, 6, 8];

  return (
    <div className="MagnificationOptions">
      {zoomLevels.map((z) => (
        <button
          key={z}
          id={`Mag${z}x`}
          value={z}
          className={`magOption ${selected === z ? "pressed" : ""}`}
          onClick={() => onSelect({ zoom: z })}
        />
      ))}
    </div>
  );
}
