const Voter = require("../models/voter");

// Crear votante
exports.createVoter = async (req, res) => {
  try {
    const voter = new Voter(req.body);
    await voter.save();
    res.status(201).json(voter);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Listar todos
exports.getVoters = async (req, res) => {
  try {
    const voters = await Voter.find();
    res.json(voters);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener por id
exports.getVoterById = async (req, res) => {
  try {
    const voter = await Voter.findById(req.params.id);
    if (!voter) return res.status(404).json({ message: "Votante no encontrado" });
    res.json(voter);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar
exports.deleteVoter = async (req, res) => {
  try {
    const voter = await Voter.findByIdAndDelete(req.params.id);
    if (!voter) return res.status(404).json({ message: "Votante no encontrado" });
    res.json({ message: "Votante eliminado" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};