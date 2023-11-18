import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { postUsersData } from "@/app/routes/fetchRequest";

const authOptions = {
  providers: [
    GoogleProvider.default({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks:{
    async signIn({ user, account }) {
      if (account.provider === 'google') {
        try {
          const res = await postUsersData(user)
          
        }catch(error){
          console.log("Error",error)
        }
      } 
      return user
    }
  }
};

const handler = NextAuth.default(authOptions)

export { handler as GET, handler as POST}