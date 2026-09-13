import 'dotenv/config';
import mongoose from 'mongoose';
import { connectToDatabase } from './config/database.js';
import { Listing } from './models/listing.model.js';

const listings = [
  { title: 'Juniper House', city: 'Munnar', country: 'India', category: 'Forest stays', pricePerNight: 86, rating: 4.92, reviewCount: 41, imageUrl: 'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=900&q=80' },
  { title: 'Salt & Stone', city: 'Alibag', country: 'India', category: 'Beach escapes', pricePerNight: 124, rating: 4.88, reviewCount: 28, imageUrl: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=900&q=80' },
  { title: 'The Glass Orchard', city: 'Coonoor', country: 'India', category: 'Design stays', pricePerNight: 153, rating: 4.97, reviewCount: 19, imageUrl: 'https://images.unsplash.com/photo-1601918774946-25832a4be0d6?auto=format&fit=crop&w=900&q=80' },
  { title: 'Red Earth Cabin', city: 'Kasauli', country: 'India', category: 'Mountain stays', pricePerNight: 98, rating: 4.81, reviewCount: 33, imageUrl: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=900&q=80' },
  { title: 'Coconut Grove Villa', city: 'Goa', country: 'India', category: 'Beach escapes', pricePerNight: 142, rating: 4.89, reviewCount: 52, imageUrl: 'https://images.unsplash.com/photo-1582610116397-edb318620f90?auto=format&fit=crop&w=900&q=80' },
  { title: 'Misty Pine Lodge', city: 'Manali', country: 'India', category: 'Mountain stays', pricePerNight: 112, rating: 4.86, reviewCount: 47, imageUrl: 'https://images.unsplash.com/photo-1542718610-a1d656d1884c?auto=format&fit=crop&w=900&q=80' },
  { title: 'The Courtyard House', city: 'Jaipur', country: 'India', category: 'Design stays', pricePerNight: 76, rating: 4.78, reviewCount: 64, imageUrl: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=900&q=80' },
  { title: 'Backwater Verandah', city: 'Alleppey', country: 'India', category: 'Waterfront stays', pricePerNight: 91, rating: 4.91, reviewCount: 38, imageUrl: 'https://images.unsplash.com/photo-1602305654404-4e7d0b6f7d9e?auto=format&fit=crop&w=900&q=80' },
  { title: 'Cedar & Cloud', city: 'Shimla', country: 'India', category: 'Forest stays', pricePerNight: 105, rating: 4.84, reviewCount: 29, imageUrl: 'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=900&q=80' },
  { title: 'Riverstone Retreat', city: 'Rishikesh', country: 'India', category: 'Nature stays', pricePerNight: 88, rating: 4.8, reviewCount: 35, imageUrl: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=80' },
  { title: 'Bamboo Tide House', city: 'Pondicherry', country: 'India', category: 'Beach escapes', pricePerNight: 119, rating: 4.87, reviewCount: 44, imageUrl: 'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=900&q=80' },
  { title: 'Tea Estate Cottage', city: 'Darjeeling', country: 'India', category: 'Forest stays', pricePerNight: 83, rating: 4.9, reviewCount: 31, imageUrl: 'https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=900&q=80' },
];

await connectToDatabase();
await Listing.deleteMany({});
await Listing.insertMany(listings);
console.log(`Seeded ${listings.length} listings`);
await mongoose.disconnect();
