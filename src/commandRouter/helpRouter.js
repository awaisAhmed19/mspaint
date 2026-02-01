import { helpTopics, aboutPaint } from "../commands/help.js";

export function handleHelpCommand(cmd, ctx) {
  switch (cmd) {
    case "HELP_TOPICS":
      return helpTopics(ctx);

    case "HELP_ABOUT":
      return aboutPaint(ctx);

    default:
      console.warn("Unhandled help command:", cmd);
  }
}
