import styles from './ContactSignalScene.module.scss';

export default function ContactSignalScene() {
  return (
    <div className={styles.scene}>
      <svg
        className={styles.signalSvg}
        viewBox="0 0 320 380"
        preserveAspectRatio="xMidYMid meet"
      >
        <path className={styles.beamLine} d="M160,55 C120,150 200,230 160,325" />
        <path className={styles.beamPulse} pathLength="100" d="M160,55 C120,150 200,230 160,325" />

        <circle className={styles.nodeDot} cx="160" cy="55" r="3" />
        <circle className={styles.nodeDot} cx="160" cy="325" r="3" />

        <g className={styles.sunGroup} transform="translate(160,55)">
          <line className={styles.sunRay} x1="0" y1="-24" x2="0" y2="-16" />
          <line className={styles.sunRay} x1="17" y1="-17" x2="11.3" y2="-11.3" />
          <line className={styles.sunRay} x1="-17" y1="-17" x2="-11.3" y2="-11.3" />
          <line className={styles.sunRay} x1="24" y1="0" x2="16" y2="0" />
          <line className={styles.sunRay} x1="-24" y1="0" x2="-16" y2="0" />
          <line className={styles.sunRay} x1="17" y1="17" x2="11.3" y2="11.3" />
          <line className={styles.sunRay} x1="-17" y1="17" x2="-11.3" y2="11.3" />
          <circle className={styles.sunCore} r="13" />
        </g>

        <g transform="translate(160,325)">
          <path
            className={styles.pinShape}
            d="M0,26 C-16,4 -20,-8 -20,-18 A20,20 0 0120,-18 C20,-8 16,4 0,26 Z"
          />
          <circle className={styles.pinCore} cx="0" cy="-16" r="6.5" />
        </g>
      </svg>
    </div>
  );
}
