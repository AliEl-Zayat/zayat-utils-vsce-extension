import { nativeStylesTemplate, nativeIndexTemplate } from '../nativeComponentTemplate';

export class ComponentTemplateGenerator {
    private componentName: string;
    private isTS: boolean;
    private isScreen: boolean;

    constructor(componentName: string, isTS: boolean, isScreen: boolean) {
        this.componentName = componentName;
        this.isTS = isTS;
        this.isScreen = isScreen;
    }

    generateComponentBody(): string {
        const screenOrComponentImport = this.isScreen
            ? "import { SafeAreaView } from 'react-native-safe-area-context';"
            : "import { View } from 'react-native'";
        const screenOrComponentReturn = this.isScreen
            ? `        <SafeAreaView style={styles.container}>
        </SafeAreaView>`
            : `        <View style={styles.container}>
        </View>`;
        const constantToReturn = this.isTS
            ? `type T${this.componentName}Props = {};

const ${this.componentName} = ({}:T${this.componentName}Props) => {`
            : `const ${this.componentName} = ({}) => {`;

        return `import React from 'react';
${screenOrComponentImport}

import getStyles from './${this.componentName}.styles';

${constantToReturn}
    const styles = getStyles();
    return (
${screenOrComponentReturn}
    );
};

export default ${this.componentName};
`;
    }

    generateStyles(): string {
        return nativeStylesTemplate(this.isScreen);
    }

    generateIndexFileContent(): string {
        return nativeIndexTemplate(this.componentName);
    }
}
    generateStyles(): string {
        return nativeStylesTemplate(this.isScreen);
    }

    generateIndexFileContent(): string {
        return nativeIndexTemplate(this.componentName);
    }
}
    /**
     * Generate the content of the index file.
     * @returns The generated index file content.
     */
    generateIndexFileContent(): string {
        return nativeIndexTemplate(this.componentName);
    }
}
