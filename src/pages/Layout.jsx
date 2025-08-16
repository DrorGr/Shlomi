

import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Home, Trophy, User as UserIcon, Ticket as TicketIcon, Crown, Menu, ChevronDown, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { LanguageProvider, useTranslation } from './components/LanguageProvider';
import { User } from '@/api/entities';

const AppLayout = ({ children, currentPageName }) => {
  const { t, language, setLanguage } = useTranslation(); // Removed darkMode, setDarkMode
  const location = useLocation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await User.me();
        setUser(currentUser);
      } catch (e) {
        setUser(null);
      }
    };
    fetchUser();
  }, [location.pathname]); // Refetch user on route change

  const handleLogout = async () => {
    await User.logout();
    setUser(null);
    window.location.href = createPageUrl('Home');
  };

  const navigationItems = [
    { titleKey: 'navHome', url: createPageUrl("Home"), icon: Home },
    { titleKey: 'navHouses', url: createPageUrl("Houses"), icon: Trophy },
  ];

  const LanguageSwitcher = ({ isMobile = false }) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="px-2 h-9">
          {isMobile ? (
            <img
              src={language === 'en' ? 'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.5.0/flags/4x3/gb.svg' : 'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.5.0/flags/4x3/pl.svg'}
              alt="Selected language"
              className="w-6 rounded-sm"
            />
          ) : (
            <div className="flex items-center gap-2">
              <img
                src={language === 'en' ? 'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.5.0/flags/4x3/gb.svg' : 'https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.5.0/flags/4x3/pl.svg'}
                alt="Selected language"
                className="w-5 rounded-sm"
              />
              <span className="text-sm font-medium">{language.toUpperCase()}</span>
              <ChevronDown className="w-4 h-4" />
            </div>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-slate-800/90 backdrop-blur-sm border-slate-700">
        <DropdownMenuItem 
          onClick={() => setLanguage('en')} 
          className={`flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-slate-700 ${language === 'en' ? 'bg-slate-700' : ''}`}
        >
          <img src="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.5.0/flags/4x3/gb.svg" alt="UK Flag" className="w-5 mr-2 rounded-sm"/>
          <span className="font-medium">English</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => setLanguage('pl')} 
          className={`flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-slate-700 ${language === 'pl' ? 'bg-slate-700' : ''}`}
        >
          <img src="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/3.5.0/flags/4x3/pl.svg" alt="Polish Flag" className="w-5 mr-2 rounded-sm"/>
          <span className="font-medium">Polski</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  const UserNav = () => {
    if (!user) {
      return (
        <Button onClick={() => User.login()} className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white border-0 rounded-xl font-semibold h-9 px-4">
          {t('signIn')}
        </Button>
      );
    }

    const userInitials = user.full_name ? user.full_name.split(' ').map(n => n[0]).join('') : (user.email ? user.email[0].toUpperCase() : '');

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-9 w-9 rounded-full">
            <Avatar className="h-9 w-9">
              <AvatarImage src={user.avatar_url} alt={user.full_name} />
              <AvatarFallback className="bg-slate-700 text-slate-300 font-semibold">
                {userInitials}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 bg-slate-800/90 backdrop-blur-sm" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none text-white">{user.full_name}</p>
              <p className="text-xs leading-none text-slate-400">{user.email}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link to={createPageUrl('MyTickets')} className="flex items-center">
              <TicketIcon className="mr-2 h-4 w-4" />
              <span>{t('navMyTickets')}</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild className="cursor-pointer">
            <Link to={createPageUrl('Profile')} className="flex items-center">
              <UserIcon className="mr-2 h-4 w-4" />
              <span>{t('navProfile')}</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
            <LogOut className="mr-2 h-4 w-4" />
            <span>{t('logout')}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  return (
    <>
      <style>{`
        :root {
          --primary: #1a237e;
          --primary-light: #3949ab;
          --gold: #ffd700;
          --gold-dark: #ffc107;
        }
        .premium-shadow {
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.15);
        }
      `}</style>

      <div className="dark min-h-screen flex flex-col w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <header className="sticky top-0 z-50 w-full border-b border-slate-700 bg-slate-900/90 backdrop-blur-xl">
          <nav className="max-w-7xl mx-auto flex items-center justify-between h-16 px-4 sm:px-6">
            {/* Left: Logo */}
            <Link to={createPageUrl('Home')} className="flex items-center gap-2">
              <div className="w-9 h-9 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center premium-shadow">
                <Crown className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-white hidden sm:block">{t('dreamHome')}</h1>
            </Link>

            {/* Center: Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-2">
              {navigationItems.map((item) => (
                <Link key={item.titleKey} to={item.url}>
                   <Button 
                    variant="ghost"
                    className={`font-semibold text-base transition-all duration-200 ${location.pathname === item.url ? 'text-indigo-400' : 'text-slate-300 hover:text-white'}`}
                  >
                    {t(item.titleKey)}
                  </Button>
                </Link>
              ))}
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2">
              {/* Dark Mode Toggle removed */}

              <div className="hidden sm:block"> {/* Changed from lg:block */}
                <LanguageSwitcher />
              </div>

              <UserNav />
              
              {/* Mobile Menu */}
              <div className="lg:hidden flex items-center gap-2">
                <div className="sm:hidden"> {/* Mobile-only language switcher for screens < sm */}
                  <LanguageSwitcher isMobile={true}/>
                </div>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="text-slate-300">
                      <Menu className="w-6 h-6" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-[280px] bg-slate-900/95 backdrop-blur-xl border-slate-700">
                    <SheetHeader className="border-b border-slate-700 pb-4 mb-4">
                       <Link to={createPageUrl('Home')} className="flex items-center gap-2">
                         <div className="w-9 h-9 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center premium-shadow">
                           <Crown className="w-5 h-5 text-white" />
                         </div>
                         <h1 className="text-xl font-bold text-white">{t('dreamHome')}</h1>
                       </Link>
                    </SheetHeader>
                    <div className="flex flex-col space-y-2">
                       {navigationItems.map((item) => (
                         <Link key={`mobile-${item.titleKey}`} to={item.url}>
                           <Button 
                            variant="ghost"
                            className={`w-full justify-start text-lg h-12 gap-3 ${location.pathname === item.url ? 'bg-slate-800 text-indigo-400' : 'text-slate-300'}`}
                          >
                             <item.icon className="w-5 h-5" />
                             {t(item.titleKey)}
                           </Button>
                         </Link>
                       ))}
                      {/* LanguageSwitcher removed from here */}
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </nav>
        </header>

        <main className="flex-1">
          {children}
        </main>
      </div>
    </>
  );
};

export default function LayoutWrapper({ children, currentPageName }) {
  return (
    <LanguageProvider>
      <AppLayout currentPageName={currentPageName}>
        {children}
      </AppLayout>
    </LanguageProvider>
  )
}

