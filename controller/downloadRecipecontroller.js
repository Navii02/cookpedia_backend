const e = require('express')
const downloadrecipes = require('../model/downloadModel')

exports.downloadrecipesController=async(req,res)=>{
    const {id}=req.params
    const userId=req.userId
    const {name,image,cuisine}=req.body
    //console.log(id,userId,name,image,cuisine);
    
    try {
        const existingRecipe=await  downloadrecipes.findOne({recipeId:id})
        if (existingRecipe){
            existingRecipe.count+=1
            await existingRecipe.save()
            res.status(200).json(existingRecipe)
        }else{
            const newrecipe =new downloadrecipes({
                recipeId:id,recipeName:name,recipeImage:image,recipeCuisine:cuisine,count:1,userId
            })
            await newrecipe.save()
            res.status(200).json(newrecipe)
        }
    } catch (error) {
        res.status(401).json(error)
        
    }
}
exports.userdownloadlist=async(req,res)=>{
    const userId= req.userId
    try {
        const userdownload=await downloadrecipes.find({userId})
        res.status(200).json(userdownload)
    } catch (error) {
        res.status(401).json(error)
        
    }

}

exports.getalldownloadlistcontroller=async(req,res)=>{
    try {
        const alldownload =await downloadrecipes.find()
        res.status(200).json(alldownload)
    } catch (error) {
        res.status(401).json(error)
    }

}