// Middleware global de tratamento de erros
module.exports = (err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    message: "Erro interno do servidor"
  });
};