'use client';

import type { ReactNode } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { QueryProvider } from './QueryProvider';
import { theme } from '@/lib/theme/mui/theme';

type AppProviderProps = {
  children: ReactNode;
};

// Filter LocatorJS extension console.error in dev to prevent Next.js error overlay from popping up
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  const originalConsoleError = console.error;
  console.error = (...args: unknown[]) => {
    if (typeof args[0] === 'string' && args[0].includes('[LocatorJS]')) {
      console.warn(...args);
      return;
    }
    originalConsoleError(...args);
  };
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryProvider>{children}</QueryProvider>
    </ThemeProvider>
  );
}
