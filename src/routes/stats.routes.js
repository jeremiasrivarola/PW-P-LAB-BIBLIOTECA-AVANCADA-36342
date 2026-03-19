const express = require("express");
const router = express.Router();

const { getStats, getGenresStats } = require("../controllers/stats.controller");

// Rota para obter estatísticas
router.get("/", getStats);
router.get("/genres", getGenresStats); // GET /stats/genres

module.exports = router;