import fs from "fs/promises";
import path from "path";

export async function createComponentFiles(
	componentsPath: string,
	componentName: string,
	isTS: boolean
): Promise<string> {
	componentsPath = componentsPath.substring(1, componentsPath.length - 1);

	const componentDir = path.join(componentsPath, componentName);

	const componentTemplate = `import React from 'react';
import { View, Text } from 'react-native';
import getStyles from './${componentName}.styles';

const ${componentName} = () => {
  const styles = getStyles();

  return (
    <View style={styles.container}>
      <Text>${componentName}</Text>
    </View>
  );
};

export default ${componentName};
`;

	const componentStylesTemplate = `import { StyleSheet } from 'react-native';

export default function getStyles() {
  return StyleSheet.create({
    container: {
      // styles
    },
  });
};
`;

	const componentIndexTemplate = `export { default } from './${componentName}';`;

	try {
		await fs.mkdir(componentDir);

		await Promise.all([
			fs.writeFile(
				path.join(componentDir, `${componentName}.${isTS ? "tsx" : "jsx"}`),
				componentTemplate
			),
			fs.writeFile(
				path.join(
					componentDir,
					`${componentName}.styles.${isTS ? "ts" : "js"}`
				),
				componentStylesTemplate
			),
			fs.writeFile(
				path.join(componentDir, `index.${isTS ? "ts" : "js"}`),
				componentIndexTemplate
			),
		]);

		return path.join(componentsPath, componentName);
	} catch (error) {
		throw error;
	}
}
