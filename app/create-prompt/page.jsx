"use client"
// Importing necessary modules from Next.js and React
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

// Importing the Form component
import Form from "@components/Form";

// Define the CreatePrompt component
const CreatePrompt = () => {
  // Initialize router and session from Next.js
  const router = useRouter();
  const { data: session } = useSession();

  // Initialize state variables for form submission and post data
  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: "", tag: "" });

  // Function to handle prompt creation
  const createPrompt = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Send a POST request to the API to create a new prompt
      const response = await fetch('/api/prompt/new', {
        method: 'POST',
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          tag: post.tag
        }),
      });

      // If the request is successful, redirect to the homepage
      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  // Render the Form component with necessary props
  return (
    <Form
      type='Create'
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );
};

// Export the CreatePrompt component
export default CreatePrompt;
