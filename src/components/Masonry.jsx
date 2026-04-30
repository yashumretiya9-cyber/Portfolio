import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';

/* ── hooks ── */
const useMedia = (queries, values, defaultValue) => {
  const get = () => values[queries.findIndex(q => matchMedia(q).matches)] ?? defaultValue;
  const [value, setValue] = useState(get);
  useEffect(() => {
    const handler = () => setValue(get);
    queries.forEach(q => matchMedia(q).addEventListener('change', handler));
    return () => queries.forEach(q => matchMedia(q).removeEventListener('change', handler));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queries]);
  return value;
};

const useMeasure = () => {
  const ref = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  useLayoutEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);
  return [ref, size];
};

const preloadImages = async urls => {
  await Promise.all(
    urls.map(src => new Promise(resolve => {
      const img = new Image();
      img.src = src;
      img.onload = img.onerror = () => resolve();
    }))
  );
};

/* ── Component ── */
const Masonry = ({
  items,
  ease = 'power3.out',
  duration = 0.6,
  stagger = 0.05,
  animateFrom = 'bottom',
  scaleOnHover = true,
  hoverScale = 0.95,
  blurToFocus = true,
  colorShiftOnHover = false,
}) => {
  const columns = useMedia(
    ['(min-width:1500px)', '(min-width:1000px)', '(min-width:600px)', '(min-width:400px)'],
    [5, 4, 3, 2],
    1
  );

  const [containerRef, { width }] = useMeasure();
  const [imagesReady, setImagesReady] = useState(false);

  const getInitialPosition = item => {
    const containerRect = containerRef.current?.getBoundingClientRect();
    if (!containerRect) return { x: item.x, y: item.y };
    let direction = animateFrom;
    if (animateFrom === 'random') {
      const dirs = ['top', 'bottom', 'left', 'right'];
      direction = dirs[Math.floor(Math.random() * dirs.length)];
    }
    switch (direction) {
      case 'top':    return { x: item.x, y: -200 };
      case 'bottom': return { x: item.x, y: window.innerHeight + 200 };
      case 'left':   return { x: -200, y: item.y };
      case 'right':  return { x: window.innerWidth + 200, y: item.y };
      case 'center': return { x: containerRect.width / 2 - item.w / 2, y: containerRect.height / 2 - item.h / 2 };
      default:       return { x: item.x, y: item.y + 100 };
    }
  };

  useEffect(() => {
    preloadImages(items.map(i => i.img)).then(() => setImagesReady(true));
  }, [items]);

  const grid = useMemo(() => {
    if (!width) return [];
    const gap = 16;
    const colHeights = new Array(columns).fill(0);
    const colWidth = (width - (columns - 1) * gap) / columns;
    return items.map(child => {
      const col = colHeights.indexOf(Math.min(...colHeights));
      const x = col * (colWidth + gap);
      const h = child.height / 2;
      const y = colHeights[col];
      colHeights[col] += h + gap;
      return { ...child, x, y, w: colWidth, h };
    });
  }, [columns, items, width]);

  const hasMounted = useRef(false);

  useLayoutEffect(() => {
    if (!imagesReady) return;
    grid.forEach((item, index) => {
      const sel = `[data-key="${item.id}"]`;
      const animProps = { x: item.x, y: item.y, width: item.w, height: item.h };
      if (!hasMounted.current) {
        const start = getInitialPosition(item);
        gsap.fromTo(sel,
          { opacity: 0, x: start.x, y: start.y, width: item.w, height: item.h, ...(blurToFocus && { filter: 'blur(10px)' }) },
          { opacity: 1, ...animProps, ...(blurToFocus && { filter: 'blur(0px)' }), duration: 0.8, ease: 'power3.out', delay: index * stagger }
        );
      } else {
        gsap.to(sel, { ...animProps, duration, ease, overwrite: 'auto' });
      }
    });
    hasMounted.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [grid, imagesReady, stagger, animateFrom, blurToFocus, duration, ease]);

  const totalHeight = grid.reduce((max, item) => Math.max(max, item.y + item.h), 0);

  const handleMouseEnter = (id, el) => {
    if (scaleOnHover) gsap.to(`[data-key="${id}"]`, { scale: hoverScale, duration: 0.3, ease: 'power2.out' });
    if (colorShiftOnHover) { const o = el.querySelector('.mn-overlay'); if (o) gsap.to(o, { opacity: 0.3, duration: 0.3 }); }
  };

  const handleMouseLeave = (id, el) => {
    if (scaleOnHover) gsap.to(`[data-key="${id}"]`, { scale: 1, duration: 0.3, ease: 'power2.out' });
    if (colorShiftOnHover) { const o = el.querySelector('.mn-overlay'); if (o) gsap.to(o, { opacity: 0, duration: 0.3 }); }
  };

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%', height: totalHeight || 'auto', minHeight: 100 }}>
      {grid.map(item => (
        <div
          key={item.id}
          data-key={item.id}
          style={{ position: 'absolute', boxSizing: 'content-box', willChange: 'transform, width, height, opacity', cursor: 'pointer' }}
          onClick={() => item.url && item.url !== '#' && window.open(item.url, '_blank', 'noopener')}
          onMouseEnter={e => handleMouseEnter(item.id, e.currentTarget)}
          onMouseLeave={e => handleMouseLeave(item.id, e.currentTarget)}
        >
          <div style={{
            position: 'relative', width: '100%', height: '100%',
            backgroundImage: `url(${item.img})`,
            backgroundSize: 'cover', backgroundPosition: 'center',
            borderRadius: 12,
            boxShadow: '0px 10px 50px -10px rgba(0,0,0,0.18)',
          }}>
            {colorShiftOnHover && (
              <div className="mn-overlay" style={{
                position: 'absolute', inset: 0, borderRadius: 12,
                background: 'linear-gradient(135deg, rgba(14,165,233,0.4), rgba(118,208,236,0.4))',
                opacity: 0, pointerEvents: 'none',
              }} />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Masonry;
