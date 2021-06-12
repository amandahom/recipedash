import Layout from 'assets/components/Layout'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
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
  // url: string
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
  const [isLoaded, setIsLoaded] = useState(false)

  // const getPost = async () => {
  //   try {
  //     setRecipeId(props.id)
  //     let recipeEndpoint = `/api/posts/${recipeId}`
  //     const res = await fetch(recipeEndpoint, {
  //       method: 'GET',
  //       headers: { 'Content-Type': 'application/json' },
  //     })

  //     let items = await res.json()
  //     console.log(items)
  //     let posts: PostDataInterface = {
  //       title: items.title,
  //       ingredients: items.ingredients,
  //       instructions: items.instructions,
  //       rating: items.rating,
  //       description: items.description,
  //       photo: items.photo,
  //       source: items.source,
  //       url: items.url,
  //       createdAt: items.createdAt,
  //       createdBy: items.createdBy,
  //     }

  //     return {
  //       posts: posts,
  //     }
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

  useEffect(() => {
    async function getRecipe() {
      // const postRes = await getPost()
      // console.log(postRes)
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
            </div>
          </div>
          <div className="p-10 sm:p-20 2xl:p-40 mx-2 md:mx-4 lg:mx-10 pb-10">
            <Link
              href={{
                pathname: '/recipe/[id]',
                query: {
                  id: props.id,
                },
              }}
              as={`/recipe/${props.id}`}
            >
              <div id={props.id}>
                <div className="bg-white w-128 h-60 rounded shadow-md flex card text-grey-darkest">
                  <img className="w-1/2 h-full rounded-l-sm" src={props.photo}></img>
                  <div className="w-full flex flex-col">
                    <div className="p-4 pb-0 flex-1">
                      <h3 className="font-light mb-1 text-grey-darkest">{props.title}</h3>
                      <div className="flex items-center mt-4">
                        <div className="pr-2 text-xs">{props.createdBy}</div>
                        <div className="px-2 text-xs">{props.createdAt}</div>
                      </div>
                      <div className="text-xs flex items-center mb-4">{props.description}</div>
                      <div className="text-xs flex items-center mb-4">Rating: {props.rating}</div>
                    </div>
                    <div className="bg-grey-lighter p-3 flex items-center justify-between transition hover:bg-grey-light">
                      {props.source}
                    </div>
                    <div className="bg-grey-lighter p-3 flex items-center justify-between transition hover:bg-grey-light">
                      {props.url}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </Layout>
    )
  }
}

export default Recipe

export const getServerSideProps: GetServerSideProps = async context => {
  let recipeId = context.query.id
  const res = await fetch(`http://localhost:3000/api/posts/${recipeId}`, {
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
