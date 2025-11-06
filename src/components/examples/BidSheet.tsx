import { useState } from 'react';
import BidSheet from '../BidSheet';
import { Button } from '@/components/ui/button';

export default function BidSheetExample() {
  const [isOpen, setIsOpen] = useState(false);
  const [bids, setBids] = useState([
    {
      id: '1',
      userId: 'user1',
      username: 'AhmadPro',
      amount: 500000,
      message: 'Saya bisa selesaikan dalam 3 hari dengan kualitas terbaik!',
      createdAt: new Date(Date.now() - 7200000).toISOString(),
    },
    {
      id: '2',
      userId: 'user2',
      username: 'DesignStudio',
      amount: 750000,
      message: 'Berpengalaman 10 tahun, portofolio lengkap tersedia.',
      createdAt: new Date(Date.now() - 3600000).toISOString(),
    },
  ]);

  const handleAddBid = (amount: number, message: string) => {
    const newBid = {
      id: Date.now().toString(),
      userId: 'current',
      username: 'Anda',
      amount,
      message,
      createdAt: new Date().toISOString(),
    };
    setBids([...bids, newBid]);
  };

  return (
    <div className="p-4">
      <Button onClick={() => setIsOpen(true)} data-testid="button-open-bids">
        Lihat Penawaran ({bids.length})
      </Button>
      <BidSheet
        bids={bids}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onAddBid={handleAddBid}
        currentUserAvatar="https://api.dicebear.com/7.x/avataaars/svg?seed=You"
        currentUsername="Anda"
      />
    </div>
  );
}
