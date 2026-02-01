// src/commands/colors.js
export const COLOR_COMMANDS = {
  Edit_Colors: "COLOR_EDIT",
  Get_Colors: "COLOR_GET",
  Save_Colors: "COLOR_SAVE",
};

export function colorEdit(ctx) {
  ctx.ui.setState({ activeDialog: "EDIT_COLORS" });
}

export function colorGet(ctx) {
  const input = document.createElement("input");
  input.type = "file";

  // Accept common palette formats (expand later)
  input.accept = ".pal,.gpl,.txt,.css,.scss";

  input.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      ctx.dispatchCommand("COLORS_LOAD_PALETTE", {
        fileName: file.name,
        content: reader.result,
      });
    };

    reader.readAsText(file);
  };

  input.click();
}

export function colorSave(ctx) {
  ctx.ui.setState({ activeDialog: "SAVE_COLORS" });
}
export function colorSavePalette(ctx, payload) {
  const { fileName, fileType } = payload;

  const palette = ctx.palette.getColors();
  // ↑ must already exist, do NOT invent if it doesn't

  let data;
  let mime = "text/plain";
  let extension = "";

  switch (fileType) {
    case "CSS_VARIABLES":
      ({ data, extension } = serializeCSSVariables(palette));
      break;

    case "SCSS_VARIABLES":
      ({ data, extension } = serializeSCSSVariables(palette));
      break;

    case "RIFF_PALETTE":
      ({ data, extension, mime } = serializeRIFFPalette(palette));
      break;

    default:
      console.warn("Unsupported palette format:", fileType);
      return;
  }

  downloadFile(fileName || "colors", extension, data, mime);
}
function downloadFile(name, ext, data, mime) {
  const blob = new Blob([data], { type: mime });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = name.endsWith(ext) ? name : name + ext;
  a.click();

  URL.revokeObjectURL(url);
}
function serializeCSSVariables(palette) {
  let out = ":root {\n";

  palette.forEach((c, i) => {
    out += `  --color-${i}: rgb(${c.r}, ${c.g}, ${c.b});\n`;
  });

  out += "}\n";

  return {
    data: out,
    extension: ".css",
  };
}
function serializeSCSSVariables(palette) {
  let out = "";

  palette.forEach((c, i) => {
    out += `$color-${i}: rgb(${c.r}, ${c.g}, ${c.b});\n`;
  });

  return {
    data: out,
    extension: ".scss",
  };
}
function serializeRIFFPalette(palette) {
  // Binary format — non-trivial
  // Stub only, DO NOT fake it

  throw new Error("RIFF PAL not implemented yet");
}
