'use client';

import React, { useEffect } from 'react';
import { ArrowRight } from 'lucide-react';

export default function OnboardingStep4() {
  useEffect(() => {
    // Check if user came from step3
    if (typeof window !== 'undefined') {
      const stage = localStorage.getItem('onboarding_stage');
      if (!stage) {
        window.location.href = '/onboarding/step1';
      }
    }
  }, []);

  const handleContinue = () => {
    window.location.href = '/onboarding/step5';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50 py-12 px-4">
      <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-4">
            We'll create beautiful notes for you.
          </h1>
          <p className="text-2xl text-slate-600">
            Calculus 101 – Derivatives & Limits
          </p>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mb-8">
          {/* Section Heading */}
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
              Definition of a Derivative
            </h2>
            <p className="text-xl text-slate-500">Overview</p>
          </div>

          {/* Overview Paragraph */}
          <p className="text-lg text-slate-700 leading-relaxed mb-8">
            The derivative of a function represents the rate of change of the function with respect to its variable. 
            It measures how a function's output value changes as its input value changes. Geometrically, 
            the derivative at a point gives us the slope of the tangent line to the function's graph at that point.
          </p>

          {/* Two Illustrations Side by Side */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border-2 border-blue-100">
              <div className="aspect-square bg-white rounded-xl flex items-center justify-center mb-4 border-2 border-slate-200">
                <div className="text-center p-4">
                  <div className="text-2xl mb-2 font-mono">f'(x) = lim</div>
                  <div className="text-xs text-slate-500 mb-1">h→0</div>
                  <div className="text-sm font-mono">f(x+h) - f(x)</div>
                  <div className="text-xs text-slate-500 mt-1">───────</div>
                  <div className="text-sm font-mono">h</div>
                  <p className="text-xs text-slate-600 mt-3">Limit Definition</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border-2 border-purple-100">
              <div className="aspect-square bg-white rounded-xl flex items-center justify-center mb-4 border-2 border-slate-200">
                <div className="text-center p-4">
                  <div className="text-3xl mb-2">📈</div>
                  <div className="text-xs text-slate-600 mb-2">Tangent Line</div>
                  <div className="w-full h-0.5 bg-slate-300 mb-1"></div>
                  <div className="w-full h-0.5 bg-slate-300"></div>
                  <p className="text-xs text-slate-600 mt-3">Slope = f'(x)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Two Sub-sections */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Key Concepts */}
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                Key Concepts
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-[#9F6BFF] font-bold mt-1">•</span>
                  <span className="text-slate-700">Derivative measures instantaneous rate of change</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#9F6BFF] font-bold mt-1">•</span>
                  <span className="text-slate-700">Geometrically represents the slope of the tangent line</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#9F6BFF] font-bold mt-1">•</span>
                  <span className="text-slate-700">Notation: f'(x), dy/dx, or Df(x)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#9F6BFF] font-bold mt-1">•</span>
                  <span className="text-slate-700">Can be positive, negative, or zero</span>
                </li>
              </ul>
            </div>

            {/* Common Examples */}
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                Common Examples
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-[#9F6BFF] font-bold mt-1">•</span>
                  <span className="text-slate-700">
                    <span className="font-mono">f(x) = x²</span> → <span className="font-mono">f'(x) = 2x</span>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#9F6BFF] font-bold mt-1">•</span>
                  <span className="text-slate-700">
                    <span className="font-mono">f(x) = sin(x)</span> → <span className="font-mono">f'(x) = cos(x)</span>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#9F6BFF] font-bold mt-1">•</span>
                  <span className="text-slate-700">
                    <span className="font-mono">f(x) = eˣ</span> → <span className="font-mono">f'(x) = eˣ</span>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#9F6BFF] font-bold mt-1">•</span>
                  <span className="text-slate-700">
                    <span className="font-mono">f(x) = ln(x)</span> → <span className="font-mono">f'(x) = 1/x</span>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <div className="flex justify-center">
          <button
            onClick={handleContinue}
            className="px-8 py-4 bg-[#9F6BFF] text-white font-semibold rounded-xl hover:bg-[#8B5CF6] transition-all shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2"
          >
            Continue
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

