import styles from './CalcScene.module.scss';

export default function CalcScene() {
  return (
    <div className={styles.calcScene}>
      <svg
        className={styles.calcSvg}
        viewBox="0 0 420 460"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g className={styles.sunGroup}>
          <circle className={styles.sunCore} cx="330" cy="70" r="26" />
          <g className={styles.sunRays}>
            <line x1="330" y1="24" x2="330" y2="10" />
            <line x1="330" y1="130" x2="330" y2="116" />
            <line x1="276" y1="70" x2="262" y2="70" />
            <line x1="398" y1="70" x2="384" y2="70" />
            <line x1="292" y1="32" x2="283" y2="23" />
            <line x1="368" y1="108" x2="377" y2="117" />
            <line x1="368" y1="32" x2="377" y2="23" />
            <line x1="292" y1="108" x2="283" y2="117" />
          </g>
        </g>

        <rect
          className={styles.body}
          x="80"
          y="70"
          width="240"
          height="340"
          rx="28"
        />

        <rect
          className={styles.screen}
          x="104"
          y="98"
          width="192"
          height="96"
          rx="12"
        />

        <text className={styles.oldBill} x="284" y="126" textAnchor="end">
          ₹4,500
        </text>
        <line className={styles.strike} x1="238" y1="120" x2="292" y2="120" />

        <text className={styles.newBill} x="284" y="168" textAnchor="end">
          ₹1,200
        </text>
        <text className={styles.screenLabel} x="120" y="178">
          New Bill
        </text>

        <g className={styles.keypad}>
          {Array.from({ length: 12 }).map((_, index) => {
            const col = index % 3;
            const row = Math.floor(index / 3);
            const x = 116 + col * 68;
            const y = 218 + row * 46;
            return (
              <rect
                key={index}
                className={`${styles.key} ${
                  index === 11 ? styles.keyAccent : ''
                }`}
                x={x}
                y={y}
                width="52"
                height="32"
                rx="8"
                style={{ animationDelay: `${index * 0.12}s` }}
              />
            );
          })}
        </g>

        <g className={styles.coin} style={{ animationDelay: '0s' }}>
          <circle cx="60" cy="260" r="18" />
          <text x="60" y="266" textAnchor="middle">
            ₹
          </text>
        </g>
        <g className={styles.coin} style={{ animationDelay: '1.4s' }}>
          <circle cx="368" cy="300" r="14" />
          <text x="368" y="305" textAnchor="middle">
            ₹
          </text>
        </g>
        <g className={styles.coin} style={{ animationDelay: '2.6s' }}>
          <circle cx="46" cy="360" r="12" />
          <text x="46" y="365" textAnchor="middle">
            ₹
          </text>
        </g>
      </svg>
    </div>
  );
}
