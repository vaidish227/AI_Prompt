// Importing Mongoose
import mongoose from 'mongoose';

// Flag to track the connection status
let isConnected = false;

// Function to connect to the MongoDB database
export const connectToDB = async () => {
  // Setting strict mode for queries
  mongoose.set('strictQuery', true);

  // Checking if already connected
  if (isConnected) {
    console.log('MongoDB is already connected');
    return;
  }
// MongoDB URI
const uri = process.env.MONGODB_URI; // Make sure this environment variable is properly set

  try {
    // Attempting to connect to the MongoDB database
    await mongoose.connect(uri, {
      dbName: "share_prompt", // Specifying the database name
      //useNewUrlParser: true, // Using new URL parser
      //useUnifiedTopology: true, // Using new server discovery and monitoring engine
    });

    // Updating connection status
    isConnected = true;

    console.log('MongoDB connected');
  } catch (error) {
    // Handling connection errors
    console.log(error);
  }
}
