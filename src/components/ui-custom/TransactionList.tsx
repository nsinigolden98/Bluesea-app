import { cn } from '@/lib/utils';
import { mockTransactions } from '@/data';
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react';

interface TransactionListProps {
  limit?: number;
  showViewAll?: boolean;
  className?: string;
}

export function TransactionList({ 
  limit = 5, 
  showViewAll = true,
  className 
}: TransactionListProps) {
  const transactions = mockTransactions.slice(0, limit);

  return (
    <div className={cn('bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 overflow-hidden', className)}>
      <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800">
        <h2 className="text-lg font-semibold text-slate-800 dark:text-white">Recent Transactions</h2>
        {showViewAll && (
          <button className="text-sm font-medium text-sky-500 hover:text-sky-600 transition-colors">
            View All
          </button>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50 dark:bg-slate-800/50">
            <tr>
              <th className="text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 py-3">
                Description
              </th>
              <th className="text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 py-3">
                Date
              </th>
              <th className="text-right text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider px-4 py-3">
                Amount
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {transactions.map((transaction) => (
              <tr 
                key={transaction.id}
                className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
              >
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      'w-8 h-8 rounded-full flex items-center justify-center',
                      transaction.type === 'credit' 
                        ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
                        : 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
                    )}>
                      {transaction.type === 'credit' ? (
                        <ArrowDownLeft className="w-4 h-4" />
                      ) : (
                        <ArrowUpRight className="w-4 h-4" />
                      )}
                    </div>
                    <span className="font-medium text-slate-700 dark:text-slate-200">
                      {transaction.description}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-4 text-sm text-slate-500 dark:text-slate-400">
                  {new Date(transaction.date).toLocaleDateString('en-NG', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </td>
                <td className={cn(
                  'px-4 py-4 text-right font-medium',
                  transaction.type === 'credit'
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-red-600 dark:text-red-400'
                )}>
                  {transaction.type === 'credit' ? '+' : '-'}₦{transaction.amount.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {transactions.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4">
            <span className="text-2xl">📋</span>
          </div>
          <p className="text-slate-500 dark:text-slate-400">No transactions yet</p>
        </div>
      )}
    </div>
  );
}
