import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, ArrowRight, Users, Send, MessageSquare, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import PageLayout from '@/components/layout/PageLayout';
import GridBackground from '@/components/layout/GridBackground';
import SectionHeading from '@/components/ui/SectionHeading';
import GlassCard from '@/components/ui/GlassCard';
import FormSuccess from '@/components/forms/FormSuccess';
import { SocialLinks } from '@/components/ui/SocialIcons';
import { publicApi } from '@/api/publicApi';
import { usePublicForm } from '@/hooks/usePublicForm';

const interests = [
  'Starting a Campaign',
  'Joining the Creator Network',
  'Social Media Management',
  'Music Promotion',
  'Event Promotion',
  'Business Promotion',
  'Other',
];

const ctaCards = [
  {
    title: 'Start a Campaign',
    description: 'For brands, businesses, artists, and events that need promotion.',
    icon: Zap,
    link: '/campaigns',
    buttonText: 'Start Campaign',
    color: 'cyan',
  },
  {
    title: 'Join Creator Network',
    description: 'For influencers, creators, content pages, editors, and promoters.',
    icon: Users,
    link: '/creators',
    buttonText: 'Apply as Creator',
    color: 'green',
  },
  {
    title: 'General Enquiry',
    description: 'For partnerships, questions, and custom requests.',
    icon: MessageSquare,
    link: '#contact-form',
    buttonText: 'Send Message',
    color: 'cyan',
  },
];

export default function Contact() {
  const { submitting, submitted, error, submit } = usePublicForm(publicApi.submitContact);
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    subject: '',
    interest: '',
    message: '',
  });

  const handleChange = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    submit(form);
  };

  return (
    <PageLayout>
      <GridBackground className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Contact"
            title="Let's Build Your"
            titleHighlight="Hype."
            subtitle="Ready to promote your brand, song, event, product, or campaign? Talk to HypeGrid."
          />
        </div>
      </GridBackground>

      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* CTA Cards */}
          <div className="grid sm:grid-cols-3 gap-6 mb-16">
            {ctaCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <GlassCard key={card.title} variant={card.color} className="p-6 text-center">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4 ${
                    card.color === 'green' ? 'bg-hype-green/10' : 'bg-hype-cyan/10'
                  }`}>
                    <Icon className={`w-6 h-6 ${card.color === 'green' ? 'text-hype-green' : 'text-hype-cyan'}`} />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-white mb-2">{card.title}</h3>
                  <p className="text-hype-slate text-sm mb-5">{card.description}</p>
                  <Link to={card.link}>
                    <Button
                      variant="outline"
                      className={`w-full ${
                        card.color === 'green'
                          ? 'border-hype-green/20 text-hype-green hover:bg-hype-green/10'
                          : 'border-hype-cyan/20 text-hype-cyan hover:bg-hype-cyan/10'
                      }`}
                    >
                      {card.buttonText}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </GlassCard>
              );
            })}
          </div>

          {/* Contact Form */}
          <div id="contact-form" className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <p className="font-mono text-xs tracking-[0.2em] text-hype-cyan uppercase mb-3">Get In Touch</p>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-white">Send Us a Message</h2>
            </motion.div>

            {submitted ? (
              <FormSuccess
                title="Message Sent"
                message="Your message has been received. The HypeGrid team will get back to you shortly."
              />
            ) : (
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                onSubmit={handleSubmit}
                className="glass-card rounded-2xl p-8 md:p-10 space-y-6"
              >
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-white/80 text-sm mb-2 block">Full Name *</Label>
                    <Input required value={form.fullName} onChange={(e) => handleChange('fullName', e.target.value)}
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-hype-cyan/50 h-12" placeholder="Your full name" />
                  </div>
                  <div>
                    <Label className="text-white/80 text-sm mb-2 block">Email *</Label>
                    <Input type="email" required value={form.email} onChange={(e) => handleChange('email', e.target.value)}
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-hype-cyan/50 h-12" placeholder="you@email.com" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-white/80 text-sm mb-2 block">Phone / WhatsApp</Label>
                    <Input value={form.phone} onChange={(e) => handleChange('phone', e.target.value)}
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-hype-cyan/50 h-12" placeholder="+27 ..." />
                  </div>
                  <div>
                    <Label className="text-white/80 text-sm mb-2 block">Subject</Label>
                    <Input value={form.subject} onChange={(e) => handleChange('subject', e.target.value)}
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-hype-cyan/50 h-12" placeholder="What is this about?" />
                  </div>
                </div>

                <div>
                  <Label className="text-white/80 text-sm mb-2 block">I am interested in</Label>
                  <Select value={form.interest} onValueChange={(v) => handleChange('interest', v)}>
                    <SelectTrigger className="bg-white/5 border-white/10 text-white h-12">
                      <SelectValue placeholder="Select interest" />
                    </SelectTrigger>
                    <SelectContent className="bg-hype-dark border-white/10">
                      {interests.map(i => (
                        <SelectItem key={i} value={i} className="text-white hover:bg-white/10">{i}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-white/80 text-sm mb-2 block">Message *</Label>
                  <Textarea required value={form.message} onChange={(e) => handleChange('message', e.target.value)}
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-hype-cyan/50 min-h-[120px]"
                    placeholder="Tell us how we can help..."
                  />
                </div>

                {error && (
                  <div className="flex items-start gap-2 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
                    <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <Button type="submit" size="lg" disabled={submitting} className="w-full bg-hype-cyan text-hype-navy hover:bg-hype-cyan/90 font-bold text-base h-14 glow-cyan disabled:opacity-60">
                  <Send className="w-5 h-5 mr-2" />
                  {submitting ? 'Sending...' : 'Send Message'}
                </Button>
              </motion.form>
            )}
          </div>
        </div>
      </section>

      {/* Follow HypeGrid — deliberate, colourful social section */}
      <section className="pb-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-mono text-xs tracking-[0.2em] text-hype-cyan uppercase mb-3">Follow HypeGrid</p>
          <h3 className="font-heading text-xl md:text-2xl font-bold text-white mb-6">Stay on the grid</h3>
          <SocialLinks variant="color" size={22} className="justify-center" />
        </div>
      </section>
    </PageLayout>
  );
}