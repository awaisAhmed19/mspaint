import React from "react";
import { createCanvasEngine } from "./Engine/canvasEngine";
import CanvasController from "./Engine/canvasController";
import { createTool, TOOLS } from "./Engine/toolFactory";

function getPos(e, canvas) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: Math.floor(e.clientX - rect.left),
    y: Math.floor(e.clientY - rect.top),
  };
}

export default class Canvas extends React.Component {
  constructor(props) {
    super(props);

    /* ---------- refs ---------- */
    this.canvasRef = React.createRef();
    this.canvasContainerRef = React.createRef();
    this.overlayRef = React.createRef();

    /* ---------- resize buffers ---------- */
    this.bufferCanvas = document.createElement("canvas");
    this.bufferCtx = this.bufferCanvas.getContext("2d");

    /* ---------- engine & controller ---------- */
    this.engine = null;
    this.controller = null;

    /* ---------- resize ---------- */
    this.isResizing = false;
    this.currentHandle = null;

    /* ---------- local UI state ---------- */
    this.state = {
      width: 800,
      height: 500,
    };
  }

  componentDidMount() {
    if (typeof this.props.getState !== "function") {
      throw new Error("Canvas requires getState() prop");
    }
    const canvas = this.canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = this.state.width;
    canvas.height = this.state.height;

    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    /* ---------- create engine ---------- */
    this.engine = createCanvasEngine(canvas, this.overlayRef.current);

    /* ---------- notify App ---------- */
    this.props.onEngineReady?.(this.engine);

    /* ---------- controller uses App editorState ---------- */
    this.controller = new CanvasController(
      this.engine,
      null,
      this.props.getState, // 🔥 SINGLE SOURCE OF TRUTH
    );

    this.switchTool(this.props.tool);

    window.addEventListener("mousemove", this.resize);
    window.addEventListener("mouseup", this.stopResize);

    this.props.dim?.({
      WIDTH: canvas.width,
      HEIGHT: canvas.height,
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.tool !== this.props.tool) {
      this.switchTool(this.props.tool);
    }

    // Sync UI → editorState
    if (prevProps.color !== this.props.color) {
      this.props.getState().color = this.props.color;
    }

    if (prevProps.toolConfig !== this.props.toolConfig) {
      Object.assign(this.props.getState(), this.props.toolConfig || {});
    }
  }

  componentWillUnmount() {
    window.removeEventListener("mousemove", this.resize);
    window.removeEventListener("mouseup", this.stopResize);
  }

  /* ---------- tools ---------- */

  switchTool(toolKey) {
    if (!this.controller) return;

    const { tool, renderer } = createTool(toolKey, this.canvasRef.current);
    this.controller.setRenderer(renderer);
    this.controller.setTool(tool);

    console.log("Tool switched →", toolKey, TOOLS[toolKey]);
  }

  /* ---------- pointer ---------- */

  handlePointerDown = (e) => {
    const pos = getPos(e, this.canvasRef.current);
    this.controller?.pointerDown(pos);
    this.props.coord?.(pos);
  };

  handlePointerMove = (e) => {
    const pos = getPos(e, this.canvasRef.current);
    this.controller?.pointerMove(pos);
    this.props.coord?.(pos);
  };

  handlePointerUp = (e) => {
    const pos = e
      ? getPos(e, this.canvasRef.current)
      : this.controller?.lastPos;

    this.controller?.pointerUp(pos);
    this.props.clearCoord?.();
  };
  /* ---------- resizing ---------- */

  startResize = (e) => {
    e.preventDefault();
    this.isResizing = true;
    this.currentHandle = e.target;

    const canvas = this.canvasRef.current;
    this.bufferCanvas.width = canvas.width;
    this.bufferCanvas.height = canvas.height;
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

    canvas.width = w;
    canvas.height = h;

    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, w, h);
    ctx.drawImage(this.bufferCanvas, 0, 0);

    this.props.dim?.({ WIDTH: w, HEIGHT: h });
  }

  render() {
    const bitmapView = this.props.viewBitmap;
    const zoomed = this.props.zoomed;
    return (
      <div
        className="canvasbackcontainer"
        style={
          zoomed || bitmapView
            ? {
                background: "#008080",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh",
              }
            : {}
        }
      >
        <div
          className="canvascontainer"
          ref={this.canvasContainerRef}
          style={{
            width: this.state.width,
            height: this.state.height,
            position: "relative",
            transform: zoomed ? "scale(2)" : "scale(1)",
            transformOrigin: "center center",
          }}
        >
          <canvas
            ref={this.canvasRef}
            className="canvas"
            style={{
              width: "100%",
              height: "100%",
            }}
            onPointerDown={this.handlePointerDown}
            onPointerMove={this.handlePointerMove}
            onPointerUp={this.handlePointerUp}
            onPointerLeave={() => this.props.clearCoord?.()}
          />

          {/* overlay stays aligned automatically */}
          <div
            ref={this.overlayRef}
            className="canvas-overlay"
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
            }}
          />

          {/* 🔒 disable resize handles when zoomed */}
          {!zoomed && (
            <>
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
            </>
          )}
        </div>
      </div>
    );
  }
}
