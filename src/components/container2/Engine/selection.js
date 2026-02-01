export default class SelectionScope {
  constructor(engine) {
    this.engine = engine;
    this.rect = null; // { x, y, w, h }
  }

  selectRect(rect) {
    this.rect = rect;
  }

  clear() {
    this.rect = null;
  }

  selectAll() {
    const { width, height } = this.engine.ctx.canvas;
    this.rect = { x: 0, y: 0, w: width, h: height };
  }

  getImageData() {
    if (!this.rect) return null;
    const { x, y, w, h } = this.rect;
    return this.engine.ctx.getImageData(x, y, w, h);
  }

  cut() {
    if (!this.rect) return;
    const data = this.getImageData();
    this.engine.ctx.clearRect(
      this.rect.x,
      this.rect.y,
      this.rect.w,
      this.rect.h,
    );
    this.clear();
    return data;
  }

  copy() {
    return this.getImageData();
  }

  paste(imageData, x = 0, y = 0) {
    if (!imageData) return;
    this.engine.ctx.putImageData(imageData, x, y);
  }
}
