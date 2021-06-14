import Modal from 'assets/components/Modal'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Loading from 'utils/Loading'

interface PostDataInterface {
  map(arg0: (posts: PostInterface, index: number) => JSX.Element): React.ReactNode
  title: string
  ingredients: Array<String>
  instructions: Array<String>
  rating: Number
  description: string
  photo: string
  _id: string
  source: string
  createdAt: Date
  createdBy: string
}

interface PostInterface {
  title: string
  ingredients: Array<String>
  instructions: Array<String>
  rating: Number
  description: string
  photo: string
  id: string
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

function UserPosts() {
  const [indivPost, setIndivPost] = useState<PostDataInterface>()
  const [isLoaded, setIsLoaded] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [data, setData] = useState('')
  const [user, setUser] = useState<userInterface>()

  const requestPosts = async () => {
    const res = await fetch('/api/user/userRecipes')
    let items = await res.json()
    let posts: PostDataInterface = items.map((posts: PostDataInterface) => ({
      title: posts.title,
      ingredients: posts.ingredients,
      instructions: posts.instructions,
      rating: posts.rating,
      description: posts.description,
      photo: posts.photo,
      id: posts._id,
      source: posts.source,
      createdAt: posts.createdAt,
      createdBy: posts.createdBy,
    }))

    return {
      posts: posts,
    }
  }

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
    async function getPosts() {
      const postRes = await requestPosts()
      setIndivPost(postRes.posts)
      getUser()
      setIsLoaded(true)
    }
    getPosts()
  }, [])

  const handleModal = async (e: any) => {
    try {
      e.preventDefault()
      let id = e.target.getAttribute('data-tag')
      setData(id)
      setShowModal(true)
    } catch (err) {
      console.log(err)
    }
  }

  function PostCards(indivPost: PostInterface, index: number) {
    return (
      <Link
        href={{
          pathname: '/recipe/[id]',
          query: {
            id: indivPost.id,
          },
        }}
        as={`/recipe/${indivPost.id}`}
      >
        <div className="p-2 min-w-full">
          <div className="flex flex-col cursor-pointer" key={index}>
            <div className="bg-white shadow-md rounded-3xl p-4 transition duration-500 ease-in-out hover:-translate-y-1 hover:scale-105 transform hover:shadow-2xl">
              <div className="flex-none lg:flex">
                <div className="h-full w-full lg:h-48 lg:w-48 lg:mb-0 mb-3">
                  <img
                    src={indivPost.photo}
                    alt="Recipe image"
                    className="w-full object-scale-down lg:object-cover lg:h-48 rounded-2xl"
                  ></img>
                </div>
                <div className="flex-auto ml-3 justify-evenly py-2">
                  <div className="flex flex-wrap">
                    <div className="w-full flex-none text-xs text-indigo-700 font-medium ">Recipe</div>
                    <h2 className="flex-auto text-lg font-medium break-normal">{indivPost.title}</h2>
                    <Link
                      href={{
                        pathname: '/recipe/[id]',
                        query: {
                          id: indivPost.id,
                        },
                      }}
                      as={`/recipe/${indivPost.id}`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 cursor-pointer hover:text-indigo-700 mr-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    </Link>
                  </div>
                  {user && user.firstName ? (
                    <div className="flex mt-2 mb-6 text-sm text-black break-words max-w-xs">
                      <p>
                        <span className="font-bold">Posted by: </span>
                        {user && user.firstName} {user && user.lastName}
                      </p>
                    </div>
                  ) : null}
                  <div className="flex my-2 text-sm text-gray-600 break-all max-w-xs">{indivPost.description}</div>
                  <div className="flex py-4 text-sm text-gray-600">
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
                          strokeWidth={2}
                          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                        />
                      </svg>
                      <p className="">{indivPost.rating}/10</p>
                    </div>
                    <div className="flex-1 inline-flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 mr-2 -ml-6"
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
                        {new Date(indivPost.createdAt).toDateString()}
                        <br />
                        {new Date(indivPost.createdAt).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex p-4 pb-2 border-t border-gray-200 "></div>
                  <div className="inline md:flex space-x-3 text-sm font-medium">
                    <div className="md:flex-auto md:flex space-x-3 justify-end">
                      <div className="px-4 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button
                          type="button"
                          className="w-32 md:w-full h-10 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                          // onClick={e => {
                          //   setOpen(true)
                          //   deletePost(e)
                          // }}
                        >
                          <span className="mr-2">Delete</span>
                          <svg
                            className="w-6 h-6 cursor-pointer"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            // onClick={e => {
                            //   deletePost(e)
                            // }}
                            onClick={e => {
                              handleModal(e)
                            }}
                            data-tag={indivPost.id}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                        <Link
                          href={{
                            pathname: '/recipe/[id]/edit',
                            query: {
                              id: indivPost.id,
                            },
                          }}
                          as={`/recipe/${indivPost.id}/edit`}
                        >
                          <button
                            type="button"
                            className="ml-5 h-10 w-28 sm:w-32 md:w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                            // onClick={() => setOpen(false)}
                          >
                            <span className="mr-2">Edit</span>
                            <svg
                              className="w-6 h-6 cursor-pointer"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                              data-tag={indivPost.id}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    )
  }

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    )
  } else {
    return (
      <div className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-2 sm:px-20 lg:px-8 pt-4 pb-20 lg:pt-8 lg:pb-20">
          {indivPost && (
            <div className="grid gap-8 lg:gap-20 grid-cols-1 md:grid-cols-2 xl:grid-cols-2 place-items-center">
              {indivPost.map((indivPost: PostInterface, index: number) => {
                return <PostCards {...indivPost} key={index} />
              })}
            </div>
          )}
          {showModal ? <Modal handleModal={data} /> : null}
        </div>
      </div>
    )
  }
}

export default UserPosts
