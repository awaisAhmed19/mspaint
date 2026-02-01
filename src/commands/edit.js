export const EDIT_COMMANDS = {
  Undo: "EDIT_UNDO",
  Repeat: "EDIT_REDO",
  History: "EDIT_HISTORY",
  Cut: "EDIT_CUT",
  Copy: "EDIT_COPY",
  Paste: "EDIT_PASTE",
  Clear_Selection: "EDIT_CLEAR_SELECTION",
  Select_All: "EDIT_SELECT_ALL",
  Copy_To: "EDIT_COPY_TO",
  Paste_from: "EDIT_PASTE_FROM",
};

export default EDIT_COMMANDS;
export function editUndo(ctx) {
  ctx.history?.undo();
}

export function editRedo(ctx) {
  ctx.history?.redo();
}

export function editHistory(ctx) {
  console.warn("[EDIT] History UI not implemented");
}

export function editCut(ctx) {
  ctx.selection?.cut();
}

export function editCopy(ctx) {
  ctx.selection?.copy();
}

export function editPaste(ctx) {
  ctx.selection?.paste();
}

export function editClearSelection(ctx) {
  ctx.selection?.clear();
}

export function editSelectAll(ctx) {
  ctx.selection?.selectAll();
}

export function editCopyTo(ctx) {
  console.warn("[EDIT] Copy To not implemented");
}

export function editPasteFrom(ctx) {
  console.warn("[EDIT] Paste From not implemented");
}
