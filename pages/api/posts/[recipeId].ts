import { VercelRequest, VercelResponse } from '@vercel/node'
import { connectToDatabase } from 'middleware/mongodb'

export default async function findRecipe(req: VercelRequest, res: VercelResponse) {
  const id = req.query

  const recipeId: string = id.recipeId.toString()

  try {
    const { db } = await connectToDatabase()
    const recipe = await db.collection('posts').findOne({ _id: recipeId })
    res.status(201).json(recipe)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}
