import Layout from 'assets/components/Layout'
import { GetServerSideProps } from 'next'
// import Link from 'next/link'
// import findRecipe from 'pages/api/posts/[recipeId]'
import React, { useEffect, useState } from 'react'
import Loading from 'utils/Loading'

interface PostDataInterface {
  title: string
  ingredients: Array<String>
  instructions: Array<String>
  rating: Number
  description: string
  photo: string
  source: string
  createdAt: Date
  createdBy: string
}

interface userInterface {
  id: string
  email: string
  firstName?: string
  lastName?: string
  photo?: string
}

const Recipe = (props: any) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [user, setUser] = useState<userInterface>()

  async function getUser() {
    try {
      const res = await fetch('/api/user/user', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })

      const items = await res.json()
      let user: userInterface = {
        id: items._id,
        email: items.email,
        firstName: items.firstName,
        lastName: items.lastName,
        photo: items.photo,
      }

      setUser(user)
      return
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    async function getRecipe() {
      getUser()
      setIsLoaded(true)
    }
    getRecipe()
  }, [])

  if (!isLoaded) {
    return (
      <div className="bg-gray-100 flex justify-center items-center h-screen">
        <Loading />
      </div>
    )
  } else {
    return (
      <Layout>
        <div className="bg-gray-100 min-h-screen">
          <div className="max-w-7xl mx-auto px-1 sm:px-6 lg:px-8 pb-20 lg:pb-10">
            <div className="flex items-center justify-between h-24">
              <div className="flex-shrink-0">
                <h1 className="text-3xl font-bold text-black">Recipe:</h1>
              </div>
            </div>

            <div className="flex items-center p-5 lg:p-10 overflow-hidden relative">
              <div className="w-full max-w-6xl rounded bg-white shadow-xl p-5 lg:p-10 mx-auto text-black relative md:text-left">
                <div className="md:flex items-center -mx-10">
                  <div className="w-full md:w-1/2 px-10 mb-10 md:mb-0">
                    <div className="relative">
                      <img
                        src={props.photo}
                        className="w-full relative z-10 w-full object-scale-down lg:object-cover lg:h-120 rounded-2xl"
                      ></img>
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 px-10">
                    <div className="flex py-4 text-sm">
                      <div className="flex-1 inline-flex items-center">
                        <h1 className="font-bold uppercase text-2xl text-black break-words max-w-xs">{props.title}</h1>

                        <div className="flex-1 inline-flex justify-end">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                            />
                          </svg>
                          <p className="text-lg">{props.rating}/10</p>
                        </div>
                      </div>
                    </div>
                    {user && user.firstName ? (
                      <div className="flex mt-2 text-sm text-black break-words max-w-xs">
                        <p>
                          <span className="font-bold">Posted by: </span>
                          {user && user.firstName} {user && user.lastName}
                        </p>
                      </div>
                    ) : null}
                    <div className="flex text-sm text-black">
                      <div className="flex-1 inline-flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          ></path>
                        </svg>
                        <p className="block">
                          {new Date(props.createdAt).toDateString()}&nbsp;
                          {new Date(props.createdAt).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                    <div className="my-4">
                      <p className="text-md break-words max-w-xs md:max-w-sm">{props.description}</p>
                    </div>
                    {props && props.ingredients ? (
                      <div className="my-4">
                        <span className="font-bold text-md md:text-lg break-words max-w-xs md:max-w-sm">
                          Ingredients:
                        </span>
                        <br />
                        <p className="text-sm">{props.ingredients}</p>
                      </div>
                    ) : null}
                    {props && props.instructions ? (
                      <div className="my-4">
                        <span className="font-bold text-sm md:text-lg break-words max-w-xs md:max-w-sm">
                          Instructions:
                        </span>
                        <br />
                        <p className="text-sm">{props.instructions}</p>
                      </div>
                    ) : null}
                    {props && props.source ? (
                      <div className="py-4">
                        <a
                          className="text-sm transition duration-300 ease-in-out focus:outline-none focus:shadow-outline bg-indigo-600 hover:bg-indigo-900 text-white font-normal py-3 px-4 rounded"
                          href={props.source}
                          target="_blank"
                        >
                          Source Website
                        </a>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default Recipe

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
