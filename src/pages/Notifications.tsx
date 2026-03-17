import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { notifications } from '@/data';
import { cn } from '@/lib/utils';
import { 
  ArrowLeft, 
  Bell, 
  Gift, 
  TrendingUp, 
  Megaphone,
  CheckCircle2,
  Trash2,
  CheckCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const iconMap: Record<string, { icon: React.ComponentType<{ className?: string }>; color: string }> = {
  transaction: { icon: TrendingUp, color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' },
  reward: { icon: Gift, color: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' },
  announcement: { icon: Megaphone, color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400' },
};

export function Notifications() {
  const navigate = useNavigate();
  const [notifs, setNotifs] = useState(notifications);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const filteredNotifs = filter === 'unread' 
    ? notifs.filter(n => !n.read) 
    : notifs;

  const unreadCount = notifs.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifs(notifs.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllAsRead = () => {
    setNotifs(notifs.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifs(notifs.filter(n => n.id !== id));
  };

  const clearAll = () => {
    setNotifs([]);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3 px-4 py-4">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-slate-800 dark:text-white">Notifications</h1>
            <p className="text-sm text-slate-500">{unreadCount} unread</p>
          </div>
          {unreadCount > 0 && (
            <button 
              onClick={markAllAsRead}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
              title="Mark all as read"
            >
              <CheckCheck className="w-5 h-5 text-sky-500" />
            </button>
          )}
        </div>

        {/* Filter Tabs */}
        <div className="flex px-4 gap-4">
          <button
            onClick={() => setFilter('all')}
            className={cn(
              'pb-3 text-sm font-medium border-b-2 transition-colors',
              filter === 'all'
                ? 'border-sky-500 text-sky-500'
                : 'border-transparent text-slate-500'
            )}
          >
            All
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={cn(
              'pb-3 text-sm font-medium border-b-2 transition-colors',
              filter === 'unread'
                ? 'border-sky-500 text-sky-500'
                : 'border-transparent text-slate-500'
            )}
          >
            Unread {unreadCount > 0 && `(${unreadCount})`}
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <main className="p-4">
        <div className="max-w-2xl mx-auto">
          {filteredNotifs.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">
                No notifications
              </h3>
              <p className="text-slate-500">
                {filter === 'unread' ? 'You have no unread notifications' : 'Your notification list is empty'}
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {filteredNotifs.map((notification) => {
                const { icon: Icon, color } = iconMap[notification.type];
                return (
                  <div 
                    key={notification.id}
                    className={cn(
                      'group relative p-4 rounded-2xl transition-all',
                      notification.read
                        ? 'bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800'
                        : 'bg-sky-50 dark:bg-sky-900/10 border border-sky-100 dark:border-sky-900/30'
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0', color)}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className={cn(
                            'font-medium',
                            notification.read ? 'text-slate-700 dark:text-slate-300' : 'text-slate-800 dark:text-white'
                          )}>
                            {notification.title}
                          </h4>
                          {!notification.read && (
                            <span className="w-2 h-2 bg-sky-500 rounded-full flex-shrink-0 mt-2" />
                          )}
                        </div>
                        <p className="text-sm text-slate-500 mt-1">{notification.message}</p>
                        <p className="text-xs text-slate-400 mt-2">{notification.date}</p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-1 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 opacity-0 group-hover:opacity-100 transition-opacity">
                      {!notification.read && (
                        <button 
                          onClick={() => markAsRead(notification.id)}
                          className="flex items-center gap-1 px-3 py-1.5 text-sm text-sky-500 hover:bg-sky-50 rounded-lg transition-colors"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          Mark as read
                        </button>
                      )}
                      <button 
                        onClick={() => deleteNotification(notification.id)}
                        className="flex items-center gap-1 px-3 py-1.5 text-sm text-red-500 hover:bg-red-50 rounded-lg transition-colors ml-auto"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {filteredNotifs.length > 0 && (
            <Button 
              variant="outline" 
              onClick={clearAll}
              className="w-full mt-4"
            >
              Clear All Notifications
            </Button>
          )}
        </div>
      </main>
    </div>
  );
}
