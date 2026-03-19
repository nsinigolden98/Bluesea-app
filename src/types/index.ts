import axios from 'axios'
import Cookies from 'js-cookie'
  
// User Types
export interface User {
  id: string; 
  email: string;
   firstName: string;
  surname: string;
  phone: string;
  profilePicture?: string;
  balance: string;
  // bluePoints: number;
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


export const API_BASE = import.meta.env.VITE_API_BASE

export const ENDPOINTS = {
  login: `${API_BASE}/accounts/login/`,
  signup: `${API_BASE}/accounts/sign-up/`,
  sendOtp: `${API_BASE}/accounts/resend-otp/`,
  sendOtp_FP: `${API_BASE}/accounts/password/reset/request/`,
  verify_FP: `${API_BASE}/accounts/password/reset/verify-otp/`,
  confirm_FP: `${API_BASE}/accounts/password/reset/confirm/`,
  verifyOtp: `${API_BASE}/accounts/verify-email/`,
  forgotReset: `${API_BASE}/accounts/auth/forgot-reset/`,
  oauthGoogle: `${API_BASE}/accounts/auth/google/`,
  balance: `${API_BASE}/wallet/balance/`,
  fund: `${API_BASE}/transactions/fund-wallet/`,
  webhook: `${API_BASE}/transactions/webhook/paystack/`,
  history: `${API_BASE}/transactions/history/`,
  withdraw: `${API_BASE}/transactions/withdraw/`,
  user: `${API_BASE}/user_preference/user/`,
  pin_set: `${API_BASE}/accounts/pin/set/`,
  pin_verify: `${API_BASE}/accounts/pin/verify/`,
  pin_reset: `${API_BASE}/accounts/pin/reset/`,
  buy_airtime: `${API_BASE}/payments/airtime/`,
  buy_airtel: `${API_BASE}/payments/airtel-data/`,
  buy_mtn: `${API_BASE}/payments/mtn-data/`,
  buy_glo: `${API_BASE}/payments/glo-data/`,
  buy_etisalat: `${API_BASE}/payments/etisalat-data/`,
  account_name: `${API_BASE}/transactions/account-name/`,
  electricity: `${API_BASE}/payments/electricity/`,
  electricity_user: `${API_BASE}/payments/electricity/customer/`,
  group_payment_history: `${API_BASE}/payments/group-payment/history/`,
  group_payment: `${API_BASE}/payments/group-payment/`,
  dstv: `${API_BASE}/payments/dstv/`,
  showmax: `${API_BASE}/payments/showmax/`,
  startimes: `${API_BASE}/payments/startimes/`,
  gotv: `${API_BASE}/payments/gotv/`,
  create_group: `${API_BASE}/payments/group/create/`,
  join_group: `${API_BASE}/payments/group/join-group/`,
  add_to_group: `${API_BASE}/payments/group/add-member/`,
  my_group: `${API_BASE}/payments/group/my-groups/`,
  group_detail: `${API_BASE}/payments/group/`,
  logout: `${API_BASE}/accounts/logout/`,
  events: `${API_BASE}/marketplace/events/all/`,
  create_events: `${API_BASE}/marketplace/events/create/`,
  create_vendor: `${API_BASE}/marketplace/vendor/create/`,
  vendor_status: `${API_BASE}/marketplace/vendor/status/`,
  vendor_tickets: `${API_BASE}/marketplace/vendor/tickets/`,
  tickets: `${API_BASE}/marketplace/tickets/`,
  mytickets: `${API_BASE}/marketplace/tickets/my/`,
  purchase: `${API_BASE}/marketplace/events/`,
  scan_ticket: `${API_BASE}/marketplace/tickets/scan/`
};

// Save Access Token In Cookie
export function setCookie(name:string,token:string) {
  Cookies.set(name, token, {
    expires: 1,
    path: '',
    secure: true,
    sameSite:'strict'
  })
}

// Get Cookie
export function getCookie(name:string) {
  return Cookies.get(name)
}


// Delete Cookie
 export function deleteCookie(name:string) {
   Cookies.remove(name, { path: '' });
  }


// GET REQUEST
export async function getRequest(url: string, token:string) {
  
  try {
    const response = await axios.get(url,
      {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
          "Accept": 'application/json'
        }
      });
    return response.data
  } catch (error) {
    console.log(error)
  }
}

// POST REQUEST
export async function postRequest(url: string,token:string, payload: object) {
    
  try {
    const response = await axios.post(url,payload,
      {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
          "Accept": 'application/json'
        }

      });
    return response.data
  } catch (error) {
    const response = error.response
    return response.data
  }
}
// POST REQUEST (FILES)
export async function postFileRequest(url: string,token:string ,payload: object) {
    
  try {
    const response = await axios.post(url,payload,
      {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });
    return response.data
  } catch (error) {
    console.log(error)
  }
}

// PUT REQUEST
export async function putRequest(url: string, token:string,payload: object) {
  try {
    const response = await axios.put(url,payload,
      {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
          "Accept": 'application/json'
        }

      });
    return response.data
  } catch (error) {
    console.log(error)
  }
}

