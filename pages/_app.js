import '@/styles/globals.css';

import { ThemeProvider } from '@material-tailwind/react';
import { SessionProvider, getSession, signOut } from 'next-auth/react';
import { useEffect } from 'react';

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  useEffect(() => {
    window.addEventListener('focus', async () => {
      const session = await getSession();
      if (!session) {
        return signOut();
      }
    });
  }, []);

  return (
    <SessionProvider session={session}>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  );
}
