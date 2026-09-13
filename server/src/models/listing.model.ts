import { Schema, model } from 'mongoose';

export interface ListingDocument {
  title: string;
  city: string;
  country: string;
  category: string;
  pricePerNight: number;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  isPublished: boolean;
}

const listingSchema = new Schema<ListingDocument>(
  {
    title: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true, index: true },
    country: { type: String, required: true, trim: true },
    category: { type: String, required: true, trim: true, index: true },
    pricePerNight: { type: Number, required: true, min: 1, index: true },
    rating: { type: Number, required: true, min: 0, max: 5, default: 0 },
    reviewCount: { type: Number, required: true, min: 0, default: 0 },
    imageUrl: { type: String, required: true },
    isPublished: { type: Boolean, default: true, index: true },
  },
  { timestamps: true },
);

listingSchema.index({ isPublished: 1, category: 1, createdAt: -1 });

export const Listing = model<ListingDocument>('Listing', listingSchema);
