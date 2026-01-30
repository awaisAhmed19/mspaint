import { fileNew, fileSave } from "../commands/fileCommands.js";

export function handleFileCommand(cmd, ctx) {
  switch (cmd) {
    case "FILE_NEW":
      return fileNew(ctx);

    case "FILE_SAVE":
      return fileSave(ctx);

    default:
      console.warn("Unhandled file command:", cmd);
  }
}
