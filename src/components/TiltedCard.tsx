import type { SpringOptions } from 'motion/react';
import { useRef, useState } from 'react';
import { motion, useSpring } from 'motion/react';
import './TiltedCard.css';

interface TiltedCardProps {
  imageSrc: React.ComponentProps<'img'>['src'];
  altText?: string;
  containerHeight?: React.CSSProperties['height'];
  containerWidth?: React.CSSProperties['width'];
  imageHeight?: React.CSSProperties['height'];
  imageWidth?: React.CSSProperties['width'];
  scaleOnHover?: number;
  rotateAmplitude?: number;
  showMobileWarning?: boolean;
  overlayContent?: React.ReactNode;
  displayOverlayContent?: boolean;
  cardColor?: string;
  overlayBgColor?: string;
  accentColor?: string;
}

const tiltSpringValues: SpringOptions = {
  damping: 25,
  stiffness: 150,
  mass: 1
};

const scaleSpringValues: SpringOptions = {
  damping: 35,
  stiffness: 200,
  mass: 0.8
};

const shadowSpringValues: SpringOptions = {
  damping: 40,
  stiffness: 100,
  mass: 1.2
};

export default function TiltedCard({
  imageSrc,
  altText = 'Tilted card image',
  containerHeight = '300px',
  containerWidth = '100%',
  imageHeight = '300px',
  imageWidth = '300px',
  scaleOnHover = 1.1,
  rotateAmplitude = 14,
  showMobileWarning = true,
  overlayContent = null,
  displayOverlayContent = false
}: TiltedCardProps) {
  const ref = useRef<HTMLElement>(null);

  const rotateX = useSpring(0, tiltSpringValues);
  const rotateY = useSpring(0, tiltSpringValues);
  const scale = useSpring(1, scaleSpringValues);
  const opacity = useSpring(0);
  const rotateFigcaption = useSpring(0, {
    stiffness: 350,
    damping: 30,
    mass: 1
  });
  const shadowX = useSpring(0, shadowSpringValues);
  const shadowY = useSpring(10, shadowSpringValues);

  const [lastY, setLastY] = useState<number>(0);

  function handleMouse(e: React.MouseEvent<HTMLElement>) {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    const rotationX = (offsetY / (rect.height / 2)) * -rotateAmplitude;
    const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;

    rotateX.set(rotationX);
    rotateY.set(rotationY);

    // Calculate shadow offsets based on rotation for 3D depth
    shadowX.set(rotationY * 0.5);
    shadowY.set(rotationX * 0.5 + 10); // Add base elevation

    const velocityY = offsetY - lastY;
    rotateFigcaption.set(-velocityY * 0.6);
    setLastY(offsetY);
  }

  function handleMouseEnter() {
    scale.set(scaleOnHover);
    opacity.set(1);
  }

  function handleMouseLeave() {
    opacity.set(0);
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
    rotateFigcaption.set(0);
    shadowX.set(0);
    shadowY.set(10); // Keep base elevation
  }

  return (
    <motion.figure
      ref={ref}
      className="tilted-card-figure"
      style={{
        height: containerHeight,
        width: containerWidth,
        rotateX,
        rotateY,
        scale,
        '--shadow-x': shadowX,
        '--shadow-y': shadowY
      } as any}
      onMouseMove={handleMouse}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {showMobileWarning && (
        <div className="tilted-card-mobile-alert">This effect is not optimized for mobile. Check on desktop.</div>
      )}

      <div
        className="tilted-card-inner"
        style={{
          width: imageWidth,
          height: imageHeight
        }}
      >
        <img
          src={imageSrc}
          alt={altText}
          className="tilted-card-img"
          style={{
            width: imageWidth,
            height: imageHeight
          }}
        />

        {displayOverlayContent && overlayContent && (
          <div className="tilted-card-overlay">{overlayContent}</div>
        )}
      </div>
    </motion.figure>
  );
}
