'use client';

import { ThemeProvider, CssBaseline } from '@mui/material';
import { Provider as ReduxProvider } from 'react-redux';
import theme from '../theme/theme';
import store from '../store/store';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ReduxProvider>
  );
}
