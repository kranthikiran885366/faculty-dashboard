import { Gallery } from '@/components/gallery';
import { GalleryFAQ } from '@/components/gallery-faq';
import { Footer } from '@/components/footer';

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
      <Gallery />
      <GalleryFAQ />
      <Footer />
    </div>
  );
} 