/**
 * routes/admin.routes.ts
 * SRP: Handle admin order requests.
 */
import { Router } from 'express';
import { OrderController } from '../controllers/order.controller.js';
import { createAuthMiddleware } from '@novarium/shared';
import { env } from '../config/env.js';

const router = Router();
const auth = createAuthMiddleware(env.JWT_SECRET, env.INTERNAL_SERVICE_KEY);

router.get('/', auth as any, OrderController.getAdminOrders);
router.get('/:id', auth as any, OrderController.getAdminOrderDetails);

export default router;
