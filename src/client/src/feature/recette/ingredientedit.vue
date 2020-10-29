<template>
<v-container fluid>
    
        <v-row>
            <v-col>Nom Ingrédient</v-col>
            <v-col>Quantité</v-col>
        </v-row>
        <v-row v-for="ingredient in value" :key="ingredient.id" >
            <v-col class="py-0">
                <v-text-field name="ingredientName" v-model="ingredient.nom" dense></v-text-field>
            </v-col>
            <v-col class="py-0">
                <v-text-field name="ingredientQty" v-model="ingredient.qty"  dense></v-text-field>
            </v-col>
            <v-col class="col-1 py-0"><v-icon @click="removeIngredient(ingredient)">mdi-delete-circle-outline</v-icon></v-col>
        </v-row>
        <v-row> 
            <v-col class="py-0">
                <v-text-field name="ingredientName" ref="ingredientName" v-model="newIngredient.nom" dense></v-text-field>
            </v-col>
            <v-col class="py-0">
                <v-text-field name="ingredientQty" v-model="newIngredient.qty"  dense></v-text-field>
            </v-col>
            <v-col class="col-1 py-0"><v-icon 
            @click="addIngredient()"
            @keyup.enter="addIngredient()"
            >
                mdi-plus-circle-outline
            </v-icon></v-col>
        </v-row>
</v-container>
</template>

<script>
    export default {
        props: {
            value: {
                type: Array,
                default: ()=>
                [
                    {nom:'nom ingredients',qty:'qty ingredients'},
                    {nom:'nom ing2',qty:'qty ing2'},
                    {nom:'nom ing3',qty:'qty ing3'}
                    ]
                
            },
        },
        data() {
            return {
                ingredients:this.value,
                newIngredient:{
                    nom:"",
                    qty:""
                }
            }
        },
        methods: {
            addIngredient() {
                this.ingredients.push(this.newIngredient)
                this.newIngredient={nom:"",qty:""}
                this.$refs.ingredientName.focus()
                this.$emit('input',this.ingredients)
            },
            removeIngredient(ingredientToRemove){
                this.ingredients=this.ingredients.filter(ing=>ing.nom!=ingredientToRemove.nom)
                this.$emit('input',this.ingredients)
            }
        },
    }
</script>

<style lang="scss" scoped>
table {background-color: burlywood;}
</style>