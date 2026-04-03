import type { DataPlan, Service, NavItem, Transaction, BluePointHistory, Task, Streak, Announcement, Notification, LoyaltyItem, GroupPayment } from '@/types';
import { ENDPOINTS, getRequest} from '@/types';

export const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: 'LayoutGrid', path: '/dashboard' },
  { id: 'wallet', label: 'Wallet', icon: 'Wallet', path: '/wallet' },
  { id: 'airtime', label: 'Buy Airtime', icon: 'Smartphone', path: '/airtime' },
  { id: 'data', label: 'Buy Data', icon: 'Wifi', path: '/data' },
  { id: 'marketplace', label: 'Market Place', icon: 'Store', path: '/marketplace' },
  { id: 'services', label: 'Services', icon: 'Globe', path: '/services' },
  { id: 'rewards', label: 'Rewards', icon: 'Gift', path: '/rewards' },
  { id: 'notifications', label: 'Notifications', icon: 'Bell', path: '/notifications' },
];



export const services: Service[] = [
  { id: '1', name: 'BlueVault', icon: 'Vault', category: 'Special Features' },
  { id: '2', name: 'Group Payment', icon: 'Users', category: 'Special Features' },
  { id: '3', name: 'Smart-top-up', icon: 'RefreshCw', category: 'Special Features', comingSoon: true },
  { id: '4', name: 'Airtime', icon: 'Smartphone', category: 'Airtime & Data' },
  { id: '5', name: 'Data', icon: 'Wifi', category: 'Airtime & Data' },
  { id: '6', name: 'Light Bills', icon: 'Zap', category: 'Bills & Utilities' },
  { id: '7', name: 'TV subs', icon: 'Tv', category: 'Bills & Utilities', comingSoon: true },
  { id: '8', name: 'Wallet', icon: 'Wallet', category: 'Wallet' },
  { id: '9', name: 'Gift Card', icon: 'Gift', category: 'Wallet', comingSoon: true },
  { id: '10', name: 'Referral/Reward', icon: 'Share2', category: 'Value Added' },
  { id: '11', name: 'Blue Point', icon: 'Coins', category: 'Value Added' },
  { id: '12', name: 'Airtime Buyback', icon: 'RefreshCw', category: 'Special Features' },
];
  
export const TransactionsData= async ():Promise<Transaction[]> => {
  try {
    const response = await getRequest(ENDPOINTS.history);
    
    const page_length = Math.ceil(response.count / 5);

    // Create an array of page numbers [1, 2, 3...]
    const pages = Array.from({ length: page_length }, (_, i) => i + 1);

    // Fetch all pages in parallel (much faster than a sequential for-loop)
    const pageResults = await Promise.all(
      pages.map(page => getRequest(`${ENDPOINTS.history}?page=${page}`))
    );
    console.log(pageResults)

    // Flatten all results into a single array and filter out any empty/undefined entries
    const allData = pageResults
      .flatMap(page => page.results)
      .filter(item => item !== undefined);
    return allData;
  } catch (error) {
    console.error("Failed to fetch transactions:", error);
    return []; // Return empty array on failure to prevent UI crashes
  }
};



// BluePoints History
export const bluePointHistory: BluePointHistory[] = [
  { id: '1', source: 'Airtime Purchase', points: 10, date: '2025-03-15', type: 'earned' },
  { id: '2', source: 'Data Purchase', points: 5, date: '2025-03-14', type: 'earned' },
  { id: '3', source: 'Daily Login', points: 2, date: '2025-03-14', type: 'earned' },
  { id: '4', source: 'Referral Bonus', points: 50, date: '2025-03-12', type: 'earned' },
  { id: '5', source: 'Points Redeemed', points: -100, date: '2025-03-10', type: 'redeemed' },
  { id: '6', source: 'Task Completed', points: 20, date: '2025-03-08', type: 'earned' },
];

// Tasks
export const tasks: Task[] = [
  { id: '1', title: 'Buy Airtime', description: 'Purchase airtime worth ₦500 or more', rewardPoints: 10, completed: true, icon: 'Smartphone' },
  { id: '2', title: 'Buy Data', description: 'Purchase a data plan', rewardPoints: 5, completed: true, icon: 'Wifi' },
  { id: '3', title: 'Refer a Friend', description: 'Invite a friend to join BlueSea', rewardPoints: 50, completed: false, icon: 'Share2' },
  { id: '4', title: 'Complete Profile', description: 'Fill in all your profile details', rewardPoints: 20, completed: true, icon: 'User' },
  { id: '5', title: 'Daily Login Streak', description: 'Login for 7 consecutive days', rewardPoints: 30, completed: false, icon: 'Calendar' },
  { id: '6', title: 'Pay Light Bill', description: 'Make a utility bill payment', rewardPoints: 15, completed: false, icon: 'Zap' },
];

// Streak Data
export const streakData: Streak = {
  currentStreak: 5,
  longestStreak: 12,
  nextReward: 30,
  lastLoginDate: '2025-03-16',
  streakHistory: [
    { date: '2025-03-16', claimed: true },
    { date: '2025-03-15', claimed: true },
    { date: '2025-03-14', claimed: true },
    { date: '2025-03-13', claimed: true },
    { date: '2025-03-12', claimed: true },
    { date: '2025-03-11', claimed: false },
    { date: '2025-03-10', claimed: true },
  ],
};

// Announcements
export const announcements: Announcement[] = [
  { id: '1', title: 'Welcome to BlueSea Mobile!', content: 'Thank you for joining us. Start earning BluePoints today!', date: '2025-03-15', type: 'general', priority: 'high' },
  { id: '2', title: 'New Feature: Group Payments', content: 'You can now create group payments and split bills with friends and family.', date: '2025-03-14', type: 'feature', priority: 'medium' },
  { id: '3', title: 'Weekend Bonus', content: 'Earn 2x BluePoints on all purchases this weekend!', date: '2025-03-13', type: 'promo', priority: 'high' },
];

// Notifications
export const notifications: Notification[] = [
  { id: '1', title: 'Transaction Successful', message: 'Your airtime purchase of ₦1000 was successful.', date: '2025-03-15 14:30', type: 'transaction', read: false },
  { id: '2', title: 'Points Earned!', message: 'You earned 10 BluePoints for your airtime purchase.', date: '2025-03-15 14:30', type: 'reward', read: false },
  { id: '3', title: 'New Announcement', message: 'Check out our new Group Payments feature!', date: '2025-03-14 09:00', type: 'announcement', read: true },
  { id: '4', title: 'Streak Bonus', message: 'You are on a 5-day login streak! Keep it up!', date: '2025-03-14 08:00', type: 'reward', read: true },
  { id: '5', title: 'Welcome Bonus', message: 'You received 50 BluePoints as a welcome bonus!', date: '2025-03-10 10:00', type: 'reward', read: true },
];

// Loyalty Marketplace Items
export const loyaltyItems: LoyaltyItem[] = [
  { id: '1', name: '₦100 Airtime Voucher', description: 'Get ₦100 airtime for any network', pointsCost: 100, image: 'airtime', category: 'voucher', available: true },
  { id: '2', name: '₦500 Data Bundle', description: '500MB data valid for 7 days', pointsCost: 400, image: 'data', category: 'data', available: true },
  { id: '3', name: '10% Discount Coupon', description: 'Get 10% off your next purchase', pointsCost: 200, image: 'discount', category: 'discount', available: true },
  { id: '4', name: 'Movie Ticket', description: 'Free movie ticket at partner cinemas', pointsCost: 1000, image: 'ticket', category: 'experience', available: false },
  { id: '5', name: 'Coffee Voucher', description: 'Free coffee at partner cafes', pointsCost: 300, image: 'coffee', category: 'voucher', available: true },
  { id: '6', name: '₦1000 Cashback', description: 'Get ₦1000 added to your wallet', pointsCost: 900, image: 'cashback', category: 'cashback', available: true },
];

// Group Payments
export const groupPayments: GroupPayment[] = [
  { 
    id: '1', 
    name: 'Weekend Data Bundle', 
    description: 'Splitting 10GB data bundle among 4 friends',
    targetAmount: 3000,
    currentAmount: 2250,
    contributors: [
      { id: '1', name: 'You', amount: 750, status: 'paid' },
      { id: '2', name: 'John Doe', amount: 750, status: 'paid' },
      { id: '3', name: 'Jane Smith', amount: 750, status: 'paid' },
      { id: '4', name: 'Mike Johnson', amount: 750, status: 'pending' },
    ],
    status: 'active',
    createdAt: '2025-03-14',
    expiresAt: '2025-03-17',
  },
  { 
    id: '2', 
    name: 'Office Airtime', 
    description: 'Team airtime for the month',
    targetAmount: 5000,
    currentAmount: 5000,
    contributors: [
      { id: '1', name: 'You', amount: 1000, status: 'paid' },
      { id: '2', name: 'Alice', amount: 1000, status: 'paid' },
      { id: '3', name: 'Bob', amount: 1000, status: 'paid' },
      { id: '4', name: 'Carol', amount: 1000, status: 'paid' },
      { id: '5', name: 'David', amount: 1000, status: 'paid' },
    ],
    status: 'completed',
    createdAt: '2025-03-01',
    expiresAt: '2025-03-05',
  },
];

// More Services Categories
export const moreServiceCategories = [
  {
    id: 'telecom',
    name: 'Telecom',
    services: [
      { id: 't1', name: 'Airtime Purchase', icon: 'Smartphone' },
      { id: 't2', name: 'Data Bundle', icon: 'Wifi' },
      { id: 't3', name: 'Airtime Buyback', icon: 'RefreshCw' },
      { id: 't4', name: 'SMS Bundle', icon: 'MessageSquare', comingSoon: true },
    ],
  },
  {
    id: 'utilities',
    name: 'Utilities',
    services: [
      { id: 'u1', name: 'Electricity Bill', icon: 'Zap' },
      { id: 'u2', name: 'Water Bill', icon: 'Droplets', comingSoon: true },
      { id: 'u3', name: 'TV Subscription', icon: 'Tv' },
      { id: 'u4', name: 'Internet Bill', icon: 'Globe', comingSoon: true },
    ],
  },
  {
    id: 'finance',
    name: 'Finance',
    services: [
      { id: 'f1', name: 'Wallet', icon: 'Wallet' },
      { id: 'f2', name: 'Group Payment', icon: 'Users' },
      { id: 'f3', name: 'Gift Card', icon: 'Gift', comingSoon: true },
      { id: 'f4', name: 'Savings', icon: 'PiggyBank', comingSoon: true },
    ],
  },
  {
    id: 'others',
    name: 'Others',
    services: [
      { id: 'o1', name: 'Blue Points', icon: 'Coins' },
      { id: 'o2', name: 'Referral Program', icon: 'Share2' },
      { id: 'o3', name: 'Loyalty Rewards', icon: 'Award' },
      { id: 'o4', name: 'Support', icon: 'Headphones' },
    ],
  },
];

export const airtimeAmounts = [50, 100, 200, 500, 1000, 2000];

export const networks = ['MTN', 'Glo', 'Airtel', '9mobile'] as const;


const mtn_dict = {
            "N100 100MB - 24 hrs": ["mtn-10mb-100", 100], 
            "N200 200MB - 2 days": ["mtn-50mb-200", 200],
            "N1000 1.5GB - 30 days": ["mtn-100mb-1000", 1000],
            "N2000 4.5GB - 30 days": ["mtn-500mb-2000", 2000],
            "N1500 6GB - 7 days": ["mtn-20hrs-1500", 1500],
            "N2500 6GB - 30 days": ["mtn-3gb-2500", 2500],
            "N3000 8GB - 30 days": ["mtn-data-3000", 3000],
            "N3500 10GB - 30 days": ["mtn-1gb-3500", 3500],
            "N5000 15GB - 30 days": ["mtn-100hr-5000", 5000],
            "N6000 20GB - 30 days": ["mtn-3gb-6000", 6000],
            "N10000 40GB - 30 days": ["mtn-40gb-10000", 10000],
            "N15000 75GB - 30 days": ["mtn-75gb-15000", 15000],
            "N20000 110GB - 30 days": ["mtn-110gb-20000", 20000],
            "N1500 3GB - 30 days": ["mtn-3gb-1500", 1500],
            "MTN N10,000 25GB SME Mobile Data [ 1 Month]": ["mtn-25gb-sme-10000", 10000],
            "MTN N50,000 165GB SME Mobile Data [2-Months]": ["mtn-165gb-sme-50000", 50000],
            "MTN N100,000 360GB SME Mobile Data [3 Months]": ["mtn-360gb-sme-100000", 100000],
            "MTN N450,000 4.5TB Mobile Data [1 Year]": ["mtn-4-5tb-450000", 450000],
            "MTN N100,000 1TB Mobile Data [1 Year]": ["mtn-1tb-110000", 100000],
            "MTN N600 2.5GB - 2 days": ["mtn-2-5gb-600", 600],
            "MTN N22000 120GB Monthly Plan + 80mins": ["mtn-120gb-22000", 22000],
            "MTN 100GB 2-Month Plan": ["mtn-100gb-20000", 20000],
            "MTN N30,000 160GB 2-Month Plan": ["mtn-160gb-30000", 30000],
            "MTN N50,000 400GB 3-Month Plan": ["mtn-400gb-50000", 50000],
            "MTN N75,000 600GB 3-Months Plan": ["mtn-600gb-75000", 75000],
            "MTN N300 Xtratalk Weekly Bundle": ["mtn-xtratalk-300", 300],
            "MTN N500 Xtratalk Weekly Bundle": ["mtn-xtratalk-500", 500],
            "MTN N1000 Xtratalk Monthly Bundle": ["mtn-xtratalk-1000", 1000],
            "MTN N2000 Xtratalk Monthly Bundle": ["mtn-xtratalk-2000", 2000],
            "MTN N5000 Xtratalk Monthly Bundle": ["mtn-xtratalk-5000", 5000],
            "MTN N10000 Xtratalk Monthly Bundle": ["mtn-xtratalk-10000", 10000],
            "MTN N15000 Xtratalk Monthly Bundle": ["mtn-xtratalk-15000", 15000],
            "MTN N20000 Xtratalk Monthly Bundle": ["mtn-xtratalk-20000", 20000],
            "MTN N800 3GB - 2 days": ["mtn-3gb-800", 800],
            "MTN N2000 7GB - 7 days": ["mtn-7gb-2000", 2000],
            "MTN N200 Xtradata": ["mtn-xtradata-200", 200],
            "MTN N200 Xtratalk - 3 days": ["mtn-xtratalk-300", 200]}
        
const airtel_dict = {
            "Airtel Data Bundle - 50 Naira - 25MB  - 1Day": ["airt-50", 49],
            "Airtel Data Bundle - 100 Naira - 75MB - 1Day": ["airt-100", 99],
            "Airtel Data Bundle - 200 Naira - 200MB - 3Days": ["airt-200", 199],
            "Airtel Data Bundle - 300 Naira - 350MB - 7 Days": ["airt-300", 299],
            "Airtel Data Bundle - 500 Naira - 750MB - 14 Days": ["airt-500", 499],
            "Airtel Data Bundle - 1,000 Naira - 1.5GB - 30 Days": ["airt-1000", 999],
            "Airtel Data Bundle - 1,500 Naira - 3GB - 30 Days": ["airt-1500", 1499],
            "Airtel Data Bundle - 2,000 Naira - 4.5GB - 30 Days": ["airt-2000", 1999],
            "Airtel Data Bundle - 3,000 Naira - 8GB - 30 Days": ["airt-3000", 2999],
            "Airtel Data Bundle - 4,000 Naira - 11GB - 30 Days": ["airt-4000", 3999],
            "Airtel Data Bundle - 5,000 Naira - 15GB - 30 Days": ["airt-5000", 4999],
            "Airtel Binge Data - 1,500 Naira [7 Days] - 6GB": ["airt-1500-2", 1499],
            "Airtel Data Bundle - 10,000 Naira - 40GB - 30 Days": ["airt-10000", 9999],
            "Airtel Data Bundle - 15,000 Naira - 75GB - 30 Days": ["airt-15000", 14999],
            "Airtel Data Bundle - 20,000 Naira - 110GB - 30 Days": ["airt-20000", 19999],
            "Airtel Data - 600 Naira - 1GB - 14 days": ["airt-600", 600],
            "Airtel Data - 1000 Naira - 1.5GB - 7 days": ["airt-1000-7", 1000],
            "Airtel Data - 2000 Naira - 7GB - 7 days": ["airt-2000-7", 2000],
            "Airtel Data - 5000 Naira - 25GB - 7 days": ["airt-5000-7", 5000],
            "Airtel Data - 400 Naira - 1.5GB - 1 day": ["airt-400-1", 400],
            "Airtel Data - 800 Naira - 3.5GB - 2 days": ["airt-800-2", 800],
            "Airtel Data - 6000 Naira - 23GB - 30 days": ["airt-6000-30", 6000],
            "600 Naira Voice Bundle": ["airt-voice-100", 100],
            "1200 Naira Voice Bundle": ["airt-voice-200", 200],
            "3000 Naira Voice Bundle": ["airt-voice-500", 500],
            "6000 Naira Voice Bundle": ["airt-voice-1000", 1000]
        }
        
const glo_dict =  {
            "Glo Data N100 -  105MB - 2 day": ["glo100", 100],
            "Glo Data N200 -  350MB - 4 days": ["glo200", 200],
            "Glo Data N500 -  1.05GB - 14 days": ["glo500", 500],
            "Glo Data N1000 -  2.5GB - 30 days": ["glo1000", 1000],
            "Glo Data N2000 -  5.8GB - 30 days": ["glo2000", 2000],
            "Glo Data N2500 -  7.7GB - 30 days": ["glo2500", 2500],
            "Glo Data N3000 -  10GB - 30 days": ["glo3000", 3000],
            "Glo Data N4000 -  13.25GB - 30 days": ["glo4000", 4000],
            "Glo Data N5000 -  18.25GB - 30 days": ["glo5000", 5000],
            "Glo Data N8000 -  29.5GB - 30 days": ["glo8000", 8000],
            "Glo Data N10000 -  50GB - 30 days": ["glo10000", 10000],
            "Glo Data N15000 -  93GB - 30 days": ["glo15000", 15000],
            "Glo Data N18000 -  119GB - 30 days": ["glo18000", 18000],
            "Glo Data N1500 -  4.1GB - 30 days": ["glo1500", 1500],
            "Glo Data N20000 -  138GB - 30 days": ["glo20000", 20000],
            "Glo Data [SME] N70 -  200MB - 14 days": ["glo-dg-70", 70],
            "Glo Data [SME] N320 - 1GB 30 days": ["glo-dg-320", 320],
            "Glo Data [SME] N960 - 3GB 30 days": ["glo-dg-960", 960],
            "Glo Data [SME] N3100 - 10GB - 30 Days": ["glo-dg-3100", 3100],
            "Glo Data [SME] N640 - 2GB 30 days": ["glo-dg-640", 640],
            "Glo Data [SME] N160 - 500MB 14 days": ["glo-dg-160-14", 160],
            "Glo Data [SME] N1600 - 5GB 30 days": ["glo-dg-1600", 1600],
            "45MB + 5MB Night N50 Oneoff": ["glo-daily-50", 50],
            "115Mb + 35MB Night N100 Oneoff": ["glo-daily-100", 100],
            "240MB + 110MB Night N200 Oneoff": ["glo-2days-200", 200],
            "800MB + 1GB Night N500 Oneoff": ["glo-2weeks-500", 500],
            "1.9GB + 2GB Night N1000 Oneoff": ["glo-monthly-1000", 1000],
            "3.5GB + 4GB Night N1500 Oneoff": ["glo-monthly-1500", 1500],
            "5.2GB + 4GB Night N2000 Oneoff": ["glo-monthly-2000", 2000],
            "6.8GB + 4GB Night N2500 Oneoff": ["glo-monthly-2500", 2500],
            "10GB +4GB Night N3000 Oneoff": ["glo-monthly-3000", 3000],
            "14GB + 4GB Night N4000 Oneoff": ["glo-monthly-4000", 4000],
            "20GB + 4GB Night N5000 Oneoff": ["glo-monthly-5000", 5000],
            "27.5GB + 2GB Night N8000 Oneoff": ["glo-monthly-8000", 8000],
            "46GB + 4GB N10000 Oneoff": ["glo-monthly-10000", 10000],
            "86GB + 7GB N15000 Oneoff": ["glo-monthly-15000", 15000],
            "109GB + 10Gb N18000 Oneoff": ["glo-monthly-18000", 18000],
            "126GB + 12GB N20000 Oneoff": ["glo-monthly-20000", 20000],
            "N300 1GB Special": ["glo-special-300", 300],
            "N500 2GB Special": ["glo-special-500", 500],
            "N1500 7GB Special": ["glo-special-1500", 1500],
            "N500 3GB Weekend": ["glo-weekend-500", 500],
            "N30000 225GB Glo Mega Oneoff": ["glo-mega-30000", 30000],
            "N36000 300GB Glo Mega Oneoff": ["glo-mega-36000", 36000],
            "N50000 425GB Glo Mega Oneoff": ["glo-mega-50000", 50000],
            "N60000 525GB Glo Mega Oneoff": ["glo-mega-60000", 60000],
            "N75000 675GB Glo Mega Oneoff": ["glo-mega-75000", 75000],
            "N100000 1TB Glo Mega Oneoff": ["glo-mega-75000", 100000],
            "Glo TV VOD 500 MB 3days Oneoff": ["glo-tv-150", 150],
            "Glo TV VOD 2GB 7days Oneoff": ["glo-tv-450", 450],
            "Glo TV VOD 6GB 30days Oneoff": ["glo-tv-1400", 1400],
            "Glo TV Lite 2GB Oneoff": ["glo-tv-900", 900],
            "Glo TV Max 6 GB Oneoff": ["glo-tv-3200", 3200],
            "WTF N25 100MB Oneoff": ["glo-wtf-25", 25],
            "WTF N50 200MB Oneoff": ["glo-wtf-50", 50],
            "WTF N100 500MB Oneoff": ["glo-wtf-100", 100],
            "Telegram N25 20MB Oneoff": ["glo-telegram-25", 25],
            "Telegram N50 50MB Oneoff": ["glo-telegram-50", 50],
            "Telegram N100 125MB Oneoff": ["glo-telegram-100", 100],
            "Instagram N25 20MB Oneoff": ["glo-insta-25", 25],
            "Instagram N50 50MB Oneoff": ["glo-insta-50", 50],
            "Instagram N100 125MB Oneoff": ["glo-insta-100", 100],
            "Tiktok N25 20MB Oneoff": ["glo-tiktok-25", 25],
            "Tiktok N50 50MB Oneoff": ["glo-tiktok-50", 50],
            "Tiktok N100 125MB Oneoff": ["glo-tiktok-100", 100],
            "Opera N25 25MB Oneoff": ["glo-opera-25", 25],
            "Opera N50 100MB Oneoff": ["glo-opera-50", 50],
            "Opera N100 300MB Oneoff": ["glo-opera-100", 100],
            "Youtube N50 100MB Oneoff": ["glo-youtube-50", 50],
            "Youtube N100 200MB Oneoff": ["glo-youtube-100", 100],
            "Youtube N250 500MB Oneoff": ["glo-youtube-250", 250],
            "Youtube N50 500MB Oneoff": ["glo-youtube-time-50", 50],
            "Youtube N130 1.5GB Oneoff": ["glo-youtube-time-130", 130],
            "Youtube N50 500MB Night Oneoff": ["glo-youtube-night-50", 50],
            "Youtube N200 2GB Night Oneoff": ["glo-youtube-night-200", 200],
            "Glo MyG N100 400 MB OneOff [Whatsapp, Instagram, Snapchat, Boomplay, Audiomac, GloTV, Tiktok]": [
                "glo-social-oneoff-100",
                100],
            "Glo MyG N300 1 GB OneOff [Whatsapp, Instagram, Snapchat, Boomplay, Audiomac, GloTV, Tiktok]": [
                "glo-social-oneoff-300",
                300
            ],
            "Glo MyG N500 1.5 GB OneOff [Whatsapp, Instagram, Snapchat, Boomplay, Audiomac, GloTV, Tiktok]": [
                "glo-social-oneoff-500",
                500
            ],
            "Glo MyG N1000 3.5 GB OneOff [Whatsapp, Instagram, Snapchat, Boomplay, Audiomac, GloTV, Tiktok]": [
                "glo-social-oneoff-1000",
                1000
            ]
        }
        
const  etisalat_dict = {
            "9mobile Data - 100 Naira - 100MB - 1 day": ["eti-100", 100],
            "9mobile Data - 200 Naira - 650MB - 1 day": ["eti-200", 200],
            "9mobile Data - 500 Naira - 500MB - 30 Days": ["eti-500", 500],
            "9mobile Data - 1000 Naira - 1.5GB - 30 days": ["eti-1000", 1000],
            "9mobile Data - 2000 Naira - 4.5GB Data - 30 Days": ["eti-2000", 2000],
            "9mobile Data - 5000 Naira - 15GB Data - 30 Days": ["eti-5000", 5000],
            "9mobile Data - 10000 Naira - 40GB - 30 days": ["eti-10000", 10000],
            "9mobile Data - 15000 Naira - 75GB - 30 Days": ["eti-15000", 15000],
            "9mobile Data - 27,500 Naira - 30GB - 90 days": ["eti-27500", 27500],
            "9mobile Data - 55,000 Naira - 60GB - 180 days": ["eti-55000", 55000],
            "9mobile Data - 110,000 Naira - 120GB - 365 days": ["eti-110000", 110000],
            "9mobile 1GB + 100MB [1 day] - 300 Naira": ["eti-300", 300],
            "9mobile 11GB [7GB+ 4GB Night] - 2,500 Naira - 30 days": ["eti-2500", 2500],
            "9mobile 35 GB - 7,000 Naira - 30 days": ["eti-7000", 7000],
            "9mobile 125GB - 20,000 Naira - 30 days": ["eti-20000", 20000],
            "9mobile 4GB [2GB + 2GB Night] - 1000 Naira": ["eti-1000", 1000],
            "9mobile 7GB [6GB+1GB Night] - 7 days": ["eti-1500-7", 1500],
            "9mobile 200MB [100MB + 100MB night] + 300secs - 1 day": ["eti-150-1", 150]
        } 



 function parsePlanDetails(planName:string) {
        // Default values
        let volume = "Bundle";
        let validity = "N/A";
        let type = "ExtraValue"; 

        // 1. Extract Volume (GB, MB, TB)
        const volumeMatch = planName.match(/(\d+(?:\.\d+)?)\s*(GB|MB|TB)/i);
        if (volumeMatch) {
            volume = volumeMatch[0].toUpperCase();
        } else {
            // For Voice/XtraTalk bundles, use the first NGN value followed by 'Bundle'
            const priceMatch = planName.match(/N(\d+,?\d*)/);
            if (priceMatch) {
                volume = `₦${priceMatch[1].replace(/,/g, '')} Bundle`;
            } else if (planName.includes("Voice")) {
                 volume = "Voice Bundle";
            }
        }
        
        // 2. Extract Validity (Days, Weeks, Months, Years, hrs)
        const validityMatch = planName.match(/(\d+)\s*(day|days|week|weeks|month|months|year|yrs|hrs)/i);
        
        if (validityMatch) {
            const num = parseInt(validityMatch[1]);
            const unit = validityMatch[2].toLowerCase();

            if (unit.startsWith('hr')) {
                 validity = `${num} Hrs`;
            } else if (unit.startsWith('day')) {
                validity = `${num} Day${num !== 1 ? 's' : ''}`;
                if (num === 1) type = 'Daily';
                else if (num <= 7) type = 'Daily'; // Keep 2-7 days as Daily for the plan tab grouping
            } else if (unit.startsWith('week')) {
                validity = `${num} Week${num !== 1 ? 's' : ''}`;
                type = 'Weekly';
            } else if (unit.startsWith('month')) {
                validity = `${num} Month${num !== 1 ? 's' : ''}`;
                type = 'Monthly';
            } else if (unit.startsWith('year') || unit.startsWith('yrs')) {
                validity = `${num} Year${num !== 1 ? 's' : ''}`;
                type = 'ExtraValue'; // Yearly plans go to ExtraValue
            }

        } else if (planName.toLowerCase().includes('weekly')) {
            validity = "7 Days";
            type = "Weekly";
        } else if (planName.toLowerCase().includes('monthly') || planName.toLowerCase().includes('30 days')) {
            validity = "30 Days";
            type = "Monthly";
        } else if (planName.toLowerCase().includes('weekend')) {
             validity = "Weekend";
             type = "ExtraValue";
        }

        // Catch edge cases for Daily/Monthly
        if (type === 'ExtraValue' && (validity.includes("Day") && parseInt(validity) <= 7)) {
            type = 'Daily';
        } else if (type === 'ExtraValue' && validity.includes("Day") && parseInt(validity) > 7) {
            type = 'Monthly';
        }

        return { volume, validity, type };
    }


    /**
     * Converts the raw Python dictionary data into the structured JS data format.
     * @param {Object} rawDict 
     * @returns {Object} Structured plans keyed by plan name
     */

    function processPlans(network: string,rawDict: object) {
        const processed = {};
        for (const name in rawDict) {
            // Note: rawDict[name] is an array: [id, price]
            const [id, price] = rawDict[name];
            const details = parsePlanDetails(name);
            processed[name] = {
                id: id,
                price: price,
                size: details.volume,
                validity: details.validity,
                planType: details.type,
              network: network,
              description: name
            };
        }
        return processed;
    }


export const dataPlanFunction = (): DataPlan[] => {
  const mtnPlans = Object.values(processPlans('MTN', mtn_dict))
  const gloPlans = Object.values(processPlans('Glo', glo_dict))
  const airtelPlans = Object.values(processPlans('Airtel', airtel_dict))
  const etisalatPlans = Object.values(processPlans('9mobile', etisalat_dict))

  return [mtnPlans, gloPlans, airtelPlans, etisalatPlans].flat();
  
};


