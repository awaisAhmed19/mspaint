export function createCanvasEngine(canvas, overlay) {
  const ctx = canvas.getContext("2d");

  /* ================= CORE ================= */

  function getImageData() {
    return ctx.getImageData(0, 0, canvas.width, canvas.height);
  }

  function commit(imageData) {
    if (imageData) ctx.putImageData(imageData, 0, 0);
  }

  function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  /* ================= PIXEL ================= */

  function setPixel(x, y, { r, g, b, a = 255 }) {
    if (x < 0 || y < 0 || x >= canvas.width || y >= canvas.height) return;

    const imageData = getImageData();
    const i = (y * canvas.width + x) * 4;

    imageData.data[i] = r;
    imageData.data[i + 1] = g;
    imageData.data[i + 2] = b;
    imageData.data[i + 3] = a;

    commit(imageData);
  }

  /* ================= FILE OPS ================= */

  function snapshot() {
    return getImageData();
  }

  function load(imageData) {
    clear();
    commit(imageData);
  }

  function toDataURL(type = "image/png") {
    return canvas.toDataURL(type);
  }

  function fromImage(img) {
    clear();
    ctx.drawImage(img, 0, 0);
  }

  /* ================= PUBLIC API ================= */

  return {
    ctx,

    // drawing
    setPixel,
    commit,

    // file ops
    clear,
    snapshot,
    load,
    toDataURL,
    fromImage,

    // misc
    overlay,
  };
}
