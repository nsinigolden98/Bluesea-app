import React from 'react';
import { Star, TrendingUp, CheckCircle } from 'lucide-react';

interface StatItem {
  value: string;
  label: string;
  icon: React.ElementType;
}

const stats: StatItem[] = [
  { value: '4.8', label: 'Users Rating', icon: Star },
  { value: '50k+', label: 'Transactions', icon: TrendingUp },
  { value: '99%', label: 'Success Rate', icon: CheckCircle },
];

export function TrustSection() {
  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Trusted by People Everywhere
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Join thousands of users who buy and manage VTU daily.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={stat.label}
                className="text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-brand-100 dark:bg-brand-900/30 text-brand-600 dark:text-brand-400 mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <p className="text-3xl sm:text-4xl font-bold text-bluesea-primary mb-1">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
