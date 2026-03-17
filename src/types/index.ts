// User Types
export interface User {
  id: string;
  email: string;
  firstName: string;
  surname: string;
  phone: string;
  profilePicture?: string;
  balance: number;
  bluePoints: number;
}

// Transaction Types
export interface Transaction {
  id: string;
  description: string;
  date: string;
  amount: number;
  type: 'credit' | 'debit';
  status: 'pending' | 'completed' | 'failed';
}

// Network Types
export type Network = 'MTN' | 'Glo' | 'Airtel' | '9mobile';

// Data Plan Types
export interface DataPlan {
  id: string;
  size: string;
  price: number;
  validity: string;
  network: Network;
  planType: 'daily' | 'weekly' | 'monthly' | 'xtravalue';
}

// Service Types
export interface Service {
  id: string;
  name: string;
  icon: string;
  category: string;
  comingSoon?: boolean;
}

// Navigation Types
export interface NavItem {
  id: string;
  label: string;
  icon: string;
  path: string;
}

// Theme Types
export type Theme = 'light' | 'dark';

// Auth Types
export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
}

// Form Types
export interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface SignupFormData {
  email: string;
  phone: string;
  firstName: string;
  surname: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

// BluePoints Types
export interface BluePointHistory {
  id: string;
  source: string;
  points: number;
  date: string;
  type: 'earned' | 'redeemed';
}

// Task Types
export interface Task {
  id: string;
  title: string;
  description: string;
  rewardPoints: number;
  completed: boolean;
  icon: string;
}

// Streak Types
export interface StreakDay {
  date: string;
  claimed: boolean;
}

export interface Streak {
  currentStreak: number;
  longestStreak: number;
  nextReward: number;
  lastLoginDate: string;
  streakHistory: StreakDay[];
}

// Announcement Types
export interface Announcement {
  id: string;
  title: string;
  content: string;
  date: string;
  type: 'general' | 'feature' | 'promo';
  priority: 'low' | 'medium' | 'high';
}

// Notification Types
export interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  type: 'transaction' | 'reward' | 'announcement';
  read: boolean;
}

// Loyalty Marketplace Types
export interface LoyaltyItem {
  id: string;
  name: string;
  description: string;
  pointsCost: number;
  image: string;
  category: 'voucher' | 'data' | 'discount' | 'experience' | 'cashback';
  available: boolean;
}

// Group Payment Types
export interface Contributor {
  id: string;
  name: string;
  amount: number;
  status: 'paid' | 'pending';
}

export interface GroupPayment {
  id: string;
  name: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  contributors: Contributor[];
  status: 'active' | 'completed' | 'cancelled';
  createdAt: string;
  expiresAt: string;
}

// More Services Types
export interface MoreService {
  id: string;
  name: string;
  icon: string;
  comingSoon?: boolean;
}

export interface MoreServiceCategory {
  id: string;
  name: string;
  services: MoreService[];
}
