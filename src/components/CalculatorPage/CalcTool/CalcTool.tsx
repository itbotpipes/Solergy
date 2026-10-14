'use client';

import { useRef, useState } from 'react';
import useInView from '../../../hooks/useInView';
import {
  calculateSolarEstimate,
  formatINR,
} from '../../../utils/solarCalculator';
import styles from './CalcTool.module.scss';
import reveal from '../../../styles/reveal.module.scss';

const PROPERTY_TYPES = ['Residential', 'Commercial / Industrial'] as const;
type PropertyType = (typeof PROPERTY_TYPES)[number];

const PANEL_TILE_COUNT = 24;
const BILL_RANGES: Record<PropertyType, { min: number; max: number; step: number }> = {
  Residential: { min: 500, max: 1000000, step: 1000 },
  'Commercial / Industrial': { min: 50000, max: 100000000, step: 100000 },
};

const CALC_PROPERTY_TYPE: Record<PropertyType, string> = {
  Residential: 'Residential',
  'Commercial / Industrial': 'Commercial',
};

export default function CalcTool() {
  const sectionRef = useRef<HTMLElement>(null);
  const visible = useInView(sectionRef, 0.1);

  const [propertyType, setPropertyType] = useState<PropertyType>('Residential');
  const [monthlyBill, setMonthlyBill] = useState<number>(6000);
  const [pincode, setPincode] = useState<string>('395007');

  const billRange = BILL_RANGES[propertyType];

  const handlePropertyTypeChange = (type: PropertyType) => {
    setPropertyType(type);
    const range = BILL_RANGES[type];
    setMonthlyBill((prev) => Math.min(Math.max(prev, range.min), range.max));
  };

  const result = calculateSolarEstimate(
    Number(monthlyBill),
    CALC_PROPERTY_TYPE[propertyType]
  );
  const litTiles = Math.min(
    PANEL_TILE_COUNT,
    Math.round((monthlyBill / billRange.max) * PANEL_TILE_COUNT)
  );
  const billProgress =
    ((monthlyBill - billRange.min) / (billRange.max - billRange.min)) * 100;

  return (
    <section
      id="calculator-tool"
      className={`${styles.calculator} ${reveal.sectionReveal} ${visible ? reveal.sectionVisible : ''
        }`}
      ref={sectionRef}
    >
      <div className={styles.inner}>
        <h2 className={styles.heading}>
          Your Personalised
          <span className={styles.highlight}> Solar Savings</span>
        </h2>

        <div className={styles.card}>
          <div className={styles.inputs}>
            <div className={styles.field}>
              <span className={styles.groupLabel}>Property Type</span>
              <div
                className={styles.segmented}
                role="group"
                aria-label="Property Type"
              >
                {PROPERTY_TYPES.map((type) => (
                  <button
                    key={type}
                    type="button"
                    aria-pressed={propertyType === type}
                    className={`${styles.segment} ${propertyType === type ? styles.segmentActive : ''
                      }`}
                    onClick={() => handlePropertyTypeChange(type)}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.field}>
              <div className={styles.billRow}>
                <label htmlFor="monthlyBill" className={styles.groupLabel}>
                  Monthly Electricity Bill
                </label>
                <span className={styles.billValue}>
                  {formatINR(monthlyBill)}
                </span>
              </div>
              <input
                id="monthlyBill"
                type="range"
                min={billRange.min}
                max={billRange.max}
                step={billRange.step}
                value={monthlyBill}
                onChange={(e) => setMonthlyBill(Number(e.target.value))}
                className={styles.slider}
                style={{
                  background: `linear-gradient(to right, var(--slider-fill) ${billProgress}%, var(--slider-track) ${billProgress}%)`,
                }}
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="pincode" className={styles.groupLabel}>
                Pincode
              </label>
              <input
                id="pincode"
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={6}
                placeholder="Enter 6-digit Pincode (e.g. 395007)"
                value={pincode}
                onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                className={styles.input}
              />
            </div>

            <p className={styles.smallPrint}>
              *Solar plant installation requires a shadow-free area of 100 sq.
              ft. per kW capacity.
            </p>
          </div>

          <div className={styles.visual}>
            <div className={styles.panelGrid}>
              {Array.from({ length: PANEL_TILE_COUNT }).map((_, i) => (
                <div
                  key={i}
                  className={`${styles.panelTile} ${i < litTiles ? styles.panelTileLit : ''
                    }`}
                />
              ))}
            </div>
            <p className={styles.panelCaption}>
              Recommended system size: <strong>{result.capacityKW} kW</strong>
            </p>
          </div>
        </div>

        <div className={styles.resultsRow}>
          <div className={styles.resultsGrid}>
            <div className={styles.resultTile}>
              <span className={styles.resultLabel}>Monthly Savings</span>
              <span className={styles.resultValue}>
                {formatINR(result.monthlySavingsRs)}
              </span>
              <span className={styles.resultSub}>vs. your current bill</span>
            </div>
            <div className={styles.resultTile}>
              <span className={styles.resultLabel}>System Size</span>
              <span className={styles.resultValue}>{result.capacityKW} kW</span>
              <span className={styles.resultSub}>recommended for you</span>
            </div>
            <div className={styles.resultTile}>
              <span className={styles.resultLabel}>Payback Period</span>
              <span className={styles.resultValue}>
                {result.paybackYears.toFixed(1)} yrs
              </span>
              <span className={styles.resultSub}>to recover investment</span>
            </div>
            <div className={styles.resultTile}>
              <span className={styles.resultLabel}>25-Year Savings</span>
              <span className={styles.resultValue}>
                {formatINR(result.lifetimeSavingsRs)}
              </span>
              <span className={styles.resultSub}>total, after system cost</span>
            </div>
          </div>

          <p className={styles.co2Strip}>
            That&apos;s also about{' '}
            <strong>{result.co2Tons.toFixed(1)} tonnes</strong> of CO₂ avoided
            every year — roughly like planting{' '}
            <strong>{result.trees} trees</strong> annually.
          </p>

          <p className={styles.disclaimer}>
            Figures are approximate estimates based on typical usage patterns,
            average tariff rates, and standard system output.
          </p>
        </div>
      </div>
    </section>
  );
}
