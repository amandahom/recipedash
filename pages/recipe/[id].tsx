import Layout from 'assets/components/Layout'

const Recipe = () => {
  const updatePost = async (e: any) => {
    try {
      e.preventDefault()

      const body = {
        id: e.target.getAttribute('data-tag'),
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

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          <div className="flex-shrink-0">
            <h1 className="text-3xl font-bold text-gray-900">Recipe: </h1>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Recipe
