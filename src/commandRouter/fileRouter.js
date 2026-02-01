import { fileNew, fileSave, fileOpen } from "../commands/fileCommands.js";

export function handleFileCommand(cmd, ctx) {
  switch (cmd) {
    case "FILE_NEW":
      return fileNew(ctx);
    case "FILE_SAVE":
      return fileSave(ctx);
    case "FILE_OPEN":
      return fileOpen(ctx);
    default:
      console.warn("Unhandled file command:", cmd);
  }
}
