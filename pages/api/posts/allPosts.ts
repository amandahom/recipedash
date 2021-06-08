import { VercelRequest, VercelResponse } from '@vercel/node'
// import { apiAccess } from 'middleware/data'
import { connectToDatabase } from 'middleware/mongodb'
import { getSession } from 'next-auth/client'

export default async function(req: VercelRequest, res: VercelResponse) {
  const session = await getSession({ req })
  if (session) {
    const { db } = await connectToDatabase()
    const posts = await db
      .collection('posts')
      .find({})
      .sort({ createdAt: -1 })
      .limit(10)
      .toArray()

    res.status(201).json(posts)
  } else {
    res.status(403).json({
      message: 'You are not allowed to view this.',
    })
  }
}
