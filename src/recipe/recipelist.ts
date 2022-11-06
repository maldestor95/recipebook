// generation of  Recipe list
import { date } from 'joi'
import { RecipeUtility /*convertMarkdownRecipe, recipeYAMLvalidation, validaterecipefolder*/ } from "./RecipeUtility"
import constants from './constants'
import { Recipe, recipeType } from './recipe'
import { readFile, readdir, writeFile } from 'fs/promises'
import * as Yaml from 'yaml'
type resultType = {
    data: any | null,
    err: string | null
}

function extractTitleAndLink(recipe: recipeType): { title: string, link: string } {
    return { title: recipe.title, link: recipe.link }
}

/**
 * Parse a directory to provide 
 * @param dirName directory Name to parse
 * @param dirFiles list of files within the directory
 * @returns array of promises for Recipe Type
 */
function parseDirectoryPromise(dirName:string, dirFiles: string[]): Array<Promise<recipeType>> {
    const analyseFiles: Array<Promise<recipeType>> = []
    dirFiles.forEach(fileName => {
        if (fileName != 'recipelist.yml')
            analyseFiles.push(parseRecipe(`${dirName}/${fileName}`))
    })
    return analyseFiles
}
/**
 * 
 * @param dirName 
 * @param destPath 
 * @returns 
 */
export const generateRecipelistFile = async function (dirName: string,destPath:string): Promise<resultType> {
    // TODO parse all files
    // extract data
    // build file
    return new Promise((resolve, reject) => {
        readdir(dirName)
        .then(directoryFiles => 
            Promise.all(parseDirectoryPromise(dirName,directoryFiles)) )
        .then(recipeArray => {
            const answer = recipeArray.map(recipe => extractTitleAndLink(recipe))
            writeFile(destPath,Yaml.stringify (answer))
            resolve({ data: Yaml.stringify (answer), err: null })
        })
        .catch((err) => {
            reject({ err: err, data: `cannot access folder ${dirName}` })
        })
    });
}
/**
 * Parse a MD file, extract  fields (title,link,ingredients) and instruction
 * @param filename Recipe file to parse
 * @returns Promise for a recipeType
 */
export const parseRecipe = async function (filename: string): Promise<recipeType> {
    return new Promise((resolve, reject) => {
        const response = readFile(filename, { encoding: 'utf-8' })
            .then((fileData: string) => {
                const parsedFile = RecipeUtility.extractRecipeFromMarkdown(fileData)
                if (parsedFile.err) reject({ err: `${filename}:\n${parsedFile.err}` })

                const isYamlValid = RecipeUtility.recipeYAMLvalidation(parsedFile.data.yml)
                if (!isYamlValid.err) {
                    const parsedYML = Yaml.parse(<string>parsedFile.data.yml)
                    resolve(
                        {
                            ...parsedYML, instructions: parsedFile.data.md
                        }
                    )
                }
                reject({ err: isYamlValid.err })
            })
            .catch((err) => {
                reject({ err: JSON.stringify(err) })
            })
    })

}