import { handleFileCommand } from "./fileRouter";
import { handleEditCommand } from "./editRouter";
import { handleViewCommand } from "./viewRouter";
import { handleImageCommand } from "./imageRouter";
import { handleUICommand } from "./uiRouter";
import { handleColorCommand } from "./colorsRouter.js";
import { handleHelpCommand } from "./helpRouter.js";
export function dispatchCommand(cmd, ctx, payload) {
  if (cmd.startsWith("UI_")) {
    return handleUICommand(cmd, ctx, payload);
  }
  if (cmd.startsWith("FILE_")) {
    return handleFileCommand(cmd, ctx, payload);
  }

  if (cmd.startsWith("EDIT_")) {
    return handleEditCommand(cmd, ctx, payload);
  }

  if (cmd.startsWith("VIEW_")) {
    return handleViewCommand(cmd, ctx, payload);
  }

  if (cmd.startsWith("IMAGE_")) {
    return handleImageCommand(cmd, ctx, payload);
  }
  if (cmd.startsWith("COLOR_")) {
    return handleColorCommand(cmd, ctx, payload);
  }
  if (cmd.startsWith("HELP_")) {
    return handleHelpCommand(cmd, ctx, payload);
  }
  console.warn("Unknown command:", cmd);
}
