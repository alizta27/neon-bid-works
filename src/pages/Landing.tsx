import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ChevronRight, Briefcase, Users, Shield } from "lucide-react";

export default function Landing() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-card to-background">
      {/* Header */}
      <div className="p-6 text-center pt-16">
        <div className="inline-block p-4 bg-primary rounded-2xl mb-4">
          <Briefcase className="w-12 h-12 text-primary-foreground" />
        </div>
        <h1 className="text-4xl font-bold text-foreground mb-2">KerjaAja</h1>
        <p className="text-muted-foreground">
          Platform freelancing sosial Indonesia
        </p>
      </div>

      {/* Main Content */}
      <div className="px-6 py-8 space-y-8">
        {/* Feature Cards */}
        <div className="space-y-4">
          <div className="bg-card border border-card-border rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-xl">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">
                  Temukan Freelancer
                </h3>
                <p className="text-sm text-muted-foreground">
                  Jelajahi ribuan penyedia jasa terpercaya di Indonesia
                </p>
              </div>
            </div>
          </div>

          <div className="bg-card border border-card-border rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-xl">
                <Briefcase className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">
                  Tawarkan Jasa
                </h3>
                <p className="text-sm text-muted-foreground">
                  Tampilkan karya Anda dan dapatkan pekerjaan
                </p>
              </div>
            </div>
          </div>
          {/* 
          <div className="bg-card border border-card-border rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-xl">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">
                  Transaksi Aman
                </h3>
                <p className="text-sm text-muted-foreground">
                  Sistem token dan verifikasi pengguna terpercaya
                </p>
              </div>
            </div>
          </div> */}
        </div>

        {/* CTA Image Section */}
        <div className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-8 text-center">
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-primary-foreground">
              Mulai Sekarang!
            </h2>
            <p className="text-primary-foreground/90">
              Bergabung dengan ribuan freelancer dan employer di seluruh
              Indonesia
            </p>

            <Button
              onClick={() => setLocation("/auth")}
              className="w-full h-14 text-lg font-semibold"
              size="lg"
            >
              Mulai Sekarang
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
