import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { pick } from 'lodash';

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
  username: string;
  name: string;
};

export const nextAuthConfig = {
  providers,
  session: { strategy: 'jwt' },
  secret: process.env.JWT_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      // Passed the data to session callback
      if (user) token.user = user;
      return token;
    },
    async session({ session, token }) {
      // Write user's info into session
      const userInfo = pick<UserSession>(token.user as any, ...['username', 'name']);
      session.user = userInfo;
      return session;
    },
  },
} as AuthOptions;
