import { useState } from "react";
import Menubar from "./components/container1/Menubar";
import Sidebar from "./components/container2/Sidebar";
import Canvas from "./components/container2/Canvas";
import Pallete from "./components/container3/Pallete";
import Footer from "./components/container4/Footer";

window.addEventListener("load", () => {});

function App() {
  return (
    <>
      <div className="container-1">
        <Menubar />
      </div>
      <div className="container-2">
        <Sidebar />
        <Canvas Dim={{ WIDTH: 750, HEIGHT: 500 }} />
        <div className="right-sidebar"></div>
      </div>
      <div className="container-3">
        <Pallete />
      </div>
      <div className="container-4">
        <Footer />
      </div>
    </>
  );
}

export default App;
