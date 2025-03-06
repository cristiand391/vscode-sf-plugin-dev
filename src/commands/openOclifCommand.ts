import * as vscode from "vscode";
import * as path from "path";
import { getCurrentProjectPath, readCommands } from "../utils";

export function registerOpenOclifCommand() {
  return vscode.commands.registerCommand(
    "sf-plugin-dev.openOclifCommand",
    async () => {
      const projectPath = getCurrentProjectPath();
      if (!projectPath) {
        return;
      }

      const commands = await readCommands(
        vscode.Uri.file(path.join(projectPath, "src", "commands")),
      );

      const commandId = await vscode.window.showQuickPick(
        commands.map((c) => c.id),
        { placeHolder: "Command ID (type to search)" },
      );
      if (!commandId) {
        return;
      }

      // non-null assertion is safe b/c ID from quickpick came from `commands` arr.
      const commandFilePath = commands.find((c) => c.id === commandId)!.path;

      // TODO: could we open the command at the `run` method position?
      // IME, most of the times I open a command -> go to `run` method (in neovim, btw)
      const document = await vscode.workspace.openTextDocument(commandFilePath);
      await vscode.window.showTextDocument(document);
    },
  );
}
