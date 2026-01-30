import React from "react";
import Menubar from "./components/container1/Menubar";
import Sidebar from "./components/container2/Sidebar";
import Canvas from "./components/container2/Canvas";
import Pallete from "./components/container3/Pallete";
import Footer from "./components/container4/Footer";

const AppMode = {
  DRAW: "DRAW",
  EDIT: "EDIT",
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.footerRef = React.createRef();
    this.canvasRef = React.createRef();

    this.state = {
      mode: AppMode.DRAW,
      currTool: "PENCIL", // FIX: casing consistency
      currColor: "black",
      toolConfig: {
        type: null,
        options: {
          size: null,
        },
      },
      defaultFooterMsg: "For Help, click Help Topics on the Help Menu",
    };
  }

  setToolConfig = (config) => {
    this.setState({ toolConfig: config });
  };

  footer = {
    coord: (pos) => {
      // console.log("[App] coord forwarded:", pos, this.footerRef.current);
      this.footerRef.current?.updateCoord(pos);
    },
    dim: (dim) => {
      // console.log("[App] dim forwarded:", dim, this.footerRef.current);
      this.footerRef.current?.updateDim(dim);
    },
    msg: (text) => {
      // console.log("[App] msg forwarded:", text, this.footerRef.current);
      this.footerRef.current?.updateMessage(text);
    },
    clearCoord: () => {
      // console.log("[App] clearCoord forwarded");
      this.footerRef.current?.clearCoord();
    },
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
            tool={this.state.currTool}
            setTool={this.setTool}
            currConfig={this.state.toolConfig}
            onToolConfigChange={this.setToolConfig}
          />

          <Canvas
            ref={this.canvasRef}
            Dim={{ WIDTH: 750, HEIGHT: 500 }}
            coord={this.footer.coord}
            clearCoord={this.footer.clearCoord} // FIX
            dim={this.footer.dim}
            tool={this.state.currTool}
            color={this.state.currColor}
            toolConfig={this.state.toolConfig}
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
