const bookService = require("../services/book.service");

const getAllBooks = async (req, res, next) => {
  try {
    const page = Math.max(parseInt(req.query.page) || 1, 1);
    const limit = Math.max(parseInt(req.query.limit) || 10, 1);
    const skip = (page - 1) * limit;
    const take = limit;

    const books = await bookService.getAllBooks(skip, take);

    res.status(200).json({
      page,
      limit,
      count: books.length,
      data: books
    });
  } catch (err) {
    console.error(err); // Mostra o erro real no console
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};

const createBook = async (req, res, next) => {
  try {
    const book = await bookService.createBook(req.body);
    res.status(201).json(book);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};

module.exports = { getAllBooks, createBook };