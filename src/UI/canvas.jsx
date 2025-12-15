import { useEffect, useRef } from "react";
import { createCanvasEngine } from "../Engine/canvasEngine.js";
import CanvasController from "../Engine/canvasController";
import { PencilTool, PencilRenderer } from "../Tools/pencil.js";
import { EraserTool, EraserRenderer } from "../Tools/eraser.js";
import { BrushTool, BrushRenderer } from "../Tools/brush.js";
import { AirBrushTool, AirBrushRenderer } from "../Tools/airbrush.js";
import { LineTool, LineRenderer } from "../Tools/line.js";

function getPos(e, canvas) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top,
  };
}
export default function CanvasHarness() {
  const canvasRef = useRef(null);
  const controllerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    const engine = createCanvasEngine(canvas);
    const renderer = new LineRenderer(canvas);
    const tool = new LineTool();

    const getState = () => ({
      color: "blue",
      size: 1,
    });


    controllerRef.current = new CanvasController(
      tool,
      renderer,
      engine,
      getState
    );


    console.group("Canvas Config Test");
    console.log("Tool:", tool.constructor.name);
    console.log("Renderer:", renderer.constructor.name);
    console.log("State:", getState());
    console.log("Controller OK:", !!controllerRef.current);
    console.groupEnd();
  }, []);
  function handlePointerDown(e) {
    const canvas = canvasRef.current;
    controllerRef.current?.pointerDown(getPos(e, canvas));
  }

  function handlePointerMove(e) {
    const canvas = canvasRef.current;
    controllerRef.current?.pointerMove(getPos(e, canvas));
  }

  function handlePointerUp(e) {
    const canvas = canvasRef.current;
    controllerRef.current?.pointerUp(getPos(e, canvas));
  }

  return (
    <canvas
      ref={canvasRef}
      width={500}
      height={400}
      style={{ background: "#fff", touchAction: "none" }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    />
  );
}
