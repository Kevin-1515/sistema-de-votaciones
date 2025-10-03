const express = require("express");
const router = express.Router();
const candidateController = require("../controllers/candidateController");

// POST crear candidato
router.post("/", candidateController.createCandidate);

// GET listar candidatos
router.get("/", candidateController.getCandidates);

// GET obtener candidato por id
router.get("/:id", candidateController.getCandidateById);

// DELETE eliminar candidato
router.delete("/:id", candidateController.deleteCandidate);

module.exports = router;
