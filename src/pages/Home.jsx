
import React, { useState, useEffect } from 'react';
import { House } from '@/api/entities';
import { User } from '@/api/entities';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { Crown, ArrowRight } from 'lucide-react';
import CountdownTimer from '../components/CountdownTimer';
import HouseCard from '../components/HouseCard';
import { useTranslation } from '@/components/LanguageProvider';
import { FEATURED_HOUSES_COUNT, HOME_PAGE_STATS } from '@/components/config/constants';

export default function Home() {
  const [houses, setHouses] = useState([]);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const currentUser = await User.me();
        setUser(currentUser);
      } catch (error) {
        console.log('User not authenticated, viewing as guest.');
        setUser(null);
      }
      
      const houseData = await House.list('-created_date', FEATURED_HOUSES_COUNT);
      setHouses(houseData);
      setIsLoading(false);
    };
    loadData();
  }, []);

  const nextDraw = new Date();
  nextDraw.setDate(nextDraw.getDate() + 7);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-800/30 to-purple-800/30" />
        <div className="relative max-w-7xl mx-auto px-4 py-12 sm:px-6 sm:py-16 lg:py-32">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-slate-800/80 backdrop-blur-sm rounded-full px-4 py-2 sm:px-6 sm:py-3 mb-6 sm:mb-8 premium-shadow">
              <Crown className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-400" />
              <span className="text-slate-200 font-semibold text-sm sm:text-base">{t('dreamHome')} {t('lotteryPlatform')}</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight">
              {t('heroTitle')}
              <span className="bg-gradient-to-r from-[var(--gradient-from)] to-[var(--gradient-to)] bg-clip-text text-transparent">{t('heroTitleSpan')}</span>
            </h1>
            
            <p className="text-base sm:text-lg lg:text-xl text-slate-300 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-4">
              {t('heroSubtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center px-4">
              <Link to={createPageUrl('Houses')}>
                <Button className="w-full sm:w-auto bg-gradient-to-r from-[var(--gradient-from)] to-[var(--gradient-to)] hover:from-[var(--gradient-hover-from)] hover:to-[var(--gradient-hover-to)] text-white border-0 px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold h-auto transition-all duration-300">
                  {user ? t('viewHouses') : t('browseProperties')}
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                </Button>
              </Link>
              
              <Button 
                variant="outline" 
                className="w-full sm:w-auto border-slate-600 text-slate-300 hover:bg-slate-800 px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold h-auto transition-all duration-300"
              >
                {t('learnMore')}
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 sm:py-12 lg:py-16">
        {/* Countdown Timer */}
        <div className="mb-12 sm:mb-16">
          <CountdownTimer targetDate={nextDraw} title={t('nextDrawIn')} />
        </div>

        {/* Stats Section - One line on mobile, three columns on desktop */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6 mb-12 sm:mb-16">
          {HOME_PAGE_STATS.map(({ icon: Icon, titleKey, value, color }) => (
            <div key={titleKey} className="bg-slate-800/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-2 sm:p-4 md:p-6 premium-shadow border-0 text-center">
              <div className={`w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-gradient-to-r ${color} rounded-lg sm:rounded-xl mx-auto mb-2 sm:mb-3 md:mb-4 flex items-center justify-center`}>
                <Icon className="w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white" />
              </div>
              <div className="text-lg sm:text-2xl md:text-3xl font-bold text-white mb-1 sm:mb-2">{value}</div>
              <div className="text-slate-300 font-medium text-xs sm:text-sm md:text-base">{t(titleKey)}</div>
            </div>
          ))}
        </div>

        {/* Featured Houses */}
        <section>
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">{t('featuredProperties')}</h2>
            <p className="text-lg sm:text-xl text-slate-300">{t('featuredSubtitle')}</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
            {houses.map(house => (
              <HouseCard key={house.id} house={house} />
            ))}
          </div>
          
          <div className="text-center">
            <Link to={createPageUrl('Houses')}>
              <Button className="w-full sm:w-auto bg-gradient-to-r from-[var(--gradient-from)] to-[var(--gradient-to)] hover:from-[var(--gradient-hover-from)] hover:to-[var(--gradient-hover-to)] text-white border-0 px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold h-auto transition-all duration-300">
                {t('viewAllProperties')}
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
