import React from 'react';
import { Target, Rocket, Users } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AboutCard {
  number: string;
  title: string;
  content: string;
  icon: React.ElementType;
}

const aboutCards: AboutCard[] = [
  {
    number: '01',
    title: 'Vision',
    content: 'Our goal is to grow from a local VTU platform into a standard digital service hub, eventually evolving into a full-featured banking and financial ecosystem. We envision BlueSea Mobile as a platform that is productive, innovative, and trusted by millions.',
    icon: Target,
  },
  {
    number: '02',
    title: 'Mission',
    content: 'BlueSea Mobile exists to solve everyday digital and financial challenges with smart, simple, and secure tools. We aim to provide users with seamless transactions, community-friendly payment solutions, and flexible digital services that adapt to their lifestyle.',
    icon: Rocket,
  },
  {
    number: '03',
    title: 'Our Team',
    content: 'BlueSea Mobile is powered by a passionate team that combines technical expertise and strategic vision: Founder & CEO – Provides direction and ensures the platform grows effectively. Front-End Developer & Marketing Lead – Designs intuitive user interfaces and drives marketing strategies.',
    icon: Users,
  },
];

export function AboutSection() {
  return (
    <section id="about" className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            About BlueSea
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need to stay connected, empowered, and in control.
          </p>
        </div>

        {/* Main Description */}
        <div className="max-w-3xl mx-auto text-center mb-12 animate-fade-in-up">
          <p className="text-muted-foreground leading-relaxed">
            Blue Sea Mobile is a smart, reliable, and free-to-use VTU platform designed 
            to make mobile and digital services effortless for everyone, offering seamless 
            access to data and airtime purchases, gift card vouchers, utility and educational 
            bill payments such as NECO and ATC, funding for built-in platforms, premium 
            subscriptions, and network packages.
          </p>
          <p className="text-muted-foreground leading-relaxed mt-4">
            With features like group payments for communities and teams, as well as 
            Smart Auto-Top-Up that allows users to schedule daily or weekly data plans 
            with flexible cancellation and automatic refunds, BlueSea Mobile ensures 
            stress-free, time-saving, and convenient digital services for all users.
          </p>
        </div>

        {/* Vision, Mission, Team Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {aboutCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className={cn(
                  'p-6 rounded-3xl bg-muted/50 border border-border/50',
                  'transition-all duration-300 hover:bg-muted hover:shadow-card',
                  'animate-fade-in-up'
                )}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-bluesea-primary font-bold text-sm">
                    {card.number}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-bluesea-primary/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-bluesea-primary" />
                  </div>
                  <h3 className="text-lg font-semibold">{card.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {card.content}
                </p>
              </div>
            );
          })}
        </div>

        {/* Closing Statement */}
        <div className="mt-12 text-center max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
          <p className="text-muted-foreground italic">
            BlueSea Mobile is more than a service — it's a solution for everyday digital 
            and financial needs, built to empower users and communities with convenience, 
            reliability, and innovation.
          </p>
        </div>
      </div>
    </section>
  );
}
