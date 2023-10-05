import NextAuth from 'next-auth/next';
import { nextAuthConfig } from '~/nextAuth';

const handler = NextAuth(nextAuthConfig);

export { handler as GET, handler as POST };
