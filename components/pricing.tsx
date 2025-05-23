"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { SectionTitle } from "./ui/SectionTitle";

const pricingPlans = [
  {
    name: "Free",
    price: "£0",
    description: "Get started with basic invoicing needs",
    features: [
      "1 invoice per month",
      "Basic templates",
      "Email support",
      "Payment tracking",
      "Client portal",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Professional",
    price: "£4.99",
    description: "Perfect for freelancers and small businesses",
    features: [
      "Up to 10 invoices per month",
      "Custom templates",
      "Priority support",
      "Recurring invoices",
      "Team access (2 users)",
      "Advanced reporting",
      "Multi-currency",
    ],
    cta: "Start Now",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "£19.99",
    description: "For established businesses with complex needs",
    features: [
      "Unlimited invoices",
      "Unlimited team members",
      "API access",
      "Dedicated account manager",
      "Custom integrations",
      "Advanced security",
      "Bulk operations",
      "White labeling",
    ],
    cta: "Start Now",
    popular: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24  bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <SectionTitle
          regularText="Simple, Transparent"
          highlightedText="Pricing"
          description="Choose the plan that works best for your business."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative rounded-2xl overflow-hidden ${
                plan.popular
                  ? "border-2 border-primary shadow-xl"
                  : "border border-neutral-200 shadow-lg"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-primary to-cyan-400 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                  MOST POPULAR
                </div>
              )}
              <div className="p-8 bg-white h-full flex flex-col">
                <h3 className="text-xl font-bold mb-2 text-neutral-900">
                  {plan.name}
                </h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-neutral-900">
                    {plan.price}
                  </span>
                  {plan.price !== "£0" && (
                    <span className="text-neutral-600">/month</span>
                  )}
                </div>
                <p className="text-neutral-700 mb-6">{plan.description}</p>

                <ul className="space-y-3 mb-8 flex-grow">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="h-5 w-5 text-primary mr-2 shrink-0 mt-0.5" />
                      <span className="text-neutral-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full cursor-pointer rounded-xl py-6 ${
                    plan.popular
                      ? "bg-gradient-to-r from-primary to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white shadow-md hover:shadow-xl"
                      : "bg-white hover:bg-neutral-50 text-neutral-900 border border-neutral-200"
                  } transition-all duration-300 hover:-translate-y-0.5`}
                >
                  {plan.cta}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
