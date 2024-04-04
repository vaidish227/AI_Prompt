'use client'
import React from 'react'
import {useState, useEffect} from 'react';
import PromptCard from './PromptCard';

// Component to render a list of prompt cards
const PromptCardList = ({data, handleTagClick}) =>{
  return(
    <div className="mt-16 prompt_layout">
      {data.map((post) =>(
        // Render each prompt card with unique key and handleTagClick function
        <PromptCard
        key={post._id}
        post={post}
        handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

// Main feed component
const Feed = () => {
  // State hooks for search text, posts data, and filtered posts
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  
  // Function to handle search input change
  const handleSearchChange = (e) => {
    const text = e.target.value;
    setSearchText(text);
    // Filter posts based on search text
    const filtered = posts.filter((post) => {
      // Check if post's username or tags contain the search text
      if (post.username && post.username.includes(text)) {
        return true;
      }
      if (post.tag && post.tag.includes(text)) {
        return true;
      }
      return false;
    });
    setFilteredPosts(filtered);
  };

  // Fetch posts data from server when component mounts
  useEffect(()=>{
    // Function to fetch posts data
    const fetchPosts = async () =>{
      const response = await fetch('/api/prompt');
      const data = await response.json();

      // Set both posts and filteredPosts state with fetched data
      setPosts(data);
      setFilteredPosts(data); // Initialize filtered posts with all posts
    }

    fetchPosts();
  },[]) // Empty dependency array to run the effect only once when component mounts

  return (
   <section className="feed">
    <form className="relative w-full flex-center">
      {/* Search input field */}
      <input 
      type="text"
      placeholder='Search For a tag or a username' 
      value={searchText}
      onChange={handleSearchChange}
      required
      className="search_input peer"
       />
    </form>

    {/* Render list of prompt cards with filtered posts data */}
    <PromptCardList
      data={filteredPosts}
      handleTagClick={()=>{}} // Placeholder function for tag click handling
    />
   </section>
  )
}

export default Feed;
