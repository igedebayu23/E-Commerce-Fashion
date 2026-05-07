import { createProxyMiddleware } from 'http-proxy-middleware';
import { env } from '../../config/env';
import { proxyOptions } from './common.proxy';

export const adminProxy = createProxyMiddleware({
  ...proxyOptions(env.ADMIN_SERVICE_URL),
  pathRewrite: (path, req) => {
    return req.originalUrl.replace(/^\/api\/admin\/storefront\/orders/, '/api/admin/orders');
  }
});

export const adminAuthProxy = createProxyMiddleware({
  ...proxyOptions(env.ADMIN_SERVICE_URL),
  pathRewrite: (path, req) => {
    return req.originalUrl.replace(/^\/api\/admin\/auth/, '/api/admin/auth');
  }
});

export const adminManagementProxy = createProxyMiddleware({
  ...proxyOptions(env.ADMIN_SERVICE_URL),
  pathRewrite: (path, req) => {
    let newPath = req.originalUrl;
    if (newPath.startsWith('/api/admin/shipping')) {
      return newPath.replace(/^\/api\/admin\/shipping/, '/api/admin/shipping');
    }
    return newPath.replace(/^\/api\/admin\/management/, '/api/admin');
  }
});

export const customerProxy = createProxyMiddleware({
  ...proxyOptions(env.CUSTOMER_SERVICE_URL),
  pathRewrite: (path, req) => {
    let newPath = req.originalUrl;
    if (newPath.startsWith('/api/storefront/auth')) return newPath.replace(/^\/api\/storefront\/auth/, '/api/customer/auth');
    if (newPath.startsWith('/api/storefront/cart')) return newPath.replace(/^\/api\/storefront\/cart/, '/api/customer/cart');
    if (newPath.startsWith('/api/storefront/checkout')) return newPath.replace(/^\/api\/storefront\/checkout/, '/api/customer/checkout');
    if (newPath.startsWith('/api/storefront/account')) return newPath.replace(/^\/api\/storefront\/account/, '/api/customer/account');
    if (newPath.startsWith('/api/storefront/orders')) return newPath.replace(/^\/api\/storefront\/orders/, '/api/customer/orders');
    if (newPath.startsWith('/api/storefront/shipping')) return newPath.replace(/^\/api\/storefront\/shipping/, '/api/customer/shipping');
    return newPath;
  }
});
