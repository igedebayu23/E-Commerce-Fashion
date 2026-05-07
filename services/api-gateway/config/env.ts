import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Provide fallback for __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

export const env = {
  PORT: process.env.PORT || 8000,
  JWT_SECRET: process.env.JWT_SECRET || 'novure-super-secret-key-2026',
  INTERNAL_SERVICE_KEY: process.env.INTERNAL_SERVICE_KEY || 'novure-internal-mesh-key-2026',
  COMMERCE_SERVICE_URL: process.env.COMMERCE_SERVICE_URL || 'http://commerce-service:3001',
  ADMIN_SERVICE_URL: process.env.ADMIN_SERVICE_URL || 'http://admin-service:4001',
  CUSTOMER_SERVICE_URL: process.env.CUSTOMER_SERVICE_URL || 'http://customer-service:4002',
  SUPABASE_URL: process.env.PUBLIC_SUPABASE_URL || 'https://ghdadhlyhzdkrjlurifj.supabase.co',
  ALLOWED_ORIGINS: [
    process.env.STOREFRONT_PROD_URL,
    process.env.ADMIN_PROD_URL,
    process.env.STOREFRONT_URL || 'http://localhost:3000',
    process.env.ADMIN_URL || 'http://localhost:4000',
    'http://localhost:5173',
    'http://localhost:4173'
  ].filter(Boolean) as string[]
};
