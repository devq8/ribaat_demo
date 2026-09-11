import { useEffect, useState } from 'react';

/** 'mobile' | 'tablet' | 'desktop' — drives layoutConfig, never inline media queries. */
export const BREAKPOINTS = { mobile: 0, tablet: 640, desktop: 1024 };

export function useBreakpoint() {
  const read = () => {
    if (typeof window === 'undefined') return 'desktop';
    if (window.innerWidth < BREAKPOINTS.tablet) return 'mobile';
    if (window.innerWidth < BREAKPOINTS.desktop) return 'tablet';
    return 'desktop';
  };
  const [breakpoint, setBreakpoint] = useState(read);
  useEffect(() => {
    const onResize = () => setBreakpoint(read());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  return breakpoint;
}
