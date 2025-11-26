export default class EyeDrop {
  constructor(canvas, ctx, options = {}, manager) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.manager = manager;

    this.cursorUrl = "../../imgs/eye-dropper.png";
    this.cursorHotspotX = 15;
    this.cursorHotspotY = 24;
  }

  onActivate() {
    this.canvas.style.cursor = `url(${this.cursorUrl}) ${this.cursorHotspotX} ${this.cursorHotspotY}, auto`;
  }

  onDeactivate() {
    this.canvas.style.cursor = "default";
  }

  updateOptions() {} // no config panel

  onStart(e) {
    const pos = this.manager.getMousePos(e);

    const x = pos.x - this.cursorHotspotX;
    const y = pos.y - this.cursorHotspotY;

    const px = this.ctx.getImageData(x, y, 1, 1).data;
    const color = `rgb(${px[0]} ${px[1]} ${px[2]} / ${px[3] / 255})`;

    this.manager.setColor?.(color);
    this.manager.setTool?.("brush"); // like MS Paint behavior
  }

  onDraw() {}
  onStop() {}
  renderOverlay() {}
}
