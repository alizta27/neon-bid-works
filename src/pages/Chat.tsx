import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useStore } from "@/lib/store";
import BottomNav from "@/components/BottomNav";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, ArrowLeft } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";

export default function Chat() {
  const [, setLocation] = useLocation();
  const { conversations, currentUser, initializeFromLocalStorage } = useStore();

  useEffect(() => {
    initializeFromLocalStorage();

    const storedUser = localStorage.getItem("kerjaaja_data");
    const data = storedUser ? JSON.parse(storedUser) : null;

    if (!data?.currentUser) {
      setLocation('/landing');
    }
  }, []);

  const handleConversationClick = (conversationId: string) => {
    setLocation(`/chat/${conversationId}`);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 z-40 bg-card border-b border-card-border backdrop-blur-sm">
        <div className="flex items-center justify-between p-4 max-w-lg mx-auto">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setLocation('/')}
              className="hover-elevate rounded-full p-1"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold">Chat & Penawaran</h1>
          </div>
        </div>
      </header>

      <ScrollArea className="h-[calc(100vh-8rem)]">
        <div className="max-w-lg mx-auto p-4">
          {conversations.length === 0 ? (
            <div className="text-center py-12">
              <MessageCircle className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">
                Belum ada percakapan. Mulai chat dengan penyedia jasa!
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {conversations.map((conversation) => {
                const otherUserIndex = conversation.participants.findIndex(
                  (id) => id !== currentUser?.id
                );
                const otherUserName = conversation.participantNames[otherUserIndex];
                const otherUserAvatar = conversation.participantAvatars[otherUserIndex];

                return (
                  <div
                    key={conversation.id}
                    onClick={() => handleConversationClick(conversation.id)}
                    className="p-4 rounded-lg border border-border bg-card hover-elevate cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={otherUserAvatar} />
                        <AvatarFallback>{otherUserName?.[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <h3 className="font-semibold truncate">{otherUserName}</h3>
                          <div className="flex items-center gap-2">
                            {conversation.unreadCount > 0 && (
                              <Badge variant="default" className="text-xs">
                                {conversation.unreadCount}
                              </Badge>
                            )}
                            <Badge 
                              variant={
                                conversation.status === "negotiating" ? "secondary" :
                                conversation.status === "proposal_sent" ? "default" :
                                conversation.status === "proposal_rejected" ? "destructive" :
                                conversation.status === "deal_agreed" ? "default" :
                                conversation.status === "work_in_progress" ? "default" :
                                conversation.status === "completed" ? "secondary" :
                                "outline"
                              }
                              className="text-xs whitespace-nowrap"
                            >
                              {conversation.status === "negotiating" ? "Negosiasi" :
                               conversation.status === "proposal_sent" ? "Menunggu" :
                               conversation.status === "proposal_rejected" ? "Ditolak" :
                               conversation.status === "deal_agreed" ? "Sepakat" :
                               conversation.status === "work_in_progress" ? "Berlangsung" :
                               conversation.status === "completed" ? "Selesai" :
                               "Ditutup"}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-xs text-muted-foreground mb-1 truncate">
                          {conversation.postTitle}
                        </p>
                        {conversation.lastMessage && (
                          <div className="flex items-center justify-between">
                            <p className="text-sm text-muted-foreground truncate">
                              {conversation.lastMessage}
                            </p>
                            {conversation.lastMessageTime && (
                              <p className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                                {formatDistanceToNow(new Date(conversation.lastMessageTime), {
                                  addSuffix: true,
                                  locale: id,
                                })}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </ScrollArea>

      <BottomNav />
    </div>
  );
}
