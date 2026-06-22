"use client";

const Icon = ({ children }: { children: React.ReactNode }) => (
  <svg viewBox="0 0 24 24" width="22" height="22" fill="none"
    stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

const ICONS: Record<string, React.ReactNode> = {
  "SQL":            <Icon><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.7 4 3 9 3s9-1.3 9-3V5"/><path d="M3 12c0 1.7 4 3 9 3s9-1.3 9-3"/></Icon>,
  "Python":         <Icon><path d="M12 2C7.6 2 8 5.4 8 8h8c0-2.6.4-6-4-6z"/><path d="M12 22c4.4 0 4-3.4 4-6H8c0 2.6-.4 6 4 6z"/><path d="M8 8H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4"/><path d="M16 16h4a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-4"/><circle cx="9.5" cy="5" r="1" fill="currentColor" stroke="none"/><circle cx="14.5" cy="19" r="1" fill="currentColor" stroke="none"/></Icon>,
  "Power Automate": <Icon><polygon points="13,2 3,14 12,14 11,22 21,10 12,10"/></Icon>,
  "Power BI":       <Icon><rect x="2" y="14" width="5" height="8" rx="1"/><rect x="9.5" y="8" width="5" height="14" rx="1"/><rect x="17" y="2" width="5" height="20" rx="1"/></Icon>,
  "Power Apps":     <Icon><rect x="2" y="2" width="9" height="9" rx="1.5"/><rect x="13" y="2" width="9" height="9" rx="1.5"/><rect x="2" y="13" width="9" height="9" rx="1.5"/><rect x="13" y="13" width="9" height="9" rx="1.5"/></Icon>,
  "Tableau":        <Icon><line x1="12" y1="2" x2="12" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="5" y1="5" x2="19" y2="19"/><line x1="19" y1="5" x2="5" y2="19"/></Icon>,
  "Excel":          <Icon><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M7 8l3.5 4L7 16M13 8h4M13 12h3M13 16h4"/></Icon>,
  "Dynamics 365":   <Icon><circle cx="12" cy="12" r="9"/><path d="M12 7h-3v10h3a5 5 0 0 0 0-10z"/></Icon>,
  "Figma":          <Icon><rect x="8" y="2" width="8" height="8" rx="2"/><rect x="8" y="14" width="8" height="8" rx="4"/><rect x="2" y="8" width="8" height="8" rx="4"/><circle cx="16" cy="12" r="4"/><rect x="8" y="2" width="4" height="8"/></Icon>,
  "Miro":           <Icon><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M7 10l2 4 2-3 2 3 2-4"/></Icon>,
  "Jira":           <Icon><path d="M12 2L2 12L12 22L22 12Z"/><path d="M12 7v6M12 13l3.5 3.5" strokeWidth="1.5"/></Icon>,
  "Confluence":     <Icon><circle cx="12" cy="12" r="9"/><path d="M6 15c1-1.5 4-5 6-6M18 9c-1 1.5-4 5-6 6"/></Icon>,
  "Trello":         <Icon><rect x="3" y="3" width="7" height="18" rx="2"/><rect x="14" y="3" width="7" height="12" rx="2"/></Icon>,
  "Azure DevOps":   <Icon><path d="M2 12L8 4l8 2 6 6-6 10H8z"/><path d="M14 6L8 12M8 12L14 18"/></Icon>,
  "Notion":         <Icon><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="9" y1="7" x2="15" y2="7"/><line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="17" x2="12" y2="17"/></Icon>,
};

interface SkillCardProps {
  idx: number;
  num: string;
  category: string;
  tools: string[];
}

export function SkillCard({ idx, num, category, tools }: SkillCardProps) {
  const s = `skc${idx}`;

  const rotations = Array.from({ length: 25 }, (_, i) => ({
    n: i + 1,
    x: 20 - Math.floor(i / 5) * 10,
    y: -10 + (i % 5) * 5,
  }));

  const css = `
    .${s}-canvas {
      perspective: 800px;
      position: absolute;
      inset: 0;
      z-index: 20;
      display: grid;
      grid-template-columns: repeat(5,1fr);
      grid-template-rows: repeat(5,1fr);
    }
    .${s}-tr { position: relative; z-index: 20; cursor: default; }

    /* ── card shell ── */
    .${s}-card {
      position: absolute;
      inset: 0;
      border-radius: 20px;
      border: 1px solid #E4E0DA;
      background: #ffffff;
      padding: 32px;
      z-index: 0;
      overflow: hidden;
      transition:
        transform 700ms cubic-bezier(0.16,1,0.3,1),
        background 320ms ease,
        border-color 320ms ease,
        box-shadow 400ms;
    }

    /* ── FRONT: big typography (default) ── */
    .${s}-front {
      position: absolute;
      inset: 0;
      padding: 32px;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      transition: opacity 280ms ease, transform 320ms cubic-bezier(0.16,1,0.3,1);
    }
    .${s}-front-num {
      font-size: 11px;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      color: #BBBBBB;
      margin-bottom: 12px;
      transition: color 320ms;
    }
    .${s}-front-title {
      font-family: 'DM Serif Display', serif;
      font-size: clamp(28px, 3.2vw, 44px);
      line-height: 1.0;
      letter-spacing: -0.025em;
      color: #0a0a0a;
      transition: color 320ms;
    }

    /* ── BACK: tool grid (hidden by default) ── */
    .${s}-back {
      position: absolute;
      inset: 0;
      padding: 28px;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      opacity: 0;
      transform: translateY(16px);
      transition: opacity 280ms ease, transform 320ms cubic-bezier(0.16,1,0.3,1);
      pointer-events: none;
      overflow-y: auto;
    }
    .${s}-back-label {
      font-size: 10px;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      color: rgba(255,255,255,0.35);
      margin-bottom: 16px;
    }
    .${s}-tool-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    .${s}-tool {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      padding: 12px 8px;
      border-radius: 12px;
      border: 1px solid rgba(255,255,255,0.12);
      background: rgba(255,255,255,0.06);
      flex: 1 0 68px;
      min-width: 68px;
      max-width: 90px;
      color: rgba(255,255,255,0.85);
    }
    .${s}-tool span {
      font-size: 11px;
      text-align: center;
      line-height: 1.2;
      color: rgba(255,255,255,0.6);
      max-width: 64px;
    }

    /* ── HOVER: invert card + swap front→back ── */
    .${s}-canvas:hover .${s}-card {
      background: #0a0a0a;
      border-color: #1a1a1a;
      box-shadow: 0 20px 60px rgba(0,0,0,0.28);
    }
    .${s}-canvas:hover .${s}-front {
      opacity: 0;
      transform: translateY(-14px);
      pointer-events: none;
    }
    .${s}-canvas:hover .${s}-back {
      opacity: 1;
      transform: translateY(0);
      pointer-events: auto;
    }

    /* ── 3-D tilt ── */
    ${rotations.map(r =>
      `.${s}-tr-${r.n}:hover ~ .${s}-card { transform: rotateX(${r.x}deg) rotateY(${r.y}deg); transition: transform 125ms ease-in-out, background 320ms ease, border-color 320ms ease; }`
    ).join('\n    ')}

    .${s}-wrapper:active { transform: scale(0.98); }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div
        className={`${s}-wrapper noselect`}
        style={{ position: "relative", height: "100%", minHeight: "280px", transition: "200ms" }}
      >
        <div className={`${s}-canvas`}>
          {rotations.map(r => (
            <div key={r.n} className={`${s}-tr ${s}-tr-${r.n}`} />
          ))}

          <div className={`${s}-card`}>
            {/* FRONT — big text, shown by default */}
            <div className={`${s}-front`}>
              <p className={`${s}-front-num`}>{num}</p>
              <h3 className={`${s}-front-title`}>{category}</h3>
            </div>

            {/* BACK — tool grid, shown on hover */}
            <div className={`${s}-back`}>
              <p className={`${s}-back-label`}>{num} &nbsp;·&nbsp; {category}</p>
              <div className={`${s}-tool-grid`}>
                {tools.map(tool => (
                  <div key={tool} className={`${s}-tool`}>
                    {ICONS[tool] ?? <Icon><circle cx="12" cy="12" r="6"/></Icon>}
                    <span>{tool}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
