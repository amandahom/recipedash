import { VercelRequest, VercelResponse } from '@vercel/node'
import { connectToDatabase } from 'middleware/mongodb'
import { ObjectId } from 'mongodb'
import { getSession } from 'next-auth/client'

export default async function findUser(req: VercelRequest, res: VercelResponse) {
  const session = await getSession({ req })
  if (session) {
    try {
      const { db } = await connectToDatabase()
      const id = req.query
      const userId: string = id.toString()
      var o_id = new ObjectId(userId)
      const user = await db.collection('users').findOne({
        _id: o_id,
      })
      res.status(201).json(user)
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  } else {
    res.status(403).json({
      message: 'You are not allowed to view this.',
    })
  }
}
