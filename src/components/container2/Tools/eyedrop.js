export class EyedropTool {
  constructor(meta) {
    this.meta = meta;
  }
  begin(ctx) {
    const picked = ctx.renderer.pick(ctx.pos);
    console.log("Color:", picked);
    ctx.setColor(picked);
  }

  update() {}
  end() {}
}

export class EyedropRenderer {
  constructor(canvas) {
    this.ctx = canvas.getContext("2d", {
      willReadFrequently: true,
    });
  }

  pick(pos) {
    const px = this.ctx.getImageData(
      Math.floor(pos.x),
      Math.floor(pos.y),
      1,
      1,
    ).data;

    return `rgb(${px[0]} ${px[1]} ${px[2]} / ${px[3] / 255})`;
  }
}
