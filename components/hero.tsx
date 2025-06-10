"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import Bounded from "./ui/bounded";
import CompanyBanner from "./companies-banner";
import { useState, useEffect } from "react";

function FloatingPaths({ position }: { position: number }) {
  const paths = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 6 * position} -${189 + i * 8}C-${
      380 - i * 6 * position
    } -${189 + i * 8} -${312 - i * 6 * position} ${216 - i * 8} ${
      152 - i * 6 * position
    } ${343 - i * 8}C${616 - i * 6 * position} ${470 - i * 8} ${
      684 - i * 6 * position
    } ${875 - i * 8} ${684 - i * 6 * position} ${875 - i * 8}`,
    width: 0.7 + i * 0.05,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none opacity-40">
      <svg
        className="w-full h-full text-primary"
        viewBox="0 0 696 316"
        fill="none"
      >
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={0.15}
            initial={{ pathLength: 0.4 }}
            animate={{
              pathLength: 0.8,
              pathOffset: [0, 0.5, 0],
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  );
}

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const invoices = [
    {
      id: "INV-2321",
      client: "Acme Co",
      amount: "$2,400",
      status: "paid",
    },
    {
      id: "INV-2320",
      client: "Globex",
      amount: "$1,800",
      status: "sent",
    },
    {
      id: "INV-2319",
      client: "Initech",
      amount: "$3,600",
      status: "draft",
    },
  ];

  return (
    <div className="relative w-full min-h-[100vh] overflow-hidden flex items-center">
      {/* Background elements OUTSIDE of Bounded */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-white">
        <FloatingPaths position={1} />
      </div>

      {/* Background blobs - adjusted ONLY for mobile */}
      <div className="absolute top-20 right-10 md:right-40 w-64 md:w-96 h-64 md:h-96 rounded-full bg-blue-100/40 mix-blend-multiply blur-3xl"></div>
      <div className="absolute bottom-20 left-10 md:left-40 w-48 md:w-72 h-48 md:h-72 rounded-full bg-cyan-100/30 mix-blend-multiply blur-3xl"></div>

      {/* Removed Bounded as it need to be a bit more wide */}
      <div className="relative z-10 w-full mx-auto px-4 md:px-6 lg:px-12 lg:py-24 xl:py-24 py-10 max-w-[1500px] space-y-8 md:space-y-16">
        <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-16">
          {/* Left column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="md:w-5/12"
          >
            <div className="inline-block mb-4 px-4 py-1.5 bg-blue-100 border border-blue-200 rounded-full shadow-sm">
              <span className="text-primary-dark font-medium text-sm">
                Invoicing made simple
              </span>
            </div>

            {/* Mobile: smaller text, desktop unchanged */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-8 text-header-text leading-tight">
              Get paid
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-accent ml-2 md:ml-3">
                faster
              </span>
            </h1>

            {/* Mobile: smaller text, desktop unchanged */}
            <p className="text-base md:text-xl text-primary-text mb-6 md:mb-10 max-w-lg">
              Create professional invoices in seconds and automate your payment
              process.
            </p>

            {/* Mobile: vertical stack, desktop unchanged */}
            <div className="flex flex-col sm:flex-wrap sm:flex-row gap-3 sm:gap-x-8 md:gap-x-12 sm:gap-y-4 mb-6 md:mb-10">
              {[
                "Save 5+ hours weekly",
                "Get paid 3x faster",
                "1st invoice free",
              ].map((feature, i) => (
                <div key={i} className="flex items-center">
                  <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-primary mr-2 shrink-0" />
                  <span className="text-primary-text text-sm md:text-base font-medium">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            {/* Mobile: better button sizing, desktop unchanged */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-6 md:mb-10">
              <Button
                className="rounded-xl px-6 md:px-8 py-4 md:py-7 text-base md:text-lg font-medium
                  bg-gradient-to-r from-blue-600 to-accent hover:from-primary-dark hover:to-cyan-600
                  text-white shadow-md hover:shadow-lg hover:shadow-primary/20"
              >
                Start free now
                <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
              </Button>

              <Button
                variant="secondary"
                className="rounded-xl px-6 md:px-8 py-4 md:py-7 text-base md:text-lg font-medium
                  border border-neutral-200 hover:border-neutral-300 bg-white
                  text-primary-text hover:bg-blue-50/50"
              >
                Watch demo
              </Button>
            </div>
          </motion.div>

          {/* Right column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:w-7/12 flex justify-center md:justify-end relative"
          >
            {/* Browser mockup - mobile optimized sizing */}
            <div className="relative w-full max-w-sm md:max-w-[550px] shadow-xl rounded-xl border border-neutral-200 overflow-hidden">
              {/* Browser chrome - smaller on mobile */}
              <div className="h-8 md:h-10 bg-white border-b border-neutral-100 flex items-center px-3 md:px-4">
                <div className="flex items-center space-x-1.5 md:space-x-2 flex-shrink-0">
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-400"></div>
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="mx-2 md:mx-4 flex-1 bg-neutral-50 rounded-md text-xs md:text-sm text-secondary-text px-2 md:px-4 py-0.5 md:py-1 text-center overflow-hidden">
                  <span className="hidden sm:inline">
                    app.invoiceflow.com/dashboard
                  </span>
                  <span className="sm:hidden">invoiceflow.com</span>
                </div>
              </div>

              {/* App interface - mobile optimized */}
              <div className="bg-white">
                {/* App header - smaller on mobile */}
                <div className="bg-neutral-50 p-2.5 md:p-4 border-b border-neutral-100 flex justify-between items-center">
                  <div className="text-sm md:text-base font-medium text-header-text">
                    Dashboard
                  </div>
                  <div className="flex space-x-2 md:space-x-3">
                    <div className="w-6 h-6 md:w-8 md:h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-xs md:text-sm text-blue-600">
                        +
                      </span>
                    </div>
                    <div className="w-6 h-6 md:w-8 md:h-8 bg-neutral-100 rounded-full flex items-center justify-center">
                      <span className="text-xs md:text-sm text-neutral-600">
                        ?
                      </span>
                    </div>
                  </div>
                </div>

                {/* Dashboard content - mobile optimized */}
                <div className="p-2.5 md:p-4">
                  {/* Stats row - smaller gaps on mobile */}
                  <div className="grid grid-cols-3 gap-2 md:gap-4 mb-3 md:mb-4">
                    {["Paid", "Due", "Overdue"].map((label, i) => (
                      <div
                        key={i}
                        className="bg-neutral-50 p-2 md:p-3 rounded-md"
                      >
                        <div className="text-xs md:text-sm text-secondary-text">
                          {label}
                        </div>
                        <div
                          className={`text-sm md:text-base font-medium ${
                            i === 0
                              ? "text-green-600"
                              : i === 1
                              ? "text-blue-600"
                              : "text-amber-600"
                          }`}
                        >
                          ${i === 0 ? "8,240" : i === 1 ? "3,800" : "1,200"}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Recent invoices - show fewer on mobile using state */}
                  <div>
                    <div className="flex justify-between items-center mb-2 md:mb-3">
                      <div className="text-xs md:text-sm font-medium text-primary-text">
                        Recent Invoices
                      </div>
                      <div className="text-xs md:text-sm text-primary">
                        View all
                      </div>
                    </div>

                    {invoices.slice(0, isMobile ? 2 : 3).map((inv, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between py-2 md:py-3 border-b border-neutral-100"
                      >
                        <div>
                          <div className="text-xs md:text-sm font-medium text-header-text">
                            {inv.id}
                          </div>
                          <div className="text-xs md:text-sm text-secondary-text">
                            {inv.client}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-xs md:text-sm font-medium">
                            {inv.amount}
                          </div>
                          <div
                            className={`text-xs md:text-sm ${
                              inv.status === "paid"
                                ? "text-green-600"
                                : inv.status === "sent"
                                ? "text-blue-600"
                                : "text-secondary-text"
                            }`}
                          >
                            {inv.status.charAt(0).toUpperCase() +
                              inv.status.slice(1)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Floating notifications - hidden on mobile to reduce clutter */}
            <div className="hidden md:block absolute -right-4 top-1/3 bg-white rounded-lg p-4 shadow-md border border-neutral-100 transform translate-x-1">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <svg
                    className="h-5 w-5 text-blue-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-sm text-neutral-900">
                    Invoice Sent
                  </p>
                  <p className="text-sm text-secondary-text">
                    INV-2320 • Globex
                  </p>
                </div>
              </div>
            </div>

            <div className="hidden md:block absolute -right-4 bottom-1/4 bg-white rounded-lg p-4 shadow-md border border-neutral-100 transform translate-x-1/2">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-sm text-neutral-900">
                    Payment Received
                  </p>
                  <p className="text-sm text-secondary-text">
                    $2,400.00 • Acme Co
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        <div>
          <CompanyBanner />
        </div>
      </div>
    </div>
  );
}
