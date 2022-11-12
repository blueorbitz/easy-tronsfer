import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import TwitterProvider from 'next-auth/providers/twitter'

export const authOptions = {
  secret: process.env.NEXT_PUBLIC_SECRET,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID ?? '',
      clientSecret: process.env.GITHUB_SECRET ?? '',
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID ?? '',
      clientSecret: process.env.TWITTER_CLIENT_SECRET ?? '',
      version: '2.0',
    }),

    // ...add more providers here
  ],
  
  callbacks: {
    async jwt({ token, account, profile }: any) {
  
      // console.log('JWT', { token, user, account, profile, isNewUser })
      if (account) {
        token.account = {
          provider: account.provider,
          type: account.type,
          providerAccountId: account.providerAccountId,
        }
      }

      if (profile) {
        switch (account.provider) {
          case 'twitter':
            token.profile = {
              id: profile.data.id,
              name: profile.data.name,
              username: profile.data.username,
            }
            break
          case 'github':
            token.profile = {
              id: profile.id,
              name: profile.name,
              username: profile.login,
            }
            break
          default:
            token.profile = profile
        }
      }

      return token
    },
    async session({ session, token }: any) {
      return {
        ...session,
        account: token.account,
        profile: token.profile,
      }
    },
  }
}

export default NextAuth(authOptions)