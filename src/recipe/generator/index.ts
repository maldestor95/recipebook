#!/usr/bin / env ts - node

import { questionsArray } from '../../utils/inquirer';
import lib from "./lib"
import fs from "fs/promises"


async function promptQuestions() {
    console.log('------------- Generateur de recettes -------------')
    console.log('- Créera un fichier vierge pret à etre compléter -')
    console.log('--------------------------------------------------')
    const questions = [
        "Quel est le nom de la recette?",
        "Combien d\'ingrédients different y-a-il?"
    ]
    return questionsArray(questions, "")
}
async function ProcessAnswers(answers: string[]) {
    /*création fichier recipe pré - rempli
    - recipe name
        - file name generated from recipe name
            - contenu YML avec les ingrédients
                - zone mardown vide
    update recipe list
    retourne si c'était un succès
    */
    const originalRecipeName = answers[0]
    const recipeName = lib.sanitizeRecipeName(answers[0])
    const numberOfIngredients = Math.round(<number><unknown>answers[1])
    const { fname, content } = lib.createBlankfile(originalRecipeName, numberOfIngredients);
    const recipePath = `./recipe/${fname}`
    await fs.writeFile(recipePath, content)
    console.log(`file ${fname} created`)
    await lib.updateYMLlist(`./recipe/recipelist.yml`, fname, originalRecipeName)




}

async function menu() {
    const answers = await promptQuestions().then(res => ProcessAnswers(res))

    // await (ProcessAnswers(answers))
}

export default menu



