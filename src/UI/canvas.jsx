import React from "react";
import { createCanvasEngine } from "../Engine/canvasEngine";
import CanvasController from "../Engine/canvasController";
import { createTool, TOOLS } from "../Engine/toolFactory";

function getPos(e, canvas) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top,
  };
}

export default class Canvas extends React.Component {
  constructor(props) {
    super(props);

    /* ---------- refs ---------- */
    this.canvasRef = React.createRef();
    this.canvasContainerRef = React.createRef();
    this.overlayRef = React.createRef();

    /* ---------- engine ---------- */
    this.engine = null;
    this.controller = null;

    /* ---------- resize state ---------- */
    this.isResizing = false;
    this.currentHandle = null;

    /* ---------- state ---------- */
    this.state = {
      width: 500,
      height: 400,
      color: "blue",
      size: 1,
      type: 2,
      currentTool: "PENCIL",
    };

    /* ---------- live state bridge ---------- */
    this.stateRef = {
      color: "blue",
      size: 1,
      type: 2,
      setColor: (c) => this.setState({ color: c }),
    };
  }

  /* ---------- lifecycle ---------- */

  componentDidMount() {
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = this.state.width;
    canvas.height = this.state.height;

    this.fillBackground(ctx, canvas.width, canvas.height);

    this.engine = createCanvasEngine(canvas);
    this.controller = new CanvasController(
      this.engine,
      null,
      () => this.stateRef,
    );

    this.switchTool(this.state.currentTool);

    window.addEventListener("mousemove", this.resize);
    window.addEventListener("mouseup", this.stopResize);
  }

  componentWillUnmount() {
    window.removeEventListener("mousemove", this.resize);
    window.removeEventListener("mouseup", this.stopResize);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.color !== this.state.color ||
      prevState.size !== this.state.size ||
      prevState.type !== this.state.type
    ) {
      Object.assign(this.stateRef, this.state);
    }

    if (prevState.currentTool !== this.state.currentTool) {
      this.switchTool(this.state.currentTool);
    }
  }

  /* ---------- helpers ---------- */

  fillBackground(ctx, w, h) {
    ctx.save();
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, w, h);
    ctx.restore();
  }

  /* ---------- tool switching ---------- */

  switchTool(toolKey) {
    if (!this.controller) return;
    const { tool, renderer } = createTool(toolKey, this.canvasRef.current);
    this.controller.setRenderer(renderer);
    this.controller.setTool(tool);
  }

  /* ---------- pointer events ---------- */

  handlePointerDown = (e) =>
    this.controller?.pointerDown(getPos(e, this.canvasRef.current));

  handlePointerMove = (e) =>
    this.controller?.pointerMove(getPos(e, this.canvasRef.current));

  handlePointerUp = (e) =>
    this.controller?.pointerUp(getPos(e, this.canvasRef.current));

  /* ---------- resizing ---------- */

  startResize = (e) => {
    e.preventDefault();
    this.isResizing = true;
    this.currentHandle = e.target;
  };

  resize = (e) => {
    if (!this.isResizing) return;

    const container = this.canvasContainerRef.current;
    const rect = container.getBoundingClientRect();

    let w = container.clientWidth;
    let h = container.clientHeight;

    if (this.currentHandle.classList.contains("right")) {
      w = Math.max(100, e.clientX - rect.left);
    }

    if (this.currentHandle.classList.contains("bottom")) {
      h = Math.max(100, e.clientY - rect.top);
    }

    if (this.currentHandle.classList.contains("corner")) {
      w = Math.max(100, e.clientX - rect.left);
      h = Math.max(100, e.clientY - rect.top);
    }

    // update DOM size
    container.style.width = `${w}px`;
    container.style.height = `${h}px`;

    // update canvas bitmap
    this.resizeCanvas(w, h);

    // keep React state in sync (important)
    this.setState({ width: w, height: h });
  };

  stopResize = () => {
    this.isResizing = false;
    this.currentHandle = null;
  };

  resizeCanvas(w, h) {
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext("2d");

    // snapshot old content
    const buffer = document.createElement("canvas");
    buffer.width = canvas.width;
    buffer.height = canvas.height;
    buffer.getContext("2d").drawImage(canvas, 0, 0);

    // resize clears canvas
    canvas.width = w;
    canvas.height = h;

    // repaint background
    this.fillBackground(ctx, w, h);

    // restore old drawing
    ctx.drawImage(buffer, 0, 0);
  }

  /* ---------- render ---------- */

  render() {
    return (
      <div className="canvasbackcontainer">
        <div
          ref={this.canvasContainerRef}
          className="canvascontainer"
          style={{
            width: this.state.width,
            height: this.state.height,
            background: "#ffffff",
            position: "relative",
          }}
        >
          <canvas
            ref={this.canvasRef}
            style={{ width: "100%", height: "100%", display: "block" }}
            onPointerDown={this.handlePointerDown}
            onPointerMove={this.handlePointerMove}
            onPointerUp={this.handlePointerUp}
          />

          <div ref={this.overlayRef} className="overlay" />

          {/* resize handles */}
          <img
            src="../../imgs/point.png"
            className="resize-handle right"
            onMouseDown={this.startResize}
          />
          <img
            src="../../imgs/point.png"
            className="resize-handle bottom"
            onMouseDown={this.startResize}
          />
          <img
            src="../../imgs/point.png"
            className="resize-handle corner"
            onMouseDown={this.startResize}
          />
        </div>
      </div>
    );
  }
}
