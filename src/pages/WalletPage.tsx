import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowUpRight, 
  ArrowDownRight, 
  Wallet, 
  Plus,
  Send,
  History,
  Filter
} from 'lucide-react';
import { MainLayout } from '@/layouts';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  reference?: string;
}

const mockTransactions: Transaction[] = [
  { id: '1', type: 'debit', amount: 5000, description: 'Airtime Purchase', date: '2025-03-05', status: 'completed', reference: 'REF001' },
  { id: '2', type: 'credit', amount: 50000, description: 'Wallet Funding', date: '2025-03-04', status: 'completed', reference: 'REF002' },
  { id: '3', type: 'debit', amount: 15000, description: 'Data Bundle', date: '2025-03-03', status: 'completed', reference: 'REF003' },
  { id: '4', type: 'debit', amount: 2500, description: 'Electricity Bill', date: '2025-03-02', status: 'pending', reference: 'REF004' },
  { id: '5', type: 'credit', amount: 100000, description: 'Bank Transfer', date: '2025-03-01', status: 'completed', reference: 'REF005' },
  { id: '6', type: 'debit', amount: 10000, description: 'Marketplace Purchase', date: '2025-02-28', status: 'completed', reference: 'REF006' },
];

export function WalletPage() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'all' | 'credit' | 'debit'>('all');

  const balance = 75000;

  const filteredTransactions = mockTransactions.filter(t => 
    filter === 'all' || t.type === filter
  );

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
      year: 'numeric',
    });
  };

  const totalCredit = mockTransactions
    .filter(t => t.type === 'credit')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalDebit = mockTransactions
    .filter(t => t.type === 'debit')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold">Wallet</h1>
          <p className="text-muted-foreground">Manage your funds and transactions</p>
        </div>

        {/* Balance Card */}
        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-bluesea-gradient-start to-bluesea-gradient-end" />
          <CardContent className="relative p-6 text-white">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-white/80 text-sm mb-1">Available Balance</p>
                <h2 className="text-3xl sm:text-4xl font-bold">{formatCurrency(balance)}</h2>
              </div>
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                <Wallet className="w-6 h-6" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-white/10 rounded-xl p-3">
                <p className="text-white/70 text-xs">Total In</p>
                <p className="text-white font-semibold">{formatCurrency(totalCredit)}</p>
              </div>
              <div className="bg-white/10 rounded-xl p-3">
                <p className="text-white/70 text-xs">Total Out</p>
                <p className="text-white font-semibold">{formatCurrency(totalDebit)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-3 gap-3">
          <Button 
            variant="outline" 
            className="flex-col h-auto py-4 gap-2"
            onClick={() => navigate('/wallet/fund')}
          >
            <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
              <Plus className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-xs">Fund Wallet</span>
          </Button>
          <Button 
            variant="outline" 
            className="flex-col h-auto py-4 gap-2"
            onClick={() => navigate('/wallet/transfer')}
          >
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
              <Send className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-xs">Send Money</span>
          </Button>
          <Button 
            variant="outline" 
            className="flex-col h-auto py-4 gap-2"
            onClick={() => navigate('/transactions')}
          >
            <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
              <History className="w-5 h-5 text-purple-600" />
            </div>
            <span className="text-xs">History</span>
          </Button>
        </div>

        {/* Transactions */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg">Transaction History</CardTitle>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <select 
                value={filter}
                onChange={(e) => setFilter(e.target.value as any)}
                className="text-sm border-0 bg-transparent text-muted-foreground focus:outline-none"
              >
                <option value="all">All</option>
                <option value="credit">Credit</option>
                <option value="debit">Debit</option>
              </select>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-4">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="credit">Income</TabsTrigger>
                <TabsTrigger value="debit">Expenses</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-3">
                {filteredTransactions.map((transaction) => (
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
                        <p className="text-xs text-muted-foreground">{formatDate(transaction.date)}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={cn(
                        'font-semibold text-sm',
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
              </TabsContent>

              <TabsContent value="credit" className="space-y-3">
                {filteredTransactions
                  .filter(t => t.type === 'credit')
                  .map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-green-100 text-green-600 flex items-center justify-center">
                          <ArrowDownRight className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{transaction.description}</p>
                          <p className="text-xs text-muted-foreground">{formatDate(transaction.date)}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-sm text-green-600">
                          +{formatCurrency(transaction.amount)}
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
              </TabsContent>

              <TabsContent value="debit" className="space-y-3">
                {filteredTransactions
                  .filter(t => t.type === 'debit')
                  .map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between p-3 rounded-xl hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
                          <ArrowUpRight className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{transaction.description}</p>
                          <p className="text-xs text-muted-foreground">{formatDate(transaction.date)}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-sm text-red-600">
                          -{formatCurrency(transaction.amount)}
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
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
