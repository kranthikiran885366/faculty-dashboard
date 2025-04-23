"use client"

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Download, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const images = [
  { src: '/gallery/garlly1.jpg', alt: 'Campus View 1' },
  { src: '/gallery/g2.jpg', alt: 'Campus View 2' },
  { src: '/gallery/g3.jpg', alt: 'Campus View 3' },
  { src: '/gallery/g5.jpg', alt: 'Campus View 4' },
  { src: '/gallery/g6.jpg', alt: 'Campus View 5' },
  { src: '/gallery/g8.jpg', alt: 'Campus View 6' },
  { src: '/gallery/g9.jpg', alt: 'Campus View 7' },
  { src: '/gallery/WhatsApp Image 2025-04-11 at 22.12.31_3d8d14d9.jpg', alt: 'Campus View 8' },
];

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const handleImageClick = (index: number) => {
    setSelectedImage(index);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const handleDownload = (imageSrc: string, imageAlt: string) => {
    const link = document.createElement('a');
    link.href = imageSrc;
    link.download = `${imageAlt.toLowerCase().replace(/\s+/g, '-')}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
        Campus Gallery
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {images.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + index * 0.1 }}
            className="relative aspect-square overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
            onClick={() => handleImageClick(index)}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
              <div className="text-white">
                <h3 className="text-lg font-semibold">{image.alt}</h3>
                <p className="text-sm opacity-80">Click to view</p>
              </div>
            </div>
            <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Image
                src="/vignanlogo.png"
                alt="Vignan's Logo"
                width={24}
                height={24}
                className="rounded-full"
              />
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-4xl w-full bg-white rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-video">
                <Image
                  src={images[selectedImage].src}
                  alt={images[selectedImage].alt}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="absolute top-4 right-4 flex space-x-2">
                <Button
                  variant="secondary"
                  size="icon"
                  className="bg-white/90 hover:bg-white"
                  onClick={() => handleDownload(images[selectedImage].src, images[selectedImage].alt)}
                >
                  <Download className="h-5 w-5" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="bg-white/90 hover:bg-white"
                  onClick={handleCloseModal}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <div className="p-4 bg-white">
                <h3 className="text-xl font-semibold">{images[selectedImage].alt}</h3>
                <p className="text-gray-600 mt-2">Click the download button to save this image.</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}