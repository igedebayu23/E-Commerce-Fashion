<script lang="ts">
	import { enhance } from '$app/forms';
	import UploadImage from '@components/ui/UploadImage.svelte';
	import { env } from '$env/dynamic/public';
	import { getImageUrl } from '$lib/utils/image';
	
	let { data } = $props();
	let imageUrl = $state('');
	let isModalOpen = $state(false);
	let searchQuery = $state('');

	$effect(() => {
		imageUrl = data.category.image || '';
	});

	const filteredProducts = $derived(
		data.allProducts.filter((p: any) =>
			p.categoryId !== data.category.id &&
			p.name.toLowerCase().includes(searchQuery.toLowerCase())
		)
	);
</script>

<div class="hero-header">
	<h1 class="editorial-title">Refine Collection</h1>
	<p class="editorial-subtitle">Architecting the structural identity of {data.category.name}.</p>
</div>

<div class="form-card">
	<form method="POST" action="?/update" use:enhance>
		<div class="product-form-layout">
			<div class="form-main-section">
				<div class="input-group">
					<label class="input-label" for="name">Collection Name</label>
					<input 
						type="text" 
						id="name" 
						name="name" 
						class="input-control" 
						value={data.category.name}
						required 
					/>
				</div>

				<div class="input-group">
					<label class="input-label" for="description">Description</label>
					<textarea id="description" name="description" required class="input-control product-textarea">{data.category.description || ''}</textarea>
				</div>

				<!-- Collection Products Grid -->
				<div class="category-collection-content">
					<div class="category-content-header">
						<h3 class="category-collection-title">Collection Content</h3>
												<button 
							type="button" 
							class="btn-studio category-assign-btn"
							onclick={() => isModalOpen = true}
						>
							+ Assign Product
						</button>
					</div>

					<div class="category-assigned-grid">
						{#each data.category.products as product}
							<div class="product-mini-card">
								<div class="mini-card-image">
									{#if product.images[0]}
										<img src={getImageUrl(product.images[0])} alt="" />
									{/if}
								</div>
								<div class="mini-card-info">
									<div class="mini-name">{product.name}</div>
									<div class="mini-meta">Rp {Number(product.price < 10000 ? product.price * 1000 : product.price).toLocaleString()}</div>
								</div>
							</div>
						{/each}
						
						{#if data.category.products.length === 0}
							<div class="category-empty-state">
								No products assigned to this collection.
							</div>
						{/if}
					</div>
				</div>
			</div>

			<div class="form-sidebar-section">
				<div class="input-group">
					<UploadImage 
						bucket="products" 
						folder="categories" 
						initialImage={imageUrl}
						onUpload={(url: string) => imageUrl = url} 
					/>
					<input type="hidden" name="image" value={imageUrl} />
				</div>

				<div class="product-sidebar-btn-container">
					<button type="submit" class="btn-studio">
						Save Changes
					</button>
										<button 
						type="submit" 
						formaction="?/delete" 
						class="btn-studio-secondary product-btn-delete"
						onclick={(e) => { if (!confirm('Are you sure you want to delete this collection?')) e.preventDefault(); }}
					>
						Delete Collection
					</button>
					<a href="/categories" class="btn-studio-secondary product-btn-secondary-center">
						Back to Archive
					</a>
				</div>
			</div>
		</div>
	</form>
</div>

<!-- Assignment Modal -->
{#if isModalOpen}
	<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
	<div 
		class="modal-overlay" 
		onclick={(e) => { if (e.target === e.currentTarget) isModalOpen = false; }} 
		onkeydown={(e) => { if (e.key === 'Escape') isModalOpen = false; }}
		role="presentation"
	>
		<div 
			class="modal-content" 
			onclick={(e) => e.stopPropagation()} 
			onkeydown={(e) => e.key === 'Escape' && (isModalOpen = false)}
			role="document" 
			tabindex="-1"
		>

			<div class="modal-header">
				<h2 class="modal-title">Assign to Collection</h2>
				<button class="close-btn" onclick={() => isModalOpen = false}>✕</button>
			</div>

			<input type="text" placeholder="Filter products..." bind:value={searchQuery} class="input-control modal-filter-input" />

			<div class="modal-grid">
				{#each filteredProducts as product}
					<form method="POST" action="?/assignProduct" use:enhance={() => { isModalOpen = false; return async ({ update }) => { await update(); }; }}>
						<input type="hidden" name="productId" value={product.id} />
						<button type="submit" class="assignment-card">
							<div class="assignment-image">
								{#if product.images[0]}
									<img src={getImageUrl(product.images[0])} alt="" />
								{/if}
							</div>
							<div class="assignment-card-info-container">
								<div class="assignment-card-name">{product.name}</div>
								<div class="assignment-card-current-category">Currently in: {product.category?.name}</div>
							</div>
						</button>
					</form>
				{/each}
			</div>

			{#if filteredProducts.length === 0}
				<div class="modal-empty-search-state">No products found to assign.</div>
			{/if}
		</div>
	</div>
{/if}
