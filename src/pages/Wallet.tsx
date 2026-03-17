import { useState } from 'react';
import { Sidebar, Header, BalanceCard, TransactionList, LoadingSpinner } from '@/components/ui-custom';
import { Button } from '@/components/ui/button';

export function Wallet() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading] = useState(false);

  const handleDeposit = () => {
    // Handle deposit
    alert('Deposit feature coming soon!');
  };

  const handleWithdraw = () => {
    // Handle withdraw
    alert('Withdraw feature coming soon!');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header 
          title="Wallet" 
          subtitle="Buy Smarter & Cheaper"
          onMenuClick={() => setSidebarOpen(true)} 
        />

        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          <div className="max-w-5xl mx-auto space-y-6">
            {/* Balance Card with Actions */}
            <BalanceCard 
              showActions 
              onDeposit={handleDeposit}
              onWithdraw={handleWithdraw}
            />

            {/* Recent Transactions */}
            {loading ? (
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-12">
                <LoadingSpinner />
              </div>
            ) : (
              <TransactionList />
            )}

            {/* Withdrawal Not Available Button */}
            <Button 
              variant="secondary" 
              className="w-full rounded-xl py-6 bg-sky-500/10 text-sky-600 hover:bg-sky-500/20"
              disabled
            >
              Withdrawal Not Available
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}
