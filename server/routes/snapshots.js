import express from "express";
import CanvasSnapshot from "../models/CanvasSnapshot.js";

const router = express.Router();

/* SAVE */
router.post("/", async (req, res) => {
  try {
    console.log("[API] POST /api/snapshots");

    const { name, dataURL } = req.body;

    if (!dataURL) {
      console.warn("[API] Missing dataURL");
      return res.status(400).json({ error: "dataURL required" });
    }

    const snap = await CanvasSnapshot.create({
      name: name || "untitled",
      dataURL,
    });

    console.log("[API] Snapshot saved:", snap._id.toString());
    res.json(snap);
  } catch (err) {
    console.error("[API] Save failed:", err);
    res.status(500).json({ error: "Failed to save snapshot" });
  }
});

/* LOAD LATEST (demo-friendly) */
router.get("/latest", async (req, res) => {
  try {
    console.log("[API] GET /api/snapshots/latest");

    const snap = await CanvasSnapshot.findOne().sort({ createdAt: -1 });

    if (!snap) {
      console.warn("[API] No snapshots found");
      return res.status(404).json({ empty: true });
    }

    console.log("[API] Loaded snapshot:", snap._id.toString());
    res.json(snap);
  } catch (err) {
    console.error("[API] Load failed:", err);
    res.status(500).json({ error: "Failed to load snapshot" });
  }
});

export default router;
