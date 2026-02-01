export function fileNew(ctx) {
  ctx.canvasEngine.clear();
}

export function fileSave(ctx) {
  return ctx.persistence.save(ctx.canvasEngine);
}

export function fileOpen(ctx) {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";

  input.addEventListener(
    "change",
    () => {
      const file = input.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          ctx.canvasEngine.clear();
          ctx.canvasEngine.fromImage(img);
        };
        img.src = reader.result;
      };
      reader.readAsDataURL(file);
    },
    { once: true },
  );

  input.click();
}
export function fileSaveAs(ctx) {
  const canvasEngine = ctx.canvasEngine;

  const dataURL = canvasEngine.toDataURL("image/png");

  const filename = prompt("Save As", "image.png") || "image.png";

  const a = document.createElement("a");
  a.href = dataURL;
  a.download = filename;

  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

export async function fileLoadFromURL(ctx) {
  const url = prompt("Enter image URL");
  if (!url) return;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch image");

    const blob = await res.blob();
    const objectURL = URL.createObjectURL(blob);

    const img = new Image();
    img.onload = () => {
      ctx.canvasEngine.clear();
      ctx.canvasEngine.fromImage(img);
      URL.revokeObjectURL(objectURL);
    };
    img.src = objectURL;
  } catch (err) {
    console.error("[FILE] Load from URL failed", err);
    alert("Could not load image from URL");
  }
}

export async function fileUploadToImgur(ctx) {
  const CLIENT_ID = ctx.imgurClientId;
  if (!CLIENT_ID) {
    alert("Imgur Client ID not configured");
    return;
  }

  const dataURL = ctx.canvasEngine.toDataURL("image/png");
  const base64 = dataURL.split(",")[1];

  try {
    const res = await fetch("https://api.imgur.com/3/image", {
      method: "POST",
      headers: {
        Authorization: `Client-ID ${CLIENT_ID}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ image: base64 }),
    });

    const json = await res.json();
    if (!json.success) throw new Error("Upload failed");

    navigator.clipboard.writeText(json.data.link);
    alert("Uploaded! Link copied to clipboard.");
  } catch (err) {
    console.error("[FILE] Imgur upload failed", err);
    alert("Imgur upload failed");
  }
}
//can use some rect to make a windows 98 theme floating window to show the files saved recently on the mongo db server
export function fileManageStorage(ctx) {
  const used = JSON.stringify(localStorage).length;
  const kb = (used / 1024).toFixed(2);

  const choice = confirm(
    `Local storage used: ${kb} KB\n\nClear all stored data?`,
  );

  if (choice) {
    localStorage.clear();
    alert("Storage cleared");
  }
}

//can use some rect to make a windows 98 theme floating window to show the files saved recently on the mongo db server
export function fileRecent(ctx) {
  const recent = JSON.parse(localStorage.getItem("recentFiles") || "[]");

  if (!recent.length) {
    alert("No recent files");
    return;
  }

  const list = recent.map((f, i) => `${i + 1}. ${f.name}`).join("\n");

  const choice = prompt(`Recent Files:\n${list}\n\nOpen which?`);
  const index = Number(choice) - 1;

  if (!recent[index]) return;

  ctx.persistence.loadFromDataURL(ctx.canvasEngine, recent[index].dataURL);
}

export function appExit(ctx) {
  const ok = confirm("Exit application? Unsaved changes may be lost.");
  if (!ok) return;

  window.close();

  // fallback if browser blocks it
  alert("You can now close this tab.");
}
