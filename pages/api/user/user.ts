import { VercelRequest, VercelResponse } from '@vercel/node'
import { connectToDatabase } from 'middleware/mongodb'
import { getSession } from 'next-auth/client'

export default async function findUser(req: VercelRequest, res: VercelResponse) {
  let session = await getSession({ req })
  let email: string | null | undefined = session && session.user && session.user.email
  try {
    const { db } = await connectToDatabase()
    const user = await db.collection('users').findOne({
      email: email,
    })
    res.status(201).json(user)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}
