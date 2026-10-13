'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import logo from '../../assets/solergy-black.png';
import Button from '../common/Button/Button';
import styles from './Header.module.scss';

export interface NavLinkItem {
  label: string;
  to?: string;
  href?: string;
}

const NAV_LINKS: NavLinkItem[] = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Calculator', to: '/calculator' },
  { label: 'Projects', to: '/projects' },
  { label: 'Contact', to: '/contact' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const scrollThreshold = () => window.innerHeight * 0.1;

    const updateScrolled = () => {
      setScrolled(window.scrollY > scrollThreshold());
    };

    updateScrolled();
    window.addEventListener('scroll', updateScrolled, { passive: true });
    window.addEventListener('resize', updateScrolled);

    return () => {
      window.removeEventListener('scroll', updateScrolled);
      window.removeEventListener('resize', updateScrolled);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href?: string) => {
    if (href === '#') {
      e.preventDefault();
    }
    setMenuOpen(false);
  };

  const isActive = (link: NavLinkItem) => {
    if (!link.to) return false;
    if (link.to === '/') return pathname === '/';
    return pathname.startsWith(link.to);
  };

  const renderLink = (link: NavLinkItem, className: string) => {
    if (link.to) {
      return (
        <Link
          key={link.label}
          href={link.to}
          onClick={() => setMenuOpen(false)}
          className={`${className} ${isActive(link) ? styles.active : ''}`}
        >
          {link.label}
        </Link>
      );
    }

    return (
      <a
        key={link.label}
        href={link.href}
        onClick={(e) => handleNavClick(e, link.href)}
        className={className}
      >
        {link.label}
      </a>
    );
  };

  return (
    <header className={`${styles.header} ${scrolled ? styles.headerScrolled : ''}`}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo} onClick={() => setMenuOpen(false)}>
          <Image src={logo} alt="Solergy" priority style={{ width: 'auto', height: '34px' }} />
        </Link>

        <nav className={styles.nav}>
          {NAV_LINKS.map((link) => renderLink(link, styles.navLink))}
        </nav>

        <div className={styles.desktopActions}>
          <Button variant="primary" to="/contact">
            GET A QUOTE
          </Button>
        </div>

        <button
          type="button"
          className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ''}`}
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`}>
        <nav className={styles.mobileNav}>
          {NAV_LINKS.map((link) => renderLink(link, styles.mobileNavLink))}
        </nav>
        <Button variant="primary" to="/contact" onClick={() => setMenuOpen(false)}>
          GET A QUOTE
        </Button>
      </div>
    </header>
  );
}
