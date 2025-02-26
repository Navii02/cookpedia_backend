const mongoose=require('mongoose');

const recipeSchema = new mongoose.Schema({
    name:{
        required: true,
        type:String
    },
    ingredients:{
        type:Array,
        required: true,
    },
    instructions:{
        type:Array,
        required: true,
    },
    prepTimeMinutes:{
        type:Number,
        required: true,
    },
    cookTimeMinutes:{
        type:Number,
        required: true,
    },
    servings:{
        type:Number,
        required: true,
    },
    difficulty:{
        type:String,
        required: true,
    },
    caloriesPerServing:{
        type:Number,
        required: true,
    },
    cuisine:{
        type:String,
        required: true,
    },
    image:{
        type:String,
        required: true,
    },
    mealType:{
        type:Array,
        required: true,
    },

})
const recipes=mongoose.model('recipes', recipeSchema)
module.exports = recipes