import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const LoadingScreen = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => onLoadingComplete(), 500);
          return 100;
        }
        return prev + 10;
      });
    }, 150);
    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6 } }}
      className="fixed inset-0 z-[10000] bg-black flex items-center justify-center"
    >
      <div className="text-center px-8">

        {/* Spinning ring */}
        <div className="relative flex items-center justify-center mb-8">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="absolute w-28 h-28 rounded-full border-2 border-transparent border-t-gold-400 border-r-gold-400/40"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            className="absolute w-20 h-20 rounded-full border border-gold-600/30 border-b-gold-400/60"
          />
          {/* Center logo text */}
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-gold-400 font-playfair font-bold text-2xl z-10"
          >
            S
          </motion.span>
        </div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          className="text-5xl font-playfair font-bold text-gold-400 mb-2"
        >
          Samridhii
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-gold-400/50 text-xs tracking-[0.3em] uppercase mb-8"
        >
          Fine Indian Dining
        </motion.p>

        {/* Progress bar */}
        <div className="w-56 h-0.5 bg-gray-800 rounded-full overflow-hidden mx-auto mb-4">
          <motion.div
            className="h-full bg-gradient-to-r from-gold-600 to-gold-400"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 bg-gold-400 rounded-full"
              animate={{ scale: [1, 1.6, 1], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </div>

      </div>
    </motion.div>
  );
};

export default LoadingScreen;
