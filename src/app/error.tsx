'use client';

import { useEffect } from 'react';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import Button from '@/components/common/Button/Button';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <>
      <Header />
      <main style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '120px 24px' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '16px', color: '#0c0b0a' }}>Something went wrong!</h2>
        <p style={{ maxWidth: '480px', color: '#666', marginBottom: '32px', lineHeight: 1.6 }}>
          An unexpected error occurred while loading this page.
        </p>
        <button
          onClick={() => reset()}
          style={{
            background: '#ec4d00',
            color: '#fff',
            border: 'none',
            padding: '12px 28px',
            borderRadius: '999px',
            fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          Try Again
        </button>
      </main>
      <Footer />
    </>
  );
}
