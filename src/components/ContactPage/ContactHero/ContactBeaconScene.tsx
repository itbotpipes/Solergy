'use client';

import React from 'react';
import styles from './ContactBeaconScene.module.scss';

export default function ContactBeaconScene() {
  return (
    <div className={styles.sceneContainer}>
      <svg
        className={styles.beaconSvg}
        viewBox="0 0 360 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
        aria-label="Solar powered communication beacon and support desk illustration"
      >
        <defs>
          {/* Ground pedestal shadow */}
          <radialGradient
            id="beaconGroundShadow"
            cx="50%"
            cy="50%"
            r="50%"
            fx="50%"
            fy="50%"
          >
            <stop offset="0%" stopColor="#cbd5e1" stopOpacity="0.75" />
            <stop offset="60%" stopColor="#e2e8f0" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>

          {/* Photovoltaic cells gradient */}
          <linearGradient id="solarCellsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fb923c" />
            <stop offset="50%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#ea580c" />
          </linearGradient>

          {/* Sun gradient */}
          <linearGradient id="beaconSunGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>

          {/* Specular Glint */}
          <linearGradient id="panelGlintGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.05" />
          </linearGradient>
        </defs>

        {/* 1. Ground Pedestal & Foliage */}
        <ellipse cx="180" cy="350" rx="105" ry="22" fill="url(#beaconGroundShadow)" />

        {/* Left Ground Foliage */}
        <circle cx="118" cy="344" r="15" fill="#10b981" />
        <circle cx="108" cy="336" r="11" fill="#34d399" />

        {/* Right Ground Foliage */}
        <circle cx="242" cy="344" r="14" fill="#10b981" />
        <circle cx="250" cy="337" r="10" fill="#34d399" />

        {/* Mast Base Plate */}
        <ellipse cx="180" cy="346" rx="28" ry="7" fill="#64748b" />
        <ellipse cx="180" cy="343" rx="24" ry="5" fill="#94a3b8" />
        <ellipse cx="180" cy="341" rx="16" ry="3.5" fill="#cbd5e1" />

        {/* 2. The Sun (Top-Left) */}
        <g id="sun" transform="translate(80, 72)" className={styles.sunPulse}>
          <circle cx="0" cy="0" r="22" fill="#f59e0b" fillOpacity="0.12" />
          <circle cx="0" cy="0" r="14" fill="url(#beaconSunGrad)" />
          {/* 8 Rays */}
          <line x1="0" y1="-23" x2="0" y2="-17" stroke="#f59e0b" strokeWidth="2.8" strokeLinecap="round" />
          <line x1="0" y1="23" x2="0" y2="17" stroke="#f59e0b" strokeWidth="2.8" strokeLinecap="round" />
          <line x1="-23" y1="0" x2="-17" y2="0" stroke="#f59e0b" strokeWidth="2.8" strokeLinecap="round" />
          <line x1="23" y1="0" x2="17" y2="0" stroke="#f59e0b" strokeWidth="2.8" strokeLinecap="round" />
          <line x1="-16" y1="-16" x2="-12" y2="-12" stroke="#f59e0b" strokeWidth="2.8" strokeLinecap="round" />
          <line x1="16" y1="16" x2="12" y2="12" stroke="#f59e0b" strokeWidth="2.8" strokeLinecap="round" />
          <line x1="-16" y1="16" x2="-12" y2="12" stroke="#f59e0b" strokeWidth="2.8" strokeLinecap="round" />
          <line x1="16" y1="-16" x2="12" y2="-12" stroke="#f59e0b" strokeWidth="2.8" strokeLinecap="round" />
        </g>

        {/* 3. Central Telemetry Pole / Mast */}
        {/* Main Vertical Mast Shaft */}
        <rect x="177" y="112" width="6" height="230" rx="3" fill="#1e293b" />
        {/* Mast Collars / Brackets */}
        <rect x="174" y="185" width="12" height="7" rx="2" fill="#64748b" />
        <rect x="174" y="245" width="12" height="7" rx="2" fill="#64748b" />
        <rect x="174" y="295" width="12" height="7" rx="2" fill="#64748b" />

        {/* 4. Solar Panel & Cantilever Arm */}
        {/* Mounting Brackets Connecting to Mast */}
        <line x1="180" y1="240" x2="140" y2="234" stroke="#334155" strokeWidth="4.5" strokeLinecap="round" />
        <line x1="180" y1="262" x2="140" y2="252" stroke="#475569" strokeWidth="3" strokeLinecap="round" />

        {/* Panel Array Drop Shadow */}
        <polygon
          points="70,205 152,189 169,250 87,266"
          fill="#94a3b8"
        />

        {/* Outer Silver / Light Frame */}
        <polygon
          points="68,202 150,186 167,247 85,263"
          fill="#f8fafc"
          stroke="#94a3b8"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* Photovoltaic Cells Surface */}
        <polygon
          points="71.5,204 146.5,189 163.5,244 88.5,259"
          fill="url(#solarCellsGrad)"
        />

        {/* Specular Diagonal Reflection Streak */}
        <polygon
          points="71.5,204 115,195 98,230 71.5,204"
          fill="url(#panelGlintGrad)"
        />

        {/* Grid Separation Lines (3 columns x 2 rows = 6 cells) */}
        <line x1="96.5" y1="199" x2="113.5" y2="254" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" strokeOpacity="0.9" />
        <line x1="121.5" y1="194" x2="138.5" y2="249" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" strokeOpacity="0.9" />
        <line x1="80" y1="231.5" x2="155" y2="216.5" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" strokeOpacity="0.9" />

        {/* Clean Power Conduit to Mast */}
        <path
          d="M138,252 C152,264 165,274 177,282"
          stroke="#ec4d00"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeDasharray="4 3"
          fill="none"
        />

        {/* 5. Telemetry Beacon Head & Outward Broadcasting Signal Waves */}
        <g transform="translate(180, 108)">
          {/* Compact Signal Transmission Arcs */}
          <g className={`${styles.signalRing} ${styles.ring1}`}>
            <path d="M-12,-4 A14,14 0 0,1 12,-4" />
          </g>
          <g className={`${styles.signalRing} ${styles.ring2}`}>
            <path d="M-20,-10 A24,24 0 0,1 20,-10" />
          </g>
          <g className={`${styles.signalRing} ${styles.ring3}`}>
            <path d="M-28,-16 A34,34 0 0,1 28,-16" />
          </g>

          {/* Beacon Collar & Glowing Bulb */}
          <rect x="-5" y="2" width="10" height="5" rx="1.5" fill="#475569" />
          <circle cx="0" cy="0" r="12" fill="#ec4d00" fillOpacity="0.22" className={styles.beaconGlow} />
          <circle cx="0" cy="0" r="6.5" fill="#ec4d00" className={styles.beaconCore} />
          <circle cx="0" cy="0" r="2.8" fill="#ffffff" />
        </g>

        {/* 6. Active Chat / Support Speech Bubble (Top Right) */}
        <g id="chat-bubble" className={styles.chatBubbleGroup} transform="translate(262, 114)">
          {/* Drop shadow */}
          <rect x="-42" y="-22" width="90" height="46" rx="14" fill="#cbd5e1" fillOpacity="0.4" />
          {/* Main Bubble */}
          <path
            d="M -44 -25 H 44 C 51.5 -25 58 -18.5 58 -11 V 11 C 58 18.5 51.5 25 44 25 H -14 L -28 36 V 25 H -44 C -51.5 25 -58 18.5 -58 11 V -11 C -58 -18.5 -51.5 -25 -44 -25 Z"
            fill="#ffffff"
            stroke="#1e293b"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          {/* Animated Typing Dots */}
          <circle className={`${styles.chatDot} ${styles.dot1}`} cx="-18" cy="1" r="4.2" fill="#ec4d00" />
          <circle className={`${styles.chatDot} ${styles.dot2}`} cx="0" cy="1" r="4.2" fill="#ec4d00" />
          <circle className={`${styles.chatDot} ${styles.dot3}`} cx="18" cy="1" r="4.2" fill="#ec4d00" />
        </g>
      </svg>
    </div>
  );
}
