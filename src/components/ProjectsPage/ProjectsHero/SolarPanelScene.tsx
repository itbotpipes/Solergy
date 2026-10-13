'use client';

import { useState } from 'react';
import styles from './SolarPanelScene.module.scss';

const CITY_DATA = [
  { city: 'Surat', count: 34 },
  { city: 'Ahmedabad', count: 28 },
  { city: 'Vadodara', count: 22 },
  { city: 'Rajkot', count: 14 },
  { city: 'Gandhinagar', count: 12 },
  { city: 'Ankleshwar', count: 10 },
];

const COLS = 3;
const ROWS = 2;
const CELL_W = 96;
const CELL_H = 72;
const GAP = 6;
const PANEL_PAD = 18;

export interface SolarPanelSceneProps {
  onCityClick?: (city: string) => void;
}

export default function SolarPanelScene({ onCityClick }: SolarPanelSceneProps) {
  const [hovered, setHovered] = useState<number | null>(null);

  const panelWidth = COLS * CELL_W + (COLS - 1) * GAP + PANEL_PAD * 2;
  const panelHeight = ROWS * CELL_H + (ROWS - 1) * GAP + PANEL_PAD * 2;

  return (
    <div className={styles.scene}>
      <svg
        className={styles.panelSvg}
        viewBox={`0 0 ${panelWidth} ${panelHeight + 30}`}
      >
        <rect
          className={styles.frame}
          x="4"
          y="4"
          width={panelWidth - 8}
          height={panelHeight - 8}
          rx="10"
        />
        {CITY_DATA.map((entry, index) => {
          const col = index % COLS;
          const row = Math.floor(index / COLS);
          const x = PANEL_PAD + col * (CELL_W + GAP);
          const y = PANEL_PAD + row * (CELL_H + GAP);
          const isHovered = hovered === index;

          return (
            <g
              key={entry.city}
              className={styles.cellGroup}
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => onCityClick?.(entry.city)}
            >
              <rect
                className={`${styles.cell} ${isHovered ? styles.cellHovered : ''}`}
                x={x}
                y={y}
                width={CELL_W}
                height={CELL_H}
                rx="4"
              />
              <line
                className={styles.cellDivider}
                x1={x}
                y1={y + CELL_H / 2}
                x2={x + CELL_W}
                y2={y + CELL_H / 2}
              />
              <line
                className={styles.cellDivider}
                x1={x + CELL_W / 2}
                y1={y}
                x2={x + CELL_W / 2}
                y2={y + CELL_H}
              />
            </g>
          );
        })}

        <rect
          className={styles.stand}
          x={panelWidth / 2 - 3}
          y={panelHeight - 6}
          width="6"
          height="26"
        />
        <line
          className={styles.standBase}
          x1={panelWidth / 2 - 28}
          y1={panelHeight + 20}
          x2={panelWidth / 2 + 28}
          y2={panelHeight + 20}
        />
      </svg>

      {hovered !== null && (
        <div
          className={styles.tooltip}
          style={{
            left: `${
              ((PANEL_PAD +
                (hovered % COLS) * (CELL_W + GAP) +
                CELL_W / 2) /
                panelWidth) *
              100
            }%`,
            top: `${
              ((PANEL_PAD + Math.floor(hovered / COLS) * (CELL_H + GAP)) /
                (panelHeight + 30)) *
              100
            }%`,
          }}
        >
          <span className={styles.tooltipCity}>{CITY_DATA[hovered]!.city}</span>
          <span className={styles.tooltipCount}>
            {CITY_DATA[hovered]!.count} installations
          </span>
        </div>
      )}

      <p className={styles.caption}>
        Hover a panel cell, or click to jump to those projects
      </p>
    </div>
  );
}
