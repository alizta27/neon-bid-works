import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { useStore } from '@/lib/store';
import UploadSheet from '@/components/UploadSheet';
import BottomNav from '@/components/BottomNav';

export default function Upload() {
  const [, setLocation] = useLocation();
  const { currentUser, addPost } = useStore();

  useEffect(() => {
    if (!currentUser) {
      setLocation('/');
    }
  }, [currentUser, setLocation]);

  const handleSubmit = (data: { image: string; description: string; category: string; location: string; budget: string; type: 'cari-jasa' | 'tawarkan-jasa' }) => {
    if (currentUser) {
      addPost({
        userId: currentUser.id,
        username: currentUser.username,
        avatar: currentUser.avatar,
        images: [data.image],
        description: data.description,
        categories: [data.category],
        location: data.location,
        budget: data.budget,
        type: data.type,
      });
      setLocation('/');
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <UploadSheet
        isOpen={true}
        onClose={() => setLocation('/')}
        onSubmit={handleSubmit}
      />
      <BottomNav />
    </div>
  );
}
