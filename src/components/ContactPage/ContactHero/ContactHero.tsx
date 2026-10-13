import ContactBeaconScene from './ContactBeaconScene';
import styles from './ContactHero.module.scss';

const PhoneIcon = () => (
  <svg
    width="21"
    height="21"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.3 3.5H5.6a1.6 1.6 0 00-1.6 1.7c.4 8 6.5 14.1 14.5 14.5a1.6 1.6 0 001.7-1.6v-2.7a1.1 1.1 0 00-.9-1.1l-3.9-.9a1.1 1.1 0 00-1.1.3l-1.4 1.4a12.1 12.1 0 01-6-6l1.4-1.4a1.1 1.1 0 00.3-1.1l-.9-3.9a1.1 1.1 0 00-1.1-.9z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const WhatsAppIcon = () => (
  <svg
    width="21"
    height="21"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 3.5A8.5 8.5 0 004.4 16l-1 4 4.2-1.1A8.5 8.5 0 1012 3.5z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <path
      d="M8.7 8.4c.2-.5.4-.5.7-.5h.4c.2 0 .3.1.4.3l.6 1.5c.1.2.1.4-.1.6l-.4.5c-.2.2-.2.4 0 .6.5.9 1.4 1.8 2.3 2.3.2.1.4.1.6 0l.5-.4c.2-.2.4-.2.6-.1l1.5.6c.2.1.3.2.3.4v.4c0 .3-.1.5-.5.7-.5.3-1.1.4-1.7.3-2-.5-4-2.5-4.5-4.5-.1-.6 0-1.2.3-1.7z"
      fill="currentColor"
    />
  </svg>
);

const MailIcon = () => (
  <svg
    width="21"
    height="21"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect
      x="3"
      y="5.5"
      width="18"
      height="13"
      rx="2.5"
      stroke="currentColor"
      strokeWidth="1.6"
    />
    <path
      d="M4 7l8 6.5L20 7"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const PinIcon = () => (
  <svg
    width="21"
    height="21"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 21s7-6.8 7-12.3a7 7 0 00-14 0C5 14.2 12 21 12 21z"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="8.7" r="2.4" stroke="currentColor" strokeWidth="1.6" />
  </svg>
);

const QUICK_LINKS = [
  {
    icon: <PhoneIcon />,
    title: 'Call Us',
    sub: '+91-78886-79770',
    href: 'tel:+917888679770',
  },
  {
    icon: <WhatsAppIcon />,
    title: 'WhatsApp',
    sub: 'Chat with our team',
    href: 'https://wa.me/917888679770',
  },
  {
    icon: <MailIcon />,
    title: 'Email Us',
    sub: 'info@solergyindia.com',
    href: 'mailto:info@solergyindia.com',
  },
  {
    icon: <PinIcon />,
    title: 'Visit Us',
    sub: 'Ludhiana, Punjab',
    href: '#contact-form',
  },
];

export default function ContactHero() {
  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <div className={styles.content}>
          <p className={styles.eyebrow}>Contact Us</p>
          <h1 className={styles.heading}>
            Let&apos;s Get Your{' '}
            <span className={styles.highlight}>Solar Journey Started</span>{' '}
          </h1>
          <p className={styles.description}>
            Whichever way you&apos;d rather reach us — a call, a message, or a
            visit — our team is ready to answer your questions and plan your
            system.
          </p>

          <div className={styles.quickLinks}>
            {QUICK_LINKS.map((link) => (
              <a key={link.title} href={link.href} className={styles.quickLink}>
                <span className={styles.quickIcon}>{link.icon}</span>
                <span className={styles.quickTitle}>{link.title}</span>
                <span className={styles.quickSub}>{link.sub}</span>
              </a>
            ))}
          </div>
        </div>

        <div className={styles.sceneWrap}>
          <ContactBeaconScene />
        </div>
      </div>
    </section>
  );
}
