<script lang="ts">
  import { env } from '$env/dynamic/public';
  import { getImageUrl } from '$lib/utils/image';

  let { products } = $props<{ products: any[] }>();

  function formatCurrency(amount: number) {
    const finalAmount = amount < 10000 ? amount * 1000 : amount;
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(finalAmount);
  }
</script>

<div class="entry-grid">
  {#each products as product}
    <a href="/products/{product.id}" class="product-entry">
      <div class="entry-image">
        {#if (product.image && product.image.length > 0) || (product.images && product.images.length > 0)}
          {@const displayImage = product.image?.[0] || product.images?.[0]}
          <img src={getImageUrl(displayImage)} alt={product.name} />
        {:else}
          <div class="image-placeholder">
            {product.name.charAt(0)}
          </div>
        {/if}
      </div>

      <div class="entry-info">
        <div class="info-main">
          <div class="entry-name">{product.name}</div>
          <div class="entry-meta">{product.category?.name || 'ESSENTIAL'} · {product.stock} IN STOCK</div>
        </div>
        <div class="entry-price">{formatCurrency(product.price)}</div>
      </div>
    </a>
  {:else}
    <div class="empty-archive">
      <h2>Empty Archive</h2>
    </div>
  {/each}
</div>
