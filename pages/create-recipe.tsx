// import Recipe from 'models/Recipes'
// var Recipe = require('models/Recipes')
// import mongoose from 'mongoose'
import Layout from 'assets/components/Layout'
import { nanoid } from 'nanoid'
// import { getSession } from 'next-auth/client'
import React, { useEffect, useRef, useState } from 'react'
import Loading from 'utils/Loading'

// interface FileInterface {
//   secure_url: string
// }

// let cloudinaryURL = process && process.env && process.env.CLOUDINARY_FETCH_URL ? process.env.CLOUDINARY_FETCH_URL : ''

function CreatePost() {
  const [photo, setPhoto] = useState('')
  const [success, setSuccess] = useState(false)
  const [failure, setFailure] = useState(false)
  const recipeRef = useRef<HTMLInputElement>(null)
  const [isLoaded, setIsLoaded] = useState(true)

  // const [userEmail, setUserEmail] = useState<string | null | undefined>('')

  async function handleSubmit(e: any) {
    e.preventDefault()
    setIsLoaded(true)
    let uploadedSource: string =
      e && e.currentTarget && e.currentTarget.source && e.currentTarget.source.value ? e.currentTarget.source.value : ''
    let recipeTitle: string = e && e.currentTarget && e.currentTarget.title && e.currentTarget.title.value
    let recipeRating: string = e && e.currentTarget && e.currentTarget.rating && e.currentTarget.rating.value
    let recipeDescription: string =
      e && e.currentTarget && e.currentTarget.description && e.currentTarget.description.value
    let recipeIngredients: string =
      e && e.currentTarget && e.currentTarget.ingredients && e.currentTarget.ingredients.value
    let recipeInstructions: string =
      e && e.currentTarget && e.currentTarget.instructions && e.currentTarget.instructions.value
    try {
      const res = await fetch('/api/user/user', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })

      const data = await res.json()
      let userId: string = data._id
      let userEmail: string = data.email
      console.log(userEmail)
      let file: string = (await uploadDetails()) || ''

      createPost(
        recipeTitle,
        userId,
        userEmail,
        recipeRating,
        recipeDescription,
        recipeIngredients,
        recipeInstructions,
        file,
        uploadedSource,
      )
    } catch (err) {
      setFailure(true)
      console.log(err)
    }
  }

  const uploadDetails = async () => {
    let uploadedPhoto: File | string =
      recipeRef && recipeRef.current && recipeRef.current.files && recipeRef.current.files[0]
        ? recipeRef.current.files[0]
        : 'https://res.cloudinary.com/cub95/image/upload/v1622952634/s-o-c-i-a-l-c-u-t-hwy3W3qFjgM-unsplash_1_ra1pkb.jpg'

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
        let cloudinaryFile: string = items.secure_url
        setPhoto(cloudinaryFile)
        return cloudinaryFile
      } else {
        let cloudinaryFile = uploadedPhoto
        return cloudinaryFile
      }

      // createPost(e, uploadedSource, uploadedPhoto)
      // var Recipe = mongoose.model('Recipe')
      // const body = new Recipe({
    } catch (err) {
      setFailure(true)
      console.log(err)
    }
  }

  const createPost = async (
    recipeTitle: string,
    userId: string,
    userEmail: string,
    recipeRating: string,
    recipeDescription: string,
    recipeIngredients: string,
    recipeInstructions: string,
    file: string,
    uploadedSource: string,
  ) => {
    try {
      console.log(userEmail)
      const body = {
        _id: nanoid(12),
        title: recipeTitle,
        createdBy: userId,
        creatorEmail: userEmail,
        createdAt: new Date(),
        rating: recipeRating,
        description: recipeDescription,
        ingredients: recipeIngredients,
        instructions: recipeInstructions,
        photo: file,
        source: uploadedSource,
      }

      console.log(body)

      const res = await fetch('/api/posts/writeRecipe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      console.log(res)
      setSuccess(true)
      setIsLoaded(false)
    } catch (err) {
      setFailure(true)
      console.log(err)
    }
  }

  useEffect(() => {
    async function loadPosts() {
      setIsLoaded(false)
    }
    loadPosts()
  }, [])

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
        <div className="flex h-screen items-center justify-center mt-40 mb-60">
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
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
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
                <div className="mt-1">
                  <input type="file" name="photo" className="" ref={recipeRef} />
                </div>
                {photo && <img className="max-w-screen-lg mx-auto flex h-40 w-40 my-4 p-2 bg-gray-300" src={photo} />}
              </div>

              {success && <div className="block text-md text-indigo-600 text-center pb-2">Recipe was posted!</div>}
              {failure && (
                <div className="block text-md text-indigo-600 text-center">
                  Your recipe was not successfully posted. 😞&nbsp;&nbsp;Please try again.
                </div>
              )}
              {isLoaded && (
                <div className="max-w-screen-lg mx-auto flex h-40 w-40 pl-10 p-2">
                  <Loading />
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
