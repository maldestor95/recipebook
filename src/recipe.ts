import YAML from 'yaml';


function createRecipe(){

}

export type ingredient={
    ingredient: string,
    qty : string |number 
}

export class Ingredients{
  list:[ingredient?]
  constructor(){
    this.list=[];
  }
  addIngredient(newIngredient: ingredient){
      this.list.push(newIngredient)
  }
  ingredientsToYAML():string{
      return YAML.stringify(this.list)
  }
}

export class Recipe{
  title: string|undefined
  filename : string|undefined
  ingredients: Ingredients
  constructor(){
    this.ingredients = new Ingredients()
  }
  setTitle(value:string):void {
    this.title=value
  }
  setFileName(markdownFileName:string){
    this.filename=markdownFileName
  }
}