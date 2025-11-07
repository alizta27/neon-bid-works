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

interface AppState {
  currentUser: User | null;
  posts: Post[];
  searchQuery: string;
  selectedCategory: string;
  setCurrentUser: (user: User) => void;
  updateCurrentUser: (updates: Partial<User>) => void;
  logout: () => void;
  addPost: (post: Omit<Post, 'id' | 'likes' | 'comments' | 'bids' | 'createdAt'>) => void;
  toggleLike: (postId: string, userId: string) => void;
  addComment: (postId: string, comment: Omit<Comment, 'id' | 'createdAt'>) => void;
  addBid: (postId: string, bid: Omit<Bid, 'id' | 'createdAt'>) => void;
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
  
  setSearchQuery: (query) => set({ searchQuery: query }),
  
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  
  initializeFromLocalStorage: () => {
    const data = getStoredData();
    if (data) {
      set({
        currentUser: data.currentUser || null,
        posts: data.posts || [],
      });
    }
  },
}));
