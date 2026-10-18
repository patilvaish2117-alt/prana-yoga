import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff, ArrowLeft, CheckCircle2, UserPlus } from 'lucide-react';

export const Signup = () => {
  const { signup, loading } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    if (serverError) setServerError('');
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = 'Full name is required';
    } else if (formData.name.trim().length < 2) {
      errs.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!formData.email.includes('@') || !formData.email.includes('.')) {
      errs.email = 'Please provide a valid email address';
    }

    if (!formData.password) {
      errs.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errs.password = 'Password must be at least 6 characters long';
    }

    if (!formData.confirmPassword) {
      errs.confirmPassword = 'Confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      errs.confirmPassword = 'Passwords do not match';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const res = await signup({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });

    if (res.success) {
      setSuccess(true);
      setTimeout(() => {
        navigate('/account');
      }, 1500);
    } else {
      setServerError(res.message);
    }
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-md mx-auto space-y-6">
      
      {/* Back to Home Link */}
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-charcoal-700 hover:text-sage-800 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Prana Yoga Home</span>
      </Link>

      {/* Main Card */}
      <div className="bg-white p-7 sm:p-9 rounded-3xl border border-cream-200 shadow-lift space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 mx-auto rounded-full bg-sage-100 text-sage-800 flex items-center justify-center shadow-xs">
            <UserPlus className="w-6 h-6" />
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal-900">
            Create Your Account
          </h1>
          <p className="text-xs text-charcoal-700">
            Join the Prana Yoga community to enroll in programs and track orders.
          </p>
        </div>

        {/* Success Alert */}
        {success && (
          <div className="p-4 rounded-xl bg-sage-50 border border-sage-300 text-xs text-sage-900 flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-sage-700 shrink-0" />
            <span>Registration successful! Directing to your sanctuary dashboard...</span>
          </div>
        )}

        {/* Server Error Alert */}
        {serverError && (
          <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700">
            {serverError}
          </div>
        )}

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Full Name */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-charcoal-800">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Aarav Sharma"
              className={`w-full px-3.5 py-2.5 rounded-xl bg-cream-50 border text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-sage-500 ${
                errors.name ? 'border-red-500' : 'border-cream-300'
              }`}
            />
            {errors.name && <p className="text-[11px] text-red-600">{errors.name}</p>}
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-charcoal-800">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="name@example.com"
              className={`w-full px-3.5 py-2.5 rounded-xl bg-cream-50 border text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-sage-500 ${
                errors.email ? 'border-red-500' : 'border-cream-300'
              }`}
            />
            {errors.email && <p className="text-[11px] text-red-600">{errors.email}</p>}
          </div>

          {/* Password with Show/Hide */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-charcoal-800">
              Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="At least 6 characters"
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

          {/* Confirm Password with Show/Hide */}
          <div className="space-y-1">
            <label className="text-xs font-semibold text-charcoal-800">
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter password"
                className={`w-full pl-3.5 pr-10 py-2.5 rounded-xl bg-cream-50 border text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-sage-500 ${
                  errors.confirmPassword ? 'border-red-500' : 'border-cream-300'
                }`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-charcoal-700/60 hover:text-charcoal-900 p-1"
                aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-[11px] text-red-600">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || success}
            className="w-full py-3.5 rounded-xl bg-sage-700 hover:bg-sage-800 disabled:bg-sage-400 text-white font-semibold text-sm transition-all shadow-md flex items-center justify-center gap-2 mt-2"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Creating Account...</span>
              </div>
            ) : (
              <span>Create Account</span>
            )}
          </button>
        </form>

        {/* Existing user link */}
        <div className="pt-4 border-t border-cream-200 text-center text-xs text-charcoal-700">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-sage-800 hover:underline">
            Log In Here
          </Link>
        </div>

      </div>

    </div>
  );
};

export default Signup;
