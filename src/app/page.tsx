import Link from "next/link";
import Image from "next/image";
import { db } from "~/server/db";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { getMyImages } from "~/server/queries";

export const dynamic = "force-dynamic";

async function Images() {
  const images = await getMyImages();

  return (
    <div className="flex flex-wrap gap-4">
      {[...images, ...images, ...images].map((image) => (
        <div key={image.id} className="w-48 p-4">
          <img src={image.url} alt="image" />
          <div>{image.name}</div>
        </div>
      ))}
    </div>
  );
}

export default async function HomePage() {
  return (
    <main className="">
      <SignedOut>
        <div className="h-full w-full text-center text-2xl">
          Please sign in above
        </div>
      </SignedOut>
      <SignedIn>
        <Images />
        {/* <div>
          <p>
            Are you a degenerate gambler and want to keep betting without
            putting real money (and your marriage) on the line?
          </p>
          <p>User Card</p>
          <p>Total picks: 0</p>
          <p>Win %: </p>
          <p>Rank: 0</p>
        </div> */}
      </SignedIn>
    </main>
  );
}
