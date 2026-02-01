// src/commands/image.js

const API = "http://localhost:3000/api/snapshots";
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
export async function imageLoadRemote(ctx, { id }) {
  const res = await fetch(`/api/snapshots/${id}`);
  const { dataURL } = await res.json();

  const img = new Image();
  img.onload = () => {
    ctx.canvasController.onBeforeChange();
    ctx.canvasEngine.fromImage(img);
    ctx.canvasEngine.commit();
  };

  img.src = dataURL;
}

export async function imageListRemote(ctx, payload = {}) {
  const res = await fetch(API);

  if (!res.ok) {
    const text = await res.text();
    console.error("[IMAGE_LIST_REMOTE] Bad response:", text);
    return;
  }

  const images = await res.json();

  ctx.ui.setState({
    activeDialog: "MANAGE_STORAGE",
    savedImages: images,
    storagePage: 0,
    storageLimit: 20,
    deleteTargetId: null,
  });
}

export async function imageDeleteRemote(ctx, { id }) {
  await fetch(`/api/snapshots/${id}`, { method: "DELETE" });

  // refresh list
  dispatchCommand("IMAGE_LIST_REMOTE", ctx);
}
