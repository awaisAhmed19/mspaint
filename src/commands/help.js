export const HELP_COMMANDS = {
  Help_Topics: "HELP_TOPICS",
  About_Paint: "HELP_ABOUT",
};

// commands/help.js
export function helpTopics(ctx) {
  ctx.ui.setState({ activeDialog: "HELP_TOPICS" });
}

export function aboutPaint(ctx) {
  ctx.ui.setState({ activeDialog: "HELP_ABOUT" });
}
