// import clientPromise from 'middleware/mongodb.js'
// import { getCsrfToken } from 'next-auth/client'
import { SignUp } from '@clerk/nextjs'
import { AuthLayout } from 'layouts/AuthLayout'
import React from 'react'

export default function SignUpPage() {
  return (
    <AuthLayout>
      <SignUp signInUrl="/sign-in" />
    </AuthLayout>
  )
}

// export async function getServerSideProps(context: any) {
//   const csrfToken = await getCsrfToken(context)
//   const client = await clientPromise

//   const db = client.db('nextjs-mongodb-atlas-demo')

//   let users = await db.collection('users').find({}).toArray()
//   users = JSON.parse(JSON.stringify(users))
//   return {
//     props: { csrfToken, users },
//   }
// }
