"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const companies = [
  {
    name: "Next.js",
    src: "/svg-companies/next.js.svg",
    alt: "Next.js logo",
  },
  {
    name: "Figma",
    src: "/svg-companies/figma.svg",
    alt: "Figma logo",
  },
  {
    name: "Adobe",
    src: "/svg-companies/adobe.svg",
    alt: "Adobe logo",
  },

  {
    name: "Stripe",
    src: "/svg-companies/stripe.svg",
    alt: "Stripe logo",
  },
];

export default function CompanyBanner() {
  return (
    <div className="py-8 md:py-16">
      <div className="flex items-center justify-center gap-8 md:gap-12 lg:gap-16 flex-wrap">
        {companies.map((company, index) => (
          <motion.div
            key={company.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: index * 0.1,
              ease: "easeOut",
            }}
            className="flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
          >
            <Image
              src={company.src}
              alt={company.alt}
              width={120}
              height={40}
              className="h-8 md:h-12 w-auto object-contain"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
