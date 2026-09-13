import { Router } from 'express';
import { Listing } from '../models/listing.model.js';

const router = Router();

router.get('/', async (request, response, next) => {
  try {
    const category = typeof request.query.category === 'string' ? request.query.category : undefined;
    const location = typeof request.query.location === 'string' ? request.query.location.trim() : '';
    const escapedLocation = location.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const filter = {
      isPublished: true,
      ...(category && category !== 'All stays' ? { category } : {}),
      ...(escapedLocation
        ? {
            $or: [
              { city: { $regex: escapedLocation, $options: 'i' } },
              { country: { $regex: escapedLocation, $options: 'i' } },
            ],
          }
        : {}),
    };
    const listings = await Listing.find(filter).sort({ createdAt: -1 }).lean();

    response.json({
      success: true,
      data: listings.map((listing) => ({ ...listing, id: listing._id.toString() })),
    });
  } catch (error) {
    next(error);
  }
});

export default router;
