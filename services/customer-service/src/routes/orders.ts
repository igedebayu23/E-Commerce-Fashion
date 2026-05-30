import { Router } from 'express';
import { OrdersController } from '../controllers/orders.controller.js';
import { createAuthMiddleware } from '@novarium/shared';
import { env } from '../config/env.js';

const router = Router();
const auth = createAuthMiddleware(env.JWT_SECRET, env.INTERNAL_SERVICE_KEY);

router.use(auth as any);

router.get('/', OrdersController.getOrders);
router.get('/:id', OrdersController.getOrderDetails);

export default router;
