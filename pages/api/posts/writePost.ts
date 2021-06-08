import { VercelRequest, VercelResponse } from '@vercel/node'
// var cloudinary = require('cloudinary').v2
// import Recipe from 'models/Recipes'
// import { v2 as cloudinary } from 'cloudinary'
import { connectToDatabase } from 'middleware/mongodb'
import { getSession } from 'next-auth/client'

// const cloudinaryURL: string =
//   process && process.env && process.env.CLOUDINARY_FETCH_URL ? process.env.CLOUDINARY_FETCH_URL.toString() : ''

// const { hostname: cloud_name, username: api_key, password: api_secret } = new URL(cloudinaryURL)

// cloudinary.config({
//   cloud_name,
//   api_key,
//   api_secret,
// })

export default async function insertPost(req: VercelRequest, res: VercelResponse) {
  const session = await getSession({ req })
  if (session) {
    try {
      const { db } = await connectToDatabase()
      // await cloudinary.uploader.upload(req.body.photo)

      // const image = await cloudinary.uploader.upload(req.body.photo, {
      //   width: 512,
      //   height: 512,
      //   crop: 'fill',
      // // })
      // const image = await cloudinary.uploader.upload(req.body.photo)
      // console.log(image)
      // let recipeImage = image && image.secure_url ? image.secure_url.toString() : ''

      await db.collection('posts').insertOne({
        _id: req.body._id,
        title: req.body.title,
        createdBy: req.body.createdBy,
        createdAt: req.body.createdAt,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
        rating: req.body.rating,
        description: req.body.description,
        photo: req.body.photo,
        source: req.body.source,
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
