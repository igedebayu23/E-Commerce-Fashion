import { Request, Response, NextFunction } from 'express';
import { AnalyticsService } from '../services/analytics.service';

export class AnalyticsController {
  static async getDashboardMetrics(req: Request, res: Response, next: NextFunction) {
    try { res.json({ success: true, data: await AnalyticsService.getCommerceMetrics() }); } catch(e) { next(e); }
  }
}
