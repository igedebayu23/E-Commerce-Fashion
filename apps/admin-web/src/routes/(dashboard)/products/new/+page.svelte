<script lang="ts">
	let { data } = $props();
	import { enhance } from '$app/forms';
	import { COMMERCE_API_URL, ORDER_API_URL, ADMIN_API_URL } from '$lib/api/config';
	import UploadImage from '@components/ui/UploadImage.svelte';

	let imageUrl = $state('');

	const sizes = ['S', 'M', 'L', 'XL'];
</script>

<div class="hero-header">
	<h1 class="editorial-title">New Entry</h1>
	<p class="editorial-subtitle">Add a new essential to the collection.</p>
</div>

<div class="form-card">
	<form method="POST" use:enhance>
		<div class="product-form-layout">
			<div class="form-main-section">
				<div class="input-group">
					<label class="input-label" for="name">Product Name</label>
					<input 
						type="text" 
						id="name" 
						name="name" 
						class="input-control" 
						placeholder="e.g. Essential Boxy Tee"
						required 
					/>
				</div>

				<div class="input-group">
					<label class="input-label" for="description">Description</label>
					<textarea 
						id="description" 
						name="description" 
						class="input-control product-textarea"
						placeholder="Describe the silhouette and material..."
						required
					></textarea>
				</div>

				<div class="product-inventory-layout">
					<div class="input-group">
						<label class="input-label" for="price">Price (IDR)</label>
						<input 
							type="number" 
							id="price" 
							name="price" 
							class="input-control" 
							placeholder="250000"
							required 
						/>
					</div>
					
					<!-- Size-Based Inventory -->
					<div class="input-group">
						<div class="input-label">Initial Size-Based Inventory</div>

						<div class="product-size-grid">
							{#each sizes as size}
								<div class="product-size-card">
									<span class="product-size-label">{size}</span>
									<input type="number" name="sizeStocks" value="0" class="input-control product-size-input" />
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
						<option value="" disabled selected>Select Category</option>
						{#each data.categories as category}
							<option value={category.id}>{category.name}</option>
						{/each}
					</select>
				</div>

				<div class="input-group">
					<UploadImage 
						bucket="products" 
						folder="items" 
						onUpload={(url) => imageUrl = url} 
					/>
					<input type="hidden" name="imageUrl" value={imageUrl} />
				</div>

				<div class="product-sidebar-btn-container">
					<button type="submit" class="btn-studio">
						Create Entry
					</button>
					<a href="/products" class="btn-studio-secondary product-btn-secondary-center">
						Discard Changes
					</a>
				</div>
			</div>
		</div>
	</form>
</div>
