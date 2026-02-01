// src/engine/imageTransforms.js

// src/components/container2/Engine/imageTransforms.js

export function transformImageData(imageData, mode, angle) {
  //   // implementation
  const { width, height, data } = imageData;
  const out = new ImageData(width, height);
  const src = data;
  const dst = out.data;

  const idx = (x, y, w) => (y * w + x) * 4;

  if (mode === "flip-horizontal") {
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const s = idx(x, y, width);
        const d = idx(width - x - 1, y, width);
        dst[d] = src[s];
        dst[d + 1] = src[s + 1];
        dst[d + 2] = src[s + 2];
        dst[d + 3] = src[s + 3];
      }
    }
  }

  if (mode === "flip-vertical") {
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const s = idx(x, y, width);
        const d = idx(x, height - y - 1, width);
        dst[d] = src[s];
        dst[d + 1] = src[s + 1];
        dst[d + 2] = src[s + 2];
        dst[d + 3] = src[s + 3];
      }
    }
  }

  if (mode === "rotate-by-angle") {
    if (angle !== 90 && angle !== 180 && angle !== 270) {
      return imageData;
    }

    const rw = angle === 180 ? width : height;
    const rh = angle === 180 ? height : width;
    const rotated = new ImageData(rw, rh);

    const rdst = rotated.data;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const s = idx(x, y, width);

        let nx, ny;
        if (angle === 90) {
          nx = height - y - 1;
          ny = x;
        } else if (angle === 180) {
          nx = width - x - 1;
          ny = height - y - 1;
        } else {
          nx = y;
          ny = width - x - 1;
        }

        const d = idx(nx, ny, rw);
        rdst[d] = src[s];
        rdst[d + 1] = src[s + 1];
        rdst[d + 2] = src[s + 2];
        rdst[d + 3] = src[s + 3];
      }
    }

    return rotated;
  }

  return out;
}
