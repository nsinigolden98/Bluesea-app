import { useNavigate } from 'react-router-dom';
import { 
  Send, 
  Smartphone, 
  Wifi, 
  ShoppingBag, 
  Users, 
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  TrendingUp,
  Clock,
  Zap,
  Tv,
  GraduationCap,
  Gamepad2,
  Shield,
  MoreHorizontal
} from 'lucide-react';
import { MainLayout } from '@/layouts';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface QuickAction {
  label: string;
  icon: React.ElementType;
  path: string;
  color: string;
}

const quickActions: QuickAction[] = [
  { label: 'Send Money', icon: Send, path: '/wallet/transfer', color: 'from-blue-500 to-blue-600' },
  { label: 'Buy Airtime', icon: Smartphone, path: '/airtime', color: 'from-green-500 to-green-600' },
  { label: 'Buy Data', icon: Wifi, path: '/data', color: 'from-purple-500 to-purple-600' },
  { label: 'Marketplace', icon: ShoppingBag, path: '/marketplace', color: 'from-orange-500 to-orange-600' },
  { label: 'Group Payment', icon: Users, path: '/group-payment', color: 'from-pink-500 to-pink-600' },
];

interface Service {
  label: string;
  icon: React.ElementType;
  path: string;
}

const services: Service[] = [
  { label: 'Airtime', icon: Smartphone, path: '/airtime' },
  { label: 'Data', icon: Wifi, path: '/data' },
  { label: 'Electricity', icon: Zap, path: '/electricity' },
  { label: 'Cable TV', icon: Tv, path: '#' },
  { label: 'Education', icon: GraduationCap, path: '#' },
  { label: 'Betting', icon: Gamepad2, path: '#' },
  { label: 'Insurance', icon: Shield, path: '#' },
  { label: 'More', icon: MoreHorizontal, path: '#' },
];

interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
}

const recentTransactions: Transaction[] = [
  { id: '1', type: 'debit', amount: 5000, description: 'Airtime Purchase', date: '2025-03-05', status: 'completed' },
  { id: '2', type: 'credit', amount: 50000, description: 'Wallet Funding', date: '2025-03-04', status: 'completed' },
  { id: '3', type: 'debit', amount: 15000, description: 'Data Bundle', date: '2025-03-03', status: 'completed' },
  { id: '4', type: 'debit', amount: 2500, description: 'Electricity Bill', date: '2025-03-02', status: 'pending' },
];

export function DashboardPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-NG', {
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {user?.name}!</p>
          </div>
          <Avatar className="w-10 h-10">
            <AvatarImage src={user?.avatar} />
            <AvatarFallback className="bg-bluesea-primary text-white">
              {user?.name?.[0]}{user?.surname?.[0]}
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Wallet Balance Card */}
        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-bluesea-gradient-start to-bluesea-gradient-end" />
          <CardContent className="relative p-6 text-white">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-white/80 text-sm mb-1">Wallet Balance</p>
                <h2 className="text-3xl sm:text-4xl font-bold">{formatCurrency(75000)}</h2>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="secondary" className="bg-white/20 text-white border-0">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +12.5%
                  </Badge>
                  <span className="text-white/70 text-sm">this month</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                <Wallet className="w-6 h-6" />
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <Button 
                variant="secondary" 
                className="flex-1 bg-white text-bluesea-primary hover:bg-white/90"
                onClick={() => navigate('/wallet/fund')}
              >
                <ArrowDownRight className="w-4 h-4 mr-2" />
                Fund Wallet
              </Button>
              <Button 
                variant="outline" 
                className="flex-1 border-white/30 text-white hover:bg-white/10"
                onClick={() => navigate('/wallet/transfer')}
              >
                <ArrowUpRight className="w-4 h-4 mr-2" />
                Send Money
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-5 gap-3">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <button
                  key={action.label}
                  onClick={() => navigate(action.path)}
                  className="flex flex-col items-center gap-2 group"
                >
                  <div className={cn(
                    'w-14 h-14 rounded-2xl bg-gradient-to-br flex items-center justify-center',
                    'transition-transform duration-300 group-hover:scale-110',
                    action.color
                  )}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                    {action.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Services Grid */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Services</h3>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <button
                  key={service.label}
                  onClick={() => navigate(service.path)}
                  className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-card border border-border/50 hover:border-bluesea-primary/30 hover:shadow-card transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center group-hover:bg-bluesea-primary/10 transition-colors">
                    <Icon className="w-5 h-5 text-muted-foreground group-hover:text-bluesea-primary transition-colors" />
                  </div>
                  <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                    {service.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Recent Transactions */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Recent Transactions</CardTitle>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-bluesea-primary"
              onClick={() => navigate('/transactions')}
            >
              View All
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    'w-10 h-10 rounded-xl flex items-center justify-center',
                    transaction.type === 'credit' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                  )}>
                    {transaction.type === 'credit' ? (
                      <ArrowDownRight className="w-5 h-5" />
                    ) : (
                      <ArrowUpRight className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{transaction.description}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {formatDate(transaction.date)}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className={cn(
                    'font-semibold',
                    transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                  )}>
                    {transaction.type === 'credit' ? '+' : '-'}{formatCurrency(transaction.amount)}
                  </p>
                  <Badge 
                    variant={transaction.status === 'completed' ? 'default' : 'secondary'}
                    className="text-[10px]"
                  >
                    {transaction.status}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
