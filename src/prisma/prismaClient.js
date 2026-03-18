require("dotenv").config();
const { PrismaClient } = require("@prisma/client");

// Instância do Prisma Client
const prisma = new PrismaClient({
  accelerateUrl: process.env.DATABASE_URL 
});

module.exports = prisma;