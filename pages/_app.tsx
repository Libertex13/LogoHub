//pages\_app.tsx
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { AuthProvider } from '@/context/AuthContext';
import { IconGeneratorProvider } from '../context/IconGeneratorContext';
import Head from 'next/head';
import Layout from '@/components/Layout/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Layout>
        <Head>
          <title>LogoHub: Create your Logo!</title>
          <meta property="og:title" content="My page title" key="title" />
        </Head>
        <IconGeneratorProvider>
          <Component {...pageProps} />
        </IconGeneratorProvider>
      </Layout>
    </AuthProvider>
  );
}

export default MyApp;
