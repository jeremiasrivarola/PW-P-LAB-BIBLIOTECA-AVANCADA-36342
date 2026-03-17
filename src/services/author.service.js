// src/services/author.service.js
const prisma = require("../prisma/prismaClient");

const getAllAuthors = async () => {
  return prisma.author.findMany();
};

const createAuthor = async (data) => {
  return prisma.author.create({ data });
};

module.exports = {
  getAllAuthors,
  createAuthor
};