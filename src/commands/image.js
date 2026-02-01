// src/commands/image.js

export const IMAGE_COMMANDS = {
  Flip_Rotate: "IMAGE_FLIP_ROTATE",
  Stretch_Skew: "IMAGE_STRETCH_SKEW",
  Invert_Color: "IMAGE_INVERT_COLOR",
  Attributes: "IMAGE_ATTRIBUTES",
  Clear_Image: "IMAGE_CLEAR",
  Draw_Opaque: "IMAGE_DRAW_OPAQUE",
};

export function imageFlipRotate(ctx) {
  ctx.ui.setState({ activeDialog: "FLIP_ROTATE" });
}

export function imageApplyFlipRotate(ctx, payload) {
  ctx.history?.push?.();
  ctx.imageController.flipRotate(payload);
}

export function imageStretchSkew(ctx) {
  ctx.ui.setState({ activeDialog: "STRETCH_SKEW" });
}

export function imageApplyStretchSkew(ctx, payload) {
  ctx.history?.push?.();
  ctx.imageController.stretchSkew(payload);
}

export function imageInvertColor(ctx) {
  ctx.history?.push?.();

  ctx.imageController.invertColor();
}

export function imageAttributes(ctx) {
  ctx.ui.setState({ activeDialog: "ATTRIBUTES" });
}

export function imageApplyAttributes(ctx, payload) {
  const { width, height, colors, transparency } = payload;

  ctx.history?.push?.();

  ctx.imageController.applyAttributes({
    width,
    height,
    colors,
    transparency,
  });
}

export function imageClear(ctx) {
  ctx.history?.push?.();

  ctx.selection?.clear?.();

  ctx.canvasEngine.clear();
}

export function imageDrawOpaque(ctx) {
  console.warn("[IMAGE] Draw Opaque – not implemented yet");
}
