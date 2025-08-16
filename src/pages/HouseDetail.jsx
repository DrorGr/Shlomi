
import React, { useState, useEffect } from 'react';
import { House } from '@/api/entities';
import { Ticket } from '@/api/entities';
import { User } from '@/api/entities';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Bed, Bath, Square, Star } from 'lucide-react';
import { useTranslation } from '@/components/LanguageProvider';

export default function HouseDetail() {
  const [house, setHouse] = useState(null);
  const [user, setUser] = useState(null);
  const [ticketQuantity, setTicketQuantity] = useState(1);
  const [isPurchasing, setIsPurchasing] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { t } = useTranslation();

  const urlParams = new URLSearchParams(window.location.search);
  const houseId = urlParams.get('id');

  useEffect(() => {
    if (houseId) {
      loadHouseDetails();
      loadUser();
    }
  }, [houseId]);

  const loadHouseDetails = async () => {
    const houses = await House.filter({ id: houseId });
    if (houses.length > 0) {
      setHouse(houses[0]);
    }
  };

  const loadUser = async () => {
    try {
      const currentUser = await User.me();
      setUser(currentUser);
    } catch (error) {
      console.log('User not authenticated');
    }
  };

  const handlePurchase = async () => {
    if (!user || !house) {
      User.login();
      return;
    }

    setIsPurchasing(true);
    try {
      const total = house.ticket_price * ticketQuantity;
      const ticketNumbers = Array.from({ length: ticketQuantity }, (_, i) => 
        `T${Date.now()}-${i + 1}`
      );

      await Ticket.create({
        house_id: house.id,
        user_email: user.email,
        ticket_numbers: ticketNumbers,
        quantity: ticketQuantity,
        total_paid: total
      });

      // Update house tickets sold
      const newTicketsSold = house.tickets_sold + ticketQuantity;
      await House.update(house.id, {
        tickets_sold: newTicketsSold,
        status: newTicketsSold >= house.total_tickets ? 'sold_out' : house.status
      });

      setHouse(prev => prev ? ({
        ...prev,
        tickets_sold: newTicketsSold,
        status: newTicketsSold >= prev.total_tickets ? 'sold_out' : prev.status
      }) : null);

      alert(`Successfully purchased ${ticketQuantity} ticket(s)!`);
    } catch (error) {
      console.error('Purchase failed:', error);
    }
    setIsPurchasing(false);
  };

  if (!house) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-slate-400 text-sm sm:text-base">{t('loadingDetails')}</p>
        </div>
      </div>
    );
  }

  const progressPercentage = (house.tickets_sold / house.total_tickets) * 100;
  const remainingTickets = house.total_tickets - house.tickets_sold;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 sm:py-6 lg:py-8">
        {/* Image Gallery */}
        <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
          <div className="space-y-3 sm:space-y-4">
            <div className="aspect-[4/3] overflow-hidden rounded-xl sm:rounded-2xl premium-shadow">
              <img 
                src={house.gallery_images?.[selectedImageIndex] || house.image_url} 
                alt={house.title}
                className="w-full h-full object-cover"
              />
            </div>
            {house.gallery_images && house.gallery_images.length > 1 && (
              <div className="grid grid-cols-4 gap-1 sm:gap-2">
                {house.gallery_images.slice(0, 4).map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`aspect-square overflow-hidden rounded-md sm:rounded-lg border-2 transition-all duration-300 ${
                      selectedImageIndex === index ? 'border-indigo-500' : 'border-slate-700'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Property Info */}
          <div className="space-y-4 sm:space-y-6">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <Badge className="self-start bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 px-2 py-1 sm:px-3 text-xs sm:text-sm">
                  {house.status === 'active' ? t('active') : t(house.status)}
                </Badge>
                <div className="text-2xl sm:text-3xl font-bold text-white">
                  ${house.price_value?.toLocaleString()}
                </div>
              </div>
              
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-3">{house.title}</h1>
              
              <div className="flex items-center text-slate-400 mb-4 sm:mb-6">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                <span className="text-base sm:text-lg">{house.location}</span>
              </div>

              <div className="grid grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6">
                <div className="text-center p-3 sm:p-4 bg-slate-800/80 rounded-lg sm:rounded-xl">
                  <Bed className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-1 sm:mb-2 text-slate-400" />
                  <div className="text-lg sm:text-xl lg:text-2xl font-bold text-white">{house.bedrooms}</div>
                  <div className="text-xs sm:text-sm text-slate-400">{t('bedrooms')}</div>
                </div>
                <div className="text-center p-3 sm:p-4 bg-slate-800/80 rounded-lg sm:rounded-xl">
                  <Bath className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-1 sm:mb-2 text-slate-400" />
                  <div className="text-lg sm:text-xl lg:text-2xl font-bold text-white">{house.bathrooms}</div>
                  <div className="text-xs sm:text-sm text-slate-400">{t('bathrooms')}</div>
                </div>
                <div className="text-center p-3 sm:p-4 bg-slate-800/80 rounded-lg sm:rounded-xl">
                  <Square className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-1 sm:mb-2 text-slate-400" />
                  <div className="text-lg sm:text-xl lg:text-2xl font-bold text-white">{house.square_feet?.toLocaleString()}</div>
                  <div className="text-xs sm:text-sm text-slate-400">{t('sqFt')}</div>
                </div>
              </div>
            </div>

            {/* Ticket Progress */}
            <Card className="bg-slate-800/90 backdrop-blur-sm border-0 premium-shadow">
              <CardContent className="p-4 sm:p-6">
                <div className="flex justify-between items-center mb-3 sm:mb-4">
                  <span className="text-base sm:text-lg font-semibold text-white">{t('ticketsSold')}</span>
                  <span className="text-base sm:text-lg font-bold text-white">
                    {house.tickets_sold} / {house.total_tickets}
                  </span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2 sm:h-3 mb-3 sm:mb-4">
                  <div 
                    className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 sm:h-3 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
                <div className="text-center text-slate-400 text-sm sm:text-base">
                  <span className="font-semibold">{remainingTickets}</span> {t('tickets')} {t('remaining')}
                </div>
              </CardContent>
            </Card>

            {/* Purchase Section */}
            <Card className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 border-0 premium-shadow">
              <CardContent className="p-4 sm:p-6">
                <div className="text-center mb-4 sm:mb-6">
                  <div className="text-2xl sm:text-3xl font-bold text-white">${house.ticket_price}</div>
                  <div className="text-slate-300 text-sm sm:text-base">{t('perTicket')}</div>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <label className="text-slate-300 font-medium text-sm sm:text-base">{t('quantity')}:</label>
                  <Input
                    type="number"
                    min="1"
                    max="10"
                    value={ticketQuantity}
                    onChange={(e) => setTicketQuantity(parseInt(e.target.value) || 1)}
                    className="w-20 sm:w-24 text-center h-10 sm:h-12 bg-slate-800 border-slate-600 text-slate-200"
                  />
                  <div className="text-base sm:text-lg font-semibold text-white">
                    {t('total')}: ${(house.ticket_price * ticketQuantity).toFixed(2)}
                  </div>
                </div>

                <Button
                  onClick={handlePurchase}
                  disabled={isPurchasing || house.status !== 'active'}
                  className="w-full h-12 sm:h-14 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white border-0 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300"
                >
                  {isPurchasing ? t('processing') : !user ? t('signInToPurchase') : `${t('purchase')} ${ticketQuantity} ${ticketQuantity > 1 ? t('tickets') : t('ticket')}`}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Description and Features */}
        <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          <Card className="bg-slate-800/90 backdrop-blur-sm border-0 premium-shadow">
            <CardContent className="p-4 sm:p-6 lg:p-8">
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-3 sm:mb-4">{t('propertyDescription')}</h3>
              <p className="text-slate-300 leading-relaxed text-sm sm:text-base">{house.description}</p>
            </CardContent>
          </Card>

          {house.features && house.features.length > 0 && (
            <Card className="bg-slate-800/90 backdrop-blur-sm border-0 premium-shadow">
              <CardContent className="p-4 sm:p-6 lg:p-8">
                <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-3 sm:mb-4">{t('featuresAndAmenities')}</h3>
                <div className="grid grid-cols-1 gap-2 sm:gap-3">
                  {house.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2 sm:gap-3">
                      <Star className="w-3 h-3 sm:w-4 sm:h-4 text-indigo-400 flex-shrink-0" />
                      <span className="text-slate-300 text-sm sm:text-base">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
