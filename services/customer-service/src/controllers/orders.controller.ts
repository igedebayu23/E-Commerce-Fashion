import { Request, Response, NextFunction } from 'express';
import { createServiceClient } from '@novarium/shared';
import { env } from '../config/env.js';

const orderClient = createServiceClient(env.ORDER_SERVICE_URL, env.INTERNAL_SERVICE_KEY);

export class OrdersController {
  static async getOrders(req: any, res: Response, next: NextFunction) {
    try {
      const result = await orderClient.get(`/api/orders/customer/${req.user.id}`);
      res.json(result);
    } catch (err: any) {
      console.error('[OrdersController] Failed to get orders:', err.message);
      res.status(500).json({ success: false, error: err.message });
    }
  }

  static async getOrderDetails(req: any, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const result = await orderClient.get(`/api/orders/customer/${req.user.id}/${id}`);
      res.json(result);
    } catch (err: any) {
      console.error('[OrdersController] GET Detail Error:', err.message);
      res.status(500).json({ success: false, error: err.message });
    }
  }
}
