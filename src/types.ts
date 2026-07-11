export type UserRole = 'customer' | 'admin';

export interface User {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  createdAt: string;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  image?: string;
}

export interface Product {
  _id: string;
  name: string;
  slug: string;
  category: string | Category;
  description: string;
  images: string[];
  price: number;
  discountPrice?: number;
  weightOptions: string[];
  flavourOptions: string[];
  shapeOptions: string[];
  egglessAvailable: boolean;
  preparationTime: string;
  stock: number;
  isAvailable: boolean;
  rating: number;
  reviewsCount: number;
  isFeatured: boolean;
  hasOffer: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedWeight: string;
  selectedFlavour: string;
  selectedShape: string;
  isEggless: boolean;
  specialInstructions?: string;
}

export type OrderStatus = 'Pending' | 'Accepted' | 'Preparing' | 'Ready for Pickup' | 'Completed' | 'Cancelled';

export interface Order {
  _id: string;
  user: string | User;
  items: {
    product: string | Product;
    name: string;
    price: number;
    quantity: number;
    weight: string;
    flavour: string;
    shape: string;
    isEggless: boolean;
    image: string;
  }[];
  totalAmount: number;
  status: OrderStatus;
  pickupDate: string;
  pickupTime: string;
  paymentMethod: 'COD' | 'UPI';
  paymentStatus: 'Pending' | 'Completed';
  transactionId?: string;
  specialInstructions?: string;
  createdAt: string;
}
