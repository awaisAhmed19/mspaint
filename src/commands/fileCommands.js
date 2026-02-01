export function fileNew(ctx) {
  ctx.canvasEngine.clear();
}

export function fileSave(ctx) {
  return ctx.persistence.save(ctx.canvasEngine);
}

export function fileOpen(ctx) {
  return ctx.persistence.loadLatest(ctx.canvasEngine);
}
