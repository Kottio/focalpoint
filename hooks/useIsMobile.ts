import { useState, useEffect } from 'react';

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768); // 768px = Tailwind md breakpoint
    };

    // Check on mount
    checkIfMobile();

    // Listen for window resize
    window.addEventListener('resize', checkIfMobile);

    // Cleanup listener on unmount
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // During SSR and initial render, return false to match initial state
  // This prevents hydration mismatch
  return mounted && isMobile;
};