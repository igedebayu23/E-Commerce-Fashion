/**
 * lib/api/upload.api.ts
 * SRP: HTTP client for image upload operations via the commerce service.
 * Renamed from uploads.ts → upload.api.ts for clarity (*.api.ts = HTTP client).
 */

import { COMMERCE_API_URL } from './config';

export interface UploadResponse {
  success: boolean;
  publicUrl?: string;
  path?: string;
  error?: string;
}

export async function uploadImage(params: {
  bucket: string;
  path: string;
  base64: string;
  contentType: string;
}): Promise<UploadResponse> {
  const res = await fetch(`${COMMERCE_API_URL}/uploads`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
    credentials: 'include'
  });
  return await res.json();
}
