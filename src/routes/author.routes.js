const express = require("express");
const router = express.Router();

const {
  getAllAuthors,
  createAuthor,
  getAuthorById,
  updateAuthor,
  deleteAuthor,
  getBooksByAuthor,
  getTopAuthors,
  createAuthorWithBooks
} = require("../controllers/author.controller");

// Rotas de autores
router.get("/", getAllAuthors);             // lista todos os autores
router.post("/", createAuthor);             // cria novo autor
router.get("/:id", getAuthorById);          // obtém autor por ID
router.put("/:id", updateAuthor);           // atualiza autor
router.delete("/:id", deleteAuthor);        // apaga autor
router.get("/:id/books", getBooksByAuthor); // obtém livros de um autor específico
router.get("/top", getTopAuthors);          // top autor
router.post("/authors-with-books", createAuthorWithBooks); //cria autor com varios livros

module.exports = router;