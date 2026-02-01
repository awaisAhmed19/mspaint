// server/index.js

// server/index.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import snapshots from "./routes/snapshots.js";

const app = express();

// =====================
// config
// =====================
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/mspaint";

// =====================
// middleware
// =====================
app.use(cors());
app.use(express.json({ limit: "15mb" }));

// =====================
// routes
// =====================
app.use("/api/snapshots", snapshots);

// =====================
// database
// =====================
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Mongo connected"))
  .catch((err) => {
    console.error("Mongo connection error:");
    console.error(err);
    process.exit(1);
  });

// =====================
// server
// =====================
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
