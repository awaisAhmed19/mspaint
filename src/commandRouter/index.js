// commandRouter/index.js
import { handleFileCommand } from "./fileRouter";

export function dispatchCommand(cmd, ctx) {
  if (cmd.startsWith("FILE_")) return handleFileCommand(cmd, ctx);
}
