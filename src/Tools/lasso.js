export class LassoTool {
  constructor(meta) {
    this.meta = meta;
    console.log("[LassoTool] constructed", meta);
  }

  begin(ctx) {
    console.log("[LassoTool] begin", {
      pos: ctx.pos,
    });
    ctx.renderer.begin(ctx.pos);
  }

  update(ctx) {
    // console.log("[LassoTool] update", {
    //   pos: ctx.pos,
    // });
    ctx.renderer.update(ctx.pos);
  }

  end(ctx) {
    console.log("[LassoTool] end", {
      pos: ctx.pos,
    });
    ctx.renderer.end(ctx.pos);
  }
}
export class LassoRenderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    //TODO: remove the artifacts of the selection buffer
    // --- lasso UI buffer ---
    this.lassoCanvas = document.createElement("canvas");
    this.lassoCtx = this.lassoCanvas.getContext("2d");

    // --- drag UI buffer ---
    this.dragCanvas = document.createElement("canvas");
    this.dragCtx = this.dragCanvas.getContext("2d");

    [this.lassoCanvas, this.dragCanvas].forEach((c) => {
      c.width = canvas.width;
      c.height = canvas.height;
    });

    this.MODE_IDLE = 0;
    this.MODE_DRAWING = 1;
    this.MODE_DRAGGING = 2;
    this.lassoCtx.setLineDash([4, 4]);
    this.lassoCtx.strokeStyle = "rgba(255,0,0,0.8)";
    this.lassoCtx.lineWidth = 1;

    this.padding = 10;
    this.reset();
  }

  /* ---------------- state ---------------- */

  reset() {
    this.mode = this.MODE_IDLE; // idle | lasso | drag
    this.polygon = [];
    this.selectedBlob = null;

    this.isDragging = false;
    this.clearBuffers();
  }

  clearBuffers() {
    this.lassoCtx.clearRect(
      0,
      0,
      this.lassoCanvas.width,
      this.lassoCanvas.height,
    );
    this.dragCtx.clearRect(0, 0, this.dragCanvas.width, this.dragCanvas.height);
  }

  /* ---------------- lifecycle ---------------- */

  begin(pos) {
    if (this.mode === this.MODE_DRAGGING && this.isPointInsideSelection(pos)) {
      this.startDrag(pos);
    } else {
      this.startLasso(pos);
    }
  }

  update(pos) {
    if (this.mode === this.MODE_DRAWING) {
      this.drawLasso(pos);
    }

    if (this.mode === this.MODE_DRAGGING && this.isDragging) {
      this.drag(pos);
    }
  }

  end() {
    if (this.mode === this.MODE_DRAWING) {
      this.commitSelection();
      return;
    }

    if (this.mode === this.MODE_DRAGGING && this.isDragging) {
      this.commitDrag();
    }
  }

  /* ---------------- lasso ---------------- */

  startLasso(pos) {
    this.reset();
    this.mode = this.MODE_DRAWING;
    this.polygon = [pos];

    this.lassoCtx.beginPath();
    this.lassoCtx.moveTo(pos.x, pos.y);
  }

  drawLasso(pos) {
    const last = this.polygon.at(-1);
    if (!last || Math.hypot(pos.x - last.x, pos.y - last.y) > 2) {
      this.polygon.push(pos);
      this.lassoCtx.lineTo(pos.x, pos.y);
      this.lassoCtx.stroke();

      this.redraw();
    }
  }

  /* ---------------- selection cut ---------------- */

  commitSelection() {
    if (this.polygon.length < 3) {
      this.reset();
      return;
    }

    const box = this.boundingBox();
    const { x, y, w, h } = box;

    // Grab the original image data from the main canvas
    const src = this.ctx.getImageData(x, y, w, h);

    // Create a new offscreen canvas for the selected blob (initially transparent)
    const off = document.createElement("canvas");
    off.width = w;
    off.height = h;
    const offCtx = off.getContext("2d");

    // Create ImageData for the selected pixels only
    const selectedData = offCtx.createImageData(w, h);

    // Copy only pixels inside the polygon to selectedData
    for (let py = 0; py < h; py++) {
      for (let px = 0; px < w; px++) {
        const gx = x + px;
        const gy = y + py;

        if (this.pointInPolygon(gx, gy, this.polygon)) {
          const i = (py * w + px) * 4;
          selectedData.data.set(src.data.slice(i, i + 4), i);
        } else {
          // Explicitly set non-selected pixels to fully transparent
          const i = (py * w + px) * 4;
          selectedData.data[i + 3] = 0; // alpha = 0
        }
      }
    }

    // Put the masked selection onto the offscreen canvas
    offCtx.putImageData(selectedData, 0, 0);

    // Now erase ONLY the selected pixels from the main canvas
    // (by drawing the original but with selected pixels made transparent)
    const maskData = src.data.slice(); // copy original
    for (let py = 0; py < h; py++) {
      for (let px = 0; px < w; px++) {
        const gx = x + px;
        const gy = y + py;
        if (this.pointInPolygon(gx, gy, this.polygon)) {
          const i = (py * w + px) * 4;
          maskData[i + 3] = 0; // make selected pixels transparent
        }
      }
    }
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = w;
    tempCanvas.height = h;
    tempCanvas
      .getContext("2d")
      .putImageData(new ImageData(maskData, w, h), 0, 0);
    this.ctx.drawImage(tempCanvas, x, y);

    // Store the selected blob (now with transparent background)
    this.selectedBlob = { canvas: off, x, y, w, h };
    this.mode = this.MODE_DRAGGING;

    // Clear lasso UI and draw initial drag position
    this.clearBuffers();
    this.dragCtx.drawImage(off, x, y);
    this.redraw();
  }
  /* ---------------- dragging ---------------- */

  startDrag(pos) {
    this.isDragging = true;

    this.offsetX = pos.x - this.selectedBlob.x;
    this.offsetY = pos.y - this.selectedBlob.y;

    // draw initial drag frame immediately
    this.drag(pos);
  }
  drag(pos) {
    this.selectedBlob.x = pos.x - this.offsetX;
    this.selectedBlob.y = pos.y - this.offsetY;

    this.dragCtx.clearRect(0, 0, this.dragCanvas.width, this.dragCanvas.height);
    this.lassoCtx.clearRect(
      0,
      0,
      this.lassoCanvas.width,
      this.lassoCanvas.height,
    );
    this.dragCtx.drawImage(
      this.selectedBlob.canvas,
      this.selectedBlob.x,
      this.selectedBlob.y,
    );

    this.redraw();
  }

  commitDrag() {
    this.ctx.drawImage(
      this.selectedBlob.canvas,
      this.selectedBlob.x,
      this.selectedBlob.y,
    );

    this.isDragging = false;
    this.reset();
    this.redraw();
    this.clearBuffers(); // ensures no leftover UI after commit
  }

  /* ---------------- rendering ---------------- */
  redraw() {
    // Save the current main canvas state
    const mainImageData = this.ctx.getImageData(
      0,
      0,
      this.canvas.width,
      this.canvas.height,
    );

    // Clear main canvas temporarily
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Redraw the clean main content (will be restored later)
    // But we don't need to — we'll restore from saved data

    // Draw UI overlays
    this.ctx.drawImage(this.lassoCanvas, 0, 0);
    this.ctx.drawImage(this.dragCanvas, 0, 0);

    // Restore the clean main content on top? No — wrong order.

    // CORRECT ORDER: content first, then overlays
    this.ctx.putImageData(mainImageData, 0, 0); // restore clean content
    this.ctx.drawImage(this.lassoCanvas, 0, 0); // lasso on top
    this.ctx.drawImage(this.dragCanvas, 0, 0); // drag preview on top
  } /* ---------------- geometry ---------------- */

  boundingBox() {
    const xs = this.polygon.map((p) => p.x);
    const ys = this.polygon.map((p) => p.y);

    const minX = Math.min(...xs) - this.padding;
    const minY = Math.min(...ys) - this.padding;
    const maxX = Math.max(...xs) + this.padding;
    const maxY = Math.max(...ys) + this.padding;

    return { x: minX, y: minY, w: maxX - minX, h: maxY - minY };
  }

  pointInPolygon(x, y, poly) {
    let inside = false;
    for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
      const xi = poly[i].x,
        yi = poly[i].y;
      const xj = poly[j].x,
        yj = poly[j].y;

      const hit =
        yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;

      if (hit) inside = !inside;
    }
    return inside;
  }

  isPointInsideSelection(pos) {
    const b = this.selectedBlob;
    return (
      pos.x >= b.x && pos.x <= b.x + b.w && pos.y >= b.y && pos.y <= b.y + b.h
    );
  }
}
