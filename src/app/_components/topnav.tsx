"use client";

import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { UploadButton } from "@uploadthing/react";
import { useRouter } from "next/navigation";

export function TopNav() {
  const router = useRouter();

  return (
    <nav className="flex w-full items-center justify-between border-b p-4 text-xl font-semibold">
      <div>Fight Tracker</div>
      <div className="flex flex-row">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          {/* <UploadButton endpoint="imageUploader" /> */}
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
}
