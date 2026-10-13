import Link from 'next/link';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import Button from '@/components/common/Button/Button';

export default function NotFound() {
  return (
    <>
      <Header />
      <main style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '120px 24px' }}>
        <h1 style={{ fontSize: '4rem', color: '#ec4d00', marginBottom: '16px', fontWeight: 800 }}>404</h1>
        <h2 style={{ fontSize: '1.75rem', marginBottom: '16px', color: '#0c0b0a' }}>Page Not Found</h2>
        <p style={{ maxWidth: '480px', color: '#666', marginBottom: '32px', lineHeight: 1.6 }}>
          The page or solar resource you are looking for might have been moved, removed, or is temporarily unavailable.
        </p>
        <Button variant="primary" to="/">
          Return to Homepage
        </Button>
      </main>
      <Footer />
    </>
  );
}
