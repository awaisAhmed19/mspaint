export default class FloodFill {
  constructor(canvas, ctx, options = {}, manager) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.manager = manager;

    this.currentColor = manager.getFillColor?.() || [0, 0, 0, 255];

    this.cursorUrl = "/static/cursors/fill-bucket.png";
    this.hotspotX = 15;
    this.hotspotY = 15;
  }

  onActivate() {
    this.canvas.style.cursor = `url(${this.cursorUrl}) ${this.hotspotX} ${this.hotspotY}, auto`;
  }

  onDeactivate() {
    this.canvas.style.cursor = "default";
  }

  onStart(e) {
    const pos = this.manager.getMousePos(e);

    this.floodFill(
      Math.floor(pos.x),
      Math.floor(pos.y),
      this.currentColor,
      10, // tolerance
    );

    this.manager.logUndo?.("FloodFill");
    this.manager.redraw?.();
  }

  onDraw() {}
  onStop() {}
  renderOverlay() {}

  // ───────────────────────────────────────────
  // Flood Fill Implementation
  // ───────────────────────────────────────────

  floodFill(x, y, fillColor, range = 1) {
    const ctx = this.ctx;
    const imageData = ctx.getImageData(
      0,
      0,
      ctx.canvas.width,
      ctx.canvas.height,
    );

    const width = imageData.width;
    const height = imageData.height;

    const visited = new Uint8Array(width * height);
    const stack = [[x, y]];

    const targetColor = this.getPixel(imageData, x, y);
    const rangeSq = range * range;

    while (stack.length > 0) {
      const [cx, cy] = stack.pop();

      if (
        cx >= 0 &&
        cx < width &&
        cy >= 0 &&
        cy < height &&
        !visited[cy * width + cx] &&
        this.colorsMatch(this.getPixel(imageData, cx, cy), targetColor, rangeSq)
      ) {
        this.setPixel(imageData, cx, cy, fillColor);
        visited[cy * width + cx] = 1;

        stack.push([cx + 1, cy]);
        stack.push([cx - 1, cy]);
        stack.push([cx, cy + 1]);
        stack.push([cx, cy - 1]);
      }
    }

    ctx.putImageData(imageData, 0, 0);
  }

  getPixel(imageData, x, y) {
    const offset = (y * imageData.width + x) * 4;
    return [
      imageData.data[offset],
      imageData.data[offset + 1],
      imageData.data[offset + 2],
      imageData.data[offset + 3],
    ];
  }

  setPixel(imageData, x, y, color) {
    const offset = (y * imageData.width + x) * 4;
    imageData.data[offset] = color[0];
    imageData.data[offset + 1] = color[1];
    imageData.data[offset + 2] = color[2];
    imageData.data[offset + 3] = color[3];
  }

  colorsMatch(a, b, rangeSq) {
    const dr = a[0] - b[0];
    const dg = a[1] - b[1];
    const db = a[2] - b[2];
    const da = a[3] - b[3];
    return dr * dr + dg * dg + db * db + da * da < rangeSq;
  }

  setColor(rgba) {
    this.currentColor = rgba;
  }
}
