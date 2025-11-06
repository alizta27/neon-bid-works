import { useState } from 'react';
import { useLocation } from 'wouter';
import { useStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import dummyUsers from '@/dummy/users.json';

export default function Auth() {
  const [, setLocation] = useLocation();
  const { setCurrentUser } = useStore();
  const { toast } = useToast();
  
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerUsername, setRegisterUsername] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    const user = dummyUsers.find(
      u => u.email === loginEmail && u.password === loginPassword
    );

    if (user) {
      setCurrentUser({
        id: user.id,
        username: user.username,
        avatar: user.avatar,
        bio: user.bio,
        tokens: user.tokens,
      });
      
      toast({
        title: "Berhasil masuk!",
        description: `Selamat datang kembali, ${user.username}!`,
      });
      
      setLocation('/');
    } else {
      toast({
        title: "Gagal masuk",
        description: "Email atau password salah.",
        variant: "destructive",
      });
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    const existingUser = dummyUsers.find(u => u.email === registerEmail);
    
    if (existingUser) {
      toast({
        title: "Gagal daftar",
        description: "Email sudah terdaftar.",
        variant: "destructive",
      });
      return;
    }

    const newUser = {
      id: Date.now().toString(),
      username: registerUsername,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${registerUsername}`,
      bio: "Pengguna baru",
      tokens: 100,
    };

    setCurrentUser(newUser);
    
    toast({
      title: "Berhasil daftar!",
      description: `Selamat datang, ${newUser.username}!`,
    });
    
    setLocation('/');
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-card-border">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">KerjaAja</CardTitle>
          <CardDescription>Platform penyedia jasa terpercaya</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Masuk</TabsTrigger>
              <TabsTrigger value="register">Daftar</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="nama@email.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                  />
                </div>

                <Button type="submit" className="w-full">
                  Masuk
                </Button>

                <div className="text-sm text-muted-foreground text-center mt-4">
                  <p>Coba dengan akun demo:</p>
                  <p className="font-mono text-xs mt-1">budi@example.com / password123</p>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="register-username">Nama Pengguna</Label>
                  <Input
                    id="register-username"
                    type="text"
                    placeholder="username_kamu"
                    value={registerUsername}
                    onChange={(e) => setRegisterUsername(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="register-email">Email</Label>
                  <Input
                    id="register-email"
                    type="email"
                    placeholder="nama@email.com"
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="register-password">Password</Label>
                  <Input
                    id="register-password"
                    type="password"
                    placeholder="••••••••"
                    value={registerPassword}
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    required
                    minLength={6}
                  />
                </div>

                <Button type="submit" className="w-full">
                  Daftar
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
