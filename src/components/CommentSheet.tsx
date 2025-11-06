import { useState } from "react";
import { X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { Comment } from "@/lib/store";

interface CommentSheetProps {
  comments: Comment[];
  isOpen: boolean;
  onClose: () => void;
  onAddComment: (text: string) => void;
  currentUserAvatar?: string;
  currentUsername?: string;
}

export default function CommentSheet({
  comments,
  isOpen,
  onClose,
  onAddComment,
  currentUserAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=User",
  currentUsername = "Pengguna",
}: CommentSheetProps) {
  const [commentText, setCommentText] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim()) {
      onAddComment(commentText.trim());
      setCommentText("");
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-50 animate-in fade-in"
        onClick={onClose}
        data-testid="overlay-comment-sheet"
      />

      <div className="fixed inset-x-0 bottom-0 z-50 bg-background rounded-t-2xl shadow-xl animate-in slide-in-from-bottom max-h-[80vh] flex flex-col pb-16">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3
            className="font-semibold text-lg"
            data-testid="text-comments-title"
          >
            Komentar ({comments.length})
          </h3>
          <Button
            size="icon"
            variant="ghost"
            onClick={onClose}
            data-testid="button-close-comments"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <ScrollArea className="flex-1 p-4">
          {comments.length === 0 ? (
            <div
              className="text-center py-8 text-muted-foreground"
              data-testid="text-no-comments"
            >
              Belum ada komentar. Jadilah yang pertama!
            </div>
          ) : (
            <div className="space-y-4">
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="flex gap-3"
                  data-testid={`comment-${comment.id}`}
                >
                  <Avatar className="w-8 h-8 flex-shrink-0">
                    <AvatarImage src={comment.avatar} alt={comment.username} />
                    <AvatarFallback>
                      {comment.username[0]?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="bg-muted rounded-lg px-3 py-2">
                      <p
                        className="font-medium text-sm"
                        data-testid={`text-comment-username-${comment.id}`}
                      >
                        {comment.username}
                      </p>
                      <p
                        className="text-sm mt-0.5"
                        data-testid={`text-comment-text-${comment.id}`}
                      >
                        {comment.text}
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1 ml-3">
                      {new Date(comment.createdAt).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        <form onSubmit={handleSubmit} className="p-4 border-t border-border">
          <div className="flex items-center gap-2">
            <Avatar className="w-8 h-8 flex-shrink-0">
              <AvatarImage src={currentUserAvatar} alt={currentUsername} />
              <AvatarFallback>
                {currentUsername[0]?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <Input
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Tulis komentar..."
              className="flex-1"
              data-testid="input-comment"
            />
            <Button
              type="submit"
              size="icon"
              disabled={!commentText.trim()}
              data-testid="button-send-comment"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
