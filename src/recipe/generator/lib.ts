import fs from "fs/promises"
import yaml from 'yaml';
import { YAMLSeq } from "yaml/types";

function generatorRecipe() {
    /*TODO générateur de recette.
        questions
        
            - recipe name
            - ingredients  
                -demander le nombre d'ingrédients pour creer des champs vides?
                - ajouter 1 par 1 jusqu'à ce qu'il n'y en ai plus?
        création fichier recipe pré-rempli
            - recipe name
            - file name generated from recipe name
            - contenu YML avec les ingrédients
            - zone mardown vide
        update recipe list
        retourne si c'était un succès
    */
    const questions = [
        {
            name: 'recipeName',
            message: 'Quel est le nom de la recette?'
        },
        {
            name: 'ingredientsCount',
            message: 'Combien d\'ingrédients different y-a-il?',
        },
    ]
    /*inquirer
        .prompt(questions)
        .then(async (answers) => {
            const { fname, content } = createBlankfile(sanitizeRecipeName(answers.recipeName), answers.ingredientsCount);
            const recipePath = `./recipe/${fname}`
            console.log(content, fname)
            await fs.writeFile(recipePath, content)
            await updateYMLlist(`./recipe/recipelist.yml`, answers.recipeName, fname)
        });
    */
}


export const createBlankfile = (recipeName: string, numberOfIngredients: number) => {
    const template = `
---
title: ${recipeName}
link:  ${(sanitizeRecipeName(recipeName))}

ingredients:
${prepareIngredients(numberOfIngredients)}  
...
`
    return { fname: sanitizeRecipeName(recipeName), content: template }


}

const prepareIngredients = (number: number) => {
    let ingredientsString = ''
    for (let index = 0; index < number; index++) {
        ingredientsString += `- ingredient: \n`
        ingredientsString += `  qty: \n`
    }
    return ingredientsString
}

export const sanitizeRecipeName = (name: string) => {


    const illegalRe = /[/?<>\\:*|"]/g;
    const reservedRe = /^\.+$/;
    const windowsReservedRe = /^(con|prn|aux|nul|com\d|lpt\d)(\..*)?$/i;
    const windowsTrailingRe = /[. ]+$/;
    const oddcharRe = /[\s"àçéè&()\[\]']/g

    function sanitize(input: string, replacement: string) {
        if (typeof input !== 'string') {
            throw new Error('Input must be string');
        }
        const sanitized = input
            .replace(illegalRe, replacement)
            .replace(reservedRe, replacement)
            .replace(windowsReservedRe, replacement)
            .replace(windowsTrailingRe, replacement)
            .replace(oddcharRe, replacement);
        return sanitized;
    }

    return `${sanitize(name, "")}.md`.toLowerCase()
}

type recipeDesc =
    {
        title: string,
        link: string
    }
const updateYMLlist = async (ymlfile: string, filename: string, recipeName: string) => {
    //open file

    let data: YAMLSeq
    try {
        let fileContents = await fs.readFile(ymlfile, 'utf8');
        data = <YAMLSeq>yaml.parseDocument(fileContents).contents;
        //console.log(Array.isArray(data))

        //console.log(data);
    } catch (e) {
        console.log(JSON.stringify(e));
        throw (e);
    }
    //add data
    data.add({
        "title": recipeName,
        "link": filename
    })
    //console.log(JSON.stringify(data));
    //write file
    await fs.writeFile(ymlfile, yaml.stringify(data))
    console.log(`update ${ymlfile} with the recipe ${recipeName}`)

}


export default { createBlankfile, sanitizeRecipeName, updateYMLlist }
