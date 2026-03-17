const express = require("express");
const router = express.Router();

const { getAllAuthors, createAuthor, getAuthorById, updateAuthor, deleteAuthor,getBooksByAuthor } = require("../controllers/author.controller");

router.get("/", getAllAuthors);
router.post("/", createAuthor);
router.get("/:id", getAuthorById);    // pega por id
router.put("/:id", updateAuthor);
router.delete("/:id", deleteAuthor);
router.get('/:id/books', getBooksByAuthor);

module.exports = router;