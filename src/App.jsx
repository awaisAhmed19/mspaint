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
    this.canvasRef = React.createRef();

    this.state = {
      currTool: "pencil",
      currColor: "black",
      toolConfig: {}, // ADD THIS
      defaultFooterMsg: "For Help, click Help Topics on the Help Menu",
    };
  }

  setToolConfig = (config) => {
    this.setState({ toolConfig: config });
  };
  footer = {
    coord: (pos) => this.footerRef.current.updateCoord(pos),
    dim: (dim) => this.footerRef.current.updateDim(dim),
    msg: (text) => this.footerRef.current.updateMessage(text),
    resetMsg: () =>
      this.footerRef.current.updateMessage(this.state.defaultFooterMsg),
  };

  setTool = (toolName) => {
    this.setState({ currTool: toolName });
  };

  setColor = (color) => {
    this.setState({ currColor: color });
  };

  render() {
    return (
      <>
        <Menubar
          setFooter={this.footer.msg}
          clearFooter={this.footer.resetMsg}
        />

        <div className="container-2">
          <Sidebar
            setFooter={this.footer.msg}
            clearFooter={this.footer.resetMsg}
            setTool={this.setTool}
            currConfig={this.state.toolConfig} // ADD
            onToolConfigChange={this.setToolConfig} // ADD
          />
          <Canvas
            ref={this.canvasRef}
            Dim={{ WIDTH: 750, HEIGHT: 500 }}
            coord={this.footer.coord}
            clearCoord={this.footer.coord}
            dim={this.footer.dim}
            tool={this.state.currTool}
            color={this.state.currColor}
            toolConfig={this.state.toolConfig} // ADD THIS
          />

          <div className="right-sidebar"></div>
        </div>

        <Pallete setColor={this.setColor} />

        <Footer ref={this.footerRef} />
      </>
    );
  }
}

export default App;
