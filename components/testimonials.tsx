"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

function FloatingPaths({ position }: { position: number }) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    color: `rgba(15,23,42,${0.1 + i * 0.03})`,
    width: 0.5 + i * 0.03,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg
        className="w-full h-full text-blue-500/30"
        viewBox="0 0 696 316"
        fill="none"
      >
        <title>Background Paths</title>
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={0.08 + path.id * 0.01}
            initial={{ pathLength: 0.3, opacity: 0.6 }}
            animate={{
              pathLength: 1,
              opacity: [0.3, 0.6, 0.3],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  );
}

const testimonials = [
  {
    quote:
      "InvoiceFlow has completely transformed how we handle our billing. The automated reminders have reduced our late payments by 75%. The dashboard gives us insights we never had before.",
    author: "Sarah Johnson",
    position: "CFO, TechStart Inc.",
    rating: 5,
    image: "/placeholder.svg?height=100&width=100",
    company: "TechStart Inc.",
    companyLogo: "/placeholder.svg?height=40&width=120",
  },
  {
    quote:
      "The customizable templates and multi-currency support make it easy to work with international clients. Our invoicing process is now 3x faster, and we can focus on growing our business instead of chasing payments.",
    author: "Michael Chen",
    position: "Freelance Designer",
    rating: 5,
    image: "/placeholder.svg?height=100&width=100",
    company: "Chen Design Studio",
    companyLogo: "/placeholder.svg?height=40&width=120",
  },
  {
    quote:
      "As a small business owner, I needed something simple yet powerful. InvoiceFlow strikes the perfect balance and their customer support is exceptional. I've recommended it to all my business contacts.",
    author: "Emma Rodriguez",
    position: "Owner, Bright Ideas Consulting",
    rating: 4,
    image: "/placeholder.svg?height=100&width=100",
    company: "Bright Ideas Consulting",
    companyLogo: "/placeholder.svg?height=40&width=120",
  },
  {
    quote:
      "The financial insights have given us visibility we never had before. We've been able to identify our most profitable clients and optimize our pricing. It's like having a financial advisor built into our invoicing system.",
    author: "David Wilson",
    position: "Director, Wilson Accounting",
    rating: 5,
    image: "/placeholder.svg?height=100&width=100",
    company: "Wilson Accounting",
    companyLogo: "/placeholder.svg?height=40&width=120",
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  useEffect(() => {
    if (!autoplay) return;

    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoplay]);

  const handlePrev = () => {
    setAutoplay(false);
    setActiveIndex(
      (current) => (current - 1 + testimonials.length) % testimonials.length
    );
  };

  const handleNext = () => {
    setAutoplay(false);
    setActiveIndex((current) => (current + 1) % testimonials.length);
  };

  return (
    <section id="testimonials" className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-4 px-4 py-1.5 bg-blue-50 border border-blue-100 rounded-full"
          >
            <span className="text-blue-600 font-medium text-sm">
              Customer Success Stories
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold mb-4 text-neutral-900"
          >
            What Our Customers Say
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-neutral-700"
          >
            Thousands of businesses trust InvoiceFlow to handle their invoicing
            needs
          </motion.p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-200 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-cyan-200 rounded-full opacity-20 blur-3xl"></div>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 md:p-12 border border-blue-100"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                  <div className="md:col-span-4 flex flex-col items-center md:items-start">
                    <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-white shadow-lg">
                      <img
                        src={
                          testimonials[activeIndex].image || "/placeholder.svg"
                        }
                        alt={testimonials[activeIndex].author}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <h3 className="text-xl font-bold text-neutral-900 mb-1 text-center md:text-left">
                      {testimonials[activeIndex].author}
                    </h3>
                    <p className="text-neutral-600 mb-3 text-center md:text-left">
                      {testimonials[activeIndex].position}
                    </p>

                    <div className="flex mb-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < testimonials[activeIndex].rating
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-neutral-300"
                          }`}
                        />
                      ))}
                    </div>

                    <div className="p-3 bg-neutral-50 rounded-lg border border-neutral-200 w-full max-w-[200px]">
                      <img
                        src={
                          testimonials[activeIndex].companyLogo ||
                          "/placeholder.svg"
                        }
                        alt={testimonials[activeIndex].company}
                        className="w-full h-auto"
                      />
                    </div>
                  </div>

                  <div className="md:col-span-8 relative">
                    <Quote className="absolute top-0 left-0 h-12 w-12 text-blue-100 -translate-x-6 -translate-y-6" />
                    <p className="text-lg md:text-xl text-neutral-700 italic leading-relaxed">
                      "{testimonials[activeIndex].quote}"
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center mt-8 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setAutoplay(false);
                    setActiveIndex(index);
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    activeIndex === index
                      ? "bg-blue-600 w-8"
                      : "bg-blue-200 hover:bg-blue-300"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <div className="flex justify-between mt-8">
              <Button
                onClick={handlePrev}
                variant="outline"
                size="icon"
                className="rounded-full w-12 h-12 border-blue-200 hover:border-blue-300 hover:bg-blue-50"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-6 w-6 text-blue-600" />
              </Button>

              <Button
                onClick={handleNext}
                variant="outline"
                size="icon"
                className="rounded-full w-12 h-12 border-blue-200 hover:border-blue-300 hover:bg-blue-50"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-6 w-6 text-blue-600" />
              </Button>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {[
              { label: "Customer Satisfaction", value: "98%" },
              { label: "Time Saved on Invoicing", value: "75%" },
              { label: "Faster Payments", value: "3x" },
              { label: "ROI for Customers", value: "320%" },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg border border-blue-100 text-center"
              >
                <p className="text-3xl font-bold text-blue-600 mb-2">
                  {stat.value}
                </p>
                <p className="text-neutral-600 text-sm">{stat.label}</p>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-16 text-center"
          >
            <Button
              className="rounded-xl px-8 py-6 text-lg font-medium 
              bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600
              text-white transition-all duration-300 
              hover:-translate-y-0.5 shadow-lg hover:shadow-xl shadow-blue-500/20"
            >
              Join Thousands of Happy Customers
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
