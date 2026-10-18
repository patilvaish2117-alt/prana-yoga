import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, ArrowLeft, LogIn, Sparkles, UserCheck } from 'lucide-react';

export const Login = () => {
  const { login, loginAsDemo, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/account';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');

  const validate = () => {
    const errs = {};
    if (!email.trim()) {
      errs.email = 'Email address is required';
    } else if (!email.includes('@') || !email.includes('.')) {
      errs.email = 'Please enter a valid email address';
    }

    if (!password) {
      errs.password = 'Password is required';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    if (!validate()) return;

    const res = await login(email, password);
    if (res.success) {
      navigate(from, { replace: true });
    } else {
      setServerError(res.message);
    }
  };

  const handleQuickDemoLogin = async () => {
    setServerError('');
    const res = await loginAsDemo();
    if (res.success) {
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-md mx-auto space-y-6">
      
      {/* Return Home Link */}
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-charcoal-700 hover:text-sage-800 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Prana Yoga Home</span>
      </Link>

      {/* Login Card */}
      <div className="bg-white p-7 sm:p-9 rounded-3xl border border-cream-200 shadow-lift space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 mx-auto rounded-full bg-sage-100 text-sage-800 flex items-center justify-center shadow-xs">
            <LogIn className="w-6 h-6" />
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-900">
            Welcome Back
          </h1>
          <p className="text-xs text-charcoal-700">
            Log in to continue your mindful practice and track your orders.
          </p>
        </div>

        {/* Quick Access Account Preset */}
        <div className="p-3.5 rounded-2xl bg-sage-50 border border-sage-200 text-xs text-sage-900 space-y-2">
          <div className="flex items-center justify-between font-semibold">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-terracotta-500" />
              <span>Quick Access Account</span>
            </span>
            <span className="text-[10px] bg-sage-200 px-2 py-0.5 rounded-full font-mono">
              prana123
            </span>
          </div>
          <p className="text-[11px] text-sage-800 leading-relaxed">
            Click below for instant one-click sign in as registered practitioner Aarav Sharma.
          </p>
          <button
            type="button"
            onClick={handleQuickDemoLogin}
            disabled={loading}
            className="w-full py-2 bg-sage-700 hover:bg-sage-800 text-white rounded-xl font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-xs"
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>Instant Sign In (Aarav Sharma)</span>
          </button>
        </div>

        {/* Server Error Alert */}
        {serverError && (
          <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700">
            {serverError}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Email */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-charcoal-800">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors({ ...errors, email: '' });
                if (serverError) setServerError('');
              }}
              placeholder="e.g. demo@pranayoga.com"
              className={`w-full px-3.5 py-2.5 rounded-xl bg-cream-50 border text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-sage-500 ${
                errors.email ? 'border-red-500' : 'border-cream-300'
              }`}
            />
            {errors.email && <p className="text-[11px] text-red-600">{errors.email}</p>}
          </div>

          {/* Password */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-charcoal-800">
                Password <span className="text-red-500">*</span>
              </label>
              <span className="text-[11px] text-charcoal-700/60 font-mono">Sample: prana123</span>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password) setErrors({ ...errors, password: '' });
                  if (serverError) setServerError('');
                }}
                placeholder="Enter your password"
                className={`w-full pl-3.5 pr-10 py-2.5 rounded-xl bg-cream-50 border text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-sage-500 ${
                  errors.password ? 'border-red-500' : 'border-cream-300'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal-700/60 hover:text-charcoal-900 p-1"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && <p className="text-[11px] text-red-600">{errors.password}</p>}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-sage-700 hover:bg-sage-800 disabled:bg-sage-400 text-white font-semibold text-sm transition-all shadow-md flex items-center justify-center gap-2 mt-2"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Logging In...</span>
              </div>
            ) : (
              <span>Log In to Account</span>
            )}
          </button>
        </form>

        {/* Guest Browsing Option */}
        <div className="pt-2 text-center">
          <Link
            to="/"
            className="text-xs font-semibold text-charcoal-700 hover:text-charcoal-900 underline underline-offset-4"
          >
            Continue as Guest (Explore without signing in)
          </Link>
        </div>

        {/* Links to Sign Up */}
        <div className="pt-4 border-t border-cream-200 text-center text-xs text-charcoal-700">
          New to Prana Yoga?{' '}
          <Link to="/signup" className="font-semibold text-sage-800 hover:underline">
            Create an Account
          </Link>
        </div>

      </div>

    </div>
  );
};

export default Login;
