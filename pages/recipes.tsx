import Layout from 'assets/components/Layout'
import UserPosts from 'assets/components/recipes/UserRecipes'

function userRecipes() {
  return (
    <Layout>
      <div className="bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-24">
            <div className="flex-shrink-0">
              <h1 className="text-3xl font-bold text-gray-900">Your Recipes</h1>
            </div>
          </div>
        </div>
        <div>
          <UserPosts />
        </div>
      </div>
    </Layout>
  )
}

export default userRecipes
