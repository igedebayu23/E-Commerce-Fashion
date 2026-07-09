/**
 * lib/services/dashboard.service.ts
 * SRP: Dashboard data aggregation service.
 * Orchestrates multiple API clients to compose the overview data.
 * This is a SERVICE, not an API client — it lives in lib/services/, not lib/api/.
 */

import { analyticsApi } from '$lib/api/analytics.api';
import { orderApi } from '$lib/api/order.api';

export const dashboardService = {
  async getOverview(fetch: typeof globalThis.fetch) {
    const [analytics, orders] = await Promise.all([
      analyticsApi.getAnalytics(fetch),
      orderApi.getOrders(fetch, 5)
    ]);

    const rawAnalytics = analytics.data || {};
    
    return {
      analytics: {
        ...rawAnalytics,
        summary: rawAnalytics.summary || { totalRevenue: 0, revenueGrowth: 0 },
        finance: rawAnalytics.finance || { grossProfit: 0 },
        successRate: rawAnalytics.successRate || 100
      },
      recentOrders: (orders.data || []).slice(0, 5)
    };
  }
};
