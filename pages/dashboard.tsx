import Layout from 'assets/components/Layout'
import Posts from 'assets/components/recipes/RecipeCards'
import { getSession } from 'next-auth/client'
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

export async function getServerSideProps(ctx: any) {
  const session = await getSession(ctx)
  let user = session && session.user
  if (!session) {
    ctx.res.writeHead(302, { Location: '/' })
    ctx.res.end()
    return {}
  }

  return {
    props: {
      user: user && user.name,
    },
  }
}
