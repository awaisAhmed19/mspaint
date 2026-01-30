export class CurveLineTool {
  constructor(meta) {
    this.meta = meta;
    this.resetState();
  }

  resetState() {
    this.phase = "IDLE"; // IDLE | PLACING_END | EDITING
    this.draggedCP1 = false;
    this.draggedCP2 = false;
  }

  /* ---------- pointer down ---------- */

  begin(ctx) {
    if (this.phase === "IDLE") {
      ctx.renderer.captureBase();
      ctx.renderer.setStart(ctx.pos, ctx.color, ctx.size);
      this.phase = "PLACING_END";
      return;
    }

    if (this.phase === "PLACING_END") {
      ctx.renderer.setEnd(ctx.pos);
      this.phase = "EDITING";
      return;
    }
  }

  /* ---------- pointer move ---------- */

  update(ctx) {
    if (this.phase === "PLACING_END") {
      ctx.renderer.previewLine(ctx.pos);
      return;
    }

    if (this.phase === "EDITING") {
      const dragged = ctx.renderer.dragControlPoint(ctx.pos);
      if (dragged === "cp1") this.draggedCP1 = true;
      if (dragged === "cp2") this.draggedCP2 = true;
    }
  }

  /* ---------- pointer up ---------- */

  end(ctx) {
    if (this.phase !== "EDITING") return;

    ctx.renderer.stopDrag();

    if (this.draggedCP1 || this.draggedCP2) {
      this.commit(ctx);
    }
  }

  /* ---------- finalize ---------- */

  commit(ctx) {
    ctx.renderer.commit();
    this.resetState();
  }

  cancel(ctx) {
    ctx.renderer.cancel();
    this.resetState();
  }
}

/* ================= CurveLineRenderer ================= */

export class CurveLineRenderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");

    this.R = 10;
    this.MERGE_DIST = 12;

    this.bufferCanvas = document.createElement("canvas");
    this.bufferCtx = this.bufferCanvas.getContext("2d");
    this.bufferCanvas.width = canvas.width;
    this.bufferCanvas.height = canvas.height;

    this.reset();
  }

  reset() {
    this.baseSnapshot = null;
    this.start = null;
    this.end = null;
    this.cp1 = null;
    this.cp2 = null;
    this.dragging = null;
    this.color = "#000";
    this.size = 1;
  }

  /* ---------- setup ---------- */

  captureBase() {
    this.baseSnapshot = document.createElement("canvas");
    this.baseSnapshot.width = this.canvas.width;
    this.baseSnapshot.height = this.canvas.height;
    this.baseSnapshot.getContext("2d").drawImage(this.canvas, 0, 0);
  }

  setStart(pos, color, size) {
    this.start = { ...pos };
    this.color = color;
    this.size = size;
  }

  setEnd(pos) {
    this.end = { ...pos };
    this.computeDefaultCPs();
    this.drawPreview();
  }

  /* ---------- preview ---------- */

  previewLine(pos) {
    if (!this.start) return;
    this.end = { ...pos };
    this.computeDefaultCPs();
    this.drawPreview();
  }

  cpMerged() {
    if (!this.cp1 || !this.cp2) return false;
    const dx = this.cp1.x - this.cp2.x;
    const dy = this.cp1.y - this.cp2.y;
    return dx * dx + dy * dy < this.MERGE_DIST * this.MERGE_DIST;
  }

  hitAnyControlPoint(pos) {
    if (!this.cp1 || !this.cp2) return false;

    if (this.cpMerged()) {
      return this.hit(pos, this.cp1, this.R * 2);
    }

    return this.hit(pos, this.cp1) || this.hit(pos, this.cp2);
  }

  drawPreview() {
    if (!this.start || !this.end || !this.baseSnapshot) return;

    const w = this.canvas.width;
    const h = this.canvas.height;

    this.bufferCtx.clearRect(0, 0, w, h);
    this.bufferCtx.drawImage(this.baseSnapshot, 0, 0);

    this.bufferCtx.strokeStyle = this.color;
    this.bufferCtx.lineWidth = this.size;
    this.bufferCtx.lineCap = "round";

    this.bufferCtx.beginPath();
    this.bufferCtx.moveTo(this.start.x, this.start.y);
    this.bufferCtx.bezierCurveTo(
      this.cp1.x,
      this.cp1.y,
      this.cp2.x,
      this.cp2.y,
      this.end.x,
      this.end.y,
    );
    this.bufferCtx.stroke();

    this.drawDebug();

    this.ctx.clearRect(0, 0, w, h);
    this.ctx.drawImage(this.bufferCanvas, 0, 0);
  }

  drawDebug() {
    const ctx = this.bufferCtx;
    ctx.fillStyle = "red";
    ctx.beginPath();

    if (this.cpMerged()) {
      ctx.arc(this.cp1.x, this.cp1.y, 6, 0, Math.PI * 2);
    } else {
      ctx.arc(this.cp1.x, this.cp1.y, 5, 0, Math.PI * 2);
      ctx.arc(this.cp2.x, this.cp2.y, 5, 0, Math.PI * 2);
    }

    ctx.fill();
  }

  /* ---------- control points ---------- */

  dragControlPoint(pos) {
    if (!this.cp1 || !this.cp2) return null;

    if (this.cpMerged()) {
      this.cp1.x = pos.x;
      this.cp1.y = pos.y;
      this.cp2.x = pos.x;
      this.cp2.y = pos.y;
      this.drawPreview();
      return "merged";
    }

    if (!this.dragging) {
      if (this.hit(pos, this.cp1)) this.dragging = "cp1";
      else if (this.hit(pos, this.cp2)) this.dragging = "cp2";
      else return null;
    }

    this[this.dragging].x = pos.x;
    this[this.dragging].y = pos.y;
    this.drawPreview();
    return this.dragging;
  }

  stopDrag() {
    this.dragging = null;
  }

  hit(p, cp, r = this.R) {
    const dx = p.x - cp.x;
    const dy = p.y - cp.y;
    return dx * dx + dy * dy < r * r;
  }

  /* ---------- math ---------- */

  computeDefaultCPs() {
    const midX = (this.start.x + this.end.x) / 2;
    const midY = (this.start.y + this.end.y) / 2;

    this.cp1 = { x: (this.start.x + midX) / 2, y: (this.start.y + midY) / 2 };
    this.cp2 = { x: (this.end.x + midX) / 2, y: (this.end.y + midY) / 2 };
  }

  /* ---------- finalize ---------- */

  commit() {
    if (!this.start || !this.end) return;

    this.ctx.strokeStyle = this.color;
    this.ctx.lineWidth = this.size;
    this.ctx.lineCap = "round";

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

  cancel() {
    if (this.baseSnapshot) {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(this.baseSnapshot, 0, 0);
    }
    this.reset();
  }
}
