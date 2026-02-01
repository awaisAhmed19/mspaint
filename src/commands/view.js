export const VIEW_COMMANDS = {
  Tool_Box: "VIEW_TOOL_BOX",
  View_Box: "VIEW_COLOR_BOX",
  Status_Bar: "VIEW_STATUS_BAR",
  Text_Toolbar: "VIEW_TEXT_TOOLBAR",

  Zoom: "VIEW_ZOOM",
  View_Bitmap: "VIEW_BITMAP",
  FullScreen: "VIEW_FULLSCREEN",
};

export default VIEW_COMMANDS;

export function viewZoom(ctx) {
  const ui = ctx.ui;

  ui.setState({
    zoomed: !ui.zoomed,
    showToolBox: ui.zoomed ? true : false,
    showColorBox: ui.zoomed ? true : false,
    showStatusBar: ui.zoomed ? true : false,
  });
}

export function viewBitmap(ctx) {
  const ui = ctx.ui;

  ui.setState({
    viewBitmap: !ui.viewBitmap,

    // hide UI chrome
    showToolBox: ui.viewBitmap ? true : false,
    showColorBox: ui.viewBitmap ? true : false,
    showStatusBar: ui.viewBitmap ? true : false,
  });
}

export function viewFullscreen(ctx) {
  const ui = ctx.ui;

  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen?.();
    ui.setState({ fullscreen: true });
  } else {
    document.exitFullscreen?.();
    ui.setState({ fullscreen: false });
  }
}

export function viewToggleToolBox(ctx) {
  const ui = ctx.ui;
  ui.setState({ showToolBox: !ui.showToolBox });
}

export function viewToggleColorBox(ctx) {
  const ui = ctx.ui;
  ui.setState({ showColorBox: !ui.showColorBox });
}

export function viewToggleStatusBar(ctx) {
  const ui = ctx.ui;
  ui.setState({ showStatusBar: !ui.showStatusBar });
}

export function viewToggleTextToolbar(ctx) {
  const ui = ctx.ui;
  ui.setState({ showTextToolbar: !ui.showTextToolbar });
}
