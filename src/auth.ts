import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import 'next-auth/jwt'
import { IUser } from './types'

declare module 'next-auth' {
  interface User extends IUser {
    accessToken?: string
  }
  interface Session {
    accessToken?: string
    user?: IUser
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends IUser {
    accessToken?: string
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async credentials => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { 'Content-Type': 'application/json' },
        })
        const json = await res.json()

        if (res.ok && json && json.user)
          return { ...json.user, accessToken: json.accessToken, refreshToken: json.user.refreshToken }

        return null
      },
    }),
  ],
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/auth/login',
    error: '/error',
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken
        token.role = user.role
      }
      return token
    },
    session({ session, token }) {
      if (token.accessToken) session.accessToken = token.accessToken
      if (token.sub) session.user.id = token.sub
      if (token.role) session.user.role = token.role
      return session
    },
  },
  experimental: { enableWebAuthn: true },
})
