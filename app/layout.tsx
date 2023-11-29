import type { Metadata } from 'next';
import { CssBaseline, ThemeProvider } from '@mui/material';
// import { ThemeProvider } from '@emotion/react';
import { Inter } from 'next/font/google';
import { Slide, ToastContainer } from 'react-toastify';
import NavBar from '@components/NavBar/Navbar';
import Providers from '@utils/provider';
import theme from '@theme';
import './globals.css';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <ThemeProvider theme={theme}>
            <ToastContainer transition={Slide} />
            <CssBaseline />
            <NavBar />
            {children}
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
