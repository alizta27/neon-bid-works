import { Home, Search, PlusCircle, MessageCircle, User } from 'lucide-react';
import { useLocation } from 'wouter';
import { useStore } from '@/lib/store';
import { Badge } from '@/components/ui/badge';

export default function BottomNav() {
  const [location, setLocation] = useLocation();
  const { conversations, currentUser } = useStore();

  const unreadCount = conversations.reduce((total, conv) => total + conv.unreadCount, 0);

  const navItems = [
    { icon: Home, label: 'Beranda', path: '/', testId: 'nav-home' },
    { icon: Search, label: 'Cari', path: '/search', testId: 'nav-search' },
    { icon: PlusCircle, label: 'Unggah', path: '/upload', testId: 'nav-upload' },
    { icon: MessageCircle, label: 'Chat', path: '/chat', testId: 'nav-chat', badge: unreadCount },
    { icon: User, label: 'Profil', path: '/profile', testId: 'nav-profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-card-border z-50 safe-area-bottom">
      <div className="flex justify-around items-center h-16 max-w-lg mx-auto px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location === item.path;
          
          return (
            <button
              key={item.path}
              onClick={() => setLocation(item.path)}
              data-testid={item.testId}
              className={`relative flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-lg transition-all ${
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover-elevate'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'scale-110' : ''}`} />
                {item.badge && item.badge > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-2 -right-2 h-4 w-4 p-0 flex items-center justify-center text-[10px]"
                  >
                    {item.badge > 9 ? '9+' : item.badge}
                  </Badge>
                )}
              </div>
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
