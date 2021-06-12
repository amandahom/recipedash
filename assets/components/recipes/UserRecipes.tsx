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
  url: string
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
  url: string
  createdAt: Date
  createdBy: string
}

function UserPosts() {
  const [indivPost, setIndivPost] = useState<PostDataInterface>()
  const [isLoaded, setIsLoaded] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [data, setData] = useState('')

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
      url: posts.url,
      createdAt: posts.createdAt,
      createdBy: posts.createdBy,
    }))

    return {
      posts: posts,
    }
  }

  useEffect(() => {
    async function getPosts() {
      const postRes = await requestPosts()
      setIndivPost(postRes.posts)
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
        <div key={index}>
          <div className="bg-white w-128 h-60 rounded shadow-md flex card text-grey-darkest">
            <img className="w-3/12 h-full rounded-l-sm" src={indivPost.photo}></img>
            <div className="w-full flex flex-col">
              <div className="p-4 pb-0 flex-1">
                <h3 className="font-light mb-1 text-grey-darkest">{indivPost.title}</h3>
                <div className="flex items-center mt-4">
                  <div className="pr-2 text-xs">{indivPost.createdBy}</div>
                  <div className="px-2 text-xs">{indivPost.createdAt}</div>
                </div>
                <div className="text-xs flex items-center mb-4">{indivPost.description}</div>
                <div className="text-xs flex items-center mb-4">Rating: {indivPost.rating}</div>
              </div>
              <div className="bg-grey-lighter p-3 flex items-center justify-between transition hover:bg-grey-light">
                {indivPost.source}
              </div>
              <div className="bg-grey-lighter p-3 flex items-center justify-between transition hover:bg-grey-light">
                {indivPost.url}
              </div>
            </div>
            {/* <Link href="/recipe/[id]" as={`/recipe/${indivPost.id}`}> */}
            <Link
              href={{
                pathname: '/recipe/[id]/edit',
                query: {
                  id: indivPost.id,
                },
              }}
              as={`/recipe/${indivPost.id}/edit`}
            >
              <svg
                className="w-16 h-16 cursor-pointer"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                // onClick={e => {
                //   updatePost(e)
                // }}
                data-tag={indivPost.id}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </Link>
            <svg
              className="w-16 h-16 cursor-pointer"
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
      <div className="px-10 sm:px-40 py-10 sm:py-20">
        {indivPost && (
          <div className="grid grid-cols-1 h-screen bg-blue-lightest">
            {indivPost.map((indivPost: PostInterface, index: number) => {
              return <PostCards {...indivPost} key={index} />
            })}
          </div>
        )}
        {showModal ? <Modal handleModal={data} /> : null}
      </div>
    )
  }
}

export default UserPosts
