import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { checkEmailExists, insertUser } from "~/db/users";

export default NextAuth({
  providers: [
    Providers.Auth0({
      clientId: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      domain: process.env.NEXT_PUBLIC_AUTH0_DOMAIN,
    }),
  ],
  callbacks: {
    async signIn(user, account, profile) {
      const isAllowedToSignIn = true
      if (isAllowedToSignIn) {
        const id = user.id as string;
        const username = profile.name as string;
        const email = user.email as string;
        const avatar = user.image as string;
        const emailExists = await checkEmailExists(email);
        if(!emailExists) {
          await insertUser(id, username, email, avatar);
        }
        return true
      } 
      return false;
    }
  }
});
