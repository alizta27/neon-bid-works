import { useState } from "react";
import { useRoute, useLocation } from "wouter";
import { useStore } from "@/lib/store";
import { ArrowLeft, Heart, MessageCircle, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import CommentSheet from "@/components/CommentSheet";
import BidSheet from "@/components/BidSheet";
import BottomNav from "@/components/BottomNav";

export default function PostDetail() {
  const [, params] = useRoute("/post/:id");
  const [, setLocation] = useLocation();
  const { posts, currentUser, toggleLike, addComment, addBid } = useStore();
  const [showComments, setShowComments] = useState(false);
  const [showBids, setShowBids] = useState(false);

  const postId = (params as { id: string } | null)?.id || "";
  const post = posts.find((p) => p.id === postId);

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Postingan tidak ditemukan</p>
      </div>
    );
  }

  const isLiked = currentUser ? post.likes.includes(currentUser.id) : false;

  const handleLike = () => {
    if (currentUser) {
      toggleLike(post.id, currentUser.id);
    }
  };

  const handleAddComment = (text: string) => {
    if (currentUser) {
      addComment(post.id, {
        userId: currentUser.id,
        username: currentUser.username,
        avatar: currentUser.avatar,
        text,
      });
    }
  };

  const handleAddBid = (amount: number, message: string) => {
    if (currentUser) {
      addBid(post.id, {
        userId: currentUser.id,
        username: currentUser.username,
        amount,
        message,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 z-40 bg-card border-b border-card-border">
        <div className="flex items-center gap-3 p-4 max-w-lg mx-auto">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setLocation("/")}
            data-testid="button-back"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold" data-testid="text-detail-title">
            Detail Pekerjaan
          </h1>
        </div>
      </header>

      <ScrollArea className="h-[calc(100vh-8rem)]">
        <div className="max-w-lg mx-auto">
          {post.images && post.images.length > 1 ? (
            <Carousel className="w-full">
              <CarouselContent>
                {post.images.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="aspect-square bg-muted">
                      <img
                        src={image}
                        alt={`${post.description} - ${index + 1}`}
                        className="w-full h-full object-cover"
                        data-testid={`img-post-detail-${index}`}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>
          ) : (
            <div className="aspect-square bg-muted">
              <img
                src={post.images?.[0] || ""}
                alt={post.description}
                className="w-full h-full object-cover"
                data-testid="img-post-detail"
              />
            </div>
          )}

          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12 border-2 border-muted">
                  <AvatarImage src={post.avatar} alt={post.username} />
                  <AvatarFallback>
                    {post.username[0]?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p
                    className="font-semibold"
                    data-testid="text-detail-username"
                  >
                    {post.username}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(post.createdAt).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {post.categories?.map((category, index) => (
                <Badge
                  key={index}
                  variant="default"
                  data-testid={`badge-detail-category-${index}`}
                >
                  {category}
                </Badge>
              ))}
            </div>

            <div>
              <p
                className="leading-relaxed text-sm"
                data-testid="text-detail-description"
              >
                {post.description}
              </p>
            </div>

            <div className="flex items-center gap-2 py-3 border-y border-border justify-between">
              <button
                onClick={handleLike}
                className="flex items-center gap-2 hover-elevate rounded-md px-3 py-2"
                data-testid="button-detail-like"
              >
                <Heart
                  className={`w-4 h-4 transition-all ${
                    isLiked
                      ? "fill-destructive text-destructive"
                      : "text-muted-foreground"
                  }`}
                />
                <span
                  className={`font-medium text-xs ${
                    isLiked ? "text-destructive" : ""
                  }`}
                >
                  {post.likes.length} Suka
                </span>
              </button>

              <button
                onClick={() => setShowComments(true)}
                className="flex items-center gap-2 hover-elevate rounded-md px-3 py-2"
                data-testid="button-detail-comment"
              >
                <MessageCircle className="4 h-4 text-muted-foreground" />
                <span className="font-medium text-xs">
                  {post.comments.length} Komentar
                </span>
              </button>

              <button
                onClick={() => setShowBids(true)}
                className="flex items-center gap-2 hover-elevate rounded-md px-3 py-2"
                data-testid="button-detail-bid"
              >
                <Tag className="4 h-4 text-muted-foreground" />
                <span className="font-medium text-xs">
                  {post.bids.length} Penawaran
                </span>
              </button>
            </div>

            <div className="flex gap-2">
              <Button
                className="flex-1"
                onClick={() => setShowBids(true)}
                data-testid="button-detail-bid-action"
              >
                Buat Penawaran
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowComments(true)}
                data-testid="button-detail-comment-action"
              >
                Tulis Komentar
              </Button>
            </div>
          </div>
        </div>
      </ScrollArea>

      <CommentSheet
        comments={post.comments}
        isOpen={showComments}
        onClose={() => setShowComments(false)}
        onAddComment={handleAddComment}
        currentUserAvatar={currentUser?.avatar}
        currentUsername={currentUser?.username}
      />

      <BidSheet
        bids={post.bids}
        isOpen={showBids}
        onClose={() => setShowBids(false)}
        onAddBid={handleAddBid}
        currentUserAvatar={currentUser?.avatar}
        currentUsername={currentUser?.username}
      />

      <BottomNav />
    </div>
  );
}
