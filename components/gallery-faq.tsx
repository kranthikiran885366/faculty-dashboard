"use client"

import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How can I download images from the gallery?",
    answer: "Click on any image to open it in the modal view. Then click the download button (with the download icon) in the top-right corner to save the image to your device."
  },
  {
    question: "Are these images free to use?",
    answer: "All images in this gallery are property of Vignan's University and are intended for personal use only. Please contact the university administration for commercial usage rights."
  },
  {
    question: "How often is the gallery updated?",
    answer: "The gallery is updated regularly with new campus photos. We typically add new images every semester to showcase the latest developments and events."
  },
  {
    question: "Can I request specific photos to be added?",
    answer: "Yes! If you'd like to see specific areas of the campus or events featured in the gallery, please contact the university's media department."
  },
  {
    question: "What is the image quality of the photos?",
    answer: "All images are high-resolution and optimized for web viewing. When downloading, you'll receive the full-resolution version of the image."
  }
];

export function GalleryFAQ() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="max-w-3xl mx-auto px-4 py-16 sm:px-6 lg:px-8"
    >
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-[#f14e9b] via-[#8e3fa8] to-[#2b59c3] bg-clip-text text-transparent"
      >
        Frequently Asked Questions
      </motion.h2>

      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent>
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </motion.div>
  );
} 