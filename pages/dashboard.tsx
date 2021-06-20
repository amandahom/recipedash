import Layout from 'assets/components/Layout'
import Posts from 'assets/components/recipes/RecipeCards'
import { useEffect, useState } from 'react'
import Loading from 'utils/Loading'

function Dashboard() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  })

  if (!isLoaded) {
    return (
      <div className="bg-gray-100">
        <div className="flex justify-center items-center h-screen bg-gray-100">
          <Loading />
        </div>
      </div>
    )
  } else {
    return (
      <Layout>
        <div className="bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-24">
              <div className="flex-shrink-0">
                <h1 className="text-3xl font-bold text-gray-900">Dashboard: All Recipes</h1>
              </div>
              {/* <div className="block -mr-2 flex-shrink-0">
                <a
                  className="py-4 px-4 text-md md:text-lg transition duration-300 ease-in-out focus:outline-none focus:shadow-outline bg-gray-800 hover:bg-gray-700 text-white font-normal rounded"
                  href="/create-recipe"
                >
                  Add a new recipe
                  <svg
                    className="w-8 h-8 cursor-pointer inline -mr-2 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </a>
              </div> */}
            </div>
          </div>
        </div>
        <div>
          <Posts />
        </div>
      </Layout>
    )
  }
}

export default Dashboard

// export async function getServerSideProps(ctx: any) {
// const session = await getSession(ctx)
// console.log(session)
// let user = session && session.user
// console.log(user)
// let plainUserData = JSON.parse(JSON.stringify(user))
// console.log(plainUserData)
// if (!session) {
//   ctx.res.writeHead(302, { Location: '/' })
//   ctx.res.end()
//   return {}
// }

// return {
//   props: {
//     plainUserData,
//   },
// }

// return { props: { plainUserData } }
// }
