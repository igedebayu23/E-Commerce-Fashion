/**
 * types/dashboard.types.ts
 * SRP: Type contracts for the admin dashboard overview response.
 */

export interface OrderSummaryDTO {
  id: string;
  status: string;
  total: number;
  createdAt: string | Date;
  customer?: {
    name: string;
    email: string;
  };
}

export interface DashboardOverviewDTO {
  analytics: {
    summary: {
      totalRevenue: number;
      revenueGrowth: number;
    };
    finance: {
      grossProfit: number;
    };
    successRate: number;
  };
  recentOrders: OrderSummaryDTO[];
}
