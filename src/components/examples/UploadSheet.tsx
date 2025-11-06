import { useState } from 'react';
import UploadSheet from '../UploadSheet';
import { Button } from '@/components/ui/button';

export default function UploadSheetExample() {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (data: { image: string; description: string; category: string }) => {
    console.log('New post submitted:', data);
    alert(`Post berhasil dibuat!\nKategori: ${data.category}\nDeskripsi: ${data.description.substring(0, 50)}...`);
  };

  return (
    <div className="p-4">
      <Button onClick={() => setIsOpen(true)} data-testid="button-open-upload">
        Buat Postingan Baru
      </Button>
      <UploadSheet
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
