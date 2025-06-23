'use client';
import { useState, useEffect } from 'react';
import { FaBirthdayCake } from 'react-icons/fa';
import { GiPistolGun, GiCampingTent, GiHearts } from 'react-icons/gi';
import Timer from '@/app/components/Timer';
import IconButton from '@/app/components/IconButton';

const timers = [
  { 
    id: 1, 
    name: 'GTA 6 RELEASE', 
    icon: <GiPistolGun />, 
    color: 'bg-blue-400',
    targetDate: new Date('2026-05-26'),
    isYearly: false
  },
  { 
    id: 2, 
    name: 'ANNIVERSARY', 
    icon: <GiHearts />, 
    color: 'bg-red-400',
    targetDate: new Date(new Date().getFullYear() + '-04-20'),
    isYearly: true
  },
  { 
    id: 3, 
    name: 'CAMPING TRIP', 
    icon: <GiCampingTent />, 
    color: 'bg-green-400',
    targetDate: new Date(new Date().getFullYear() + '-06-09'),
    isYearly: true
  },
  { 
    id: 4, 
    name: 'MY BIRTHDAY', 
    icon: <FaBirthdayCake />, 
    color: 'bg-purple-400',
    targetDate: new Date(new Date().getFullYear() + '-11-24'),
    isYearly: true
  },
];

export default function Home() {
  const [activeTimer, setActiveTimer] = useState(timers[0]);
  const [bgColor, setBgColor] = useState(timers[0].color);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update current time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleTimerChange = (timer: typeof timers[0]) => {
    // Calculate time left immediately when switching
    const now = new Date();
    let targetDate = new Date(timer.targetDate);
    
    if (timer.isYearly && targetDate < now) {
      targetDate.setFullYear(now.getFullYear() + 1);
    }
    
    setActiveTimer(timer);
    setBgColor(timer.color);
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${bgColor}`}>
      <div className="container mx-auto px-0">
        <div className="flex">
          <div className="w-20 flex flex-col gap-6 p-4 items-center">
            {timers.map((timer) => (
              <IconButton
                key={timer.id}
                icon={timer.icon}
                isActive={activeTimer.id === timer.id}
                onClick={() => handleTimerChange(timer)}
              />
            ))}
          </div>

          <div className="flex-1 flex flex-col items-center justify-center text-center min-h-screen py-12 px-4">
            <div className="w-full max-w-2xl">
              <h1 className="text-5xl font-black mb-8 text-gray-900">
                {activeTimer.name}
              </h1>
              
              <Timer 
                targetDate={activeTimer.targetDate} 
                isYearly={activeTimer.isYearly} 
                currentTime={currentTime}
              />
              
              <p className="mt-8 text-2xl font-black text-gray-900">
                UNTIL {activeTimer.targetDate.toLocaleDateString('en-US', { 
                  month: 'long', 
                  day: 'numeric', 
                  year: activeTimer.isYearly ? undefined : 'numeric' 
                }).toUpperCase()}
              </p>
              
              <p className="mt-8 text-xl font-bold text-gray-800">
                CLICK ICONS TO CHANGE TIMERS
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}