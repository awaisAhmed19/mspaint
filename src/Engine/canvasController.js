export default class CanvasController {
  constructor(tool, renderer, getState) {
    this.tool = tool;
    this.renderer = renderer;
    this.getState = getState;
    this.isDrawing = false;
    this.prevPos = null;
  }

  pointerDown(pos) {
    this.isDrawing = true;
    this.prevPos = pos;
    this.tool.begin({
      pos,
      prevPos: null,
      color: this.getState().color,
      renderer: this.renderer,
    });
  }

  pointerMove(pos) {
    if (!this.isDrawing) return;
    this.tool.update({
      pos,
      prevPos: this.prevPos,
      color: this.getState().color,
      renderer: this.renderer,
    });
    this.prevPos = pos;
  }

  pointerUp(pos) {
    if (!this.isDrawing) return;
    this.tool.end({
      pos,
      prevPos: this.prevPos,
      renderer: this.renderer,
    });
    this.isDrawing = false;
  }
}
