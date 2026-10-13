'use client';

import React, { useState } from 'react';
import Button from '../../common/Button/Button';
import styles from './ProjectDetailCTA.module.scss';

const CheckIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3 8.2l3 3L13 4.5"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const TRUST_ITEMS = [
  'Free Consultation',
  'No-Obligation Quote',
  'Warranty-Backed Installation',
];

export default function ProjectDetailCTA() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    _hp: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.phone.trim()) {
      setStatus('error');
      setMessage('Please enter a valid phone number');
      return;
    }

    setStatus('submitting');
    setMessage('');

    try {
      const res = await fetch('/api/forms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          inquiryType: 'quick_callback',
          sourcePage: typeof window !== 'undefined' ? window.location.pathname : '/project',
          _hp: form._hp,
          formData: {
            name: form.name,
            phone: form.phone,
          },
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit inquiry');
      }

      setStatus('success');
      setMessage('Thank you! We will call you within 24 hours.');
      setForm({ name: '', phone: '', _hp: '' });
    } catch (err: any) {
      setStatus('error');
      setMessage(err.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <section className={styles.cta}>
      <div className={styles.inner}>
        <div className={styles.info}>
          <p className={styles.eyebrow}>READY WHEN YOU ARE</p>
          <h2 className={styles.heading}>
            Ready to{' '}
            <span className={styles.highlight}>
              Turn Sunlight Into Savings?
            </span>
          </h2>
          <p className={styles.description}>
            Whether it&apos;s your home, your office, or your factory floor — our
            team is ready to design a solar system that actually fits your needs
            and your budget. No pushy sales talk, just an honest energy audit
            and a straight answer.
          </p>

          <div className={styles.ctas}>
            <Button variant="primary" to="/contact">
              GET YOUR FREE SOLAR QUOTE
            </Button>
            <Button
              variant="secondary"
              href="https://wa.me/917888679770"
              target="_blank"
              rel="noopener noreferrer"
            >
              TALK ON WHATSAPP
            </Button>
          </div>

          <ul className={styles.trustLine}>
            {TRUST_ITEMS.map((item) => (
              <li key={item}>
                <CheckIcon />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <h3 className={styles.formHeading}>GET A CALLBACK WITHIN 24 HOURS</h3>

          <input
            type="text"
            name="_hp"
            value={form._hp}
            onChange={handleChange}
            style={{ display: 'none' }}
            tabIndex={-1}
            autoComplete="off"
          />

          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            className={styles.input}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className={styles.input}
            required
          />

          <Button
            type="submit"
            variant="primary"
            disabled={status === 'submitting'}
          >
            {status === 'submitting' ? 'SUBMITTING...' : 'GET MY FREE QUOTE'}
          </Button>

          {status === 'success' && (
            <p style={{ color: '#22c55e', marginTop: '12px', fontSize: '14px', fontWeight: 600 }}>
              {message}
            </p>
          )}
          {status === 'error' && (
            <p style={{ color: '#ef4444', marginTop: '12px', fontSize: '14px' }}>
              {message}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
