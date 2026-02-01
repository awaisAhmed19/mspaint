import { handleFileCommand } from "./fileRouter";
import { handleEditCommand } from "./editRouter";
import { handleViewCommand } from "./viewRouter";
import { handleImageCommand } from "./imageRouter";
import { uiOpenDialog, uiCloseDialog } from "../commands/ui.js";

export function dispatchCommand(cmd, ctx, payload) {
  if (cmd === "UI_OPEN_DIALOG") {
    return uiOpenDialog(ctx, payload);
  }

  if (cmd === "UI_CLOSE_DIALOG") {
    return uiCloseDialog(ctx);
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

  console.warn("Unknown command:", cmd);
}
