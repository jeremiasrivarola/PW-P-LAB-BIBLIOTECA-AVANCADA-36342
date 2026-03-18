const express = require("express");
const router = express.Router();

const { getStats } = require("../controllers/stats.controller");

// Rota para obter estatísticas
router.get("/", getStats);

module.exports = router;