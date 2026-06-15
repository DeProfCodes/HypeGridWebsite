import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import BrandLogo from '@/components/brand/BrandLogo';

// Lean desktop nav — the most important destinations only, so the header stays
// premium and never wraps. Secondary pages (Services, Packages, About) remain
// reachable from the footer and the mobile menu below.
const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Deals', path: '/deals' },
  { label: 'Advertise', path: '/campaigns' },
  { label: 'Creators', path: '/creators' },
  { label: 'Alerts', path: '/alerts' },
  { label: 'Contact', path: '/contact' },
];

// Mobile can carry more — keep every useful page accessible here.
const mobileLinks = [
  { label: 'Home', path: '/' },
  { label: 'Deals', path: '/deals' },
  { label: 'Advertise', path: '/campaigns' },
  { label: 'Creator Network', path: '/creators' },
  { label: 'Alerts', path: '/alerts' },
  { label: 'Services', path: '/services' },
  { label: 'Packages', path: '/packages' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-hype-navy/80 backdrop-blur-xl border-b border-white/5 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <BrandLogo className="w-[120px] sm:w-[150px] h-auto" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  location.pathname === link.path
                    ? 'text-hype-green'
                    : 'text-hype-slate hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA — one clean primary action only */}
          <div className="hidden lg:flex items-center">
            <Link to="/campaigns">
              <Button className="bg-hype-cyan text-hype-navy hover:bg-hype-cyan/90 font-semibold text-sm glow-cyan">
                <Zap className="w-4 h-4 mr-1" />
                Start a Campaign
              </Button>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-hype-navy/95 backdrop-blur-xl border-t border-white/5"
          >
            <div className="px-4 py-6 space-y-1">
              {mobileLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                    location.pathname === link.path
                      ? 'text-hype-green bg-hype-green/5'
                      : 'text-hype-slate hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 space-y-3 border-t border-white/5 mt-4">
                <Link to="/creators" className="block">
                  <Button variant="outline" className="w-full text-hype-green border-hype-green/30 hover:bg-hype-green/10">
                    Join Creator Network
                  </Button>
                </Link>
                <Link to="/campaigns" className="block">
                  <Button className="w-full bg-hype-cyan text-hype-navy hover:bg-hype-cyan/90 font-semibold">
                    <Zap className="w-4 h-4 mr-1" />
                    Start a Campaign
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}