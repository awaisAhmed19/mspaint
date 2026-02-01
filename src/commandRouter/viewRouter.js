import {
  viewToggleToolBox,
  viewToggleColorBox,
  viewToggleStatusBar,
  viewToggleTextToolbar,
  viewZoom,
  viewBitmap,
  viewFullscreen,
} from "../commands/view.js";

export function handleViewCommand(cmd, ctx) {
  switch (cmd) {
    case "VIEW_TOOL_BOX":
      return viewToggleToolBox(ctx);

    case "VIEW_COLOR_BOX":
      return viewToggleColorBox(ctx);

    case "VIEW_STATUS_BAR":
      return viewToggleStatusBar(ctx);

    case "VIEW_TEXT_TOOLBAR":
      return viewToggleTextToolbar(ctx);

    case "VIEW_ZOOM":
      return viewZoom(ctx);

    case "VIEW_BITMAP":
      return viewBitmap(ctx);

    case "VIEW_FULLSCREEN":
      return viewFullscreen(ctx);

    default:
      console.warn("Unhandled view command:", cmd);
  }
}
