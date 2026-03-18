const authorService = require("../services/author.service");

// GET /authors - lista todos os autores
const getAllAuthors = async (req, res) => {
  try {
    const authors = await authorService.getAllAuthors();
    res.status(200).json(authors);
  } catch (error) {
    console.error(error); // mostra o erro real
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};

// GET /authors/:id - obtém um autor específico
const getAuthorById = async (req, res) => {
  try {
    const { id } = req.params;
    const author = await authorService.getAuthorById(id);

    if (!author) {
      return res.status(404).json({ message: "Autor não encontrado" });
    }

    res.status(200).json(author);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};

// POST /authors - cria um novo autor
const createAuthor = async (req, res) => {
  try {
    const author = await authorService.createAuthor(req.body);
    res.status(201).json(author);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};

// PUT /authors/:id - atualiza um autor existente
const updateAuthor = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, nationality, birthYear } = req.body;

    if (!name) {
      return res.status(400).json({ message: "O nome é obrigatório" });
    }

    const updatedAuthor = await authorService.updateAuthor(id, {
      name,
      nationality,
      birthYear
    });

    res.status(200).json(updatedAuthor);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};

// DELETE /authors/:id - apaga um autor
const deleteAuthor = async (req, res) => {
  try {
    const { id } = req.params;

    const author = await authorService.getAuthorById(id);
    if (!author) {
      return res.status(404).json({ message: "Autor não encontrado" });
    }

    await authorService.deleteAuthor(id);

    res.status(200).json({ message: "Autor apagado com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};

// GET /authors/:id/books - obtém livros de um autor específico
const getBooksByAuthor = async (req, res) => {
  try {
    const authorId = req.params.id;
    const books = await authorService.getBooksByAuthor(authorId);
    res.status(200).json(books);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

// GET /authors/top
const getTopAuthors = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5;
    const authors = await authorService.getTopAuthors(limit);
    res.status(200).json(authors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};

module.exports = {
  getAllAuthors,
  createAuthor,
  getAuthorById,
  updateAuthor,
  deleteAuthor,
  getBooksByAuthor,
  getTopAuthors 
};