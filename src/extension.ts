import fs from "fs/promises";
import * as vscode from "vscode";
import path from "path";

import {
	nativeComponentTemplate,
	nativeIndexTemplate,
	nativeStylesTemplate,
} from "./nativeComponentTemplate";

/**
 * This function activates the extension.
 * @param context - The extension context.
 */
export function activate(context: vscode.ExtensionContext) {
	const folderPath = vscode.workspace.workspaceFolders
		? vscode.workspace.workspaceFolders[0].uri.fsPath
		: "";
	const screensPath = path.join(folderPath, "src", "screens");
	const componentsPath = path.join(folderPath, "src", "components");

	const action = async (value: string, isScreen: boolean) => {
		const isTS = vscode.workspace
			.getConfiguration("zayat-utilities")
			.get<boolean>("isTS");
		const withIndexPattern = vscode.workspace
			.getConfiguration("zayat-utilities")
			.get<boolean>("withIndexPattern");
		await createFile(
			isScreen ? screensPath : componentsPath,
			typeof value === "string" ? value : "",
			isTS as boolean,
			true,
			withIndexPattern as boolean
		)
			.then((res) => vscode.window.showInformationMessage(JSON.stringify(res)))
			.catch((err) => {
				vscode.window.showErrorMessage(err);
			});
	};

	context.subscriptions.push(
		vscode.commands.registerCommand("zayat-utilities.isTS", () => {
			const isTS = vscode.workspace
				.getConfiguration("zayat-utilities")
				.get<boolean>("isTS");
			vscode.workspace
				.getConfiguration("zayat-utilities")
				.update("isTS", !isTS);
		})
	);

	context.subscriptions.push(
		vscode.commands.registerCommand("zayat-utilities.withIndexPattern", () => {
			const withIndexPattern = vscode.workspace
				.getConfiguration("zayat-utilities")
				.get<boolean>("withIndexPattern");
			vscode.workspace
				.getConfiguration("zayat-utilities")
				.update("withIndexPattern", !withIndexPattern);
		})
	);

	context.subscriptions.push(
		vscode.commands.registerCommand("zayat-utilities.createScreen", () => {
			VSCodeUtils.showInputBox("Enter Screen Name", "Enter Screen Name", "")
				.then((value) => action(value, true));
		})
	);

	context.subscriptions.push(
		vscode.commands.registerCommand("zayat-utilities.createComponent", () => {
			VSCodeUtils.showInputBox("Enter component Name", "Enter component Name", "")
				.then((value) => action(value, false));
		})
	);
}

/**
 * Create a file in the specified directory with the given name.
 * @param componentDir - The directory path.
 * @param componentName - The name of the component.
 * @param isTS - A boolean indicating if it's a TypeScript file.
 * @param isScreen - A boolean indicating if it's a screen component.
 * @param withIndexPattern - A boolean indicating if an index pattern should be created.
 */
const createFile = async (
	componentDir: string,
	componentName: string,
	isTS: boolean,
	isScreen: boolean,
	withIndexPattern: boolean
) => {
	try {
		const directory = path.join(componentDir, componentName);
			/**
	 * Create a directory path by joining the specified directory and component name.
	 * @param directory - The directory path.
	 * @param componentName - The name of the component directory.
	 */
	const directoryToCreate = path.join(directory, `${componentName}`);

		await fs.mkdir(directory, { recursive: true });
		if (withIndexPattern) {
			await fs.appendFile(
				`${componentDir}/index.${isTS ? "ts" : "js"}`,
				`export { default as ${componentName} } from './${componentName}';\n`
			);
		}
		await fs.appendFile(
			`${directoryToCreate}.${isTS ? "tsx" : "jsx"}`,
			nativeComponentTemplate(componentName, isTS, isScreen)
		);

		await fs.appendFile(
			`${directoryToCreate}.styles.${isTS ? "ts" : "js"}`,
			nativeStylesTemplate(isScreen)
		);
		await fs.appendFile(
			`${directory}/index.${isTS ? "ts" : "js"}`,
			nativeIndexTemplate(componentName)
		);

		return directory;
	} catch (error) {
		console.log(error);
	}
};

/**
 * This method is called when your extension is deactivated.
 */
export function deactivate() {}
