import { VercelRequest, VercelResponse } from '@vercel/node'
import { connectToDatabase } from 'middleware/mongodb'
import { getSession } from 'next-auth/client'

export default async function findUser(req: VercelRequest, res: VercelResponse) {
  let session = await getSession({ req })
  let email: string | null | undefined = session && session.user && session.user.email
  try {
    const { db } = await connectToDatabase()
    // const userRecipes = await db.collection('posts').findOne({
    //   email: email,
    // })
    const userRecipes = await db
      .collection('posts')
      .find({ creatorEmail: email })
      .sort({ createdAt: -1 })
      .limit(10)
      .toArray()
    res.status(201).json(userRecipes)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}
