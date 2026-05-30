import { dashboardService } from '$lib/services/dashboard.service';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
  return await dashboardService.getOverview(fetch);
};
