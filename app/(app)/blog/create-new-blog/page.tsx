"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface BlogFormData {
  imageUrl: string;
  title: string;
  date: string;
  readTime: string;
  category: string;
}

const BlogCreatePage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<BlogFormData>({
    imageUrl: "",
    title: "",
    date: "",
    readTime: "",
    category: "",
  });

  // Get current date in YYYY-MM-DD format
  const currentDate = new Date().toISOString().split("T")[0];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Ensure readTime is positive and valid
    if (parseInt(formData.readTime) <= 0) {
      toast.error("Read Time must be a positive number.");
      return;
    }

    try {
      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success("Blog created successfully!");
        router.push("/blog");
      } else {
        const data = await res.json();
        toast.error(data.error || "An error occurred while creating the blog.");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred while connecting to the server.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-10 md:py-20">
      <h1 className="text-3xl font-semibold text-center mb-6">
        Create a New Blog
      </h1>

      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
        <div className="mb-4">
          <label
            htmlFor="imageUrl"
            className="block text-sm font-medium text-gray-700">
            Image URL
          </label>
          <input
            type="text"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700">
            Blog Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700">
            Date
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            min={currentDate} // Set the min attribute to current date
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="readTime"
            className="block text-sm font-medium text-gray-700">
            Read Time (in minutes)
          </label>
          <input
            type="number"
            name="readTime"
            value={formData.readTime}
            onChange={handleChange}
            required
            min={1} // Ensuring Read Time is always >= 1
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="flex justify-center mt-6">
          <Button type="submit" variant="outline" className="rounded-full">
            Create Blog
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BlogCreatePage;
