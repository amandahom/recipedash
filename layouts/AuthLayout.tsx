export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="min-h-screen flex items-stretch text-white">
        <div
          id="sign-in-image"
          className="lg:flex w-1/2 hidden bg-gray-500 bg-no-repeat bg-cover relative items-center"
          style={{
            backgroundImage: `url("https://res.cloudinary.com/cub95/image/upload/v1622848575/lindsay-cotter-9J7sHieVFi0-unsplash_1_aw3qmq.jpg")`,
          }}
        >
          <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
          <div className="w-full px-24 z-10">
            <h1 className="text-4xl font-bold tracking-wide text-center">A home for recipes</h1>
            <p className="text-2xl my-4 text-center">Store your favorite recipes in a unique way.</p>
          </div>
        </div>
        <div className="lg:w-1/2 w-full flex items-center justify-center text-center md:px-16 px-0 z-0 bg-indigo-200">
          <div
            className="absolute lg:hidden z-10 inset-0 bg-gray-500 bg-no-repeat bg-cover items-center"
            style={{
              backgroundImage: `url("https://res.cloudinary.com/cub95/image/upload/v1622848575/lindsay-cotter-9J7sHieVFi0-unsplash_1_aw3qmq.jpg")`,
            }}
          >
            <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
          </div>
          <div className="w-full py-6 z-20">
            {children}
            <div>
              <h1 className="mt-2 px-10 text-lg text-white lg:text-black py-4">
                Here is a short video to view the project if you prefer to not sign up with your email address.
                <div className="p-4">
                  <a
                    target="_blank"
                    className="w-20 py-2 px-4 border border-transparent text-sm font-medium rounded-sm text-white bg-purple-500 hover:bg-purple-700"
                    href="https://youtu.be/Kwk0Dre_0yw"
                  >
                    View Video
                  </a>
                </div>
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
