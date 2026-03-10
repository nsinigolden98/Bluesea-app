import { LandingLayout } from '@/layouts';
import { 
  HeroSection, 
  TrustSection, 
  FeaturesSection, 
  AboutSection, 
  CTASection, 
  FooterSection 
} from '@/sections';

export function LandingPage() {
  return (
    <LandingLayout>
      <HeroSection />
      <TrustSection />
      <FeaturesSection />
      <AboutSection />
      <CTASection />
      <FooterSection />
    </LandingLayout>
  );
}
