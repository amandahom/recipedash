import { ClerkProvider, SignedIn, SignedOut } from '@clerk/nextjs'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import React from 'react'
import '../styles/globals.css'
import SignInPage from './sign-in/[[...index]]'
import SignUpPage from './sign-up/[[...index]]'

const publicPages: string[] = ['/']

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const { pathname } = useRouter()
  const isPublicPage = publicPages.includes(pathname)

  return (
    <ClerkProvider {...pageProps}>
      {isPublicPage ? (
        <Component {...pageProps} />
      ) : (
        <main>
          <SignedIn>
            <Component {...pageProps} />
          </SignedIn>
          <SignedOut>{router.pathname.match('/sign-up') ? <SignUpPage /> : <SignInPage />}</SignedOut>
        </main>
      )}
    </ClerkProvider>
  )
}
