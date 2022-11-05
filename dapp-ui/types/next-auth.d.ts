import NextAuth, { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface SessionAccount {
    provider: string
    providerAccountId: string
    type: string
  }

  interface SessionProfile {
    id: string
    name: string
    username: string
  }

  interface Session {
    user: DefaultSession["user"]
    expires: string
    account: SessionAccount
    profile: SessionProfile
  }
}