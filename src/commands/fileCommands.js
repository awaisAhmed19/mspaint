export function fileNew(ctx) {
  ctx.canvasEngine.clear();
}

export function fileSave(ctx) {
  ctx.fileSystem.save(ctx.canvasEngine.snapshot());
}
