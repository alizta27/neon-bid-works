import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useStore } from "@/lib/store";
import FeedCard from "@/components/FeedCard";
import CommentSheet from "@/components/CommentSheet";
import BidSheet from "@/components/BidSheet";
import BottomNav from "@/components/BottomNav";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sparkles } from "lucide-react";
import designImage from "@assets/generated_images/Graphic_design_work_showcase_465d6773.png";
import renovationImage from "@assets/generated_images/Home_renovation_project_afc21a20.png";
import photographyImage from "@assets/generated_images/Photography_services_showcase_f5a76139.png";
import webdevImage from "@assets/generated_images/Web_development_workspace_22df9aa6.png";
import craftsImage from "@assets/generated_images/Handmade_crafts_display_de5e7bb0.png";
import cateringImage from "@assets/generated_images/Catering_services_showcase_d0eca804.png";

export default function Home() {
  const [, setLocation] = useLocation();
  const {
    posts,
    currentUser,
    toggleLike,
    addComment,
    addBid,
    initializeFromLocalStorage,
  } = useStore();
  const [selectedPost, setSelectedPost] = useState<string | null>(null);
  const [showComments, setShowComments] = useState(false);
  const [showBids, setShowBids] = useState(false);

  useEffect(() => {
    initializeFromLocalStorage();

    const storedUser = localStorage.getItem("kerjaaja_data");
    const data = storedUser ? JSON.parse(storedUser) : null;

    if (!data?.currentUser || posts.length === 0) {
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
          image: designImage,
          description:
            "Butuh desainer grafis profesional untuk branding bisnis Anda? Saya punya pengalaman 5+ tahun dalam desain logo, packaging, dan visual identity. Portfolio lengkap tersedia! 🎨",
          category: "Desain Grafis",
        },
        {
          userId: "user3",
          username: "TukangAhli",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tukang",
          image: renovationImage,
          description:
            "Jasa renovasi rumah & kantor terpercaya! Pengalaman 10 tahun, hasil rapi dan tepat waktu. Konsultasi gratis untuk proyek Anda.",
          category: "Renovasi",
        },
        {
          userId: "user4",
          username: "FotograferPro",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Foto",
          image: photographyImage,
          description:
            "Mencari fotografer untuk event wedding, birthday, atau corporate? Peralatan lengkap & hasil maksimal dijamin! 📸",
          category: "Fotografi",
        },
        {
          userId: "user5",
          username: "CodeMaster",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Code",
          image: webdevImage,
          description:
            "Jasa pembuatan website & aplikasi mobile. Teknologi terkini, responsive design, dan maintenance support. Gratis konsultasi!",
          category: "Pemrograman",
        },
        {
          userId: "user6",
          username: "CraftLover",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Craft",
          image: craftsImage,
          description:
            "Kerajinan tangan unik & custom! Cocok untuk hadiah spesial, dekorasi rumah, atau souvenir acara. Bisa request design sendiri! ✨",
          category: "Kerajinan",
        },
        {
          userId: "user7",
          username: "ChefCatering",
          avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Chef",
          image: cateringImage,
          description:
            "Catering untuk segala acara! Menu bervariasi, higienis, dan lezat. Paket mulai dari 50 porsi. Pesan sekarang!",
          category: "Katering",
        },
      ];

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

      <BottomNav />
    </div>
  );
}
