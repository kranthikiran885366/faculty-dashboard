import { motion } from 'framer-motion';

export function About() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8"
    >
      <motion.h1 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-[#f14e9b] via-[#8e3fa8] to-[#2b59c3] bg-clip-text text-transparent"
      >
        About Vignan's University
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-semibold">Our Vision</h2>
          <p className="text-gray-600 dark:text-gray-300">
            To evolve into a center of excellence in technical education and research, 
            meeting the contemporary challenges of globalization through holistic development 
            of students for the benefit of society.
          </p>

          <h2 className="text-2xl font-semibold">Our Mission</h2>
          <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300 space-y-2">
            <li>Providing quality education and training using modern teaching-learning processes</li>
            <li>Promoting research and development activities</li>
            <li>Developing industry-institute relationships</li>
            <li>Fostering entrepreneurship skills</li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-6"
        >
          <h2 className="text-2xl font-semibold">Key Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              "State-of-the-art Infrastructure",
              "Experienced Faculty",
              "Research Centers",
              "Industry Collaborations",
              "Modern Laboratories",
              "Digital Library",
              "Sports Facilities",
              "Placement Cell"
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="p-4 bg-gradient-to-r from-[#f14e9b]/10 via-[#8e3fa8]/10 to-[#2b59c3]/10 rounded-lg"
              >
                {feature}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
} 