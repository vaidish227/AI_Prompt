// Importing necessary modules from mongoose
import { Schema, model, models } from 'mongoose';

// Defining the schema for users
const UserSchema = new Schema({
  // User's email
  email: {
    type: String,
    unique: [true, 'Email already exists!'], // Email must be unique
    required: [true, 'Email is required!'], // Email is required
  },
  // User's username
  username: {
    type: String,
    required: [true, 'Username is required!'], // Username is required
    match: [
      /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, 
      "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"
    ] // Username validation regex
  },
  // URL for user's profile image
  image: {
    type: String,
  }
});

// Creating the User model if it does not exist, or using the existing one
const User = models.User || model("User", UserSchema);

// Exporting the User model
export default User;
