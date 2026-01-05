import React from "react";
import { createCanvasEngine } from "./Engine/canvasEngine";
import CanvasController from "./Engine/canvasController";
import { createTool, TOOLS } from "./Engine/toolFactory";

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

    this.bufferCanvas = document.createElement("canvas");
    this.bufferCtx = this.bufferCanvas.getContext("2d");
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
      width: 800,
      height: 500,
      currentTool: "PENCIL",
      color: "black",
      size: 1,
      type: 2,
    };

    this.stateRef = {
      color: "black",
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

    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

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

  /* ---------- tool switching ---------- */

  switchTool(toolKey) {
    if (!this.controller) return;

    const { tool, renderer } = createTool(toolKey, this.canvasRef.current);
    this.controller.setRenderer(renderer);
    this.controller.setTool(tool);

    console.log("Tool switched →", toolKey, TOOLS[toolKey]);
  }

  /* ---------- pointer events ---------- */

  handlePointerDown = (e) => {
    this.controller?.pointerDown(getPos(e, this.canvasRef.current));
  };

  handlePointerMove = (e) => {
    this.controller?.pointerMove(getPos(e, this.canvasRef.current));
  };

  handlePointerUp = (e) => {
    this.controller?.pointerUp(getPos(e, this.canvasRef.current));
  };

  /* ---------- resizing ---------- */

  startResize = (e) => {
    e.preventDefault();
    this.isResizing = true;
    this.currentHandle = e.target;

    const canvas = this.canvasRef.current;

    // snapshot current drawing
    this.bufferCanvas.width = canvas.width;
    this.bufferCanvas.height = canvas.height;
    this.bufferCtx.clearRect(0, 0, canvas.width, canvas.height);
    this.bufferCtx.drawImage(canvas, 0, 0);
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

    container.style.width = `${w}px`;
    container.style.height = `${h}px`;

    this.resizeCanvas(w, h);
  };

  stopResize = () => {
    this.isResizing = false;
    this.currentHandle = null;
  };

  resizeCanvas(w, h) {
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext("2d");

    // resize clears canvas
    canvas.width = w;
    canvas.height = h;

    // repaint background
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, w, h);

    // restore previous drawing
    ctx.drawImage(this.bufferCanvas, 0, 0);
  }

  /* ---------- render ---------- */

  render() {
    return (
      <div className="canvasbackcontainer">
        <div
          className="canvascontainer"
          ref={this.canvasContainerRef}
          style={{
            width: this.state.width,
            height: this.state.height,
            position: "relative",
          }}
        >
          <canvas
            ref={this.canvasRef}
            className="canvas"
            style={{ width: "100%", height: "100%", background: "white" }}
            onPointerDown={this.handlePointerDown}
            onPointerMove={this.handlePointerMove}
            onPointerUp={this.handlePointerUp}
          />

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
