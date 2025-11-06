import { Edit, Coins } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ProfileHeaderProps {
  username: string;
  avatar: string;
  bio: string;
  tokens: number;
  postCount: number;
  onEditProfile?: () => void;
}

export default function ProfileHeader({
  username,
  avatar,
  bio,
  tokens,
  postCount,
  onEditProfile,
}: ProfileHeaderProps) {
  return (
    <div className="bg-card rounded-xl p-6 border border-card-border">
      <div className="flex flex-col items-center text-center">
        <Avatar className="w-24 h-24 border-4 border-primary mb-4" data-testid="avatar-profile">
          <AvatarImage src={avatar} alt={username} />
          <AvatarFallback className="text-2xl">{username[0]?.toUpperCase()}</AvatarFallback>
        </Avatar>

        <h2 className="text-2xl font-bold mb-2" data-testid="text-profile-username">
          {username}
        </h2>

        <p className="text-muted-foreground text-sm mb-4 max-w-md" data-testid="text-profile-bio">
          {bio}
        </p>

        <div className="flex items-center gap-4 mb-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary" data-testid="text-post-count">
              {postCount}
            </p>
            <p className="text-xs text-muted-foreground">Postingan</p>
          </div>
          
          <div className="w-px h-12 bg-border" />

          <div className="text-center">
            <div className="flex items-center justify-center gap-1">
              <Coins className="w-5 h-5 text-chart-4" />
              <p className="text-2xl font-bold text-chart-4" data-testid="text-token-count">
                {tokens.toLocaleString('id-ID')}
              </p>
            </div>
            <p className="text-xs text-muted-foreground">Token</p>
          </div>
        </div>

        <Button 
          variant="outline" 
          className="w-full max-w-xs"
          onClick={onEditProfile}
          data-testid="button-edit-profile"
        >
          <Edit className="w-4 h-4 mr-2" />
          Edit Profil
        </Button>
      </div>
    </div>
  );
}
