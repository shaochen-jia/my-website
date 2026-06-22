"use client";

// SVG viewport: 90°E–160°E, 45°N–50°S  (500×500 units)
// Shanghai  (121.5°E, 31.2°N) → ~x 45%, y 15%
// Melbourne (145.0°E, 37.8°S) → ~x 79%, y 87%

const MAP_CSS = `
  .map-wrap {
    border-radius: 16px;
    border: 1px solid #E4E0DA;
    overflow: hidden;
    position: relative;
    width: 100%;
    aspect-ratio: 1;
  }
  .map-svg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
  }
  /* Cities overlay fills the full container so % positioning is correct */
  .map-cities {
    position: absolute;
    inset: 0;
    --city-r: 1.3rem;
    --pin-fs: 0.85rem;
  }
  .map-city {
    position: absolute;
    left: calc(var(--cx) - var(--city-r));
    top:  calc(var(--cy) - var(--city-r));
    width:  calc(var(--city-r) * 2);
    height: calc(var(--city-r) * 2);
    cursor: pointer;
    z-index: 10;
  }
  /* Pin dot */
  .map-city::before {
    content: '';
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    width: 8px; height: 8px;
    border-radius: 50%;
    background: #0a0a0a;
    box-shadow: 0 0 0 3px rgba(10,10,10,0.18);
    transition: transform 280ms ease;
  }
  .map-city:hover::before {
    transform: translate(-50%, -50%) scale(1.35);
  }
  /* Ripple ring */
  .map-city::after {
    content: '';
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    width: 8px; height: 8px;
    border-radius: 50%;
    border: 1.5px solid rgba(10,10,10,0.35);
    animation: map-ping 2s ease-out infinite;
  }
  @keyframes map-ping {
    0%   { transform: translate(-50%,-50%) scale(1); opacity: 0.6; }
    100% { transform: translate(-50%,-50%) scale(3.5); opacity: 0; }
  }
  /* Label */
  .map-label {
    position: absolute;
    bottom: calc(100% + 4px);
    left: 50%;
    transform: translateX(-50%) translateY(4px);
    opacity: 0;
    pointer-events: none;
    transition: opacity 240ms ease, transform 240ms ease;
    white-space: nowrap;
  }
  .map-city:hover .map-label {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
  .map-label-inner {
    background: #0a0a0a;
    color: #fff;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.05em;
    padding: 4px 9px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    gap: 5px;
  }
`;

export function MapWidget() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: MAP_CSS }} />
      <div className="map-wrap">

        {/* ── SVG background: Asia-Pacific ── */}
        <svg viewBox="0 0 500 500" className="map-svg" xmlns="http://www.w3.org/2000/svg">
          {/* Ocean */}
          <rect fill="#cce5ef" width="500" height="500"/>

          {/* East Asia mainland */}
          <path fill="#e8e2d4" d="M0,0 L282,0 L295,20 L312,45 L285,55 L268,75 L228,74 L215,95 L193,105 L175,122 L157,142 L143,158 L128,180 L112,210 L105,237 L0,237 Z"/>

          {/* Korea Peninsula */}
          <path fill="#e8e2d4" d="M282,48 L305,42 L316,68 L298,78 L278,65 Z"/>

          {/* Japan – Honshu */}
          <path fill="#e8e2d4" d="M340,20 L385,5 L415,28 L432,54 L400,68 L362,55 L342,38 Z"/>

          {/* Japan – Kyushu */}
          <path fill="#e8e2d4" d="M322,72 L344,62 L356,80 L340,90 L318,84 Z"/>

          {/* Indochina */}
          <path fill="#e8e2d4" d="M105,190 L118,210 L130,240 L148,265 L132,290 L96,280 L78,255 L88,210 Z"/>

          {/* Sumatra */}
          <path fill="#e8e2d4" d="M98,262 L158,244 L192,262 L180,292 L128,298 L94,278 Z"/>

          {/* Borneo */}
          <path fill="#e8e2d4" d="M248,252 L308,236 L330,260 L322,308 L285,320 L250,302 Z"/>

          {/* Philippines */}
          <path fill="#e8e2d4" d="M325,148 L342,138 L352,165 L342,182 L322,172 Z"/>

          {/* Australia */}
          <path fill="#e8e2d4" d="M255,340 L302,318 L368,318 L425,336 L462,368 L480,410 L488,452 L465,480 L422,494 L368,497 L312,480 L272,452 L252,415 L252,378 Z"/>

          {/* Tasmania */}
          <path fill="#e8e2d4" d="M385,497 L405,490 L415,500 L385,500 Z"/>

          {/* New Zealand */}
          <path fill="#e8e2d4" d="M470,355 L488,345 L493,370 L476,378 Z"/>

          {/* Subtle lat/lon grid lines */}
          <line x1="0" y1="237" x2="500" y2="237" stroke="rgba(0,0,0,0.07)" strokeWidth="0.6" strokeDasharray="4 8"/>
          <line x1="214" y1="0" x2="214" y2="500" stroke="rgba(0,0,0,0.07)" strokeWidth="0.6" strokeDasharray="4 8"/>
        </svg>

        {/* ── City pins ── */}
        <div className="map-cities">

          {/* Shanghai 45% 15% */}
          <div className="map-city"
            style={{ "--cx": "45%", "--cy": "15%" } as React.CSSProperties}>
            <div className="map-label">
              <div className="map-label-inner">🏙️ Shanghai, China</div>
            </div>
          </div>

          {/* Melbourne 79% 87% */}
          <div className="map-city"
            style={{ "--cx": "79%", "--cy": "87%" } as React.CSSProperties}>
            <div className="map-label">
              <div className="map-label-inner">☕ Melbourne, AU</div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
