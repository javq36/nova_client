import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET,
    }),
  ],
  session: { jwt: true },
  callbacks: {
    jwt: async (token, user) => {
      const isSignIn = user ? true : false;
      // Add auth_time to token on signin in
      if (isSignIn) {
        token.auth_time = Math.floor(Date.now() / 1000);
      }
      return Promise.resolve(token);
    },
    jwt: async (token, user) => {
      const isSignIn = user ? true : false;
      // Add auth_time to token on signin in
      if (isSignIn) {
        token.auth_time = Math.floor(Date.now() / 1000);
      }
      return Promise.resolve(token);
    },
    session: async (session, token) => {
      if (!session?.user || !token?.account) {
        return session;
      }
      session.user.id = token.account.id;
      session.accessToken = token.account.accessToken;
      return session;
    },
    /* jwt: async (token, user) => {
      const isSignIn = user ? true : false;
      // Add auth_time to token on signin in
      if (isSignIn) {
        token.auth_time = Math.floor(Date.now() / 1000);
      }
      return Promise.resolve(token);
    },
    session: async (session, token) => {
      if (!session?.user || !token?.account) {
        return session;
      }
      session.user.id = token.account.id;
      session.accessToken = token.account.accessToken;
      return session;
    }, */
  },
  /* jwt: {
    encryption: true,
  },
  secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
  callbacks: {
    async jwt(token, account) {
      if (account?.accessToken) {
        token.accessToken = account.accessToken;
      }
      return token;
    },
    redirect: async (url, _baseUrl) => {
      if (url === "/") {
        return Promise.resolve("/home");
      }
      return Promise.resolve("/home");
    },
  }, */
});
