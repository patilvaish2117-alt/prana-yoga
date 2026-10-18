import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home, ArrowLeft } from 'lucide-react';

export const NotFound = () => {
  return (
    <div className="min-h-[65vh] flex items-center justify-center py-16 px-4">
      <div className="max-w-md w-full text-center space-y-6 bg-white p-8 sm:p-10 rounded-3xl border border-cream-200 shadow-lift">
        
        <div className="w-20 h-20 mx-auto rounded-full bg-cream-100 text-sage-700 flex items-center justify-center shadow-soft">
          <Compass className="w-10 h-10 animate-spin-slow" />
        </div>

        <div className="space-y-2">
          <span className="text-xs uppercase tracking-widest font-semibold text-terracotta-600">
            Error 404 • Page Not Found
          </span>
          <h1 className="font-serif text-3xl font-bold text-charcoal-900">
            A Moment to Pause & Breathe
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-700 leading-relaxed">
            The page you are looking for has moved into stillness or does not exist. Take a deep breath and return to our sanctuary center.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Link
            to="/"
            className="px-6 py-3 rounded-xl bg-sage-700 hover:bg-sage-800 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </Link>
          <Link
            to="/programs"
            className="px-6 py-3 rounded-xl bg-cream-100 hover:bg-cream-200 text-charcoal-800 font-semibold text-xs transition-colors"
          >
            Browse Programs
          </Link>
        </div>

      </div>
    </div>
  );
};

export default NotFound;
