// src/commandRouter/imageRouter.js
import {
  imageFlipRotate,
  imageApplyFlipRotate,
  imageStretchSkew,
  imageApplyStretchSkew,
  imageInvertColor,
  imageAttributes,
  imageClear,
  imageDrawOpaque,
  imageListRemote,
  imageLoadRemote,
  imageDeleteRemote,
} from "../commands/image.js";

export function handleImageCommand(cmd, ctx, payload) {
  switch (cmd) {
    case "IMAGE_FLIP_ROTATE":
      return imageFlipRotate(ctx);

    case "IMAGE_APPLY_FLIP_ROTATE":
      return imageApplyFlipRotate(ctx, payload);

    case "IMAGE_STRETCH_SKEW":
      return imageStretchSkew(ctx);

    case "IMAGE_APPLY_STRETCH_SKEW":
      return imageApplyStretchSkew(ctx, payload);

    case "IMAGE_INVERT_COLOR":
      return imageInvertColor(ctx);

    case "IMAGE_ATTRIBUTES":
      return imageAttributes(ctx);

    case "IMAGE_APPLY_ATTRIBUTES":
      return imageApplyAttributes(ctx, payload);
    case "IMAGE_CLEAR":
      return imageClear(ctx);

    case "IMAGE_DRAW_OPAQUE":
      return imageDrawOpaque(ctx);
    case "IMAGE_LIST_REMOTE":
      return imageListRemote(ctx, payload);

    case "IMAGE_LOAD_REMOTE":
      return imageLoadRemote(ctx, payload);

    case "IMAGE_DELETE_REMOTE":
      return imageDeleteRemote(ctx, payload);

    default:
      console.warn("Unhandled image command:", cmd);
  }
}
