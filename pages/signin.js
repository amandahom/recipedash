import { getCsrfToken, providers, signIn } from 'next-auth/client'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

function SignIn({ providers, csrfToken }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const router = useRouter()

  useEffect(() => {
    // Getting the error details from URL
    if (router.query.error) {
      setLoginError(router.query.error) // Shown below the input field in my example
      setEmail(router.query.email) // To prefill the email after redirect
    }
  }, [router])

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
            <h1 className="text-4xl font-bold text-left tracking-wide">A home for your recipes</h1>
            <p className="text-2xl my-4">Store your favorite recipes in a unique way.</p>
          </div>
        </div>
        <div className="lg:w-1/2 w-full flex items-center justify-center text-center md:px-16 px-0 z-0">
          <div
            className="absolute lg:hidden z-10 inset-0 bg-gray-500 bg-no-repeat bg-cover items-center"
            style={{
              backgroundImage: `url("https://res.cloudinary.com/cub95/image/upload/v1622848575/lindsay-cotter-9J7sHieVFi0-unsplash_1_aw3qmq.jpg")`,
            }}
          >
            <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
          </div>
          <div className="w-full py-6 z-20">
            <h1 className="my-6 text-black text-5xl">RecipeDash</h1>
            <p className="text-gray-100">or use email your account</p>
            <form method="post" action="/api/auth/signin/email">
              <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
              <label>
                Email address
                <input type="email" id="email" name="email" />
              </label>
              <button type="submit">Sign in with Email</button>
            </form>
            <form method="post" action="/api/auth/callback/credentials">
              <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
              <label>
                Username
                <input name="username" type="text" />
              </label>
              <label>
                Password
                <input name="password" type="password" />
              </label>
              <button type="submit">Sign in</button>
            </form>
            <div>
              {Object.values(providers).map((provider, index) => {
                return (
                  <button
                    key={index}
                    type="submit"
                    onClick={() => signIn(provider.id, { callbackUrl: 'http://localhost:3000/' })}
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
                  >
                    Sign in
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

SignIn.getInitialProps = async context => {
  const { req, res } = context
  console.log(context)
  // const csrfToken = await getCsrfToken(context)
  if (session && res && session.accessToken) {
    res.writeHead(302, {
      Location: '/',
    })
    res.end()
    return
  }

  return {
    session: undefined,
    providers: await providers(context),
    props: {
      csrfToken: await getCsrfToken(context),
    },
  }
}

export default SignIn
