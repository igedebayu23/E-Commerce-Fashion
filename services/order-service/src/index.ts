// @ts-nocheck
import express from 'express';
import { createCorsMiddleware, errorHandler } from '@novarium/shared';
import { env } from './config/env.js';
import customerRoutes from './routes/customer.routes.js';
import adminRoutes from './routes/admin.routes.js';

const app = express();

app.use(createCorsMiddleware(env.ALLOWED_ORIGINS));
app.use(express.json());

// Root Health Check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', service: 'order-service' });
});

// Routes
app.use('/api/orders/customer', customerRoutes);
app.use('/api/orders/admin', adminRoutes);

// Error Handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  errorHandler(err, req, res, next);
});

const port = Number(process.env.PORT || env.PORT || 4003);

// Hanya panggil listen jika tidak berjalan di Vercel
if (!process.env.VERCEL) {
  app.listen(port, () => {
    console.log(`Order Service listening on port ${port}`);
  });
}

// Export untuk Vercel Serverless
export default app;
