import React from "react";

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.footnoteRef = React.createRef();
    this.coordValueRef = React.createRef();
    this.extraRef = React.createRef();
  }

  updateMessage(msg) {
    if (this.footnoteRef.current) {
      this.footnoteRef.current.textContent = msg;
    }
  }

  updateCoord(msg) {
    if (this.coordValueRef.current) {
      this.coordValueRef.current.textContent = `${msg.x},${msg.y}`;
    }
  }
  defaultCoordMessage() {
    this.coordValueRef.current.textContent = " ";
  }

  updateDim(msg) {
    if (this.extraRef.current) {
      this.extraRef.current.textContent = `${msg.width},${msg.height}`;
    }
  }
  render() {
    return (
      <>
        <div className="container-4">
          <div
            className="footer-note"
            id="foot-note"
            ref={this.footnoteRef}
          ></div>
          <div
            id="coordinate_value"
            className="coordinates"
            ref={this.coordValueRef}
          ></div>
          <div className="extra" id="dimensions" ref={this.extraRef}></div>
        </div>
      </>
    );
  }
}

export default Footer;
