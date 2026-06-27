import Hero from '@/components/Hero';
import Manifesto from '@/components/Manifesto';
import VenueTeaser from '@/components/VenueTeaser';
import WaitlistForm from '@/components/WaitlistForm';
import InstagramGallery from '@/components/InstagramGallery';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-ink-900 text-bone">
      <Hero />
      <Manifesto />
      <VenueTeaser />
      <WaitlistForm />
      <InstagramGallery />
      <FAQ />
      <Footer />
    </main>
  );
}
