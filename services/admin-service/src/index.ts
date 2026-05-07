import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Provide fallback for __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

import app from './app';

const PORT = process.env.PORT || 4001;

app.listen(PORT, () => {
  console.log(`Admin Service listening on port ${PORT}`);
});
