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
        <Menubar setFooter={this.setFooter} clearFooter={this.defaultFooter} />
        <div className="container-2">
          <Sidebar
            setFooter={this.setFooter}
            clearFooter={this.defaultFooter}
          />
          <Canvas Dim={{ WIDTH: 750, HEIGHT: 500 }} />
          <div className="right-sidebar"></div>
        </div>
        <Pallete />
        <Footer ref={this.footerRef} />
      </>
    );
  }
}

export default App;
