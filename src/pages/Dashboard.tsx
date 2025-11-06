import { useStore } from "@/lib/store";
import DashboardCard from "@/components/DashboardCard";
import BottomNav from "@/components/BottomNav";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Coins,
  Briefcase,
  CheckCircle,
  MessageCircle,
  TrendingUp,
  Tag,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Dashboard() {
  const { currentUser, posts } = useStore();

  const myPosts = posts.filter((p) => p.userId === currentUser?.id);
  const totalLikes = myPosts.reduce((sum, p) => sum + p.likes.length, 0);
  const totalComments = myPosts.reduce((sum, p) => sum + p.comments.length, 0);
  const totalBids = myPosts.reduce((sum, p) => sum + p.bids.length, 0);

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 z-40 bg-card border-b border-card-border">
        <div className="max-w-lg mx-auto p-4">
          <h1 className="text-xl font-bold" data-testid="text-dashboard-title">
            Dashboard
          </h1>
        </div>
      </header>

      <ScrollArea className="h-[calc(100vh-8rem)]">
        <div className="max-w-lg mx-auto p-4 space-y-4">
          {currentUser && (
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <Avatar className="w-16 h-16 border-2 border-primary">
                  <AvatarImage
                    src={currentUser.avatar}
                    alt={currentUser.username}
                  />
                  <AvatarFallback>
                    {currentUser.username[0]?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h2
                    className="font-bold text-lg"
                    data-testid="text-dashboard-username"
                  >
                    {currentUser.username}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {currentUser.bio}
                  </p>
                </div>
              </div>
            </Card>
          )}

          <div className="grid grid-cols-2 gap-3">
            <DashboardCard
              title="Token Saya"
              value={currentUser?.tokens.toLocaleString("id-ID") || "0"}
            />
            <DashboardCard title="Total Postingan" value={myPosts.length} />
            <DashboardCard title="Total Suka" value={totalLikes} />
            <DashboardCard title="Total Komentar" value={totalComments} />
            <DashboardCard title="Total Penawaran" value={totalBids} />
            <DashboardCard title="Rating" value="4.9" description="35 ulasan" />
          </div>

          <div>
            <h3
              className="font-semibold mb-3"
              data-testid="text-activity-title"
            >
              Aktivitas Terbaru
            </h3>
            {myPosts.length === 0 ? (
              <Card className="p-8 text-center">
                <p className="text-muted-foreground">Belum ada postingan</p>
              </Card>
            ) : (
              <div className="space-y-3">
                {myPosts.slice(0, 5).map((post) => (
                  <Card
                    key={post.id}
                    className="p-4 hover-elevate"
                    data-testid={`card-activity-${post.id}`}
                  >
                    <div className="flex gap-3">
                      <img
                        src={post.images?.[0] || ""}
                        alt={post.description}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">
                          {post.description}
                        </p>
                        <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                          <span>{post.likes.length} suka</span>
                          <span>{post.comments.length} komentar</span>
                          <span>{post.bids.length} penawaran</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </ScrollArea>

      <BottomNav />
    </div>
  );
}
