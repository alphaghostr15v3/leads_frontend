import React from 'react';
import Navbar from '../components/Navbar';
import SpaceBackground from '../components/3d/SpaceBackground';
import HeroSection from '../components/sections/HeroSection';
import ServicesSection from '../components/sections/ServicesSection';
import PortfolioSection from '../components/sections/PortfolioSection';
import TestimonialsSection from '../components/sections/TestimonialsSection';
import TeamSection from '../components/sections/TeamSection';
import ProcessSection from '../components/sections/ProcessSection';
import ContactSection from '../components/sections/ContactSection';
import Footer from '../components/Footer';

export default function HomePage() {
    return (
        <div className="relative">
            <SpaceBackground />
            <Navbar />

            <main>
                <HeroSection />
                <ServicesSection />
                <PortfolioSection />
                <TestimonialsSection />
                <TeamSection />
                <ProcessSection />
                <ContactSection />
            </main>

            <Footer />
        </div>
    );
}
