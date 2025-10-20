import React, { useRef, useState } from 'react';
import './SpotlightCard.css';

interface SpotlightCardProps extends React.PropsWithChildren {
  className?: string;
  spotlightColor?: `rgba(${number}, ${number}, ${number}, ${number})`;
  frontContent?: React.ReactNode;
  backContent?: React.ReactNode;
  enableFlip?: boolean;
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = '',
  spotlightColor = 'rgba(255, 255, 255, 0.25)',
  frontContent,
  backContent,
  enableFlip = false
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [flipped, setFlipped] = useState(false);

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = e => {
    if (!divRef.current) return;

    const rect = divRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    divRef.current.style.setProperty('--mouse-x', `${x}px`);
    divRef.current.style.setProperty('--mouse-y', `${y}px`);
    divRef.current.style.setProperty('--spotlight-color', spotlightColor);
  };

  const handleMouseEnter: React.MouseEventHandler<HTMLDivElement> = () => {
    if (enableFlip) {
      setFlipped(true);
    }
  };

  const handleMouseLeave: React.MouseEventHandler<HTMLDivElement> = () => {
    if (enableFlip) {
      setFlipped(false);
    }
  };

  const handleClick: React.MouseEventHandler<HTMLDivElement> = () => {
    if (enableFlip) {
      setFlipped(prev => !prev);
    }
  };

  const handleTouch: React.TouchEventHandler<HTMLDivElement> = () => {
    if (enableFlip) {
      setFlipped(prev => !prev);
    }
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      onTouchStart={handleTouch}
      className={`card-spotlight ${enableFlip ? 'card-flip' : ''} ${className}`}
      style={{ perspective: enableFlip ? '1000px' : undefined }}
    >
      <div className={`card-inner ${flipped ? 'flipped' : ''}`}>
        {enableFlip ? (
          <>
            <div className="card-front">
              {frontContent}
            </div>
            <div className="card-back">
              {backContent}
            </div>
          </>
        ) : (
          children
        )}
      </div>
    </div>
  );
};

export default SpotlightCard;
