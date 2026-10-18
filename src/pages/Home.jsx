import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { YOGA_PROGRAMS } from '../data/programs';
import { SHOP_PRODUCTS } from '../data/products';
import ProgramCard from '../components/ProgramCard';
import ProductCard from '../components/ProductCard';
import { 
  Sparkles, 
  ArrowRight, 
  Compass, 
  Heart, 
  ShieldCheck, 
  Feather, 
  Activity, 
  Smile, 
  Sun, 
  CheckCircle, 
  Quote 
} from 'lucide-react';

export const Home = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState({ state: 'idle', message: '' });

  // Featured 4 programs
  const featuredPrograms = YOGA_PROGRAMS.filter((p) => p.featured).slice(0, 4);
  // Featured 3 shop items
  const featuredShop = SHOP_PRODUCTS.filter((p) => p.featured).slice(0, 3);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    const email = newsletterEmail.trim();
    if (!email || !email.includes('@') || !email.includes('.')) {
      setNewsletterStatus({
        state: 'error',
        message: 'Please provide a valid email address to receive our weekly reflections.',
      });
      return;
    }

    setNewsletterStatus({
      state: 'success',
      message: 'Namaste! Thank you for subscribing to our weekly wellness dispatch.',
    });
    setNewsletterEmail('');
  };

  const sampleTestimonials = [
    {
      id: 1,
      quote: "Starting with 'Beginner Yoga Foundations' transformed my posture and daily energy. The pacing is patient, mindful, and completely accessible.",
      author: "Priyanka Patel",
      role: "Yoga Practitioner & Daily Meditator",
      program: "Beginner Yoga Foundations",
      rating: 5,
    },
    {
      id: 2,
      quote: "The 'Breathwork & Relaxation' program gives me an instant mental reset after long hours at my laptop. The Bhramari practice is pure magic.",
      author: "Arjun Kulkarni",
      role: "Software Engineer",
      program: "Breathwork & Relaxation",
      rating: 5,
    },
    {
      id: 3,
      quote: "The eco-friendly yoga mat and meditation cushion arrived securely packaged and feel studio-grade. Truly peaceful aesthetic and quality.",
      author: "Tanvi S.",
      role: "Mindfulness Practitioner",
      program: "Shop Essentials & Starter Kit",
      rating: 5,
    },
  ];

  const benefits = [
    {
      icon: Activity,
      title: "Nervous System Reset",
      description: "Classical breathwork stimulates the vagus nerve, reducing cortisol and bringing your heart rate into a calm, restorative rhythm.",
    },
    {
      icon: Feather,
      title: "Fluid Strength & Flexibility",
      description: "Decompress tight joints, increase functional range of motion, and build balanced core stability without harsh physical strain.",
    },
    {
      icon: Sun,
      title: "Mental Clarity & Stillness",
      description: "Cultivate single-pointed concentration and emotional equanimity through grounded meditation techniques designed for everyday life.",
    },
    {
      icon: Smile,
      title: "Holistic Longevity",
      description: "Harmonize physical postures, pranic energy, and ethical mindfulness for a vibrant, resilient, and deeply peaceful daily life.",
    },
  ];

  const whyChooseUs = [
    {
      icon: Compass,
      title: "Authentic Lineage Instruction",
      desc: "Our courses honor traditional Indian Hatha, Ashtanga, and Vedic pranayama wisdom, free from commercial gimmicks.",
    },
    {
      icon: Heart,
      title: "Welcoming to Every Body",
      desc: "From gentle chair modifications to advanced arm balances, our teachers provide supportive adaptations for every stage.",
    },
    {
      icon: ShieldCheck,
      title: "Practice Anytime, Anywhere",
      desc: "Structured step-by-step digital curriculum accessible on phone, tablet, or desktop with lifetime replay access.",
    },
    {
      icon: Sparkles,
      title: "Mindful Living Essentials",
      desc: "Ethically crafted, non-toxic mats, organic cotton straps, and buckwheat cushions to support your sacred home sanctuary.",
    },
  ];

  return (
    <div className="space-y-20 sm:space-y-28">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:py-24 bg-gradient-to-b from-cream-100 to-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Headline & CTA */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sage-100/90 text-sage-800 text-xs font-semibold tracking-wide border border-sage-200">
                <Sparkles className="w-3.5 h-3.5 text-terracotta-500" />
                <span>Find Your Balance • Discover Your Inner Peace</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-charcoal-900 leading-[1.15]">
                Breathe Better. <br />
                <span className="text-sage-700 italic font-normal">Move Freely.</span> <br />
                Live Mindfully.
              </h1>

              <p className="text-base sm:text-lg text-charcoal-700 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Welcome to <strong>Prana Yoga</strong>, an online sanctuary dedicated to classical asana practice, transformative pranayama breathwork, and deep guided meditation. Awaken your vital life force with guided instruction created for modern life.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/programs"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-semibold text-white bg-sage-700 hover:bg-sage-800 shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group text-base"
                >
                  <span>Explore Programs</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>

                <Link
                  to="/shop"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-semibold text-charcoal-800 bg-white hover:bg-cream-100 border border-cream-300 shadow-sm transition-all flex items-center justify-center text-base"
                >
                  <span>Shop Yoga Essentials</span>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="pt-6 border-t border-cream-200/80 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-charcoal-700/80">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-sage-600" />
                  <span>14+ Structured Programs</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-sage-600" />
                  <span>Beginner to Advanced</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-sage-600" />
                  <span>Eco-Friendly Props</span>
                </div>
              </div>
            </div>

            {/* Right Column: Serene Photography */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="absolute -top-6 -left-6 w-72 h-72 bg-sage-200/50 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute -bottom-6 -right-6 w-72 h-72 bg-terracotta-200/40 rounded-full blur-3xl pointer-events-none"></div>

                <div className="relative rounded-3xl overflow-hidden shadow-lift border-4 border-white aspect-[4/5] bg-cream-100">
                  <img
                    src="https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1000&q=80"
                    alt="Prana Yoga peaceful practitioner meditating at sunrise"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/60 via-transparent to-transparent"></div>
                  
                  {/* Floating Highlight Card */}
                  <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/95 backdrop-blur-md shadow-lg border border-cream-200">
                    <p className="font-serif text-sm font-bold text-charcoal-900">
                      "Prana is the breath of universal life."
                    </p>
                    <p className="text-xs text-sage-700 mt-1 font-medium">
                      Join mindful practitioners across India
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. PHILOSOPHY WELCOME SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-cream-100/70 rounded-3xl p-8 sm:p-12 lg:p-16 border border-cream-200 shadow-soft">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <span className="text-xs uppercase tracking-widest font-semibold text-terracotta-600">
              Our Guiding Philosophy
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-900">
              The Essence of Prana: Harmonizing Breath and Life
            </h2>
            <div className="w-16 h-0.5 bg-sage-500 mx-auto rounded-full my-4"></div>
            <p className="text-sm sm:text-base text-charcoal-700 leading-relaxed">
              In Sanskrit, <em>Prana</em> represents the primary life-force energy animating every breath, heartbeat, and thought. At Prana Yoga, we believe yoga is far more than physical postures. It is a sacred practice of reclaiming stillness within chaos, honoring the wisdom of your body, and greeting every morning with clarity and gratitude.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
            <div className="p-6 bg-white rounded-2xl border border-cream-200 shadow-sm text-center space-y-2">
              <div className="w-12 h-12 mx-auto rounded-xl bg-sage-50 text-sage-700 flex items-center justify-center font-serif text-lg font-bold">
                01
              </div>
              <h3 className="font-serif text-lg font-bold text-charcoal-900">Sthira & Sukha</h3>
              <p className="text-xs text-charcoal-700/80 leading-relaxed">
                Finding effortless steadiness and ease in every posture, allowing the breath to remain natural and unforced.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-cream-200 shadow-sm text-center space-y-2">
              <div className="w-12 h-12 mx-auto rounded-xl bg-terracotta-50 text-terracotta-600 flex items-center justify-center font-serif text-lg font-bold">
                02
              </div>
              <h3 className="font-serif text-lg font-bold text-charcoal-900">Pranayama Balance</h3>
              <p className="text-xs text-charcoal-700/80 leading-relaxed">
                Bridging the nervous system and mental state through conscious, rhythmic breath expansion and retention.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl border border-cream-200 shadow-sm text-center space-y-2">
              <div className="w-12 h-12 mx-auto rounded-xl bg-sage-50 text-sage-700 flex items-center justify-center font-serif text-lg font-bold">
                03
              </div>
              <h3 className="font-serif text-lg font-bold text-charcoal-900">Dhyana & Stillness</h3>
              <p className="text-xs text-charcoal-700/80 leading-relaxed">
                Sustained meditation that quiets internal chatter and reconnects you with the luminous peace of your true self.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED PROGRAMS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs uppercase tracking-widest font-semibold text-sage-700">
              Curated Courses
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-900 mt-1">
              Featured Yoga Programs
            </h2>
            <p className="text-sm text-charcoal-700 mt-1">
              Step-by-step masterclasses designed to build strength, mobility, and tranquil focus.
            </p>
          </div>
          <Link
            to="/programs"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-sage-700 hover:text-sage-900 group"
          >
            <span>View All 14 Programs</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredPrograms.map((program) => (
            <ProgramCard key={program.id} program={program} />
          ))}
        </div>
      </section>

      {/* 4. BENEFITS OF YOGA & MEDITATION */}
      <section className="bg-sage-900 text-cream-100 py-20 rounded-3xl max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 shadow-lift relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-sage-800/40 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative max-w-3xl mb-14">
          <span className="text-xs uppercase tracking-widest font-semibold text-terracotta-300">
            Wellness Grounded in Science & Tradition
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mt-1">
            Transformative Benefits of Mindful Daily Practice
          </h2>
          <p className="text-sm text-cream-200/80 mt-2 leading-relaxed">
            Consistent yoga and breathwork gently reshape your neurological and physical health, grounding you in sustained vitality.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, idx) => {
            const Icon = benefit.icon;
            return (
              <div key={idx} className="space-y-3 p-5 rounded-2xl bg-sage-800/60 border border-sage-700/60 backdrop-blur-xs">
                <div className="w-12 h-12 rounded-xl bg-sage-700/80 text-terracotta-300 flex items-center justify-center shadow-xs">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-lg font-bold text-white">
                  {benefit.title}
                </h3>
                <p className="text-xs text-cream-200/80 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. WHY CHOOSE PRANA YOGA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-widest font-semibold text-sage-700">
              The Prana Difference
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-900 leading-tight">
              Why Practicing with Prana Yoga is Uniquely Transformative
            </h2>
            <p className="text-sm text-charcoal-700 leading-relaxed">
              We understand that modern life is filled with screen fatigue and overwhelming schedules. Prana Yoga bridges timeless wisdom with clear, supportive digital access so you can cultivate an oasis of calm right in your living room.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              {whyChooseUs.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div key={idx} className="space-y-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-lg bg-sage-100 text-sage-700 flex items-center justify-center">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h4 className="font-serif text-sm font-bold text-charcoal-900">{item.title}</h4>
                    </div>
                    <p className="text-xs text-charcoal-700/80 leading-relaxed pl-10">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden shadow-soft aspect-[3/4] bg-cream-100">
                  <img
                    src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=700&q=80"
                    alt="Gentle restorative yoga stretch"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5 rounded-2xl bg-cream-100 border border-cream-200">
                  <p className="text-2xl font-bold font-serif text-sage-900">100%</p>
                  <p className="text-xs text-charcoal-700 mt-1">Self-paced learning with lifetime access</p>
                </div>
              </div>

              <div className="space-y-4 pt-6">
                <div className="p-5 rounded-2xl bg-sage-100 border border-sage-200">
                  <p className="text-2xl font-bold font-serif text-sage-900">4.9 ★</p>
                  <p className="text-xs text-charcoal-700 mt-1">Practitioner rating across all programs</p>
                </div>
                <div className="rounded-2xl overflow-hidden shadow-soft aspect-[3/4] bg-cream-100">
                  <img
                    src="https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=700&q=80"
                    alt="Pranayama breath practice session"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 6. FEATURED SHOP ITEMS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs uppercase tracking-widest font-semibold text-terracotta-600">
              Sanctuary Essentials
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-900 mt-1">
              Shop Handcrafted Yoga Gear
            </h2>
            <p className="text-sm text-charcoal-700 mt-1">
              Sustainable mats, organic cotton straps, and meditation cushions.
            </p>
          </div>
          <Link
            to="/shop"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-sage-700 hover:text-sage-900 group"
          >
            <span>Visit Full Storefront</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredShop.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 7. CUSTOMER TESTIMONIALS */}
      <section className="bg-cream-100/60 py-16 sm:py-20 border-y border-cream-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs uppercase tracking-widest font-semibold text-sage-700">
              Community Voices
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-900">
              Reflections from Fellow Practitioners
            </h2>
            <p className="text-xs text-charcoal-700/60 italic">
              (Shared reflections from our practicing community members)
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sampleTestimonials.map((t) => (
              <div
                key={t.id}
                className="p-6 rounded-2xl bg-white border border-cream-200 shadow-soft flex flex-col justify-between space-y-4 hover:shadow-lift transition-shadow"
              >
                <div className="space-y-3">
                  <Quote className="w-7 h-7 text-sage-300" />
                  <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed italic">
                    "{t.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-cream-100">
                  <h4 className="font-serif text-sm font-bold text-charcoal-900">{t.author}</h4>
                  <p className="text-[11px] text-charcoal-700/70">{t.role}</p>
                  <p className="text-[11px] font-medium text-sage-700 mt-1">Course: {t.program}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CALL TO ACTION & NEWSLETTER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-gradient-to-r from-sage-800 to-charcoal-900 rounded-3xl p-8 sm:p-14 text-white shadow-lift relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto text-center space-y-6">
            <span className="text-xs uppercase tracking-widest font-semibold text-terracotta-300">
              Begin Today
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold">
              Step Onto the Mat. <br />
              <span className="italic font-normal text-cream-200">Reclaim Your Inner Harmony.</span>
            </h2>
            <p className="text-sm text-cream-200/90 leading-relaxed">
              Subscribe to our free weekly dispatch for grounding pranayama prompts, alignment breakdowns, and mindful living insights.
            </p>

            {/* Newsletter Form */}
            <form onSubmit={handleNewsletterSubmit} className="max-w-md mx-auto space-y-3">
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-cream-50 placeholder-cream-300/60 text-sm focus:outline-none focus:ring-2 focus:ring-sage-400 backdrop-blur-xs"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-terracotta-500 hover:bg-terracotta-600 font-semibold text-white text-sm shadow-md transition-all shrink-0"
                >
                  Subscribe
                </button>
              </div>

              {newsletterStatus.state === 'error' && (
                <p className="text-xs text-red-300 text-left pl-1">
                  {newsletterStatus.message}
                </p>
              )}
              {newsletterStatus.state === 'success' && (
                <div className="p-3 rounded-xl bg-sage-700/80 border border-sage-500 text-xs text-cream-100 text-left flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-cream-100 shrink-0 mt-0.5" />
                  <span>{newsletterStatus.message}</span>
                </div>
              )}
            </form>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
