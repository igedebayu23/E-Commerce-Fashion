<script lang="ts">
  import InsightCard from '../../components/ui/InsightCard.svelte';
  
  let { analytics } = $props<{ analytics: any }>();

  function formatCurrency(amount: number) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
  }
</script>

<div class="metrics-grid">
  <InsightCard 
    label="Gross Transaction Value (Life)"
    value={formatCurrency(analytics.summary.totalRevenue)}
    trend={analytics.summary.revenueGrowth >= 0 ? 'up' : 'down'}
    trendValue={Math.abs(analytics.summary.revenueGrowth)}
  />
  
  <InsightCard 
    label="Net Settlement (Est)"
    value={formatCurrency(analytics.finance.grossProfit)}
    description="Clearing tomorrow at 08:00 AM"
  />

  <div class="insight-card">
    <div class="insight-label">Payment Success Rate</div>
    <div class="insight-value">{analytics.successRate || 100}%</div>
    <div class="progress-bar-container">
      <div class="progress-bar-fill" style="width: {analytics.successRate || 100}%"></div>
    </div>
  </div>
</div>
