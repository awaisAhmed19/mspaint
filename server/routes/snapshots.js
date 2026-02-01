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

/* LOAD ONE */
router.get("/:id", async (req, res) => {
  const snap = await CanvasSnapshot.findById(req.params.id);

  if (!snap) {
    return res.status(404).json({ error: "Not found" });
  }

  res.json({
    id: snap._id,
    name: snap.name,
    dataURL: snap.dataURL,
  });
});

/* LIST */

/* LIST (with pagination) */
router.get("/", async (req, res) => {
  try {
    const page = Number(req.query.page || 0);
    const limit = Number(req.query.limit || 20);

    const snaps = await CanvasSnapshot.find()
      .sort({ createdAt: -1 })
      .skip(page * limit)
      .limit(limit)
      .select("_id name dataURL createdAt");

    res.json(
      snaps.map((s) => ({
        id: s._id.toString(),
        name: s.name,
        dataURL: s.dataURL,
        createdAt: s.createdAt,
      })),
    );
  } catch (err) {
    console.error("[API] LIST failed:", err);
    res.status(500).json({ error: "Failed to list snapshots" });
  }
});

/* DELETE SNAPSHOT */
router.delete("/:id", async (req, res) => {
  try {
    console.log("[API] DELETE /api/snapshots/" + req.params.id);

    const deleted = await CanvasSnapshot.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: "Not found" });
    }

    res.json({ ok: true });
  } catch (err) {
    console.error("[API] Delete failed:", err);
    res.status(500).json({ error: "Failed to delete snapshot" });
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
