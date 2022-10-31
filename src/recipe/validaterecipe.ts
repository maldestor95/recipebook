import { readFile, readdir } from "fs/promises";
import * as Joi from 'joi';
import * as Yaml from 'yaml'
import constants from './constants'
import { existsSync } from 'fs';

type recipeValidationType = {
    err: Joi.ValidationError | null
    data: { yml: string | null, md: string | null }
}
type validateRecipeOption = {
    yml: boolean,
    md: boolean,
}
/**
 * Utilities for Recipe management
 */
export class RecipeUtility {
    constructor() { }
    static extractRecipeFromMarkdown = function (mdData: string): { err: string | null, data: { yml: string, md: string } } {

        const startYamlPosition = mdData.indexOf('---');
        if (startYamlPosition < 0) return { err: 'no Yaml Data at the beginning of the markdown document', data: { yml: "", md: "" } }

        const endYamlPosition = mdData.indexOf('...');
        if (endYamlPosition < startYamlPosition) return { err: 'no Yaml Data at the beginning of the markdown document', data: { yml: "", md: "" } }

        const extractYmlPart = mdData.substring(0, endYamlPosition + 3);
        const extractMdPart = mdData.substring(endYamlPosition + 3);

        return { err: null, data: { yml: extractYmlPart, md: extractMdPart } }
    }
    static recipeYAMLvalidation = function (yml: string | null): { err: string | null, yml: object | null } {
        // Joi helps validating a yaml structure
        const schema = Joi.object({
            title: Joi.string(),
            link: Joi.string(),
            ingredients: Joi.array().items({
                ingredient: Joi.string(),
                qty: [Joi.string(), Joi.number()]
            })
                .min(1)
        })
        const parsedYML = Yaml.parse(<string>yml)
        const valid = schema.validate(parsedYML)
        // console.log("valid:",valid)
        if (valid.error) {
            // console.log(valid.error)
            return { err: valid.error.message, yml: null }
        }
        return { err: null, yml: parsedYML }
    }
}

export async function validaterecipefolder (recipePath: string): Promise<boolean> {
        let validaterecipePromise: Array<Promise<recipeValidationType>> = []
        if (!existsSync(recipePath)) { return false }
        await readdir(recipePath,{withFileTypes:true})
        .then(direntItem => {
            const filenames= direntItem.filter(dItem=>dItem.isFile)
            for (let filename of filenames) {
                if (filename.name!='recipelist.yml')
                validaterecipePromise.push(validaterecipe(`${recipePath}${filename.name}`))
            }
        })
        .catch(err => {
            throw(err)
        })
        
        let conclusion=false
    
        await Promise.all(validaterecipePromise)
        .then(validate=>{conclusion=true})
        .catch((err=>{ console.log(err)
            conclusion= false
        }))

        return true
    }

export async function validaterecipe (filename: string): Promise<recipeValidationType> {
    return new Promise((resolve, reject) => {
        const response = readFile(filename, { encoding: 'utf-8' })
            .then((fileData: string) => {
                const parsedFile = RecipeUtility.extractRecipeFromMarkdown(fileData)
                if (parsedFile.err) reject({ err: `${filename}:\n${parsedFile.err}` })

                const isYamlValid = RecipeUtility.recipeYAMLvalidation(parsedFile.data.yml)
                if (!isYamlValid.err) {
                    resolve(
                        {
                            err: null,
                            data: {
                                yml: parsedFile.data.yml,
                                md: parsedFile.data.md
                            }
                        }
                    )
                }
                reject({ err: { filename, yamlvalidation: isYamlValid.err } })
            })
            .catch((err) => {
                console.log(filename, err);

                reject({ err: JSON.stringify({ err, filename }) })
            })
    })
}
/*export const validaterecipefolder = async function (): Promise<boolean> {
    let validaterecipePromise: Array<Promise<recipeValidationType>> = []
    await readdir(constants.recipePath)
        .then(filenames => {
            for (let filename of filenames) {
                if (filename != 'recipelist.yml')
                    validaterecipePromise.push(validaterecipe(`${constants.recipePath}${filename}`))
            }
        })
        .catch(err => {
            throw (err)
        })

    let conclusion = false

    await Promise.all(validaterecipePromise)
        .then(validate => { conclusion = true })
        .catch((err => {
            console.log(err)
            conclusion = false
        }))

    return conclusion
}
*/
export const createRecipeArray = async function (): Promise<Array<{ title: string, link: string }>> {
    let recipeArrayPromise: Array<Promise<recipeValidationType>> = []
    await readdir(constants.recipePath)
        .then(filenames => {
            for (let filename of filenames) {
                if (filename != 'recettelist.yml') recipeArrayPromise.push(validaterecipe(`${constants.recipePath}${filename}`))
            }
        })
        .catch(err => {
            throw (err)
        })

    let conclusion: Array<{ title: string, link: string }> = []


    await Promise.all(recipeArrayPromise)
        .then(ymlstringArray => {
            // let ymldata=ymlstringArray.map(ymlstring=>{
            //     console.log(ymlstring)
            //     const parsedYML= Yaml.parse(<string>ymlstring)
            //     return {title:parsedYML.title, link:parsedYML.link}
            // })
            // return ymldata
            // let t = ymlstringArray[1]
            // console.log(t?t.yml:'none')
            return ymlstringArray[2]
        })
        .then(res => { console.log(res) })
        .catch((err => {
            console.log(err)
            // conclusion= false
        }))

    return conclusion
}
/*export const generateRecipelist=async function():Promise<resultType> {
    return new Promise((resolve, reject) => {
        validaterecipefolder()
        .then((status)=>{
            if (status==false) reject ({err:"validation of recipes showed error"})// create table while parsing file
        })
        .then((datatable)=>{
            //  generate file
            resolve({data:"ok",err:null})
        })
        .catch((err:resultType)=>{
            reject(err)
        })
    });
}
*/

