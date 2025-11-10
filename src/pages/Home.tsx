import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useStore } from "@/lib/store";
import FeedCard from "@/components/FeedCard";
import CommentSheet from "@/components/CommentSheet";
import BidSheet from "@/components/BidSheet";
import BottomNav from "@/components/BottomNav";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import NotificationSheet from "@/components/NotificationSheet";
import { Sparkles, Bell, MessageCircle } from "lucide-react";
import designImage from "@/assets/generated_images/Graphic_design_work_showcase_465d6773.png";
import renovationImage from "@/assets/generated_images/Home_renovation_project_afc21a20.png";
import photographyImage from "@/assets/generated_images/Photography_services_showcase_f5a76139.png";
import webdevImage from "@/assets/generated_images/Web_development_workspace_22df9aa6.png";
import craftsImage from "@/assets/generated_images/Handmade_crafts_display_de5e7bb0.png";
import cateringImage from "@/assets/generated_images/Catering_services_showcase_d0eca804.png";

export default function Home() {
  const [, setLocation] = useLocation();
  const {
    posts,
    currentUser,
    notifications,
    conversations,
    toggleLike,
    addComment,
    addBid,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    initializeFromLocalStorage,
  } = useStore();
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const [showComments, setShowComments] = useState(false);
  const [showBids, setShowBids] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    initializeFromLocalStorage();

    const storedUser = localStorage.getItem("kerjaaja_data");
    const data = storedUser ? JSON.parse(storedUser) : null;

    // Redirect to landing if not logged in
    if (!data?.currentUser) {
      setLocation("/landing");
      return;
    }

    if (posts.length === 0) {
      const mockUser = {
        id: "user1",
        username: "AndyPratama",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Andy",
        bio: "Freelancer kreatif yang siap membantu proyek Anda!",
        tokens: 12500,
      };

      useStore.getState().setCurrentUser(mockUser);

      const mockPosts = [
        {
          userId: "user2",
          username: "DesainKreatif",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kreatif",
          images: [designImage, webdevImage],
          description:
            "Butuh desainer grafis profesional untuk branding bisnis Anda? Saya punya pengalaman 5+ tahun dalam desain logo, packaging, dan visual identity. Portfolio lengkap tersedia! 🎨",
          categories: ["Desain Grafis", "Marketing"],
          location: "Jakarta Selatan",
          budget: "Rp 500.000 - Rp 1.000.000",
          type: "cari-jasa" as const,
        },
        {
          userId: "user3",
          username: "TukangAhli",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tukang",
          images: [renovationImage],
          description:
            "Jasa renovasi rumah & kantor terpercaya! Pengalaman 10 tahun, hasil rapi dan tepat waktu. Konsultasi gratis untuk proyek Anda.",
          categories: ["Renovasi"],
          location: "Bandung",
          budget: "Mulai Rp 5.000.000",
          type: "tawarkan-jasa" as const,
        },
        {
          userId: "user4",
          username: "FotograferPro",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Foto",
          images: [photographyImage, designImage, craftsImage],
          description:
            "Mencari fotografer untuk event wedding, birthday, atau corporate? Peralatan lengkap & hasil maksimal dijamin! 📸",
          categories: ["Fotografi", "Videografi"],
          location: "Jakarta Pusat",
          budget: "Rp 2.000.000 - Rp 5.000.000",
          type: "cari-jasa" as const,
        },
        {
          userId: "user5",
          username: "CodeMaster",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Code",
          images: [webdevImage],
          description:
            "Jasa pembuatan website & aplikasi mobile. Teknologi terkini, responsive design, dan maintenance support. Gratis konsultasi!",
          categories: ["Pemrograman", "Desain Grafis"],
          location: "Surabaya",
          budget: "Rp 10.000.000 - Rp 15.000.000",
          type: "tawarkan-jasa" as const,
        },
        {
          userId: "user6",
          username: "CraftLover",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Craft",
          images: [craftsImage, cateringImage],
          description:
            "Kerajinan tangan unik & custom! Cocok untuk hadiah spesial, dekorasi rumah, atau souvenir acara. Bisa request design sendiri! ✨",
          categories: ["Kerajinan"],
          location: "Yogyakarta",
          budget: "Rp 50.000 - Rp 500.000",
          type: "tawarkan-jasa" as const,
        },
        {
          userId: "user7",
          username: "ChefCatering",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Chef",
          images: [cateringImage],
          description:
            "Catering untuk segala acara! Menu bervariasi, higienis, dan lezat. Paket mulai dari 50 porsi. Pesan sekarang!",
          categories: ["Katering"],
          location: "Tangerang",
          budget: "Rp 50.000/porsi",
          type: "tawarkan-jasa" as const,
        },
      ];

      // Add mock notifications
      const mockNotifications = [
        {
          type: "bid" as const,
          title: "Penawaran Baru",
          message:
            "BudiGraphics mengajukan penawaran Rp 500.000 untuk proyek desain Anda",
          postId: "post1",
          read: false,
        },
        {
          type: "comment" as const,
          title: "Komentar Baru",
          message: 'Siti berkomentar di postingan Anda: "Wah keren banget!"',
          postId: "post1",
          read: false,
        },
        {
          type: "like" as const,
          title: "Seseorang menyukai postingan Anda",
          message: "Ahmad menyukai postingan Anda",
          postId: "post2",
          read: true,
        },
        {
          type: "system" as const,
          title: "Selamat Datang!",
          message:
            "Terima kasih telah bergabung dengan KerjaAja. Mulai posting pekerjaan Anda!",
          read: true,
        },
      ];

      mockNotifications.forEach((notif) => {
        const newNotif = {
          id: Date.now().toString() + Math.random(),
          ...notif,
          createdAt: new Date(
            Date.now() - Math.random() * 86400000 * 2
          ).toISOString(),
        };
        const data = localStorage.getItem("kerjaaja_data");
        const parsed = data ? JSON.parse(data) : {};
        parsed.notifications = [...(parsed.notifications || []), newNotif];
        localStorage.setItem("kerjaaja_data", JSON.stringify(parsed));
      });

      // Add mock conversations with bidding messages
      const data = localStorage.getItem("kerjaaja_data");
      const parsed = data ? JSON.parse(data) : {};
      
      if (!parsed.conversations || parsed.conversations.length === 0) {
        const mockConversations = [
          {
            id: "conv1",
            postId: "post1",
            postTitle: "Butuh Desain Logo untuk Brand Kopi",
            participants: ["user1", "user2"],
            participantNames: ["Anda", "BudiGraphics"],
            participantAvatars: [
              "https://api.dicebear.com/7.x/avataaars/svg?seed=You",
              "https://api.dicebear.com/7.x/avataaars/svg?seed=Budi"
            ],
            messages: [
              {
                id: "msg1",
                senderId: "user2",
                senderName: "BudiGraphics",
                senderAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Budi",
                text: "Halo, saya tertarik dengan proyek desain logo Anda. Bisa saya lihat referensi yang Anda inginkan?",
                createdAt: new Date(Date.now() - 7200000).toISOString(),
              },
              {
                id: "msg2",
                senderId: "user1",
                senderName: "Anda",
                senderAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=You",
                text: "Halo! Saya ingin logo yang modern dan minimalis, dengan tema kopi. Budget saya sekitar Rp 500.000",
                createdAt: new Date(Date.now() - 7000000).toISOString(),
              },
              {
                id: "msg3",
                senderId: "user2",
                senderName: "BudiGraphics",
                senderAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Budi",
                text: "Saya bisa kerjakan dengan 3 konsep desain berbeda. Untuk Rp 750.000, termasuk revisi unlimited sampai Anda puas.",
                createdAt: new Date(Date.now() - 6800000).toISOString(),
              },
              {
                id: "msg4",
                senderId: "user1",
                senderName: "Anda",
                senderAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=You",
                text: "Wah agak di atas budget saya. Bagaimana kalau Rp 600.000 dengan 2 konsep desain?",
                createdAt: new Date(Date.now() - 6600000).toISOString(),
              },
              {
                id: "msg5",
                senderId: "user2",
                senderName: "BudiGraphics",
                senderAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Budi",
                text: "Deal! Rp 600.000 untuk 2 konsep + 3x revisi. Saya akan selesaikan dalam 5 hari kerja. File dalam format PNG, JPG, dan AI.",
                createdAt: new Date(Date.now() - 6400000).toISOString(),
              },
            ],
            lastMessage: "Deal! Rp 600.000 untuk 2 konsep + 3x revisi. Saya akan selesaikan dalam 5 hari kerja. File dalam format PNG, JPG, dan AI.",
            lastMessageTime: new Date(Date.now() - 6400000).toISOString(),
            unreadCount: 1,
          },
          {
            id: "conv2",
            postId: "post2",
            postTitle: "Jasa Fotografi Pre-Wedding",
            participants: ["user1", "user3"],
            participantNames: ["Anda", "RinaPhotography"],
            participantAvatars: [
              "https://api.dicebear.com/7.x/avataaars/svg?seed=You",
              "https://api.dicebear.com/7.x/avataaars/svg?seed=Rina"
            ],
            messages: [
              {
                id: "msg6",
                senderId: "user3",
                senderName: "RinaPhotography",
                senderAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rina",
                text: "Hai! Saya lihat Anda menawarkan jasa fotografi pre-wedding. Kapan Anda available untuk bulan depan?",
                createdAt: new Date(Date.now() - 3600000).toISOString(),
              },
              {
                id: "msg7",
                senderId: "user1",
                senderName: "Anda",
                senderAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=You",
                text: "Halo! Saya available di weekend. Untuk paket indoor + outdoor 4 jam, harganya Rp 2.500.000 sudah termasuk edited photos.",
                createdAt: new Date(Date.now() - 3400000).toISOString(),
              },
              {
                id: "msg8",
                senderId: "user3",
                senderName: "RinaPhotography",
                senderAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rina",
                text: "Berapa foto yang akan kami dapatkan? Dan apakah bisa tambah 1 lokasi lagi?",
                createdAt: new Date(Date.now() - 3200000).toISOString(),
              },
              {
                id: "msg9",
                senderId: "user1",
                senderName: "Anda",
                senderAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=You",
                text: "Akan dapat 100+ edited photos. Untuk tambah lokasi +Rp 500.000, jadi total Rp 3.000.000",
                createdAt: new Date(Date.now() - 3000000).toISOString(),
              },
            ],
            lastMessage: "Akan dapat 100+ edited photos. Untuk tambah lokasi +Rp 500.000, jadi total Rp 3.000.000",
            lastMessageTime: new Date(Date.now() - 3000000).toISOString(),
            unreadCount: 0,
          },
          {
            id: "conv3",
            postId: "post3",
            postTitle: "Renovasi Rumah (Kamar Tidur)",
            participants: ["user1", "user4"],
            participantNames: ["Anda", "TokoMaterial88"],
            participantAvatars: [
              "https://api.dicebear.com/7.x/avataaars/svg?seed=You",
              "https://api.dicebear.com/7.x/avataaars/svg?seed=Material"
            ],
            messages: [
              {
                id: "msg10",
                senderId: "user4",
                senderName: "TokoMaterial88",
                senderAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Material",
                text: "Pak, untuk renovasi kamar tidur ukuran berapa? Kami bisa survey lokasi gratis dulu.",
                createdAt: new Date(Date.now() - 1800000).toISOString(),
              },
              {
                id: "msg11",
                senderId: "user1",
                senderName: "Anda",
                senderAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=You",
                text: "Ukuran 4x3 meter. Mau ganti keramik, cat ulang, dan buat lemari built-in. Estimasi berapa ya?",
                createdAt: new Date(Date.now() - 1600000).toISOString(),
              },
              {
                id: "msg12",
                senderId: "user4",
                senderName: "TokoMaterial88",
                senderAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Material",
                text: "Estimasi kasar sekitar Rp 15-18 juta. Sudah termasuk material dan tukang. Lemari built-in pakai HPL atau kayu solid?",
                createdAt: new Date(Date.now() - 1400000).toISOString(),
              },
              {
                id: "msg13",
                senderId: "user1",
                senderName: "Anda",
                senderAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=You",
                text: "HPL aja. Bisa kurang harganya? Budget saya maksimal 15 juta",
                createdAt: new Date(Date.now() - 1200000).toISOString(),
              },
              {
                id: "msg14",
                senderId: "user4",
                senderName: "TokoMaterial88",
                senderAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Material",
                text: "Oke, kami usahakan pas Rp 15 juta. Tapi perlu survey dulu ya untuk memastikan. Kapan bisa kami datang?",
                createdAt: new Date(Date.now() - 1000000).toISOString(),
              },
              {
                id: "msg15",
                senderId: "user1",
                senderName: "Anda",
                senderAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=You",
                text: "Hari Sabtu bisa? Jam 10 pagi",
                createdAt: new Date(Date.now() - 800000).toISOString(),
              },
            ],
            lastMessage: "Hari Sabtu bisa? Jam 10 pagi",
            lastMessageTime: new Date(Date.now() - 800000).toISOString(),
            unreadCount: 2,
          },
        ];
        
        parsed.conversations = mockConversations;
        localStorage.setItem("kerjaaja_data", JSON.stringify(parsed));
      }

      useStore.getState().initializeFromLocalStorage();

      mockPosts.forEach((post, index) => {
        const newPost = useStore.getState().addPost(post);

        if (index === 0) {
          const posts = useStore.getState().posts;
          const firstPost = posts[0];

          useStore.getState().addBid(firstPost.id, {
            userId: "bidder1",
            username: "BudiGraphics",
            amount: 500000,
            message: "Saya siap mengerjakan dengan profesional!",
          });
          useStore.getState().addBid(firstPost.id, {
            userId: "bidder2",
            username: "DesignPro",
            amount: 750000,
            message: "Portfolio 10 tahun, hasil memuaskan!",
          });
          useStore.getState().addBid(firstPost.id, {
            userId: "bidder3",
            username: "CreativeStudio",
            amount: 600000,
            message: "Fast response & revision unlimited!",
          });

          useStore.getState().addComment(firstPost.id, {
            userId: "comm1",
            username: "Siti",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Siti",
            text: "Wah keren banget! Boleh lihat portfolio nya?",
          });
          useStore.getState().addComment(firstPost.id, {
            userId: "comm2",
            username: "Ahmad",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmad",
            text: "Berapa lama pengerjaan untuk logo + branding lengkap?",
          });
        }

        if (index === 1) {
          const posts = useStore.getState().posts;
          const secondPost = posts[1];

          useStore.getState().addBid(secondPost.id, {
            userId: "bidder4",
            username: "TukangJaya",
            amount: 15000000,
            message: "Berpengalaman renovasi 100+ rumah",
          });

          useStore.getState().addComment(secondPost.id, {
            userId: "comm3",
            username: "Budi",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Budi",
            text: "Recommended! Saya sudah pernah pakai jasanya",
          });
        }

        if (index === 2) {
          const posts = useStore.getState().posts;
          const thirdPost = posts[2];

          useStore.getState().addBid(thirdPost.id, {
            userId: "bidder5",
            username: "PhotoExpert",
            amount: 2000000,
            message: "Dokumentasi lengkap + editing profesional",
          });
          useStore.getState().addBid(thirdPost.id, {
            userId: "bidder6",
            username: "WeddingPhoto",
            amount: 3500000,
            message: "Spesialis wedding photography",
          });

          useStore.getState().addComment(thirdPost.id, {
            userId: "comm4",
            username: "Rina",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rina",
            text: "Hasil fotonya bagus banget! 📸",
          });
        }

        if (index === 3) {
          const posts = useStore.getState().posts;
          const fourthPost = posts[3];

          useStore.getState().addComment(fourthPost.id, {
            userId: "comm5",
            username: "Dedi",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Dedi",
            text: "Bisa bikin aplikasi mobile juga?",
          });
        }
      });
    }
  }, []);

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
  const unreadNotifications = notifications.filter((n) => !n.read).length;
  const unreadChats = conversations.reduce(
    (total, conv) => total + conv.unreadCount,
    0
  );

  const handleNotificationClick = (notification: any) => {
    if (notification.postId) {
      setLocation(`/post/${notification.postId}`);
    }
    setShowNotifications(false);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 z-40 bg-card border-b border-card-border backdrop-blur-sm">
        <div className="flex items-center justify-between p-4 max-w-lg mx-auto">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary" />
            <h1 className="text-xl font-bold" data-testid="text-app-title">
              KerjaAja
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => setLocation("/chat")}
            >
              <MessageCircle className="w-5 h-5" />
              {unreadChats > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-3 -left-3 -right-1 p-1 flex items-center justify-center text-xs rounded-[100%]"
                />
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => setShowNotifications(true)}
            >
              <Bell className="w-5 h-5" />
              {unreadNotifications > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-3 -left-3 -right-1 p-1 flex items-center justify-center text-xs rounded-[100%]"
                />
              )}
            </Button>
          </div>
        </div>
      </header>

      <ScrollArea className="h-[calc(100vh-8rem)]">
        <div className="max-w-lg mx-auto p-0">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                Belum ada postingan. Mulai unggah pekerjaan Anda!
              </p>
            </div>
          ) : (
            posts.map((post) => (
              <FeedCard
                key={post.id}
                post={post}
                currentUserId={currentUser?.id}
                onLike={() => handleLike(post.id)}
                onComment={() => handleCommentOpen(post.id)}
                onBid={() => handleBidOpen(post.id)}
                onClick={() => setLocation(`/post/${post.id}`)}
              />
            ))
          )}
        </div>
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

      <NotificationSheet
        notifications={notifications}
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
        onMarkAsRead={markNotificationAsRead}
        onMarkAllAsRead={markAllNotificationsAsRead}
        onNotificationClick={handleNotificationClick}
      />

      <BottomNav />
    </div>
  );
}
