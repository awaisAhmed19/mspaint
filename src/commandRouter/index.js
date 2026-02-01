import { handleFileCommand } from "./fileRouter";
import { handleEditCommand } from "./editRouter";

export function dispatchCommand(cmd, ctx) {
  if (cmd.startsWith("FILE_")) return handleFileCommand(cmd, ctx);
  if (cmd.startsWith("EDIT_")) return handleEditCommand(cmd, ctx);

  console.warn("Unknown command:", cmd);
}
