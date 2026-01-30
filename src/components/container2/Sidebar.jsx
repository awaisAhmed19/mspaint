import React from "react";
import {
  AirBrushOptions,
  BrushOptions,
  CurveLineOptions,
  EllipseOptions,
  EraserOptions,
  LineOptions,
  MagnificationOptions,
  PolygonOptions,
  RectElipseOptions,
  RectShapeOptions,
} from "./ToolOptions.jsx";

class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      floating: false,
      dragging: false,
      startMouse: { x: 0, y: 0 },
      startPos: { x: 0, y: 0 },
      position: { x: 0, y: 0 },
      currTool: "PENCIL",
      holdTimeout: null,
    };

    this.TOOL_OPTIONS = {
      AIRBRUSH: AirBrushOptions,
      BRUSH: BrushOptions,
      CURVELINE: CurveLineOptions,
      ELLIPSE: EllipseOptions,
      RECT: RectShapeOptions,
      ERASER: EraserOptions,
      LINE: LineOptions,
      MAGNIFY: MagnificationOptions,
      POLYGON: PolygonOptions,
      RECTELLIPSE: RectElipseOptions,
    };

    this.TOOL_SELECTED_KEY = {
      PENCIL: "size",
      BRUSH: "size",
      AIRBRUSH: "size",
      ERASER: "size",
      LINE: "size",
      CURVELINE: "size",
      RECT: "mode",
      ELLIPSE: "mode",
      POLYGON: "mode",
      RECTELLIPSE: "mode",
      MAGNIFY: "zoom",
    };

    this.TOOLS = [
      { id: "rectlasso", tool: "RECTLASSO" },
      { id: "lasso", tool: "LASSO" },
      { id: "eraser", tool: "ERASER" },
      { id: "floodfill", tool: "FLOOD" },
      { id: "eyedrop", tool: "EYEDROP" },
      { id: "magnification", tool: "MAGNIFY" },
      { id: "pencil", tool: "PENCIL" },
      { id: "brush", tool: "BRUSH" },
      { id: "airbrush", tool: "AIRBRUSH" },
      { id: "text", tool: "TEXT" },
      { id: "line", tool: "LINE" },
      { id: "curveline", tool: "CURVELINE" },
      { id: "rectshape", tool: "RECT" },
      { id: "polygonshape", tool: "POLYGON" },
      { id: "ellipse", tool: "ELLIPSE" },
      { id: "rectelipse", tool: "RECTELLIPSE" },
    ];

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
    this.props.setFooter("For Help, click Help Topics on the Help Menu");
  };

  componentDidMount() {
    window.addEventListener("mousemove", this.onDrag);
    window.addEventListener("mouseup", this.stopDrag);
  }

  componentWillUnmount() {
    window.removeEventListener("mousemove", this.onDrag);
    window.removeEventListener("mouseup", this.stopDrag);
    clearTimeout(this.state.holdTimeout);
  }

  startHoldToDetach = (e) => {
    clearTimeout(this.state.holdTimeout);
    if (e.target.closest(".toolbar")) return;

    const holdTimeout = setTimeout(() => {
      this.setState({ floating: true, dragging: true });
    }, 700);

    this.setState({
      holdTimeout,
      startMouse: { x: e.clientX, y: e.clientY },
      startPos: { ...this.state.position },
    });
  };

  onDrag = (e) => {
    if (!this.state.dragging) return;

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
    this.setState({ dragging: false, holdTimeout: null });
  };

  render() {
    const OptionPanel = this.TOOL_OPTIONS[this.state.currTool];
    const cfg = this.props.currConfig || {};
    const key = this.TOOL_SELECTED_KEY[this.state.currTool];
    const selected = key ? cfg[key] : undefined;

    // {
    //   this.TOOLS.map(({ id, tool }) => {
    //     console.log("BTN", { id, tool, currTool: this.state.currTool });
    //
    //     return (
    //       <button
    //         key={id}
    //         id={id}
    //         className={`tools ${this.props.tool === tool ? "pressed" : ""}`}
    //         onMouseEnter={this.handleEnter}
    //         onMouseLeave={this.handleLeave}
    //         onClick={() => this.props.setTool(tool)}
    //       />
    //     );
    //   });
    // }
    return (
      <div
        ref={this.sidebarRef}
        className={this.state.floating ? "sidebar floating" : "sidebar"}
        style={{
          position: this.state.floating ? "absolute" : "relative",
          left: this.state.floating ? this.state.position.x : 0,
          top: this.state.floating ? this.state.position.y : 0,
          cursor: this.state.floating
            ? this.state.dragging
              ? "grabbing"
              : "grab"
            : "default",
        }}
        onMouseDown={this.startHoldToDetach}
      >
        <div className="toolbar">
          {this.TOOLS.map(({ id, tool }) => (
            <button
              key={id}
              id={id}
              className={`tools ${this.state.currTool === tool ? "pressed" : ""}`}
              onMouseEnter={this.handleEnter}
              onMouseLeave={this.handleLeave}
              onClick={() => {
                this.state.currTool = tool;
                this.props.setTool(tool);
              }}
            />
          ))}
        </div>

        <div className="optionWindow">
          {OptionPanel && (
            <OptionPanel
              selected={selected}
              onSelect={this.props.onToolConfigChange}
            />
          )}
        </div>
      </div>
    );
  }
}

export default Sidebar;
