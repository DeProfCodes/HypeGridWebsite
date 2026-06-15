import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Building2, Music, Users, Rocket, CalendarDays, BarChart3, Palette, Target, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SectionHeading from '@/components/ui/SectionHeading';

const services = [
  { icon: Building2, title: 'Business Promotion', color: 'cyan' },
  { icon: Music, title: 'Music & Artist Promotion', color: 'green' },
  { icon: Users, title: 'Influencer & Creator Campaigns', color: 'cyan' },
  { icon: Rocket, title: 'Launch Campaigns', color: 'green' },
  { icon: CalendarDays, title: 'Event Promotion', color: 'cyan' },
  { icon: BarChart3, title: 'Social Media Management', color: 'green' },
  { icon: Palette, title: 'Content Creation', color: 'cyan' },
  { icon: Target, title: 'Paid Traffic Campaigns', color: 'green' },
];

export default function ServicesPreview() {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          label="Our Services"
          title="Campaigns Built for the Way People"
          titleHighlight="Discover Brands Today."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
              >
                <Link
                  to="/services"
                  className={`block p-6 rounded-xl bg-white/[0.02] border border-white/5 hover:border-${service.color === 'green' ? 'hype-green' : 'hype-cyan'}/20 transition-all duration-300 group h-full`}
                >
                  <Icon className={`w-6 h-6 mb-3 ${service.color === 'green' ? 'text-hype-green' : 'text-hype-cyan'}`} />
                  <h3 className="font-heading text-sm font-semibold text-white group-hover:text-hype-green transition-colors">
                    {service.title}
                  </h3>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link to="/services">
            <Button variant="outline" className="border-white/20 text-white hover:bg-white/5">
              View All Services
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}