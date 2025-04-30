"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

export default function WhatsappSupportButton() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowButton(window.scrollY > 100); // show after scrolling 100px
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {showButton && (
        <div className="fixed bottom-6 right-6 z-50">
          <div className="relative">
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-green-600"></span>
            </span>

            <Link
              href="https://wa.me/94771234567"
              target="_blank"
              className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg transition">
              <FaWhatsapp size={24} />
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
