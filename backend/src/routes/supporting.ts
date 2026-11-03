import { Router } from 'express';
import { AppError } from '../middleware/errorHandler.js';
import { fetchSupportingData } from '../services/listingsProvider.js';
import { normalizeSupportingList } from '../services/supportingNormalize.js';

export const supportingRouter = Router();

const SUPPORTING_ENDPOINTS: Record<string, string> = {
  'property-type': '/get-property-type-data',
  developers: '/get-developers-data',
  locations: '/get-locations-data',
  cities: '/get-cities-data',
  communities: '/get-communities-data',
  'sub-communities': '/get-sub-communities-data',
  buildings: '/get-buildings-data',
  'listing-agents': '/get-listing-agents-data',
  'private-amenities': '/get-private-amenities-data',
  'commercial-amenities': '/get-commercial-amenities-data',
};

supportingRouter.get('/:type', async (req, res, next) => {
  try {
    const type = req.params.type;
    const endpoint = SUPPORTING_ENDPOINTS[type];

    if (!endpoint) {
      throw new AppError(
        `Unknown supporting type "${type}". Valid types: ${Object.keys(SUPPORTING_ENDPOINTS).join(', ')}`,
        400
      );
    }

    const raw = await fetchSupportingData(endpoint);
    res.json({ data: normalizeSupportingList(type, raw) });
  } catch (error) {
    next(error);
  }
});
