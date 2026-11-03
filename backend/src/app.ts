import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import { env } from './config/env.js';
import { errorHandler, notFoundHandler } from './middleware/errorHandler.js';
import { listingsRouter } from './routes/listings.js';
import { supportingRouter } from './routes/supporting.js';

const app = express();
const isVercel = Boolean(process.env.VERCEL);

if (!isVercel) {
  app.set('trust proxy', 1);
}

app.use(
  cors({
    origin: env.CORS_ORIGIN.split(',').map((origin) => origin.trim()),
    methods: ['GET', 'OPTIONS'],
  })
);

app.use(express.json({ limit: '1mb' }));

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later' },
  validate: {
    trustProxy: false,
    xForwardedForHeader: false,
  },
});

app.use('/api', apiLimiter);

app.get('/health', (_req, res) => {
  res.json({
    ok: true,
    env: {
      hasListingsApi: Boolean(env.LISTINGS_API_BASE_URL),
      hasClientId: Boolean(env.LISTINGS_CLIENT_ID),
      hasClientSecret: Boolean(env.LISTINGS_CLIENT_SECRET),
    },
  });
});

app.use('/api/listings', listingsRouter);
app.use('/api/supporting', supportingRouter);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
