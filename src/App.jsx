import React from "react";
import Menubar from "./components/container1/Menubar";
import Sidebar from "./components/container2/Sidebar";
import Canvas from "./components/container2/Canvas";
import Pallete from "./components/container3/Pallete";
import Footer from "./components/container4/Footer";
import { dispatchCommand } from "./commandRouter/index.js";
import { createPersistence } from "./svc/presistence.js";

import ImageController from "./components/container2/Engine/imageController.js";
import ModalHost from "./components/container2/modal/ModalHost";
import HistoryScope from "./components/container2/Engine/history.js";
import SelectionScope from "./components/container2/Engine/selection.js";

import { SHORTCUTS, getKeyCombo } from "./commands/shortcuts";
import {
  createTool,
  TOOLS,
} from "./components/container2/Engine/toolFactory.js";

const AppMode = {
  DRAW: "DRAW",
  EDIT: "EDIT",
};

class App extends React.Component {
  constructor(props) {
    super(props);

    const thisApp = this; // ✅ LEGAL, CORRECT PLACE

    this.footerRef = React.createRef();
    this.canvasRef = React.createRef();

    this.commandCtx = {
      canvasEngine: null,
      fileSystem: null,
      persistence: createPersistence(),

      ui: {
        get showToolBox() {
          return thisApp.state.ui.showToolBox;
        },
        get showColorBox() {
          return thisApp.state.ui.showColorBox;
        },
        get showStatusBar() {
          return thisApp.state.ui.showStatusBar;
        },
        get showTextToolbar() {
          return thisApp.state.ui.showTextToolbar;
        },

        get zoomed() {
          return thisApp.state.ui.zoomed;
        },
        get fullscreen() {
          return thisApp.state.ui.fullscreen;
        },
        setState: (patch) => {
          thisApp.setState((prev) => ({
            ui: { ...prev.ui, ...patch },
          }));
        },
      },
    };

    this.editorState = {
      color: "black",
      size: 1,
      type: null,

      history: null,
      selection: null,
      clipboard: null,

      setColor: (c) => {
        this.editorState.color = c;
        this.setState({ currColor: c });
      },
    };

    this.state = {
      mode: AppMode.DRAW,
      currTool: "PENCIL",
      currColor: "black",
      ui: {
        showToolBox: true,
        showColorBox: true,
        showStatusBar: true,
        showTextToolbar: false,
        zoomed: false,
        viewBitmap: false, // 👈 ADD
        activeDialog: null,
      },
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

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);

    document.addEventListener("fullscreenchange", () => {
      const isFs = !!document.fullscreenElement;
      this.setState((prev) => ({
        ui: { ...prev.ui, fullscreen: isFs },
      }));
    });
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
  }
  /* ================= APP STATE ================= */

  handleKeyDown = (e) => {
    const combo = getKeyCombo(e);
    const cmd = SHORTCUTS[combo];
    if (!cmd) return;

    const selectionOnly = [
      "EDIT_CUT",
      "EDIT_COPY",
      "EDIT_PASTE",
      "EDIT_CLEAR_SELECTION",
    ];

    if (
      selectionOnly.includes(cmd) &&
      !this.editorState.isSelectionToolActive
    ) {
      return;
    }

    e.preventDefault();
    this.dispatchCommand(cmd);
  };

  setTool = (toolName) => {
    const meta = TOOLS[toolName]?.meta;

    this.editorState.isSelectionToolActive = !!meta?.supportsSelection;

    this.setState({ currTool: toolName });
  };

  setColor = (color) => {
    this.setState({ currColor: color });
  };

  setToolConfig = (config) => {
    this.setState({ toolConfig: config });
  };

  /* ================= COMMAND DISPATCH ================= */

  dispatchCommand = (cmd, payload) => {
    dispatchCommand(cmd, this.commandCtx, payload);
  };

  /* ================= RENDER ================= */

  render() {
    return (
      <>
        <Menubar
          setFooter={this.footer.msg}
          clearFooter={this.footer.resetMsg}
          dispatchCommand={this.dispatchCommand}
          isSelectionToolActive={this.editorState.isSelectionToolActive}
        />

        <div className="container-2">
          {this.state.ui.showToolBox && (
            <Sidebar
              setFooter={this.footer.msg}
              clearFooter={this.footer.resetMsg}
              tool={this.state.currTool}
              setTool={this.setTool}
              currConfig={this.state.toolConfig}
              onToolConfigChange={this.setToolConfig}
            />
          )}
          <Canvas
            ref={this.canvasRef}
            Dim={{ WIDTH: 750, HEIGHT: 500 }}
            coord={this.footer.coord}
            clearCoord={this.footer.clearCoord}
            dim={this.footer.dim}
            tool={this.state.currTool}
            color={this.state.currColor}
            toolConfig={this.state.toolConfig}
            getState={() => this.editorState}
            zoomed={this.state.ui.zoomed}
            onEngineReady={(engine) => {
              this.commandCtx.canvasEngine = engine;

              this.editorState.history = new HistoryScope(engine);
              this.editorState.selection = new SelectionScope(engine);
              this.editorState.clipboard = null;

              this.commandCtx.history = this.editorState.history;
              this.commandCtx.selection = this.editorState.selection;
              this.commandCtx.clipboard = null;

              // 🔥 ADD THIS
              this.commandCtx.imageController = new ImageController(
                engine,
                this.editorState.selection,
              );
            }}
          />

          <div className="right-sidebar"></div>
        </div>

        {this.state.ui.showColorBox && <Pallete setColor={this.setColor} />}

        {this.state.ui.showStatusBar && <Footer ref={this.footerRef} />}
        <ModalHost
          ui={this.state.ui}
          dispatchCommand={this.dispatchCommand}
          canvasInfo={{
            width: this.commandCtx.canvasEngine?.width,
            height: this.commandCtx.canvasEngine?.height,
          }}
        />
      </>
    );
  }
}

export default App;
