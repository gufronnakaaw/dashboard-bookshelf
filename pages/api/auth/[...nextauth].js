import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';

export default NextAuth({
  session: {
    strategy: 'jwt',
    maxAge: 1 * 60 * 60, // 1 hour
  },
  secret: 'bookshelfjwt',
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const { username, password } = credentials;

        if (username == 'testing' && password == 'testing123') {
          return {
            email: 'testing@mail.com',
            fullname: 'Testing User',
          };
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },

    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },
});
