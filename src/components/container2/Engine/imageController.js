// components/container2/Engine/imageController.js
import { transformImageData } from "./imageTransforms.js";
import { stretchSkewImageData } from "./stretchSkewTransforms.js";

export default class ImageController {
  constructor(engine, selection) {
    this.engine = engine;
    this.selection = selection;
  }

  flipRotate({ mode, angle }) {
    const region = this.selection?.getBounds?.() ?? null;

    const imageData = region
      ? this.engine.getRegion(region)
      : this.engine.snapshot();

    const transformed = transformImageData(imageData, mode, angle);

    if (region) {
      this.engine.putRegion(region, transformed);
    } else {
      this.engine.commit(transformed);
    }
  }
  stretchSkew({ stretchX, stretchY, skewX, skewY }) {
    const region = this.selection?.getBounds?.() ?? null;

    const imageData = region
      ? this.engine.getRegion(region)
      : this.engine.snapshot();

    const transformed = stretchSkewImageData(
      imageData,
      stretchX,
      stretchY,
      skewX,
      skewY,
    );

    if (region) {
      this.engine.putRegion(region, transformed);
    } else {
      this.engine.commit(transformed);
    }
  }
  invertColor() {
    const region = this.selection?.getBounds?.() ?? null;

    const imageData = region
      ? this.engine.getRegion(region)
      : this.engine.snapshot();

    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      data[i] = 255 - data[i]; // R
      data[i + 1] = 255 - data[i + 1]; // G
      data[i + 2] = 255 - data[i + 2]; // B
      // alpha untouched
    }

    if (region) {
      this.engine.putRegion(region, imageData);
    } else {
      this.engine.commit(imageData);
    }
  }
  applyAttributes({ width, height, colors, transparency }) {
    // resize bitmap
    if (width && height) {
      this.resizeCanvas(width, height);
    }

    if (colors === "monochrome") {
      this.toMonochrome();
    }

    if (transparency === "opaque") {
      this.flattenAlpha();
    }
  }
  clearImage() {
    this.selection?.clear?.();
    this.engine.clear();
  }
}
