// Importing Prompt model and connectToDB function
import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

// Handler for fetching all prompts (GET request)
export const GET = async (request) => {
    try {
        // Connect to MongoDB
        await connectToDB();

        // Find all prompts in the database and populate the 'creator' field
        const prompts = await Prompt.find({}).populate('creator');

        // Return the fetched prompts as a JSON response with status code 200 (OK)
        return new Response(JSON.stringify(prompts), { status: 200 });
    } catch (error) {
        // If any error occurs during the process, return a 500 (Internal Server Error) response
        return new Response("Failed to fetch all prompts", { status: 500 });
    }
}
