import {
  editUndo,
  editRedo,
  editHistory,
  editCut,
  editCopy,
  editPaste,
  editClearSelection,
  editSelectAll,
  editCopyTo,
  editPasteFrom,
} from "../commands/edit.js";

export function handleEditCommand(cmd, ctx) {
  switch (cmd) {
    case "EDIT_UNDO":
      return editUndo(ctx);
    case "EDIT_REDO":
      return editRedo(ctx);
    case "EDIT_HISTORY":
      return editHistory(ctx);
    case "EDIT_CUT":
      return editCut(ctx);
    case "EDIT_COPY":
      return editCopy(ctx);
    case "EDIT_PASTE":
      return editPaste(ctx);
    case "EDIT_CLEAR_SELECTION":
      return editClearSelection(ctx);
    case "EDIT_SELECT_ALL":
      return editSelectAll(ctx);
    case "EDIT_COPY_TO":
      return editCopyTo(ctx);
    case "EDIT_PASTE_FROM":
      return editPasteFrom(ctx);
    default:
      console.warn("Unhandled edit command:", cmd);
  }
}
