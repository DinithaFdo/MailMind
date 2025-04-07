"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { UserButton, useUser, SignOutButton } from "@clerk/nextjs";
import logo from "@/public/MailMind Logo.png";

export default function NavBar() {
  const { isSignedIn } = useUser();

  return (
    <div className="sticky top-0 z-50">
      <div className="border-b bg-white/40 backdrop-blur-lg py-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <Link href={"/"}>
              <Image src={logo} alt="MailMind Logo" width={150} height={150} />
            </Link>
            <div className="flex items-center gap-10">
              <Button
                variant={"link"}
                className="font-semibold hover:text-indigo-500"
              >
                <Link href={"/"}>About</Link>
              </Button>
              <Button
                variant={"link"}
                className="font-semibold hover:text-indigo-500"
              >
                <Link href={"/"}>Pricing</Link>
              </Button>
              <Button
                variant={"link"}
                className="font-semibold hover:text-indigo-500"
              >
                <Link href={"/"}>Blog</Link>
              </Button>
              <Button
                variant={"link"}
                className="font-semibold hover:text-indigo-500"
              >
                <Link href={"/"}>Features</Link>
              </Button>
            </div>
            <div className="flex items-center gap-2">
              {isSignedIn ? (
                <>
                  <Button variant={"outline"} className="bg-indigo-500">
                    <Link href="/dashboard">Dashboard</Link>
                  </Button>
                  <SignOutButton>
                    <Button variant={"outline"}>Sign Out</Button>
                  </SignOutButton>
                  <UserButton afterSignOutUrl="/" />
                </>
              ) : (
                <>
                  <Button variant={"outline"}>
                    <Link href="/sign-in">Login</Link>
                  </Button>
                  <Button className="bg-indigo-500">
                    <Link href="/sign-up">
                      Get Started Free - It&apos;s Free
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
