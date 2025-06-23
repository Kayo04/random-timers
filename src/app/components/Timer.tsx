interface TimerProps {
  targetDate: Date;
  isYearly: boolean;
  currentTime: Date;
}

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
  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  return (
    <div className="mb-8">
      {timeLeft.hasArrived ? (
        <div className="text-6xl font-black text-gray-900">
          IT'S TIME! 🎉
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-center gap-2">
            <div className="text-6xl font-black text-gray-900">
              {timeLeft.days}
            </div>
            <div className="text-6xl font-black text-gray-900">:</div>
            <div className="text-6xl font-black text-gray-900">
              {formatNumber(timeLeft.hours)}
            </div>
            <div className="text-6xl font-black text-gray-900">:</div>
            <div className="text-6xl font-black text-gray-900">
              {formatNumber(timeLeft.minutes)}
            </div>
            <div className="text-6xl font-black text-gray-900">:</div>
            <div className="text-6xl font-black text-gray-900">
              {formatNumber(timeLeft.seconds)}
            </div>
          </div>
          <div className="flex justify-center gap-8">
            <span className="text-xl font-black text-gray-900">DAYS</span>
            <span className="text-xl font-black text-gray-900">HOURS</span>
            <span className="text-xl font-black text-gray-900">MINS</span>
            <span className="text-xl font-black text-gray-900">SECS</span>
          </div>
        </div>
      )}
    </div>
  );
}