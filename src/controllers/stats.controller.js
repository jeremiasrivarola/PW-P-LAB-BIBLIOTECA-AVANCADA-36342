const statsService = require("../services/stats.service");

const getStats = async (req, res) => {
  try {
    const stats = await statsService.getStats();
    res.status(200).json(stats);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};

module.exports = { getStats };