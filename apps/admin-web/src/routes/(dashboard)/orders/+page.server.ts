import { orderApi } from '$lib/api/order.api';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url, fetch }) => {
	const status = url.searchParams.get('status') || '';
	const dateRange = url.searchParams.get('range') || 'all';
	
	const ordersResult = await orderApi.getOrders(fetch);

	return {
		orders: ordersResult.data || [],
		currentStatus: status || undefined,
		currentRange: dateRange
	};
};
