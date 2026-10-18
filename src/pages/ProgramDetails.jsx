import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { YOGA_PROGRAMS } from '../data/programs';
import { formatCurrency } from '../utils/formatCurrency';
import { useCart } from '../context/CartContext';
import StarRating from '../components/StarRating';
import { 
  ArrowLeft, 
  Clock, 
  BarChart, 
  CheckCircle2, 
  BookOpen, 
  UserCheck, 
  ShieldAlert, 
  Plus, 
  Check, 
  Share2 
} from 'lucide-react';

export const ProgramDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, cart, showToast } = useCart();
  const [imageError, setImageError] = useState(false);

  const program = YOGA_PROGRAMS.find((p) => p.id === id);

  if (!program) {
    return (
      <div className="py-20 max-w-xl mx-auto px-4 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold text-charcoal-900">Program Not Found</h2>
        <p className="text-sm text-charcoal-700">The yoga program you requested does not exist or may have been updated.</p>
        <Link
          to="/programs"
          className="inline-block px-5 py-2.5 rounded-xl bg-sage-700 text-white text-xs font-semibold hover:bg-sage-800"
        >
          Return to Programs Catalog
        </Link>
      </div>
    );
  }

  const isInCart = cart.some((item) => item.id === program.id);

  const handleEnroll = () => {
    addToCart(program, 1);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: program.title,
        text: program.shortDescription,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Program link copied to clipboard!', 'info');
    }
  };

  const fallbackImage = 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1200&q=80';

  return (
    <div className="py-8 sm:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      
      {/* Back button & Breadcrumb */}
      <div className="flex items-center justify-between">
        <Link
          to="/programs"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-charcoal-700 hover:text-sage-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Programs</span>
        </Link>

        <button
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-charcoal-700/80 hover:text-charcoal-900 px-3 py-1.5 rounded-lg border border-cream-200 bg-white"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>Share</span>
        </button>
      </div>

      {/* Main Grid: Details Left, Purchase Card Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Image, Description, Curriculum */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Hero Image */}
          <div className="rounded-3xl overflow-hidden aspect-[16/9] bg-cream-100 border border-cream-200 shadow-soft relative">
            <img
              src={imageError ? fallbackImage : program.image}
              alt={program.title}
              onError={() => setImageError(true)}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 flex gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/95 text-sage-800 backdrop-blur-sm shadow-sm">
                {program.category}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-charcoal-900/80 text-cream-50 backdrop-blur-sm">
                {program.level}
              </span>
            </div>
          </div>

          {/* Heading Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <StarRating rating={program.rating} reviewsCount={program.reviewsCount} size="md" />
              <span className="text-xs text-charcoal-700/60">• Classical Prana Yoga Curriculum</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-charcoal-900">
              {program.title}
            </h1>

            <p className="text-base text-charcoal-700 leading-relaxed">
              {program.fullDescription}
            </p>
          </div>

          {/* Key Program Specifications */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-5 rounded-2xl bg-cream-100/70 border border-cream-200">
            <div className="space-y-1">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-charcoal-700/60">
                Duration
              </span>
              <div className="flex items-center gap-1.5 font-semibold text-sm text-charcoal-900">
                <Clock className="w-4 h-4 text-sage-600" />
                <span>{program.duration}</span>
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-charcoal-700/60">
                Difficulty Level
              </span>
              <div className="flex items-center gap-1.5 font-semibold text-sm text-charcoal-900">
                <BarChart className="w-4 h-4 text-sage-600" />
                <span>{program.level}</span>
              </div>
            </div>

            <div className="space-y-1 col-span-2 sm:col-span-1">
              <span className="text-[11px] uppercase tracking-wider font-semibold text-charcoal-700/60">
                Class Access
              </span>
              <div className="flex items-center gap-1.5 font-semibold text-sm text-charcoal-900">
                <BookOpen className="w-4 h-4 text-sage-600" />
                <span>Unlimited Replay</span>
              </div>
            </div>
          </div>

          {/* Learning Objectives */}
          <div className="space-y-4">
            <h3 className="font-serif text-xl font-bold text-charcoal-900">
              What You Will Learn & Experience
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {program.objectives.map((obj, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3.5 rounded-xl bg-white border border-cream-200 shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-sage-600 shrink-0 mt-0.5" />
                  <span className="text-xs text-charcoal-700 leading-relaxed font-medium">
                    {obj}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Curriculum Modules */}
          <div className="space-y-4">
            <h3 className="font-serif text-xl font-bold text-charcoal-900">
              Course Structure & Syllabus
            </h3>
            <div className="space-y-2.5">
              {program.curriculum.map((mod, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-white border border-cream-200">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-lg bg-sage-100 text-sage-800 text-xs font-bold flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-charcoal-900">{mod}</span>
                  </div>
                  <span className="text-[11px] font-medium text-sage-700">Guided Practice</span>
                </div>
              ))}
            </div>
          </div>

          {/* Instructor Profile */}
          <div className="p-6 rounded-2xl bg-white border border-cream-200 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-sage-700 text-cream-50 flex items-center justify-center font-serif text-lg font-bold">
                {program.instructor.charAt(0)}
              </div>
              <div>
                <span className="text-[11px] text-charcoal-700/60 uppercase tracking-wider font-semibold">
                  Course Instructor
                </span>
                <h4 className="font-serif text-base font-bold text-charcoal-900">{program.instructor}</h4>
              </div>
            </div>
            <p className="text-xs text-charcoal-700 leading-relaxed">
              Practicing and instructing in the classical lineage with over a decade of dedicated somatic study. Guided with compassionate alignment adjustments and trauma-informed breathwork.
            </p>
          </div>

          {/* Ethical / Medical Disclaimer */}
          <div className="p-4 rounded-xl bg-cream-100/90 border border-cream-300 text-xs text-charcoal-700/90 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-terracotta-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold text-charcoal-900">Wellness Disclaimer</p>
              <p>
                Prana Yoga educational courses are designed for mindfulness, fitness, and spiritual wellness. They do not claim to treat, cure, or diagnose any medical illness. Always listen to your body and consult your physician before starting any vigorous physical or respiratory practice.
              </p>
            </div>
          </div>

        </div>

        {/* Right Column: Sticky Checkout Box */}
        <div className="lg:col-span-4">
          <div className="sticky top-28 bg-white rounded-3xl p-6 border border-cream-200 shadow-lift space-y-6">
            
            <div>
              <span className="text-[11px] uppercase tracking-wider text-charcoal-700/60 font-semibold block">
                Enrollment Investment
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-serif text-3xl font-bold text-sage-900">
                  {formatCurrency(program.price)}
                </span>
                <span className="text-xs text-charcoal-700/60 font-medium">One-time course enrollment</span>
              </div>
            </div>

            <div className="space-y-2.5 text-xs text-charcoal-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-sage-600" />
                <span>Immediate digital access on enrollment</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-sage-600" />
                <span>Certificate of completion upon finishing</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-sage-600" />
                <span>30-Day self-guided pacing</span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="space-y-3 pt-2">
              <button
                onClick={handleEnroll}
                className={`w-full py-3.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-md ${
                  isInCart
                    ? 'bg-sage-100 text-sage-800 border border-sage-300'
                    : 'bg-sage-700 hover:bg-sage-800 text-white'
                }`}
              >
                {isInCart ? (
                  <>
                    <Check className="w-4 h-4 text-sage-700" />
                    <span>Enrolled in Cart</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    <span>Add Program to Cart</span>
                  </>
                )}
              </button>

              <Link
                to="/cart"
                className="w-full py-3 rounded-xl text-xs font-semibold text-charcoal-800 bg-cream-100 hover:bg-cream-200 text-center block transition-colors"
              >
                Go to Shopping Cart ({formatCurrency(program.price)})
              </Link>
            </div>

            <div className="pt-4 border-t border-cream-100 text-center">
              <p className="text-[11px] text-charcoal-700/60">
                🔒 Secure enrollment reservation. Pay later or via invoice upon course confirmation.
              </p>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};

export default ProgramDetails;
