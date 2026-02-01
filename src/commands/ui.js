import { dispatchCommand } from "../commandRouter/index.js";

/* =========================
   UI COMMAND DEFINITIONS
   ========================= */

export const UI_COMMANDS = {
  OPEN_DIALOG: "UI_OPEN_DIALOG",
  CLOSE_DIALOG: "UI_CLOSE_DIALOG",
  CONFIRM_DELETE: "UI_CONFIRM_DELETE",
  CONFIRM_DELETE_ACCEPT: "UI_CONFIRM_DELETE_ACCEPT",
};

/* =========================
   BASIC DIALOG CONTROL
   ========================= */

export function uiOpenDialog(ctx, dialogId) {
  ctx.ui.setState({
    activeDialog: dialogId,
  });
}

export function uiCloseDialog(ctx) {
  ctx.ui.setState({
    activeDialog: null,
  });
}

/* =========================
   DELETE CONFIRM FLOW
   ========================= */

export function uiConfirmDelete(ctx, { id }) {
  ctx.ui.setState({
    activeDialog: "CONFIRM_DELETE",
    deleteTargetId: id,
  });
}

export function uiConfirmDeleteAccept(ctx) {
  let targetId;

  // safely read + clear UI state
  ctx.ui.setState((prev) => {
    targetId = prev.deleteTargetId;
    return {
      activeDialog: null,
      deleteTargetId: null,
    };
  });

  if (!targetId) {
    console.warn("[UI] No delete target");
    return;
  }

  // delegate real work to IMAGE domain
  dispatchCommand("IMAGE_DELETE_REMOTE", ctx, { id: targetId });
}
