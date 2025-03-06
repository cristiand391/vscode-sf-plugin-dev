import * as vscode from "vscode";
import { registerOpenOclifCommand } from "./commands/openOclifCommand";
import { registerCopyCurrentCommand } from "./commands/copyCurrentCommand";

export function activate(context: vscode.ExtensionContext) {
  const disposables: vscode.Disposable[] = [];
  disposables.push(registerOpenOclifCommand());
  disposables.push(registerCopyCurrentCommand());

  context.subscriptions.push(...disposables);
}

export function deactivate() {}
