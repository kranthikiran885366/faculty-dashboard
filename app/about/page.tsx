"use client"

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Footer } from '@/components/footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative py-20"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#f14e9b] via-[#8e3fa8] to-[#2b59c3] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-[#f14e9b] via-[#8e3fa8] to-[#2b59c3] bg-clip-text text-transparent"
            >
              About Vignan's University
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-gray-600 mb-8"
            >
              Empowering students with quality education and fostering academic excellence since 1997
            </motion.p>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Link href="/contact">
                <Button className="bg-gradient-to-r from-[#f14e9b] to-[#8e3fa8] hover:from-[#8e3fa8] hover:to-[#f14e9b] text-white">
                  Contact Us
                </Button>
              </Link>
              <Link href="/gallery">
                <Button variant="outline">View Campus Gallery</Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Mission & Vision Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="py-16 bg-white"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-lg shadow-lg"
            >
              <h2 className="text-2xl font-bold mb-4 text-[#8e3fa8]">Our Mission</h2>
              <p className="text-gray-600 mb-4">
                To provide quality education that empowers students with knowledge, skills, and values necessary to excel in their chosen fields and contribute meaningfully to society.
              </p>
              <p className="text-gray-600">
                We are committed to fostering an environment of academic excellence, innovation, and research that addresses the challenges of the modern world.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-lg shadow-lg"
            >
              <h2 className="text-2xl font-bold mb-4 text-[#8e3fa8]">Our Vision</h2>
              <p className="text-gray-600 mb-4">
                To be a globally recognized institution of academic excellence, producing leaders and innovators who make significant contributions to society and the world.
              </p>
              <p className="text-gray-600">
                We aspire to create a transformative educational experience that prepares students for the challenges and opportunities of the 21st century.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* History Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="py-16"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.h2 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-[#f14e9b] to-[#8e3fa8] bg-clip-text text-transparent"
            >
              Our History
            </motion.h2>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-white p-8 rounded-lg shadow-lg"
            >
              <p className="text-gray-600 mb-4">
                Vignan's University was established in 1997 with a vision to provide quality education in engineering and technology. What began as a small institution has now grown into a comprehensive university offering a wide range of programs across various disciplines.
              </p>
              <p className="text-gray-600 mb-4">
                Over the years, we have expanded our academic offerings, built state-of-the-art facilities, and established partnerships with leading institutions and industries worldwide. Our commitment to excellence has earned us recognition and accreditation from various national and international bodies.
              </p>
              <p className="text-gray-600">
                Today, Vignan's University stands as a testament to the power of education in transforming lives and shaping the future. Our alumni are making significant contributions in various fields, both nationally and internationally.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Values Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="py-16 bg-white"
      >
        <div className="container mx-auto px-4">
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-[#f14e9b] to-[#8e3fa8] bg-clip-text text-transparent"
          >
            Our Core Values
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Excellence", description: "We strive for excellence in all aspects of education, research, and service." },
              { title: "Innovation", description: "We encourage creativity, critical thinking, and innovative approaches to problem-solving." },
              { title: "Integrity", description: "We uphold the highest standards of academic and professional integrity." },
              { title: "Inclusivity", description: "We embrace diversity and create an inclusive environment for all." },
              { title: "Collaboration", description: "We foster partnerships and collaboration with stakeholders to achieve common goals." },
              { title: "Sustainability", description: "We are committed to environmental sustainability and social responsibility." }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <h3 className="text-xl font-semibold mb-3 text-[#8e3fa8]">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="py-16"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-3xl font-bold mb-6 bg-gradient-to-r from-[#f14e9b] to-[#8e3fa8] bg-clip-text text-transparent"
            >
              Join Our Community
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-xl text-gray-600 mb-8"
            >
              Become part of our vibrant academic community and embark on a journey of learning, growth, and discovery.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <Link href="/admissions">
                <Button className="bg-gradient-to-r from-[#f14e9b] to-[#8e3fa8] hover:from-[#8e3fa8] hover:to-[#f14e9b] text-white">
                  Apply Now
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline">Learn More</Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
} 