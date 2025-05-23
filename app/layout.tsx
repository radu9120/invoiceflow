import type React from "react";
import "@/app/globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "InvoiceFlow - Modern Invoicing Solution",
  description:
    "Streamline your invoicing process with our powerful, intuitive platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
      <html lang="en">
        <body className={inter.className}>
          <ClerkProvider>
            {" "}
            <Analytics />
            <Navbar/>
            {children}
            <Footer/>
          </ClerkProvider>
        </body>
      </html>

  );
}
