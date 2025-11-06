import { useState } from 'react';
import EditProfileSheet from '../EditProfileSheet';
import { Button } from '@/components/ui/button';

export default function EditProfileSheetExample() {
  const [isOpen, setIsOpen] = useState(false);
  const mockUser = {
    id: 'user1',
    username: 'JohnDoe',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    bio: 'Desainer grafis profesional dengan 5+ tahun pengalaman.',
    tokens: 12500,
  };

  const handleSave = (data: { username: string; bio: string; avatar: string }) => {
    console.log('Profile updated:', data);
    alert(`Profil berhasil diperbarui!\nNama: ${data.username}\nBio: ${data.bio}`);
  };

  return (
    <div className="p-4">
      <Button onClick={() => setIsOpen(true)} data-testid="button-open-edit">
        Edit Profil
      </Button>
      <EditProfileSheet
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        currentUser={mockUser}
        onSave={handleSave}
      />
    </div>
  );
}
