export function stretchSkewImageData(
  imageData,
  stretchX,
  stretchY,
  skewX,
  skewY,
) {
  const srcW = imageData.width;
  const srcH = imageData.height;
  const src = imageData.data;

  const scaleX = stretchX / 100;
  const scaleY = stretchY / 100;

  const kx = Math.tan((skewX * Math.PI) / 180);
  const ky = Math.tan((skewY * Math.PI) / 180);

  const outW = Math.max(1, Math.round(srcW * scaleX));
  const outH = Math.max(1, Math.round(srcH * scaleY));

  const out = new ImageData(outW, outH);
  const dst = out.data;

  const srcIdx = (x, y) => (y * srcW + x) * 4;
  const dstIdx = (x, y) => (y * outW + x) * 4;

  for (let y = 0; y < outH; y++) {
    for (let x = 0; x < outW; x++) {
      // inverse mapping
      const srcX = (x - y * kx) / scaleX;
      const srcY = (y - x * ky) / scaleY;

      const ix = Math.round(srcX);
      const iy = Math.round(srcY);

      if (ix < 0 || iy < 0 || ix >= srcW || iy >= srcH) {
        continue; // transparent pixel
      }

      const s = srcIdx(ix, iy);
      const d = dstIdx(x, y);

      dst[d] = src[s];
      dst[d + 1] = src[s + 1];
      dst[d + 2] = src[s + 2];
      dst[d + 3] = src[s + 3];
    }
  }

  return out;
}
