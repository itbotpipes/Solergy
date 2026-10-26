import React from 'react';

interface SolarHouseIllustrationProps {
  className?: string;
  sunIntensity?: number;
}

export default function SolarHouseIllustration({
  className,
  sunIntensity = 1,
}: SolarHouseIllustrationProps) {
  return (
    <svg
      viewBox="0 0 320 250"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Solar rooftop residential house illustration"
      style={{
        width: '100%',
        height: 'auto',
        maxHeight: '195px',
        display: 'block',
      }}
    >
      <defs>
        {/* Soft shadow under the house */}
        <radialGradient
          id="houseBaseShadow"
          cx="50%"
          cy="50%"
          r="50%"
          fx="50%"
          fy="50%"
        >
          <stop offset="0%" stopColor="#e2e8f0" stopOpacity="0.9" />
          <stop offset="60%" stopColor="#edf2f7" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>

        {/* Photovoltaic cells gradient */}
        <linearGradient id="pvSurface" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f97316" />
          <stop offset="100%" stopColor="#ea580c" />
        </linearGradient>
      </defs>

      {/* 1. Ground Shadow Ellipse */}
      <ellipse cx="160" cy="216" rx="98" ry="22" fill="url(#houseBaseShadow)" />

      {/* 2. Foliage (Bushes / Trees) */}
      {/* Left Foliage */}
      <circle cx="72" cy="178" r="26" fill="#10b981" />
      <circle cx="60" cy="164" r="19" fill="#34d399" />

      {/* Right Foliage */}
      <circle cx="248" cy="180" r="26" fill="#10b981" />
      <circle cx="258" cy="166" r="19" fill="#34d399" />

      {/* Foreground Small Bush */}
      <circle cx="206" cy="214" r="11" fill="#059669" />
      <circle cx="206" cy="212" r="9" fill="#10b981" />

      {/* 3. The Sun (Top Right) */}
      <g id="sun" transform="translate(202, 54)">
        {/* Core */}
        <circle cx="0" cy="0" r="13" fill="#f59e0b" />
        {/* 8 Symmetrical Rays */}
        <line x1="0" y1="-21" x2="0" y2="-16" stroke="#f59e0b" strokeWidth="2.8" strokeLinecap="round" />
        <line x1="0" y1="21" x2="0" y2="16" stroke="#f59e0b" strokeWidth="2.8" strokeLinecap="round" />
        <line x1="-21" y1="0" x2="-16" y2="0" stroke="#f59e0b" strokeWidth="2.8" strokeLinecap="round" />
        <line x1="21" y1="0" x2="16" y2="0" stroke="#f59e0b" strokeWidth="2.8" strokeLinecap="round" />
        <line x1="-15" y1="-15" x2="-11.5" y2="-11.5" stroke="#f59e0b" strokeWidth="2.8" strokeLinecap="round" />
        <line x1="15" y1="15" x2="11.5" y2="11.5" stroke="#f59e0b" strokeWidth="2.8" strokeLinecap="round" />
        <line x1="-15" y1="15" x2="-11.5" y2="11.5" stroke="#f59e0b" strokeWidth="2.8" strokeLinecap="round" />
        <line x1="15" y1="-15" x2="11.5" y2="-11.5" stroke="#f59e0b" strokeWidth="2.8" strokeLinecap="round" />
      </g>

      {/* 4. House Base (Isometric Projection) */}
      {/* Left Wall (Shaded light slate) */}
      <polygon
        points="114,152 160,175 160,215 114,192"
        fill="#cbd5e1"
      />

      {/* Right Front Wall (White sunny face) */}
      <polygon
        points="160,175 208,151 208,191 160,215"
        fill="#ffffff"
        stroke="#e2e8f0"
        strokeWidth="1"
      />

      {/* Flat Rooftop Surface */}
      <polygon
        points="160,128 208,151 160,175 114,152"
        fill="#eef2f6"
      />

      {/* Left Wall Window */}
      <polygon
        points="126,165 146,175 146,193 126,183"
        fill="#ffffff"
        stroke="#94a3b8"
        strokeWidth="1.2"
      />
      <polygon
        points="128,167 144,175 144,191 128,183"
        fill="#fed7aa"
      />

      {/* Right Wall Window (Upper Right) */}
      <polygon
        points="189,157 200,151 200,163 189,169"
        fill="#ffffff"
        stroke="#cbd5e1"
        strokeWidth="1.2"
      />
      <polygon
        points="190,158 199,153 199,162 190,167"
        fill="#fed7aa"
      />

      {/* Front Door */}
      <polygon
        points="171,177 183,171 183,199 171,205"
        fill="#ea580c"
      />
      <circle cx="174" cy="192" r="1.5" fill="#ffffff" />

      {/* 5. Tilted Rooftop Solar Panel Pergola Array */}
      {/* Support Struts holding panel above roof */}
      <line x1="110" y1="138" x2="118" y2="154" stroke="#94a3b8" strokeWidth="2.4" strokeLinecap="round" />
      <line x1="124" y1="112" x2="128" y2="140" stroke="#94a3b8" strokeWidth="2.4" strokeLinecap="round" />

      {/* Panel Bottom Shadow / Thickness */}
      <polygon
        points="93,124 163,164 215,114 145,74"
        fill="#94a3b8"
      />

      {/* Outer Metallic Frame */}
      <polygon
        points="90,120 160,160 212,110 142,70"
        fill="#cad5e2"
        stroke="#94a3b8"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* Inner Photovoltaic Array (Orange solar cells) */}
      <polygon
        points="93.5,120 159,157.5 208.5,110 143,72.5"
        fill="url(#pvSurface)"
      />

      {/* Specular Light Reflection Streak on Panel */}
      <polygon
        points="93.5,120 126,96 110,129.5"
        fill="#ffffff"
        fillOpacity="0.32"
      />

      {/* Grid Lines dividing into 4 columns x 3 rows = 12 cells */}
      {/* Longitudinal Column Lines */}
      <line x1="109.8" y1="129.4" x2="159.4" y2="81.9" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="126.2" y1="138.8" x2="175.8" y2="91.3" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="142.6" y1="148.1" x2="192.2" y2="100.6" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" />

      {/* Latitudinal Row Lines */}
      <line x1="110" y1="104.2" x2="175.5" y2="141.7" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="126.5" y1="88.3" x2="192" y2="125.8" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
