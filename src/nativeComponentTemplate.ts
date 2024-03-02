import { ComponentTemplateGenerator } from './templates/ComponentTemplateGenerator';

/**
 * Generate a template for the native component.
 * @param componentName - The name of the component.
 * @param isTS - A boolean indicating if it's a TypeScript file.
 * @param isScreen - A boolean indicating if it's a screen component.
 */
export const nativeComponentTemplate = (componentName: string, isTS = false, isScreen = false) => {
    const generator = new ComponentTemplateGenerator(componentName, isTS, isScreen);
    return generator.generateComponentBody();
    const generator = new ComponentTemplateGenerator('', false, isScreen);
    return generator.generateStyles();
};

/**
 * Generate an index template for the native component.
 * @param componentName - The name of the component.
 */
export const nativeIndexTemplate = (componentName: string) => {
    const generator = new ComponentTemplateGenerator(componentName, false, false);
    return generator.generateIndexFileContent();
};
