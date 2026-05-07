import { createProxyMiddleware } from 'http-proxy-middleware';
import { env } from '../../config/env';
import { proxyOptions } from './common.proxy';

export const commerceProxy = createProxyMiddleware({
  ...proxyOptions(env.COMMERCE_SERVICE_URL),
  pathRewrite: (path, req) => {
    return req.originalUrl.replace(/^\/api\/storefront/, '/api/commerce');
  }
});

export const commerceAdminProxy = createProxyMiddleware({
  ...proxyOptions(env.COMMERCE_SERVICE_URL),
  pathRewrite: (path, req) => {
    return req.originalUrl.replace(/^\/api\/admin\/storefront/, '/api/commerce/admin');
  }
});
