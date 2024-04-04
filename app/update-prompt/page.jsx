"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Form from "@components/Form";

const UpdatePrompt = () => {
  const router = useRouter();
  const { id } = router.query; // Extracting the promptId from router query

  const [post, setPost] = useState({ prompt: "", tag: "" });
  const [submitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const getPromptDetails = async () => {
      if (!id) return;

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
    };

    getPromptDetails();
  }, [id]);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!id) {
      alert("Missing PromptId!");
      return;
    }

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
