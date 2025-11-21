'use client';

import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  School, 
  Briefcase, 
  Users, 
  HelpCircle
} from 'lucide-react';

const categories = [
  { id: 'undergrad', label: 'Undergraduate Student', icon: GraduationCap },
  { id: 'highschool', label: 'High School Student', icon: School },
  { id: 'middleschool', label: 'Middle School Student', icon: BookOpen },
  { id: 'grad', label: 'Graduate Student', icon: GraduationCap },
  { id: 'professional', label: 'Professional', icon: Briefcase },
  { id: 'educator', label: 'Educator', icon: Users },
  { id: 'other', label: 'Other', icon: HelpCircle },
];

export default function OnboardingStep1() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Check if already onboarded
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const onboarded = localStorage.getItem('onboarding_complete');
      if (onboarded === 'true') {
        window.location.href = '/';
      }
    }
  }, []);

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setIsAnimating(true);
    
    // Store in localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('onboarding_stage', categoryId);
    }
    
    // Navigate to Step 2 after animation
    setTimeout(() => {
      window.location.href = '/onboarding/step2';
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full animate-in fade-in duration-500">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-4">
            What describes you best?
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((category) => {
            const Icon = category.icon;
            const isSelected = selectedCategory === category.id;
            
            return (
              <button
                key={category.id}
                onClick={() => handleCategorySelect(category.id)}
                disabled={isAnimating}
                className={`
                  relative p-8 rounded-2xl border-2 transition-all duration-300 text-left
                  ${isSelected 
                    ? 'border-[#9F6BFF] bg-[#9F6BFF]/10 shadow-lg scale-105' 
                    : 'border-slate-200 hover:border-[#9F6BFF]/50 hover:shadow-md bg-white'
                  }
                  ${isAnimating && !isSelected ? 'opacity-50' : ''}
                `}
              >
                <div className="flex items-center gap-4">
                  <div className={`
                    w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0
                    transition-colors duration-300
                    ${isSelected 
                      ? 'bg-[#9F6BFF] text-white' 
                      : 'bg-slate-100 text-slate-600'
                    }
                  `}>
                    <Icon className="w-7 h-7" />
                  </div>
                  <span className="text-lg font-semibold text-slate-900">
                    {category.label}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

