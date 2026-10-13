'use client';

import { useState } from 'react';
import Button from '../../common/Button/Button';
import {
  calculateSolarEstimate,
  formatINR,
} from '../../../utils/solarCalculator';
import styles from './CalcHeroTeaser.module.scss';

const MIN_BILL = 500;
const MAX_BILL = 30000;

export default function CalcHeroTeaser() {
  const [bill, setBill] = useState(4000);

  const intensity = Math.min(1, bill / 20000);
  const litPanels = Math.min(3, Math.ceil(intensity * 3));
  const result = calculateSolarEstimate(bill);
  const billProgress = ((bill - MIN_BILL) / (MAX_BILL - MIN_BILL)) * 100;

  return (
    <div className={styles.teaser}>
      <div className={styles.top}>
        <span className={styles.label}>Your monthly bill</span>
        <span className={styles.bill}>{formatINR(bill)}</span>
      </div>

      <input
        type="range"
        min={MIN_BILL}
        max={MAX_BILL}
        step="100"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
        className={styles.slider}
        aria-label="Your monthly electricity bill"
        style={{
          background: `linear-gradient(to right, var(--slider-fill) ${billProgress}%, var(--slider-track) ${billProgress}%)`,
        }}
      />

      <div className={styles.scene}>
        <svg viewBox="0 0 400 150" xmlns="http://www.w3.org/2000/svg">
          <path className={styles.ground} d="M0,132 H400" />
          <path className={styles.house} d="M120,132 V80 L170,42 L220,80 V132 Z" />
          {[0, 1, 2].map((i) => (
            <rect
              key={i}
              className={`${styles.panel} ${i < litPanels ? styles.panelLit : ''}`}
              x={132 + i * 24}
              y={i === 1 ? 58 : 66}
              width="20"
              height="12"
              rx="1"
              transform={i > 0 ? `rotate(-25 ${166 + (i - 1) * 24} ${64 + (i - 1) * 8})` : undefined}
            />
          ))}
          <g transform="translate(170,25)">
            {[
              { x1: 0, y1: -12, x2: 0, y2: -6 },
              { x1: 9, y1: -9, x2: 5, y2: -5 },
              { x1: -9, y1: -9, x2: -5, y2: -5 },
              { x1: 13, y1: 0, x2: 7, y2: 0 },
              { x1: -13, y1: 0, x2: -7, y2: 0 },
            ].map((ray, i) => (
              <line
                key={i}
                className={styles.ray}
                x1={ray.x1}
                y1={ray.y1}
                x2={ray.x2}
                y2={ray.y2}
                style={{
                  opacity: 0.3 + intensity * 0.7,
                  strokeWidth: 1.5 + intensity * 1.5,
                }}
              />
            ))}
            <circle className={styles.sun} cx="0" cy="0" r="9" />
          </g>
        </svg>
      </div>

      <div className={styles.result}>
        <span className={styles.resultLabel}>Estimated CO₂ offset</span>
        <span className={styles.resultValue}>
          {result.co2Tons.toFixed(1)} t/yr
        </span>
      </div>

      <div className={styles.ctaWrap}>
        <Button variant="primary" showArrow href="#calculator-tool">
          Calculate My Exact Savings
        </Button>
      </div>
    </div>
  );
}
