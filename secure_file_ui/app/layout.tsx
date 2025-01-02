'use client'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import "./globals.css";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { useRef } from 'react';
import { AppStore, makeStore } from '@/store/store';
import { Provider } from 'react-redux';
import UserInit from './UserInit';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function StoreProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const storeRef = useRef<AppStore>(null)
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore()
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <html lang="en">
        <head>
          <title>Secure File Sharing</title>
        </head>
        <body>
          <StoreProvider>
            <UserInit>
              {children}
            </UserInit>
          </StoreProvider>
        </body>
      </html>
    </ThemeProvider>
  );
}


