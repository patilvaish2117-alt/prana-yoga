import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  Sparkles, 
  ShieldCheck, 
  Feather, 
  Sun, 
  Compass, 
  ArrowRight,
  Users,
  Target
} from 'lucide-react';

export const About = () => {
  const values = [
    {
      icon: Feather,
      title: 'Ahimsa (Gentleness & Non-Violence)',
      desc: 'We honor your body as it is today. No forceful contortions, no competitive ego — only patient, restorative alignment.',
    },
    {
      icon: Sun,
      title: 'Satya (Authentic Practice)',
      desc: 'Rooted directly in classical Indian Hatha, Ashtanga, and Patanjali wisdom, free from commercial distortions.',
    },
    {
      icon: Heart,
      title: 'Seva (Selfless Community)',
      desc: 'Creating an accessible space where every practitioner finds warmth, encouragement, and practical guidance.',
    },
    {
      icon: Compass,
      title: 'Samatva (Equanimity in Life)',
      desc: 'Yoga does not end when you step off the mat. It is learning to breathe through the challenges of everyday modern life.',
    },
  ];

  const whoIsItFor = [
    {
      title: 'Complete Beginners',
      desc: 'Those who have never touched their toes or stepped onto a mat. Our foundations courses break down postures with clarity, safety, and encouragement.',
    },
    {
      title: 'Desk Workers & Busy Professionals',
      desc: 'Individuals spending long hours at computers needing targeted thoracic relief, neck mobility, and 10-minute nervous system resets.',
    },
    {
      title: 'Intermediate Practitioners',
      desc: 'Yogis ready to explore deeper pranayamas, arm balances, bandhas, and classical Eight Limbs philosophy with systematic guidance.',
    },
    {
      title: 'Seekers of Inner Stillness',
      desc: 'Anyone desiring authentic meditation, Yoga Nidra deep relaxation, and mental equilibrium beyond purely physical exercise.',
    },
  ];

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 sm:space-y-28">
      
      {/* 1. Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sage-100 text-sage-800 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-terracotta-500" />
            <span>Rooted in Tradition • Designed for Living</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-charcoal-900 leading-tight">
            Cultivating Stillness in a Hurried World
          </h1>

          <p className="text-base sm:text-lg text-charcoal-700 leading-relaxed">
            <strong>Prana Yoga</strong> was founded with a singular conviction: yoga is not a performance for social media, but a sacred sanctuary for your inner self. We bridge timeless Indian yogic philosophy with modern accessible digital education.
          </p>

          <p className="text-sm text-charcoal-700 leading-relaxed">
            In our noisy, fast-paced world, the simple act of taking a deep, conscious breath can restore your sanity. Through systematic asana programs, restorative pranayama, and grounded meditation journeys, we help you discover the quiet center that was always within you.
          </p>

          <div className="pt-2">
            <Link
              to="/programs"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-sage-700 hover:bg-sage-800 text-white font-semibold text-sm shadow-md transition-all group"
            >
              <span>Explore Our Programs</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        <div className="lg:col-span-5 relative">
          <div className="rounded-3xl overflow-hidden aspect-[4/5] bg-cream-100 shadow-lift border-4 border-white">
            <img
              src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=900&q=80"
              alt="Meditation practitioner in serene natural setting"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* 2. Mission & 4 Pillars */}
      <div className="bg-cream-100/70 rounded-3xl p-8 sm:p-14 border border-cream-200 space-y-12 shadow-soft">
        <div className="max-w-2xl mx-auto text-center space-y-3">
          <span className="text-xs uppercase tracking-widest font-semibold text-terracotta-600">
            Our Mission & Core Values
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-900">
            Guiding Principles of Our Sangha
          </h2>
          <p className="text-sm text-charcoal-700 leading-relaxed">
            Our mission is to empower individuals of all backgrounds to build a lifelong, safe, and joyful home yoga practice.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, idx) => {
            const Icon = v.icon;
            return (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-cream-200 shadow-xs space-y-3">
                <div className="w-10 h-10 rounded-xl bg-sage-100 text-sage-700 flex items-center justify-center">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-serif text-base font-bold text-charcoal-900">{v.title}</h3>
                <p className="text-xs text-charcoal-700 leading-relaxed">{v.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Who Are Our Programs Designed For? */}
      <div className="space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-widest font-semibold text-sage-700">
            Inclusivity at Heart
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-900">
            Who Is Prana Yoga For?
          </h2>
          <p className="text-sm text-charcoal-700 leading-relaxed">
            Yoga is not reserved for the flexible or young. It is a universal birthright for anyone breathing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {whoIsItFor.map((item, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-white border border-cream-200 shadow-soft flex items-start gap-4">
              <div className="w-9 h-9 rounded-full bg-cream-100 text-sage-800 font-serif font-bold text-sm flex items-center justify-center shrink-0">
                0{idx + 1}
              </div>
              <div className="space-y-1">
                <h4 className="font-serif text-base font-bold text-charcoal-900">{item.title}</h4>
                <p className="text-xs text-charcoal-700 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Sustainable Essentials & Sanctuary Promise */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-sage-900 text-cream-100 rounded-3xl p-8 sm:p-14 shadow-lift">
        <div className="lg:col-span-6 space-y-4">
          <span className="text-xs uppercase tracking-widest font-semibold text-terracotta-300">
            Mindful Consumption
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            Ethically Sourced Props for Your Sacred Space
          </h3>
          <p className="text-xs sm:text-sm text-cream-200/80 leading-relaxed">
            We reject mass-produced plastic mats that degrade into landfills. Every yoga mat, block, cotton strap, and buckwheat cushion in our storefront is selected for durability, natural biodegradability, and skin safety.
          </p>
          <div className="pt-2">
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-terracotta-500 hover:bg-terracotta-600 text-white font-semibold text-xs transition-colors"
            >
              <span>Explore Yoga Shop</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="rounded-2xl overflow-hidden aspect-[16/10] bg-sage-800 border border-sage-700">
            <img
              src="https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&w=800&q=80"
              alt="Eco friendly yoga equipment setup"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

    </div>
  );
};

export default About;
