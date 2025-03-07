
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  isPageLoaded: boolean;
}

const HeroSection = ({ isPageLoaded }: HeroSectionProps) => {
  return (
    <section 
      className={`mt-2 md:mt-4 relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/90 to-primary transition-all duration-700 transform ${
        isPageLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}
    >
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1543168256-418811576931?q=80&w=2940&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
      <div className="relative z-10 py-10 px-6 max-w-2xl mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Fresh groceries, delivered to your door
        </h1>
        <p className="text-white/90 text-base mb-6">
          Shop quality groceries from local farms and premium suppliers with fast, reliable delivery.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button 
            size="lg" 
            className="bg-white text-primary hover:bg-white/90 transition-smooth"
            asChild
          >
            <Link to="/search">Start Shopping</Link>
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-white text-white hover:bg-white/10 transition-smooth"
            asChild
          >
            <Link to="/about">Learn More</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
