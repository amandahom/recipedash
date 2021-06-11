import Layout from 'assets/components/Layout'
import { GetServerSideProps } from 'next'
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
  // _id: string
  source: string
  url: string
  createdAt: Date
  createdBy: string
}

// interface PostInterface {
//   title: string
//   ingredients: Array<String>
//   instructions: Array<String>
//   rating: Number
//   description: string
//   photo: string
//   id: string
//   source: string
//   url: string
//   createdAt: Date
//   createdBy: string
// }

const Recipe = (props: any) => {
  const [recipeId, setRecipeId] = useState('')
  // const [id, setId] = useState(!!props)
  const [isLoaded, setIsLoaded] = useState(false)

  const setIdValue = async () => {
    setRecipeId(props.id)
  }

  const updatePost = async (id: string) => {
    try {
      // e.preventDefault()

      // const body = {
      //   id: e.target.getAttribute('data-tag'),
      // }

      const body = {
        id: id,
      }

      const res = await fetch('/api/posts/updateRecipe', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      console.log(res)
    } catch (err) {
      console.log(err)
    }
  }

  const getPost = async (recipeId: string) => {
    try {
      const res = await fetch(`/api/posts/${recipeId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })

      let items = await res.json()
      console.log(items)
      // let posts: PostDataInterface = items.map((posts: PostDataInterface) => ({
      //   title: posts.title,
      //   ingredients: posts.ingredients,
      //   instructions: posts.instructions,
      //   rating: posts.rating,
      //   description: posts.description,
      //   photo: posts.photo,
      //   source: posts.source,
      //   url: posts.url,
      //   createdAt: posts.createdAt,
      //   createdBy: posts.createdBy,
      // }))

      // return {
      //   posts: posts,
      // }
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    async function getRecipe() {
      setIdValue()
      const postRes = await getPost(recipeId)
      console.log(postRes)
      setIsLoaded(true)
    }
    getRecipe()
  }, [])

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loading />
      </div>
    )
  } else {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24">
            <div className="flex-shrink-0">
              <h1 className="text-3xl font-bold text-gray-900">Recipe: {props.title} </h1>
              <div id={props.id}>{props.id}</div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default Recipe

export const getServerSideProps: GetServerSideProps = async context => {
  return {
    props: {
      id: context.query.id,
    },
  }
}
