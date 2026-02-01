export const SHORTCUTS = {
  // ---- FILE ----
  "Ctrl+N": "FILE_NEW",
  "Ctrl+O": "FILE_OPEN",
  "Ctrl+S": "FILE_SAVE",
  "Ctrl+Shift+S": "FILE_SAVE_AS",
  "Ctrl+Q": "APP_EXIT",

  // ---- EDIT (GLOBAL) ----
  "Ctrl+Z": "EDIT_UNDO",
  "Ctrl+Shift+Z": "EDIT_REDO",
  F4: "EDIT_REDO",

  // ---- EDIT (SELECTION ONLY) ----
  Delete: "EDIT_CLEAR_SELECTION",
  "Ctrl+X": "EDIT_CUT",
  "Ctrl+C": "EDIT_COPY",
  "Ctrl+V": "EDIT_PASTE",
  "Ctrl+A": "EDIT_SELECT_ALL",
};
export function getKeyCombo(e) {
  const parts = [];

  if (e.ctrlKey) parts.push("Ctrl");
  if (e.shiftKey) parts.push("Shift");
  if (e.altKey) parts.push("Alt");

  let key = e.key;

  // Normalize
  if (key.length === 1) key = key.toUpperCase();
  if (key === " ") key = "Space";

  parts.push(key);

  return parts.join("+");
}
