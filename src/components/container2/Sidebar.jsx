import React from "react";

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      floating: false,
      dragging: false,
      hold: false,
      startMouse: { x: 0, y: 0 },
      startPos: { x: 0, y: 0 },
      position: { x: 0, y: 0 },
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
    } else {
      console.warn("No footnote found for:", id);
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
    // don't drag while interacting with tools
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
    const { dragging, floating, startMouse, startPos } = this.state;

    if (!floating || !dragging) return;

    const dx = e.clientX - startMouse.x;
    const dy = e.clientY - startMouse.y;

    this.setState({
      position: {
        x: startPos.x + dx,
        y: startPos.y + dy,
      },
    });
  };

  stopDrag = () => {
    clearTimeout(this.state.holdTimeout);

    if (!this.state.floating) return;

    const { startMouse, position } = this.state;

    const movedX = Math.abs(position.x - startMouse.x);
    const movedY = Math.abs(position.y - startMouse.y);

    const snap = movedX < 40 && movedY < 40;

    if (snap) {
      this.setState({
        floating: false,
        dragging: false,
        position: { x: 30, y: 80 },
      });
    } else {
      this.setState({ dragging: false });
    }
  };

  render() {
    const { floating, position } = this.state;

    const sidebarClass = this.state.floating ? "sidebar floating" : "sidebar";
    return (
      <>
        <div
          ref={this.sidebarRef}
          className={sidebarClass}
          style={{
            position: this.state.floating ? "absolute" : "relative",
            left: this.state.floating ? this.state.position.x : 0,
            top: this.state.floating ? this.state.position.y : 0,
            cursor: this.state.floating ? "grab" : "default",
          }}
          onMouseDown={this.startHoldToDetach}
        >
          <div
            className="sidebar-floating-top"
            style={{ display: this.state.floating ? "flex" : "none" }}
          >
            Tools
            <button className="sidebar-close-button"></button>
          </div>

          <div className="toolbar">
            <button
              className="tools"
              id="rectlasso"
              onMouseEnter={this.handleEnter}
              onMouseLeave={this.handleLeave}
            ></button>
            <button
              className="tools"
              id="lasso"
              onMouseEnter={this.handleEnter}
              onMouseLeave={this.handleLeave}
            ></button>
            <button
              className="tools"
              id="eraser"
              onMouseEnter={this.handleEnter}
              onMouseLeave={this.handleLeave}
            ></button>
            <button
              className="tools"
              id="floodfill"
              onMouseEnter={this.handleEnter}
              onMouseLeave={this.handleLeave}
            ></button>
            <button
              className="tools"
              id="eyedrop"
              onMouseEnter={this.handleEnter}
              onMouseLeave={this.handleLeave}
            ></button>
            <button
              className="tools"
              id="magnification"
              onMouseEnter={this.handleEnter}
              onMouseLeave={this.handleLeave}
            ></button>
            <button
              className="tools"
              id="pencil"
              onMouseEnter={this.handleEnter}
              onMouseLeave={this.handleLeave}
            ></button>
            <button
              className="tools"
              id="brush"
              onMouseEnter={this.handleEnter}
              onMouseLeave={this.handleLeave}
            ></button>
            <button
              className="tools"
              id="airbrush"
              onMouseEnter={this.handleEnter}
              onMouseLeave={this.handleLeave}
            ></button>
            <button
              className="tools"
              id="text"
              onMouseEnter={this.handleEnter}
              onMouseLeave={this.handleLeave}
            ></button>
            <button
              className="tools"
              id="line"
              onMouseEnter={this.handleEnter}
              onMouseLeave={this.handleLeave}
            ></button>
            <button
              className="tools"
              id="curveline"
              onMouseEnter={this.handleEnter}
              onMouseLeave={this.handleLeave}
            ></button>
            <button
              className="tools"
              id="rectshape"
              onMouseEnter={this.handleEnter}
              onMouseLeave={this.handleLeave}
            ></button>
            <button
              className="tools"
              id="polygonshape"
              onMouseEnter={this.handleEnter}
              onMouseLeave={this.handleLeave}
            ></button>
            <button
              className="tools"
              id="ellipse"
              onMouseEnter={this.handleEnter}
              onMouseLeave={this.handleLeave}
            ></button>
            <button
              className="tools"
              id="rectelipse"
              onMouseEnter={this.handleEnter}
              onMouseLeave={this.handleLeave}
            ></button>
          </div>
          <div className="optionWindow" id="optionWindow"></div>
        </div>
      </>
    );
  }
}

export default Sidebar;
