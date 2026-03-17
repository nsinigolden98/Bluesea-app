import { useState } from 'react';
import { Sidebar, Header } from '@/components/ui-custom';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Marketplace() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Tickets');

  const categories = ['Tickets', 'Products', 'Events', 'Points'];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header 
          title="Blue Vault" 
          subtitle="Buy Smarter & Cheaper"
          onMenuClick={() => setSidebarOpen(true)} 
        />

        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          <div className="max-w-5xl mx-auto space-y-6">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                type="text"
                placeholder="Search products, events, points..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 py-6 rounded-xl"
              />
            </div>

            {/* Category Pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={cn(
                    'px-4 py-2 rounded-full text-sm font-medium transition-all',
                    activeCategory === category
                      ? 'bg-sky-500 text-white'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                  )}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Empty State */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 p-12 text-center">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                <span className="text-4xl">🛍️</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">
                Coming Soon
              </h3>
              <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                The Blue Vault marketplace is being stocked with amazing products and events. Check back soon!
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
