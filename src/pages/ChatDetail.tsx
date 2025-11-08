import { useState, useEffect, useRef } from "react";
import { useRoute, useLocation } from "wouter";
import { useStore } from "@/lib/store";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, Send } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";

export default function ChatDetail() {
  const [match, params] = useRoute<{ id: string }>("/chat/:id");
  const [, setLocation] = useLocation();
  const { conversations, currentUser, addMessage, initializeFromLocalStorage } = useStore();
  const [messageText, setMessageText] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initializeFromLocalStorage();

    const storedUser = localStorage.getItem("kerjaaja_data");
    const data = storedUser ? JSON.parse(storedUser) : null;

    if (!data?.currentUser) {
      setLocation('/landing');
    }
  }, []);

  if (!match || !params) {
    return null;
  }

  const conversationId = params.id;
  const conversation = conversations.find((c) => c.id === conversationId);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [conversation?.messages]);

  if (!conversation || !currentUser) {
    return null;
  }

  const otherUserIndex = conversation.participants.findIndex(
    (id) => id !== currentUser.id
  );
  const otherUserName = conversation.participantNames[otherUserIndex];
  const otherUserAvatar = conversation.participantAvatars[otherUserIndex];

  const handleSendMessage = () => {
    if (!messageText.trim()) return;

    addMessage(conversationId, {
      senderId: currentUser.id,
      senderName: currentUser.username,
      senderAvatar: currentUser.avatar,
      text: messageText,
    });

    setMessageText("");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="sticky top-0 z-40 bg-card border-b border-card-border backdrop-blur-sm">
        <div className="flex items-center gap-3 p-4 max-w-lg mx-auto">
          <button
            onClick={() => setLocation('/chat')}
            className="hover-elevate rounded-full p-1"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <Avatar className="w-10 h-10">
            <AvatarImage src={otherUserAvatar} />
            <AvatarFallback>{otherUserName?.[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h2 className="font-semibold">{otherUserName}</h2>
            <p className="text-xs text-muted-foreground truncate">
              {conversation.postTitle}
            </p>
          </div>
        </div>
      </header>

      <ScrollArea className="flex-1 p-4 max-w-lg mx-auto w-full" ref={scrollRef}>
        <div className="space-y-4">
          {conversation.messages.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                Mulai percakapan dan negosiasi harga!
              </p>
            </div>
          ) : (
            conversation.messages.map((message) => {
              const isCurrentUser = message.senderId === currentUser.id;

              return (
                <div
                  key={message.id}
                  className={`flex gap-2 ${isCurrentUser ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={message.senderAvatar} />
                    <AvatarFallback>{message.senderName?.[0]}</AvatarFallback>
                  </Avatar>
                  <div
                    className={`flex flex-col ${isCurrentUser ? 'items-end' : 'items-start'} max-w-[70%]`}
                  >
                    <div
                      className={`rounded-lg px-4 py-2 ${
                        isCurrentUser
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatDistanceToNow(new Date(message.createdAt), {
                        addSuffix: true,
                        locale: id,
                      })}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </ScrollArea>

      <div className="sticky bottom-0 bg-card border-t border-card-border p-4">
        <div className="flex gap-2 max-w-lg mx-auto">
          <Input
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ketik pesan atau penawaran harga..."
            className="flex-1"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!messageText.trim()}
            size="icon"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
