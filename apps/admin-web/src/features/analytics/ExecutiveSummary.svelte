<script lang="ts">
  let { summary } = $props<{ summary: any }>();

  function formatCurrency(amount: number) {
    const final = amount < 10000 ? amount * 1000 : amount;
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(final);
  }
</script>

<div class="summary-grid">
  <div class="insight-card-premium">
    <div class="meta-label">Revenue This Month</div>
    <div class="main-val">{formatCurrency(summary.revenueThisMonth)}</div>
    <div class="trend-indicator {Number(summary.revenueGrowth) >= 0 ? 'up' : 'down'}">
      {Number(summary.revenueGrowth) >= 0 ? '+' : ''}{summary.revenueGrowth}% vs prev month
    </div>
  </div>
  
  <div class="insight-card-premium">
    <div class="meta-label">Avg Order Value</div>
    <div class="main-val">{formatCurrency(summary.aov)}</div>
    <div class="sub-label">Verified baseline</div>
  </div>

  <div class="insight-card-premium">
    <div class="meta-label">New Customers</div>
    <div class="main-val">{summary.newCustomers}</div>
    <div class="sub-label">Joined this period</div>
  </div>

  <div class="insight-card-premium dark">
    <div class="meta-label fiscal">Fiscal Capacity</div>
    <div class="main-val light">{formatCurrency(summary.totalRevenue)}</div>
    <div class="sub-label fiscal">Lifetime gross</div>
  </div>
</div>
