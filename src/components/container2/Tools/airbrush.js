export class AirBrushTool {
  constructor(meta) {
    this.meta = meta;
  }
  begin(ctx) {
    ctx.renderer.beginStroke(ctx.pos, ctx.color, ctx.size);
  }

  update(ctx) {
    ctx.renderer.drawTo(ctx.pos);
  }

  end(ctx) {
    ctx.renderer.endStroke();
  }
}
export class AirBrushRenderer {
  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.pos = null;
    this.airOpt = null;
    this.airbrushSettings = {
      1: { density: 15, radius: 1 },
      2: { density: 15, radius: 2 },
      3: { density: 1, radius: 3 },
    };
  }

  beginStroke(pos, color, size) {
    console.log("stroke begin", pos);
    this.pos = pos;
    this.color = color;
    this.airOpt = size;
  }

  drawTo(pos) {
    let newPos = pos;
    const { density, radius } =
      this.airbrushSettings[this.airOpt] || this.airbrushSettings[1];

    const dist = Math.sqrt(
      (newPos.x - this.pos.x) ** 2 + (newPos.y - this.pos.y) ** 2,
    );

    const step = Math.min(0.2, 1 / Math.max(dist, 1));

    for (let t = 0; t < 1; t += step) {
      const x = this.pos.x + (newPos.x - this.pos.x) * t;
      const y = this.pos.y + (newPos.y - this.pos.y) * t;

      for (let i = 0; i < density / 10; i++) {
        const angle = Math.random() * Math.PI * 2;
        const distance = radius * Math.random();

        this.ctx.beginPath();
        this.ctx.fillStyle = this.color;
        this.ctx.arc(
          x + Math.cos(angle) * distance,
          y + Math.sin(angle) * distance,
          radius,
          0,
          Math.PI * 2,
        );
        this.ctx.fill();
      }
    }

    this.pos = newPos;
  }

  endStroke() {
    this.pos = null;
  }
}
