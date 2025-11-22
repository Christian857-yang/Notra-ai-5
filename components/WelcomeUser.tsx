'use client';

import React, { useState, useEffect } from 'react';

export default function WelcomeUser() {
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const name = localStorage.getItem('user_display_name');
      const loggedIn = localStorage.getItem('user_logged_in') === 'true';
      
      if (name && loggedIn) {
        setDisplayName(name);
        setIsLoggedIn(true);
      }
    }
  }, []);

  if (!isLoggedIn || !displayName) {
    return null; // Don't show anything if not logged in
  }

  return (
    <div className="flex items-center gap-2 animate-in fade-in slide-in-from-left-4 duration-500">
      <span className="text-sm md:text-base font-medium text-slate-600">
        Welcome,
      </span>
      <span 
        className="text-sm md:text-base font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 animate-welcomeGlow"
        style={{
          animation: 'welcomeGlow 3s ease-in-out infinite',
        }}
      >
        {displayName}
      </span>
    </div>
  );
}

