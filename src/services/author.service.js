const prisma = require("../prisma/prismaClient");

// Obter todos os autores com os respetivos livros
const getAllAuthors = async () => {
  return prisma.author.findMany({
    include: { books: true }
  });
};

// Obter um autor pelo ID (UUID) com os livros
const getAuthorById = async (id) => {
  return prisma.author.findUnique({
    where: { id },
    include: { books: true }
  });
};

// Criar um novo autor
const createAuthor = async (data) => {
  return prisma.author.create({ data });
};

// Atualizar um autor existente
const updateAuthor = async (id, data) => {
  return prisma.author.update({
    where: { id },
    data
  });
};

// Apagar um autor
const deleteAuthor = async (id) => {
  return prisma.author.delete({ where: { id } });
};

// Obter todos os livros de um autor específico
const getBooksByAuthor = async (authorId) => {
  return prisma.book.findMany({
    where: { authorId }
  });
};

// Obter autores com maior número de livros
const getTopAuthors = async (limit = 5) => {
  return prisma.author.findMany({
    orderBy: {
      books: {
        _count: "desc"
      }
    },
    take: limit,
    include: {
      books: true
    }
  });
};

// Cria um autor com vários livros em uma transação
const createAuthorWithBooks = async (authorData, booksData) => {
  return await prisma.$transaction(async (tx) => {
   
    const author = await tx.author.create({
      data: authorData
    });

    
    const booksToCreate = booksData.map(book => ({
      ...book,
      authorId: author.id
    }));

    await tx.book.createMany({
      data: booksToCreate
    });

    return {
      author,
      books: booksToCreate
    };
  });
};

module.exports = {
  getAllAuthors,
  createAuthor,
  getAuthorById,
  updateAuthor,
  deleteAuthor,
  getBooksByAuthor,
  getTopAuthors,
  createAuthorWithBooks
};