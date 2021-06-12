import { VercelRequest, VercelResponse } from '@vercel/node'
import { connectToDatabase } from 'middleware/mongodb'

export default async function findRecipe(req: VercelRequest, res: VercelResponse) {
  const id = req.query

  const recipeId: string = id.recipeId.toString()

  // const session = await getSession({ req })
  // if (session) {
  try {
    const { db } = await connectToDatabase()
    const recipe = await db.collection('posts').findOne({ _id: recipeId })
    res.status(201).json(recipe)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
  // } else {
  //   res.status(403).json({
  //     message: 'You are not allowed to view this.',
  //   })
  // }
}
