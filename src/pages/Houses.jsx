
import React, { useState, useEffect } from 'react';
import { House } from '@/api/entities';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, Filter } from 'lucide-react';
import HouseCard from '../components/HouseCard';
import { useTranslation } from '@/components/LanguageProvider';

export default function Houses() {
  const [houses, setHouses] = useState([]);
  const [filteredHouses, setFilteredHouses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [filterBy, setFilterBy] = useState('all');
  const { t } = useTranslation();

  useEffect(() => {
    loadHouses();
  }, []);

  useEffect(() => {
    filterAndSortHouses();
  }, [houses, searchTerm, sortBy, filterBy]);

  const loadHouses = async () => {
    const data = await House.list('-created_date');
    setHouses(data);
  };

  const filterAndSortHouses = () => {
    let filtered = houses.filter(house => {
      const matchesSearch = house.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          house.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesFilter = filterBy === 'all' || house.status === filterBy;
      
      return matchesSearch && matchesFilter;
    });

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price_low':
          return a.ticket_price - b.ticket_price;
        case 'price_high':
          return b.ticket_price - a.ticket_price;
        case 'value_high':
          return b.price_value - a.price_value;
        case 'tickets_left':
          return (a.total_tickets - a.tickets_sold) - (b.total_tickets - b.tickets_sold);
        default: // newest
          return new Date(b.created_date).getTime() - new Date(a.created_date).getTime();
      }
    });

    setFilteredHouses(filtered);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4">{t('propertiesTitle')}</h1>
          <p className="text-base sm:text-lg lg:text-xl text-slate-300">{t('propertiesSubtitle')}</p>
        </div>

        {/* Filters and Search */}
        <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8 premium-shadow border-0 border-slate-700">
          <div className="flex flex-col gap-4">
            <div className="relative">
              <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-slate-500 w-4 h-4 sm:w-5 sm:h-5" />
              <Input
                placeholder={t('searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 sm:pl-12 h-10 sm:h-12 border-slate-600 focus:border-indigo-500 rounded-xl bg-slate-900 text-slate-200 text-sm sm:text-base"
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="h-10 sm:h-12 rounded-xl border-slate-600 bg-slate-900 text-slate-200 text-sm sm:text-base">
                  <SelectValue placeholder={t('sortBy')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">{t('newestFirst')}</SelectItem>
                  <SelectItem value="price_low">{t('priceLowHigh')}</SelectItem>
                  <SelectItem value="price_high">{t('priceHighLow')}</SelectItem>
                  <SelectItem value="value_high">{t('valueHighLow')}</SelectItem>
                  <SelectItem value="tickets_left">{t('ticketsLeft')}</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterBy} onValueChange={setFilterBy}>
                <SelectTrigger className="h-10 sm:h-12 rounded-xl border-slate-600 bg-slate-900 text-slate-200 text-sm sm:text-base">
                  <Filter className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('allStatus')}</SelectItem>
                  <SelectItem value="active">{t('active')}</SelectItem>
                  <SelectItem value="sold_out">{t('soldOut')}</SelectItem>
                  <SelectItem value="ended">{t('ended')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-4 sm:mb-6">
          <p className="text-slate-400 text-sm sm:text-base">
            {t('showing')} {filteredHouses.length} {t('of')} {houses.length} {t('properties')}
          </p>
        </div>

        {/* Houses Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {filteredHouses.map(house => (
            <HouseCard key={house.id} house={house} />
          ))}
        </div>

        {filteredHouses.length === 0 && (
          <div className="text-center py-12 sm:py-16">
            <div className="text-slate-400 text-4xl sm:text-6xl mb-4">🏠</div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{t('noPropertiesFound')}</h3>
            <p className="text-slate-400 text-sm sm:text-base">{t('noPropertiesSubtitle')}</p>
          </div>
        )}
      </div>
    </div>
  );
}
