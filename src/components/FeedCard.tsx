import { Heart, MessageCircle, MoreVertical } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import type { Post } from "@/lib/store";
import { useState } from "react";

interface FeedCardProps {
  post: Post;
  currentUserId?: string;
  onLike?: () => void;
  onComment?: () => void;
  onBid?: () => void;
  onClick?: () => void;
}

export default function FeedCard({
  post,
  currentUserId,
  onLike,
  onComment,
  onBid,
  onClick,
}: FeedCardProps) {
  const [showFullDesc, setShowFullDesc] = useState(false);
  const isLiked = currentUserId ? post.likes.includes(currentUserId) : false;
  const truncatedDesc =
    post.description.length > 100
      ? post.description.substring(0, 100) + "..."
      : post.description;

  return (
    <Card
      className="overflow-hidden hover-elevate cursor-pointer rounded-none shadow-none"
      onClick={onClick}
      data-testid={`card-post-${post.id}`}
    >
      <div className="p-4 pb-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <Avatar
              className="w-10 h-10 border-2 border-muted"
              data-testid={`avatar-user-${post.userId}`}
            >
              <AvatarImage src={post.avatar} alt={post.username} />
              <AvatarFallback>{post.username[0]?.toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <p
                className="font-semibold text-sm"
                data-testid={`text-username-${post.id}`}
              >
                {post.username}
              </p>
              <p className="text-xs text-muted-foreground">
                {new Date(post.createdAt).toLocaleDateString("id-ID")}
              </p>
            </div>
          </div>
          <Button
            size="icon"
            variant="ghost"
            data-testid={`button-more-${post.id}`}
          >
            <MoreVertical className="w-4 h-4" />
          </Button>
        </div>

        {post.images && post.images.length > 1 ? (
          <Carousel className="w-full mb-3">
            <CarouselContent>
              {post.images.map((image, index) => (
                <CarouselItem key={index}>
                  <div
                    className="aspect-square rounded-lg overflow-hidden bg-muted"
                    data-testid={`img-post-${post.id}-${index}`}
                  >
                    <img
                      src={image}
                      alt={`${post.description} - ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="absolute top-[50%] w-full flex justify-between">
              <CarouselPrevious className="left-2 bg-slate-100" />
              <CarouselNext className="right-2 bg-slate-100" />
            </div>
          </Carousel>
        ) : (
          <div
            className="aspect-square rounded-lg overflow-hidden mb-3 bg-muted"
            data-testid={`img-post-${post.id}`}
          >
            <img
              src={post.images?.[0] || ""}
              alt={post.description}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="mb-3">
          <div className="flex flex-wrap gap-1.5 mb-2">
            {post.categories?.map((category, index) => (
              <Badge
                key={index}
                variant="secondary"
                data-testid={`badge-category-${post.id}-${index}`}
              >
                {category}
              </Badge>
            ))}
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
            <span data-testid={`text-location-${post.id}`}>
              📍 {post.location}
            </span>
            <span data-testid={`text-budget-${post.id}`}>💰 {post.budget}</span>
          </div>
          <p
            className="text-sm leading-relaxed"
            data-testid={`text-description-${post.id}`}
          >
            {showFullDesc ? post.description : truncatedDesc}
            {post.description.length > 100 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowFullDesc(!showFullDesc);
                }}
                className="text-primary ml-1 font-medium"
                data-testid={`button-show-more-${post.id}`}
              >
                {showFullDesc ? "Sembunyikan" : "Lihat Selengkapnya"}
              </button>
            )}
          </p>
        </div>
      </div>

      <div className="border-t border-card-border px-4 py-3 space-y-2 bg-card/50">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span data-testid={`text-bid-count-${post.id}`}>
            {post.bids.length} {post.bids.length === 1 ? "pelamar" : "pelamar"}
          </span>
          <span data-testid={`text-interaction-count-${post.id}`}>
            {post.likes.length} suka • {post.comments.length} komentar
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onLike?.();
              }}
              className="flex items-center gap-1.5 hover-elevate rounded-md px-2 py-1"
              data-testid={`button-like-${post.id}`}
            >
              <Heart
                className={`w-5 h-5 transition-all ${
                  isLiked
                    ? "fill-destructive text-destructive scale-110"
                    : "text-muted-foreground"
                }`}
              />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onComment?.();
              }}
              className="flex items-center gap-1.5 hover-elevate rounded-md px-2 py-1"
              data-testid={`button-comment-${post.id}`}
            >
              <MessageCircle className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>

          <Button
            size="sm"
            variant="default"
            onClick={(e) => {
              e.stopPropagation();
              onBid?.();
            }}
            data-testid={`button-bid-action-${post.id}`}
          >
            Tawar
          </Button>
        </div>
      </div>
    </Card>
  );
}
