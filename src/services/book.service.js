const prisma = require("../prisma/prismaClient");

const getAllBooks = async (skip = 0, take = 10) => {
  // inclui o autor para cada livro
  return prisma.book.findMany({
    skip,
    take,
    include: { author: true } // garante que author é retornado junto
  });
};

const createBook = async (data) => {
  // espera que data contenha title, year, genre, available e authorId (UUID)
  return prisma.book.create({ data });
};

module.exports = { getAllBooks, createBook };