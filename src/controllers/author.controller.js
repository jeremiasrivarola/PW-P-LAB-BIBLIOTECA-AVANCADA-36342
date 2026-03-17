const authorService = require("../services/author.service");

const getAllAuthors = async (req, res) => {
  try {
    const authors = await authorService.getAllAuthors();
    res.status(200).json(authors);
  } catch (error) {
    console.error(error); // 👈 MOSTRA O ERRO REAL
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};
const updateAuthor = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, nationality, birthYear } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "O nome é obrigatório"
      });
    }

    const updatedAuthor = await authorService.updateAuthor(id, {
      name,
      nationality,
      birthYear
    });

    res.json(updatedAuthor);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Erro interno do servidor"
    });
  }
};
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

const createAuthor = async (req, res) => {
  try {
    const author = await authorService.createAuthor(req.body);
    res.status(201).json(author);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};
const deleteAuthor = async (req, res) => {
  try {
    const { id } = req.params;

    // Primeiro verifica se existe
    const author = await authorService.getAuthorById(id);
    if (!author) {
      return res.status(404).json({
        message: "Autor não encontrado"
      });
    }

    await authorService.deleteAuthor(id);

    res.status(200).json({
      message: "Autor apagado com sucesso"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Erro interno do servidor"
    });
  }
};

const getBooksByAuthor = async (req, res) => {
    try {
        const authorId = req.params.id; // pega o id do autor da rota
        const books = await authorService.getBooksByAuthor(authorId);
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
  getAllAuthors,
  createAuthor,
  getAuthorById,
  updateAuthor,
  deleteAuthor,
  getBooksByAuthor
};