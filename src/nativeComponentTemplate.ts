export const nativeComponentTemplate = (
	componentName: string,
	isTS = false,
	isScreen = false
) => {
	const screenOrComponentImport = isScreen
		? "import { SafeAreaView } from 'react-native-safe-area-context';"
		: "import { View } from 'react-native'";
	const screenOrComponentReturn = isScreen
		? `        <SafeAreaView style={styles.container}>
        </SafeAreaView>`
		: `        <View style={styles.container}>
        </View>`;

	const constantToReturn = isTS
		? `type T${componentName}Props = {};

const ${componentName} = ({}:T${componentName}Props) => {`
		: `const ${componentName} = ({}) => {`;

	return `import React from 'react';
${screenOrComponentImport}

import getStyles from './${componentName}.styles';

${constantToReturn}
    const styles = getStyles();
    return (
${screenOrComponentReturn}
    );
};

export default ${componentName};
`;
};

export const nativeStylesTemplate = (isScreen = false) => {
	return `import { StyleSheet } from 'react-native';

export default function getStyles() {
    return StyleSheet.create({
        container: {${isScreen ? "\n        	flex: 1," : ""}
        },
    });
}
`;
};

export const nativeIndexTemplate = (componentName: string) => {
	return `export { default } from './${componentName}';\n`;
};
