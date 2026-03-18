const bookService = require("../services/book.service");
const prisma = require("../prisma/prismaClient");

// GET /books - lista todos os livros com paginação e ordenação
const getAllBooks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const sort = req.query.sort; // "title" ou "year"

    const books = await bookService.getAllBooks(skip, limit, sort);

    res.status(200).json({ page, limit, count: books.length, data: books });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};

// GET /books/:id - obtém um livro específico
const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await bookService.getBookById(id);
    if (!book) return res.status(404).json({ message: "Livro não encontrado" });
    res.status(200).json(book);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};

// GET /books/search?title=... - pesquisa livros pelo título
const searchBooks = async (req, res) => {
  try {
    const title = req.query.title || "";
    const books = await bookService.searchBooks(title);
    res.status(200).json({ count: books.length, data: books });
  } catch (error) {
    console.error("Erro no searchBooks:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};

// POST /books - cria um novo livro
const createBook = async (req, res) => {
  try {
    const { title, year, genre, authorId } = req.body;

    if (!title || !year || !genre || !authorId)
      return res.status(400).json({ message: "Campos obrigatórios em falta" });

    if (isNaN(year)) return res.status(400).json({ message: "'year' deve ser numérico" });

    const author = await prisma.author.findUnique({ where: { id: authorId } });
    if (!author) return res.status(400).json({ message: "O autor indicado não existe" });

    const newBook = await bookService.createBook({ title, year: Number(year), genre, authorId });
    res.status(201).json(newBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};

// PUT /books/:id - atualiza um livro existente
const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, year, genre, authorId } = req.body;

    if (authorId) {
      const author = await prisma.author.findUnique({ where: { id: authorId } });
      if (!author) return res.status(400).json({ message: "O autor indicado não existe" });
    }

    const updatedBook = await bookService.updateBook(id, {
      title,
      year: year ? Number(year) : undefined,
      genre,
      authorId
    });

    res.status(200).json(updatedBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};

// DELETE /books/:id - apaga um livro
const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    await bookService.deleteBook(id);
    res.status(200).json({ message: "Livro apagado com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  searchBooks,
  createBook,
  updateBook,
  deleteBook
};