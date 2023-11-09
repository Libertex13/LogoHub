import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { IconGeneratorProvider } from '../context/IconGeneratorContext'; 

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <IconGeneratorProvider>
      <Component {...pageProps} />
    </IconGeneratorProvider>
  );
}

export default MyApp;
