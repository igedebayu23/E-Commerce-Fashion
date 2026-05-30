/**
 * routes/customer.routes.ts
 * SRP: Handle storefront customer order requests.
 */
import { Router } from 'express';
import { OrderController } from '../controllers/order.controller.js';
import { createAuthMiddleware } from '@novarium/shared';
import { env } from '../config/env.js';

const router = Router();
const auth = createAuthMiddleware(env.JWT_SECRET, env.INTERNAL_SERVICE_KEY);

router.get('/:customerId', auth as any, OrderController.getCustomerOrders);
router.get('/:customerId/:orderId', auth as any, OrderController.getCustomerOrderDetails);

export default router;
