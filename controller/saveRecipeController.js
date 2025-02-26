const savedrecipes =require('../model/savedRecipe')

exports.addtosavedRecipe = async(req,res)=>{
    const {id}=req.params
 
    
    const userId=req.userId
   
    
    const {name,image}=req.body
 
    
    try {
        const existingRecipe = await savedrecipes.findOne({recipeId:id,userId})
        if(existingRecipe){
       
        res.status(406).json("Selected recipe is already in your collection")
        }else{
            const newRecipe=new savedrecipes({
                recipeId:id,name,image,userId
            })
            await newRecipe.save()
            res.status(200).json(newRecipe)
        }

        
    } catch (error) {
        res.status(401).json(error)
    }

}
exports.getsavedRecipes=async(req,res)=>{
    const userId=req.userId
    try {
        const savedRecipes= await savedrecipes.find({userId})
res.status(200).json(savedRecipes)
    } catch (error) {
        res.status(401).json(error)
    }

}
exports.deletesavedrecipes=async(req,res)=>{
    const {id}=req.params
    try {
      const removesavedrecipes=await savedrecipes.findByIdAndDelete({_id:id}) 
      res.status(200).json(removesavedrecipes)
    } catch (error) {
      res.status(401).json(error)  
    }
}