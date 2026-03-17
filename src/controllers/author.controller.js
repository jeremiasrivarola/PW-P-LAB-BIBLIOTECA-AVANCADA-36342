// src/controllers/author.controller.js
const authorService = require("../services/author.service");

const getAllAuthors = async (req, res, next) => {
  try {
    const authors = await authorService.getAllAuthors();
    res.status(200).json(authors);
  } catch (err) {
    next(err);
  }
};

const createAuthor = async (req, res, next) => {
  try {
    const author = await authorService.createAuthor(req.body);
    res.status(201).json(author);
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllAuthors, createAuthor };