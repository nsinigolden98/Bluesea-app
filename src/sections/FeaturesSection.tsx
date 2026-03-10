import React from 'react';
import { 
  RotateCcw, 
  Gift, 
  Calendar, 
  Users, 
  BarChart3,
  Shield
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Feature {
  title: string;
  description: string;
  icon: React.ElementType;
}

const features: Feature[] = [
  {
    title: 'Airtime Buyback',
    description: 'Return unused airtime for platform credit — flexible and simple.',
    icon: RotateCcw,
  },
  {
    title: 'Loyalty Marketplace',
    description: 'Earn points for every transaction and redeem rewards.',
    icon: Gift,
  },
  {
    title: 'Smart Auto Top-Up',
    description: 'Schedule daily or weekly data plans with full control.',
    icon: Calendar,
  },
  {
    title: 'Group Payment',
    description: 'Manage shared payments for families, teams, and communities.',
    icon: Users,
  },
  {
    title: 'Spend Analysis',
    description: 'Track spending with privacy-compliant insights.',
    icon: BarChart3,
  },
  {
    title: 'Secure Transactions',
    description: 'Bank-grade security for all your transactions.',
    icon: Shield,
  },
];

export function FeaturesSection() {
  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            What BlueSea Mobile Offers
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Everything you need to stay connected, empowered, and in control.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className={cn(
                  'group p-6 rounded-3xl bg-card border border-border/50',
                  'transition-all duration-300 hover:shadow-card-hover hover:border-bluesea-primary/20',
                  'animate-fade-in-up'
                )}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-bluesea-gradient-start to-bluesea-gradient-end flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2 group-hover:text-bluesea-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
