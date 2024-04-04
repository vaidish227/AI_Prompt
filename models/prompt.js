// Importing necessary modules from mongoose
import { Schema, model, models } from 'mongoose';

// Defining the schema for prompts
const PromptSchema = new Schema({
  // Reference to the creator user by their ObjectId
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Referencing the 'User' model
  },
  // The prompt text itself
  prompt: {
    type: String,
    required: [true, 'Prompt is required.'], // Prompt is required
  },
  // The tag associated with the prompt
  tag: {
    type: String,
    required: [true, 'Tag is required.'], // Tag is required
  }
});

// Creating the Prompt model if it does not exist, or using the existing one
const Prompt = models.Prompt || model('Prompt', PromptSchema);

// Exporting the Prompt model
export default Prompt;
