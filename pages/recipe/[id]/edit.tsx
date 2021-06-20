// import Recipe from 'models/Recipes'
// var Recipe = require('models/Recipes')
// import mongoose from 'mongoose'
import Layout from 'assets/components/Layout'
// import { getSession } from 'next-auth/client'
import { GetServerSideProps } from 'next'
import React, { useEffect, useRef, useState } from 'react'
import Loading from 'utils/Loading'

// interface FileInterface {
//   secure_url: string
// }

interface PostDataInterface {
  title: string
  ingredients: Array<String>
  instructions: Array<String>
  rating: Number
  description: string
  photo: string
  // _id: string
  source: string
  // url: string
  createdAt: Date
  createdBy: string
}

// let cloudinaryURL = process && process.env && process.env.CLOUDINARY_FETCH_URL ? process.env.CLOUDINARY_FETCH_URL : ''

function UpdatePost(props: any) {
  const [photo, setPhoto] = useState('')
  const [success, setSuccess] = useState(false)
  const [failure, setFailure] = useState(false)
  const recipeRef = useRef<HTMLInputElement>(null)
  const [isLoaded, setIsLoaded] = useState(true)

  async function handleSubmit(e: any) {
    e.preventDefault()
    setIsLoaded(true)
    let recipeId = props.id
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
    let uploadedPhoto: any = recipeRef && recipeRef.current && recipeRef.current.files && recipeRef.current.files[0]
    console.log(uploadedPhoto)
    try {
      const res = await fetch('/api/user/user', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })

      const data = await res.json()
      let userId: string = data._id
      let userEmail: string = data.email
      if (uploadedPhoto === undefined) {
        console.log('test')
        updatePost(
          recipeId,
          recipeTitle,
          userId,
          userEmail,
          recipeRating,
          recipeDescription,
          recipeIngredients,
          recipeInstructions,
          uploadedSource,
        )
      } else {
        let file: string = (await uploadDetails(uploadedPhoto)) || ''

        updateFilePost(
          recipeId,
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
      }
    } catch (err) {
      setFailure(true)
      console.log(err)
    }
  }

  const uploadDetails = async (uploadedPhoto: string) => {
    try {
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

      // createPost(e, uploadedSource, uploadedPhoto)
      // var Recipe = mongoose.model('Recipe')
      // const body = new Recipe({
    } catch (err) {
      setFailure(true)
      console.log(err)
    }
  }

  const updateFilePost = async (
    recipeId: string,
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
      const body = {
        _id: recipeId,
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

      const res = await fetch('/api/posts/updateRecipe', {
        method: 'PUT',
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

  const updatePost = async (
    recipeId: string,
    recipeTitle: string,
    userId: string,
    userEmail: string,
    recipeRating: string,
    recipeDescription: string,
    recipeIngredients: string,
    recipeInstructions: string,
    uploadedSource: string,
  ) => {
    try {
      const body = {
        _id: recipeId,
        title: recipeTitle,
        createdBy: userId,
        creatorEmail: userEmail,
        createdAt: new Date(),
        rating: recipeRating,
        description: recipeDescription,
        ingredients: recipeIngredients,
        instructions: recipeInstructions,
        source: uploadedSource,
        photo: '',
      }

      const res = await fetch('/api/posts/updateRecipe', {
        method: 'PUT',
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
      <div className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24">
            <div className="flex-shrink-0">
              <h1 className="text-3xl font-bold text-gray-900">Edit Recipe</h1>
            </div>
          </div>
        </div>
        <div className="py-20 bg-gray-100">
          <div className="flex items-center justify-center bg-gray-100 h-full">
            <div className="grid bg-white rounded-lg shadow-xl w-11/12 md:w-9/12 lg:w-1/2">
              <div className="flex justify-center py-4">
                <div className="flex bg-green-200 rounded-full md:p-4 p-2 border-2 border-green-300">
                  <img
                    className="w-10 h-10"
                    src="https://cdn0.iconfinder.com/data/icons/fastfood-29/64/hamburger-burger-drink-soft-fastfood-fast-food-256.png"
                  ></img>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="flex">
                  <h1 className="text-gray-600 font-bold md:text-2xl text-xl">Update your recipe</h1>
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
                      className="py-2 px-3 rounded-lg border-2 border-green-300 mt-1 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                      defaultValue={props.title}
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
                      className="py-2 px-3 rounded-lg border-2 border-green-300 mt-1 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                      defaultValue={props.rating}
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
                    className="py-2 px-3 rounded-lg border-2 border-green-300 mt-1 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                    defaultValue={props.description}
                  />
                </div>

                <div className="grid grid-cols-1 mt-5 mx-7">
                  <label
                    className="flex items-center justify-between uppercase md:text-sm text-xs text-gray-500 text-light font-semibold"
                    htmlFor="ingredients"
                  >
                    Ingredients<label className="text-blue-500 block">Optional*</label>
                  </label>
                  <textarea
                    id="ingredients"
                    name="ingredients"
                    placeholder="Ingredients"
                    rows={6}
                    className="py-2 px-3 rounded-lg border-2 border-green-300 mt-1 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                    defaultValue={props.ingredients}
                  />
                </div>

                <div className="grid grid-cols-1 mt-5 mx-7">
                  <label
                    className="flex items-center justify-between uppercase md:text-sm text-xs text-gray-500 text-light font-semibold"
                    htmlFor="instructions"
                  >
                    Instructions<label className="text-blue-500 block">Optional*</label>
                  </label>
                  <textarea
                    id="instructions"
                    name="instructions"
                    rows={6}
                    className="py-2 px-3 rounded-lg border-2 border-green-300 mt-1 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                    placeholder="Instructions"
                    defaultValue={props.instructions}
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
                    className="py-2 px-3 rounded-lg border-2 border-green-300 mt-1 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                    defaultValue={props.source}
                  />
                </div>

                <div className="grid grid-cols-1 mt-5 mx-7">
                  <label className="flex items-center justify-between uppercase md:text-sm text-xs text-gray-500 text-light font-semibold mb-1">
                    Upload Cover Photo<label className="text-blue-500 block">Optional*</label>
                  </label>
                  <div className="mt-1">
                    <input type="file" name="photo" className="" ref={recipeRef} />
                  </div>
                  {photo ? (
                    <div>
                      <label className="flex items-center justify-between uppercase md:text-sm text-xs text-gray-500 text-light font-semibold mb-1">
                        <h1 className="mt-5">Uploaded Image:</h1>
                      </label>
                      {photo && (
                        <img className="max-w-screen-lg mx-auto flex h-40 w-40 my-4 p-2 bg-gray-300" src={photo} />
                      )}
                    </div>
                  ) : (
                    <div>
                      {props && props.photo && (
                        <div>
                          <label className="flex items-center justify-between uppercase md:text-sm text-xs text-gray-500 text-light font-semibold mb-1">
                            <h1 className="mt-5">Current Image:</h1>
                          </label>
                          <img
                            className="max-w-screen-lg mx-auto flex h-40 w-40 my-4 p-2 bg-gray-300"
                            src={props.photo}
                          />
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {success && <div className="block text-md text-indigo-600 text-center pb-2">Recipe was updated!</div>}
                {failure && (
                  <div className="block text-md text-indigo-600 text-center">
                    Your recipe was not successfully updated. 😞&nbsp;&nbsp;Please try again.
                  </div>
                )}
                {isLoaded && (
                  <div className="max-w-screen-lg mx-auto flex h-40 w-40 pl-10 p-2 bg-white">
                    <Loading />
                  </div>
                )}
                <div className="flex items-center justify-center  md:gap-8 gap-4 pb-6">
                  <a href="/dashboard">
                    <button className="w-auto bg-green-500 hover:bg-green-700 rounded-lg shadow-xl font-medium text-white px-4 py-2">
                      Update
                    </button>
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default UpdatePost

export const getServerSideProps: GetServerSideProps = async context => {
  let recipeId = context.query.id
  const res = await fetch(`https://recipedash.amandahom.com/api/posts/${recipeId}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  })

  let items = await res.json()
  let posts: PostDataInterface = {
    title: items.title,
    ingredients: items.ingredients,
    instructions: items.instructions,
    rating: items.rating,
    description: items.description,
    photo: items.photo,
    source: items.source,
    createdAt: items.createdAt,
    createdBy: items.createdBy,
  }
  return {
    props: {
      id: context.query.id,
      title: posts.title,
      ingredients: posts.ingredients,
      instructions: posts.instructions,
      rating: posts.rating,
      description: posts.description,
      photo: posts.photo,
      source: posts.source,
      createdAt: posts.createdAt,
      createdBy: posts.createdBy,
    },
  }
}
