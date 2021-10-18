import NextAuth from 'next-auth'
import EmailProvider from 'next-auth/providers/email'

const options = {
  site: process.env.NEXTAUTH_URL,
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
    // sendVerificationRequest: ({ identifier: email, url, token, baseUrl, provider }) => {
    //   return new Promise((resolve, reject) => {
    //     const { server, from } = provider
    //     // Strip protocol from URL and use domain as site name
    //     const site = baseUrl.replace(/^https?:\/\//, '')

    //     nodemailer.createTransport(server).sendMail(
    //       {
    //         to: email,
    //         from,
    //         subject: `Welcome to RecipeDash! Sign in now to get started.`,
    //         text: text({ url, site, email }),
    //         html: html({ url, site, email }),
    //       },
    //       (error) => {
    //         if (error) {
    //           // logger.error('SEND_VERIFICATION_EMAIL_ERROR', email, error)
    //           return reject(new Error('SEND_VERIFICATION_EMAIL_ERROR', error))
    //         }
    //         return resolve()
    //       },
    //     )
    //   })
    // },
  ],
  database: process.env.MONGODB_URI,
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  debug: true,
  callbacks: {
    redirect: async (url, _) => {
      if (url === '/api/auth/signin') {
        return Promise.resolve('https://recipedash.amandahom.com/')
      }
      return Promise.resolve('https://recipedash.amandahom.com/')
    },
  },
  pages: {
    signIn: '/signin',
    verifyRequest: '/verify-request',
  },
}

export default (req, res) => NextAuth(req, res, options)
