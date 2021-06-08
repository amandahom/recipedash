// import Recipe from 'models/Recipes'
// var Recipe = require('models/Recipes')
// import mongoose from 'mongoose'
import Layout from 'assets/components/Layout'
import { nanoid } from 'nanoid'
// import { getSession } from 'next-auth/client'
import React, { useRef, useState } from 'react'

// interface FileInterface {
//   secure_url: string
// }

// let cloudinaryURL = process && process.env && process.env.CLOUDINARY_FETCH_URL ? process.env.CLOUDINARY_FETCH_URL : ''

function CreatePost() {
  const [photo, setPhoto] = useState('')
  const [success, setSuccess] = useState(false)
  const [failure, setFailure] = useState(false)
  const recipeRef = useRef<HTMLInputElement>(null)
  // const [userEmail, setUserEmail] = useState<string | null | undefined>('')

  async function handleSubmit(e: any) {
    e.preventDefault()
    try {
      const res = await fetch('/api/user/user', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
      const data = await res.json()
      let userId = data._id
      console.log(userId)
      uploadDetails(e, userId)
    } catch (err) {
      console.log(err)
    }
  }

  const uploadDetails = async (e: any, userId: string) => {
    let uploadedPhoto: File | string =
      recipeRef && recipeRef.current && recipeRef.current.files && recipeRef.current.files[0]
        ? recipeRef.current.files[0]
        : 'https://res.cloudinary.com/cub95/image/upload/v1622952634/s-o-c-i-a-l-c-u-t-hwy3W3qFjgM-unsplash_1_ra1pkb.jpg'

    let uploadedSource =
      e && e.currentTarget && e.currentTarget.source && e.currentTarget.source.value ? e.currentTarget.source.value : ''

    try {
      if (
        uploadedPhoto !==
        'https://res.cloudinary.com/cub95/image/upload/v1622952634/s-o-c-i-a-l-c-u-t-hwy3W3qFjgM-unsplash_1_ra1pkb.jpg'
      ) {
        const data = new FormData()
        data.append('file', uploadedPhoto)
        data.append('upload_preset', 'recipedash')
        data.append('cloud_name', 'cub95')
        let items = await fetch('https://api.cloudinary.com/v1_1/cub95/upload', {
          method: 'POST',
          body: data,
        }).then(items => items.json())

        console.log(items)

        let cloudinaryFile = items.secure_url
        console.log(cloudinaryFile)
        setPhoto(cloudinaryFile)
        createPost(e, cloudinaryFile, uploadedSource, userId)
      } else {
        let cloudinaryFile = uploadedPhoto
        console.log(cloudinaryFile)
        createPost(e, cloudinaryFile, uploadedSource, userId)
      }

      // createPost(e, uploadedSource, uploadedPhoto)

      // var Recipe = mongoose.model('Recipe')
      // const body = new Recipe({
    } catch (err) {
      setFailure(true)
      console.log(err)
    }
  }

  const createPost = async (e: any, cloudinaryFile: string, uploadedSource: string | null, userId: string) => {
    try {
      console.log(cloudinaryFile)
      let uploadedFile = cloudinaryFile
      console.log(uploadedFile)
      console.log(uploadedSource)
      const body = {
        _id: nanoid(12),
        title: e.currentTarget.title.value,
        createdBy: userId,
        createdAt: new Date(),
        rating: e.currentTarget.rating.value,
        description: e.currentTarget.description.value,
        ingredients: e.currentTarget.ingredients.value,
        instructions: e.currentTarget.instructions.value,
        photo: cloudinaryFile,
        source: uploadedSource,
      }
      console.log(body)

      const res = await fetch('/api/posts/writePost', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      console.log(res)
      setSuccess(true)
    } catch (err) {
      setFailure(true)
      console.log(err)
    }
  }

  return (
    <Layout>
      <div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24">
            <div className="flex-shrink-0">
              <h1 className="text-3xl font-bold text-gray-900">New Recipe</h1>
            </div>
          </div>
        </div>
        <div className="flex h-screen items-center justify-center my-20">
          <div className="grid bg-white rounded-lg shadow-xl w-11/12 md:w-9/12 lg:w-1/2">
            <div className="flex justify-center py-4">
              <div className="flex bg-purple-200 rounded-full md:p-4 p-2 border-2 border-purple-300">
                <img
                  className="w-10 h-10"
                  src="https://cdn4.iconfinder.com/data/icons/food-and-drink-79/108/Noodles-256.png"
                ></img>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="flex">
                <h1 className="text-gray-600 font-bold md:text-2xl text-xl">Post a new recipe!</h1>
              </div>
            </div>
            <form className="contact-form mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mt-5 mx-7">
                <div className="grid grid-cols-1">
                  <label
                    className="flex items-center justify-between uppercase md:text-sm text-xs text-gray-500 text-light font-semibold"
                    htmlFor="title"
                  >
                    Recipe Title<label className="text-red-500 block">Required*</label>
                  </label>
                  <input
                    id="title"
                    name="title"
                    type="title"
                    autoComplete="title"
                    required
                    className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="Enter a title for your recipe."
                  />
                </div>
                <div className="grid grid-cols-1">
                  <label
                    className="flex items-center justify-between uppercase md:text-sm text-xs text-gray-500 text-light font-semibold"
                    htmlFor="rating"
                  >
                    Rating (0-10)<label className="text-red-500 block">Required*</label>
                  </label>
                  <input
                    id="rating"
                    name="rating"
                    type="number"
                    autoComplete="rating"
                    required
                    min="0"
                    max="10"
                    className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="Rate the recipe. 10 is amazing!"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 mt-5 mx-7">
                <label
                  className="flex items-center justify-between uppercase md:text-sm text-xs text-gray-500 text-light font-semibold"
                  htmlFor="description"
                >
                  Description<label className="text-red-500 block">Required*</label>
                </label>
                <input
                  id="description"
                  name="description"
                  type="description"
                  autoComplete="description"
                  required
                  className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Brief description of your recipe."
                />
              </div>

              <div className="grid grid-cols-1 mt-5 mx-7">
                <label
                  className="flex items-center justify-between uppercase md:text-sm text-xs text-gray-500 text-light font-semibold"
                  htmlFor="ingredients"
                >
                  Ingredients<label className="text-red-500 block">Required*</label>
                </label>
                <textarea
                  id="ingredients"
                  name="ingredients"
                  required
                  placeholder="Ingredients"
                  rows={6}
                  className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  defaultValue={''}
                />
              </div>

              <div className="grid grid-cols-1 mt-5 mx-7">
                <label
                  className="flex items-center justify-between uppercase md:text-sm text-xs text-gray-500 text-light font-semibold"
                  htmlFor="instructions"
                >
                  Instructions<label className="text-red-500 block">Required*</label>
                </label>
                <textarea
                  id="instructions"
                  name="instructions"
                  rows={6}
                  required
                  className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Instructions"
                  defaultValue={''}
                />
              </div>

              <div className="grid grid-cols-1 mt-5 mx-7">
                <label
                  className="flex items-center justify-between uppercase md:text-sm text-xs text-gray-500 text-light font-semibold"
                  htmlFor="source"
                >
                  Credit the Chef <label className="text-blue-500 block">Optional*</label>
                </label>
                <input
                  id="source"
                  name="source"
                  type="source"
                  autoComplete="source"
                  className="py-2 px-3 rounded-lg border-2 border-purple-300 mt-1 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Add the recipe's URL."
                />
              </div>

              <div className="grid grid-cols-1 mt-5 mx-7">
                <label className="flex items-center justify-between uppercase md:text-sm text-xs text-gray-500 text-light font-semibold mb-1">
                  Upload Cover Photo<label className="text-blue-500 block">Optional*</label>
                </label>
                {/* <div>
                  <input
                    type="file"
                    onChange={e => setImage(e && e.target && e.target.files && e.target.files[0])}
                  ></input>
                  <button onClick={uploadImage}>Upload</button>
                </div>
                <div>
                  <h1>Uploaded image will be displayed here</h1>
                  <img src={url} />
                </div> */}

                <div className="flex items-center justify-center w-full">
                  <input type="file" name="photo" className="" ref={recipeRef} />
                </div>
                {photo && <img className="block h-40 w-40 my-6" src={photo} />}
                {/* <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col border-4 border-dashed border-gray-400 w-full h-32 hover:bg-gray-200 hover:border-purple-600 group cursor-pointer">
                    <div className="flex flex-col items-center justify-center pt-7">
                      <svg
                        className="w-10 h-10 text-purple-400 group-hover:text-purple-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        ></path>
                      </svg>
                      <p className="text-sm text-gray-500 group-hover:text-purple-600 pt-1 tracking-wider">
                        Click to select a photo
                      </p>
                    </div>
                    <input type="file" className="hidden" name="photo" ref={profilePictureRef} />
                  </label>
                </div> */}
              </div>
              {success && <div className="block text-md text-indigo-600 text-center pb-6">Recipe was posted!</div>}
              {failure && (
                <div className="block text-md text-indigo-600 text-center">
                  Your recipe was not successfully posted. 😞&nbsp;&nbsp;Please try again.
                </div>
              )}
              <div className="flex items-center justify-center  md:gap-8 gap-4 pb-6">
                <a href="/dashboard">
                  <button className="w-auto bg-purple-500 hover:bg-purple-700 rounded-lg shadow-xl font-medium text-white px-4 py-2">
                    Create
                  </button>
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default CreatePost
