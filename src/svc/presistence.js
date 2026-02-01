const API = "http://localhost:3000/api/snapshots";

function saveToLocalMachine(dataURL, filename = "image.png") {
  const a = document.createElement("a");
  a.href = dataURL;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export function createPersistence(dispatchCommand, ctx) {
  async function save(canvasEngine) {
    const dataURL = canvasEngine.toDataURL();

    // 1️⃣ server save
    fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "untitled",
        dataURL,
      }),
    })
      .then(() => {
        console.log("[PERSIST] Saved to server");

        // 🔥 refresh Manage Storage if needed
        dispatchCommand("IMAGE_LIST_REMOTE", ctx);
      })
      .catch((err) => console.error("[PERSIST] Server save failed", err));

    // 2️⃣ local machine save
    saveToLocalMachine(dataURL);

    console.log("[PERSIST] Local + server save triggered");
  }

  async function loadLatest(canvasEngine) {
    const res = await fetch(`${API}/latest`);

    if (!res.ok) {
      console.warn("[PERSIST] No snapshot on server");
      return;
    }

    const snap = await res.json();

    const img = new Image();
    img.onload = () => canvasEngine.fromImage(img);
    img.src = snap.dataURL;
  }

  return { save, loadLatest };
}
