import { useState, useEffect } from 'react';

export const useIsMobile = () => {
  // Default to mobile-first (important for SSR)
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
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

  return isMobile;
};