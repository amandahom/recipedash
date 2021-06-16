import { connectToDatabase } from 'middleware/mongodb'
import { nanoid } from 'nanoid'
import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import nodemailer from 'nodemailer'

const options = {
  site: process.env.NEXTAUTH_URL,
  providers: [
    Providers.Credentials({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'demologin' },
        password: { label: 'Password', type: 'password', placeholder: 'demopassword' },
      },
      async authorize(credentials) {
        const { db } = await connectToDatabase()
        const user = {
          _id: nanoid(12),
          password: credentials.password,
          email: credentials.email,
          createdAt: new Date(),
        }
        await db.collection('users').insertOne(user)
        if (user) {
          return user
        } else {
          return null
        }
      },
    }),
    Providers.Email({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
      sendVerificationRequest: ({ identifier: email, url, token, baseUrl, provider }) => {
        return new Promise((resolve, reject) => {
          const { server, from } = provider
          // Strip protocol from URL and use domain as site name
          const site = baseUrl.replace(/^https?:\/\//, '')

          nodemailer.createTransport(server).sendMail(
            {
              to: email,
              from,
              subject: `Welcome to RecipeDash! Sign in now to get started.`,
              text: text({ url, site, email }),
              html: html({ url, site, email }),
            },
            error => {
              if (error) {
                logger.error('SEND_VERIFICATION_EMAIL_ERROR', email, error)
                return reject(new Error('SEND_VERIFICATION_EMAIL_ERROR', error))
              }
              return resolve()
            },
          )
        })
      },
    }),
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
        return Promise.resolve('/dashboard')
      }
      return Promise.resolve('/dashboard')
    },
  },
  pages: {
    signIn: '/signin',
  },
}

export default (req, res) => NextAuth(req, res, options)

// Email HTML body
const html = ({ url, site, email }) => {
  // Insert invisible space into domains and email address to prevent both the
  // email address and the domain from being turned into a hyperlink by email
  // clients like Outlook and Apple mail, as this is confusing because it seems
  // like they are supposed to click on their email address to sign in.
  const escapedEmail = `${email.replace(/\./g, '&#8203;.')}`
  // const escapedSite = `${site.replace(/\./g, '&#8203;.')}`

  // Some simple styling options
  const backgroundColor = '#f9f9f9'
  const textColor = '#444444'
  const mainBackgroundColor = '#ffffff'
  const buttonBackgroundColor = '#346df1'
  const buttonBorderColor = '#346df1'
  const buttonTextColor = '#ffffff'

  // Uses tables for layout and inline CSS due to email client limitations
  return `
<body style="background: ${backgroundColor};">
  <table width="100%" border="0" cellspacing="0" cellpadding="0">
    <tr>
      <td align="center" style="padding: 10px 0px 20px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${textColor};">
        <strong>RecipeDash</strong>
      </td>
    </tr>
  </table>
  <table width="100%" border="0" cellspacing="20" cellpadding="0" style="background: ${mainBackgroundColor}; max-width: 600px; margin: auto; border-radius: 10px;">
    <tr>
      <td align="center" style="padding: 10px 0px 0px 0px; font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${textColor};">
      Hey there! Click on the <strong>Sign In</strong> button to get started!
     <br> Sign in as <strong>${escapedEmail}
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table border="0" cellspacing="0" cellpadding="0">
          <tr>
            <td align="center" style="border-radius: 5px;" bgcolor="${buttonBackgroundColor}"><a href="${url}" target="_blank" style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${buttonTextColor}; text-decoration: none; text-decoration: none;border-radius: 5px; padding: 10px 20px; border: 1px solid ${buttonBorderColor}; display: inline-block; font-weight: bold;">Sign in</a></td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${textColor};">
        If you did not request this email, you can ignore this.
      </td>
    </tr>
  </table>
</body>
`
}

// Email text body – fallback for email clients that don't render HTML
const text = ({ url, site }) => `Sign in to ${site}\n${url}\n\n`
