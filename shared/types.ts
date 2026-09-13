export type UserRole = 'USER' | 'HOST' | 'ADMIN';

export interface ListingSummary {
  id: string;
  title: string;
  city: string;
  country: string;
  category: string;
  pricePerNight: number;
  rating: number;
  reviewCount: number;
  imageUrl: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
