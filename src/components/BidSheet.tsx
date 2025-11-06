import { useState } from "react";
import { X, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import type { Bid } from "@/lib/store";

interface BidSheetProps {
  bids: Bid[];
  isOpen: boolean;
  onClose: () => void;
  onAddBid: (amount: number, message: string) => void;
  currentUserAvatar?: string;
  currentUsername?: string;
}

export default function BidSheet({
  bids,
  isOpen,
  onClose,
  onAddBid,
  currentUserAvatar = "https://api.dicebear.com/7.x/avataaars/svg?seed=User",
  currentUsername = "Pengguna",
}: BidSheetProps) {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const bidAmount = parseInt(amount);
    if (bidAmount > 0 && message.trim()) {
      onAddBid(bidAmount, message.trim());
      setAmount("");
      setMessage("");
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-50 animate-in fade-in"
        onClick={onClose}
        data-testid="overlay-bid-sheet"
      />

      <div className="pb-16 fixed inset-x-0 bottom-0 z-50 bg-background rounded-t-2xl shadow-xl animate-in slide-in-from-bottom max-h-[85vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3 className="font-semibold text-lg" data-testid="text-bids-title">
            Penawaran ({bids.length})
          </h3>
          <Button
            size="icon"
            variant="ghost"
            onClick={onClose}
            data-testid="button-close-bids"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <ScrollArea className="flex-1 p-4">
          {bids.length === 0 ? (
            <div
              className="text-center py-8 text-muted-foreground"
              data-testid="text-no-bids"
            >
              Belum ada penawaran. Jadilah yang pertama menawar!
            </div>
          ) : (
            <div className="space-y-3">
              {bids.map((bid) => (
                <div
                  key={bid.id}
                  className="bg-card rounded-lg p-3 border border-card-border"
                  data-testid={`bid-${bid.id}`}
                >
                  <div className="flex items-start gap-3">
                    <Avatar className="w-10 h-10 flex-shrink-0">
                      <AvatarImage
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${bid.username}`}
                        alt={bid.username}
                      />
                      <AvatarFallback>
                        {bid.username[0]?.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <p
                          className="font-medium text-sm"
                          data-testid={`text-bid-username-${bid.id}`}
                        >
                          {bid.username}
                        </p>
                        <Badge
                          variant="default"
                          className="font-bold"
                          data-testid={`badge-bid-amount-${bid.id}`}
                        >
                          {formatCurrency(bid.amount)}
                        </Badge>
                      </div>
                      <p
                        className="text-sm text-muted-foreground"
                        data-testid={`text-bid-message-${bid.id}`}
                      >
                        {bid.message}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(bid.createdAt).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>

        <form
          onSubmit={handleSubmit}
          className="p-4 border-t border-border space-y-3"
        >
          <div className="flex items-center gap-2">
            <Avatar className="w-8 h-8 flex-shrink-0">
              <AvatarImage src={currentUserAvatar} alt={currentUsername} />
              <AvatarFallback>
                {currentUsername[0]?.toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Nominal (Rp)"
                  className="pl-10"
                  min="0"
                  data-testid="input-bid-amount"
                />
              </div>
            </div>
          </div>
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Pesan untuk pemilik pekerjaan..."
            rows={2}
            data-testid="input-bid-message"
          />
          <Button
            type="submit"
            className="w-full"
            disabled={!amount || !message.trim() || parseInt(amount) <= 0}
            data-testid="button-send-bid"
          >
            Kirim Penawaran
          </Button>
        </form>
      </div>
    </>
  );
}
