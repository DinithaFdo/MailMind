"use client";
import React, { useState, useEffect } from "react";
import BlogCard from "./BlogCard";

import { Button } from "@/components/ui/button";

interface Blog {
  id: string;
  imageUrl: string;
  title: string;
  date: string;
  readTime: string;
  category: string;
}

export default function BlogsSection() {
  const [blogs, setBlogs] = useState<Blog[]>([]); // Properly typed useState

  useEffect(() => {
    async function fetchBlogs() {
      const res = await fetch("/api/blogs");
      const data: Blog[] = await res.json(); // Ensure that the response data is typed as an array of Blog objects
      setBlogs(data);
    }
    fetchBlogs();
  }, []); // Empty dependency array to ensure it only runs once when the component mounts.

  return (
    <div className="max-w-7xl mx-auto py-10 md:py-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {blogs.map((blog) => (
          <BlogCard key={blog.id} {...blog} />
        ))}
      </div>
      <div className="flex items-center justify-self-center py-10">
        <Button variant={"outline"} className="rounded-full">
          View More
        </Button>
      </div>
    </div>
  );
}
