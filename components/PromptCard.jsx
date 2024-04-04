// Importing necessary modules from React and Next.js
import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

// Definition of the PromptCard component
const PromptCard = ({ post, handleEdit, handleDelete, handleTagClick }) => {
  // Accessing session data using NextAuth
  const { data: session } = useSession();
  // Accessing current pathname using Next.js hooks
  const pathName = usePathname();
  // Accessing router for navigation using Next.js
  const router = useRouter();

  // State to manage whether prompt is copied or not
  const [copied, setCopied] = useState("");

  // Function to handle clicking on user profile
  const handleProfileClick = () => {
    // If the post's creator is the current user, navigate to own profile
    if (post.creator._id === session?.user.id) return router.push("/profile");
    // Otherwise, navigate to the creator's profile
    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  };

  // Function to handle copying the prompt text to clipboard
  const handleCopy = () => {
    setCopied(post.prompt); // Set copied state to the prompt text
    // Use browser API to copy text to clipboard
    navigator.clipboard.writeText(post.prompt);
    // Reset copied state after 3 seconds
    setTimeout(() => setCopied(false), 3000);
  };

  // Rendering the prompt card component
  return (
    <div className='prompt_card'>
      <div className='flex justify-between items-start gap-5'>
        {/* Section for displaying user profile information */}
        <div
          className='flex-1 flex justify-start items-center gap-3 cursor-pointer'
          onClick={handleProfileClick}
        >
          <Image
            src={post.creator.image}
            alt='user_image'
            width={40}
            height={40}
            className='rounded-full object-contain'
          />
          <div className='flex flex-col'>
            <h3 className='font-satoshi font-semibold text-gray-900'>
              {post.creator.username}
            </h3>
            <p className='font-inter text-sm text-gray-500'>
              {post.creator.email}
            </p>
          </div>
        </div>
        {/* Button to copy prompt text */}
        <div className='copy_btn' onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt={copied === post.prompt ? "tick_icon" : "copy_icon"}
            width={12}
            height={12}
          />
        </div>
      </div>
      {/* Displaying the prompt text */}
      <p className='my-4 font-satoshi text-sm text-gray-700'>{post.prompt}</p>
      {/* Displaying the prompt tag */}
      <p
        className='font-inter text-sm blue_gradient cursor-pointer'
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        #{post.tag}
      </p>
      {/* Displaying edit and delete options for the current user */}
      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
          <p
            className='font-inter text-sm green_gradient cursor-pointer'
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className='font-inter text-sm orange_gradient cursor-pointer'
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

// Exporting the PromptCard component
export default PromptCard;
