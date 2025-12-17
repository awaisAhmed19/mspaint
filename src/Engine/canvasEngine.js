export function createCanvasEngine(canvas, overlay) {
  const ctx = canvas.getContext("2d");
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  function setPixel(x, y, { r, g, b, a = 255 }) {
    if (x < 0 || y < 0 || x >= canvas.width || y >= canvas.height) return;
    const i = (y * canvas.width + x) * 4;
    imageData.data[i] = r;
    imageData.data[i + 1] = g;
    imageData.data[i + 2] = b;
    imageData.data[i + 3] = a;
  }

  function commit() {
    ctx.putImageData(imageData, 0, 0);
  }

  return {
    setPixel,
    commit,
    ctx,
    overlay, // 👈 NEW
  };
}
