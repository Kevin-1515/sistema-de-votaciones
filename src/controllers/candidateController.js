const Candidate = require("../models/candidate");

// Crear candidato
exports.createCandidate = async (req, res) => {
  try {
    const candidate = new Candidate(req.body);
    await candidate.save();
    res.status(201).json(candidate);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Listar todos
exports.getCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.json(candidates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener por id
exports.getCandidateById = async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.id);
    if (!candidate) return res.status(404).json({ message: "Candidato no encontrado" });
    res.json(candidate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar
exports.deleteCandidate = async (req, res) => {
  try {
    const candidate = await Candidate.findByIdAndDelete(req.params.id);
    if (!candidate) return res.status(404).json({ message: "Candidato no encontrado" });
    res.json({ message: "Candidato eliminado" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};