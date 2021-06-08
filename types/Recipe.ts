import mongoose from 'mongoose'

export interface RecipeInterface extends mongoose.Document {
  title: string
  createdBy: string
  createdAt: Date
  ingredients: string
  instructions: string
  rating: number
  description: string
  photo?: string
  source?: string
  url?: string
}

export default RecipeInterface
