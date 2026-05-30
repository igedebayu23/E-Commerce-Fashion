import { env } from '$env/dynamic/public';

/**
 * Transforms a local path or filename into a full Gateway-proxied Supabase Storage URL.
 * If the input is already a full URL (http/https), it returns it as-is.
 * 
 * @param url The local path, filename, or full URL
 * @param bucket The storage bucket (defaults to 'products')
 * @returns The full proxied URL or an empty string
 */
export function getImageUrl(url: string | null | undefined, bucket: string = 'products'): string {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  
  const SUPABASE_URL = env.PUBLIC_SUPABASE_URL;
  if (!SUPABASE_URL) return '';

  let cleanPath = url.startsWith('/') ? url.slice(1) : url;
  if (cleanPath.startsWith('images/')) {
    cleanPath = cleanPath.replace('images/', '');
  }
  
  return `${SUPABASE_URL}/storage/v1/object/public/${bucket}/${cleanPath}`;
}
