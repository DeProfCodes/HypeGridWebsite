import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import PageLayout from '@/components/layout/PageLayout';
import GridBackground from '@/components/layout/GridBackground';
import SectionHeading from '@/components/ui/SectionHeading';
import FormSuccess from '@/components/forms/FormSuccess';
import { publicApi } from '@/api/publicApi';
import { usePublicForm } from '@/hooks/usePublicForm';

const campaignTypes = [
  'Business Promotion',
  'Song / Music Release',
  'Event Promotion',
  'Product Promotion',
  'App / Startup Launch',
  'Influencer Campaign',
  'Social Media Management',
  'Other',
];

const platforms = ['TikTok', 'Instagram', 'Facebook', 'YouTube', 'WhatsApp', 'Google', 'Not sure'];
const budgets = ['Starter', 'Growth', 'Premium', 'Custom'];
const goals = ['Awareness', 'Leads', 'Sales', 'Streams', 'Followers', 'Event Attendance', 'Website Traffic', 'App Installs'];

const steps = [
  { num: '01', text: 'We review your campaign request.' },
  { num: '02', text: 'We recommend the right campaign structure.' },
  { num: '03', text: 'We prepare a quote or package.' },
  { num: '04', text: 'We launch your campaign after approval.' },
];

export default function Campaigns() {
  const { submitting, submitted, error, submit } = usePublicForm(publicApi.submitCampaignRequest);
  const [form, setForm] = useState({
    fullName: '',
    brandName: '',
    email: '',
    phone: '',
    promoteWhat: '',
    campaignType: '',
    targetAudience: '',
    platforms: [],
    budget: '',
    goal: '',
    message: '',
  });

  const handleChange = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const togglePlatform = (platform) => {
    setForm(prev => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter(p => p !== platform)
        : [...prev.platforms, platform]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submit(form);
  };

  return (
    <PageLayout>
      <GridBackground className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="Start Your Campaign"
            title="Start Your HypeGrid"
            titleHighlight="Campaign."
            subtitle="Tell us what you want to promote. We'll help shape the right campaign for your brand, song, event, product, or launch."
          />
        </div>
      </GridBackground>

      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Form */}
            <div className="lg:col-span-2">
              {submitted ? (
                <FormSuccess
                  title="Campaign Request Received"
                  message="Your request has been received. The HypeGrid team will contact you shortly."
                />
              ) : (
                <motion.form
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  onSubmit={handleSubmit}
                  className="glass-card rounded-2xl p-8 md:p-10 space-y-6"
                >
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <Label className="text-white/80 text-sm mb-2 block">Full Name *</Label>
                      <Input
                        required
                        value={form.fullName}
                        onChange={(e) => handleChange('fullName', e.target.value)}
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-hype-cyan/50 h-12"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <Label className="text-white/80 text-sm mb-2 block">Business / Artist / Brand Name</Label>
                      <Input
                        value={form.brandName}
                        onChange={(e) => handleChange('brandName', e.target.value)}
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-hype-cyan/50 h-12"
                        placeholder="Brand or artist name"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <Label className="text-white/80 text-sm mb-2 block">Email *</Label>
                      <Input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-hype-cyan/50 h-12"
                        placeholder="you@email.com"
                      />
                    </div>
                    <div>
                      <Label className="text-white/80 text-sm mb-2 block">Phone / WhatsApp</Label>
                      <Input
                        value={form.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-hype-cyan/50 h-12"
                        placeholder="+27 ..."
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-white/80 text-sm mb-2 block">What do you want to promote? *</Label>
                    <Input
                      required
                      value={form.promoteWhat}
                      onChange={(e) => handleChange('promoteWhat', e.target.value)}
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-hype-cyan/50 h-12"
                      placeholder="e.g. My new restaurant, My upcoming single, My startup app..."
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <Label className="text-white/80 text-sm mb-2 block">Campaign Type *</Label>
                      <Select value={form.campaignType} onValueChange={(v) => handleChange('campaignType', v)}>
                        <SelectTrigger className="bg-white/5 border-white/10 text-white h-12">
                          <SelectValue placeholder="Select campaign type" />
                        </SelectTrigger>
                        <SelectContent className="bg-hype-dark border-white/10">
                          {campaignTypes.map(t => (
                            <SelectItem key={t} value={t} className="text-white hover:bg-white/10">{t}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-white/80 text-sm mb-2 block">Target Audience</Label>
                      <Input
                        value={form.targetAudience}
                        onChange={(e) => handleChange('targetAudience', e.target.value)}
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-hype-cyan/50 h-12"
                        placeholder="e.g. Young adults, food lovers, music fans..."
                      />
                    </div>
                  </div>

                  {/* Platforms */}
                  <div>
                    <Label className="text-white/80 text-sm mb-3 block">Platforms Interested In</Label>
                    <div className="flex flex-wrap gap-3">
                      {platforms.map((p) => (
                        <label
                          key={p}
                          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border cursor-pointer transition-all text-sm ${
                            form.platforms.includes(p)
                              ? 'border-hype-cyan/40 bg-hype-cyan/10 text-hype-cyan'
                              : 'border-white/10 bg-white/[0.02] text-hype-slate hover:border-white/20'
                          }`}
                        >
                          <Checkbox
                            checked={form.platforms.includes(p)}
                            onCheckedChange={() => togglePlatform(p)}
                            className="border-white/20 data-[state=checked]:bg-hype-cyan data-[state=checked]:border-hype-cyan"
                          />
                          {p}
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <Label className="text-white/80 text-sm mb-2 block">Budget Range</Label>
                      <Select value={form.budget} onValueChange={(v) => handleChange('budget', v)}>
                        <SelectTrigger className="bg-white/5 border-white/10 text-white h-12">
                          <SelectValue placeholder="Select budget" />
                        </SelectTrigger>
                        <SelectContent className="bg-hype-dark border-white/10">
                          {budgets.map(b => (
                            <SelectItem key={b} value={b} className="text-white hover:bg-white/10">{b}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-white/80 text-sm mb-2 block">Campaign Goal</Label>
                      <Select value={form.goal} onValueChange={(v) => handleChange('goal', v)}>
                        <SelectTrigger className="bg-white/5 border-white/10 text-white h-12">
                          <SelectValue placeholder="Select goal" />
                        </SelectTrigger>
                        <SelectContent className="bg-hype-dark border-white/10">
                          {goals.map(g => (
                            <SelectItem key={g} value={g} className="text-white hover:bg-white/10">{g}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label className="text-white/80 text-sm mb-2 block">Message / Details</Label>
                    <Textarea
                      value={form.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-hype-cyan/50 min-h-[120px]"
                      placeholder="Tell us more about your campaign goals, timeline, or any other details..."
                    />
                  </div>

                  {error && (
                    <div className="flex items-start gap-2 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
                      <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>{error}</span>
                    </div>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    disabled={submitting}
                    className="w-full bg-hype-cyan text-hype-navy hover:bg-hype-cyan/90 font-bold text-base h-14 glow-cyan disabled:opacity-60"
                  >
                    <Zap className="w-5 h-5 mr-2" />
                    {submitting ? 'Submitting...' : 'Submit Campaign Request'}
                  </Button>
                </motion.form>
              )}
            </div>

            {/* Side Panel */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="glass-card-green rounded-2xl p-8 sticky top-28"
              >
                <h3 className="font-heading text-lg font-bold text-white mb-6">What happens next?</h3>
                <div className="space-y-6">
                  {steps.map((step) => (
                    <div key={step.num} className="flex gap-4">
                      <div className="w-10 h-10 rounded-lg bg-hype-green/10 flex items-center justify-center flex-shrink-0">
                        <span className="font-mono text-xs font-bold text-hype-green">{step.num}</span>
                      </div>
                      <p className="text-hype-slate text-sm leading-relaxed pt-2">{step.text}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}