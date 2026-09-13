import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import listingRoutes from './routes/listing.routes.js';

const app = express();
const helmetMiddleware = helmet as unknown as () => express.RequestHandler;

app.use(helmetMiddleware());
app.use(cors({
  origin: (origin, callback) => {
    const configuredOrigin = process.env.CLIENT_URL;
    const isLocalOrigin = !origin || /^http:\/\/localhost:\d+$/.test(origin);
    const isConfiguredOrigin = configuredOrigin ? origin === configuredOrigin : false;
    callback(null, isLocalOrigin || isConfiguredOrigin);
  },
  credentials: true,
}));
app.use(express.json({ limit: '1mb' }));

app.get('/api/v1/health', (_request, response) => {
  response.json({ success: true, data: { service: 'staynest-api', status: 'ok' } });
});

app.use('/api/v1/listings', listingRoutes);

app.use((error: unknown, _request: express.Request, response: express.Response) => {
  console.error(error);
  response.status(500).json({ success: false, message: 'Unable to complete request' });
});

app.use((_request, response) => {
  response.status(404).json({ success: false, message: 'Route not found' });
});

export default app;
