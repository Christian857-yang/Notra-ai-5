'use client';

import React, { useState, useRef, useEffect } from 'react';
import { FileText, Upload, Youtube, Mic } from 'lucide-react';

export default function OnboardingStep2() {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDraggingSample, setIsDraggingSample] = useState(false);

  // Check if user came from step1
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stage = localStorage.getItem('onboarding_stage');
      if (!stage) {
        window.location.href = '/onboarding/step1';
      }
    }
  }, []);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleFileUpload = (file: File) => {
    setUploadedFile(file);
    // Store file info temporarily (client-side only)
    if (typeof window !== 'undefined') {
      localStorage.setItem('onboarding_file_name', file.name);
      localStorage.setItem('onboarding_file_type', file.type);
    }
    
    // Navigate to Step 3 after a brief delay
    setTimeout(() => {
      window.location.href = '/onboarding/step3';
    }, 500);
  };

  const handleSampleDragStart = (e: React.DragEvent) => {
    setIsDraggingSample(true);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleSampleDragEnd = () => {
    setIsDraggingSample(false);
  };

  const handleSampleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingSample(false);
    // Simulate file upload for sample
    const mockFile = new File([''], 'Calculus Chapter 3.pdf', { type: 'application/pdf' });
    handleFileUpload(mockFile);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-50 flex items-center justify-center p-4">
      <div className="max-w-3xl w-full animate-in fade-in duration-500">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-4">
            Upload Anything
          </h1>
          <p className="text-xl text-slate-600 flex items-center justify-center gap-3">
            <FileText className="w-5 h-5" />
            PDFs
            <span className="text-slate-400">•</span>
            <Youtube className="w-5 h-5" />
            YouTube Videos
            <span className="text-slate-400">•</span>
            <Mic className="w-5 h-5" />
            Audio
          </p>
        </div>

        {/* Drop Zone */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`
            relative border-2 border-dashed rounded-3xl p-16 text-center cursor-pointer
            transition-all duration-300 mb-8
            ${isDragging 
              ? 'border-[#9F6BFF] bg-[#9F6BFF]/10 shadow-xl scale-105' 
              : 'border-slate-300 hover:border-[#9F6BFF]/50 hover:bg-white/50 bg-white/30'
            }
          `}
        >
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            onChange={handleFileInput}
            accept=".pdf,.doc,.docx,.txt,.mp4,.mp3,.wav,.webm,.m4a"
          />
          
          <div className="flex flex-col items-center gap-4">
            <div className={`
              w-20 h-20 rounded-2xl flex items-center justify-center
              transition-colors duration-300
              ${isDragging ? 'bg-[#9F6BFF] text-white' : 'bg-slate-100 text-slate-600'}
            `}>
              <Upload className="w-10 h-10" />
            </div>
            <p className="text-2xl font-semibold text-slate-700">
              Drop here
            </p>
            <p className="text-slate-500">
              or click to browse
            </p>
          </div>
        </div>

        {/* Try it out section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
            Try it out!
          </h2>
          
          <div
            draggable
            onDragStart={handleSampleDragStart}
            onDragEnd={handleSampleDragEnd}
            onDrop={handleSampleDrop}
            onDragOver={(e) => e.preventDefault()}
            className={`
              bg-white rounded-2xl p-6 border-2 border-slate-200 cursor-move
              transition-all duration-300
              ${isDraggingSample 
                ? 'opacity-50 scale-95' 
                : 'hover:border-[#9F6BFF]/50 hover:shadow-lg'
              }
            `}
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-slate-900 mb-1">
                  Calculus Chapter 3
                </h3>
                <p className="text-slate-600 text-sm">
                  Derivatives
                </p>
              </div>
              <div className="text-slate-400 text-sm">
                Drag me ↑
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

