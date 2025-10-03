const Vote = require("../models/vote");
const Voter = require("../models/voter");
const Candidate = require("../models/candidate");

// Registrar voto
exports.castVote = async (req, res) => {
  try {
    const { voter_id, candidate_id } = req.body;

    // 1. Validar existencia de votante
    const voter = await Voter.findById(voter_id);
    if (!voter) return res.status(404).json({ error: "Votante no encontrado" });

    // 2. Validar que no haya votado antes
    if (voter.has_voted) {
      return res.status(400).json({ error: "El votante ya ha emitido su voto" });
    }

    // 3. Validar existencia de candidato
    const candidate = await Candidate.findById(candidate_id);
    if (!candidate) return res.status(404).json({ error: "Candidato no encontrado" });

    // 4. Validar que el votante no sea también candidato 
    if (String(voter._id) === String(candidate._id)) {
      return res.status(400).json({ error: "Un votante no puede ser candidato" });
    }

    // 5. Registrar el voto
    const vote = new Vote({ voter_id, candidate_id });
    await vote.save();

    // 6. Actualizar estado del votante y votos del candidato
    voter.has_voted = true;
    await voter.save();

    candidate.votes += 1;
    await candidate.save();

    res.status(201).json({ message: "Voto registrado con éxito", vote });
  } catch (error) {
    res.status(500).json({ error: "Error al registrar el voto", details: error.message });
  }
};

// Listar votos
exports.getVotes = async (req, res) => {
  try {
    const votes = await Vote.find().populate("voter_id candidate_id");
    res.json(votes);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener votos", details: error.message });
  }
};

// Obtener voto por id
exports.getVoteById = async (req, res) => {
  try {
    const vote = await Vote.findById(req.params.id).populate("voter_id candidate_id");
    if (!vote) return res.status(404).json({ error: "Voto no encontrado" });
    res.json(vote);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el voto", details: error.message });
  }
};

// Estadísticas de la votación
exports.getStats = async (req, res) => {
  try {
    const totalVoters = await Voter.countDocuments();
    const totalVotes = await Vote.countDocuments();

    // Porcentaje de participación
    const participation = totalVoters > 0 
      ? ((totalVotes / totalVoters) * 100).toFixed(2) 
      : 0;

    // Votos por candidato
    const candidates = await Candidate.find().select("name party votes");

    // Determinar ganador
    let winner = null;
    if (candidates.length > 0) {
      winner = candidates.reduce((prev, current) =>
        current.votes > prev.votes ? current : prev
      );
    }

    res.json({
      totalVoters,
      totalVotes,
      participation: `${participation}%`,
      candidates,
      winner: winner ? { name: winner.name, party: winner.party, votes: winner.votes } : null,
    });
  } catch (error) {
    res.status(500).json({ error: "Error al obtener estadísticas", details: error.message });
  }
};