import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { useTranslation } from '@/components/LanguageProvider';

export default function CountdownTimer({ targetDate, title }) {
  const { t } = useTranslation();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const finalTitle = title || t('nextDrawIn');

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate).getTime() - new Date().getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 rounded-2xl p-4 sm:p-6 lg:p-8 text-white premium-shadow">
      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
        <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-300" />
        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold">{finalTitle}</h3>
      </div>
      
      <div className="grid grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
        {[
          { value: timeLeft.days, label: t('days') },
          { value: timeLeft.hours, label: t('hours') },
          { value: timeLeft.minutes, label: t('minutes') },
          { value: timeLeft.seconds, label: t('seconds') }
        ].map(({ value, label }) => (
          <div key={label} className="text-center">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg sm:rounded-xl p-2 sm:p-3 lg:p-4 mb-1 sm:mb-2">
              <div className="text-xl sm:text-2xl lg:text-3xl font-bold font-mono">
                {String(value).padStart(2, '0')}
              </div>
            </div>
            <div className="text-xs sm:text-sm font-medium text-white/80">{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}