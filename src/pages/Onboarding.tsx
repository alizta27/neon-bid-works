import { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useStore } from '@/lib/store';
import { ChevronRight, ChevronLeft, User, CreditCard, Camera, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Onboarding() {
  const [, setLocation] = useLocation();
  const { updateCurrentUser } = useStore();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  
  // Step 1: Profile Details
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [phone, setPhone] = useState('');
  
  // Step 2: KTP Upload
  const [ktpImage, setKtpImage] = useState<string | null>(null);
  
  // Step 3: Face Verification
  const [faceImage, setFaceImage] = useState<string | null>(null);

  const handleSkip = () => {
    // Mark onboarding as completed even if skipped
    localStorage.setItem('kerjaaja_onboarding_completed', 'true');
    toast({
      title: "Onboarding dilewati",
      description: "Anda dapat melengkapi profil nanti",
    });
    setLocation('/');
  };

  const handleNext = () => {
    if (step === 1 && !username) {
      toast({
        title: "Nama wajib diisi",
        description: "Silakan isi nama pengguna Anda",
        variant: "destructive",
      });
      return;
    }
    
    if (step < 3) {
      setStep(step + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    // Update user profile
    if (username) {
      updateCurrentUser({ username, bio });
    }
    
    // Mark onboarding as completed
    localStorage.setItem('kerjaaja_onboarding_completed', 'true');
    
    toast({
      title: "Profil berhasil dibuat!",
      description: "Selamat bergabung di KerjaAja",
    });
    
    setLocation('/');
  };

  const handleFileUpload = (type: 'ktp' | 'face', file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (type === 'ktp') {
        setKtpImage(reader.result as string);
      } else {
        setFaceImage(reader.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Lengkapi Profil</h1>
            <p className="text-sm text-muted-foreground">Step {step} dari 3</p>
          </div>
          <Button variant="ghost" onClick={handleSkip}>
            Lewati
          </Button>
        </div>
        
        {/* Progress Bar */}
        <div className="mt-4 flex gap-2">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-2 flex-1 rounded-full transition-colors ${
                s <= step ? 'bg-primary' : 'bg-muted'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {step === 1 && (
          <div className="space-y-6 max-w-md mx-auto">
            <div className="text-center mb-8">
              <div className="inline-block p-4 bg-primary/10 rounded-full mb-4">
                <User className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-xl font-semibold text-foreground mb-2">
                Detail Profil
              </h2>
              <p className="text-muted-foreground">
                Perkenalkan diri Anda kepada komunitas
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Nama Pengguna *</Label>
                <Input
                  id="username"
                  placeholder="Nama lengkap Anda"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Nomor Telepon</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="08xxxxxxxxxx"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  placeholder="Ceritakan tentang diri Anda..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={4}
                />
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 max-w-md mx-auto">
            <div className="text-center mb-8">
              <div className="inline-block p-4 bg-primary/10 rounded-full mb-4">
                <CreditCard className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-xl font-semibold text-foreground mb-2">
                Upload KTP
              </h2>
              <p className="text-muted-foreground">
                Untuk verifikasi identitas Anda
              </p>
            </div>

            <div className="space-y-4">
              {ktpImage ? (
                <div className="space-y-4">
                  <img
                    src={ktpImage}
                    alt="KTP Preview"
                    className="w-full rounded-lg border-2 border-primary"
                  />
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setKtpImage(null)}
                  >
                    Ganti Foto
                  </Button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center">
                  <CreditCard className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-sm text-muted-foreground mb-4">
                    Upload foto KTP Anda
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => document.getElementById('ktp-upload')?.click()}
                  >
                    Pilih Foto
                  </Button>
                  <input
                    id="ktp-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload('ktp', file);
                    }}
                  />
                </div>
              )}

              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-xs text-muted-foreground">
                  💡 Pastikan foto KTP jelas dan mudah dibaca. Data Anda akan dijaga kerahasiaannya.
                </p>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 max-w-md mx-auto">
            <div className="text-center mb-8">
              <div className="inline-block p-4 bg-primary/10 rounded-full mb-4">
                <Camera className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-xl font-semibold text-foreground mb-2">
                Verifikasi Wajah
              </h2>
              <p className="text-muted-foreground">
                Ambil foto selfie untuk verifikasi
              </p>
            </div>

            <div className="space-y-4">
              {faceImage ? (
                <div className="space-y-4">
                  <img
                    src={faceImage}
                    alt="Face Preview"
                    className="w-full aspect-square object-cover rounded-lg border-2 border-primary"
                  />
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setFaceImage(null)}
                  >
                    Ambil Ulang
                  </Button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-muted rounded-lg p-8 text-center">
                  <Camera className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-sm text-muted-foreground mb-4">
                    Ambil foto selfie Anda
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => document.getElementById('face-upload')?.click()}
                  >
                    Ambil Foto
                  </Button>
                  <input
                    id="face-upload"
                    type="file"
                    accept="image/*"
                    capture="user"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleFileUpload('face', file);
                    }}
                  />
                </div>
              )}

              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-xs text-muted-foreground">
                  💡 Pastikan wajah Anda terlihat jelas dan pencahayaan cukup.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="p-6 border-t border-border bg-background">
        <div className="flex gap-3">
          {step > 1 && (
            <Button
              variant="outline"
              size="lg"
              onClick={() => setStep(step - 1)}
              className="flex-1"
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Kembali
            </Button>
          )}
          <Button
            size="lg"
            onClick={handleNext}
            className="flex-1"
          >
            {step === 3 ? (
              <>
                <Check className="w-5 h-5 mr-2" />
                Selesai
              </>
            ) : (
              <>
                Lanjut
                <ChevronRight className="w-5 h-5 ml-2" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
