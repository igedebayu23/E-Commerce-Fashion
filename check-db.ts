import dotenv from 'dotenv';
dotenv.config();
process.env.DATABASE_URL = process.env.CORE_DATABASE_URL;

async function checkDb() {
  try {
    const { default: prisma } = await import('./services/commerce-service/src/db/client.js');
    const products = await prisma.product.findMany();
    console.log(`Found ${products.length} products.`);
    if (products.length > 0) {
      console.log(products[0]);
    }
    const categories = await prisma.category.findMany();
    console.log(`Found ${categories.length} categories.`);
  } catch (e) {
    console.error(e);
  }
}

checkDb();
