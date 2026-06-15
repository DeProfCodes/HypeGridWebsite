import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Send, AlertCircle, CheckCircle2, BellRing } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import PageLayout from '@/components/layout/PageLayout';
import GridBackground from '@/components/layout/GridBackground';
import SectionHeading from '@/components/ui/SectionHeading';
import { SocialLinks } from '@/components/ui/SocialIcons';
import { publicApi } from '@/api/publicApi';
import { whatsappChannel } from '@/config/socialLinks';
import { trackImpressionOnce } from '@/lib/analytics';

// Keep this version + text in sync with the backend default
// (AlertSubscriptionService.CurrentConsentVersion / DefaultConsentSnapshot).
const CONSENT_VERSION = 'hypegrid-alerts-v1';
const CONSENT_TEXT =
  "I agree that HypeGrid may store the details I've provided and send me relevant deals, " +
  "specials, campaigns, events, and promotions. I understand I can opt out at any time. " +
  "See HypeGrid's Privacy Policy.";

const INTERESTS = [
  'Food', 'Grocery', 'Fashion', 'Beauty', 'Tech', 'Mobile', 'Home',
  'Events', 'Music', 'Travel', 'Services', 'Apps', 'All Deals',
];
const FREQUENCIES = ['Daily', 'Weekly', 'Weekends only', 'Best deals only'];
const PROVINCES = [
  'Eastern Cape', 'Free State', 'Gauteng', 'KwaZulu-Natal', 'Limpopo',
  'Mpumalanga', 'Northern Cape', 'North West', 'Western Cape',
];

const FALLBACK_CHANNEL_URL = whatsappChannel;

const emptyForm = {
  fullName: '', phone: '', email: '', province: '', city: '',
  interests: [], frequencyPreference: '', consent: false,
};

export default function Alerts() {
  const [form, setForm] = useState(emptyForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null); // { id, whatsapp_channel_url }
  const [joining, setJoining] = useState(false);

  useEffect(() => {
    trackImpressionOnce('alerts-page', 'impression', { entityType: 'AlertSubscription', entityId: null });
  }, []);

  const set = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const toggleInterest = (value) =>
    setForm((prev) => ({
      ...prev,
      interests: prev.interests.includes(value)
        ? prev.interests.filter((i) => i !== value)
        : [...prev.interests, value],
    }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!form.phone.trim() && !form.email.trim()) {
      setError('Please add a WhatsApp number or an email so we can send you alerts.');
      return;
    }
    if (!form.consent) {
      setError('Please tick the consent box to join HypeGrid Alerts.');
      return;
    }

    setSubmitting(true);
    try {
      // Only treat as success once the backend confirms (never fake it).
      const data = await publicApi.subscribeAlerts({
        ...form,
        sourcePage: 'alerts',
        consentVersion: CONSENT_VERSION,
        consentSnapshot: CONSENT_TEXT,
      });
      setResult(data || {});
    } catch (err) {
      // Keep the user's input so they can retry without re-typing.
      setError(
        err?.message ||
          'Something went wrong saving your details. Please check your connection and try again.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleJoinChannel = async () => {
    setJoining(true);
    let url = result?.whatsapp_channel_url || FALLBACK_CHANNEL_URL;
    try {
      const data = result?.id ? await publicApi.markAlertChannelClick(result.id) : null;
      if (data?.whatsapp_channel_url) url = data.whatsapp_channel_url;
    } catch {
      /* analytics/recording failure must not block the redirect */
    } finally {
      setJoining(false);
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <PageLayout>
      <GridBackground className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            label="HypeGrid Alerts"
            title="Get the hottest deals on"
            titleHighlight="WhatsApp."
            subtitle="Tell us what you care about and we'll help you discover specials, drops, events, and campaigns worth noticing. Join the HypeGrid Deals Club."
          />
        </div>
      </GridBackground>

      <section className="pb-24">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {result ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card rounded-2xl p-8 md:p-10 text-center"
            >
              <div className="w-20 h-20 rounded-full bg-hype-green/10 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-10 h-10 text-hype-green" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-white mb-3">You're on the list.</h3>
              <p className="text-hype-slate text-base max-w-md mx-auto mb-8">
                Your preferences have been saved. Tap below to join the HypeGrid WhatsApp Channel and
                start seeing the latest specials.
              </p>

              <Button
                onClick={handleJoinChannel}
                disabled={joining}
                size="lg"
                className="bg-hype-green text-hype-navy hover:bg-hype-green/90 font-bold text-base h-14 px-8 disabled:opacity-60"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                {joining ? 'Opening WhatsApp...' : 'Join WhatsApp Channel'}
              </Button>

              <p className="text-hype-slate/70 text-xs max-w-md mx-auto mt-6">
                Tapping &ldquo;Join&rdquo; opens HypeGrid&rsquo;s WhatsApp Channel in WhatsApp. HypeGrid records
                that you tapped the button, but WhatsApp manages the actual channel join.
              </p>

              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-hype-slate text-xs uppercase tracking-wider mb-4">Follow HypeGrid</p>
                <SocialLinks variant="color" size={20} className="justify-center" />
              </div>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onSubmit={handleSubmit}
              className="glass-card rounded-2xl p-8 md:p-10 space-y-6"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-11 h-11 rounded-xl bg-hype-cyan/10 flex items-center justify-center">
                  <BellRing className="w-5 h-5 text-hype-cyan" />
                </div>
                <div>
                  <h2 className="font-heading text-xl font-bold text-white">Join HypeGrid Deals Club</h2>
                  <p className="text-hype-slate text-sm">Free. Opt out anytime.</p>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <Label className="text-white/80 text-sm mb-2 block">Full Name</Label>
                  <Input value={form.fullName} onChange={(e) => set('fullName', e.target.value)}
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-hype-cyan/50 h-12" placeholder="Your name" />
                </div>
                <div>
                  <Label className="text-white/80 text-sm mb-2 block">WhatsApp Number</Label>
                  <Input value={form.phone} onChange={(e) => set('phone', e.target.value)}
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-hype-cyan/50 h-12" placeholder="+27 ..." />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <Label className="text-white/80 text-sm mb-2 block">Email <span className="text-hype-slate/60">(optional)</span></Label>
                  <Input type="email" value={form.email} onChange={(e) => set('email', e.target.value)}
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-hype-cyan/50 h-12" placeholder="you@email.com" />
                </div>
                <div>
                  <Label className="text-white/80 text-sm mb-2 block">Province</Label>
                  <Select value={form.province} onValueChange={(v) => set('province', v)}>
                    <SelectTrigger className="bg-white/5 border-white/10 text-white h-12">
                      <SelectValue placeholder="Select province" />
                    </SelectTrigger>
                    <SelectContent className="bg-hype-dark border-white/10">
                      {PROVINCES.map((p) => (
                        <SelectItem key={p} value={p} className="text-white hover:bg-white/10">{p}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <Label className="text-white/80 text-sm mb-2 block">City <span className="text-hype-slate/60">(optional)</span></Label>
                  <Input value={form.city} onChange={(e) => set('city', e.target.value)}
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-hype-cyan/50 h-12" placeholder="Your city" />
                </div>
                <div>
                  <Label className="text-white/80 text-sm mb-2 block">How often?</Label>
                  <Select value={form.frequencyPreference} onValueChange={(v) => set('frequencyPreference', v)}>
                    <SelectTrigger className="bg-white/5 border-white/10 text-white h-12">
                      <SelectValue placeholder="Choose frequency" />
                    </SelectTrigger>
                    <SelectContent className="bg-hype-dark border-white/10">
                      {FREQUENCIES.map((f) => (
                        <SelectItem key={f} value={f} className="text-white hover:bg-white/10">{f}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label className="text-white/80 text-sm mb-3 block">What deals are you into?</Label>
                <div className="flex flex-wrap gap-2">
                  {INTERESTS.map((i) => {
                    const active = form.interests.includes(i);
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => toggleInterest(i)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${
                          active
                            ? 'bg-hype-cyan text-hype-navy border-hype-cyan'
                            : 'text-hype-slate border-white/10 hover:text-white hover:border-white/20'
                        }`}
                      >
                        {i}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Consent — required, unchecked by default, never pre-ticked. */}
              <div className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/[0.03] p-4">
                <Checkbox
                  id="alerts-consent"
                  checked={form.consent}
                  onCheckedChange={(v) => set('consent', v === true)}
                  className="mt-0.5 border-white/30 data-[state=checked]:bg-hype-cyan data-[state=checked]:text-hype-navy"
                />
                <Label htmlFor="alerts-consent" className="text-hype-slate text-xs leading-relaxed cursor-pointer">
                  {CONSENT_TEXT}
                </Label>
              </div>

              {error && (
                <div className="flex items-start gap-2 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
                  <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <Button type="submit" size="lg" disabled={submitting} className="w-full bg-hype-cyan text-hype-navy hover:bg-hype-cyan/90 font-bold text-base h-14 glow-cyan disabled:opacity-60">
                <Send className="w-5 h-5 mr-2" />
                {submitting ? 'Saving...' : 'Join HypeGrid Alerts'}
              </Button>
            </motion.form>
          )}
        </div>
      </section>
    </PageLayout>
  );
}
