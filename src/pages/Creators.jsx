import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, DollarSign, Briefcase, TrendingUp, Users, Sparkles, Heart, AlertCircle } from 'lucide-react';
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
import { publicApi } from '@/api/publicApi';
import { usePublicForm } from '@/hooks/usePublicForm';

const benefits = [
  { icon: DollarSign, title: 'Paid Campaigns', description: 'Get access to paid brand campaigns.' },
  { icon: Briefcase, title: 'Brand Collabs', description: 'Work with businesses, artists, and events.' },
  { icon: TrendingUp, title: 'Grow Your Profile', description: 'Grow your creator profile.' },
  { icon: Users, title: 'Join the Movement', description: 'Collaborate with a marketing movement.' },
  { icon: Sparkles, title: 'Earn Income', description: 'Turn your audience and creativity into income.' },
  { icon: Heart, title: 'Digital Culture', description: 'Join a network built for modern digital culture.' },
];

const followerRanges = ['Under 1K', '1K–5K', '5K–10K', '10K–50K', '50K–100K', '100K+'];
const niches = ['Lifestyle', 'Music', 'Comedy', 'Fashion', 'Beauty', 'Business', 'Fitness', 'Food', 'Events', 'Tech', 'Other'];
const mainPlatforms = ['TikTok', 'Instagram', 'Facebook', 'YouTube', 'Twitter/X', 'WhatsApp'];

export default function Creators() {
  const { submitting, submitted, error, submit } = usePublicForm(publicApi.submitCreatorApplication);
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    platform: '',
    handle: '',
    followers: '',
    niche: '',
    why: '',
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
            label="Creator Network"
            title="Join the HypeGrid"
            titleHighlight="Creator Network."
            subtitle="HypeGrid works with creators, influencers, promoters, content pages, editors, and digital voices who help brands reach real people across TikTok, Instagram, Facebook, YouTube, and WhatsApp."
          />
        </div>
      </GridBackground>

      {/* Turn Your Influence */}
      <section className="pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card-green rounded-2xl p-8 md:p-12 text-center mb-16"
          >
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-4">
              Turn Your Influence Into <span className="text-hype-green text-glow-green">Opportunity</span>
            </h2>
            <p className="text-hype-slate text-lg max-w-3xl mx-auto leading-relaxed">
              Whether you create videos, run a content page, influence your community, edit visuals, promote music, or understand social media culture — HypeGrid gives you a way to collaborate with brands, artists, events, and campaigns.
            </p>
          </motion.div>

          {/* Benefits */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {benefits.map((b, i) => {
              const Icon = b.icon;
              return (
                <GlassCard key={b.title} variant="green" className="p-6">
                  <div className="w-10 h-10 rounded-lg bg-hype-green/10 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-hype-green" />
                  </div>
                  <h3 className="font-heading text-base font-semibold text-white mb-1">{b.title}</h3>
                  <p className="text-hype-slate text-sm">{b.description}</p>
                </GlassCard>
              );
            })}
          </div>

          {/* Application Form */}
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <p className="font-mono text-xs tracking-[0.2em] text-hype-green uppercase mb-3">Apply Now</p>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-white">Creator Application</h2>
            </motion.div>

            {submitted ? (
              <FormSuccess
                title="Application Received"
                message="Your creator application has been received. The HypeGrid team will review it and contact you shortly."
              />
            ) : (
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                onSubmit={handleSubmit}
                className="glass-card-green rounded-2xl p-8 md:p-10 space-y-6"
              >
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-white/80 text-sm mb-2 block">Full Name *</Label>
                    <Input required value={form.fullName} onChange={(e) => handleChange('fullName', e.target.value)}
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-hype-green/50 h-12" placeholder="Your full name" />
                  </div>
                  <div>
                    <Label className="text-white/80 text-sm mb-2 block">Email *</Label>
                    <Input type="email" required value={form.email} onChange={(e) => handleChange('email', e.target.value)}
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-hype-green/50 h-12" placeholder="you@email.com" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-white/80 text-sm mb-2 block">Phone / WhatsApp</Label>
                    <Input value={form.phone} onChange={(e) => handleChange('phone', e.target.value)}
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-hype-green/50 h-12" placeholder="+27 ..." />
                  </div>
                  <div>
                    <Label className="text-white/80 text-sm mb-2 block">City / Province</Label>
                    <Input value={form.city} onChange={(e) => handleChange('city', e.target.value)}
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-hype-green/50 h-12" placeholder="e.g. Johannesburg, Gauteng" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-white/80 text-sm mb-2 block">Main Platform *</Label>
                    <Select value={form.platform} onValueChange={(v) => handleChange('platform', v)}>
                      <SelectTrigger className="bg-white/5 border-white/10 text-white h-12">
                        <SelectValue placeholder="Select platform" />
                      </SelectTrigger>
                      <SelectContent className="bg-hype-dark border-white/10">
                        {mainPlatforms.map(p => (
                          <SelectItem key={p} value={p} className="text-white hover:bg-white/10">{p}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-white/80 text-sm mb-2 block">Handle / Profile Link</Label>
                    <Input value={form.handle} onChange={(e) => handleChange('handle', e.target.value)}
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-hype-green/50 h-12" placeholder="@yourhandle or profile URL" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-white/80 text-sm mb-2 block">Follower Range</Label>
                    <Select value={form.followers} onValueChange={(v) => handleChange('followers', v)}>
                      <SelectTrigger className="bg-white/5 border-white/10 text-white h-12">
                        <SelectValue placeholder="Select range" />
                      </SelectTrigger>
                      <SelectContent className="bg-hype-dark border-white/10">
                        {followerRanges.map(f => (
                          <SelectItem key={f} value={f} className="text-white hover:bg-white/10">{f}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-white/80 text-sm mb-2 block">Content Niche</Label>
                    <Select value={form.niche} onValueChange={(v) => handleChange('niche', v)}>
                      <SelectTrigger className="bg-white/5 border-white/10 text-white h-12">
                        <SelectValue placeholder="Select niche" />
                      </SelectTrigger>
                      <SelectContent className="bg-hype-dark border-white/10">
                        {niches.map(n => (
                          <SelectItem key={n} value={n} className="text-white hover:bg-white/10">{n}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label className="text-white/80 text-sm mb-2 block">Why do you want to join HypeGrid?</Label>
                  <Textarea value={form.why} onChange={(e) => handleChange('why', e.target.value)}
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-hype-green/50 min-h-[100px]"
                    placeholder="Tell us about yourself, your content, and what excites you about HypeGrid..."
                  />
                </div>

                {error && (
                  <div className="flex items-start gap-2 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
                    <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <Button type="submit" size="lg" disabled={submitting} className="w-full bg-hype-green text-hype-navy hover:bg-hype-green/90 font-bold text-base h-14 glow-green disabled:opacity-60">
                  {submitting ? 'Submitting...' : 'Submit Creator Application'}
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </motion.form>
            )}
          </div>

          {/* Brand CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 text-center"
          >
            <div className="glass-card rounded-2xl p-10 max-w-2xl mx-auto">
              <h3 className="font-heading text-xl font-bold text-white mb-3">
                Want creators to promote your brand?
              </h3>
              <p className="text-hype-slate mb-6">
                Activate our creator network for your next campaign.
              </p>
              <Link to="/campaigns">
                <Button size="lg" className="bg-hype-cyan text-hype-navy hover:bg-hype-cyan/90 font-semibold glow-cyan">
                  <Zap className="w-5 h-5 mr-2" />
                  Run an Influencer Campaign
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
}