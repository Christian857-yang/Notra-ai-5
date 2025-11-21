'use client';

import React, { useEffect } from 'react';
import { Star, Quote } from 'lucide-react';

export default function OnboardingStep7() {
  useEffect(() => {
    // Check if user came from step6
    if (typeof window !== 'undefined') {
      const stage = localStorage.getItem('onboarding_stage');
      if (!stage) {
        window.location.href = '/onboarding/step1';
      }
    }
  }, []);

  const handleJoinNow = () => {
    // Set onboarding as complete
    if (typeof window !== 'undefined') {
      localStorage.setItem('onboarding_complete', 'true');
      // Navigate to homepage after signup
      window.location.href = '/';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#EDE5FF] to-white flex items-center justify-center p-4">
      <div className="max-w-3xl w-full text-center animate-in fade-in duration-500">
        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
          6 Million Students trust Notra
        </h1>

        {/* Rating */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-6 h-6 fill-yellow-400 text-yellow-400"
              />
            ))}
          </div>
          <span className="text-2xl font-bold text-slate-900">4.8</span>
          <span className="text-xl text-slate-600">25K reviews</span>
        </div>

        {/* Testimonial Card */}
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-8 border border-slate-100">
          <div className="flex justify-center mb-6">
            <Quote className="w-12 h-12 text-[#9F6BFF]" />
          </div>
          <p className="text-xl text-slate-700 leading-relaxed mb-6 italic">
            "Notra has completely transformed how I study. The AI-generated notes are 
            incredibly detailed and the flashcards help me retain information so much better. 
            I've improved my grades significantly since using it!"
          </p>
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg">
              S
            </div>
            <div className="text-left">
              <p className="font-bold text-slate-900">Sarah Chen</p>
              <p className="text-slate-600 text-sm">Stanford University</p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <button
          onClick={handleJoinNow}
          className="px-12 py-5 bg-[#9F6BFF] text-white font-bold text-xl rounded-xl hover:bg-[#8B5CF6] transition-all shadow-xl hover:shadow-2xl hover:scale-105"
        >
          Join Now – It's Free
        </button>
      </div>
    </div>
  );
}

