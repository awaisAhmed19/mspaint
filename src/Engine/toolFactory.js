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
import { LassoTool, LassoRenderer } from "../Tools/lasso.js";
import { RectLassoTool, RectLassoRenderer } from "../Tools/rectlasso.js";
import { TextTool, TextRenderer } from "../Tools/text.js";
import { MagnificationTool, MagnificationRenderer } from "../Tools/magnify.js";
import { InteractionType } from "./Interaction/ToolInteraction";

export const TOOLS = {
  PENCIL: {
    name: "Pencil",
    interaction: InteractionType.STROKE,

    options: {
      size: {
        type: "number",
        default: 1,
        min: 1,
        max: 10,
        step: 1,
      },
    },
  },

  BRUSH: {
    name: "Brush",
    interaction: InteractionType.STROKE,

    options: {
      size: {
        type: "number",
        default: 4,
        min: 1,
        max: 12,
        step: 1,
      },
    },
  },

  ERASER: {
    name: "Eraser",
    interaction: InteractionType.STROKE,

    options: {
      size: {
        type: "number",
        default: 3,
        min: 1,
        max: 5,
        step: 1,
      },
    },
  },

  RECT: {
    name: "Rectangle",
    interaction: InteractionType.STROKE,

    options: {
      mode: {
        type: "enum",
        default: "OUTLINE",
        values: ["OUTLINE", "FILLED", "ROUNDED"],
      },
    },
  },

  ELLIPSE: {
    name: "Ellipse",
    interaction: InteractionType.STROKE,

    options: {
      mode: {
        type: "enum",
        default: "OUTLINE",
        values: ["OUTLINE", "FILLED", "ARC"],
      },
    },
  },

  CURVE: {
    name: "Curve",
    interaction: InteractionType.MODAL,

    options: {
      variant: {
        type: "enum",
        default: "QUADRATIC",
        values: ["QUADRATIC", "CUBIC"],
      },
    },
  },

  LASSO: {
    name: "Lasso",
    interaction: InteractionType.MODAL,

    options: {
      variant: {},
    },
  },
  RECTLASSO: {
    name: "RectLasso",
    interaction: InteractionType.MODAL,

    options: {
      variant: {},
    },
  },
  POLYGON: {
    name: "Polygon",
    interaction: InteractionType.STROKE,

    options: {
      sides: {
        type: "number",
        default: 5,
        min: 3,
        max: 12,
      },
    },
  },

  FLOOD: {
    name: "Flood Fill",
    interaction: InteractionType.STROKE,
    options: {},
  },

  TEXT: {
    name: "Text",
    interaction: InteractionType.MODAL,
    options: {},
  },
  EYEDROP: {
    name: "Eyedropper",
    interaction: InteractionType.STROKE,
    options: {},
  },
  MAGNIFY: {
    name: "Magnification",
    interaction: InteractionType.STROKE,
    options: {},
  },
};

export function createTool(toolKey, canvas) {
  const meta = TOOLS[toolKey];
  if (!meta) {
    throw new Error(`Unknown tool key: ${toolKey}`);
  }

  switch (toolKey) {
    case "PENCIL":
      return {
        tool: new PencilTool(meta),
        renderer: new PencilRenderer(canvas),
      };

    case "BRUSH":
      return {
        tool: new BrushTool(meta),
        renderer: new BrushRenderer(canvas),
      };

    case "CURVE":
      return {
        tool: new CurveLineTool(meta),
        renderer: new CurveLineRenderer(canvas),
      };

    case "ERASER":
      return {
        tool: new EraserTool(meta),
        renderer: new EraserRenderer(canvas),
      };

    case "MAGNIFY":
      return {
        tool: new MagnificationTool(meta),
        renderer: new MagnificationRenderer(canvas),
      };
    case "LASSO":
      return {
        tool: new LassoTool(meta),
        renderer: new LassoRenderer(canvas),
      };
    case "RECTLASSO":
      return {
        tool: new RectLassoTool(meta),
        renderer: new RectLassoRenderer(canvas),
      };
    case "RECT":
      return {
        tool: new RectTool(meta),
        renderer: new RectRenderer(canvas),
      };

    case "TEXT":
      return {
        tool: new TextTool(meta),
        renderer: new TextRenderer(canvas),
      };
    case "ELLIPSE":
      return {
        tool: new EllipseTool(meta),
        renderer: new EllipseRenderer(canvas),
      };

    case "POLYGON":
      return {
        tool: new PolygonTool(meta),
        renderer: new PolygonRenderer(canvas),
      };

    case "FLOOD":
      return {
        tool: new FloodFillTool(meta),
        renderer: new FloodFillRenderer(canvas),
      };

    case "EYEDROP":
      return {
        tool: new EyedropTool(meta),
        renderer: new EyedropRenderer(canvas),
      };
    default:
      throw new Error(`Tool not implemented: ${toolKey}`);
  }
}
