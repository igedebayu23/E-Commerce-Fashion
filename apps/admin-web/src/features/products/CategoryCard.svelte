<script lang="ts">
  import { env } from '$env/dynamic/public';
  import { getImageUrl } from '$lib/utils/image';
  
  let { category } = $props<{ category: any }>();

  const displayImage = $derived(category.image || (category.products?.[0]?.images?.[0] || null));
</script>

<a href="/categories/{category.id}" class="collection-card">
  <div class="card-visual">
    {#if displayImage}
      <img src={getImageUrl(displayImage)} alt={category.name} />
    {:else}
      <div class="image-placeholder">
        {category.name.charAt(0)}
      </div>
    {/if}
    <div class="visual-overlay">
      <div class="product-count">{category._count.products} Products</div>
      <div class="category-name">{category.name}</div>
    </div>
  </div>
  <div class="card-content">
    <p class="description">
      {category.description || 'Essential items curated for the modern wardrobe. Defined by quality, purpose, and timeless aesthetic.'}
    </p>
    <div class="manage-link">
      Manage Structure <span>→</span>
    </div>
  </div>
</a>
