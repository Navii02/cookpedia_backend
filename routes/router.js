const express = require('express');
const recipecontroller =require('../controller/recipecontroller');
const testimonyController = require('../controller/testimonyController');
const userController = require('../controller/userControlller');
const downloadController = require('../controller/downloadRecipecontroller');
const saveController = require('../controller/saveRecipeController');
const jwtMiddleware = require('../middleware/jwtMiddleware');
const savedrecipes = require('../model/savedRecipe');
const router = new express.Router();



router.get('/all-recipes',recipecontroller.getAllRecipeController)
//add-testimony

router.post('/add-testimony',testimonyController.addTestimonyController)

router.post('/register',userController.AddUserController)

router.post('/login',userController.loginController)

router.get('/recipe/:id/view',jwtMiddleware,recipecontroller.getRecipeDetails)

router.get('/related-recipes',jwtMiddleware,recipecontroller.relatedRecipes)

router.post('/recipe/:id/download',jwtMiddleware,downloadController.downloadrecipesController)
router.post('/recipe/:id/save',jwtMiddleware,saveController.addtosavedRecipe)

router.get('/saved-recipes',jwtMiddleware,saveController.getsavedRecipes)

router.delete(`/deletesavedrecipe/:id`,jwtMiddleware,saveController.deletesavedrecipes)


router.get('/userdownloadedrecipe',jwtMiddleware,downloadController.userdownloadlist)


router.post('/user/edit',jwtMiddleware,userController.userupdatecontroller)

router.get('/all-approved-feedbacks',testimonyController.getAllApprovedFeedBackController)

router.get('/all-users',jwtMiddleware,userController.getAlluserController)
router.get('/download-list',jwtMiddleware,downloadController.getalldownloadlistcontroller)

router.post('/add-recipe',jwtMiddleware,recipecontroller.addRecipeController)
router.get("/all-feedback", jwtMiddleware, testimonyController.getAllFeedbackController)

router.get("/feedback/:id/update",jwtMiddleware,testimonyController.updateFeedbackStatusContoller)



module.exports = router