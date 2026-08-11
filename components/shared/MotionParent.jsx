'use client';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function AnimatedBlock({ children, direction = 'up', className = '' }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const getInitial = () => {
    switch (direction) {
      case 'left':
        return { opacity: 0, x: -40 };
      case 'right':
        return { opacity: 0, x: 40 };
      case 'up':
      default:
        return { opacity: 0, y: 40 };
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={getInitial()}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`${className} w-full `}
    >
      {children}
    </motion.div>
  );
}
