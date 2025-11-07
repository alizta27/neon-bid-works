import { useState } from "react";
import { X, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { User } from "@/lib/store";

interface EditProfileSheetProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
  onSave: (data: { username: string; bio: string; avatar: string }) => void;
}

export default function EditProfileSheet({
  isOpen,
  onClose,
  currentUser,
  onSave,
}: EditProfileSheetProps) {
  const [username, setUsername] = useState(currentUser.username);
  const [bio, setBio] = useState(currentUser.bio);
  const [avatar, setAvatar] = useState(currentUser.avatar);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() && bio.trim()) {
      onSave({ username: username.trim(), bio: bio.trim(), avatar });
      onClose();
    }
  };

  const handleAvatarChange = () => {
    const seed = Math.random().toString(36).substring(7);
    const newAvatar = `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`;
    setAvatar(newAvatar);
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-50 animate-in fade-in"
        onClick={onClose}
        data-testid="overlay-edit-profile"
      />

      <div className="pb-16 fixed inset-x-0 bottom-0 z-50 bg-background rounded-t-2xl shadow-xl animate-in slide-in-from-bottom max-h-[85vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3
            className="text-lg font-semibold"
            data-testid="text-edit-profile-title"
          >
            Edit Profil
          </h3>
          <Button
            size="icon"
            variant="ghost"
            onClick={onClose}
            data-testid="button-close-edit-profile"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto p-4 space-y-4"
        >
          <div className="flex flex-col items-center gap-3">
            <div className="relative">
              <Avatar
                className="w-24 h-24 border-4 border-primary"
                data-testid="avatar-edit"
              >
                <AvatarImage src={avatar} alt={username} />
                <AvatarFallback className="text-2xl">
                  {username[0]?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <Button
                type="button"
                size="icon"
                className="absolute bottom-0 right-0 rounded-full"
                onClick={handleAvatarChange}
                data-testid="button-change-avatar"
              >
                <Camera className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Klik ikon kamera untuk ganti avatar
            </p>
          </div>

          <div>
            <Label htmlFor="username">Nama Pengguna</Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Masukkan nama pengguna"
              className="mt-2"
              data-testid="input-edit-username"
            />
          </div>

          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Ceritakan tentang diri Anda..."
              rows={4}
              className="mt-2"
              data-testid="input-edit-bio"
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={!username.trim() || !bio.trim()}
            data-testid="button-save-profile"
          >
            Simpan Perubahan
          </Button>
        </form>
      </div>
    </>
  );
}
