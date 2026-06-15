import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Reusable "Join HypeGrid Deals Club" CTA banner. Routes to the /alerts opt-in
// questionnaire (no WhatsApp link here — the channel link is only shown after a
// consented submit). Used on the homepage and the deals page.
export default function DealsClubCta() {
  return (
    <section className="py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card rounded-2xl p-8 md:p-10 text-center relative overflow-hidden"
        >
          <div className="w-14 h-14 rounded-2xl bg-hype-green/10 flex items-center justify-center mx-auto mb-5">
            <MessageCircle className="w-7 h-7 text-hype-green" />
          </div>
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-3">
            Get the hottest deals on <span className="text-hype-green">WhatsApp</span>
          </h2>
          <p className="text-hype-slate text-base max-w-xl mx-auto mb-7">
            Tell us what you care about and we&rsquo;ll help you discover specials, drops, events,
            and campaigns worth noticing. Join the HypeGrid Deals Club.
          </p>
          <Link to="/alerts">
            <Button size="lg" className="bg-hype-green text-hype-navy hover:bg-hype-green/90 font-bold text-base h-14 px-8">
              Join HypeGrid Deals Club
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
