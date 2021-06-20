import Layout from '../assets/components/Layout'

export default function Home() {
  return (
    <div>
      <Layout>
        <header className="bg-center bg-fixed bg-no-repeat bg-cover h-screen">
          <style jsx>{`
            header {
              background-image: url(https://res.cloudinary.com/cub95/image/upload/v1622419246/pratiksha-mohanty-V0xp-dTS3z0-unsplash_xdk1rr.jpg);
            }
          `}</style>
          <div className="h-screen flex items-center justify-center">
            <div className="mx-2 text-center">
              <h1 className="text-white text-6xl py-4">RecipeDash</h1>
              <h2 className="text-white text-2xl md:text-2xl leading-tight p-4">A home for recipes.</h2>
            </div>
          </div>
        </header>
      </Layout>
    </div>
  )
}
