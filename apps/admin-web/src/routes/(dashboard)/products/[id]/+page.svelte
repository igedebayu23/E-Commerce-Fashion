<script lang="ts">
	let { data } = $props();
	import { enhance } from '$app/forms';
	import UploadImage from '@components/ui/UploadImage.svelte';

	let imageUrl = $state('');

	$effect(() => {
		imageUrl = data.product.imageUrl || '';
	});
</script>

<div class="hero-header">
	<h1 class="editorial-title">Refine Entry</h1>
	<p class="editorial-subtitle">Adjusting the essence of {data.product.name}.</p>
</div>

<div class="form-card">
	<form method="POST" action="?/update" use:enhance>
		<div class="product-form-layout">
			<div class="form-main-section">
				<div class="input-group">
					<label class="input-label" for="name">Product Name</label>
					<input 
						type="text" 
						id="name" 
						name="name" 
						class="input-control" 
						value={data.product.name}
						required 
					/>
				</div>

				<div class="input-group">
					<label class="input-label" for="description">Description</label>
					<textarea id="description" name="description" required class="input-control product-textarea">{data.product.description}</textarea>
				</div>

				<div class="product-inventory-layout">
					<div class="input-group">
						<label class="input-label" for="price">Price (IDR)</label>
						<input 
							type="number" 
							id="price" 
							name="price" 
							class="input-control" 
							value={data.product.price}
							required 
						/>
					</div>
					
					<!-- Size-Based Inventory -->
					<div class="input-group">
						<div class="input-label">Size-Based Inventory</div>

						<div class="product-size-grid">
							{#each data.product.sizeOptions as size, i}
								<div class="product-size-card">
									<span class="product-size-label">{size}</span>
									<input type="number" name="sizeStocks" value={data.product.sizeStocks[i] || 0} class="input-control product-size-input" />
									<input type="hidden" name="sizeOptions" value={size} />
								</div>
							{/each}
						</div>
					</div>
				</div>

			</div>

			<div class="form-sidebar-section">
				<div class="input-group">
					<label class="input-label" for="category">Category</label>
					<select id="category" name="categoryId" class="input-control" required>
						{#each data.categories as category}
							<option value={category.id} selected={data.product.categoryId === category.id}>
								{category.name}
							</option>
						{/each}
					</select>
				</div>

				<div class="input-group">
					<div class="input-label">Product Status</div>

					<div class="product-status-checkbox-container">
						<label class="product-status-checkbox-label">
							<input type="checkbox" name="inStock" checked={data.product.inStock} class="product-status-checkbox" />
							Active in Store
						</label>
					</div>
				</div>

				<div class="input-group">
					<UploadImage 
						bucket="products" 
						folder="items" 
						initialImage={imageUrl}
						onUpload={(url) => imageUrl = url} 
					/>
					<input type="hidden" name="imageUrl" value={imageUrl} />
				</div>

				<div class="product-sidebar-btn-container">
					<button type="submit" class="btn-studio">
						Save Changes
					</button>
					<button 
						type="submit" 
						formaction="?/delete" 
						class="btn-studio-secondary product-btn-delete"
						onclick={(e) => { if (!confirm('Are you sure you want to delete this product?')) e.preventDefault(); }}
					>
						Delete Entry
					</button>
					<a href="/products" class="btn-studio-secondary product-btn-secondary-center">
						Back to Products
					</a>
				</div>
			</div>
		</div>
	</form>
</div>
