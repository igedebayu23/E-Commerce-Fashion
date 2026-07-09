import * as dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(process.cwd(), '../../.env') });

import { prisma } from './src/db/client';
import bcrypt from 'bcryptjs';

async function main() {
  const email = 'admin@novarium.com';
  const password = await bcrypt.hash('admin123', 10);
  
  const admin = await prisma.adminUser.upsert({
    where: { email },
    update: { password },
    create: {
      email,
      password,
      name: 'Super Admin',
      role: 'SUPER_ADMIN'
    }
  });

  console.log('Admin user created/updated:', admin.email);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
