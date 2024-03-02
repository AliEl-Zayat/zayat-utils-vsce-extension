import fs from "fs/promises";
import * as vscode from "vscode";
import path from "path";

import {
	nativeComponentTemplate,
	nativeIndexTemplate,
	nativeStylesTemplate,
} from "./nativeComponentTemplate";

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
			vscode.window
				.showInputBox({
					placeHolder: "Enter Screen Name",
					prompt: "Enter Screen Name",
					value: "",
				})
				.then((value) => action(typeof value === "string" ? value : "", true));
		})
	);

	context.subscriptions.push(
		vscode.commands.registerCommand("zayat-utilities.createComponent", () => {
			vscode.window
				.showInputBox({
					placeHolder: "Enter component Name",
					prompt: "Enter component Name",
					value: "",
				})
				.then((value) => action(typeof value === "string" ? value : "", false));
		})
	);
}

const createFile = async (
	componentDir: string,
	componentName: string,
	isTS: boolean,
	isScreen: boolean,
	withIndexPattern: boolean
) => {
	try {
		const directory = path.join(componentDir, componentName);
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

// This method is called when your extension is deactivated
export function deactivate() {}
