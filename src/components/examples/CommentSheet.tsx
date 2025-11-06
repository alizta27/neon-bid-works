import { useState } from 'react';
import CommentSheet from '../CommentSheet';
import { Button } from '@/components/ui/button';

export default function CommentSheetExample() {
  const [isOpen, setIsOpen] = useState(false);
  const [comments, setComments] = useState([
    {
      id: '1',
      userId: 'user1',
      username: 'BudiSantoso',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Budi',
      text: 'Keren banget! Berapa harganya?',
      createdAt: new Date(Date.now() - 3600000).toISOString(),
    },
    {
      id: '2',
      userId: 'user2',
      username: 'SitiNur',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Siti',
      text: 'Bagus sekali hasil karyanya! 👍',
      createdAt: new Date(Date.now() - 1800000).toISOString(),
    },
  ]);

  const handleAddComment = (text: string) => {
    const newComment = {
      id: Date.now().toString(),
      userId: 'current',
      username: 'Anda',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=You',
      text,
      createdAt: new Date().toISOString(),
    };
    setComments([...comments, newComment]);
  };

  return (
    <div className="p-4">
      <Button onClick={() => setIsOpen(true)} data-testid="button-open-comments">
        Lihat Komentar ({comments.length})
      </Button>
      <CommentSheet
        comments={comments}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onAddComment={handleAddComment}
        currentUserAvatar="https://api.dicebear.com/7.x/avataaars/svg?seed=You"
        currentUsername="Anda"
      />
    </div>
  );
}
