'use client';
import { useState, useEffect } from 'react';
import { FaBirthdayCake, FaRocket, FaHeart, FaCampground } from 'react-icons/fa';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';

const Timer = dynamic(() => import('@/app/components/Timer'), {
  ssr: false,
  loading: () => <div className="h-40 flex items-center justify-center">Loading...</div>
});

const timers = [
  { 
    id: 1, 
    name: 'GTA VI LAUNCH', 
    icon: <FaRocket className="text-3xl" />, 
    color: 'from-blue-500 to-indigo-600',
    targetDate: new Date('2026-05-26'),
    isYearly: false
  },
  { 
    id: 2, 
    name: 'LOVE ANNIVERSARY', 
    icon: <FaHeart className="text-3xl" />, 
    color: 'from-rose-500 to-pink-600',
    targetDate: new Date(new Date().getFullYear() + '-04-20'),
    isYearly: true
  },
  { 
    id: 3, 
    name: 'NEXT ADVENTURE', 
    icon: <FaCampground className="text-3xl" />, 
    color: 'from-emerald-500 to-teal-600',
    targetDate: new Date(new Date().getFullYear() + '-06-09'),
    isYearly: true
  },
  { 
    id: 4, 
    name: 'MY BIRTHDAY', 
    icon: <FaBirthdayCake className="text-3xl" />, 
    color: 'from-purple-500 to-violet-600',
    targetDate: new Date(new Date().getFullYear() + '-11-24'),
    isYearly: true
  },
];

export default function Home() {
  const [activeTimer, setActiveTimer] = useState(timers[0]);
  const [bgGradient, setBgGradient] = useState(timers[0].color);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleTimerChange = (timer: typeof timers[0]) => {
    setActiveTimer(timer);
    setBgGradient(timer.color);
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${bgGradient} transition-all duration-1000`}>
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row h-screen">
          {/* Sidebar */}
          <div className="w-full md:w-24 flex md:flex-row md:flex-col justify-center gap-6 p-6 md:p-4">
            {timers.map((timer) => (
              <motion.button
                key={timer.id}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleTimerChange(timer)}
                className={`p-4 rounded-2xl backdrop-blur-sm transition-all ${
                  activeTimer.id === timer.id 
                    ? 'bg-white/30 shadow-lg' 
                    : 'bg-black/10 hover:bg-black/20'
                }`}
              >
                {timer.icon}
              </motion.button>
            ))}
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTimer.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-3xl"
              >
                <motion.h1 
                  className="text-5xl md:text-6xl font-bold mb-8 text-white drop-shadow-lg"
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {activeTimer.name}
                </motion.h1>
                
                <Timer 
                  targetDate={activeTimer.targetDate} 
                  isYearly={activeTimer.isYearly} 
                  currentTime={currentTime}
                />
                
                <motion.p 
                  className="mt-8 text-xl md:text-2xl font-medium text-white/80"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  Until {activeTimer.targetDate.toLocaleDateString('en-US', { 
                    month: 'long', 
                    day: 'numeric', 
                    year: activeTimer.isYearly ? undefined : 'numeric' 
                  })}
                </motion.p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}