'use client';

import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  School, 
  User, 
  Briefcase, 
  Users, 
  HelpCircle,
  FileText,
  Mic,
  Youtube,
  ArrowRight,
  Check,
  Sparkles,
  RotateCcw
} from 'lucide-react';

// Custom Link component (matching existing pattern)
const Link = ({ href, children, className, ...props }: any) => {
  return (
    <a href={href} className={className} {...props}>
      {children}
    </a>
  );
};

// Category options
const categories = [
  { id: 'undergrad', label: 'Undergraduate Student', icon: GraduationCap, color: 'from-blue-500 to-indigo-600' },
  { id: 'highschool', label: 'High School Student', icon: School, color: 'from-purple-500 to-pink-600' },
  { id: 'middleschool', label: 'Middle School Student', icon: BookOpen, color: 'from-green-500 to-emerald-600' },
  { id: 'grad', label: 'Graduate Student', icon: GraduationCap, color: 'from-indigo-500 to-purple-600' },
  { id: 'professional', label: 'Professional', icon: Briefcase, color: 'from-slate-600 to-slate-800' },
  { id: 'educator', label: 'Educator', icon: Users, color: 'from-orange-500 to-red-600' },
  { id: 'other', label: 'Other', icon: HelpCircle, color: 'from-gray-400 to-gray-600' },
];

// Demo questions
const demoQuestions = [
  {
    question: "What is the primary function of mitochondria?",
    options: ["Energy production", "Protein synthesis", "DNA replication", "Waste removal"],
    correct: 0
  },
  {
    question: "Which process converts glucose into ATP?",
    options: ["Photosynthesis", "Cellular respiration", "Mitosis", "Osmosis"],
    correct: 1
  }
];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [flashcardFlipped, setFlashcardFlipped] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  // Check if already onboarded
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const onboarded = localStorage.getItem('notra_onboarded');
      if (onboarded === 'true') {
        window.location.href = '/';
      }
    }
  }, []);

  const totalSteps = 4;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setTimeout(() => {
      setCurrentStep(1);
    }, 300);
  };

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[questionIndex] = answerIndex;
    setSelectedAnswers(newAnswers);
    
    // Auto-advance after selecting answer
    if (questionIndex === demoQuestions.length - 1) {
      setTimeout(() => {
        setCurrentStep(2);
      }, 1000);
    }
  };

  const handleFlashcardFlip = () => {
    if (!flashcardFlipped) {
      setFlashcardFlipped(true);
      setShowAnswer(true);
    }
  };

  const handleContinue = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete onboarding
      if (typeof window !== 'undefined') {
        localStorage.setItem('notra_onboarded', 'true');
        localStorage.setItem('notra_category', selectedCategory || 'other');
        window.location.href = '/';
      }
    }
  };

  const handleSkip = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('notra_onboarded', 'true');
      window.location.href = '/';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-slate-200 z-50">
        <div 
          className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="max-w-2xl w-full">
        {/* Step 0: Category Selection */}
        {currentStep === 0 && (
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 via-indigo-500 to-cyan-400 rounded-2xl mb-6 shadow-lg shadow-blue-500/20">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
                Welcome to Notra! 👋
              </h1>
              <p className="text-lg text-slate-600">
                Let's personalize your experience. Which category best describes you?
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {categories.map((category) => {
                const Icon = category.icon;
                const isSelected = selectedCategory === category.id;
                return (
                  <button
                    key={category.id}
                    onClick={() => handleCategorySelect(category.id)}
                    className={`p-6 rounded-2xl border-2 transition-all duration-300 text-left group ${
                      isSelected
                        ? 'border-indigo-500 bg-indigo-50 shadow-lg scale-105'
                        : 'border-slate-200 hover:border-indigo-300 hover:shadow-md bg-white'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-slate-900 mb-1">{category.label}</h3>
                    {isSelected && (
                      <div className="mt-2 flex items-center text-indigo-600 text-sm">
                        <Check className="w-4 h-4 mr-1" />
                        Selected
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            <button
              onClick={handleSkip}
              className="w-full text-center text-sm text-slate-500 hover:text-slate-700 py-2"
            >
              Skip for now
            </button>
          </div>
        )}

        {/* Step 1: Interactive Demo Questions */}
        {currentStep === 1 && (
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
                Try it out! 🎯
              </h2>
              <p className="text-slate-600">
                Tap the correct answer below
              </p>
            </div>

            <div className="space-y-6">
              {demoQuestions.map((q, qIndex) => (
                <div key={qIndex} className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-900">
                    {q.question}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {q.options.map((option, oIndex) => {
                      const isSelected = selectedAnswers[qIndex] === oIndex;
                      const isCorrect = oIndex === q.correct;
                      const showResult = selectedAnswers[qIndex] !== undefined;
                      
                      return (
                        <button
                          key={oIndex}
                          onClick={() => handleAnswerSelect(qIndex, oIndex)}
                          disabled={showResult}
                          className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                            showResult
                              ? isCorrect
                                ? 'border-green-500 bg-green-50 shadow-md'
                                : isSelected
                                ? 'border-red-300 bg-red-50'
                                : 'border-slate-200 bg-slate-50'
                              : 'border-slate-200 hover:border-indigo-400 hover:shadow-md bg-white hover:scale-105'
                          } ${showResult && isCorrect ? 'ring-2 ring-green-500' : ''}`}
                        >
                          <div className="flex items-center justify-between">
                            <span className={`font-medium ${
                              showResult && isCorrect ? 'text-green-700' : 
                              showResult && isSelected ? 'text-red-700' : 
                              'text-slate-700'
                            }`}>
                              {option}
                            </span>
                            {showResult && isCorrect && (
                              <Check className="w-5 h-5 text-green-600" />
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {selectedAnswers.length === demoQuestions.length && (
              <button
                onClick={handleContinue}
                className="mt-8 w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center gap-2"
              >
                Continue
                <ArrowRight className="w-5 h-5" />
              </button>
            )}
          </div>
        )}

        {/* Step 2: Flashcard Demo */}
        {currentStep === 2 && (
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
                Study with Flashcards 📚
              </h2>
              <p className="text-slate-600">
                Tap the card to flip and see the answer
              </p>
            </div>

            <div className="flex justify-center mb-8">
              <div
                className="relative w-full max-w-md h-64 cursor-pointer"
                style={{ perspective: '1000px' }}
                onClick={handleFlashcardFlip}
              >
                <div
                  className="relative w-full h-full transition-transform duration-500"
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: flashcardFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  }}
                >
                  {/* Front of card */}
                  <div
                    className="absolute inset-0 w-full h-full rounded-2xl border-2 border-slate-200 bg-gradient-to-br from-blue-50 to-indigo-50 p-8 flex items-center justify-center"
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      transform: 'rotateY(0deg)',
                    }}
                  >
                    <div className="text-center">
                      <div className="text-4xl mb-4">❓</div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">
                        What is photosynthesis?
                      </h3>
                      <p className="text-slate-500 text-sm">Tap to reveal answer</p>
                    </div>
                  </div>

                  {/* Back of card */}
                  <div
                    className="absolute inset-0 w-full h-full rounded-2xl border-2 border-indigo-200 bg-gradient-to-br from-indigo-50 to-purple-50 p-8 flex items-center justify-center"
                    style={{
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                    }}
                  >
                    <div className="text-center">
                      <div className="text-4xl mb-4">✅</div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3">
                        Answer:
                      </h3>
                      <p className="text-slate-600 leading-relaxed">
                        The process by which plants convert light energy into chemical energy (glucose) using carbon dioxide and water.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {showAnswer && (
              <button
                onClick={handleContinue}
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center gap-2"
              >
                Continue
                <ArrowRight className="w-5 h-5" />
              </button>
            )}
          </div>
        )}

        {/* Step 3: Feature Explanation */}
        {currentStep === 3 && (
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
                How Notra Works 🚀
              </h2>
              <p className="text-slate-600">
                Three powerful ways to transform your study materials
              </p>
            </div>

            <div className="space-y-6 mb-8">
              {/* File Analysis */}
              <div className="p-6 rounded-2xl border-2 border-slate-200 hover:border-indigo-300 transition-all bg-gradient-to-br from-blue-50/50 to-indigo-50/50">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-900 mb-2">File Analysis</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Upload PDFs, Word documents, or text files. Notra extracts key concepts, generates summaries, and creates study materials automatically.
                    </p>
                  </div>
                </div>
              </div>

              {/* Audio Analysis */}
              <div className="p-6 rounded-2xl border-2 border-slate-200 hover:border-indigo-300 transition-all bg-gradient-to-br from-purple-50/50 to-pink-50/50">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center flex-shrink-0">
                    <Mic className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-900 mb-2">Audio Analysis</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Record lectures or upload audio files. Get instant transcriptions, summaries, and organized notes with timestamps.
                    </p>
                  </div>
                </div>
              </div>

              {/* YouTube Analysis */}
              <div className="p-6 rounded-2xl border-2 border-slate-200 hover:border-indigo-300 transition-all bg-gradient-to-br from-red-50/50 to-orange-50/50">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center flex-shrink-0">
                    <Youtube className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-900 mb-2">YouTube Analysis</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      Paste YouTube video links. Notra analyzes transcripts and extracts key points, creating study-ready summaries.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleContinue}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center gap-2"
            >
              Get Started
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

    </div>
  );
}

