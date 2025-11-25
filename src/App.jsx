import React from "react";
import Menubar from "./components/container1/Menubar";
import Sidebar from "./components/container2/Sidebar";
import Canvas from "./components/container2/Canvas";
import Pallete from "./components/container3/Pallete";
import Footer from "./components/container4/Footer";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.footerRef = React.createRef();
  }

  setFooter = (msg) => {
    this.footerRef.current.displayFooterMessage(msg);
  };

  defaultFooter = () => {
    this.footerRef.current.displayFooterMessage(
      "For Help, click Help Topics on the Help Menu",
    );
  };

  render() {
    return (
      <>
        <div className="container-1">
          <Menubar
            setFooter={this.setFooter}
            clearFooter={this.defaultFooter}
          />
        </div>
        <div className="container-2">
          <Sidebar
            setFooter={this.setFooter}
            clearFooter={this.defaultFooter}
          />
          <Canvas Dim={{ WIDTH: 750, HEIGHT: 500 }} />
          <div className="right-sidebar"></div>
        </div>
        <div className="container-3">
          <Pallete />
        </div>
        <div className="container-4">
          <Footer ref={this.footerRef} />
        </div>
      </>
    );
  }
}

export default App;
