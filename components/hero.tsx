"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";

export default function Hero() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-white">
      {/* Simple gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-cyan-50"></div>

      {/* Simple animated shapes */}
      <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-blue-200 mix-blend-multiply opacity-20 animate-blob"></div>
      <div className="absolute bottom-20 left-20 w-64 h-64 rounded-full bg-cyan-200 mix-blend-multiply opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute top-40 left-40 w-64 h-64 rounded-full bg-indigo-200 mix-blend-multiply opacity-20 animate-blob animation-delay-4000"></div>

      <div className="relative z-10 container mx-auto px-4 md:px-6 pt-32 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-6 px-4 py-1.5 bg-blue-50 border border-blue-100 rounded-full"
          >
            <span className="text-blue-600 font-medium text-sm">
              Simple invoicing for busy people
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-neutral-900"
          >
            Get paid <span className="text-blue-600">faster</span> with
            InvoiceFlow
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-neutral-600 mb-10 max-w-2xl mx-auto"
          >
            Create professional invoices in seconds, send automatic reminders,
            and get paid on time, every time.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row justify-center gap-4 mb-16"
          >
            <Button
              size="lg"
              className="rounded-xl px-8 py-6 text-lg font-medium 
              bg-blue-600 hover:bg-blue-700
              text-white transition-all duration-300"
            >
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="rounded-xl px-8 py-6 text-lg font-medium 
              border-2 border-neutral-200 hover:border-neutral-300
              text-neutral-700 transition-all duration-300"
            >
              See How It Works
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto"
          >
            {[
              "Create invoices in seconds",
              "Get paid 3x faster",
              "Track everything automatically",
            ].map((feature, i) => (
              <div key={i} className="flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-blue-500 mr-2 shrink-0" />
                <span className="text-neutral-700">{feature}</span>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-16 max-w-5xl mx-auto"
        >
          <div className="relative">
            {/* Simple browser frame */}
            <div className="w-full h-12 bg-neutral-100 rounded-t-xl border border-neutral-200 flex items-center px-4">
              <div className="flex space-x-2">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <div className="mx-auto bg-white rounded-full px-4 py-1 text-sm text-neutral-500 border border-neutral-200">
                app.invoiceflow.com
              </div>
            </div>

            {/* Simple invoice image */}
            <div className="border-x border-b border-neutral-200 rounded-b-xl overflow-hidden shadow-lg">
              <img
                src="/placeholder.svg?height=600&width=1000&text=Simple+Invoice+Dashboard"
                alt="InvoiceFlow Dashboard"
                className="w-full h-auto bg-white"
              />
            </div>

            {/* Simple floating elements */}
            <div className="absolute -right-6 -bottom-6 bg-white rounded-xl p-4 shadow-lg border border-neutral-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-neutral-900">
                    Payment Received
                  </p>
                  <p className="text-sm text-neutral-500">$1,200.00</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="mt-16 flex justify-center items-center space-x-8"
        >
          {[
            "Trusted by 5,000+ businesses worldwide",
            "4.9/5 average rating",
            "14-day free trial",
          ].map((text, i) => (
            <div key={i} className="text-neutral-500 text-sm flex items-center">
              <span className="inline-block w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
              {text}
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
