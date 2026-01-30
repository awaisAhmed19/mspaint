export class TextTool {
  constructor(meta) {
    this.meta = meta;
    this.editor = null;
    this.block = null;
    console.log("[TextTool] constructed", meta);
  }

  begin(ctx) {
    console.log("[TextTool] begin", ctx.pos);

    const hit = ctx.renderer.findTextAt(ctx.pos);
    console.log("[TextTool] hit test:", hit);

    if (hit) {
      this.startEditing(hit, ctx);
    } else {
      this.createBlock(ctx.pos, ctx);
    }
  }

  update(ctx) {
    console.log("[TextTool] update", ctx.pos);
  }

  end(ctx) {
    console.log("[TextTool] end");
  }

  keyDown(key) {
    console.log("[TextTool] keyDown:", key);
    if (!this.editor) return;

    if (key === "Escape") this.cancel();
    if (key === "Enter") this.commit();
  }

  createBlock(pos, ctx) {
    console.log("[TextTool] createBlock", pos);

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
    console.log("[TextTool] startEditing", block);
    console.log("[TextTool] engine.overlay =", ctx.engine.overlay);

    if (!ctx.engine.overlay) {
      console.error("[TextTool] ❌ overlay missing on engine");
      return;
    }

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
      pointerEvents: "auto",
    });

    el.addEventListener("keydown", (e) => {
      console.log("[TextTool] textarea key:", e.key);

      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        this.commit(ctx);
      }
      if (e.key === "Escape") {
        e.preventDefault();
        this.cancel(ctx);
      }
    });

    ctx.engine.overlay.style.pointerEvents = "auto";
    ctx.engine.overlay.appendChild(el);

    el.focus();

    this.editor = el;
    console.log("[TextTool] editor attached");
  }

  commit(ctx) {
    console.log("[TextTool] commit");

    if (!this.editor || !this.block) return;

    this.block.text = this.editor.value.trim();

    this.editor.remove();
    this.editor = null;
    this.block = null;

    ctx.renderer.render();
    ctx.engine.overlay.style.pointerEvents = "none";
    console.log("[TextTool] commit done");
  }

  cancel(ctx) {
    console.log("[TextTool] cancel");

    if (this.block && !this.block.text) {
      ctx.renderer.removeBlock(this.block.id);
    }

    this.editor?.remove();
    this.editor = null;
    this.block = null;

    ctx.engine.overlay.style.pointerEvents = "none";

    ctx.renderer.render();
  }
}
export class TextRenderer {
  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.blocks = [];
    console.log("[TextRenderer] constructed");
  }

  addBlock(b) {
    console.log("[TextRenderer] addBlock", b);
    this.blocks.push(b);
  }

  removeBlock(id) {
    console.log("[TextRenderer] removeBlock", id);
    this.blocks = this.blocks.filter((b) => b.id !== id);
  }

  render() {
    console.log("[TextRenderer] render", this.blocks.length);

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
    console.log("[TextRenderer] findTextAt", pos);

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
        console.log("[TextRenderer] HIT", b);
        return b;
      }
    }

    console.log("[TextRenderer] miss");
    return null;
  }
}
