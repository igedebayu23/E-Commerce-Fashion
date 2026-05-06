/**
 * lib/api/shipping.ts
 * API client for Shipping and Logistics calculations.
 */

import { API_BASE_URL, fetchOptions } from "./config";

export const shippingApi = {
  /**
   * Calculate shipping fees based on location
   */
  async calculateShipping(params: { lat: number; lng: number; city: string }) {
    const res = await fetch(`${API_BASE_URL}/shipping`, fetchOptions({
      method: "POST",
      body: JSON.stringify(params),
    }));
    
    if (!res.ok) throw new Error("Failed to fetch shipping options");
    return await res.json();
  }
};
