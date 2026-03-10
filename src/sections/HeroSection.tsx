import { Link } from 'react-router-dom';
import { Play, ArrowRight, Sparkles, Percent } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-50/50 via-transparent to-brand-100/30 dark:from-brand-900/10 dark:to-brand-800/10 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-100 dark:bg-brand-900/30 text-brand-700 dark:text-brand-300 text-sm font-medium mb-6 animate-fade-in">
            <Sparkles className="w-4 h-4" />
            <span>AI-Powered VTU Platform</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-fade-in-up">
            Save More. Earn More.
            <br />
            <span className="text-gradient">Take Control of Your Airtime & Data.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Enjoy AI-powered recommendations, instant refunds, group payments,
            and seamless offline access — all in one smart app.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <Link to="/login">
              <Button size="lg" className="btn-bluesea-primary text-base px-8">
                Get Started
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Button 
              variant="outline" 
              size="lg" 
              className="rounded-full border-2 border-bluesea-primary text-bluesea-primary hover:bg-bluesea-primary hover:text-white"
              onClick={() => window.open('https://youtu.be/k621P3L5C4s?si=I-lD3WI1wNaXm-SJ', '_blank')}
            >
              <Play className="w-5 h-5 mr-2 fill-current" />
              Watch Tutorial
            </Button>
          </div>

          {/* Phone Mockup with Floating Badges */}
          <div className="relative max-w-md mx-auto animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            {/* Phone Frame */}
            <div className="relative mx-auto w-64 sm:w-72 h-80 sm:h-96 rounded-t-[2.5rem] bg-gradient-to-br from-bluesea-gradient-start to-bluesea-gradient-end p-1 shadow-2xl">
              <div className="w-full h-full rounded-t-[2.3rem] bg-background overflow-hidden">
                {/* Screen Content */}
                <div className="w-full h-full bg-gradient-to-br from-brand-500/20 to-brand-600/10 flex items-center justify-center">
                  <div className="text-center p-6">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-bluesea-gradient-start to-bluesea-gradient-end flex items-center justify-center">
                      <span className="text-white font-bold text-2xl">B</span>
                    </div>
                    <p className="text-sm font-medium text-muted-foreground">BlueSea Mobile</p>
                    <p className="text-xs text-muted-foreground/70">Your Digital Companion</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Badge - Left */}
            <div className="absolute left-0 top-1/3 -translate-x-1/2 hidden lg:block animate-float">
              <div className="bg-card rounded-2xl p-4 shadow-float border border-border">
                <p className="text-xs text-muted-foreground mb-1">on your next 50gb purchase</p>
                <p className="text-lg font-bold text-foreground">20% off Data</p>
                <div className="mt-2 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-bluesea-gradient-start to-bluesea-gradient-end text-white text-xs font-medium">
                  <Percent className="w-3 h-3" />
                  +8.50%
                </div>
              </div>
            </div>

            {/* Floating Badge - Right */}
            <div className="absolute right-0 top-1/4 translate-x-1/2 hidden lg:block animate-float" style={{ animationDelay: '1s' }}>
              <div className="bg-card rounded-2xl p-4 shadow-float border border-border">
                <p className="text-xs text-muted-foreground mb-1">your AI powered deal</p>
                <p className="text-lg font-bold text-foreground">AI Deal</p>
                <div className="mt-2 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-medium">
                  <Sparkles className="w-3 h-3" />
                  100%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
