import { useState } from "react";
import { useLocation } from "wouter";
import { useStore } from "@/lib/store";
import FeedCard from "@/components/FeedCard";
import CommentSheet from "@/components/CommentSheet";
import BidSheet from "@/components/BidSheet";
import SearchBar from "@/components/SearchBar";
import BottomNav from "@/components/BottomNav";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

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
  const [filterLocation, setFilterLocation] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'cari-jasa' | 'tawarkan-jasa'>('all');
  const [filterBudgetMin, setFilterBudgetMin] = useState('');
  const [filterBudgetMax, setFilterBudgetMax] = useState('');

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      searchQuery === "" ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.username.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "Semua" || 
      (post.categories && post.categories.includes(selectedCategory));

    const matchesLocation =
      !filterLocation || post.location?.toLowerCase().includes(filterLocation.toLowerCase());
    
    const matchesType =
      filterType === 'all' || post.type === filterType;

    return matchesSearch && matchesCategory && matchesLocation && matchesType;
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
          <div className="flex items-center justify-between mb-3">
            <h1
              className="text-xl font-bold"
              data-testid="text-search-title"
            >
              Cari Pekerjaan
            </h1>
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="outline" size="sm" data-testid="button-filter">
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Filter Pencarian</DrawerTitle>
                </DrawerHeader>
                <div className="p-4 space-y-4 max-h-[60vh] overflow-y-auto">
                  <div>
                    <Label>Kategori</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {['Semua', 'Desain Grafis', 'Pemrograman', 'Fotografi', 'Videografi', 'Penulisan', 'Marketing', 'Renovasi', 'Kerajinan', 'Katering', 'Lainnya'].map((cat) => (
                        <Button
                          key={cat}
                          type="button"
                          variant={selectedCategory === cat ? "default" : "outline"}
                          size="sm"
                          onClick={() => setSelectedCategory(cat)}
                          className="text-xs"
                        >
                          {cat}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="filter-location">Lokasi</Label>
                    <Input
                      id="filter-location"
                      value={filterLocation}
                      onChange={(e) => setFilterLocation(e.target.value)}
                      placeholder="Masukkan lokasi"
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label>Jenis</Label>
                    <div className="flex gap-2 mt-2">
                      <Button
                        type="button"
                        variant={filterType === 'all' ? "default" : "outline"}
                        size="sm"
                        onClick={() => setFilterType('all')}
                        className="flex-1"
                      >
                        Semua
                      </Button>
                      <Button
                        type="button"
                        variant={filterType === 'cari-jasa' ? "default" : "outline"}
                        size="sm"
                        onClick={() => setFilterType('cari-jasa')}
                        className="flex-1"
                      >
                        Cari Jasa
                      </Button>
                      <Button
                        type="button"
                        variant={filterType === 'tawarkan-jasa' ? "default" : "outline"}
                        size="sm"
                        onClick={() => setFilterType('tawarkan-jasa')}
                        className="flex-1"
                      >
                        Tawarkan Jasa
                      </Button>
                    </div>
                  </div>
                </div>
                <DrawerFooter>
                  <DrawerClose asChild>
                    <Button variant="outline">Tutup</Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>
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
