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

  mime: {
    type: String,
    default: "image/png",
  },

  size: {
    type: Number, // bytes of dataURL string
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("CanvasSnapshot", CanvasSnapshotSchema);
