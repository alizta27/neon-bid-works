import { useLocation } from "wouter";
import { useStore } from "@/lib/store";
import ProfileHeader from "@/components/ProfileHeader";
import FeedCard from "@/components/FeedCard";
import EditProfileSheet from "@/components/EditProfileSheet";
import BottomNav from "@/components/BottomNav";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import CommentSheet from "@/components/CommentSheet";
import BidSheet from "@/components/BidSheet";
import { useToast } from "@/hooks/use-toast";

export default function Profile() {
  const [, setLocation] = useLocation();
  const {
    currentUser,
    posts,
    toggleLike,
    addComment,
    addBid,
    updateCurrentUser,
    logout,
  } = useStore();
  const { toast } = useToast();
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const [showComments, setShowComments] = useState(false);
  const [showBids, setShowBids] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);

  const myPosts = posts.filter((p) => p.userId === currentUser?.id);
  const likedPosts = posts.filter(
    (p) => currentUser && p.likes.includes(currentUser.id)
  );

  const handleLike = (postId: string) => {
    if (currentUser) {
      toggleLike(postId, currentUser.id);
    }
  };

  const handleCommentOpen = (postId: string) => {
    setSelectedPost(postId);
    setShowComments(true);
  };

  const handleBidOpen = (postId: string) => {
    setSelectedPost(postId);
    setShowBids(true);
  };

  const handleAddComment = (text: string) => {
    if (selectedPost && currentUser) {
      addComment(selectedPost, {
        userId: currentUser.id,
        username: currentUser.username,
        avatar: currentUser.avatar,
        text,
      });
    }
  };

  const handleAddBid = (amount: number, message: string) => {
    if (selectedPost && currentUser) {
      addBid(selectedPost, {
        userId: currentUser.id,
        username: currentUser.username,
        amount,
        message,
      });
    }
  };

  const selectedPostData = posts.find((p) => p.id === selectedPost);

  const handleSaveProfile = (data: {
    username: string;
    bio: string;
    avatar: string;
  }) => {
    updateCurrentUser(data);
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Berhasil keluar",
      description: "Sampai jumpa lagi!",
    });
    setLocation("/auth");
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-background pb-20 flex items-center justify-center">
        <p className="text-muted-foreground">Silakan login terlebih dahulu</p>
        <BottomNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 z-40 bg-card border-b border-card-border">
        <div className="max-w-lg mx-auto p-4">
          <h1 className="text-xl font-bold" data-testid="text-profile-title">
            Profil
          </h1>
        </div>
      </header>

      <ScrollArea className="h-[calc(100vh-8rem)]">
        <div className="max-w-lg mx-auto p-4 space-y-4">
          <ProfileHeader
            username={currentUser.username}
            avatar={currentUser.avatar}
            bio={currentUser.bio}
            tokens={currentUser.tokens}
            postCount={myPosts.length}
            onEditProfile={() => setShowEditProfile(true)}
            handleLogout={handleLogout}
          />

          <Tabs defaultValue="posts" className="w-full">
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="posts" data-testid="tab-my-posts">
                Postingan Saya
              </TabsTrigger>
              <TabsTrigger value="liked" data-testid="tab-liked-posts">
                Disimpan
              </TabsTrigger>
            </TabsList>

            <TabsContent value="posts" className="space-y-4 mt-4">
              {myPosts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Belum ada postingan</p>
                </div>
              ) : (
                myPosts.map((post) => (
                  <FeedCard
                    key={post.id}
                    post={post}
                    currentUserId={currentUser.id}
                    onLike={() => handleLike(post.id)}
                    onComment={() => handleCommentOpen(post.id)}
                    onBid={() => handleBidOpen(post.id)}
                    onClick={() => setLocation(`/post/${post.id}`)}
                  />
                ))
              )}
            </TabsContent>

            <TabsContent value="liked" className="space-y-4 mt-4">
              {likedPosts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    Belum ada postingan yang disimpan
                  </p>
                </div>
              ) : (
                likedPosts.map((post) => (
                  <FeedCard
                    key={post.id}
                    post={post}
                    currentUserId={currentUser.id}
                    onLike={() => handleLike(post.id)}
                    onComment={() => handleCommentOpen(post.id)}
                    onBid={() => handleBidOpen(post.id)}
                    onClick={() => setLocation(`/post/${post.id}`)}
                  />
                ))
              )}
            </TabsContent>
          </Tabs>
        </div>
      </ScrollArea>

      {selectedPostData && (
        <>
          <CommentSheet
            comments={selectedPostData.comments}
            isOpen={showComments}
            onClose={() => setShowComments(false)}
            onAddComment={handleAddComment}
            currentUserAvatar={currentUser.avatar}
            currentUsername={currentUser.username}
          />
          <BidSheet
            bids={selectedPostData.bids}
            isOpen={showBids}
            onClose={() => setShowBids(false)}
            onAddBid={handleAddBid}
            currentUserAvatar={currentUser.avatar}
            currentUsername={currentUser.username}
          />
        </>
      )}

      <EditProfileSheet
        isOpen={showEditProfile}
        onClose={() => setShowEditProfile(false)}
        currentUser={currentUser}
        onSave={handleSaveProfile}
      />

      <BottomNav />
    </div>
  );
}
