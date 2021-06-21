import { getCsrfToken } from 'next-auth/client'
import React from 'react'

export default function SignIn({ csrfToken }: any) {
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
            <h1 className="text-4xl font-bold text-left tracking-wide text-center">A home for recipes</h1>
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
            <h1 className="text-4xl font-bold text-left tracking-wide text-white lg:text-black text-center">
              RecipeDash
            </h1>
            <p className="text-xl text-white lg:text-black py-4">Sign-in with an email address.</p>
            <form method="post" action="/api/auth/signin/email">
              <div className="px-4">
                <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  className="text-black block appearance-none rounded-sm relative block w-full px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
                />
                <div className="pt-6">
                  <button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-sm text-white bg-purple-500 hover:bg-purple-700"
                  >
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3"></span>
                    Sign in
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps(context: any) {
  const csrfToken = await getCsrfToken(context)
  return {
    props: { csrfToken },
  }
}
