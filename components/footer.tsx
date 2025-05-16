"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  ArrowRight,
  Globe,
  Shield,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="relative bg-gradient-to-b from-white to-blue-50 pt-20 overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-400"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full opacity-20 blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-200 rounded-full opacity-20 blur-3xl"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Newsletter section */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl p-8 md:p-12 shadow-xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold text-white mb-4">
                  Stay updated with InvoiceFlow
                </h2>
                <p className="text-blue-100 mb-0">
                  Get the latest news, product updates, and exclusive offers
                  directly to your inbox.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-grow px-4 py-3 rounded-xl border-0 focus:ring-2 focus:ring-white/30 outline-none"
                />
                <Button className="bg-white text-blue-600 hover:bg-blue-50 rounded-xl px-6 py-3 font-medium">
                  Subscribe
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="col-span-1 lg:col-span-1"
          >
            <Link href="/" className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center">
                <span className="text-white font-bold text-lg">I</span>
              </div>
              <span className="text-2xl font-bold text-neutral-900">
                InvoiceFlow
              </span>
            </Link>
            <p className="text-neutral-600 mb-6">
              Streamline your invoicing process with our powerful, intuitive
              platform designed for modern businesses.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <Link
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full bg-blue-50 hover:bg-blue-100 flex items-center justify-center text-blue-600 transition-colors"
                >
                  <Icon className="h-5 w-5" />
                  <span className="sr-only">Social media</span>
                </Link>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-neutral-900 mb-6">
              Product
            </h3>
            {["Features", "Pricing", "Integrations", "API", "Security"].map(
              (item, i) => (
                <Link
                  key={i}
                  href="#"
                  className="block text-neutral-600 hover:text-blue-600 transition-colors"
                >
                  {item}
                </Link>
              )
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-neutral-900 mb-6">
              Resources
            </h3>
            {[
              "Documentation",
              "Blog",
              "Help Center",
              "Community",
              "Webinars",
              "Partners",
            ].map((item, i) => (
              <Link
                key={i}
                href="#"
                className="block text-neutral-600 hover:text-blue-600 transition-colors"
              >
                {item}
              </Link>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-lg font-semibold text-neutral-900 mb-6">
              Contact
            </h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <Mail className="h-5 w-5 text-blue-600 mr-3 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-neutral-900">Email Us</p>
                  <a
                    href="mailto:support@invoiceflow.com"
                    className="text-neutral-600 hover:text-blue-600 transition-colors"
                  >
                    support@invoiceflow.com
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <Phone className="h-5 w-5 text-blue-600 mr-3 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-neutral-900">Call Us</p>
                  <a
                    href="tel:+15551234567"
                    className="text-neutral-600 hover:text-blue-600 transition-colors"
                  >
                    +1 (555) 123-4567
                  </a>
                </div>
              </div>

              <div className="flex items-start">
                <Globe className="h-5 w-5 text-blue-600 mr-3 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-neutral-900">Location</p>
                  <p className="text-neutral-600">
                    123 Finance Street
                    <br />
                    San Francisco, CA 94107
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Features highlight */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 py-10 border-t border-neutral-200"
        >
          {[
            {
              icon: <Clock className="h-6 w-6 text-blue-600" />,
              title: "24/7 Support",
              description:
                "Our team is always available to help with any questions or issues.",
            },
            {
              icon: <Shield className="h-6 w-6 text-blue-600" />,
              title: "Secure Payments",
              description:
                "Bank-level security ensures your financial data is always protected.",
            },
            {
              icon: <Globe className="h-6 w-6 text-blue-600" />,
              title: "Global Coverage",
              description:
                "Support for multiple currencies and international payment methods.",
            },
          ].map((feature, i) => (
            <div key={i} className="flex items-start">
              <div className="mr-4 p-2 bg-blue-50 rounded-lg">
                {feature.icon}
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900">
                  {feature.title}
                </h4>
                <p className="text-sm text-neutral-600">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Bottom bar */}
        <div className="border-t border-neutral-200 py-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-600 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} InvoiceFlow. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4 text-sm">
            <Link
              href="#"
              className="text-neutral-600 hover:text-blue-600 transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              className="text-neutral-600 hover:text-blue-600 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-neutral-600 hover:text-blue-600 transition-colors"
            >
              Cookie Policy
            </Link>
            <Link
              href="#"
              className="text-neutral-600 hover:text-blue-600 transition-colors"
            >
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
