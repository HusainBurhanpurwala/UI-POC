import React from 'react';
import { motion } from 'framer-motion';

interface TextSplitRevealProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  mode?: 'words' | 'chars';
  fontFamily?: string;
}

export const TextSplitReveal: React.FC<TextSplitRevealProps> = ({
  text,
  className = '',
  delay = 0.2,
  stagger = 0.04,
  mode = 'words',
  fontFamily,
}) => {
  const items = mode === 'words' ? text.split(' ') : text.split('');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 12,
      filter: 'blur(4px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`inline-block overflow-hidden ${className}`}
      style={{ fontFamily }}
    >
      {items.map((item, index) => (
        <motion.span
          key={index}
          variants={itemVariants}
          className="inline-block whitespace-pre"
        >
          {item}
          {mode === 'words' && index !== items.length - 1 ? ' ' : ''}
        </motion.span>
      ))}
    </motion.div>
  );
};
