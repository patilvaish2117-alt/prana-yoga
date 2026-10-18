import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Instagram, 
  Youtube, 
  Twitter, 
  ShieldCheck 
} from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-charcoal-900 text-cream-200 pt-16 pb-8 border-t border-charcoal-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Multi-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-charcoal-800">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-sage-700 flex items-center justify-center text-cream-50 shadow-sm">
                <svg className="w-6 h-6" viewBox="0 0 100 100" fill="currentColor">
                  <path d="M50 18C44 33 30 48 30 63C30 74 39 80 50 80C61 80 70 74 70 63C70 48 56 33 50 18Z" fill="#FAF7F2" />
                  <path d="M50 32C41 43 24 53 22 65C20 75 29 79 38 79C47 79 50 70 50 70C50 70 53 79 62 79C71 79 80 75 78 65C76 53 59 43 50 32Z" fill="#A7C1A9" fillOpacity="0.8" />
                  <circle cx="50" cy="62" r="4" fill="#C8704D" />
                </svg>
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                Prana Yoga
              </span>
            </Link>

            <p className="text-sm text-cream-300/80 leading-relaxed max-w-sm">
              "Find Your Balance. Discover Your Inner Peace." Grounded in traditional yogic heritage, Prana Yoga offers online yoga classes, transformative pranayama breathwork, guided meditation, and sustainable yoga essentials.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-charcoal-800 hover:bg-sage-700 flex items-center justify-center text-cream-200 hover:text-white transition-colors"
                aria-label="Follow Prana Yoga on Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-charcoal-800 hover:bg-sage-700 flex items-center justify-center text-cream-200 hover:text-white transition-colors"
                aria-label="Watch Prana Yoga on YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-charcoal-800 hover:bg-sage-700 flex items-center justify-center text-cream-200 hover:text-white transition-colors"
                aria-label="Connect on Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-3">
            <h4 className="font-serif text-base font-semibold text-white tracking-wide">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-cream-300/80">
              <li>
                <Link to="/" className="hover:text-terracotta-300 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/programs" className="hover:text-terracotta-300 transition-colors">Yoga Programs</Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-terracotta-300 transition-colors">Yoga Shop</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-terracotta-300 transition-colors">About Our Story</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-terracotta-300 transition-colors">Contact & FAQ</Link>
              </li>
              <li>
                <Link to="/account" className="hover:text-terracotta-300 transition-colors">My Account</Link>
              </li>
            </ul>
          </div>

          {/* Program Categories */}
          <div className="space-y-3">
            <h4 className="font-serif text-base font-semibold text-white tracking-wide">
              Programs
            </h4>
            <ul className="space-y-2 text-sm text-cream-300/80">
              <li>
                <Link to="/programs?cat=Asana" className="hover:text-terracotta-300 transition-colors">Asana Postures</Link>
              </li>
              <li>
                <Link to="/programs?cat=Pranayama" className="hover:text-terracotta-300 transition-colors">Pranayama Breathwork</Link>
              </li>
              <li>
                <Link to="/programs?cat=Kriya" className="hover:text-terracotta-300 transition-colors">Kriya Cleansing</Link>
              </li>
              <li>
                <Link to="/programs?cat=Meditation" className="hover:text-terracotta-300 transition-colors">Mindfulness & Nidra</Link>
              </li>
              <li>
                <Link to="/programs?cat=Karma%20Yoga%20%26%20Philosophy" className="hover:text-terracotta-300 transition-colors">Karma Yoga & Philosophy</Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="font-serif text-base font-semibold text-white tracking-wide">
              Sanctuary Studio
            </h4>
            <div className="space-y-2.5 text-xs text-cream-300/80">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-sage-400 shrink-0 mt-0.5" />
                <span>Prana Sanctuary, Lane 5, Koregaon Park, Pune, Maharashtra 411001</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-sage-400 shrink-0" />
                <span>support@pranayoga.in</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-sage-400 shrink-0" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-sage-400 shrink-0" />
                <span>Mon – Sat: 6:00 AM – 8:00 PM IST</span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Bottom Strip */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-cream-300/60">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-sage-400 shrink-0" />
            <p>
              <strong>Order Notice:</strong> Online card processing is currently scheduled for an upcoming system upgrade. All orders are registered as reservations with Pay Later or Cash on Delivery options.
            </p>
          </div>
          <p className="shrink-0">
            © 2026 Prana Yoga. All rights reserved. Find Your Balance. Discover Your Inner Peace.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
