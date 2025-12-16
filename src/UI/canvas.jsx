import { useEffect, useRef, useState } from "react";
import { createCanvasEngine } from "../Engine/canvasEngine.js";
import CanvasController from "../Engine/canvasController";
import { PencilTool, PencilRenderer } from "../Tools/pencil.js";
import { EraserTool, EraserRenderer } from "../Tools/eraser.js";
import { BrushTool, BrushRenderer } from "../Tools/brush.js";
import { AirBrushTool, AirBrushRenderer } from "../Tools/airbrush.js";
import { LineTool, LineRenderer } from "../Tools/line.js";
import { RectTool, RectRenderer } from "../Tools/rectangle.js";
import { PolygonTool, PolygonRenderer } from "../Tools/polygon.js";
import { RectEllipseTool, RectEllipseRenderer } from "../Tools/rectellipse.js";
import { EllipseTool, EllipseRenderer } from "../Tools/ellipse.js";
import { FloodFillTool, FloodFillRenderer } from "../Tools/floodfill.js";
import { EyedropTool, EyedropRenderer } from "../Tools/eyedrop.js";
import { CurveLineTool, CurveLineRenderer } from "../Tools/curveline.js";

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

  const [color, setColor] = useState("blue");
  const [size, setSize] = useState(1);
  const [type, setType] = useState(2);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const engine = createCanvasEngine(canvas);
    const renderer = new CurveLineRenderer(canvas);
    const tool = new CurveLineTool();

    const getState = () => ({
      color,
      size,
      type,
      setColor,
    });

    controllerRef.current = new CanvasController(
      tool,
      renderer,
      engine,
      getState,
    );
    console.group("Canvas Config Test");
    console.log("Tool:", tool.constructor.name);
    console.log("Renderer:", renderer.constructor.name);
    console.log("State:", getState());
    console.log("Controller OK:", !!controllerRef.current);
    console.groupEnd();
  }, [color, size, type]);

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
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    />
  );
}
