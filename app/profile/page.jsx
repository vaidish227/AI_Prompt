'use client'
// Importing necessary modules from Next.js and React
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Importing the Profile component
import Profile from "@components/Profile";

// Define the MyProfile component
const MyProfile = () => {
  // Initialize router and session from Next.js
  const router = useRouter();
  const { data: session } = useSession();

  // Initialize state variable for storing the user's prompts
  const [myPosts, setMyPosts] = useState([]);

  // Effect hook to fetch the user's prompts when the session user ID changes
  useEffect(() => {
    const fetchPosts = async () => {
      // Fetch the user's prompts from the API endpoint
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();

      // Set the user's prompts in state
      setMyPosts(data);
    };

    // Call the fetchPosts function only if the session user ID exists
    if (session?.user.id) fetchPosts();
  }, [session?.user.id]);

  // Function to handle editing a prompt
  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  // Function to handle deleting a prompt
  const handleDelete = async (post) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      try {
        // Send a DELETE request to the API to delete the prompt
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });

        // Remove the deleted prompt from the user's prompts
        const filteredPosts = myPosts.filter((item) => item._id !== post._id);
        setMyPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  // Render the Profile component with necessary props
  return (
    <Profile
      name='My'
      desc='Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination'
      data={myPosts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

// Export the MyProfile component
export default MyProfile;
