export class TextTool {
  constructor(meta) {
    this.meta = meta;
    this.editor = null;
    this.block = null;
  }

  begin(ctx) {
    const pos = ctx.pos;

    // hit-test existing text
    const hit = ctx.renderer.findTextAt(pos);
    if (hit) {
      this.startEditing(hit, ctx);
    } else {
      this.createBlock(pos, ctx);
    }
  }

  update() {} // intentionally empty
  end() {} // intentionally empty

  keyDown(key) {
    if (!this.editor) return;

    if (key === "Escape") {
      this.cancel();
    }
    if (key === "Enter") {
      this.commit();
    }
  }

  createBlock(pos, ctx) {
    this.block = {
      id: crypto.randomUUID(),
      x: pos.x,
      y: pos.y,
      text: "",
      fontSize: 16,
      fontFamily: "Arial",
      color: ctx.color,
    };

    ctx.renderer.addBlock(this.block);
    this.startEditing(this.block, ctx);
  }

  startEditing(block, ctx) {
    this.block = block;

    const el = document.createElement("textarea");
    el.value = block.text;

    Object.assign(el.style, {
      position: "absolute",
      left: `${block.x}px`,
      top: `${block.y}px`,
      font: `${block.fontSize}px ${block.fontFamily}`,
      color: block.color,
      background: "transparent",
      border: "1px dashed #0099ff",
      outline: "none",
      resize: "none",
      overflow: "hidden",
    });

    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        ctx.commit();
      }
      if (e.key === "Escape") {
        e.preventDefault();
        ctx.cancel();
      }
    });

    ctx.engine.overlay.appendChild(el);
    el.focus();

    this.editor = el;
  }

  commit(ctx) {
    if (!this.editor || !this.block) return;

    this.block.text = this.editor.value.trim();

    this.editor.remove();
    this.editor = null;
    this.block = null;

    ctx.engine.logUndo("Text");
    ctx.engine.redraw();
  }

  cancel(ctx) {
    if (this.block && !this.block.text) {
      ctx.renderer.removeBlock(this.block.id);
    }

    this.editor?.remove();
    this.editor = null;
    this.block = null;

    ctx.engine.redraw();
  }
}

export class TextRenderer {
  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.blocks = [];
  }

  addBlock(b) {
    this.blocks.push(b);
  }

  removeBlock(id) {
    this.blocks = this.blocks.filter((b) => b.id !== id);
  }

  render() {
    for (const b of this.blocks) {
      this.ctx.font = `${b.fontSize}px ${b.fontFamily}`;
      this.ctx.fillStyle = b.color;

      const lines = b.text.split("\n");
      const lh = b.fontSize * 1.2;

      lines.forEach((line, i) => {
        this.ctx.fillText(line, b.x, b.y + i * lh);
      });
    }
  }

  findTextAt(pos) {
    for (const b of [...this.blocks].reverse()) {
      this.ctx.font = `${b.fontSize}px ${b.fontFamily}`;

      const lines = b.text.split("\n");
      const width = Math.max(
        ...lines.map((l) => this.ctx.measureText(l).width),
        0,
      );
      const height = lines.length * b.fontSize * 1.2;

      if (
        pos.x >= b.x &&
        pos.x <= b.x + width &&
        pos.y >= b.y - b.fontSize &&
        pos.y <= b.y + height
      ) {
        return b;
      }
    }
    return null;
  }
}
