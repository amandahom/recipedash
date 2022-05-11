import { ClerkProvider, RedirectToSignIn, SignedIn, SignedOut } from '@clerk/nextjs'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import React from 'react'
import '../styles/globals.css'

const publicPages: string[] = ['/']

export default function App({ Component, pageProps }: AppProps) {
  // Get the pathname
  const { pathname } = useRouter()

  // Check if the current route matches a public page
  const isPublicPage = publicPages.includes(pathname)

  // If the current route is listed as public, render it directly
  // Otherwise, use Clerk to require authentication
  return (
    <ClerkProvider>
      {isPublicPage ? (
        <Component {...pageProps} />
      ) : (
        <>
          <SignedIn>
            <Component {...pageProps} />
          </SignedIn>
          <SignedOut>
            <RedirectToSignIn />
          </SignedOut>
        </>
      )}
    </ClerkProvider>
  )
}
