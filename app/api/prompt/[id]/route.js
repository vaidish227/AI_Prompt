// Importing Prompt model and connectToDB function
import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

// Handler for reading a prompt (GET request)
export const GET = async (request, { params }) => {
    try {
        // Connect to MongoDB
        await connectToDB();

        // Find the prompt by ID and populate the creator field
        const prompt = await Prompt.findById(params.id).populate("creator");

        // If prompt not found, return 404 response
        if (!prompt) return new Response("Prompt Not Found", { status: 404 });

        // Return the prompt as JSON response
        return new Response(JSON.stringify(prompt), { status: 200 });
    } catch (error) {
        // If any error occurs, return 500 response
        return new Response("Internal Server Error", { status: 500 });
    }
}

// Handler for updating a prompt (PATCH request)
export const PATCH = async (request, { params }) => {
    // Extracting prompt and tag from request body
    const { prompt, tag } = await request.json();

    try {
        // Connect to MongoDB
        await connectToDB();

        // Find the existing prompt by ID
        const existingPrompt = await Prompt.findById(params.id);

        // If prompt not found, return 404 response
        if (!existingPrompt) {
            return new Response("Prompt not found", { status: 404 });
        }

        // Update the prompt with new data
        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        // Save the updated prompt
        await existingPrompt.save();

        // Return success response
        return new Response("Successfully updated the Prompt", { status: 200 });
    } catch (error) {
        // If any error occurs, return 500 response
        return new Response("Error Updating Prompt", { status: 500 });
    }
};

// Handler for deleting a prompt (DELETE request)
export const DELETE = async (request, { params }) => {
    try {
        // Connect to MongoDB
        await connectToDB();

        // Find the prompt by ID and remove it
        await Prompt.findByIdAndRemove(params.id);

        // Return success response
        return new Response("Prompt deleted successfully", { status: 200 });
    } catch (error) {
        // If any error occurs, return 500 response
        return new Response("Error deleting prompt", { status: 500 });
    }
};
