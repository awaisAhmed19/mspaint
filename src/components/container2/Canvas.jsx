import React from "react";
class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.Width = props.Dim.WIDTH;
    this.Height = props.Dim.HEIGHT;

    this.canvasContainerRef = React.createRef();
    this.canvasRef = React.createRef();
    this.canvasBufferRef = React.createRef();
    this.selectionRef = React.createRef();
    this.pos = { x: 0, y: 0 };
    this.isResizing = false;
    this.currentHandle = null;
  }
  getMousePos = (targetCanvas, e) => {
    const rect = targetCanvas.getBoundingClientRect();

    const x = Math.floor(
      (e.clientX - rect.left) * (targetCanvas.width / rect.width),
    );
    const y = Math.floor(
      (e.clientY - rect.top) * (targetCanvas.height / rect.height),
    );

    return { x, y };
  };

  componentDidMount() {
    this.ctx = this.canvasRef.current.getContext("2d");
    this.buf = this.canvasBufferRef.current.getContext("2d");
    this.sel = this.selectionRef.current.getContext("2d");

    this.canvasRef.current.width = this.Width;
    this.canvasRef.current.height = this.Height;

    this.canvasBufferRef.current.width = this.Width;
    this.canvasBufferRef.current.height = this.Height;

    this.selectionRef.current.width = this.Width;
    this.selectionRef.current.height = this.Height;

    window.addEventListener("mousemove", this.resize);
    window.addEventListener("mouseup", this.stopResize);

    this.canvasRef.current.addEventListener("mousemove", (e) => {
      const pos = this.getMousePos(this.canvasRef.current, e);
      this.props.coord(pos);
    });
    this.selectionRef.current.addEventListener("mousemove", (e) => {
      const pos = this.getMousePos(this.selectionRef.current, e);
      this.props.coord(pos);
    });
    this.canvasBufferRef.current.addEventListener("mousemove", (e) => {
      const pos = this.getMousePos(this.canvasBufferRef.current, e);
      this.props.coord(pos);
    });
  }

  componentDidUpdate(prevProps) {
    if (this.toolInstance && prevProps.toolConfig !== this.props.toolConfig) {
      this.toolInstance.updateOptions(this.props.toolConfig);
    }
  }
  componentWillUnmount() {
    window.removeEventListener("mousemove", this.resize);
    window.removeEventListener("mouseup", this.stopResize);
  }

  resizeCanvas = () => {
    const canvas = this.canvasRef.current;
    const buffer = this.canvasBufferRef.current;
    const container = this.canvasContainerRef.current;

    buffer.width = canvas.width;
    buffer.height = canvas.height;
    this.buf.drawImage(canvas, 0, 0);

    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    this.props.dim(canvas);
    this.ctx.drawImage(buffer, 0, 0);
  };

  startResize = (e) => {
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
      w = e.clientX - rect.left;
      if (w < 100) w = 100;
      container.style.width = `${w}px`;
    }

    if (this.currentHandle.classList.contains("bottom")) {
      h = e.clientY - rect.top;
      if (h < 100) h = 100;
      container.style.height = `${h}px`;
    }

    if (this.currentHandle.classList.contains("corner")) {
      w = e.clientX - rect.left;
      h = e.clientY - rect.top;
      if (w < 100) w = 100;
      if (h < 100) h = 100;
      container.style.width = `${w}px`;
      container.style.height = `${h}px`;
    }

    this.resizeCanvas();
  };

  stopResize = () => {
    this.isResizing = false;
    this.currentHandle = null;
  };

  render() {
    return (
      <div className="canvasbackcontainer">
        <div
          className="canvascontainer"
          ref={this.canvasContainerRef}
          style={{
            width: this.Width,
            height: this.Height,
          }}
        >
          <canvas
            ref={this.canvasRef}
            onMouseLeave={this.props.clearCoords}
            className="canvas"
            style={{ width: "100%", height: "100%", background: "white" }}
          />

          <canvas
            ref={this.canvasBufferRef}
            onMouseLeave={this.props.clearCoords}
            style={{ display: "none" }}
          ></canvas>

          <canvas
            ref={this.selectionRef}
            onMouseLeave={this.props.clearCoords}
            style={{ display: "none", zIndex: 99 }}
          ></canvas>

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

export default Canvas;
