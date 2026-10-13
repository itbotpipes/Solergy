const ICON_PROPS = {
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
};

const STROKE_PROPS = {
  stroke: '#ec4d00',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

export function TariffIcon() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M3 17l6-6 4 4 8-9" {...STROKE_PROPS} />
      <path d="M15 6h6v6" {...STROKE_PROPS} />
    </svg>
  );
}

export function BillIcon() {
  return (
    <svg {...ICON_PROPS}>
      <path
        d="M6.5 3h11v17.2l-2.4-1.4-2.1 1.4-2-1.4-2 1.4-2.5-1.4V3z"
        {...STROKE_PROPS}
      />
      <path d="M9 8h6" {...STROKE_PROPS} />
      <text
        x="12"
        y="15.5"
        textAnchor="middle"
        fontSize="6.5"
        fontWeight="700"
        fill="#ec4d00"
        stroke="none"
        fontFamily="Arial, sans-serif"
      >
        ₹
      </text>
    </svg>
  );
}

export function PowerIcon() {
  return (
    <svg {...ICON_PROPS}>
      <path d="M12.4 6.7L13 2l-2.4 2.9" {...STROKE_PROPS} />
      <path d="M18.6 12.9L21 10h-6" {...STROKE_PROPS} />
      <path d="M8.4 8.4L3 14h6l-1.3 7.6" {...STROKE_PROPS} />
      <path d="M2 2l20 20" {...STROKE_PROPS} />
    </svg>
  );
}
