const prisma = require("../prisma/prismaClient");

const getStats = async () => {
  const totalBooks = await prisma.book.count();
  const totalAuthors = await prisma.author.count();
  const availableBooks = await prisma.book.count({ where: { available: true } });
  const borrowedBooks = await prisma.book.count({ where: { available: false } });

  return {
    totalBooks,
    totalAuthors,
    availableBooks,
    borrowedBooks
  };
};

module.exports = { getStats };