import { motion } from "framer-motion"

const Arrow = () => (
  <motion.svg
    width="150"
    height="15"
    viewBox="0 0 200 15"
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{
      duration: 0.8,
      delay: 0.5,
      ease: [0, 0.71, 0.2, 1.01]
    }}
  >
    <motion.line
      x1="10"
      y1="7.5"
      x2="190"
      y2="7.5"
      stroke="rgb(161, 161, 170)"
      strokeWidth="3"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1, delay: 0.8 }}
    />
    <motion.circle
      cx="10"
      cy="7.5"
      r="10"
      fill="rgb(161, 161, 170)"
      initial={{ scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 2, delay: 1, repeat: Infinity }}
    />
  </motion.svg>
);

export default Arrow
