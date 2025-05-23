"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";

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
  return (
    <div className="relative w-full min-h-[100vh] overflow-hidden flex items-center">
      {" "}
      {/* Full viewport height */}
      {/* Background with floating paths */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-white">
        <FloatingPaths position={1} />
      </div>
      {/* Background blobs */}
      <div className="absolute top-20 right-40 w-96 h-96 rounded-full bg-blue-100/40 mix-blend-multiply blur-3xl"></div>
      <div className="absolute bottom-20 left-40 w-72 h-72 rounded-full bg-cyan-100/30 mix-blend-multiply blur-3xl"></div>
      <div className="relative z-10 container mx-auto px-4 md:px-6 w-full">
        <div className="flex flex-col md:flex-row md:items-center gap-16 py-12">
          {/* Left column: More streamlined copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="md:w-5/12"
          >
            {/* Simplified badge */}
            <div className="inline-block mb-4 px-4 py-1.5 bg-blue-100 border border-blue-200 rounded-full shadow-sm">
              <span className="text-primary-dark font-medium text-sm">
                Invoicing made simple
              </span>
            </div>

            {/* Larger, more impactful headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 text-neutral-800 leading-tight">
              Get paid
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500 ml-3">
                faster
              </span>
            </h1>

            {/* Shorter, more impactful description */}
            <p className="text-xl text-neutral-700 mb-10 max-w-lg">
              Create professional invoices in seconds and automate your payment
              process.
            </p>

            {/* Streamlined features in a row */}
            <div className="flex flex-wrap gap-x-12 gap-y-4 mb-10">
              {[
                "Save 5+ hours weekly",
                "Get paid 3x faster",
                "14-day free trial",
              ].map((feature, i) => (
                <div key={i} className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 shrink-0" />
                  <span className="text-neutral-700 text-base font-medium">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA buttons with more prominence */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Button
                className="rounded-xl px-8 py-7 text-lg font-medium
                bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-primary-dark hover:to-cyan-600
                text-white shadow-md hover:shadow-lg hover:shadow-primary/20"
              >
                Start free trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <Button
                variant="outline"
                className="rounded-xl px-8 py-7 text-lg font-medium
                border border-neutral-200 hover:border-neutral-300 bg-white
                text-neutral-700 hover:bg-blue-50/50"
              >
                Watch demo
              </Button>
            </div>

            {/* Social proof - simplified */}
            <div className="flex items-center gap-3">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-neutral-100 border-2 border-white shadow-sm flex items-center justify-center overflow-hidden"
                  >
                    <span className="text-xs">{i}</span>
                  </div>
                ))}
              </div>
              <span className="text-sm text-neutral-600 font-medium">
                <b>5,000+</b> businesses trust InvoiceFlow
              </span>
            </div>
          </motion.div>

          {/* Right column: Larger app preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:w-7/12 flex justify-end"
          >
            {/* Browser mockup */}
            <div className="relative w-[550px] shadow-xl rounded-xl border border-neutral-200 overflow-hidden">
              {" "}
              {/* Increased size */}
              {/* Browser chrome */}
              <div className="h-10 bg-white border-b border-neutral-100 flex items-center px-4">
                {" "}
                {/* Increased height */}
                <div className="flex items-center space-x-2 flex-shrink-0">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>{" "}
                  {/* Larger browser controls */}
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                </div>
                <div className="mx-4 flex-1 bg-neutral-50 rounded-md text-sm text-neutral-500 px-4 py-1 text-center overflow-hidden">
                  {" "}
                  {/* Larger address bar */}
                  app.invoiceflow.com/dashboard
                </div>
              </div>
              {/* App interface */}
              <div className="bg-white">
                {/* App header */}
                <div className="bg-neutral-50 p-4 border-b border-neutral-100 flex justify-between items-center">
                  {" "}
                  {/* Increased padding */}
                  <div className="text-base font-medium text-neutral-800">
                    {" "}
                    {/* Larger text */}
                    Dashboard
                  </div>
                  <div className="flex space-x-3">
                    {" "}
                    {/* Increased spacing */}
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      {" "}
                      {/* Larger buttons */}
                      <span className="text-sm text-blue-600">+</span>
                    </div>
                    <div className="w-8 h-8 bg-neutral-100 rounded-full flex items-center justify-center">
                      <span className="text-sm text-neutral-600">?</span>
                    </div>
                  </div>
                </div>

                {/* Dashboard content - stats row */}
                <div className="p-4">
                  {" "}
                  {/* Increased padding */}
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    {" "}
                    {/* Increased gap and margin */}
                    {["Paid", "Due", "Overdue"].map((label, i) => (
                      <div key={i} className="bg-neutral-50 p-3 rounded-md">
                        {" "}
                        {/* Increased padding */}
                        <div className="text-sm text-neutral-500">
                          {label}
                        </div>{" "}
                        {/* Larger text */}
                        <div
                          className={`text-base font-medium ${
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
                  {/* Recent invoices */}
                  <div>
                    <div className="flex justify-between items-center mb-3">
                      {" "}
                      {/* Increased margin */}
                      <div className="text-sm font-medium text-neutral-700">
                        {" "}
                        {/* Larger text */}
                        Recent Invoices
                      </div>
                      <div className="text-sm text-primary">View all</div>{" "}
                      {/* Larger text */}
                    </div>

                    {[
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
                    ].map((inv, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between py-3 border-b border-neutral-100" // Increased padding
                      >
                        <div>
                          <div className="text-sm font-medium text-neutral-800">
                            {" "}
                            {/* Larger text */}
                            {inv.id}
                          </div>
                          <div className="text-sm text-neutral-500">
                            {" "}
                            {/* Larger text */}
                            {inv.client}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">
                            {" "}
                            {/* Larger text */}
                            {inv.amount}
                          </div>
                          <div
                            className={`text-sm ${
                              inv.status === "paid"
                                ? "text-green-600"
                                : inv.status === "sent"
                                ? "text-blue-600"
                                : "text-neutral-500"
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

            {/* Floating notifications */}
            <div className="absolute -right-4 top-1/3 bg-white rounded-lg p-4 shadow-md border border-neutral-100 transform translate-x-1">
              {" "}
              {/* Increased padding */}
              <div className="flex items-center space-x-3">
                {" "}
                {/* Increased spacing */}
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  {" "}
                  {/* Larger icon */}
                  <svg
                    className="h-5 w-5 text-blue-600" /* Larger icon */
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
                    {" "}
                    {/* Larger text */}
                    Invoice Sent
                  </p>
                  <p className="text-sm text-neutral-500">
                    INV-2320 • Globex
                  </p>{" "}
                  {/* Larger text */}
                </div>
              </div>
            </div>

            <div className="absolute -right-4 bottom-1/4 bg-white rounded-lg p-4 shadow-md border border-neutral-100 transform translate-x-1/2">
              {" "}
              {/* Increased padding */}
              <div className="flex items-center space-x-3">
                {" "}
                {/* Increased spacing */}
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  {" "}
                  {/* Larger icon */}
                  <CheckCircle className="h-5 w-5 text-green-600" />{" "}
                  {/* Larger icon */}
                </div>
                <div>
                  <p className="font-medium text-sm text-neutral-900">
                    {" "}
                    {/* Larger text */}
                    Payment Received
                  </p>
                  <p className="text-sm text-neutral-500">
                    {" "}
                    {/* Larger text */}
                    $2,400.00 • Acme Co
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
