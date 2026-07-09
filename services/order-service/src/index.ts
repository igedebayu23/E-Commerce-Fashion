import { env } from './config/env.js';
import app from './app.js';

const port = Number(process.env.PORT || env.PORT || 4003);

// Hanya panggil listen jika tidak berjalan di Vercel (karena Vercel Serverless tidak butuh port listen)
if (!process.env.VERCEL) {
  app.listen(port, () => {
    console.log(`Order Service listening on port ${port}`);
  });
}

// Export untuk Vercel Serverless
export default app;
