import FeedCard from '../FeedCard';
import designImage from '@assets/generated_images/Graphic_design_work_showcase_465d6773.png';

export default function FeedCardExample() {
  const mockPost = {
    id: '1',
    userId: 'user1',
    username: 'DesainKreatif',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix',
    image: designImage,
    description: 'Butuh desainer grafis profesional untuk branding bisnis Anda? Saya siap membantu dengan portofolio 5+ tahun pengalaman! 🎨',
    category: 'Desain Grafis',
    likes: ['user2', 'user3'],
    comments: [],
    bids: [],
    createdAt: new Date().toISOString(),
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <FeedCard 
        post={mockPost}
        currentUserId="user2"
        onLike={() => console.log('Like clicked')}
        onComment={() => console.log('Comment clicked')}
        onBid={() => console.log('Bid clicked')}
        onClick={() => console.log('Card clicked')}
      />
    </div>
  );
}
