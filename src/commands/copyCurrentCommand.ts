import * as vscode from "vscode";
import { getActiveFilePath, getCommandIdFromPath } from "../utils";

export function registerCopyCurrentCommand() {
  return vscode.commands.registerCommand(
    "sf-plugin-dev.copyCurrentCommand",
    async () => {
      const commandFilePath = getActiveFilePath();
      if (!commandFilePath) {
        return;
      }

      try {
        await vscode.env.clipboard.writeText(
          getCommandIdFromPath(commandFilePath),
        );
      } catch (err) {
        if (
          err instanceof Error &&
          err.message === "Invalid command file path"
        ) {
          vscode.window.showErrorMessage("This file is not an oclif command.");
        } else {
          throw err;
        }
      }
    },
  );
}
