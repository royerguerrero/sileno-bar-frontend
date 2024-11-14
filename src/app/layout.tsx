import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Image from "next/image"
import Link from "next/link";
import { Button } from "@/app/_components/ui/button";
import { Toaster } from "@/app/_components/ui/toaster";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});


export const metadata: Metadata = {
  title: "Sileno's Bar | Hip.. hip..",
  description: "Take a break with a beer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-amber-50 `}
      >
        <div className="max-w-[600px] m-auto min-h-dvh py-3 relative">
          <header className="grid grid-cols-3">
            <Button size="sm" variant="link" asChild>
              <Link href="/">
                Menu
              </Link>
            </Button>
            <div className="flex justify-center">
              <Image src="logo.svg" alt="Sileno's bar" width={140} height={40} />
            </div>
            <Button size="sm" variant="link" asChild>
              <Link href="/order">
                Your Order
              </Link>
            </Button>
          </header>
          <main className="h-full flex flex-col gap-6 p-3 mb-24">
            {children}
          </main>
          <Toaster />
        </div>
      </body>
    </html>
  );
}
