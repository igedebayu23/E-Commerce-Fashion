import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

// For local development, inject the URL into process.env before PrismaClient initializes
if (!process.env.DATABASE_URL && process.env.ADMIN_DATABASE_URL) {
  process.env.DATABASE_URL = process.env.ADMIN_DATABASE_URL;
}

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

export { prisma };
export default prisma;
