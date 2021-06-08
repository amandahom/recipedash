import { VercelRequest, VercelResponse } from '@vercel/node'
import { connectToDatabase } from 'middleware/mongodb'
import { getSession } from 'next-auth/client'

export default async function deletePost(req: VercelRequest, res: VercelResponse) {
  const session = await getSession({ req })
  if (session) {
    try {
      const { db } = await connectToDatabase()
      await db.collection('posts').deleteOne({
        _id: req.body.id,
      })
      res.status(201).json(req)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  } else {
    res.status(403).json({
      message: 'You are not allowed to view this.',
    })
  }
}
