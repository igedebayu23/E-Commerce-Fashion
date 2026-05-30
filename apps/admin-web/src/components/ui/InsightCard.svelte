<script lang="ts">
  let { label, value, trend, trendValue, description } = $props<{
    label: string;
    value: string;
    trend?: 'up' | 'down';
    trendValue?: number | string;
    description?: string;
  }>();
</script>

<div class="insight-card">
  <div class="insight-label">{label}</div>
  <div class="insight-value">{value}</div>
  
  {#if trend && trendValue}
    <div class="insight-trend" class:up={trend === 'up'} class:down={trend === 'down'}>
      <span class="trend-badge">{trend === 'up' ? '↑' : '↓'} {trendValue}%</span> vs last month
    </div>
  {/if}

  {#if description}
    <div class="insight-description">{description}</div>
  {/if}
</div>
