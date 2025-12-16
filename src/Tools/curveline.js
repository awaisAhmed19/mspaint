export class CurveLineTool {
  constructor(meta) {
    this.meta = meta;
  }

  // semantic state
  hasStart = false;
  isEditing = false;
  didDrag = false;

  /* ---------------- pointer down ---------------- */

  begin(ctx) {
    console.log("[CurveTool] begin", {
      hasStart: this.hasStart,
      isEditing: this.isEditing,
      pos: ctx.pos,
    });

    // 1️⃣ First click → place start
    if (!this.hasStart) {
      ctx.renderer.captureBase();
      ctx.renderer.setStart(ctx.pos, ctx.color, ctx.size);
      this.hasStart = true;
      return;
    }

    // 2️⃣ Second click → place end → enter edit mode
    if (this.hasStart && !this.isEditing) {
      ctx.renderer.setEnd(ctx.pos);
      this.isEditing = true;
      this.didDrag = false;
      return;
    }

    // 3️⃣ Editing mode → only selection intent
    // No commit-on-click here (ambiguous)
    if (this.isEditing && this.hasStart && this.didDrag) {
      if (ctx.renderer.hitAnyControlPoint(ctx.pos)) {
        console.log("[CurveTool] CP selected");
      }
      //todo: only commits after one control point is dragged ...
      //.needs to commit after both the control points are dragged and 3rd click is made out side the hitrange of the control point inidating commit
      this.commit(ctx);
    }
  }

  /* ---------------- pointer move ---------------- */

  update(ctx) {
    // Preview before end is fixed
    if (this.hasStart && !this.isEditing) {
      ctx.renderer.previewLine(ctx.pos);
      return;
    }

    // Drag control points
    if (this.isEditing) {
      ctx.renderer.dragControlPoint(ctx.pos);
      this.didDrag = true;
    }
  }

  /* ---------------- pointer up ---------------- */

  end(ctx) {
    if (!this.isEditing) return;
    ctx.renderer.stopDrag();
  }

  /* ---------------- termination ---------------- */

  commit(ctx) {
    console.log("[CurveTool] commit");

    this.resetState();
    ctx.renderer.commit();
  }

  cancel(ctx) {
    console.log("[CurveTool] cancel");

    this.resetState();
    ctx.renderer.cancel();
  }

  /* ---------------- helpers ---------------- */

  resetState() {
    this.hasStart = false;
    this.isEditing = false;
    this.didDrag = false;
  }
}
export class CurveLineRenderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");

    this.R = 10;
    this.bufferCanvas = document.createElement("canvas");
    this.bufferCtx = this.bufferCanvas.getContext("2d");

    this.bufferCanvas.width = canvas.width;
    this.bufferCanvas.height = canvas.height;

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
    this.start = pos;
    this.color = color;
    this.size = size;
  }

  setEnd(pos) {
    this.end = pos;
    this.computeDefaultCPs();
    this.drawPreview();
  }

  /* ---------- preview ---------- */

  previewLine(pos) {
    if (!this.start) return;
    this.end = pos;
    this.computeDefaultCPs();
    this.drawPreview();
  }

  hitAnyControlPoint(pos) {
    if (!this.cp1 || !this.cp2) return false;
    return this.hit(pos, this.cp1) || this.hit(pos, this.cp2);
  }

  drawPreview(debug = true) {
    if (!this.start || !this.end || !this.baseSnapshot) return;

    const w = this.canvas.width;
    const h = this.canvas.height;

    /* -------- rebuild buffer -------- */

    this.bufferCtx.clearRect(0, 0, w, h);
    this.bufferCtx.drawImage(this.baseSnapshot, 0, 0);

    // curve
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

    /* -------- debug overlays -------- */

    if (debug) {
      const ctx = this.bufferCtx;

      // start / end points
      ctx.fillStyle = "blue";
      ctx.beginPath();
      ctx.arc(this.start.x, this.start.y, 5, 0, Math.PI * 2);
      ctx.arc(this.end.x, this.end.y, 5, 0, Math.PI * 2);
      ctx.fill();

      // control points
      ctx.fillStyle = "red";
      ctx.beginPath();
      ctx.arc(this.cp1.x, this.cp1.y, 5, 0, Math.PI * 2);
      ctx.arc(this.cp2.x, this.cp2.y, 5, 0, Math.PI * 2);
      ctx.fill();

      // helper lines
      ctx.strokeStyle = "rgba(255,0,0,0.3)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(this.start.x, this.start.y);
      ctx.lineTo(this.cp1.x, this.cp1.y);
      ctx.moveTo(this.end.x, this.end.y);
      ctx.lineTo(this.cp2.x, this.cp2.y);
      ctx.stroke();
    }

    /* -------- present buffer -------- */

    this.ctx.clearRect(0, 0, w, h);
    this.ctx.drawImage(this.bufferCanvas, 0, 0);
  }

  /* ---------- control points ---------- */

  dragControlPoint(pos) {
    if (!this.cp1 || !this.cp2) return;

    if (!this.dragging) {
      if (this.hit(pos, this.cp1)) this.dragging = "cp1";
      else if (this.hit(pos, this.cp2)) this.dragging = "cp2";
      else return;
    }

    this[this.dragging].x = pos.x;
    this[this.dragging].y = pos.y;
    this.drawPreview();
  }

  stopDrag() {
    this.dragging = null;
  }

  hit(p, cp) {
    const dx = p.x - cp.x;
    const dy = p.y - cp.y;

    return dx * dx + dy * dy < this.R * this.R;
  }

  /* ---------- math ---------- */

  computeDefaultCPs() {
    if (!this.start || !this.end) return;

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
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.drawImage(this.baseSnapshot, 0, 0);
    this.reset();
  }

  reset() {
    this.start = null;
    this.end = null;
    this.cp1 = null;
    this.cp2 = null;
    this.dragging = null;
  }
}
