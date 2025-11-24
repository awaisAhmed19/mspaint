import React from "react";

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFloating: false,
      dragging: false,
      position: { x: 30, y: 80 },
      offset: { x: 0, y: 0 },
    };

    this.sidebarRef = React.createRef();
  }

  componentDidMount() {
    window.addEventListener("mousemove", this.onDrag);
    window.addEventListener("mouseup", this.stopDrag);
  }

  componentWillUnmount() {
    window.removeEventListener("mousemove", this.onDrag);
    window.removeEventListener("mouseup", this.stopDrag);
  }

  startDrag = (e) => {
    this.setState({
      dragging: true,
      isFloating: true, // detach from dock
      offset: {
        x: e.clientX - this.state.position.x,
        y: e.clientY - this.state.position.y,
      },
    });
  };

  onDrag = (e) => {
    if (!this.state.dragging) return;

    this.setState({
      position: {
        x: e.clientX - this.state.offset.x,
        y: e.clientY - this.state.offset.y,
      },
    });
  };

  stopDrag = () => {
    this.setState({ dragging: false });
  };

  render() {
    const { isFloating, position, dragging } = this.state;
    return (
      <>
        <div className="sidebar" id="side-bar">
          <div className="sidebar-floating-top" placeholder="Tools">
            <button className="sidebar-close-button"></button>
            Tools
          </div>
          <div className="toolbar">
            <button className="tools" id="rectlasso"></button>
            <button className="tools" id="lasso"></button>
            <button className="tools" id="eraser"></button>
            <button className="tools" id="floodfill"></button>
            <button className="tools" id="eyedrop"></button>
            <button className="tools" id="magnification"></button>
            <button className="tools" id="pencil"></button>
            <button className="tools" id="brush"></button>
            <button className="tools" id="airbrush"></button>
            <button className="tools" id="text"></button>
            <button className="tools" id="line"></button>
            <button className="tools" id="curveline"></button>
            <button className="tools" id="rectshape"></button>
            <button className="tools" id="polygonshape"></button>
            <button className="tools" id="ellipse"></button>
            <button className="tools" id="rectelipse"></button>
          </div>
          <div className="optionWindow" id="optionWindow"></div>
        </div>
      </>
    );
  }
}

export default Sidebar;
