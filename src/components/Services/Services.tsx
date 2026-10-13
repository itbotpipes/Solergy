'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import service1 from '../../assets/service1.jpg';
import ServiceRow from './ServiceRow';
import useInView from '../../hooks/useInView';
import styles from './Services.module.scss';
import reveal from '../../styles/reveal.module.scss';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const SERVICES = [
  {
    image: service1,
    reverse: false,
    title: 'On-Grid Solar',
    description:
      'Connected straight to the electricity grid, this is the most popular and most affordable way to go solar. You use what you generate, send the extra back through net metering, and pull from the grid only when you need to.',
    points: [
      'Lower electricity bills from day one',
      'No batteries, no extra maintenance',
      'Eligible for net metering & government subsidy benefits',
    ],
    note: 'Best suited for homes, offices, schools, and factories with a steady grid supply.',
    buttonText: 'On-Grid Solar',
  },
  {
    image: service1,
    reverse: true,
    title: 'Hybrid Solar',
    description:
      "The best of both worlds. Stays connected to the grid while storing backup power in batteries — so when the power goes out, your home or business simply doesn't notice.",
    points: [
      'Grid-connected and battery backup, together',
      'Zero downtime during power cuts',
      'Ideal for businesses that can\'t afford to stop',
    ],
    note: 'Best suited for hospitals, hotels, and manufacturing units.',
    buttonText: 'Explore Hybrid Solar',
  },
  {
    image: service1,
    reverse: false,
    title: 'BESS (Battery Energy Storage System)',
    description:
      'A dedicated battery storage system that stores solar — or grid — power for use whenever you need it. Think of it as insurance against outages and rising tariffs, independent of which solar system you run.',
    points: [
      'Reliable backup during outages',
      'Store excess solar power instead of losing it',
      'Reduces dependence on peak-hour grid tariffs',
    ],
    buttonText: 'Explore BESS',
  },
];

export default function Services() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const stageRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const visible = useInView(sectionRef, 0.1);

  useEffect(() => {
    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!cards.length || !pinRef.current) return undefined;

    const syncHeaderOffset = () => {
      const header = document.querySelector('header');
      const headerHeight = header ? header.offsetHeight : 0;
      if (pinRef.current) {
        pinRef.current.style.setProperty('--header-offset', `${headerHeight}px`);
      }
    };
    syncHeaderOffset();

    const ctx = gsap.context(() => {
      const vh = window.innerHeight;

      gsap.set(cards[0], { scale: 1, opacity: 1, visibility: 'visible', y: 0 });
      if (cards[1]) {
        gsap.set(cards[1], {
          scale: 0.8,
          opacity: 1,
          visibility: 'visible',
          y: 0,
        });
      }
      cards.slice(2).forEach((card) => {
        gsap.set(card, { scale: 0.8, opacity: 0, visibility: 'hidden', y: 0 });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinRef.current,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${cards.length * vh}`,
          invalidateOnRefresh: true,
        },
      });

      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;
        const next = cards[i + 1];
        if (!next) return;

        tl.addLabel(`segment${i}`);
        tl.to({}, { duration: 0.33 });

        tl.to(
          card,
          { y: -vh, ease: 'power2.inOut', duration: 1 },
          `segment${i}+=0.33`
        );
        tl.to(
          next,
          {
            scale: 1,
            opacity: 1,
            ease: 'power2.inOut',
            duration: 1,
            onStart: () => gsap.set(next, { visibility: 'visible' }),
          },
          `segment${i}+=0.33`
        );

        tl.to({}, { duration: 0.34 });
      });
    }, pinRef);

    const refresh = () => {
      syncHeaderOffset();
      ScrollTrigger.refresh();
    };

    if (document.readyState === 'complete') {
      refresh();
    } else {
      window.addEventListener('load', refresh);
    }
    window.addEventListener('resize', syncHeaderOffset);

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(refresh);
    }

    let resizeTimeout: NodeJS.Timeout;
    const scheduleRefresh = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(refresh, 150);
    };
    const bodyResizeObserver = new ResizeObserver(scheduleRefresh);
    bodyResizeObserver.observe(document.body);

    return () => {
      ctx.revert();
      window.removeEventListener('load', refresh);
      window.removeEventListener('resize', syncHeaderOffset);
      bodyResizeObserver.disconnect();
      clearTimeout(resizeTimeout);
    };
  }, []);

  return (
    <section className={styles.services} id="services" ref={sectionRef}>
      <div className={styles.pinWrap} ref={pinRef}>
        <div
          className={`${styles.inner} ${reveal.sectionReveal} ${
            visible ? reveal.sectionVisible : ''
          }`}
        >
          <h2 className={styles.heading}>
            Power Plants
            <span className={styles.highlight}> Built Around You</span>
          </h2>
        </div>

        <div className={styles.stage} ref={stageRef}>
          {SERVICES.map((service, index) => (
            <div className={styles.cardSection} key={index}>
              <div
                className={styles.card}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                style={{ zIndex: SERVICES.length - index }}
              >
                <ServiceRow
                  image={service.image}
                  reverse={service.reverse}
                  title={service.title}
                  description={service.description}
                  points={service.points}
                  buttonText={service.buttonText}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
