"use client";
// Importing necessary modules from Next.js and React
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/router";

// Importing the Form component
import Form from "@components/Form";

// Define the UpdatePrompt component
const UpdatePrompt = () => {
  // Initialize router and searchParams from Next.js
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id"); // Extracting the promptId from query parameters

  // Initialize state variables for post details and submission status
  const [post, setPost] = useState({ prompt: "", tag: "" });
  const [submitting, setIsSubmitting] = useState(false);

  // Effect hook to fetch the prompt details when promptId changes
  useEffect(() => {
    const getPromptDetails = async () => {
      if (!promptId) return; // If promptId is not available, exit

      try {
        // Fetch the prompt details from the API
        const response = await fetch(`/api/prompt/${promptId}`);
        const data = await response.json();

        // Set the prompt details in state
        setPost({
          prompt: data.prompt,
          tag: data.tag,
        });
      } catch (error) {
        console.log(error);
      }
    };

    getPromptDetails(); // Call the function to fetch prompt details
  }, [promptId]);

  // Function to handle updating a prompt
  const updatePrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // If promptId is missing, display an alert and exit
    if (!promptId) {
      alert("Missing PromptId!");
      return;
    }

    try {
      // Send a PATCH request to update the prompt
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      // If update is successful, navigate to the homepage
      if (response.ok) {
        router.push("/profile");
      }
    } catch (error) { 
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Render the Form component with necessary props
  return (
    <Form
      type='Edit'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

// Export the UpdatePrompt component
export default UpdatePrompt;
