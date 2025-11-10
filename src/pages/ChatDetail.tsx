import { useState, useEffect, useRef } from "react";
import { useRoute, useLocation } from "wouter";
import { useStore } from "@/lib/store";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ArrowLeft, Send, CheckCircle, XCircle, FileText } from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";
import { id } from "date-fns/locale";

export default function ChatDetail() {
  const [match, params] = useRoute<{ id: string }>("/chat/:id");
  const [, setLocation] = useLocation();
  const { 
    conversations, 
    currentUser, 
    addMessage, 
    updateConversationStatus,
    sendProposal,
    approveProposal,
    rejectProposal,
    createContract,
    initializeFromLocalStorage 
  } = useStore();
  const [messageText, setMessageText] = useState("");
  const [proposalAmount, setProposalAmount] = useState("");
  const [proposalMessage, setProposalMessage] = useState("");
  const [finalAmount, setFinalAmount] = useState("");
  const [showProposalSheet, setShowProposalSheet] = useState(false);
  const [showContractSheet, setShowContractSheet] = useState(false);
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

  const handleEndNegotiation = () => {
    updateConversationStatus(conversationId, "proposal_sent");
    setShowProposalSheet(true);
  };

  const handleSendProposal = () => {
    const amount = parseFloat(proposalAmount);
    if (isNaN(amount) || amount <= 0) return;

    sendProposal(conversationId, amount, proposalMessage);
    setProposalAmount("");
    setProposalMessage("");
    setShowProposalSheet(false);
  };

  const handleApprove = () => {
    approveProposal(conversationId);
  };

  const handleReject = () => {
    rejectProposal(conversationId);
    updateConversationStatus(conversationId, "negotiating");
  };

  const handleCreateContract = () => {
    const amount = parseFloat(finalAmount);
    if (isNaN(amount) || amount <= 0) return;

    createContract(conversationId, amount);
    setFinalAmount("");
    setShowContractSheet(false);
  };

  const handleCompleteWork = () => {
    updateConversationStatus(conversationId, "completed");
  };

  const canSendProposal = conversation.status === "negotiating" || conversation.status === "proposal_rejected";
  const hasProposal = conversation.status === "proposal_sent" && conversation.currentProposal;
  const isProposalReceiver = hasProposal && conversation.currentProposal?.proposedBy !== currentUser.id;
  const isDealAgreed = conversation.status === "deal_agreed";
  const isWorkInProgress = conversation.status === "work_in_progress";
  const isCompleted = conversation.status === "completed";

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
            className="text-xs"
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
        <div className="max-w-lg mx-auto space-y-2">
          {/* Action Buttons based on status */}
          {canSendProposal && (
            <Button 
              onClick={handleEndNegotiation}
              variant="default"
              className="w-full"
            >
              Akhiri Negosiasi & Kirim Penawaran
            </Button>
          )}

          {hasProposal && isProposalReceiver && (
            <div className="bg-muted p-4 rounded-lg space-y-3">
              <div className="flex items-start gap-2">
                <FileText className="w-5 h-5 text-primary mt-1" />
                <div className="flex-1">
                  <p className="font-semibold">Penawaran Diterima</p>
                  <p className="text-lg font-bold text-primary">
                    Rp {conversation.currentProposal?.amount.toLocaleString('id-ID')}
                  </p>
                  {conversation.currentProposal?.message && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {conversation.currentProposal.message}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleApprove} className="flex-1" size="sm">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Setuju
                </Button>
                <Button onClick={handleReject} variant="destructive" className="flex-1" size="sm">
                  <XCircle className="w-4 h-4 mr-2" />
                  Tolak
                </Button>
              </div>
            </div>
          )}

          {hasProposal && !isProposalReceiver && (
            <div className="bg-muted p-3 rounded-lg">
              <p className="text-sm text-muted-foreground">
                Menunggu persetujuan penawaran Rp {conversation.currentProposal?.amount.toLocaleString('id-ID')}
              </p>
            </div>
          )}

          {isDealAgreed && (
            <Sheet open={showContractSheet} onOpenChange={setShowContractSheet}>
              <SheetTrigger asChild>
                <Button variant="default" className="w-full">
                  <FileText className="w-4 h-4 mr-2" />
                  Buat Kontrak & Mulai Pekerjaan
                </Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[400px]">
                <SheetHeader>
                  <SheetTitle>Konfirmasi Kontrak</SheetTitle>
                </SheetHeader>
                <div className="py-6 space-y-4">
                  <div>
                    <label className="text-sm font-medium">Jumlah Final (Rp)</label>
                    <Input
                      type="number"
                      value={finalAmount}
                      onChange={(e) => setFinalAmount(e.target.value)}
                      placeholder="Masukkan jumlah yang disepakati"
                      className="mt-1"
                    />
                  </div>
                  <div className="bg-muted p-4 rounded-lg space-y-2">
                    <p className="text-sm font-semibold">Detail Kontrak:</p>
                    <p className="text-sm">• Job Maker: {conversation.participantNames[0]}</p>
                    <p className="text-sm">• Job Seeker: {conversation.participantNames[1]}</p>
                    <p className="text-sm">• Pekerjaan: {conversation.postTitle}</p>
                  </div>
                  <Button 
                    onClick={handleCreateContract}
                    disabled={!finalAmount}
                    className="w-full"
                  >
                    Tanda Tangan & Mulai Pekerjaan
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          )}

          {isWorkInProgress && conversation.contract && (
            <div className="space-y-2">
              <div className="bg-muted p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-5 h-5 text-primary" />
                  <p className="font-semibold">Kontrak Aktif</p>
                </div>
                <p className="text-lg font-bold text-primary">
                  Rp {conversation.contract.finalAmount.toLocaleString('id-ID')}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Disepakati: {format(new Date(conversation.contract.agreedAt), 'dd MMM yyyy', { locale: id })}
                </p>
              </div>
              <Button onClick={handleCompleteWork} variant="default" className="w-full">
                <CheckCircle className="w-4 h-4 mr-2" />
                Tandai Pekerjaan Selesai
              </Button>
            </div>
          )}

          {isCompleted && conversation.contract && (
            <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-lg">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <div>
                  <p className="font-semibold text-green-500">Pekerjaan Selesai</p>
                  <p className="text-sm text-muted-foreground">
                    Total: Rp {conversation.contract.finalAmount.toLocaleString('id-ID')}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Message Input */}
          {!isCompleted && (
            <div className="flex gap-2">
              <Input
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ketik pesan..."
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
          )}
        </div>
      </div>

      {/* Proposal Sheet */}
      <Sheet open={showProposalSheet} onOpenChange={setShowProposalSheet}>
        <SheetContent side="bottom" className="h-[500px]">
          <SheetHeader>
            <SheetTitle>Kirim Penawaran Final</SheetTitle>
          </SheetHeader>
          <div className="py-6 space-y-4">
            <div>
              <label className="text-sm font-medium">Jumlah Penawaran (Rp)</label>
              <Input
                type="number"
                value={proposalAmount}
                onChange={(e) => setProposalAmount(e.target.value)}
                placeholder="Masukkan harga yang Anda tawarkan"
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Pesan (Opsional)</label>
              <Input
                value={proposalMessage}
                onChange={(e) => setProposalMessage(e.target.value)}
                placeholder="Tambahkan catatan untuk penawaran Anda"
                className="mt-1"
              />
            </div>
            <Button 
              onClick={handleSendProposal}
              disabled={!proposalAmount}
              className="w-full"
            >
              Kirim Penawaran
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
