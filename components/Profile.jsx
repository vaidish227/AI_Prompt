// Importing PromptCard component
import PromptCard from "./PromptCard";

// Definition of the Profile component
const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  return (
    // Profile section with user's name and description
    <section className='w-full'>
      <h1 className='head_text text-left'>
        {/* Displaying user's name */}
        <span className='blue_gradient'>{name} Profile</span>
      </h1>
      {/* Displaying user's description */}
      <p className='desc text-left'>{desc}</p>

      {/* Displaying prompt cards */}
      <div className='mt-10 prompt_layout'>
        {/* Mapping through data to render each prompt card */}
        {data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            // Passing handleEdit function to PromptCard component
            handleEdit={() => handleEdit && handleEdit(post)}
            // Passing handleDelete function to PromptCard component
            handleDelete={() => handleDelete && handleDelete(post)}
          />
        ))}
      </div>
    </section>
  );
};

// Exporting the Profile component
export default Profile;
