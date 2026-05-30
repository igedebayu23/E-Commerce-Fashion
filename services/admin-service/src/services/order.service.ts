/**
 * services/order.service.ts
 * SRP: Admin read-only view of orders from the shared database.
 * This service reads order data directly from the DB for admin dashboard use.
 * Write operations (status updates, shipping) are delegated to order-service via API.
 */
import { prisma } from '../db/client';
import type { OrderStatus } from '@prisma/client';

export class OrderService {
  static async getOrders(status?: OrderStatus) {
    return await prisma.order.findMany({
      where: { status },
      include: {
        customer: { select: { name: true, email: true } },
        _count: { select: { items: true } }
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  static async getOrderById(id: string) {
    const order = await prisma.order.findUnique({
      where: { id },
      include: { customer: true, items: true }
    });
    if (!order) throw new Error('Pesanan tidak ditemukan');
    return order;
  }
}
