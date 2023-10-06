import { AuthOptions, NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
// import { pick } from 'lodash';

const providers = [
  CredentialsProvider({
    type: 'credentials',
    credentials: {},
    async authorize(credentials) {
      const { username, password } = credentials as { username: string; password: string };
      const mockUser = { id: '1', username: 'admin', password: '123', name: 'Tài' };

      if (username === mockUser.username && password === mockUser.password) {
        // Returned object here will be auto dropped id, username, password
        return mockUser;
      }
      return null;
    },
  }),
];

export type UserSession = {
  id: string;
  username: string;
  name: string;
};

const ONE_DAY_SECOND = 24 * 60 * 60;
export const nextAuthConfig: NextAuthOptions = {
  providers,
  session: { strategy: 'jwt', maxAge: ONE_DAY_SECOND },
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: '/auth/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      // Passed the data to session callback
      if (user) token.user = user;
      return token;
    },
    async session({ session, token }) {
      // Write user's info into session
      // const userInfo = pick<UserSession>(token.user as any, ...['id', 'username', 'name']);
      const user = token.user as any;
      const userInfo = {
        id: user?.id,
        username: user?.username,
        name: user?.name,
      };
      session.user = userInfo;
      return session;
    },
  },
} as AuthOptions;
