import React from "react";
import Menubar from "./components/container1/Menubar";
import Sidebar from "./components/container2/Sidebar";
import Canvas from "./components/container2/Canvas";
import Pallete from "./components/container3/Pallete";
import Footer from "./components/container4/Footer";
import { dispatchCommand } from "./commandRouter/index.js";
const AppMode = {
  DRAW: "DRAW",
  EDIT: "EDIT",
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.footerRef = React.createRef();
    this.canvasRef = React.createRef();
    this.commandCtx = {
      canvasEngine: null,
      fileSystem: null, // later
    };
    this.state = {
      mode: AppMode.DRAW,
      currTool: "PENCIL",
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

  /* ================= FOOTER API ================= */

  footer = {
    coord: (pos) => {
      this.footerRef.current?.updateCoord(pos);
    },
    dim: (dim) => {
      this.footerRef.current?.updateDim(dim);
    },
    msg: (text) => {
      this.footerRef.current?.updateMessage(text);
    },
    clearCoord: () => {
      this.footerRef.current?.clearCoord();
    },
    resetMsg: () => {
      this.footerRef.current?.updateMessage(this.state.defaultFooterMsg);
    },
  };

  /* ================= APP STATE ================= */

  setTool = (toolName) => {
    this.setState({ currTool: toolName });
  };

  setColor = (color) => {
    this.setState({ currColor: color });
  };

  setToolConfig = (config) => {
    this.setState({ toolConfig: config });
  };

  /* ================= COMMAND DISPATCH ================= */

  dispatchCommand = (cmd) => {
    dispatchCommand(cmd, this.commandCtx);
  };

  /* ================= RENDER ================= */

  render() {
    return (
      <>
        <Menubar
          setFooter={this.footer.msg}
          clearFooter={this.footer.resetMsg}
          dispatchCommand={this.dispatchCommand}
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
            clearCoord={this.footer.clearCoord}
            dim={this.footer.dim}
            tool={this.state.currTool}
            color={this.state.currColor}
            toolConfig={this.state.toolConfig}
            onEngineReady={(engine) => {
              this.commandCtx.canvasEngine = engine;
            }}
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
