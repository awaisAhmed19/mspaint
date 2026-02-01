import {
  fileNew,
  fileSave,
  fileOpen,
  fileSaveAs,
  fileLoadFromURL,
  fileUploadToImgur,
  fileManageStorageDialog,
  fileRecent,
  appExit,
  imageListRemote,
  imageLoadRemote,
  imageDeleteRemote,
} from "../commands/fileCommands.js";

export function handleFileCommand(cmd, ctx, payload) {
  switch (cmd) {
    case "FILE_NEW":
      return fileNew(ctx);

    case "FILE_SAVE":
      return fileSave(ctx);

    case "FILE_SAVE_AS":
      return fileSaveAs(ctx);

    case "FILE_OPEN":
      return fileOpen(ctx);

    case "FILE_LOAD_URL":
      return fileLoadFromURL(ctx);

    case "FILE_UPLOAD_IMGUR":
      return fileUploadToImgur(ctx);

    case "FILE_MANAGE_STORAGE":
      return fileManageStorageDialog(ctx);

    case "FILE_RECENT":
      return fileRecent(ctx);

    case "APP_EXIT":
      return appExit(ctx);

    default:
      console.warn("Unhandled file command:", cmd);
  }
}
