import Image from "next/image";
import Link from "next/link";
import React from "react";

interface BlogCardProps {
  id: string;
  imageUrl: string;
  title: string;
  date: string;
  readTime: string;
  category: string;
}

export default function BlogCard({
  id,
  imageUrl,
  title,
  date,
  readTime,
  category,
}: BlogCardProps) {
  return (
    <div>
      <Image
        src={imageUrl}
        alt="Blog Cover Image"
        width={1000}
        height={1000}
        className="object-cover h-[250px] rounded-2xl"
      />
      <div className="pt-3">
        <div className="flex items-center gap-3">
          <p>{date}</p>
          <p>{readTime} min Read</p>
        </div>
        <div>
          <Link href={`/blog/${id}`}>
            <p className="text-3xl font-semibold text-gray-600 hover:text-black hover:cursor-pointer">
              {title}
            </p>
          </Link>
        </div>
        <p className="px-3 mt-3 text-sm py-2 rounded-full border inline-flex">
          {category}
        </p>
      </div>
    </div>
  );
}
