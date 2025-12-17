import React from "react";
import { AirBrushOptions } from "./AirBrush.jsx";
import { BrushOptions } from "./Brush.jsx";
import { CurveLineOptions } from "./CurveLine.jsx";
import { EllipseOptions } from "./Ellipse.jsx";
import { EraserOptions } from "./Eraser.jsx";
import { LineOptions } from "./Line.jsx";
import { MagnificationOptions } from "./Magnification.jsx";
import { PolygonOptions } from "./PolygonShape.jsx";
import { RectElipseOptions } from "./RectElipse.jsx";
import { RectShapeOptions } from "./RectShape.jsx";
class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      floating: false,
      dragging: false,
      startMouse: { x: 0, y: 0 },
      startPos: { x: 0, y: 0 },
      position: { x: 0, y: 0 },
      currTool: "pencil",
      prevTool: "pencil",
    };
    this.TOOL_OPTIONS = {
      airbrush: AirBrushOptions,
      brush: BrushOptions,
      curveline: CurveLineOptions,
      ellipse: EllipseOptions,
      eraser: EraserOptions,
      line: LineOptions,
      magnification: MagnificationOptions,
      polygonshape: PolygonOptions,
      rectelipse: RectElipseOptions,
    };
    this.Toolsfootnote = {
      lasso: "Selects a free-form of the picture to move, copy, or edit.",
      rectlasso:
        "Selects a rectanglar part of the picture to move, copy or edit.",
      eraser:
        "Erases a portion of the picture, using the selected eraser shape.",
      floodfill: "Fills an area with the selected drawing color",
      eyedrop: "Picks up a color from the picture for drawing",
      magnification: "Changes the magnification",
      pencil: "Draws a free-form one pixel wide",
      brush: "Draws using a brush with the selected shape and size",
      airbrush: "Draws using an airbrush of the selected size",
      text: "Inserts text into the picture",
      line: "Draws a straight line with the selected line width",
      curveline: "Draws a curved line with the selected line width",
      rectshape: "Draws a rectangle with the selected fill style",
      polygonshape: "Draws a polygon with the selected fill style",
      ellipse: "Draws an ellipse with the selected fill style",
      rectelipse: "Draws a rounded rectangle with the selected fill style",
    };
    this.sidebarRef = React.createRef();
  }

  handleEnter = (e) => {
    const id = e.currentTarget.id;
    if (this.Toolsfootnote[id]) {
      this.props.setFooter(this.Toolsfootnote[id]);
    }
  };

  handleLeave = () => {
    this.props.clearFooter();
  };

  componentDidMount() {
    window.addEventListener("mousemove", this.onDrag);
    window.addEventListener("mouseup", this.stopDrag);
  }

  componentWillUnmount() {
    window.removeEventListener("mousemove", this.onDrag);
    window.removeEventListener("mouseup", this.stopDrag);
  }

  startHoldToDetach = (e) => {
    if (e.target.closest(".toolbar")) return;

    const timeout = setTimeout(() => {
      this.setState({ floating: true, dragging: true });
    }, 700);

    this.setState({
      holdTimeout: timeout,
      startMouse: { x: e.clientX, y: e.clientY },
      startPos: { ...this.state.position },
    });
  };

  onDrag = (e) => {
    if (!this.state.floating || !this.state.dragging) return;

    const dx = e.clientX - this.state.startMouse.x;
    const dy = e.clientY - this.state.startMouse.y;

    this.setState({
      position: {
        x: this.state.startPos.x + dx,
        y: this.state.startPos.y + dy,
      },
    });
  };

  stopDrag = () => {
    clearTimeout(this.state.holdTimeout);
    if (!this.state.floating) return;

    this.setState({ dragging: false });
  };

  render() {
    const OptionPanel = this.TOOL_OPTIONS[this.state.currTool];

    return (
      <>
        <div
          ref={this.sidebarRef}
          className={this.state.floating ? "sidebar floating" : "sidebar"}
          style={{
            position: this.state.floating ? "absolute" : "relative",
            left: this.state.floating ? this.state.position.x : 0,
            top: this.state.floating ? this.state.position.y : 0,
            cursor: this.state.floating ? "grab" : "default",
          }}
          onMouseDown={this.startHoldToDetach}
        >
          {" "}
          <div className="toolbar">
            <button
              className="tools"
              id="rectlasso"
              onMouseEnter={this.handleEnter}
              onClick={() => this.setState({ currTool: "rectlasso" })}
              onMouseLeave={this.handleLeave}
            ></button>
            <button
              className="tools"
              id="lasso"
              onMouseEnter={this.handleEnter}
              onClick={() => this.setState({ currTool: "lasso" })}
              onMouseLeave={this.handleLeave}
            ></button>
            <button
              className="tools"
              id="eraser"
              onMouseEnter={this.handleEnter}
              onClick={() => this.setState({ currTool: "eraser" })}
              onMouseLeave={this.handleLeave}
            ></button>
            <button
              className="tools"
              id="floodfill"
              onMouseEnter={this.handleEnter}
              onClick={() => this.setState({ currTool: "floodfill" })}
              onMouseLeave={this.handleLeave}
            ></button>
            <button
              className="tools"
              id="eyedrop"
              onMouseEnter={this.handleEnter}
              onClick={() => this.setState({ currTool: "eyedrop" })}
              onMouseLeave={this.handleLeave}
            ></button>
            <button
              className="tools"
              id="magnification"
              onMouseEnter={this.handleEnter}
              onClick={() => this.setState({ currTool: "magnification" })}
              onMouseLeave={this.handleLeave}
            ></button>
            <button
              className="tools"
              id="pencil"
              onMouseEnter={this.handleEnter}
              onClick={() => this.setState({ currTool: "pencil" })}
              onMouseLeave={this.handleLeave}
            ></button>
            <button
              className="tools"
              id="brush"
              onMouseEnter={this.handleEnter}
              onClick={() => this.setState({ currTool: "brush" })}
              onMouseLeave={this.handleLeave}
            ></button>
            <button
              className="tools"
              id="airbrush"
              onMouseEnter={this.handleEnter}
              onClick={() => this.setState({ currTool: "airbrush" })}
              onMouseLeave={this.handleLeave}
            ></button>
            <button
              className="tools"
              id="text"
              onMouseEnter={this.handleEnter}
              onClick={() => this.setState({ currTool: "text" })}
              onMouseLeave={this.handleLeave}
            ></button>
            <button
              className="tools"
              id="line"
              onMouseEnter={this.handleEnter}
              onClick={() => this.setState({ currTool: "line" })}
              onMouseLeave={this.handleLeave}
            ></button>
            <button
              className="tools"
              id="curveline"
              onMouseEnter={this.handleEnter}
              onClick={() => this.setState({ currTool: "curveline" })}
              onMouseLeave={this.handleLeave}
            ></button>
            <button
              className="tools"
              id="rectshape"
              onMouseEnter={this.handleEnter}
              onClick={() => this.setState({ currTool: "rectshape" })}
              onMouseLeave={this.handleLeave}
            ></button>
            <button
              className="tools"
              id="polygonshape"
              onMouseEnter={this.handleEnter}
              onClick={() => this.setState({ currTool: "polygonshape" })}
              onMouseLeave={this.handleLeave}
            ></button>
            <button
              className="tools"
              id="ellipse"
              onMouseEnter={this.handleEnter}
              onClick={() => this.setState({ currTool: "ellipse" })}
              onMouseLeave={this.handleLeave}
            ></button>
            <button
              className="tools"
              id="rectelipse"
              onMouseEnter={this.handleEnter}
              onClick={() => this.setState({ currTool: "rectelipse" })}
              onMouseLeave={this.handleLeave}
            ></button>
          </div>
          <div className="optionWindow">
            {OptionPanel && (
              <OptionPanel
                selected={this.props.currConfig?.size}
                onSelect={this.props.onToolConfigChange}
              />
            )}
          </div>
        </div>
      </>
    );
  }
}

export default Sidebar;
