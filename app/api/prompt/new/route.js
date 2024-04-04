// Importing Prompt model and connectToDB function
import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

// Handler for creating a new prompt (POST request)
export const POST = async (req) => {
    // Extracting userId, prompt, and tag from request body
    const { userId, prompt, tag } = await req.json();
    try {
        // Connect to MongoDB
        await connectToDB();

        // Create a new Prompt instance
        const newPrompt = new Prompt({
            creator: userId,
            prompt,
            tag
        });

        // Save the new prompt to the database
        await newPrompt.save();

        // Return the newly created prompt as JSON response with status code 201 (Created)
        return new Response(JSON.stringify(newPrompt), { status: 201 });
    } catch (error) {
        // If any error occurs during the process, return a 500 (Internal Server Error) response
        return new Response("Failed to create a new prompt", { status: 500 });
    }
}
