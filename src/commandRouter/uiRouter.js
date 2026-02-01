import {
  uiOpenDialog,
  uiCloseDialog,
  uiConfirmDelete,
  uiConfirmDeleteAccept,
} from "../commands/ui.js";

export function handleUICommand(cmd, ctx, payload) {
  switch (cmd) {
    case "UI_OPEN_DIALOG":
      return uiOpenDialog(ctx, payload);

    case "UI_CLOSE_DIALOG":
      return uiCloseDialog(ctx);

    case "UI_CONFIRM_DELETE":
      return uiConfirmDelete(ctx, payload);

    case "UI_CONFIRM_DELETE_ACCEPT":
      return uiConfirmDeleteAccept(ctx);

    default:
      console.warn("Unhandled UI command:", cmd);
  }
}
