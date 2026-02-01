import {
  colorEdit,
  colorGet,
  colorSave,
  colorSavePalette,
} from "../commands/colors.js";

export function handleColorCommand(cmd, ctx, payload) {
  switch (cmd) {
    case "COLOR_EDIT":
      return colorEdit(ctx);

    case "COLOR_GET":
      return colorGet(ctx);

    case "COLOR_SAVE":
      return colorSave(ctx);
    case "COLOR_SAVE_PALETTE":
      return colorSavePalette(ctx);

    default:
      console.warn("Unhandled color command:", cmd);
  }
}
