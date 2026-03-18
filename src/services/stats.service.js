const prisma = require("../prisma/prismaClient");

// Função para obter estatísticas do sistema
const getStats = async () => {
  // Total de livros
  const totalBooks = await prisma.book.count();

  // Total de autores
  const totalAuthors = await prisma.author.count();

  // Livros disponíveis
  const availableBooks = await prisma.book.count({ where: { available: true } });

  // Livros emprestados
  const borrowedBooks = await prisma.book.count({ where: { available: false } });

  return {
    totalBooks,
    totalAuthors,
    availableBooks,
    borrowedBooks
  };
};

module.exports = { getStats };