import React, { useState } from 'react';
import { STORAGE_KEYS, getFromStorage, saveToStorage } from '../utils/storage';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  HelpCircle,
  ShieldCheck
} from 'lucide-react';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState(null);
  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    {
      q: 'Are the yoga programs beginner friendly?',
      a: 'Yes, absolutely. Our foundational courses like "Beginner Yoga Foundations" and "Pranayama for Beginners" are structured specifically with slow pacing, modifications, and anatomical cues for those who have never practiced before.',
    },
    {
      q: 'How does digital course access work after checkout?',
      a: 'Access is immediate upon order confirmation! When you enroll in a digital program, it is automatically added to your My Account dashboard under Enrolled Programs with unlimited replay.',
    },
    {
      q: 'What is your shipping policy for physical shop items?',
      a: 'All physical product orders over ₹999 qualify for Free Standard Delivery across India. Orders under ₹999 incur a flat ₹99 standard shipping charge.',
    },
    {
      q: 'Are the shop products genuinely eco-friendly?',
      a: 'Our products are crafted with sustainable materials such as biodegradable TPE, closed-cell recyclable EVA foam, 100% unbleached organic cotton, and clean buckwheat hull fillings.',
    },
    {
      q: 'Do I need special equipment to start practicing?',
      a: 'To begin, all you truly need is comfortable clothing and a quiet spot on the floor. A non-slip yoga mat and yoga blocks provide supportive ease as you develop flexibility.',
    },
    {
      q: 'What payment methods are supported?',
      a: 'We currently support Pay Later / Digital Invoice settlement and Cash on Delivery for physical merchandise while our direct online card payment gateway undergoes scheduled integration.',
    },
  ];

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Please provide your full name';
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!formData.email.includes('@') || !formData.email.includes('.')) {
      errs.email = 'Please provide a valid email address';
    }
    if (!formData.subject.trim()) errs.subject = 'Please provide a message subject';
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = 'Please provide a message with at least 10 characters';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 400));

    const newMessage = {
      id: `msg-${Date.now()}`,
      name: formData.name.trim(),
      email: formData.email.trim(),
      subject: formData.subject.trim(),
      message: formData.message.trim(),
      sentAt: new Date().toISOString(),
    };

    const existing = getFromStorage(STORAGE_KEYS.CONTACT_MESSAGES, []);
    saveToStorage(STORAGE_KEYS.CONTACT_MESSAGES, [newMessage, ...existing]);

    setIsSubmitting(false);
    setSubmittedMessage(newMessage);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-widest font-semibold text-sage-700">
          We Are Here For You
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal-900">
          Connect with Prana Yoga
        </h1>
        <p className="text-sm sm:text-base text-charcoal-700 leading-relaxed">
          Have questions about which course fits your practice or need assistance with an order? Send our sanctuary team a message.
        </p>
      </div>

      {/* Main Grid: Form Left, Contact Info Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Contact Form */}
        <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-cream-200 shadow-lift space-y-6">
          <div className="space-y-1">
            <h3 className="font-serif text-2xl font-bold text-charcoal-900">
              Send Us a Message
            </h3>
            <p className="text-xs text-charcoal-700/70">
              Fill out the form below and our team will be delighted to guide your practice.
            </p>
          </div>

          {submittedMessage ? (
            <div className="p-6 rounded-2xl bg-sage-50 border border-sage-200 text-center space-y-3">
              <div className="w-12 h-12 mx-auto rounded-full bg-sage-100 text-sage-700 flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h4 className="font-serif text-lg font-bold text-charcoal-900">
                Message Received!
              </h4>
              <p className="text-xs text-charcoal-700 leading-relaxed max-w-md mx-auto">
                Thank you, <strong>{submittedMessage.name}</strong>. Your inquiry regarding "{submittedMessage.subject}" has been received by our sanctuary team.
              </p>
              <button
                onClick={() => setSubmittedMessage(null)}
                className="mt-2 px-4 py-2 rounded-xl bg-sage-700 text-white font-semibold text-xs hover:bg-sage-800"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-charcoal-800">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      if (errors.name) setErrors({ ...errors, name: '' });
                    }}
                    placeholder="e.g. Meera Nair"
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-cream-50 border text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-sage-500 ${
                      errors.name ? 'border-red-500' : 'border-cream-300'
                    }`}
                  />
                  {errors.name && <p className="text-[11px] text-red-600">{errors.name}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-charcoal-800">
                    Your Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (errors.email) setErrors({ ...errors, email: '' });
                    }}
                    placeholder="name@example.com"
                    className={`w-full px-3.5 py-2.5 rounded-xl bg-cream-50 border text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-sage-500 ${
                      errors.email ? 'border-red-500' : 'border-cream-300'
                    }`}
                  />
                  {errors.email && <p className="text-[11px] text-red-600">{errors.email}</p>}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-charcoal-800">
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={(e) => {
                    setFormData({ ...formData, subject: e.target.value });
                    if (errors.subject) setErrors({ ...errors, subject: '' });
                  }}
                  placeholder="e.g. Inquiring about Beginner Yoga Foundations"
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-cream-50 border text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-sage-500 ${
                    errors.subject ? 'border-red-500' : 'border-cream-300'
                  }`}
                />
                {errors.subject && <p className="text-[11px] text-red-600">{errors.subject}</p>}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-charcoal-800">
                  Your Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={(e) => {
                    setFormData({ ...formData, message: e.target.value });
                    if (errors.message) setErrors({ ...errors, message: '' });
                  }}
                  placeholder="Share your goals, questions, or comments here..."
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-cream-50 border text-sm text-charcoal-900 focus:outline-none focus:ring-2 focus:ring-sage-500 ${
                    errors.message ? 'border-red-500' : 'border-cream-300'
                  }`}
                />
                {errors.message && <p className="text-[11px] text-red-600">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-sage-700 hover:bg-sage-800 text-white font-semibold text-sm transition-all shadow-md flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>Sending Message...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          )}

        </div>

        {/* Right Column: Contact Details */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-cream-100/70 p-6 sm:p-8 rounded-3xl border border-cream-200 space-y-6">
            <h3 className="font-serif text-xl font-bold text-charcoal-900">
              Sanctuary Contact Information
            </h3>

            <div className="space-y-4 text-xs sm:text-sm text-charcoal-700">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-sage-100 text-sage-800 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-charcoal-900">Sanctuary Studio</p>
                  <p className="text-charcoal-700/80">Prana Sanctuary, Lane 5, Koregaon Park, Pune, Maharashtra 411001, India</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-sage-100 text-sage-800 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-charcoal-900">Email Address</p>
                  <p className="text-charcoal-700/80 font-mono">contact@pranayoga.in</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-sage-100 text-sage-800 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-charcoal-900">Telephone</p>
                  <p className="text-charcoal-700/80">+91 98765 43210</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-sage-100 text-sage-800 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-charcoal-900">Support Operating Hours</p>
                  <p className="text-charcoal-700/80">Monday to Saturday: 6:00 AM – 8:00 PM IST</p>
                  <p className="text-charcoal-700/80">Sunday: Closed for silent contemplative practice</p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white border border-cream-200 text-xs text-charcoal-700/80 flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-sage-700 shrink-0 mt-0.5" />
              <span>
                Our sanctuary team responds to all inquiries within 24–48 business hours. For immediate assistance during practice hours, call our studio line.
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* FAQ Accordion Section */}
      <div className="pt-8 border-t border-cream-200 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cream-100 text-charcoal-800 text-xs font-semibold">
            <HelpCircle className="w-3.5 h-3.5 text-sage-700" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="font-serif text-3xl font-bold text-charcoal-900">
            Common Inquiries
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-700">
            Everything you need to know about starting your practice with Prana Yoga.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="rounded-2xl bg-white border border-cream-200 overflow-hidden shadow-xs transition-all"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full py-4 px-6 text-left flex items-center justify-between gap-4 font-serif font-bold text-charcoal-900 hover:text-sage-700 text-sm sm:text-base focus:outline-none"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-sage-700 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-charcoal-700/60 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-6 pb-4 text-xs sm:text-sm text-charcoal-700 leading-relaxed border-t border-cream-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default Contact;
