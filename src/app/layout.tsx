import "~/styles/globals.css";
import "@uploadthing/react/styles.css";

import { GeistSans } from "geist/font/sans";
import { ClerkProvider } from "@clerk/nextjs";
import { TopNav } from "./_components/topnav";
import { Toaster } from "sonner";

export const metadata = {
  title: "Fight Tracker",
  description: "Ranked Fight Picks.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${GeistSans.variable} dark`}>
        <body className="flex flex-col gap-4">
          <TopNav />
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
