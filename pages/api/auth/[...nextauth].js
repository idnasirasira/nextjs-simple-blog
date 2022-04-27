import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { dbConnect } from "../../../lib/db-connect";
import User from "../../../models/user";
import bcrypt from "bcrypt";
import { validateAllOnce } from "../../../utils/common";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        dbConnect();

        try {
          const { email, password } = credentials;

          validateAllOnce({ email, password });

          const user = await User.findOne({ email }).exec();

          if (!user) {
            throw new Error("An error occured.");
          }

          const userDoc = user._doc;

          const isMatchPassword = await bcrypt.compare(
            password,
            userDoc.password
          );

          if (user && isMatchPassword) {
            delete userDoc.password;
            return userDoc;
          } else {
            throw new Error("Email or password is invalid.");
          }
        } catch (error) {
          throw new Error(error.message);
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, user, token }) {
      if (user && user.id) {
        session.user.id = user.id;
      }

      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      return token;
    },
  },
});
