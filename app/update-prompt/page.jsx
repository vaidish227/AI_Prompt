"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router"; // Importing useRouter instead of useSearchParams

import Form from "@components/Form";

const UpdatePrompt = () => {
  const router = useRouter();
  const { id } = router.query; // Retrieve the query parameter directly from the router

  const [post, setPost] = useState({ prompt: "", tag: "" });
  const [submitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const getPromptDetails = async () => {
      if (id) {
        try {
          const response = await fetch(`/api/prompt/${id}`);
          const data = await response.json();

          setPost({
            prompt: data.prompt,
            tag: data.tag,
          });
        } catch (error) {
          console.log(error);
        }
      }
    };

    getPromptDetails();
  }, [id]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!id) return alert("Missing PromptId!");

    try {
      const response = await fetch(`/api/prompt/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

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

export default UpdatePrompt;
