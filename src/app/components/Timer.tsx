'use client';
import { motion, AnimatePresence } from 'framer-motion';

interface TimerProps {
  targetDate: Date;
  isYearly: boolean;
  currentTime: Date;
}

const formatNumber = (num: number) => num.toString().padStart(2, '0');

export default function Timer({ targetDate, isYearly, currentTime }: TimerProps) {
  const calculateTimeLeft = () => {
    let targetDateCopy = new Date(targetDate);
    const now = currentTime;
    
    if (isYearly && targetDateCopy < now) {
      targetDateCopy.setFullYear(now.getFullYear() + 1);
    }

    const difference = targetDateCopy.getTime() - now.getTime();
    
    if (difference <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        hasArrived: true
      };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      hasArrived: false
    };
  };

  const timeLeft = calculateTimeLeft();

  return (
    <div className="mb-8">
      {timeLeft.hasArrived ? (
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="text-6xl font-bold text-white"
        >
          🎉 TIME TO CELEBRATE! 🎉
        </motion.div>
      ) : (
        <div className="flex justify-center items-center gap-1 md:gap-3">
          <DigitBox value={timeLeft.days} />
          <Colon />
          <DigitBox value={timeLeft.hours} />
          <Colon />
          <DigitBox value={timeLeft.minutes} />
          <Colon />
          <DigitBox value={timeLeft.seconds} />
        </div>
      )}
    </div>
  );
}

const DigitBox = ({ value }: { value: number }) => (
  <motion.div
    key={value}
    initial={{ y: -20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ type: 'spring', stiffness: 300 }}
    className="relative w-16 h-24 md:w-20 md:h-28 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center"
  >
    <span className="text-4xl md:text-5xl font-bold text-white">
      {formatNumber(value)}
    </span>
  </motion.div>
);

const Colon = () => (
  <motion.div
    className="text-4xl font-bold text-white/80"
    animate={{ opacity: [0.4, 1, 0.4] }}
    transition={{ duration: 2, repeat: Infinity }}
  >
    :
  </motion.div>
);