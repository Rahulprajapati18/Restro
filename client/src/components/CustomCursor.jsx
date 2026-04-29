import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const [clicking, setClicking] = useState(false);

  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    const over = (e) => setHovering(!!(e.target.closest('button') || e.target.closest('a')));
    const down = () => setClicking(true);
    const up = () => setClicking(false);

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseover', over);
    window.addEventListener('mousedown', down);
    window.addEventListener('mouseup', up);
    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseover', over);
      window.removeEventListener('mousedown', down);
      window.removeEventListener('mouseup', up);
    };
  }, []);

  // Chopstick: two thin rotated lines, slightly spread apart
  // On hover they pinch together, on click they close fully
  const spread = clicking ? 0 : hovering ? 4 : 10;

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999]"
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 600, damping: 30 }}
    >
      {/* Chopstick 1 — left stick */}
      <motion.div
        animate={{ rotate: -(30 + spread), x: -spread }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        style={{ position: 'absolute', top: 0, left: 0, transformOrigin: 'bottom center' }}
      >
        {/* Stick body */}
        <div
          style={{
            width: 3,
            height: 38,
            borderRadius: 4,
            background: 'linear-gradient(to bottom, #d4af37, #8B6914)',
            boxShadow: '0 0 6px rgba(212,175,55,0.5)',
          }}
        />
        {/* Tip glow */}
        <div
          style={{
            width: 5,
            height: 5,
            borderRadius: '50%',
            background: '#d4af37',
            boxShadow: '0 0 8px 2px rgba(212,175,55,0.8)',
            marginLeft: -1,
            marginTop: 1,
          }}
        />
      </motion.div>

      {/* Chopstick 2 — right stick */}
      <motion.div
        animate={{ rotate: (30 + spread), x: spread }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        style={{ position: 'absolute', top: 0, left: 0, transformOrigin: 'bottom center' }}
      >
        <div
          style={{
            width: 3,
            height: 38,
            borderRadius: 4,
            background: 'linear-gradient(to bottom, #d4af37, #8B6914)',
            boxShadow: '0 0 6px rgba(212,175,55,0.5)',
          }}
        />
        <div
          style={{
            width: 5,
            height: 5,
            borderRadius: '50%',
            background: '#d4af37',
            boxShadow: '0 0 8px 2px rgba(212,175,55,0.8)',
            marginLeft: -1,
            marginTop: 1,
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default CustomCursor;
