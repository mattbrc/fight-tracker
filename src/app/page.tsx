import Link from "next/link";
import Image from "next/image";
import { db } from "~/server/db";

const mockUrls = [
  "https://utfs.io/f/d47e0797-1856-461d-b347-d6e9e739a059-5uge73.png",
  "https://utfs.io/f/495cebf0-a5be-4f0e-8134-645949134508-jh9fvr.png",
  "https://utfs.io/f/1b57f32b-0495-46f4-95e3-9506e72188b0-aq7kjd.png",
];

const mockImages = mockUrls.map((url, index) => ({
  id: index + 1,
  url,
}));

export default async function HomePage() {
  const posts = await db.query.posts.findMany();
  console.log(posts);
  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {posts.map((post) => (
          <div key={post.id}>{post.name}</div>
        ))}
        {[...mockImages, ...mockImages, ...mockImages].map((image) => (
          <div key={image.id} className="w-48 p-4">
            <img src={image.url} alt="image" />
          </div>
        ))}
      </div>
    </main>
  );
}
