import React from "react";

export type ByteMode =
  | "idle"
  | "typing"
  | "deploy"
  | "fetch"
  | "ok"
  | "error"
  | "clear"
  | "health"
  | "wave"
  | "fun";

interface ByteRobotProps {
  mode: ByteMode;
  tip: string;
  eventHandlers: {
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    onClick: () => void;
    onDoubleClick: () => void;
    onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => void;
  };
}

const ByteRobot: React.FC<ByteRobotProps> = ({ mode, tip, eventHandlers }) => {
  return (
    <div
      id="byte"
      className={`byte byte-${mode}${mode !== "idle" ? " active" : ""}`}
      style={{ alignSelf: "end" }}
      tabIndex={0}
      role="button"
      aria-label="Byte the Robot"
      title="Say hi to Byte"
      data-interactive="1"
      {...eventHandlers}
    >
      {/* Byte "Chibi" Robot SVG */}
      <svg viewBox="0 0 64 64" fill="none">
        {/* sparkle for fun cue */}
        <g className="sparkle" transform="translate(10,10)" opacity="0">
          <circle cx="4" cy="4" r="1.2" fill="#a78bfa"></circle>
          <circle cx="10" cy="5" r="0.9" fill="#38bdf8"></circle>
          <circle cx="6" cy="10" r="0.8" fill="#22d3ee"></circle>
        </g>
        <circle className="ok-ring" cx="32" cy="32" r="14" stroke="#93c5fd" strokeWidth="2" opacity="0"></circle>
        {/* Treads */}
        <g transform="translate(12,46)">
          <rect x="0" y="6" width="40" height="5" rx="2.5" fill="#0b1222" opacity=".3"></rect>
          <g className="tread" clipPath="url(#clipTread)">
            <rect x="-40" y="0" width="120" height="8" fill="#111827"></rect>
            <g fill="#1f2937">
              <rect x="-36" y="0" width="6" height="8"></rect>
              <rect x="-24" y="0" width="6" height="8"></rect>
              <rect x="-12" y="0" width="6" height="8"></rect>
              <rect x="0" y="0" width="6" height="8"></rect>
              <rect x="12" y="0" width="6" height="8"></rect>
              <rect x="24" y="0" width="6" height="8"></rect>
              <rect x="36" y="0" width="6" height="8"></rect>
              <rect x="48" y="0" width="6" height="8"></rect>
              <rect x="60" y="0" width="6" height="8"></rect>
            </g>
          </g>
          <defs>
            <clipPath id="clipTread"><rect x="0" y="0" width="40" height="8" rx="4" /></clipPath>
          </defs>
        </g>
        {/* Body */}
        <g className="byte-body" transform="translate(12,16)">
          <rect x="0" y="6" width="40" height="26" rx="6" fill="#0f172a" stroke="#1e293b" strokeWidth="1.2" />
          <rect x="2" y="8" width="36" height="22" rx="5" fill="url(#panelGrad)" opacity=".7" />
          <defs>
            <linearGradient id="panelGrad" x1="2" y1="8" x2="38" y2="30">
              <stop offset="0" stopColor="#1f2937" />
              <stop offset="1" stopColor="#0b1222" />
            </linearGradient>
          </defs>
          <rect x="18" y="-2" width="4" height="10" rx="2" fill="#1e293b" />
          {/* Head */}
          <g transform="translate(8,-12)">
            <rect x="0" y="0" width="24" height="16" rx="4" fill="#0b1222" stroke="#1e293b" strokeWidth="1.2" />
            <g transform="translate(2,3)">
              {/* left eye */}
              <g>
                <circle cx="6" cy="5" r="5" fill="#0f172a" stroke="#334155" strokeWidth="1" />
                <g className="eye" style={{ transformOrigin: "6px 5px" }}>
                  <circle cx="6" cy="5" r="2.2" fill="#93c5fd" />
                  <circle cx="6.7" cy="4.3" r="0.8" fill="#e5f0ff" />
                </g>
              </g>
              {/* right eye */}
              <g transform="translate(12,0)">
                <circle cx="6" cy="5" r="5" fill="#0f172a" stroke="#334155" strokeWidth="1" />
                <g className="eye" style={{ transformOrigin: "18px 5px" }}>
                  <circle cx="6" cy="5" r="2.2" fill="#93c5fd" />
                  <circle cx="6.7" cy="4.3" r="0.8" fill="#e5f0ff" />
                </g>
              </g>
            </g>
            {/* antenna */}
            <g transform="translate(11,-4)">
              <rect x="1.5" y="-6" width="1" height="6" fill="#334155"></rect>
              <circle cx="2" cy="-6.5" r="1.6" fill="#38bdf8"></circle>
            </g>
          </g>
          {/* Arms */}
          <g>
            <g transform="translate(-3,12)">
              <rect x="0" y="0" width="6" height="2" rx="1" fill="#334155"></rect>
              <rect x="4" y="-1" width="6" height="4" rx="2" fill="#1f2937"></rect>
            </g>
            <g className="arm-right" transform="translate(37,12)">
              <rect x="0" y="0" width="6" height="2" rx="1" fill="#334155"></rect>
              <rect x="-6" y="-1" width="6" height="4" rx="2" fill="#1f2937"></rect>
            </g>
          </g>
          {/* Status heart (for health) */}
          <g className="heart" transform="translate(20,24)">
            <path d="M0 4c2.4-2.2 4-3.7 4-5.6C4-2 3-3 1.8-3c-.9 0-1.6.6-1.8 1.3C-.2-2.4-.9-3-1.8-3C-3-3-4-2-4-1.6c0 1.9 1.6 3.4 4 5.6z" fill="#f472b6" opacity=".85" />
          </g>
        </g>
      </svg>
      <div id="byteTip" className="byte-tip" aria-hidden="true">
        {tip}
      </div>
    </div>
  );
};

export default ByteRobot;
