import { env } from './config/env.js';
import app from './app.js';

const port = Number(process.env.PORT || env.PORT || 4001);
app.listen(port, () => {
  console.log(`Admin Service listening on port ${port}`);
});
