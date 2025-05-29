"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MenuIcon, XIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  // Handle scroll effect for background change
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`sticky top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-neutral-200"
          : "bg-gradient-to-br from-blue-50 via-white to-white border-b border-blue-100"
      }`}
      style={{
        background: scrolled
          ? "rgba(255, 255, 255, 0.95)"
          : "linear-gradient(to bottom right, rgb(239 246 255), rgb(255 255 255), rgb(255 255 255))",
      }}
    >
      <div className="container mx-auto px-4 md:px-6 py-3 md:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <motion.div
              initial={{ rotate: -10 }}
              animate={{ rotate: 0 }}
              transition={{ duration: 0.5 }}
              className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-cyan-400 flex items-center justify-center overflow-hidden"
            >
              <Image
                src="/logo.png"
                alt="InvoiceFlow logo"
                height={24}
                width={24}
                className="object-contain"
              />
            </motion.div>
            <span className="text-xl font-bold text-neutral-900">
              InvoiceFlow
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="#features"
              className="text-primary-text hover:text-blue-600 transition-colors font-medium"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="text-primary-text hover:text-blue-600 transition-colors font-medium"
            >
              Pricing
            </Link>
            <Link
              href="#testimonials"
              className="text-primary-text hover:text-blue-600 transition-colors font-medium"
            >
              Testimonials
            </Link>
            <Link
              href="#contact"
              className="text-primary-text hover:text-blue-600 transition-colors font-medium"
            >
              Contact
            </Link>
          </div>

          {/* Desktop Auth & Mobile Menu Button */}
          <div className="flex items-center space-x-3">
            {/* Desktop Authentication */}
            <div className="hidden md:flex items-center space-x-3">
              <SignedOut>
                <SignInButton>
                  <Button
                    variant="ghost"
                    className="text-primary-text hover:text-blue-600 hover:bg-blue-50"
                  >
                    Sign in
                  </Button>
                </SignInButton>
                <SignUpButton>
                  <Button className="bg-gradient-to-r from-primary to-cyan-400 hover:from-blue-600 hover:to-accent text-white rounded-xl px-6">
                    Get Started
                  </Button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
            </div>

            {/* Mobile User Button (when signed in) */}
            <div className="md:hidden">
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
            </div>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden p-2 hover:bg-blue-50"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              <motion.div
                animate={{ rotate: isMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              >
                {isMenuOpen ? (
                  <XIcon className="h-5 w-5" />
                ) : (
                  <MenuIcon className="h-5 w-5" />
                )}
              </motion.div>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{
                duration: 0.25,
                ease: "easeInOut",
                height: { duration: 0.25 },
                opacity: { duration: 0.2 },
              }}
              className="md:hidden overflow-hidden bg-white/95 backdrop-blur-sm rounded-b-lg border-t border-blue-100"
            >
              <motion.div
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.2, delay: 0.05 }}
                className="py-4 px-2"
              >
                <div className="flex flex-col space-y-1">
                  {/* Navigation Links */}
                  <Link
                    href="#features"
                    className="px-4 py-3 text-primary-text hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium"
                    onClick={closeMenu}
                  >
                    Features
                  </Link>
                  <Link
                    href="#pricing"
                    className="px-4 py-3 text-primary-text hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium"
                    onClick={closeMenu}
                  >
                    Pricing
                  </Link>
                  <Link
                    href="#testimonials"
                    className="px-4 py-3 text-primary-text hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium"
                    onClick={closeMenu}
                  >
                    Testimonials
                  </Link>
                  <Link
                    href="#contact"
                    className="px-4 py-3 text-primary-text hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium"
                    onClick={closeMenu}
                  >
                    Contact
                  </Link>

                  {/* Mobile Authentication */}
                  <SignedOut>
                    <div className="pt-3 mt-3 border-t border-blue-100 space-y-2">
                      <SignInButton>
                        <Button
                          variant="outline"
                          className="w-full py-3 text-base font-medium border-blue-200 text-blue-600 hover:bg-blue-50 transition-all duration-200"
                          onClick={closeMenu}
                        >
                          Sign In
                        </Button>
                      </SignInButton>
                      <SignUpButton>
                        <Button
                          className="w-full py-3 text-base font-medium bg-gradient-to-r from-primary to-cyan-400 hover:from-blue-600 hover:to-accent text-white rounded-xl transition-all duration-200"
                          onClick={closeMenu}
                        >
                          Get Started Free
                        </Button>
                      </SignUpButton>
                    </div>
                  </SignedOut>

                  <SignedIn>
                    <div className="pt-3 mt-3 border-t border-blue-100">
                      <Link
                        href="/dashboard"
                        className="block px-4 py-3 text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 font-medium"
                        onClick={closeMenu}
                      >
                        Dashboard
                      </Link>
                    </div>
                  </SignedIn>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Overlay - only show when menu is open */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/10 backdrop-blur-[1px] z-[-1] md:hidden"
              onClick={closeMenu}
            />
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
