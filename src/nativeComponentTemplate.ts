import { ComponentTemplateGenerator } from './templates/ComponentTemplateGenerator';

/**
 * This file provides templates for generating native components.
 */
export const nativeComponentTemplate = (componentName: string, isTS = false, isScreen = false) => {
    const generator = new ComponentTemplateGenerator(componentName, isTS, isScreen);
    return generator.generateComponentBody();
    const generator = new ComponentTemplateGenerator('', false, isScreen);
    return generator.generateStyles();
};

export const nativeIndexTemplate = (componentName: string) => {
    const generator = new ComponentTemplateGenerator(componentName, false, false);
    return generator.generateIndexFileContent();
};
