import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Loading from 'utils/Loading'

// interface PostInterface {
//   posts?: PostDataInterface
// }

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

function Posts() {
  const [indivPost, setIndivPost] = useState<PostDataInterface>()
  const [isLoaded, setIsLoaded] = useState(false)

  const requestPosts = async () => {
    const res = await fetch('/api/posts/allRecipes')
    let items = await res.json()
    let posts: PostDataInterface = items.map((posts: PostDataInterface) => ({
      title: posts.title,
      ingredients: posts.ingredients,
      instructions: posts.instructions,
      rating: posts.rating,
      description: posts.description,
      photo: posts.photo,
      source: posts.source,
      url: posts.url,
      createdAt: posts.createdAt,
      createdBy: posts.createdBy,
      id: posts._id,
    }))

    return {
      posts: posts,
    }
  }

  useEffect(() => {
    async function getPosts() {
      const res = await requestPosts()
      setIndivPost(res.posts)
      setIsLoaded(true)
    }
    getPosts()
  }, [])

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
        <div key={index} id={indivPost.id}>
          <div className="bg-white w-128 h-60 rounded shadow-md flex card text-grey-darkest">
            <img className="w-1/2 h-full rounded-l-sm" src={indivPost.photo}></img>
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
      <div className="p-10 sm:p-20 2xl:p-40 mx-2 md:mx-4 lg:mx-10 pb-10">
        <h1 className="text-2xl">Recipe Posts</h1>
        {indivPost && (
          <div className="grid grid-cols-1 h-screen bg-blue-lightest">
            {indivPost.map((indivPost: PostInterface, index: number) => {
              return <PostCards {...indivPost} key={index} />
            })}
          </div>
        )}
      </div>
    )
  }
}

export default Posts
