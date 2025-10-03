const express = require("express");
const router = express.Router();
const voteController = require("../controllers/voteController");

// POST emitir voto
router.post("/", voteController.castVote);

// GET listar votos
router.get("/", voteController.getVotes);

// GET obtener voto por id
router.get("/:id", voteController.getVoteById);

// stats
router.get("/stats/all", voteController.getStats);
module.exports = router;
