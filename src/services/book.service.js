const prisma = require("../prisma/prismaClient");

// Obter todos os livros com paginação e ordenação por 'title' ou 'year'
const getAllBooks = async (skip = 0, take = 10, sort) => {
  let orderBy;

  // Aceita apenas 'title' ou 'year'
  if (sort === "title" || sort === "year") {
    orderBy = { [sort]: "asc" }; // ordena ascendente
  }

  return prisma.book.findMany({
    skip,
    take,
    orderBy,
    include: { author: true }
  });
};

// Obter um livro pelo ID
const getBookById = async (id) => {
  return prisma.book.findUnique({
    where: { id },
    include: { author: true }
  });
};

// Pesquisar livros pelo título
const searchBooks = async (title = "") => {
  return prisma.book.findMany({
    where: {
      title: {
        contains: title || "", // garante que é string
        mode: "insensitive"
      }
    },
    include: { author: true }
  });
};



// Criar um novo livro
const createBook = async (bookData) => {
  return prisma.book.create({ data: bookData });
};

// Atualizar um livro existente
const updateBook = async (id, data) => {
  return prisma.book.update({
    where: { id },
    data
  });
};

// Apagar um livro
const deleteBook = async (id) => {
  return prisma.book.delete({ where: { id } });
};

module.exports = {
  getAllBooks,
  getBookById,
  searchBooks,
  createBook,
  updateBook,
  deleteBook
  
};