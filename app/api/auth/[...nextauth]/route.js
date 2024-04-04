// Importing NextAuth and GoogleProvider
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

// Importing User model and connectToDB function
import User from '@models/user';
import { connectToDB } from '@utils/database';

// Configuring authentication handler
const handler = NextAuth({
  // Configuring authentication providers
  providers: [
    GoogleProvider({
      // Configuring Google OAuth client ID and client secret
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  // Configuring authentication callbacks
  callbacks: {
    // Callback for modifying session data
    async session({ session }) {
      // Retrieve user document from MongoDB based on email and store user id in session
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser.id.toString();
      return session;
    },
    // Callback for handling sign-in process
    async signIn({ account, profile, user, credentials }) {
      try {
        // Connect to MongoDB
        await connectToDB();

        // Check if user already exists in MongoDB
        const userExists = await User.findOne({ email: profile.email });

        // If user does not exist, create a new document and save user in MongoDB
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }

        return true; // Return true indicating successful sign-in
      } catch (error) {
        console.log("Error checking if user exists: ", error.message);
        return false; // Return false indicating failed sign-in
      }
    },
  }
})

// Exporting authentication handler for both GET and POST requests
export { handler as GET, handler as POST }
