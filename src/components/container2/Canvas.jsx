import React from "react";

class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.Width = this.props.Dim.WIDTH;
    this.Height = this.props.Dim.HEIGHT;
    this.canvasRef = React.createRef();
    this.canvasBufferRef = React.createRef();
    this.selectionRef = React.createRef();
  }
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
  }

  render() {
    return (
      <div className="canvasbackcontainer" id="canvas-back-container">
        <div
          className="canvascontainer"
          id="canvas-container"
          style={{
            width: this.Width,
            height: this.Height,
          }}
        >
          <canvas
            id="canvas"
            ref={this.canvasRef}
            className="canvas"
            style={{
              width: "100%",
              height: "100%",
              background: "white",
            }}
          />

          <canvas
            id="canvasbuffer"
            ref={this.canvasBufferRef}
            style={{
              display: "none",
              zIndex: 3,
              position: "inherit",
              top: "3px",
              left: "3px",
              width: "100%",
              height: "100%",
              border: "none",
            }}
          ></canvas>

          <canvas
            id="selectionbuffer"
            ref={this.selectionRef}
            style={{
              display: "none",
              position: "inherit",
              zIndex: 99,
              border: "none",
            }}
          ></canvas>

          <textarea id="textarea" className="hidden"></textarea>

          <img
            src="../../../imgs/point.png"
            className="resize-handle right"
            alt="right handle"
          />

          <img
            src="../../../imgs/point.png"
            className="resize-handle bottom"
            alt="bottom handle"
          />

          <img
            src="../../../imgs/point.png"
            className="resize-handle corner"
            alt="corner handle"
          />
        </div>
      </div>
    );
  }
}

export default Canvas;
