import { useEffect, useRef } from "react";
import { createCanvasEngine } from "../Engine/canvasEngine.js";
import CanvasController from "../Engine/canvasController";
import { PencilTool, PencilRenderer } from "../Tools/pencil.js";

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
    const renderer = new PencilRenderer(canvas);
    const pencil = new PencilTool();
    const getState = () => ({
      color: "#000",
      size: 1,
    });

    // controller (real-time brain)
    controllerRef.current = new CanvasController(
      pencil,
      renderer,
      getState
    );
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
