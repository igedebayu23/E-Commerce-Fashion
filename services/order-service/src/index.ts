import { env } from './config/env.js';
import app from './app.js';

const port = Number(process.env.PORT || env.PORT || 4003);
app.listen(port, "0.0.0.0", () => {
  console.log(`Order Service listening on port ${port}`);
});
