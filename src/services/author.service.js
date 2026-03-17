const prisma = require("../prisma/prismaClient");

const getAllAuthors = async () => {
  return prisma.author.findMany({
    include: {
      books: true
    }
  });
};

const getAuthorById = async (id) => {
  return prisma.author.findUnique({
    where: { id }, // id é String (UUID)
    include: { books: true }
  });
};

const createAuthor = async (data) => {
  return prisma.author.create({ data });
};

const updateAuthor = async (id, data) => {
  return prisma.author.update({
    where: { id },
    data
  });
};

const deleteAuthor = async (id) => {
  return prisma.author.delete({ where: { id } });
};

const getBooksByAuthor = async (authorId) => {
  return prisma.book.findMany({
    where: { authorId }
  });
};

module.exports = {
  getAllAuthors,
  createAuthor,
  getAuthorById,
  updateAuthor,
  deleteAuthor,
  getBooksByAuthor
};