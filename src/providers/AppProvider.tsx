'use client';

import type { ReactNode } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { QueryProvider } from './QueryProvider';
import { theme } from '@/lib/theme/mui/theme';

type AppProviderProps = {
  children: ReactNode;
};

export function AppProvider({ children }: AppProviderProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryProvider>{children}</QueryProvider>
    </ThemeProvider>
  );
}
