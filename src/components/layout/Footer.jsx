import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BrandLogo from '@/components/brand/BrandLogo';
import { SocialLinks } from '@/components/ui/SocialIcons';

const quickLinks = [
  { label: 'Home', path: '/' },
  { label: 'Services', path: '/services' },
  { label: 'Campaigns', path: '/campaigns' },
  { label: 'Packages', path: '/packages' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

const serviceLinks = [
  { label: 'Business Promotion', path: '/services' },
  { label: 'Music Promotion', path: '/services' },
  { label: 'Event Promotion', path: '/services' },
  { label: 'Launch Campaigns', path: '/services' },
  { label: 'Social Media Management', path: '/services' },
  { label: 'Creator Network', path: '/creators' },
];

export default function Footer() {
  return (
    <footer className="relative bg-hype-navy border-t border-white/5">
      {/* Final CTA Section */}
      <div className="relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{ 
            backgroundImage: 'linear-gradient(rgba(0, 242, 255, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 242, 255, 0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }}
          aria-hidden="true"
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center relative z-10">
          <p className="font-mono text-xs tracking-[0.2em] text-hype-cyan uppercase mb-6">
            The Final Signal
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Your brand is ready.<br />
            <span className="text-glow-green text-hype-green">Let's make people notice.</span>
          </h2>
          <p className="text-hype-slate text-lg max-w-2xl mx-auto mb-10">
            Whether you are launching a business, pushing a song, promoting an event, or growing your online presence — HypeGrid helps you create the attention your brand deserves.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/campaigns">
              <Button size="lg" className="bg-hype-cyan text-hype-navy hover:bg-hype-cyan/90 font-semibold text-base px-8 glow-cyan">
                <Zap className="w-5 h-5 mr-2" />
                Start a Campaign
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/5 text-base px-8">
                Talk to HypeGrid
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer Links */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand */}
            <div className="lg:col-span-1">
              <Link to="/" className="flex items-center mb-4">
                <BrandLogo className="w-[150px] h-auto" />
              </Link>
              <p className="text-hype-slate text-sm leading-relaxed mb-6">
                HypeGrid helps brands, artists, creators, and businesses get seen through content, creators, campaigns, and digital strategy.
              </p>
              <SocialLinks variant="footer" size={18} />
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-heading text-sm font-semibold text-white mb-4">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.path + link.label}>
                    <Link to={link.path} className="text-hype-slate text-sm hover:text-hype-green transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-heading text-sm font-semibold text-white mb-4">Services</h4>
              <ul className="space-y-3">
                {serviceLinks.map((link) => (
                  <li key={link.label}>
                    <Link to={link.path} className="text-hype-slate text-sm hover:text-hype-cyan transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTAs */}
            <div>
              <h4 className="font-heading text-sm font-semibold text-white mb-4">Get Started</h4>
              <div className="space-y-3">
                <Link to="/campaigns" className="block">
                  <Button className="w-full bg-hype-cyan/10 text-hype-cyan border border-hype-cyan/20 hover:bg-hype-cyan/20 text-sm justify-start">
                    <Zap className="w-4 h-4 mr-2" />
                    Start a Campaign
                  </Button>
                </Link>
                <Link to="/creators" className="block">
                  <Button variant="outline" className="w-full border-hype-green/20 text-hype-green hover:bg-hype-green/10 text-sm justify-start">
                    <ArrowRight className="w-4 h-4 mr-2" />
                    Join Creator Network
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-hype-slate text-xs">
              © {new Date().getFullYear()} HypeGrid. All rights reserved.
            </p>
            <p className="text-hype-slate/50 text-xs font-mono">
              Powered by content, creators, and culture.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}