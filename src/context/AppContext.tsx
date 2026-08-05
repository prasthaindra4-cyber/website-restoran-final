import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export type Product = {
  id: string;
  name: string;
  category: 'Makanan' | 'Minuman' | 'Cemilan';
  price: number;
  image: string;
  description: string;
};

type CartItem = Product & { quantity: number };

type SearchHistory = string;

interface AppContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  cartTotal: number;
  favorites: Product[];
  toggleFavorite: (product: Product) => void;
  isFavorite: (productId: string) => boolean;
  searchHistory: SearchHistory[];
  addSearchHistory: (query: string) => void;
  clearSearchHistory: () => void;
  notifications: string[];
  clearNotifications: () => void;
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [searchHistory, setSearchHistory] = useState<SearchHistory[]>([]);
  const [notifications, setNotifications] = useState<string[]>(['Selamat datang di Kedai Prasmar!', 'Menu baru telah ditambahkan.']);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item => item.id === productId ? { ...item, quantity } : item));
  };

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  const toggleFavorite = (product: Product) => {
    setFavorites(prev => {
      const isFav = prev.some(p => p.id === product.id);
      if (isFav) return prev.filter(p => p.id !== product.id);
      return [...prev, product];
    });
  };

  const isFavorite = (productId: string) => favorites.some(p => p.id === productId);

  const addSearchHistory = (query: string) => {
    if (!query.trim()) return;
    setSearchHistory(prev => {
      const newHistory = [query, ...prev.filter(q => q !== query)].slice(0, 5);
      return newHistory;
    });
  };

  const clearSearchHistory = () => setSearchHistory([]);
  const clearNotifications = () => setNotifications([]);

  const login = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);

  return (
    <AppContext.Provider value={{
      cart, addToCart, removeFromCart, updateQuantity, cartTotal,
      favorites, toggleFavorite, isFavorite,
      searchHistory, addSearchHistory, clearSearchHistory,
      notifications, clearNotifications,
      isLoggedIn, login, logout
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};
