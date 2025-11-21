'use client';

import React, { useState, useEffect } from 'react';

export default function OnboardingStep3() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Check if user came from step2
    if (typeof window !== 'undefined') {
      const stage = localStorage.getItem('onboarding_stage');
      if (!stage) {
        window.location.href = '/onboarding/step1';
      }
    }

    // Simulate progress animation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 91) {
          return prev + 2;
        } else if (prev < 100) {
          return prev + 1;
        } else {
          clearInterval(interval);
          // Navigate to Step 4 after reaching 100%
          setTimeout(() => {
            window.location.href = '/onboarding/step4';
          }, 500);
          return 100;
        }
      });
    }, 100); // Update every 100ms for smooth animation

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-8">
          We'll create beautiful notes for you.
        </h1>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#9F6BFF] to-[#7C3AED] transition-all duration-300 ease-out rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-2xl font-semibold text-[#9F6BFF] mt-4">
            {progress}%
          </p>
        </div>

        <p className="text-xl text-slate-600">
          Processing your lecture...
        </p>
      </div>
    </div>
  );
}

