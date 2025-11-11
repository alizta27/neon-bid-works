import { create } from 'zustand';

export interface User {
  id: string;
  username: string;
  avatar: string;
  bio: string;
  tokens: number;
}

export interface Post {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  images: string[];
  description: string;
  categories: string[];
  location: string;
  budget: string;
  type: 'cari-jasa' | 'tawarkan-jasa';
  likes: string[];
  comments: Comment[];
  bids: Bid[];
  createdAt: string;
}

export interface Comment {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  text: string;
  createdAt: string;
}

export interface Bid {
  id: string;
  userId: string;
  username: string;
  amount: number;
  message: string;
  createdAt: string;
}

export interface Notification {
  id: string;
  type: 'like' | 'comment' | 'bid' | 'system';
  title: string;
  message: string;
  postId?: string;
  read: boolean;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  text: string;
  createdAt: string;
}

export type ConversationStatus = 
  | "negotiating" 
  | "proposal_sent" 
  | "proposal_rejected" 
  | "deal_agreed" 
  | "work_in_progress" 
  | "completed" 
  | "closed";

export interface Proposal {
  id: string;
  conversationId: string;
  proposedBy: string;
  amount: number;
  message?: string;
  createdAt: string;
}

export interface Contract {
  id: string;
  conversationId: string;
  finalAmount: number;
  agreedAt: string;
  jobMakerId: string;
  jobSeekerId: string;
}

export interface Conversation {
  id: string;
  postId: string;
  postTitle: string;
  participants: string[];
  participantNames: string[];
  participantAvatars: string[];
  messages: ChatMessage[];
  lastMessage?: string;
  lastMessageTime?: string;
  unreadCount: number;
  status: ConversationStatus;
  currentProposal?: Proposal;
  contract?: Contract;
}

interface AppState {
  currentUser: User | null;
  posts: Post[];
  notifications: Notification[];
  conversations: Conversation[];
  searchQuery: string;
  selectedCategory: string;
  setCurrentUser: (user: User) => void;
  updateCurrentUser: (updates: Partial<User>) => void;
  logout: () => void;
  addPost: (post: Omit<Post, 'id' | 'likes' | 'comments' | 'bids' | 'createdAt'>) => void;
  toggleLike: (postId: string, userId: string) => void;
  addComment: (postId: string, comment: Omit<Comment, 'id' | 'createdAt'>) => void;
  addBid: (postId: string, bid: Omit<Bid, 'id' | 'createdAt'>) => void;
  markNotificationAsRead: (notificationId: string) => void;
  markAllNotificationsAsRead: () => void;
  addMessage: (conversationId: string, message: Omit<ChatMessage, 'id' | 'createdAt'>) => void;
  createConversation: (postId: string, postTitle: string, participantId: string, participantName: string, participantAvatar: string) => string;
  updateConversationStatus: (conversationId: string, status: ConversationStatus) => void;
  sendProposal: (conversationId: string, amount: number, message?: string) => void;
  approveProposal: (conversationId: string) => void;
  rejectProposal: (conversationId: string) => void;
  createContract: (conversationId: string, finalAmount: number) => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string) => void;
  initializeFromLocalStorage: () => void;
}

const STORAGE_KEY = 'kerjaaja_data';

const getStoredData = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : null;
};

const saveToLocalStorage = (data: any) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const useStore = create<AppState>((set, get) => ({
  currentUser: null,
  posts: [],
  notifications: [],
  conversations: [],
  searchQuery: '',
  selectedCategory: 'Semua',
  
  setCurrentUser: (user) => {
    set({ currentUser: user });
    const data = getStoredData() || {};
    data.currentUser = user;
    saveToLocalStorage(data);
  },
  
  updateCurrentUser: (updates: Partial<User>) => {
    set((state) => {
      if (!state.currentUser) return state;
      const updatedUser = { ...state.currentUser, ...updates };
      const data = getStoredData() || {};
      data.currentUser = updatedUser;
      saveToLocalStorage(data);
      return { currentUser: updatedUser };
    });
  },
  
  logout: () => {
    set({ currentUser: null });
    const data = getStoredData() || {};
    data.currentUser = null;
    saveToLocalStorage(data);
  },
  
  addPost: (post) => {
    const newPost: Post = {
      ...post,
      id: Date.now().toString(),
      likes: [],
      comments: [],
      bids: [],
      createdAt: new Date().toISOString(),
    };
    
    set((state) => ({ posts: [newPost, ...state.posts] }));
    
    const data = getStoredData() || {};
    data.posts = [newPost, ...(data.posts || [])];
    saveToLocalStorage(data);
  },
  
  toggleLike: (postId, userId) => {
    set((state) => ({
      posts: state.posts.map((post) => {
        if (post.id === postId) {
          const likes = post.likes.includes(userId)
            ? post.likes.filter((id) => id !== userId)
            : [...post.likes, userId];
          return { ...post, likes };
        }
        return post;
      }),
    }));
    
    const data = getStoredData() || {};
    data.posts = get().posts;
    saveToLocalStorage(data);
  },
  
  addComment: (postId, comment) => {
    const newComment: Comment = {
      ...comment,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    
    set((state) => ({
      posts: state.posts.map((post) => {
        if (post.id === postId) {
          return { ...post, comments: [...post.comments, newComment] };
        }
        return post;
      }),
    }));
    
    const data = getStoredData() || {};
    data.posts = get().posts;
    saveToLocalStorage(data);
  },
  
  addBid: (postId, bid) => {
    const newBid: Bid = {
      ...bid,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    
    set((state) => ({
      posts: state.posts.map((post) => {
        if (post.id === postId) {
          return { ...post, bids: [...post.bids, newBid] };
        }
        return post;
      }),
    }));
    
    const data = getStoredData() || {};
    data.posts = get().posts;
    saveToLocalStorage(data);
  },
  
  markNotificationAsRead: (notificationId) => {
    set((state) => ({
      notifications: state.notifications.map((notif) =>
        notif.id === notificationId ? { ...notif, read: true } : notif
      ),
    }));
    
    const data = getStoredData() || {};
    data.notifications = get().notifications;
    saveToLocalStorage(data);
  },
  
  markAllNotificationsAsRead: () => {
    set((state) => ({
      notifications: state.notifications.map((notif) => ({ ...notif, read: true })),
    }));
    
    const data = getStoredData() || {};
    data.notifications = get().notifications;
    saveToLocalStorage(data);
  },
  
  addMessage: (conversationId, message) => {
    const newMessage: ChatMessage = {
      ...message,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    
    set((state) => ({
      conversations: state.conversations.map((conv) => {
        if (conv.id === conversationId) {
          return {
            ...conv,
            messages: [...conv.messages, newMessage],
            lastMessage: message.text,
            lastMessageTime: newMessage.createdAt,
            unreadCount: message.senderId !== state.currentUser?.id ? conv.unreadCount + 1 : conv.unreadCount,
          };
        }
        return conv;
      }),
    }));
    
    const data = getStoredData() || {};
    data.conversations = get().conversations;
    saveToLocalStorage(data);
  },
  
  createConversation: (postId, postTitle, participantId, participantName, participantAvatar) => {
    const currentUser = get().currentUser;
    if (!currentUser) return '';
    
    const existingConv = get().conversations.find(
      (conv) => conv.postId === postId && conv.participants.includes(participantId)
    );
    
    if (existingConv) return existingConv.id;
    
    const newConversation: Conversation = {
      id: Date.now().toString(),
      postId,
      postTitle,
      participants: [currentUser.id, participantId],
      participantNames: [currentUser.username, participantName],
      participantAvatars: [currentUser.avatar, participantAvatar],
      messages: [],
      unreadCount: 0,
      status: "negotiating",
    };
    
    set((state) => ({
      conversations: [newConversation, ...state.conversations],
    }));
    
    const data = getStoredData() || {};
    data.conversations = [newConversation, ...(data.conversations || [])];
    saveToLocalStorage(data);
    
    return newConversation.id;
  },

  updateConversationStatus: (conversationId, status) => {
    set((state) => ({
      conversations: state.conversations.map((conv) =>
        conv.id === conversationId ? { ...conv, status } : conv
      ),
    }));
    
    const data = getStoredData() || {};
    data.conversations = get().conversations;
    saveToLocalStorage(data);
  },

  sendProposal: (conversationId, amount, message) => {
    const currentUser = get().currentUser;
    if (!currentUser) return;

    const proposal: Proposal = {
      id: `proposal_${Date.now()}`,
      conversationId,
      proposedBy: currentUser.id,
      amount,
      message,
      createdAt: new Date().toISOString(),
    };

    set((state) => ({
      conversations: state.conversations.map((conv) =>
        conv.id === conversationId
          ? { ...conv, currentProposal: proposal, status: "proposal_sent" as ConversationStatus }
          : conv
      ),
    }));
    
    const data = getStoredData() || {};
    data.conversations = get().conversations;
    saveToLocalStorage(data);
  },

  approveProposal: (conversationId) => {
    set((state) => ({
      conversations: state.conversations.map((conv) =>
        conv.id === conversationId
          ? { ...conv, status: "deal_agreed" as ConversationStatus }
          : conv
      ),
    }));
    
    const data = getStoredData() || {};
    data.conversations = get().conversations;
    saveToLocalStorage(data);
  },

  rejectProposal: (conversationId) => {
    set((state) => ({
      conversations: state.conversations.map((conv) =>
        conv.id === conversationId
          ? { ...conv, status: "proposal_rejected" as ConversationStatus, currentProposal: undefined }
          : conv
      ),
    }));
    
    const data = getStoredData() || {};
    data.conversations = get().conversations;
    saveToLocalStorage(data);
  },

  createContract: (conversationId, finalAmount) => {
    const conversation = get().conversations.find((c) => c.id === conversationId);
    if (!conversation) return;

    const contract: Contract = {
      id: `contract_${Date.now()}`,
      conversationId,
      finalAmount,
      agreedAt: new Date().toISOString(),
      jobMakerId: conversation.participants[0],
      jobSeekerId: conversation.participants[1],
    };

    set((state) => ({
      conversations: state.conversations.map((conv) =>
        conv.id === conversationId
          ? { ...conv, contract, status: "work_in_progress" as ConversationStatus }
          : conv
      ),
    }));
    
    const data = getStoredData() || {};
    data.conversations = get().conversations;
    saveToLocalStorage(data);
  },
  
  setSearchQuery: (query) => set({ searchQuery: query }),
  
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  
  initializeFromLocalStorage: () => {
    const data = getStoredData();
    if (data) {
      set({
        currentUser: data.currentUser || null,
        posts: data.posts || [],
        notifications: data.notifications || [],
        conversations: data.conversations || [],
      });
    } else {
      // Initialize with dummy conversations for testing
      const currentUser = get().currentUser;
      if (currentUser) {
        const dummyConversations: Conversation[] = [
          {
            id: 'conv1',
            postId: 'post1',
            postTitle: 'Butuh Desain Logo untuk Startup',
            participants: [currentUser.id, 'user2'],
            participantNames: [currentUser.username, 'Sarah Designer'],
            participantAvatars: [currentUser.avatar, 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah'],
            messages: [
              {
                id: 'msg1',
                senderId: 'user2',
                senderName: 'Sarah Designer',
                senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah',
                text: 'Halo! Saya tertarik dengan proyek logo Anda. Saya punya pengalaman 5 tahun di branding.',
                createdAt: new Date(Date.now() - 3600000).toISOString(),
              },
              {
                id: 'msg2',
                senderId: currentUser.id,
                senderName: currentUser.username,
                senderAvatar: currentUser.avatar,
                text: 'Bagus! Budget saya sekitar 2-3 juta. Bagaimana dengan Anda?',
                createdAt: new Date(Date.now() - 1800000).toISOString(),
              },
            ],
            lastMessage: 'Bagus! Budget saya sekitar 2-3 juta. Bagaimana dengan Anda?',
            lastMessageTime: new Date(Date.now() - 1800000).toISOString(),
            unreadCount: 0,
            status: 'negotiating',
          },
          {
            id: 'conv2',
            postId: 'post2',
            postTitle: 'Jasa Renovasi Rumah',
            participants: [currentUser.id, 'user3'],
            participantNames: [currentUser.username, 'Budi Kontraktor'],
            participantAvatars: [currentUser.avatar, 'https://api.dicebear.com/7.x/avataaars/svg?seed=Budi'],
            messages: [
              {
                id: 'msg3',
                senderId: 'user3',
                senderName: 'Budi Kontraktor',
                senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Budi',
                text: 'Setelah survey lokasi, saya tawarkan 45 juta untuk renovasi total.',
                createdAt: new Date(Date.now() - 7200000).toISOString(),
              },
            ],
            lastMessage: 'Setelah survey lokasi, saya tawarkan 45 juta untuk renovasi total.',
            lastMessageTime: new Date(Date.now() - 7200000).toISOString(),
            unreadCount: 1,
            status: 'proposal_sent',
            currentProposal: {
              id: 'prop1',
              conversationId: 'conv2',
              proposedBy: 'user3',
              amount: 45000000,
              message: 'Termasuk material premium dan garansi 2 tahun',
              createdAt: new Date(Date.now() - 7200000).toISOString(),
            },
          },
          {
            id: 'conv3',
            postId: 'post3',
            postTitle: 'Web Developer untuk E-commerce',
            participants: [currentUser.id, 'user4'],
            participantNames: [currentUser.username, 'Andi Developer'],
            participantAvatars: [currentUser.avatar, 'https://api.dicebear.com/7.x/avataaars/svg?seed=Andi'],
            messages: [
              {
                id: 'msg4',
                senderId: currentUser.id,
                senderName: currentUser.username,
                senderAvatar: currentUser.avatar,
                text: 'Oke, saya setuju dengan 25 juta untuk proyek ini.',
                createdAt: new Date(Date.now() - 14400000).toISOString(),
              },
            ],
            lastMessage: 'Oke, saya setuju dengan 25 juta untuk proyek ini.',
            lastMessageTime: new Date(Date.now() - 14400000).toISOString(),
            unreadCount: 0,
            status: 'deal_agreed',
            currentProposal: {
              id: 'prop2',
              conversationId: 'conv3',
              proposedBy: 'user4',
              amount: 25000000,
              message: 'Full-stack development dengan maintenance 3 bulan',
              createdAt: new Date(Date.now() - 18000000).toISOString(),
            },
          },
          {
            id: 'conv4',
            postId: 'post4',
            postTitle: 'Fotografer Wedding',
            participants: [currentUser.id, 'user5'],
            participantNames: [currentUser.username, 'Linda Photographer'],
            participantAvatars: [currentUser.avatar, 'https://api.dicebear.com/7.x/avataaars/svg?seed=Linda'],
            messages: [
              {
                id: 'msg5',
                senderId: 'user5',
                senderName: 'Linda Photographer',
                senderAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Linda',
                text: 'Kontrak sudah ditandatangani. Saya mulai persiapan alat!',
                createdAt: new Date(Date.now() - 86400000).toISOString(),
              },
            ],
            lastMessage: 'Kontrak sudah ditandatangani. Saya mulai persiapan alat!',
            lastMessageTime: new Date(Date.now() - 86400000).toISOString(),
            unreadCount: 0,
            status: 'work_in_progress',
            contract: {
              id: 'contract1',
              conversationId: 'conv4',
              finalAmount: 8000000,
              agreedAt: new Date(Date.now() - 86400000).toISOString(),
              jobMakerId: currentUser.id,
              jobSeekerId: 'user5',
            },
          },
        ];
        
        set({ conversations: dummyConversations });
        
        const newData = getStoredData() || {};
        newData.conversations = dummyConversations;
        saveToLocalStorage(newData);
      }
    }
  },
}));
