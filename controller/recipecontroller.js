const Recipe = require('../model/recipeModel')

exports.getAllRecipeController=async(req,res)=>{
    console.log("inside getAllRecipeController");
    try{
        const allRecipes=await Recipe.find()
        res.status(200).json(allRecipes)
    }catch(err){
        res.status(401).json({message: err.message});
    }
    
}

//get a recipe

exports.getRecipeDetails= async(req, res)=>{
    console.log('inside recipe details');
    console.log(req.params);
    
    
    const {id}=req.params
    try{
        const recipedetails= await Recipe.findById({_id:id})
        res.status(207).json(recipedetails)
    }catch(err)
{
    res.status(401).json(err)
}}

exports.relatedRecipes=async (req,res)=>{
    console.log(req.query);
    
    const cuisine=req.query.cuisine
    try {
        const allrelatedRecipes =await Recipe.find({cuisine})
        res.status(200).json(allrelatedRecipes)
        
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.addRecipeController= async(req,res)=>{
    const {name,ingredients,instructions,prepTimeMinutes,cookTimeMinutes,servings,difficulty,caloriesPerServing,cuisine,image,mealType}=req.body
    try{
    const existingRecipe = await Recipe.findOne({name})
    if(existingRecipe){
        res.status(406).json("recipe already exists in our collection !! add another")

    }
    else{
        const newRecipe = await Recipe({
            name,ingredients,instructions,prepTimeMinutes,cookTimeMinutes,servings,difficulty,caloriesPerServing,cuisine,image,mealType
        })
        await newRecipe.save()
        res.status(200).json(newRecipe)
    }
}catch(e) {
    res.status(401).json(e)
}
}
exports.updateRecipeController = async (req,res)=>{
    console.log("Inside updateRecipeController");
    // get id of recipe should be updated
    const {id} = req.params
    // get update recipe details from req.body
    const {name,ingredients,instructions,prepTimeMinutes,cookTimeMinutes,servings,difficulty,cuisine,caloriesPerServing,image,mealType} = req.body
    //find recipe name is already exist
    try{
       //update recipe - findbyidandupdate
       const updatedRecipe = await Recipe.findByIdAndUpdate({_id:id},{
        name,ingredients,instructions,prepTimeMinutes,cookTimeMinutes,servings,difficulty,cuisine,caloriesPerServing,image,mealType
    },{new:true})
    await updatedRecipe.save()
    res.status(200).json(updatedRecipe)
    }catch(err){
        res.status(401).json(err)
    }
}

//deleteRecipe
exports.removeRecipeController = async (req,res)=>{
    // console.log("Inside removeRecipeController");
    // get recipe id
    const {id} = req.params
    //remove recipe from model - findByIdandDelete
    try{
        const removeRecipe = await Recipe.findByIdAndDelete({_id:id})
        res.status(200).json(removeRecipe)
    }catch(err){
        res.status(401).json(err)
    }
}