//pages\_app.tsx
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { AuthProvider } from '@/context/AuthContext';
import { IconGeneratorProvider } from '../context/IconGeneratorContext';
import Head from 'next/head';
import Layout from '@/components/Layout/Layout';
import { Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Layout>
        <Head>
          <title>LogoHub: Create your Logo!</title>
          <meta
            property="og:title"
            content="LogoHub: Create your Logo!"
            key="title"
          />
        </Head>
        <IconGeneratorProvider>
          <Toaster />
          <Component {...pageProps} />
        </IconGeneratorProvider>
      </Layout>
    </AuthProvider>
  );
}

export default MyApp;
