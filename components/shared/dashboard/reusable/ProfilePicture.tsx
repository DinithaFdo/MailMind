"use client"; // Add this at the top

import { LogOut } from "lucide-react";
import { useUser, useClerk } from "@clerk/nextjs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

export function ProfilePicture() {
  const { user } = useUser();
  const { signOut } = useClerk();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Image
          src={user?.imageUrl || "/default-avatar.png"}
          alt="Profile Picture"
          width={20}
          height={20}
          className="w-10 h-10 rounded-full object-cover border-2 border-indigo-500 cursor-pointer"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48 p-3 shadow-lg rounded-lg border bg-white">
        <div className="flex items-center gap-3 pb-2 border-b">
          <Image
            src={user?.imageUrl || "/default-avatar.png"}
            alt="User Avatar"
            width={20}
            height={20}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h4 className="text-sm font-semibold">{user?.fullName}</h4>
            <p className="text-xs text-gray-500">
              {user?.primaryEmailAddress?.emailAddress}
            </p>
          </div>
        </div>
        <DropdownMenuItem
          onClick={() => signOut()}
          className="text-red-500 font-semibold hover:bg-red-50 mt-2"
        >
          <LogOut className="mr-2 h-5 w-5" />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
