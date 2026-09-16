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
export type OrderStatus = 'received' | 'confirmed' | 'preparing' | 'ready' | 'completed';
export type Order = {
  id: string;
  items: CartItem[];
  total: number;
  paymentMethod: string;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
};

type SearchHistory = string;

interface AppContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  currentOrder: Order | null;
  createOrder: (paymentMethod: string) => Order;
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
  const [currentOrder, setCurrentOrder] = useState<Order | null>(() => {
    const saved = localStorage.getItem('prasmar-current-order');
    return saved ? JSON.parse(saved) as Order : null;
  });

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
  const clearCart = () => setCart([]);

  const createOrder = (paymentMethod: string) => {
    const now = new Date().toISOString();
    const order: Order = {
      id: `KP-${Date.now().toString().slice(-6)}`,
      items: cart,
      total: cartTotal * 1.11,
      paymentMethod,
      status: 'received',
      createdAt: now,
      updatedAt: now,
    };
    setCurrentOrder(order);
    localStorage.setItem('prasmar-current-order', JSON.stringify(order));
    clearCart();
    return order;
  };

  useEffect(() => {
    if (!currentOrder || currentOrder.status === 'completed') return;
    const stages: OrderStatus[] = ['received', 'confirmed', 'preparing', 'ready', 'completed'];
    const timer = window.setInterval(() => {
      setCurrentOrder((previous) => {
        if (!previous) return previous;
        const currentIndex = stages.indexOf(previous.status);
        if (currentIndex >= stages.length - 1) return previous;
        const updated = { ...previous, status: stages[currentIndex + 1], updatedAt: new Date().toISOString() };
        localStorage.setItem('prasmar-current-order', JSON.stringify(updated));
        return updated;
      });
    }, 15000);
    return () => window.clearInterval(timer);
  }, [currentOrder]);

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
      cart, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal,
      currentOrder, createOrder,
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
