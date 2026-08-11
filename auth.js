import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import connectMongo from "@/lib/db";
import User from "@/models/User";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],

  pages: {
    signIn: "/admin-login",
    error: "/admin-login",
  },

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        if (account?.provider !== "google") {
          return false;
        }

        if (!user?.email) {
          return false;
        }

        if (profile?.email_verified === false) {
          return false;
        }

        await connectMongo();

        const email = user.email.toLowerCase();

        let dbUser = await User.findOne({ email });

        // First login / registration
        // User is created as pending + inactive.
        // You will manually make the first user super_admin + active in MongoDB Compass.
        // Later, super_admin can approve new admins from dashboard.
        if (!dbUser) {
          await User.create({
            email,
            name: user.name || "",
            image: user.image || "",
            googleId: account.providerAccountId || profile?.sub || "",
            provider: "google",
            role: "pending",
            status: "inactive",
            emailVerified: profile?.email_verified === true,
            lastLoginAt: new Date(),
          });

          return true;
        }

        // Blocked users cannot sign in
        if (dbUser.status === "blocked") {
          return false;
        }

        // Update basic Google profile data on every login
        dbUser.name = user.name || dbUser.name || "";
        dbUser.image = user.image || dbUser.image || "";
        dbUser.googleId =
          dbUser.googleId || account.providerAccountId || profile?.sub || "";
        dbUser.provider = "google";
        dbUser.emailVerified = profile?.email_verified === true;
        dbUser.lastLoginAt = new Date();

        await dbUser.save();

        return true;
      } catch (error) {
        console.error("Google signIn error:", error);
        return false;
      }
    },

    async jwt({ token }) {
      try {
        if (!token?.email) {
          return token;
        }

        await connectMongo();

        const dbUser = await User.findOne({
          email: token.email.toLowerCase(),
        }).lean();

        if (!dbUser) {
          return token;
        }

        token.id = dbUser._id.toString();
        token.role = dbUser.role;
        token.status = dbUser.status;
        token.name = dbUser.name;
        token.picture = dbUser.image;
        token.email = dbUser.email;

        return token;
      } catch (error) {
        console.error("JWT callback error:", error);
        return token;
      }
    },

    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.status = token.status;
        session.user.name = token.name;
        session.user.image = token.picture;
        session.user.email = token.email;
      }

      return session;
    },
  },
});