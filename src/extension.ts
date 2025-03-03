import * as vscode from "vscode";
import * as path from "path";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "sf-plugin-dev.oclifOpenCommand",
    async () => {
      const projectPath = getCurrentProjectPath();
      if (!projectPath) {
        return;
      }

      const commands = await readFolderRecursively(
        vscode.Uri.file(path.join(projectPath, "src", "commands")),
      );

      const commandId = await vscode.window.showQuickPick(
        commands.map((c) => c.id),
        { title: "Choose which command to open" },
      );
      const commandFilePath = commands.find((c) => c.id === commandId)?.path;
      if (!commandFilePath) {
        return;
      }

      const document = await vscode.workspace.openTextDocument(commandFilePath);
      await vscode.window.showTextDocument(document);
    },
  );

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}

function getCurrentProjectPath() {
  const workspaceFolders = vscode.workspace.workspaceFolders;
  if (workspaceFolders && workspaceFolders.length > 0) {
    const projectPath = workspaceFolders[0].uri.fsPath;
    return projectPath;
  }
  return null;
}

async function readFolderRecursively(uri: vscode.Uri): Promise<
  {
    id: string;
    path: string;
  }[]
> {
  const paths: {
    id: string;
    path: string;
  }[] = [];
  try {
    const entries = await vscode.workspace.fs.readDirectory(uri);
    for (const [entryUri, fileType] of entries) {
      const entryPath = vscode.Uri.joinPath(uri, entryUri);
      if (fileType === vscode.FileType.Directory) {
        paths.push(...(await readFolderRecursively(entryPath)));
      } else if (fileType === vscode.FileType.File) {
        paths.push({
          id: getCommandIdFromPath(entryPath.path),
          path: entryPath.path,
        });
      }
    }
  } catch (error) {
    console.error(`Error reading folder: ${error}`);
  }
  return paths;
}

function getCommandIdFromPath(filePath: string): string {
  // Normalize the path to ensure consistent separators
  const normalizedPath = filePath.replace(/\\/g, "/");

  // Extract the relevant part of the path
  const commandPath = normalizedPath.match(/src\/commands\/(.+)\.ts$/);

  if (!commandPath || commandPath.length < 2) {
    throw new Error("Invalid command file path");
  }

  // Replace slashes with spaces to form the command ID
  const commandId = commandPath[1].replace(/\//g, " ");

  return commandId;
}
