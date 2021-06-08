import mongoose from 'mongoose'
import RecipeInterface from 'types/Recipe'

// const { Schema } = mongoose
var Schema = mongoose.Schema

const RecipeSchema = new Schema({
  // export const RecipeSchema = new mongoose.Schema({
  // _id: Schema.Types.ObjectId,
  title: { type: String, required: true },
  createdBy: { type: String, required: false },
  createdAt: { type: Date, required: true },
  ingredients: { type: String, required: true },
  instructions: { type: String, required: true },
  rating: { type: Number, required: true },
  description: { type: String, required: true },
  photo: { type: String, required: false },
  source: { type: String, required: false },
})

// // Virtual for Recipe.
// RecipeSchema
// .virtual('url')
// .get(function () {
//   return '/catalog/recipe/'+this._id;
// });
// mongoose.models = {};
var Recipe = mongoose.model<RecipeInterface>('Recipe', RecipeSchema)
export default Recipe
// module.exports = mongoose.model<RecipeInterface>('Recipe', RecipeSchema)
// export default mongoose.model('Recipe', RecipeSchema)
// module.exports = mongoose.models.Recipe || mongoose.model<RecipeInterface>('Recipe', RecipeSchema)
// module.exports = mongoose.model('Recipe', RecipeSchema)
// module.exports = mongoose.models.Recipe || mongoose.model('Recipe', RecipeSchema)
