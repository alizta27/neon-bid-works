import { useState } from "react";
import { useLocation } from "wouter";
import { useStore } from "@/lib/store";
import FeedCard from "@/components/FeedCard";
import CommentSheet from "@/components/CommentSheet";
import BidSheet from "@/components/BidSheet";
import SearchBar from "@/components/SearchBar";
import BottomNav from "@/components/BottomNav";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Search() {
  const [, setLocation] = useLocation();
  const {
    posts,
    currentUser,
    searchQuery,
    selectedCategory,
    setSearchQuery,
    setSelectedCategory,
    toggleLike,
    addComment,
    addBid,
  } = useStore();
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const [showComments, setShowComments] = useState(false);
  const [showBids, setShowBids] = useState(false);

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      searchQuery === "" ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.username.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "Semua" || post.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

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

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 z-40 bg-card border-b border-card-border backdrop-blur-sm">
        <div className="max-w-lg mx-auto p-4">
          <h1
            className="text-xl font-bold mb-3"
            data-testid="text-search-title"
          >
            Cari Pekerjaan
          </h1>
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>
      </header>

      <ScrollArea className="h-[calc(100vh-12rem)]">
        {filteredPosts.length === 0 ? (
          <div className="max-w-lg mx-auto p-4 space-y-4">
            <div className="text-center py-12">
              <p
                className="text-muted-foreground"
                data-testid="text-no-results"
              >
                Tidak ada hasil ditemukan
              </p>
            </div>
          </div>
        ) : (
          <>
            <div className="max-w-lg mx-auto p-4">
              <p
                className="text-sm text-muted-foreground"
                data-testid="text-result-count"
              >
                Ditemukan {filteredPosts.length} pekerjaan
              </p>
            </div>
            {filteredPosts.map((post) => (
              <FeedCard
                key={post.id}
                post={post}
                currentUserId={currentUser?.id}
                onLike={() => handleLike(post.id)}
                onComment={() => handleCommentOpen(post.id)}
                onBid={() => handleBidOpen(post.id)}
                onClick={() => setLocation(`/post/${post.id}`)}
              />
            ))}
          </>
        )}
      </ScrollArea>

      {selectedPostData && (
        <>
          <CommentSheet
            comments={selectedPostData.comments}
            isOpen={showComments}
            onClose={() => setShowComments(false)}
            onAddComment={handleAddComment}
            currentUserAvatar={currentUser?.avatar}
            currentUsername={currentUser?.username}
          />
          <BidSheet
            bids={selectedPostData.bids}
            isOpen={showBids}
            onClose={() => setShowBids(false)}
            onAddBid={handleAddBid}
            currentUserAvatar={currentUser?.avatar}
            currentUsername={currentUser?.username}
          />
        </>
      )}

      <BottomNav />
    </div>
  );
}
