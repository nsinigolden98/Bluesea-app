import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Calendar, MapPin, Search, Filter, Plus, Ticket } from 'lucide-react';
import { MainLayout } from '@/layouts';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

interface Event {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  time: string;
  venue: string;
  price: number;
  category: string;
  organizer: string;
  availableTickets: number;
}

const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Lagos Tech Fest 2025',
    description: 'The biggest technology conference in West Africa featuring top speakers and startups.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=250&fit=crop',
    date: '2025-03-15',
    time: '10:00 AM',
    venue: 'Eko Convention Centre, Lagos',
    price: 15000,
    category: 'Technology',
    organizer: 'TechHub Africa',
    availableTickets: 250,
  },
  {
    id: '2',
    title: 'Afrobeats Concert',
    description: 'An unforgettable night of music with top Afrobeats artists.',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=250&fit=crop',
    date: '2025-03-20',
    time: '7:00 PM',
    venue: 'Tafawa Balewa Square, Lagos',
    price: 10000,
    category: 'Music',
    organizer: 'Star Entertainment',
    availableTickets: 500,
  },
  {
    id: '3',
    title: 'Business Summit',
    description: 'Connect with industry leaders and entrepreneurs.',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&h=250&fit=crop',
    date: '2025-03-25',
    time: '9:00 AM',
    venue: 'Transcorp Hilton, Abuja',
    price: 25000,
    category: 'Business',
    organizer: 'Business Network NG',
    availableTickets: 100,
  },
  {
    id: '4',
    title: 'Fashion Week Lagos',
    description: 'Showcasing the best of African fashion and design.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=250&fit=crop',
    date: '2025-04-01',
    time: '6:00 PM',
    venue: 'Landmark Centre, Lagos',
    price: 8000,
    category: 'Fashion',
    organizer: 'Fashion Council',
    availableTickets: 300,
  },
  {
    id: '5',
    title: 'Food & Wine Festival',
    description: 'Experience culinary excellence from top chefs.',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=250&fit=crop',
    date: '2025-04-10',
    time: '12:00 PM',
    venue: 'Muri Okunola Park, Lagos',
    price: 5000,
    category: 'Food',
    organizer: 'Culinary Arts NG',
    availableTickets: 400,
  },
  {
    id: '6',
    title: 'Comedy Night Live',
    description: 'Laugh out loud with Nigeria\'s finest comedians.',
    image: 'https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=400&h=250&fit=crop',
    date: '2025-04-15',
    time: '8:00 PM',
    venue: 'Muson Centre, Lagos',
    price: 6000,
    category: 'Entertainment',
    organizer: 'Laugh Factory',
    availableTickets: 200,
  },
];

const categories = ['All', 'Technology', 'Music', 'Business', 'Fashion', 'Food', 'Entertainment'];

export function MarketplacePage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredEvents = mockEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-NG', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Marketplace</h1>
            <p className="text-muted-foreground">Discover and book amazing events</p>
          </div>
          <Button className="btn-bluesea-primary">
            <Plus className="w-4 h-4 mr-2" />
            Create Event
          </Button>
        </div>

        {/* Search and Filter */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search events..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
                <Filter className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={cn(
                      'px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all',
                      selectedCategory === category
                        ? 'bg-bluesea-primary text-white'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    )}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Events Grid */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Events</TabsTrigger>
            <TabsTrigger value="my-tickets">My Tickets</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <EventCard 
                  key={event.id} 
                  event={event} 
                  formatCurrency={formatCurrency}
                  formatDate={formatDate}
                  onClick={() => navigate(`/marketplace/event/${event.id}`)}
                />
              ))}
            </div>
            {filteredEvents.length === 0 && (
              <div className="text-center py-12">
                <ShoppingBag className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No events found</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="my-tickets">
            <div className="text-center py-12">
              <Ticket className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">You haven&apos;t purchased any tickets yet</p>
              <Button 
                className="mt-4 btn-bluesea-primary"
                onClick={() => {
                  const allTab = document.querySelector('[data-value="all"]') as HTMLElement;
                  allTab?.click();
                }}
              >
                Browse Events
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}

interface EventCardProps {
  event: Event;
  formatCurrency: (amount: number) => string;
  formatDate: (date: string) => string;
  onClick: () => void;
}

function EventCard({ event, formatCurrency, formatDate, onClick }: EventCardProps) {
  return (
    <Card 
      className="overflow-hidden cursor-pointer group hover:shadow-card-hover transition-all duration-300"
      onClick={onClick}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          <Badge className="bg-bluesea-primary text-white">
            {event.category}
          </Badge>
        </div>
        <div className="absolute bottom-3 right-3">
          <Badge variant="secondary" className="bg-white/90 text-foreground">
            {event.availableTickets} left
          </Badge>
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-1 group-hover:text-bluesea-primary transition-colors">
          {event.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {event.description}
        </p>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(event.date)} • {event.time}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span className="line-clamp-1">{event.venue}</span>
          </div>
        </div>
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
          <div>
            <p className="text-xs text-muted-foreground">Starting from</p>
            <p className="font-bold text-bluesea-primary">{formatCurrency(event.price)}</p>
          </div>
          <Button size="sm" className="btn-bluesea-primary">
            Get Tickets
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
