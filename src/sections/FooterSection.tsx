import { Link } from 'react-router-dom';
import { 
  MessageCircle, 
  Facebook, 
  Instagram, 
  Twitter, 
  Youtube,
  Send
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const socialLinks = [
  { icon: MessageCircle, href: 'https://whatsapp.com/channel/0029Vb7HqU7LikgB1BkF4q3u', label: 'WhatsApp' },
  { icon: Facebook, href: 'https://www.facebook.com/share/15DTkMv4cUk/?mibextid=wwXIfr', label: 'Facebook' },
  { icon: Instagram, href: 'https://www.instagram.com/blueseamobile?igsh=aXN1amhmdW1mb2F0', label: 'Instagram' },
  { icon: Twitter, href: 'https://x.com/blueseamobile?s=21', label: 'Twitter' },
  { icon: Youtube, href: 'https://youtube.com/@blueseamobile?si=Own9DQdOupkPpV4L', label: 'YouTube' },
];

const footerLinks = [
  { label: 'Legal', href: '#' },
  { label: 'Privacy', href: '#' },
  { label: 'Terms', href: '#' },
];

export function FooterSection() {
  return (
    <footer id="contact" className="bg-muted/30 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center text-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-bluesea-gradient-start to-bluesea-gradient-end flex items-center justify-center">
              <span className="text-white font-bold text-xl">B</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl leading-tight">BlueSea Mobile</span>
              <span className="text-xs text-muted-foreground">The Trusted Way to Stay Connected</span>
            </div>
          </Link>

          {/* Feedback Button */}
          <Button 
            variant="outline" 
            className="mb-8 rounded-full border-2"
            onClick={() => window.open('mailto:support@blueseamobile.com.ng', '_blank')}
          >
            <Send className="w-4 h-4 mr-2" />
            Send Feedback
          </Button>

          {/* Social Links */}
          <div className="flex items-center gap-4 mb-8">
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-bluesea-primary hover:border-bluesea-primary transition-colors"
                  aria-label={social.label}
                >
                  <Icon className="w-5 h-5" />
                </a>
              );
            })}
          </div>

          <Separator className="w-full max-w-md mb-8" />

          {/* Footer Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} BlueSea Mobile. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
