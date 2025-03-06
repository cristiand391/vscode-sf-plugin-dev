import * as vscode from "vscode";

export function getCurrentProjectPath() {
  const workspaceFolders = vscode.workspace.workspaceFolders;
  if (workspaceFolders && workspaceFolders.length > 0) {
    const projectPath = workspaceFolders[0].uri.fsPath;
    return projectPath;
  }
  return null;
}

type CommandInfo = {
  id: string;
  path: string;
};

export async function readCommands(uri: vscode.Uri): Promise<CommandInfo[]> {
  const cmds: CommandInfo[] = [];
  try {
    const entries = await vscode.workspace.fs.readDirectory(uri);
    for (const [entryUri, fileType] of entries) {
      const entryPath = vscode.Uri.joinPath(uri, entryUri);
      if (fileType === vscode.FileType.Directory) {
        cmds.push(...(await readCommands(entryPath)));
      } else if (fileType === vscode.FileType.File) {
        cmds.push({
          id: getCommandIdFromPath(entryPath.path),
          path: entryPath.path,
        });
      }
    }
  } catch (error) {
    console.error(`Error reading folder: ${error}`);
  }
  return cmds;
}

export function getCommandIdFromPath(path: string): string {
  // Normalize the path to ensure consistent separators
  const normalizedPath = path.replace(/\\/g, "/");

  // Extract the relevant part of the path
  const commandPath = normalizedPath.match(/src\/commands\/(.+)\.ts$/);

  if (!commandPath || commandPath.length < 2) {
    throw new Error("Invalid command file path");
  }

  // Replace slashes with spaces to form the command ID
  const commandId = commandPath[1].replace(/\//g, " ");

  return commandId;
}
