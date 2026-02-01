export const UI_COMMANDS = {
  OPEN_DIALOG: "UI_OPEN_DIALOG",
  CLOSE_DIALOG: "UI_CLOSE_DIALOG",
};

export function uiOpenDialog(ctx, dialogId) {
  ctx.ui.setState({
    activeDialog: dialogId,
  });
}

export function uiCloseDialog(ctx) {
  ctx.ui.setState({
    activeDialog: null,
  });
}
