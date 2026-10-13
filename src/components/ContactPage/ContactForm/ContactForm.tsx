'use client';

import { useRef, useState } from 'react';
import Button from '../../common/Button/Button';
import useInView from '../../../hooks/useInView';
import styles from './ContactForm.module.scss';
import reveal from '../../../styles/reveal.module.scss';

const INQUIRY_TYPES = [
  { label: 'Home', value: 'home' },
  { label: 'Business', value: 'business' },
  { label: 'Industry', value: 'industry' },
];

const INFO_BLOCKS = [
  {
    label: 'Head Office',
    value: 'Solergy India',
    sub: 'C/o Bharat Store, Chaura Bazaar, Ludhiana',
  },
  {
    label: 'Business Hours',
    sub: 'Monday to Saturday, 9 AM – 7 PM',
  },
  {
    label: 'Reach Us Directly',
    sub: '+91-78886-79770',
    sub2: 'info@solergyindia.com',
  },
];

export default function ContactForm() {
  const sectionRef = useRef<HTMLElement>(null);
  const sectionVisible = useInView(sectionRef, 0.1);

  const [inquiryType, setInquiryType] = useState('home');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    message: '',
    _hp: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      setStatus('error');
      setMessage('Please provide your name and phone number.');
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
          email: form.email,
          city: form.city,
          message: form.message,
          inquiryType,
          sourcePage: '/contact',
          _hp: form._hp,
          formData: {
            inquiryType,
            name: form.name,
            phone: form.phone,
            email: form.email,
            city: form.city,
            message: form.message,
          },
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit request');
      }

      setStatus('success');
      setMessage('Thanks! Our team will call you within 24 hours.');
      setForm({
        name: '',
        phone: '',
        email: '',
        city: '',
        message: '',
        _hp: '',
      });
    } catch (err: any) {
      setStatus('error');
      setMessage(err.message || 'Something went wrong. Please try again.');
    }
  };

  return (
    <section
      id="contact-form"
      ref={sectionRef}
      className={`${styles.section} ${reveal.sectionReveal} ${
        sectionVisible ? reveal.sectionVisible : ''
      }`}
    >
      <div className={styles.sectionHead}>
        <h2 className={styles.heading}>
          Tell Us About <span className={styles.highlight}> Your Space</span>
        </h2>
        <p className={styles.subheading}>
          Fill this in and our team will get back to you within 24 hours with
          next steps.
        </p>
      </div>

      <div className={styles.grid}>
        <div className={styles.formPanel}>
          <h3 className={styles.formTitle}>Request a Callback</h3>
          <p className={styles.formLead}>
            No pushy sales talk — just an honest conversation about what&apos;s
            possible for your roof.
          </p>

          <form onSubmit={handleSubmit}>
            {/* Spam prevention honeypot */}
            <input
              type="text"
              name="_hp"
              value={form._hp}
              onChange={handleChange}
              style={{ display: 'none' }}
              tabIndex={-1}
              autoComplete="off"
            />

            <span className={styles.fieldLabel}>I&apos;m inquiring for</span>
            <div className={styles.toggleGroup}>
              {INQUIRY_TYPES.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  className={`${styles.toggleBtn} ${
                    inquiryType === type.value ? styles.toggleBtnActive : ''
                  }`}
                  onClick={() => setInquiryType(type.value)}
                >
                  {type.label}
                </button>
              ))}
            </div>

            <div className={styles.formRow}>
              <div className={styles.fieldBlock}>
                <span className={styles.fieldLabel}>Full Name</span>
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  value={form.name}
                  onChange={handleChange}
                  className={styles.input}
                  required
                />
              </div>
              <div className={styles.fieldBlock}>
                <span className={styles.fieldLabel}>Phone Number</span>
                <input
                  type="tel"
                  name="phone"
                  placeholder="10-digit number"
                  pattern="[0-9]{10}"
                  value={form.phone}
                  onChange={handleChange}
                  className={styles.input}
                  required
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.fieldBlock}>
                <span className={styles.fieldLabel}>Email Address</span>
                <input
                  type="email"
                  name="email"
                  placeholder="you@email.com"
                  value={form.email}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>
              <div className={styles.fieldBlock}>
                <span className={styles.fieldLabel}>City</span>
                <input
                  type="text"
                  name="city"
                  placeholder="Your city"
                  value={form.city}
                  onChange={handleChange}
                  className={styles.input}
                />
              </div>
            </div>

            <div className={styles.fieldBlock}>
              <span className={styles.fieldLabel}>Your Message</span>
              <textarea
                name="message"
                placeholder="Tell us a bit about your electricity usage, roof space, or any questions you have..."
                value={form.message}
                onChange={handleChange}
                className={styles.textarea}
              />
            </div>

            <div className={styles.submitRow}>
              <Button type="submit" variant="primary" disabled={status === 'submitting'}>
                {status === 'submitting' ? 'Sending Request...' : 'Send My Request'}
              </Button>
            </div>

            {status === 'success' && (
              <p className={styles.formMsg} style={{ color: '#22c55e', fontWeight: 600 }}>
                {message}
              </p>
            )}
            {status === 'error' && (
              <p className={styles.formMsg} style={{ color: '#ef4444' }}>
                {message}
              </p>
            )}
          </form>
        </div>

        <div className={styles.infoPanel}>
          <div>
            {INFO_BLOCKS.map((block) => (
              <div key={block.label} className={styles.infoBlock}>
                <div className={styles.infoLabel}>{block.label}</div>
                {block.value && (
                  <div className={styles.infoValue}>{block.value}</div>
                )}
                {block.sub && (
                  <div className={styles.infoValueSmall}>{block.sub}</div>
                )}
                {block.sub2 && (
                  <div className={styles.infoValueSmall}>{block.sub2}</div>
                )}
              </div>
            ))}
          </div>

          <div className={styles.mapBox}>
            <iframe
              title="Solergy India location"
              src="https://www.google.com/maps?q=Chaura+Bazaar,Ludhiana,Punjab&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className={styles.mapFrame}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
