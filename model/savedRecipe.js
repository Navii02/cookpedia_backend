const mongoose = require("mongoose");


const saverecipeSchema = new mongoose.Schema({
  recipeId: {
    required: true,
    type: String,
  },
  name: {
    required: true,
    type: String,
  },
  image: {
    required: true,
    type: String,
  },
  userId: {
    required: true,
    type: String,
  }
});
const savedrecipes= mongoose.model('savedrecipes',saverecipeSchema);
module.exports = savedrecipes;