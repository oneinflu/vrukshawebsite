// Type definitions for the application

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface Address {
  _id: string;
  id?: string; // Keep for backward compatibility
  address: string;  // Consistent with API expectations
  city: string;
  state: string;
  pincode: string;  // Consistent with API expectations
  country?: string; // Optional for backward compatibility
  isDefault?: boolean; // Optional for backward compatibility
}

export interface Category {
  _id: string;
  id?: string; // Keep for backward compatibility
  name: string;
  description?: string;
  imageUrl?: string; // Keep for backward compatibility
  icon?: string;
  parent?: string | null;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface Product {
  _id: string;
  id?: string; // Keep for backward compatibility
  name: string;
  description: string;
  price: number;
  images: string[];
  imageUrl?: string; // Keep for backward compatibility
  category: {
    _id: string;
    name: string;
  };
  categoryId?: string; // Keep for backward compatibility
  stock?: number;
  variation?: {
    weight: string;
    price: number;
    pcs: number;
    _id: string;
  }[];
}

export interface CartItem {
  _id: string;
  product: Product;
  quantity: number;
  variation: {
    weight: string;
    price: number;
    pcs: number;
  };
}

export interface Cart {
  _id: string;
  user: string;
  items: CartItem[];
  total: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  totalAmount: number;
  addressId: string;
  address: Address;
  status: string;
  createdAt: string;
  isRecurring: boolean;
  startDate?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}