// components/container2/Engine/history.js
export default class HistoryScope {
  constructor(engine) {
    this.engine = engine;
    this.undoStack = [];
    this.redoStack = [];
  }

  snapshot() {
    const imageData = this.engine.snapshot();
    this.undoStack.push(imageData);
    this.redoStack.length = 0;
  }

  undo() {
    if (!this.undoStack.length) return;

    const current = this.engine.snapshot();
    this.redoStack.push(current);

    const prev = this.undoStack.pop();
    this.engine.load(prev);
  }

  redo() {
    if (!this.redoStack.length) return;

    const current = this.engine.snapshot();
    this.undoStack.push(current);

    const next = this.redoStack.pop();
    this.engine.load(next);
  }

  clear() {
    this.undoStack.length = 0;
    this.redoStack.length = 0;
  }
}
