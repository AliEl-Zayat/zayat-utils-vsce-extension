import * as vscode from 'vscode';

/**
 * Utility class for interacting with the VS Code environment.
 */
export class VSCodeUtils {
    static getWorkspaceConfigValue<T>(configName: string, key: string): T | undefined {
        return vscode.workspace.getConfiguration(configName).get<T>(key);
    }

    static async showInformationMessage(message: string): Promise<void> {
        await vscode.window.showInformationMessage(message);
    }

    static async showErrorMessage(message: string): Promise<void> {
        await vscode.window.showErrorMessage(message);
    }
}
