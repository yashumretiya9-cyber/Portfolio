import React, { useEffect, useRef } from 'react';

const CursorTrail = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const dots = [];
    const dotCount = 15;
    const mouse = { x: width / 2, y: height / 2 };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', resize);
    resize();

    for (let i = 0; i < dotCount; i++) {
      dots.push({
        x: mouse.x,
        y: mouse.y,
        size: 4 - (i / dotCount) * 3,
        opacity: 1 - (i / dotCount),
      });
    }

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smoothly update dots position
      dots[0].x += (mouse.x - dots[0].x) * 0.3;
      dots[0].y += (mouse.y - dots[0].y) * 0.3;

      for (let i = 1; i < dotCount; i++) {
        dots[i].x += (dots[i - 1].x - dots[i].x) * 0.3;
        dots[i].y += (dots[i - 1].y - dots[i].y) * 0.3;
      }

      // Draw dots
      dots.forEach((dot, index) => {
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(14, 165, 233, ${dot.opacity})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 9999,
      }}
    />
  );
};

export default CursorTrail;
