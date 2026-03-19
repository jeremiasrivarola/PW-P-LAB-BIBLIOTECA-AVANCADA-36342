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
  // Agrupa por genre e conta


  return {
    totalBooks,
    totalAuthors,
    availableBooks,
    borrowedBooks,
  };
};
const getBooksCountByGenre = async () => {

  const books = await prisma.book.groupBy({
    by: ['genre'],
    _count: {
      genre: true
    }
  });
  const result = {};
  books.forEach(b => {
    result[b.genre] = b._count.genre;
  });

  return result;
};
module.exports = { getStats, getBooksCountByGenre };