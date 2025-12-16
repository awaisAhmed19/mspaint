import { useEffect, useRef, useState } from "react";
import { createCanvasEngine } from "../Engine/canvasEngine";
import CanvasController from "../Engine/canvasController";
import { createTool, TOOLS } from "../Engine/toolFactory";

function getPos(e, canvas) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top,
  };
}

export default function Canvas() {
  const canvasRef = useRef(null);
  const controllerRef = useRef(null);

  /* ---------- UI STATE ---------- */
  const [color, setColor] = useState("blue");
  const [size, setSize] = useState(1);
  const [type, setType] = useState(2); // tool option
  const [currentTool, setCurrentTool] = useState("PENCIL");
  console.log("this tool is ", TOOLS[currentTool]);
  /* ---------- LIVE STATE BRIDGE ---------- */
  const stateRef = useRef({});

  useEffect(() => {
    stateRef.current = {
      color,
      size,
      type,
      setColor,
    };
  }, [color, size, type]);

  /* ---------- ENGINE INIT (ONCE) ---------- */
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const engine = createCanvasEngine(canvas);
    const getState = () => stateRef.current;

    controllerRef.current = new CanvasController(engine, null, getState);
  }, []);

  /* ---------- TOOL SWITCHING ---------- */
  useEffect(() => {
    if (!controllerRef.current) return;

    const canvas = canvasRef.current;
    const { tool, renderer } = createTool(currentTool, canvas);

    controllerRef.current.setRenderer(renderer);
    controllerRef.current.setTool(tool);

    console.log("Tool switched →", currentTool);
  }, [currentTool]);

  /* ---------- EVENTS ---------- */
  return (
    <canvas
      ref={canvasRef}
      width={500}
      height={400}
      onPointerDown={(e) =>
        controllerRef.current?.pointerDown(getPos(e, canvasRef.current))
      }
      onPointerMove={(e) =>
        controllerRef.current?.pointerMove(getPos(e, canvasRef.current))
      }
      onPointerUp={(e) =>
        controllerRef.current?.pointerUp(getPos(e, canvasRef.current))
      }
    />
  );
}
