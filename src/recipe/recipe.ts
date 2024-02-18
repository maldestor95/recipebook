// import { recipeType } from './recipe';
import YAML from 'yaml';

export type ingredientType = {
  ingredient: string,
  qty: string | number
}
export type recipeReference = {
  title: string,
  link: string
}
export type recipeType = recipeReference & {
  // title:string,
  // link:string,
  ingredients: [ingredientType],
  instructions: string
}

export class Ingredients {
  list: [ingredientType?]
  constructor() {
    this.list = [];
  }
  addIngredient(newIngredient: ingredientType) {
    this.list.push(newIngredient)
  }
  ingredientsToYAML(): string {
    return YAML.stringify(this.list)
  }
}

export class Recipe {
  title: string | undefined
  filename: string | undefined
  ingredients: Ingredients
  constructor() {
    this.ingredients = new Ingredients()
  }
  setTitle(value: string): void {
    this.title = value
  }
  setFileName(markdownFileName: string) {
    this.filename = markdownFileName
  }
}

export default { Recipe, Ingredients }