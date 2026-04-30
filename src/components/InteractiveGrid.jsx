import React, { useEffect, useRef } from 'react';

const InteractiveGrid = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const spacing = 35; 
    const mouse = { x: -1000, y: -1000 };
    const maxDist = 180;
    let scanLineY = 0;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', resize);
    resize();

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const render = (time) => {
      ctx.clearRect(0, 0, width, height);
      
      const cols = Math.ceil(width / spacing);
      const rows = Math.ceil(height / spacing);

      // Draw Scanning Beam
      scanLineY = (time * 0.1) % (height + 200) - 100;
      const gradient = ctx.createLinearGradient(0, scanLineY, 0, scanLineY + 100);
      gradient.addColorStop(0, 'rgba(14, 165, 233, 0)');
      gradient.addColorStop(0.5, 'rgba(14, 165, 233, 0.05)');
      gradient.addColorStop(1, 'rgba(14, 165, 233, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, scanLineY, width, 100);

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * spacing;
          const y = j * spacing;
          
          const dx = mouse.x - x;
          const dy = mouse.y - y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          const dotColor = getComputedStyle(document.documentElement).getPropertyValue('--dot-color') || 'rgba(14, 165, 233, 0.15)';
          
          if (dist < maxDist) {
            const factor = 1 - dist / maxDist;
            
            // Draw connections to nearby dots
            if (i < cols - 1 && j < rows - 1) {
              ctx.beginPath();
              ctx.moveTo(x, y);
              if (Math.random() > 0.5) ctx.lineTo(x + spacing, y);
              if (Math.random() > 0.5) ctx.lineTo(x, y + spacing);
              ctx.strokeStyle = `rgba(14, 165, 233, ${factor * 0.15})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }

            ctx.beginPath();
            ctx.arc(x, y, 1.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(14, 165, 233, ${0.1 + factor * 0.5})`;
            ctx.fill();
            
            // Glow effect
            ctx.shadowBlur = 10 * factor;
            ctx.shadowColor = '#0ea5e9';
          } else {
            ctx.beginPath();
            ctx.arc(x, y, 0.8, 0, Math.PI * 2);
            ctx.fillStyle = dotColor;
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render(0);

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
        zIndex: -1,
      }}
    />
  );
};

export default InteractiveGrid;
