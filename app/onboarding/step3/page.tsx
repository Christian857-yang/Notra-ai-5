'use client';

import React, { useState, useEffect } from 'react';

export default function OnboardingStep3() {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [fileName, setFileName] = useState('sample file');

  const loadingSteps = [
    { text: 'Analyzing content...', progress: 25 },
    { text: 'Extracting key ideas...', progress: 50 },
    { text: 'Generating structured notes...', progress: 75 },
    { text: 'Creating quizzes and flashcards...', progress: 90 },
    { text: 'Almost ready...', progress: 100 },
  ];

  useEffect(() => {
    // Check if user came from step2 and get file name
    if (typeof window !== 'undefined') {
      const stage = localStorage.getItem('onboarding_stage');
      const file = localStorage.getItem('onboarding_file_name');
      if (!stage) {
        window.location.href = '/onboarding/step1';
      }
      if (file) {
        setFileName(file);
      }
    }

    // Simulate Turbo-style loading animation
    let stepIndex = 0;
    const stepInterval = setInterval(() => {
      if (stepIndex < loadingSteps.length) {
        setCurrentStep(stepIndex);
        setProgress(loadingSteps[stepIndex].progress);
        stepIndex++;
      }
    }, 650); // Each step takes ~650ms (total ~2.5-3.2 seconds)

    // Final progress animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) {
          const step = loadingSteps.find(s => s.progress > prev);
          if (step) {
            return Math.min(prev + 1, step.progress);
          }
          return prev + 0.5;
        } else {
          clearInterval(progressInterval);
          clearInterval(stepInterval);
          // Navigate to Step 4 after reaching 100%
          setTimeout(() => {
            window.location.href = '/onboarding/step4';
          }, 500);
          return 100;
        }
      });
    }, 30); // Smooth progress update

    return () => {
      // Cleanup intervals
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-8">
          We'll create beautiful notes for you.
        </h1>

        {/* File Preview Card with Rotation */}
        <div className="mb-8 flex justify-center">
          <div 
            className="bg-white rounded-2xl p-6 shadow-xl border-2 border-slate-200 transform transition-transform duration-500"
            style={{
              animation: 'spin 3s linear infinite',
              transform: `rotate(${progress * 0.1}deg) scale(${1 + progress * 0.002})`
            }}
          >
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-3">
              <span className="text-white text-2xl font-bold">📄</span>
            </div>
            <p className="text-sm font-semibold text-slate-700 truncate max-w-[200px]">
              {fileName}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-300 ease-out rounded-full shadow-lg"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-2xl font-semibold text-indigo-600 mt-4">
            {progress}%
          </p>
        </div>

        {/* Loading Step Text */}
        <div className="min-h-[60px] flex items-center justify-center">
          <p className="text-xl text-slate-700 font-medium animate-pulse">
            {loadingSteps[currentStep]?.text || loadingSteps[loadingSteps.length - 1].text}
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}

