'use client';

import { useState } from 'react';
import { Home, Building2, Zap, ArrowRight } from 'lucide-react';
import {
  calculateHeroTeaserEstimate,
  formatINR,
} from '../../../lib/solarCalculator';
import SolarHouseIllustration from './SolarHouseIllustration';
import styles from './CalcHeroTeaser.module.scss';

type PropertyType = 'Residential' | 'Commercial';

const PROPERTY_CONFIG: Record<
  PropertyType,
  { min: number; max: number; step: number; defaultBill: number }
> = {
  Residential: {
    min: 500,
    max: 20000,
    step: 100,
    defaultBill: 4000,
  },
  Commercial: {
    min: 5000,
    max: 100000,
    step: 500,
    defaultBill: 40000,
  },
};

function SolarPanelIcon({
  size = 20,
  color = '#ec4d00',
}: {
  size?: number;
  color?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="4" width="18" height="13" rx="1.5" stroke={color} fill="none" strokeWidth="2" />
      <line x1="3" y1="10.5" x2="21" y2="10.5" stroke={color} strokeWidth="1.5" />
      <line x1="9" y1="4" x2="9" y2="17" stroke={color} strokeWidth="1.5" />
      <line x1="15" y1="4" x2="15" y2="17" stroke={color} strokeWidth="1.5" />
      <line x1="12" y1="17" x2="12" y2="20.5" stroke={color} strokeWidth="2" />
      <line x1="8" y1="20.5" x2="16" y2="20.5" stroke={color} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function RoofAreaIcon({
  size = 20,
  color = '#ec4d00',
}: {
  size?: number;
  color?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 10.5L12 3l9 7.5" stroke={color} strokeWidth="2" />
      <path d="M5 9v11a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V9" stroke={color} strokeWidth="2" />
      <path d="M9 21V13h6v8" stroke={color} strokeWidth="2" />
    </svg>
  );
}

export default function CalcHeroTeaser() {
  const [propertyType, setPropertyType] = useState<PropertyType>('Residential');
  const [bill, setBill] = useState<number>(4000);

  const config = PROPERTY_CONFIG[propertyType];

  const handlePropertyTypeToggle = (newType: PropertyType) => {
    if (newType === propertyType) return;
    setPropertyType(newType);
    const newConfig = PROPERTY_CONFIG[newType];
    setBill(newConfig.defaultBill);
  };

  const estimate = calculateHeroTeaserEstimate(bill, propertyType);
  const billProgress = Math.max(
    0,
    Math.min(100, ((bill - config.min) / (config.max - config.min)) * 100)
  );

  const handleScrollToCalculator = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById('calculator-tool');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={styles.teaserCard}>
      {/* 1. Header: Monthly Bill + Property Switcher */}
      <div className={styles.headerRow}>
        <div className={styles.billMeta}>
          <span className={styles.billLabel}>Monthly Electricity Bill</span>
          <div className={styles.billAmountRow}>
            <span className={styles.billValue}>{formatINR(bill)}</span>
            <span className={styles.billPerMonth}>/ month</span>
          </div>
        </div>

        <div className={styles.propertyToggle} role="group" aria-label="Property type selector">
          <button
            type="button"
            className={`${styles.toggleBtn} ${
              propertyType === 'Residential' ? styles.toggleActive : ''
            }`}
            onClick={() => handlePropertyTypeToggle('Residential')}
            aria-pressed={propertyType === 'Residential'}
          >
            <Home size={15} strokeWidth={2} />
            <span>Residential</span>
          </button>
          <button
            type="button"
            className={`${styles.toggleBtn} ${
              propertyType === 'Commercial' ? styles.toggleActive : ''
            }`}
            onClick={() => handlePropertyTypeToggle('Commercial')}
            aria-pressed={propertyType === 'Commercial'}
          >
            <Building2 size={15} strokeWidth={1.8} />
            <span>Commercial</span>
          </button>
        </div>
      </div>

      {/* 2. Interactive Range Slider */}
      <div className={styles.sliderContainer}>
        <div className={styles.sliderTrackWrapper}>
          <input
            type="range"
            min={config.min}
            max={config.max}
            step={config.step}
            value={bill}
            onChange={(e) => setBill(Number(e.target.value))}
            className={styles.rangeInput}
            aria-label="Monthly Electricity Bill"
            style={{
              background: `linear-gradient(to right, #ec4d00 0%, #ec4d00 ${billProgress}%, #e2e8f0 ${billProgress}%, #e2e8f0 100%)`,
            }}
          />
        </div>
        <div className={styles.sliderTicks}>
          <span className={styles.tickLabel}>{formatINR(config.min)}</span>
          <span className={styles.tickLabel}>{formatINR(config.max)}</span>
        </div>
      </div>

      {/* 3. Middle Section: House Illustration & 3 Metrics */}
      <div className={styles.middleGrid}>
        <div className={styles.illustrationWrap}>
          <SolarHouseIllustration
            sunIntensity={Math.min(1.5, Math.max(0.6, bill / config.defaultBill))}
          />
        </div>

        <div className={styles.metricsStack}>
          {/* Row 1: Recommended System */}
          <div className={styles.metricItem}>
            <div className={styles.iconCircle}>
              <SolarPanelIcon size={20} color="#ec4d00" />
            </div>
            <div className={styles.metricText}>
              <span className={styles.metricLabel}>Recommended System</span>
              <span className={styles.metricValue}>{estimate.capacityKW} kW</span>
            </div>
          </div>

          <div className={styles.divider} />

          {/* Row 2: Estimated Generation */}
          <div className={styles.metricItem}>
            <div className={styles.iconCircle}>
              <Zap size={20} color="#ec4d00" fill="#ec4d00" />
            </div>
            <div className={styles.metricText}>
              <span className={styles.metricLabel}>Estimated Generation</span>
              <span className={styles.metricValue}>
                {estimate.monthlyGenerationKWh} kWh/mo
              </span>
            </div>
          </div>

          <div className={styles.divider} />

          {/* Row 3: Roof Area Needed */}
          <div className={styles.metricItem}>
            <div className={styles.iconCircle}>
              <RoofAreaIcon size={20} color="#ec4d00" />
            </div>
            <div className={styles.metricText}>
              <span className={styles.metricLabel}>Roof Area Needed</span>
              <span className={styles.metricValue}>{estimate.areaSqft} sq ft</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Bottom Dark Stats Banner */}
      <div className={styles.darkBanner}>
        <div className={styles.bannerStat}>
          <span className={styles.bannerLabel}>Monthly Savings</span>
          <span className={`${styles.bannerValue} ${styles.valOrange}`}>
            {formatINR(estimate.monthlySavingsRs)}
          </span>
        </div>

        <div className={styles.bannerStat}>
          <span className={styles.bannerLabel}>Payback Period</span>
          <span className={`${styles.bannerValue} ${styles.valWhite}`}>
            {estimate.paybackYears} years
          </span>
        </div>

        <div className={styles.bannerStat}>
          <span className={styles.bannerLabel}>CO₂ Offset</span>
          <span className={`${styles.bannerValue} ${styles.valWhite}`}>
            {estimate.co2Tons} t/yr
          </span>
        </div>

        <div className={styles.highlightBadge}>
          <span className={styles.highlightBadgeLabel}>25-Year Savings</span>
          <span className={styles.highlightBadgeValue}>
            {estimate.formatted25YrSavings}
          </span>
        </div>
      </div>

      {/* 5. CTA Button */}
      <div className={styles.ctaWrap}>
        <a
          href="#calculator-tool"
          onClick={handleScrollToCalculator}
          className={styles.ctaButton}
        >
          <span>Calculate My Exact Savings</span>
          <ArrowRight size={17} strokeWidth={2.5} />
        </a>
      </div>
    </div>
  );
}
