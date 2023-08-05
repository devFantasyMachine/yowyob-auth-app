import NextAuth, { NextAuthOptions } from 'next-auth';
import Providers from 'next-auth/providers';
import GithubProvider from 'next-auth/providers/github';

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  providers: [

    {
      id: "yowyob",
      name: "Yowyob",
      type: "oauth",
      version: "2.0",
      wellKnown: "http://88.198.150.195:8099/AUTH-SERVICE/.well-known/openid-configuration", 
      authorization: { 
        params: {
          client_id:"messaging-client",
          redirect_uri: "http://127.0.0.1:3000/api/auth/callback/yowyob",
          scope: "profile openid",
          response_type: "code",
          grant_type: "authorization_code"
        }
      },
      idToken: true,
      checks: ["state"],
      //scope: "profile email",  

      async profile(profile, tokens) {
        // You can use the tokens, in case you want to fetch more profile information
        // For example several OAuth providers do not return email by default.
        // Depending on your provider, will have tokens like `access_token`, `id_token` and or `refresh_token`
        return {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          image: profile.picture
        }
      },
      clientId: "messaging-client",
      clientSecret: "secret"
    }

  ],
};

export default NextAuth(authOptions);
