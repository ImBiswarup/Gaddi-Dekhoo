import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import connectToDB from "@/DB/connection";
import User from "@/model/user";
// Define NextAuth Options
export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      await connectToDB(process.env.MONGO_URI!);

      try {
        let existingUser = await User.findOne({ email: user.email });

        if (!existingUser) {
          existingUser = await User.create({
            name: user.name,
            email: user.email,
            image: user.image,
            provider: account?.provider,
          });
        }

        return true; // Allow sign-in
      } catch (error) {
        console.error("Error storing user:", error);
        return false; // Deny sign-in on error
      }
    },
    async session({ session }) {
      await connectToDB(process.env.MONGO_URI!);
      const dbUser = await User.findOne({ email: session.user.email });

      if (dbUser) {
        session.user.id = dbUser._id.toString();
        (session.user as any).provider = dbUser.provider; // TypeScript Fix
      }

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET, // Important for security
  pages: {
    signIn: "",
    error: "/auth/error", // Error page
  },
};

// Export NextAuth Handlers for App Router
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
