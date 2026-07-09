import { env } from './config/env';
import app from "./app";

const port = Number(process.env.PORT || env.PORT || 3001);
app.listen(port, () => {
  console.log(`Commerce Service listening on port ${port}`);
});
