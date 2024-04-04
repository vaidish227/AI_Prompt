// Importing Prompt model and connectToDB function
import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

// Handler for fetching prompts created by a user (GET request)
export const GET = async (request, { params }) => {
    try {
        // Connect to MongoDB
        await connectToDB();

        // Find prompts created by the user specified in the params and populate the 'creator' field
        const prompts = await Prompt.find({ creator: params.id }).populate("creator");

        // Return the fetched prompts as a JSON response with status code 200 (OK)
        return new Response(JSON.stringify(prompts), { status: 200 });
    } catch (error) {
        // If any error occurs during the process, return a 500 (Internal Server Error) response
        return new Response("Failed to fetch prompts created by user", { status: 500 });
    }
}
