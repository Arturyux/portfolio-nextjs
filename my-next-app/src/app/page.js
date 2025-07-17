import '../styles/globals.css';
import { useEffect } from 'react';
import { initDb } from '../lib/db';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    initDb();
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;