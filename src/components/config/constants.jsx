import { Trophy, Users, Star } from 'lucide-react';

/**
 * Number of featured properties to show on the home page.
 */
export const FEATURED_HOUSES_COUNT = 3;

/**
 * Data for the statistics section on the home page.
 */
export const HOME_PAGE_STATS = [
  { icon: Trophy, titleKey: 'propertiesWon', value: '127+', color: 'from-yellow-500 to-orange-500' },
  { icon: Users, titleKey: 'happyWinners', value: '89', color: 'from-green-500 to-emerald-500' },
  { icon: Star, titleKey: 'totalValue', value: '$45M+', color: 'from-blue-500 to-indigo-500' }
];

/**
 * Maximum number of tickets that can be purchased at once.
 */
export const MAX_TICKET_PURCHASE = 10;