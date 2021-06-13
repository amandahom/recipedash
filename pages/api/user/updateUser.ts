import { VercelRequest, VercelResponse } from '@vercel/node'
import { connectToDatabase } from 'middleware/mongodb'
import { ObjectId } from 'mongodb'
import { getSession } from 'next-auth/client'

export default async function updateUser(req: VercelRequest, res: VercelResponse) {
  const session = await getSession({ req })
  if (session) {
    try {
      const { db } = await connectToDatabase()
      var id = req.body._id
      var o_id = new ObjectId(id)
      await db.collection('users').updateOne(
        { _id: o_id },
        {
          $set: {
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            updatedAt: req.body.updatedAt,
            photo: req.body.photo,
          },
        },
      )
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
