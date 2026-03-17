const prisma = require("../prisma/prismaClient");

const getAllBooks = async (skip = 0, take = 10, sort) => {
  let orderBy;
  if (sort) {
    orderBy = sort.split(",").map(pair => {
      const [field, direction] = pair.split(":");
      return { [field]: direction === "desc" ? "desc" : "asc" };
    });
  }

  return prisma.book.findMany({
    skip,
    take,
    orderBy,
    include: { author: true }
  });
};

const getBookById = async (id) => {
  return prisma.book.findUnique({
    where: { id },
    include: { author: true }
  });
};

const searchBooks = async (title = "") => {
  return prisma.book.findMany({
    where: {
      title: {
        contains: title || "",  // garante que é string
        mode: "insensitive"
      }
    },
    include: { author: true }
  });
};

const createBook = async (bookData) => {
  return prisma.book.create({ data: bookData });
};

const updateBook = async (id, data) => {
  return prisma.book.update({
    where: { id },
    data
  });
};

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