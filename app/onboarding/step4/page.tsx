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
            Biology 101 – Molecular Biology
          </p>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 mb-8">
          {/* Section Heading */}
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
              Prokaryotes vs. Eukaryotes
            </h2>
            <p className="text-xl text-slate-500">Overview</p>
          </div>

          {/* Overview Paragraph */}
          <p className="text-lg text-slate-700 leading-relaxed mb-8">
            Cells are the fundamental units of life, and they can be broadly classified into two main types: 
            prokaryotic and eukaryotic cells. Prokaryotes are simpler, single-celled organisms without a 
            nucleus, while eukaryotes are more complex cells with a true nucleus and membrane-bound organelles.
          </p>

          {/* Two Illustrations Side by Side */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border-2 border-blue-100">
              <div className="aspect-square bg-white rounded-xl flex items-center justify-center mb-4">
                <div className="text-center">
                  <div className="text-4xl mb-2">🦠</div>
                  <p className="text-sm text-slate-600">Prokaryotic Cell</p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border-2 border-purple-100">
              <div className="aspect-square bg-white rounded-xl flex items-center justify-center mb-4">
                <div className="text-center">
                  <div className="text-4xl mb-2">🧬</div>
                  <p className="text-sm text-slate-600">Eukaryotic Cell</p>
                </div>
              </div>
            </div>
          </div>

          {/* Two Sub-sections */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Prokaryotic Cells */}
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                Prokaryotic Cells
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-[#9F6BFF] font-bold mt-1">•</span>
                  <span className="text-slate-700">No nucleus; DNA in nucleoid region</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#9F6BFF] font-bold mt-1">•</span>
                  <span className="text-slate-700">No membrane-bound organelles</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#9F6BFF] font-bold mt-1">•</span>
                  <span className="text-slate-700">Smaller in size (1-5 μm)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#9F6BFF] font-bold mt-1">•</span>
                  <span className="text-slate-700">Examples: Bacteria, Archaea</span>
                </li>
              </ul>
            </div>

            {/* Eukaryotic Cells */}
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                Eukaryotic Cells
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-[#9F6BFF] font-bold mt-1">•</span>
                  <span className="text-slate-700">True nucleus with nuclear envelope</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#9F6BFF] font-bold mt-1">•</span>
                  <span className="text-slate-700">Membrane-bound organelles (mitochondria, ER, etc.)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#9F6BFF] font-bold mt-1">•</span>
                  <span className="text-slate-700">Larger in size (10-100 μm)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#9F6BFF] font-bold mt-1">•</span>
                  <span className="text-slate-700">Examples: Plants, Animals, Fungi</span>
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

