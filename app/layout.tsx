import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "./components/Navigation";
import { getCurrentUser } from "@/lib/auth";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Wikimasters",
  description: "A minimal wiki application for learning fullstack Next.js",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();
  
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased bg-gray-50`}>
        <Navigation currentUser={currentUser} />
        <div className="min-h-screen flex flex-col">
          <main className="flex-1 w-full">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8 sm:py-12">
              {children}
            </div>
          </main>

          <footer className="border-t border-gray-200 bg-white mt-auto">
            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8">
              <div className="text-center text-sm text-gray-500">
                <p className="font-medium">Frontend Masters Fullstack Next.js Course</p>
                <p className="mt-1">Educational Wiki Application</p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
