import { env } from './config/env.js';
import app from './app.js';

const port = Number(process.env.PORT || env.PORT || 4002);
app.listen(port, () => {
  console.log(`Customer Service listening on port ${port}`);
});
