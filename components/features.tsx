"use client";

import { motion } from "framer-motion";
import {
  FileText,
  CreditCard,
  BarChart4,
  Clock,
  Globe,
  Shield,
} from "lucide-react";

const features = [
  {
    icon: <FileText className="h-10 w-10 text-blue-500" />,
    title: "Professional Invoices",
    description:
      "Create beautiful, customizable invoices in seconds with our intuitive template system.",
  },
  {
    icon: <CreditCard className="h-10 w-10 text-blue-500" />,
    title: "Multiple Payment Options",
    description:
      "Accept payments via credit card, bank transfer, PayPal, and more with integrated payment processing.",
  },
  {
    icon: <BarChart4 className="h-10 w-10 text-blue-500" />,
    title: "Financial Insights",
    description:
      "Track your business performance with detailed reports and analytics dashboards.",
  },
  {
    icon: <Clock className="h-10 w-10 text-blue-500" />,
    title: "Automated Reminders",
    description:
      "Set up automatic payment reminders to reduce late payments and improve cash flow.",
  },
  {
    icon: <Globe className="h-10 w-10 text-blue-500" />,
    title: "Multi-Currency Support",
    description:
      "Invoice clients in their local currency with automatic exchange rate calculations.",
  },
  {
    icon: <Shield className="h-10 w-10 text-blue-500" />,
    title: "Secure & Compliant",
    description:
      "Bank-level security and compliance with global tax regulations for peace of mind.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-neutral-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4 text-neutral-900"
          >
            Powerful Features for Modern Businesses
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg text-neutral-700 max-w-2xl mx-auto"
          >
            Everything you need to streamline your invoicing process and get
            paid faster
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl p-8 shadow-md hover:shadow-lg transition-all duration-300 border border-neutral-200 hover:-translate-y-1"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-3 text-neutral-900">
                {feature.title}
              </h3>
              <p className="text-neutral-700">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
