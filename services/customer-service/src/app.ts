import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth';
import accountRoutes from './routes/account';
import cartRoutes from './routes/cart';
import checkoutRoutes from './routes/checkout';
import orderRoutes from './routes/orders';
import shippingRoutes from './routes/shipping';
import { errorHandler } from './middleware/error-handler';

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Root Health Check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', service: 'customer-service' });
});

// Routes
app.use('/api/customer/auth', authRoutes);
app.use('/api/customer/account', accountRoutes);
app.use('/api/customer/cart', cartRoutes);
app.use('/api/customer/checkout', checkoutRoutes);
app.use('/api/customer/orders', orderRoutes);
app.use('/api/customer/shipping', shippingRoutes);

// Error Handler
app.use(errorHandler);

export default app;
