
import React, { useState, useEffect } from 'react';
import { Ticket } from '@/api/entities';
import { House } from '@/api/entities';
import { User } from '@/api/entities';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TicketIcon, Home, Calendar, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { useTranslation } from '@/components/LanguageProvider';

export default function MyTickets() {
  const [tickets, setTickets] = useState([]);
  const [houses, setHouses] = useState({});
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = async () => {
    try {
      const currentUser = await User.me();
      setUser(currentUser);

      if (currentUser) {
        const userTickets = await Ticket.filter({ user_email: currentUser.email });
        setTickets(userTickets);

        const houseIds = [...new Set(userTickets.map(ticket => ticket.house_id))];
        if (houseIds.length > 0) {
          const housePromises = houseIds.map(id => House.filter({ id }));
          const houseResults = await Promise.all(housePromises);
          
          const housesMap = {};
          houseResults.forEach(result => {
            if (result.length > 0) {
              housesMap[result[0].id] = result[0];
            }
          });
          setHouses(housesMap);
        }
      }
    } catch (error) {
      console.log('User not authenticated');
    }
    setIsLoading(false);
  };

  const totalSpent = tickets.reduce((sum, ticket) => sum + ticket.total_paid, 0);
  const totalTicketsCount = tickets.reduce((sum, ticket) => sum + ticket.quantity, 0);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <Card className="w-full max-w-md premium-shadow border-0 bg-slate-800/90 backdrop-blur-sm">
          <CardContent className="p-8 text-center">
            <TicketIcon className="w-16 h-16 mx-auto mb-4 text-slate-500" />
            <h2 className="text-2xl font-bold text-white mb-4">{t('signInRequired')}</h2>
            <p className="text-slate-400 mb-6">{t('signInToViewTickets')}</p>
            <Button 
              onClick={() => User.login()}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white border-0 rounded-xl font-semibold"
            >
              {t('signIn')}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-slate-400">{t('loadingTickets')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">{t('myTicketsTitle')}</h1>
          <p className="text-xl text-slate-300">{t('myTicketsSubtitle')}</p>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white border-0 premium-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">{t('totalTickets')}</p>
                  <p className="text-3xl font-bold">{totalTicketsCount}</p>
                </div>
                <TicketIcon className="w-12 h-12 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0 premium-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">{t('totalSpent')}</p>
                  <p className="text-3xl font-bold">${totalSpent.toFixed(2)}</p>
                </div>
                <DollarSign className="w-12 h-12 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-pink-600 text-white border-0 premium-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">{t('properties')}</p>
                  <p className="text-3xl font-bold">{Object.keys(houses).length}</p>
                </div>
                <Home className="w-12 h-12 text-purple-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tickets List */}
        <div className="space-y-6">
          {tickets.length === 0 ? (
            <Card className="bg-slate-800/90 backdrop-blur-sm border-0 premium-shadow">
              <CardContent className="p-12 text-center">
                <TicketIcon className="w-16 h-16 mx-auto mb-4 text-slate-500" />
                <h3 className="text-2xl font-bold text-white mb-2">{t('noTicketsYet')}</h3>
                <p className="text-slate-400 mb-6">{t('noTicketsSubtitle')}</p>
                <Link to={createPageUrl('Houses')}>
                  <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white border-0 rounded-xl font-semibold">
                    {t('browseProperties')}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            tickets.map(ticket => {
              const house = houses[ticket.house_id];
              if (!house) return null;

              return (
                <Card key={ticket.id} className="bg-slate-800/90 backdrop-blur-sm border-0 border-slate-700 premium-shadow hover:scale-[1.01] transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row gap-6">
                      <div className="lg:w-48 h-32 overflow-hidden rounded-xl">
                        <img 
                          src={house.image_url} 
                          alt={house.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex flex-col lg:flex-row lg:items-start justify-between mb-4">
                          <div>
                            <h3 className="text-2xl font-bold text-white mb-2">{house.title}</h3>
                            <p className="text-slate-400 flex items-center gap-1">
                              <Home className="w-4 h-4" />
                              {house.location}
                            </p>
                          </div>
                          
                          <div className="flex gap-2 mt-4 lg:mt-0">
                            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0">
                              {t(ticket.payment_status)}
                            </Badge>
                            <Badge variant="outline" className="border-slate-600 text-slate-300">
                              {ticket.quantity} {ticket.quantity > 1 ? t('tickets') : t('ticket')}
                            </Badge>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-4 mb-4">
                          <div>
                            <p className="text-sm text-slate-400">{t('ticketNumbers')}</p>
                            <p className="font-mono text-sm font-semibold text-white">
                              {ticket.ticket_numbers?.slice(0, 3).join(', ')}
                              {ticket.ticket_numbers?.length > 3 && ` +${ticket.ticket_numbers.length - 3} ${t('more')}`}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-slate-400">{t('amountPaid')}</p>
                            <p className="text-lg font-bold text-white">${ticket.total_paid}</p>
                          </div>
                          <div>
                            <p className="text-sm text-slate-400">{t('purchaseDate')}</p>
                            <p className="font-semibold text-white flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {new Date(ticket.created_date).toLocaleDateString()}
                            </p>
                          </div>
                        </div>

                        <Link to={createPageUrl(`HouseDetail?id=${house.id}`)}>
                          <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800 rounded-xl">
                            {t('viewProperty')}
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
