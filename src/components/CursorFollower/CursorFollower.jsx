import React, { useEffect, useRef } from 'react';
import './CursorFollower.css';

const CursorFollower = () => {
  const circleRef = useRef(null);
  const rafRef = useRef(null);
  const targetRef = useRef({ x: 0, y: 0 });
  const posRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMouseMove = (e) => {
      targetRef.current.x = e.clientX;
      targetRef.current.y = e.clientY;
    };

    document.addEventListener('mousemove', onMouseMove);

    const render = (time) => {
      // Smooth easing towards target
      posRef.current.x += (targetRef.current.x - posRef.current.x) * 0.2;
      posRef.current.y += (targetRef.current.y - posRef.current.y) * 0.2;

      if (circleRef.current) {
        // Subtle floating movement (circular, anti-clockwise)
        const radius = 4;
        const speed = time * 0.002;
        const floatX = Math.cos(-speed) * radius;
        const floatY = Math.sin(-speed) * radius;

        // Base Offset: 20px to the right, 10px up + floating offset
        circleRef.current.style.left = `${posRef.current.x + 20 + floatX}px`;
        circleRef.current.style.top = `${posRef.current.y - 10 + floatY}px`;
      }

      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafRef.current);
      document.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <div ref={circleRef} className="cursor-circle">
      <div className="cursor-wing cursor-wing-left" />
      <div className="cursor-wing cursor-wing-right" />
    </div>
  );
};

export default CursorFollower;
