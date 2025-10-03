const express = require("express");
const router = express.Router();
const voterController = require("../controllers/voterController");

// POST crear votante
router.post("/", voterController.createVoter);

// GET listar votantes
router.get("/", voterController.getVoters);

// GET obtener votante por id
router.get("/:id", voterController.getVoterById);

// DELETE eliminar votante
router.delete("/:id", voterController.deleteVoter);

module.exports = router;