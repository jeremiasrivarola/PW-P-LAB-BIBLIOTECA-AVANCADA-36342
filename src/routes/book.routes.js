const express = require("express");
const router = express.Router();

const {
  getAllBooks,
  getBookById,
  searchBooks,
  createBook,
  updateBook,
  deleteBook
} = require("../controllers/book.controller");

// Rotas de livros
router.get("/search", searchBooks); // pesquisa por título
router.get("/", getAllBooks);       // lista todos os livros (com paginação e sort)
router.get("/:id", getBookById);    // livro específico
router.post("/", createBook);       // cria livro
router.put("/:id", updateBook);     // atualiza livro
router.delete("/:id", deleteBook);  // apaga livro

module.exports = router;






