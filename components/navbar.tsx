"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MenuIcon, XIcon } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-neutral-200"
    >
      <div className="container mx-auto px-4 md:px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              initial={{ rotate: -10 }}
              animate={{ rotate: 0 }}
              transition={{ duration: 0.5 }}
              className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-cyan-400 flex items-center justify-center"
            >
              <Image
                src="/logo.png"
                alt={"logo"}
                height={50}
                width={50}
              ></Image>
            </motion.div>
            <span className="text-xl font-bold text-neutral-900">
              InvoiceFlow
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="#features"
              className="text-primary-text hover:text-blue-600 transition-colors"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="text-primary-text hover:text-blue-600 transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="#testimonials"
              className="text-primary-text hover:text-blue-600 transition-colors"
            >
              Testimonials
            </Link>
            <Link
              href="#contact"
              className="text-primary-text hover:text-blue-600 transition-colors"
            >
              Contact
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            
            <div className="hidden md:block">
              <SignedOut>
                <SignInButton>
                  <Button className=" bg-gradient-to-r from-primary to-cyan-400 hover:from-blue-600 hover:to-accent text-white rounded-xl">
                    Sign in
                  </Button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <UserButton/>
              </SignedIn>
              
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <XIcon className="h-5 w-5" />
              ) : (
                <MenuIcon className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4"
          >
            <div className="flex flex-col space-y-4">
              <Link
                href="#features"
                className="text-primary-text hover:text-blue-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </Link>
              <Link
                href="#pricing"
                className="text-primary-text hover:text-blue-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </Link>
              <Link
                href="#testimonials"
                className="text-primary-text hover:text-blue-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Testimonials
              </Link>
              <Link
                href="#contact"
                className="text-primary-text hover:text-blue-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Button className="bg-gradient-to-r from-primary to-cyan-400 hover:from-blue-600 hover:to-accent text-white w-full rounded-xl">
                Sign in
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}
