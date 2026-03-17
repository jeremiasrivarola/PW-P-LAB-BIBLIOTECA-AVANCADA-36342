const express = require("express");
const router = express.Router();
const { getAllBooks, createBook } = require("../controllers/book.controller");

router.get("/", getAllBooks);   // GET /books?page=1&limit=10
router.post("/", createBook);    // POST /books

module.exports = router;