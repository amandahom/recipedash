import { SignIn } from '@clerk/clerk-react'
import { AuthLayout } from 'layouts/AuthLayout'
import React from 'react'

export default function SignInPage() {
  return (
    <AuthLayout>
      <SignIn signUpUrl="/sign-up" />
    </AuthLayout>
  )
}

// export async function getServerSideProps(context: any) {
//   const csrfToken = await getCsrfToken(context)
//   const client = await clientPromise

//   const db = client.db('nextjs-mongodb-atlas-demo')

//   let users = await db.collection('users').find({}).toArray()
//   users = JSON.parse(JSON.stringify(users))
//   return {yarn
//     props: { csrfToken, users },
//   }
// }
