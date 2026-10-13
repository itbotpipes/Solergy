import styles from './SunScene.module.scss';

export default function SunScene() {
  return (
    <div className={styles.sunScene}>
      <svg className={styles.sunArcSvg} viewBox="0 0 460 260">
        <path
          className={styles.arcPath}
          pathLength={100}
          d="M20,230 C130,10 330,10 440,230"
        />
        <path
          className={styles.arcProgress}
          pathLength={100}
          d="M20,230 C130,10 330,10 440,230"
        />

        <path className={styles.groundLine} d="M0,232 H460" />
        <path className={styles.houseShape} d="M130,232 V165 L185,120 L240,165 V232 Z" />
        <line className={styles.panelLine} x1="144" y1="156" x2="176" y2="132" />
        <line className={styles.panelLine} x1="156" y1="165" x2="188" y2="141" />
        <line className={styles.panelLine} x1="168" y1="174" x2="200" y2="150" />

        <path className={styles.energyWire} d="M185,120 V95 H240 V210" />
        <path
          className={styles.energyPulse}
          pathLength={100}
          d="M185,120 V95 H240 V210"
        />

        <rect
          x="230"
          y="205"
          width="20"
          height="10"
          rx="2"
          fill="none"
          stroke="#0A0A0A"
          strokeWidth="1.6"
        />
        <circle className={styles.bulbGlow} cx="240" cy="200" r="7" />
        <path d="M240,200 v-8" stroke="#0A0A0A" strokeWidth="1.4" />

        <g className={styles.sunGroup}>
          <line className={styles.sunRay} x1="0" y1="-19" x2="0" y2="-13" />
          <line className={styles.sunRay} x1="13.4" y1="-13.4" x2="9.2" y2="-9.2" />
          <line className={styles.sunRay} x1="19" y1="0" x2="13" y2="0" />
          <line className={styles.sunRay} x1="13.4" y1="13.4" x2="9.2" y2="9.2" />
          <circle className={styles.sunCore} r="11" />
        </g>
      </svg>
    </div>
  );
}
