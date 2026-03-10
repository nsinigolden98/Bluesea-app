import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Wallet, 
  Smartphone, 
  Wifi, 
  ShoppingBag, 
  History, 
  User, 
  Settings, 
  Users, 
  Gift,
  Ticket,
  LogOut,
  Menu,
  Moon,
  Sun,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useTheme } from '@/context/ThemeContext';
import { useIsSmallScreen } from '@/hooks';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  path: string;
  icon: React.ElementType;
  badge?: number;
}

const mainNavItems: NavItem[] = [
  { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { label: 'Wallet', path: '/wallet', icon: Wallet },
  { label: 'Airtime', path: '/airtime', icon: Smartphone },
  { label: 'Data', path: '/data', icon: Wifi },
  { label: 'Marketplace', path: '/marketplace', icon: ShoppingBag },
  { label: 'Transactions', path: '/transactions', icon: History },
];

const secondaryNavItems: NavItem[] = [
  { label: 'Loyalty', path: '/loyalty', icon: Gift },
  { label: 'Referral', path: '/referral', icon: Users },
  { label: 'Group Payment', path: '/group-payment', icon: Ticket },
];

const accountNavItems: NavItem[] = [
  { label: 'Profile', path: '/profile', icon: User },
  { label: 'Settings', path: '/settings', icon: Settings },
];

export function MainLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const { resolvedTheme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const isSmallScreen = useIsSmallScreen();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path: string) => location.pathname === path || location.pathname.startsWith(`${path}/`);

  const NavLink = ({ item, onClick }: { item: NavItem; onClick?: () => void }) => {
    const Icon = item.icon;
    const active = isActive(item.path);
    
    return (
      <Link
        to={item.path}
        onClick={onClick}
        className={cn(
          'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-fast group',
          active 
            ? 'bg-bluesea-primary text-white shadow-button' 
            : 'text-muted-foreground hover:bg-muted hover:text-foreground'
        )}
      >
        <Icon className={cn('w-5 h-5', active && 'text-white')} />
        <span className="font-medium text-sm">{item.label}</span>
        {item.badge && (
          <span className={cn(
            'ml-auto text-xs font-semibold px-2 py-0.5 rounded-full',
            active ? 'bg-white/20 text-white' : 'bg-bluesea-primary/10 text-bluesea-primary'
          )}>
            {item.badge}
          </span>
        )}
        <ChevronRight className={cn(
          'w-4 h-4 ml-auto opacity-0 transition-opacity',
          !active && 'group-hover:opacity-100'
        )} />
      </Link>
    );
  };

  const SidebarContent = ({ onItemClick }: { onItemClick?: () => void }) => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-6">
        <Link to="/dashboard" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-bluesea-gradient-start to-bluesea-gradient-end flex items-center justify-center">
            <span className="text-white font-bold text-lg">B</span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg leading-tight">BlueSea</span>
            <span className="text-xs text-muted-foreground">Mobile</span>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-4 space-y-6">
        {/* Main Navigation */}
        <div className="space-y-1">
          <p className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            Main
          </p>
          {mainNavItems.map((item) => (
            <NavLink key={item.path} item={item} onClick={onItemClick} />
          ))}
        </div>

        {/* Secondary Navigation */}
        <div className="space-y-1">
          <p className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            Features
          </p>
          {secondaryNavItems.map((item) => (
            <NavLink key={item.path} item={item} onClick={onItemClick} />
          ))}
        </div>

        {/* Account Navigation */}
        <div className="space-y-1">
          <p className="px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
            Account
          </p>
          {accountNavItems.map((item) => (
            <NavLink key={item.path} item={item} onClick={onItemClick} />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-muted/50">
          <Avatar className="w-9 h-9">
            <AvatarImage src={user?.avatar} />
            <AvatarFallback className="bg-bluesea-primary text-white text-sm">
              {user?.name?.[0]}{user?.surname?.[0]}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm truncate">{user?.name} {user?.surname}</p>
            <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2 mt-3">
          <Button
            variant="ghost"
            size="icon"
            className="flex-1 h-9"
            onClick={toggleTheme}
          >
            {resolvedTheme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="flex-1 h-9 text-destructive hover:text-destructive"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );

  // Mobile Bottom Navigation
  const MobileBottomNav = () => (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50 safe-area-bottom">
      <div className="flex items-center justify-around px-2 py-2">
        {mainNavItems.slice(0, 5).map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all duration-fast',
                active ? 'text-bluesea-primary' : 'text-muted-foreground'
              )}
            >
              <Icon className="w-5 h-5" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <button className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl text-muted-foreground">
              <Menu className="w-5 h-5" />
              <span className="text-[10px] font-medium">More</span>
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80 p-0">
            <SidebarContent onItemClick={() => setIsMobileMenuOpen(false)} />
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      {!isSmallScreen && (
        <aside className="fixed left-0 top-0 bottom-0 w-72 bg-card border-r border-border z-40">
          <SidebarContent />
        </aside>
      )}

      {/* Mobile Header */}
      {isSmallScreen && (
        <header className="fixed top-0 left-0 right-0 h-16 bg-card border-b border-border z-40 flex items-center justify-between px-4">
          <Link to="/dashboard" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-bluesea-gradient-start to-bluesea-gradient-end flex items-center justify-center">
              <span className="text-white font-bold text-sm">B</span>
            </div>
            <span className="font-bold">BlueSea</span>
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {resolvedTheme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
            <Avatar className="w-8 h-8">
              <AvatarImage src={user?.avatar} />
              <AvatarFallback className="bg-bluesea-primary text-white text-xs">
                {user?.name?.[0]}{user?.surname?.[0]}
              </AvatarFallback>
            </Avatar>
          </div>
        </header>
      )}

      {/* Main Content */}
      <main className={cn(
        'min-h-screen',
        !isSmallScreen && 'ml-72',
        isSmallScreen && 'pt-16 pb-20'
      )}>
        <div className="p-6 max-w-7xl mx-auto">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      {isSmallScreen && <MobileBottomNav />}
    </div>
  );
}
