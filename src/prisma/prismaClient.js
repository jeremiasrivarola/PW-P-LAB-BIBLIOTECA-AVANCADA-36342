require("dotenv").config();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient({
  accelerateUrl: process.env.DATABASE_URL // só aqui é que podes usar accelerateUrl
});

module.exports = prisma;

module.exports = prisma;