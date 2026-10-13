import styles from './ContactBeaconScene.module.scss';

export default function ContactBeaconScene() {
  return (
    <div className={styles.scene}>
      <svg
        className={styles.beaconSvg}
        viewBox="0 0 320 380"
        preserveAspectRatio="xMidYMid meet"
      >
        <line className={styles.groundLine} x1="60" y1="340" x2="260" y2="340" />

        <g className={styles.sunGroup} transform="translate(70,72)">
          <line className={styles.sunRay} x1="0" y1="-19" x2="0" y2="-13" />
          <line className={styles.sunRay} x1="13.4" y1="-13.4" x2="9.2" y2="-9.2" />
          <line className={styles.sunRay} x1="19" y1="0" x2="13" y2="0" />
          <line className={styles.sunRay} x1="13.4" y1="13.4" x2="9.2" y2="9.2" />
          <line className={styles.sunRay} x1="0" y1="19" x2="0" y2="13" />
          <circle className={styles.sunCore} r="10" />
        </g>

        <line className={styles.pole} x1="150" y1="340" x2="150" y2="150" />
        <path className={styles.poleFoot} d="M130,340 L150,325 L170,340" />

        <g transform="translate(150,150)">
          <g className={styles.ring} style={{ animationDelay: '0s' }}>
            <path d="M-22,-4 A26,26 0 0122,-4" />
          </g>
          <g className={styles.ring} style={{ animationDelay: '0.5s' }}>
            <path d="M-34,4 A40,40 0 0134,4" />
          </g>
          <g className={styles.ring} style={{ animationDelay: '1s' }}>
            <path d="M-46,12 A54,54 0 0146,12" />
          </g>
          <circle className={styles.beaconCore} r="6.5" />
        </g>

        <g
          transform="translate(215,120) translate(-5,0)"
          className={styles.bubbleGroup}
        >
          <path
            className={styles.bubbleShape}
            d="M-38,-24 h64 a10,10 0 0110,10 v24 a10,10 0 01-10,10 h-38 l-14,14 v-14 h-12 a10,10 0 01-10,-10 v-24 a10,10 0 0110,-10 z"
          />
          <circle className={styles.bubbleDot} cx="-14" cy="-4" r="3" />
          <circle className={styles.bubbleDot} cx="0" cy="-4" r="3" />
          <circle className={styles.bubbleDot} cx="14" cy="-4" r="3" />
        </g>

        <g transform="translate(100,250)">
          <rect
            className={styles.panelFrame}
            x="-45"
            y="-16"
            width="90"
            height="50"
            rx="4"
            transform="skewY(-8)"
          />
          <line
            className={styles.panelLine}
            x1="-45"
            y1="1"
            x2="45"
            y2="-3"
            transform="skewY(-8)"
          />
          <line
            className={styles.panelLine}
            x1="-45"
            y1="18"
            x2="45"
            y2="14"
            transform="skewY(-8)"
          />
          <line
            className={styles.panelLine}
            x1="-15"
            y1="-16"
            x2="-15"
            y2="34"
            transform="skewY(-8)"
          />
          <line
            className={styles.panelLine}
            x1="15"
            y1="-16"
            x2="15"
            y2="34"
            transform="skewY(-8)"
          />
        </g>
        <path
          className={styles.wire}
          d="M140,238 C120,220 130,190 150,175"
        />
      </svg>
    </div>
  );
}
