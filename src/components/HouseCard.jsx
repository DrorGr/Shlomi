import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Bed, Bath, Square } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { useTranslation } from '@/components/LanguageProvider';

export default function HouseCard({ house }) {
  const { t } = useTranslation();
  const progressPercentage = (house.tickets_sold / house.total_tickets) * 100;
  
  return (
    <Card className="overflow-hidden group hover:scale-[1.02] transition-all duration-500 premium-shadow bg-slate-800/80 backdrop-blur-sm border-0">
      <div className="relative overflow-hidden">
        <img 
          src={house.image_url} 
          alt={house.title}
          className="w-full h-48 sm:h-56 lg:h-64 object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
          <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 px-2 py-1 sm:px-3 text-xs sm:text-sm">
            {house.status === 'active' ? t('active') : t(house.status)}
          </Badge>
        </div>
        <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
          <div className="bg-slate-800/90 backdrop-blur-sm rounded-lg sm:rounded-xl px-2 py-1 sm:px-3 sm:py-2">
            <div className="text-xs sm:text-sm font-bold text-white">${house.price_value.toLocaleString()}</div>
            <div className="text-xs text-slate-400">{t('value')}</div>
          </div>
        </div>
      </div>
      
      <CardContent className="p-4 sm:p-5 lg:p-6">
        <div className="mb-4">
          <h3 className="text-lg sm:text-xl font-bold text-white mb-2 line-clamp-2">{house.title}</h3>
          <div className="flex items-center text-slate-400 mb-3">
            <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" />
            <span className="text-sm line-clamp-1">{house.location}</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6">
          <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 text-slate-400">
            <Bed className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="text-xs sm:text-sm font-medium">{house.bedrooms}</span>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 text-slate-400">
            <Bath className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="text-xs sm:text-sm font-medium">{house.bathrooms}</span>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 text-slate-400">
            <Square className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="text-xs sm:text-sm font-medium">{house.square_feet?.toLocaleString()}</span>
          </div>
        </div>

        <div className="mb-4 sm:mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs sm:text-sm font-medium text-slate-400">{t('ticketsSold')}</span>
            <span className="text-xs sm:text-sm font-bold text-white">
              {house.tickets_sold} / {house.total_tickets}
            </span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-1.5 sm:h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-1.5 sm:h-2 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
          <div className="flex-shrink-0">
            <div className="text-xl sm:text-2xl font-bold text-white">${house.ticket_price}</div>
            <div className="text-xs sm:text-sm text-slate-400">{t('perTicket')}</div>
          </div>
          <Link to={createPageUrl(`HouseDetail?id=${house.id}`)} className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white border-0 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300">
              {t('viewDetails')}
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}