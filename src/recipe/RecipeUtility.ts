import * as Joi from 'joi';
import * as Yaml from 'yaml';

/**
 * Utilities for Recipe management
 */
export class RecipeUtility {
    constructor() { }
    static extractRecipeFromMarkdown = function (mdData: string): { err: string | null; data: { yml: string; md: string; }; } {

        const startYamlPosition = mdData.indexOf('---');
        if (startYamlPosition < 0)
            return { err: 'no Yaml Data at the beginning of the markdown document', data: { yml: "", md: "" } };

        const endYamlPosition = mdData.indexOf('...');
        if (endYamlPosition < startYamlPosition)
            return { err: 'no Yaml Data at the beginning of the markdown document', data: { yml: "", md: "" } };

        const extractYmlPart = mdData.substring(0, endYamlPosition + 3);
        const extractMdPart = mdData.substring(endYamlPosition + 3);

        return { err: null, data: { yml: extractYmlPart, md: extractMdPart } };
    };
    static recipeYAMLvalidation = function (yml: string | null): { err: string | null; yml: object | null; } {
        // Joi helps validating a yaml structure
        const schema = Joi.object({
            title: Joi.string(),
            link: Joi.string(),
            ingredients: Joi.array().items({
                ingredient: Joi.string(),
                qty: [Joi.string(), Joi.number()]
            })
                .min(1)
        });
        const parsedYML = Yaml.parse(<string>yml);
        const valid = schema.validate(parsedYML);
        // console.log("valid:",valid)
        if (valid.error) {
            // console.log(valid.error)
            return { err: valid.error.message, yml: null };
        }
        return { err: null, yml: parsedYML };
    };
}
