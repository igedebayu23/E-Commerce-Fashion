<script lang="ts">
  let { categories, currentCategory, query } = $props<{
    categories: any[];
    currentCategory: string | null;
    query: string;
  }>();
</script>

<div class="segmentation-nav">
  <a 
    href="/products{query ? `?q=${query}` : ''}" 
    class="nav-item"
    class:active={!currentCategory}
  >
    All Collections
  </a>
  {#each categories as cat}
    <a 
      href="/products?category={cat.id}{query ? `&q=${query}` : ''}" 
      class="nav-item"
      class:active={currentCategory === cat.id}
    >
      {cat.name}
    </a>
  {/each}
</div>
