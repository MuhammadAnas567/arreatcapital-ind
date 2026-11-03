import { Router } from 'express';
import { AppError } from '../middleware/errorHandler.js';
import {
  extractFriendlyQuery,
  translateFriendlyQuery,
} from '../services/filterTranslation.js';
import {
  fetchListingDetail,
  fetchListings,
} from '../services/listingsProvider.js';
import { normalizeDetail, normalizeListings } from '../services/normalize.js';

export const listingsRouter = Router();

listingsRouter.get('/', async (req, res, next) => {
  try {
    const friendly = extractFriendlyQuery(req.query as Record<string, unknown>);
    const query = translateFriendlyQuery(friendly);
    const result = await fetchListings(query);

    res.json({
      data: normalizeListings(result.items),
      total: result.total,
      page: result.page,
      limit: result.limit,
      totalAll: result.totalAll,
    });
  } catch (error) {
    next(error);
  }
});

listingsRouter.get('/:slug', async (req, res, next) => {
  try {
    const slug = req.params.slug?.trim();
    if (!slug) {
      throw new AppError('Listing slug is required', 400);
    }

    const raw = await fetchListingDetail(slug);
    res.json(normalizeDetail(raw));
  } catch (error) {
    next(error);
  }
});
