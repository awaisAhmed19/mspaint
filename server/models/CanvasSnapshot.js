import mongoose from "mongoose";

const CanvasSnapshotSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "untitled",
  },
  dataURL: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("CanvasSnapshot", CanvasSnapshotSchema);
