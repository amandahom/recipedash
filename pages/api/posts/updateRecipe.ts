import { VercelRequest, VercelResponse } from '@vercel/node'
import { connectToDatabase } from 'middleware/mongodb'
import { getSession } from 'next-auth/client'

export default async function updatePost(req: VercelRequest, res: VercelResponse) {
  const session = await getSession({ req })
  if (session) {
    if (req.body.photo === '') {
      try {
        const { db } = await connectToDatabase()
        await db.collection('posts').updateOne(
          { _id: req.body._id },
          {
            $set: {
              title: req.body.title,
              createdBy: req.body.createdBy,
              createdAt: req.body.createdAt,
              ingredients: req.body.ingredients,
              instructions: req.body.instructions,
              rating: req.body.rating,
              description: req.body.description,
              source: req.body.source,
            },
          },
        )
        res.status(201).json(req)
      } catch (err) {
        res.status(400).json({ message: err.message })
      }
    } else {
      try {
        const { db } = await connectToDatabase()
        await db.collection('posts').updateOne(
          { _id: req.body._id },
          {
            $set: {
              title: req.body.title,
              createdBy: req.body.createdBy,
              createdAt: req.body.createdAt,
              ingredients: req.body.ingredients,
              instructions: req.body.instructions,
              rating: req.body.rating,
              description: req.body.description,
              photo: req.body.photo,
              source: req.body.source,
            },
          },
        )
        res.status(201).json(req)
      } catch (err) {
        res.status(400).json({ message: err.message })
      }
    }
  } else {
    res.status(403).json({
      message: 'You are not allowed to view this.',
    })
  }
}
