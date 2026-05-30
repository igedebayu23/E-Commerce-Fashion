import { productApi } from '$lib/api/product.api';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url, fetch }) => {
	const query = url.searchParams.get('q') || '';
	const categoryId = url.searchParams.get('category') || '';
	
	const [productsResult, categoriesResult] = await Promise.all([
		productApi.getProducts(fetch, query, categoryId),
		productApi.getCategories(fetch)
	]);

	return {
		products: productsResult.data || [],
		categories: categoriesResult.data || [],
		query,
		currentCategory: categoryId
	};
};
