import * as vscode from "vscode";
import { registerOpenOclifCommand } from "./commands/openOclifCommand";

export function activate(context: vscode.ExtensionContext) {
  const disposables: vscode.Disposable[] = [];
  disposables.push(registerOpenOclifCommand());

  context.subscriptions.push(...disposables);
}

export function deactivate() {}
