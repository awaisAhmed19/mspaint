// =========================
// AirBrush Tool Class Logic
// =========================

export default class AirBrush {
  constructor(canvas, ctx, options, manager) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.manager = manager;

    this.isDrawing = false;
    this.pos = null;

    // init settings
    this.airOpt = options.size || 1;
    this.currentColor = options.color || manager.color;

    this.airbrushSettings = {
      1: { density: 30, radius: 1 },
      2: { density: 30, radius: 2 },
      3: { density: 40, radius: 3 },
    };

    const cursorUrl = "/static/cursors/airbrushCursor.png";
    this.canvas.style.cursor = `url(${cursorUrl}) -45 -5, auto`;
  }

  updateOptions(opts) {
    if (opts.size !== undefined) this.airOpt = opts.size;
    if (opts.color !== undefined) this.currentColor = opts.color;
  }

  onStart(e) {
    this.isDrawing = true;
    this.pos = getMousePos(this.canvas, e);
    this.ctx.beginPath();
  }

  onDraw(e) {
    if (!this.isDrawing) return;

    let newPos = getMousePos(this.canvas, e);
    const { density, radius } =
      this.airbrushSettings[this.airOpt] || this.airbrushSettings[1];

    const dist = Math.sqrt(
      (newPos.x - this.pos.x) ** 2 + (newPos.y - this.pos.y) ** 2,
    );
    const step = Math.max(1 / dist, 0.05);

    for (let t = 0; t < 1; t += step) {
      const x = this.pos.x + (newPos.x - this.pos.x) * t;
      const y = this.pos.y + (newPos.y - this.pos.y) * t;

      for (let i = 0; i < density / 5; i++) {
        const angle = Math.random() * Math.PI * 2;
        const distance = radius * Math.random();

        this.ctx.beginPath();
        this.ctx.fillStyle = this.currentColor;
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

  onStop() {
    this.isDrawing = false;
    this.ctx.closePath();
  }
}

// =========================
// AirBrush Options JSX UI
// =========================

export function AirBrushOptions({ onSelect, selected }) {
  const sizes = [1, 2, 3];

  return (
    <div className="AirBrushOptions">
      {sizes.map((s) => (
        <button
          key={s}
          id={`AirB${s}px`}
          className={`airOptions ${selected === s ? "pressed" : ""}`}
          value={s}
          onClick={() => onSelect({ size: s })}
        />
      ))}
    </div>
  );
}
