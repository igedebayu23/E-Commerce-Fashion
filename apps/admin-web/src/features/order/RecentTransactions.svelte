<script lang="ts">
  import { goto } from '$app/navigation';
  import StatusPill from '../../components/ui/StatusPill.svelte';

  let { orders, limit = 5 } = $props<{ orders: any[], limit?: number }>();

  function formatCurrency(amount: number) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
  }
</script>

<div class="table-container">
  <div class="table-header">
    <h2 class="table-title">Recent Transactions</h2>
    <a href="/orders" class="btn-studio-secondary">View All</a>
  </div>
  
  <table class="data-table">
    <thead>
      <tr>
        <th>Order ID</th>
        <th>Customer</th>
        <th class="text-right">Gross Amount</th>
        <th>Status</th>
      </tr>
    </thead>
    <tbody>
      {#each orders.slice(0, limit) as order}
        <tr onclick={() => goto(`/orders/${order.id}`)}>
          <td>
            <div class="order-id">#{order.id.slice(-6).toUpperCase()}</div>
            <div class="order-date">{new Date(order.createdAt).toLocaleDateString()}</div>
          </td>
          <td class="customer-name">{order.customer?.name || 'Guest'}</td>
          <td class="amount text-right">{formatCurrency(order.totalAmount)}</td>
          <td>
            <StatusPill status={order.status} />
          </td>
        </tr>
      {:else}
        <tr>
          <td colspan="4" class="empty-state">No recent transactions found.</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
