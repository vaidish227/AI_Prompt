// Import the Feed component
import Feed from "@components/Feed";

// Define the Home component
const Home = () => {
  return (
    // Main section containing content
    <section className="w-full flex-center flex-col">
      {/* Title */}
      <h1 className="head_text text-center">
        Discover and Share
        {/* Line break for smaller screens */}
        <br className="max-md:hidden" />
        {/* Orange gradient text */}
        <span className="orange_gradient text-center">AI_Powered Prompts</span>
      </h1>
      {/* Description */}
      <p className="desc text-center">
        Promptopia is an open-source AI prompting tool for the modern world to discover, create, and share creative prompts
      </p>

      {/* Render the Feed component */}
      <Feed />
    </section>
  );
}

// Export the Home component
export default Home;
