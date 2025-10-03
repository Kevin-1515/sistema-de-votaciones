const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Rutas
const authRoutes = require("./routes/auth");
const voterRoutes = require("./routes/voters");
const candidateRoutes = require("./routes/candidates");
const voteRoutes = require("./routes/votes");

// Middleware de autenticación
const authMiddleware = require("./middleware/authMiddleware");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas públicas
app.use("/auth", authRoutes);

// Rutas protegidas (necesitan token JWT)
app.use("/api/voters", authMiddleware, voterRoutes);
app.use("/api/candidates", authMiddleware, candidateRoutes);
app.use("/api/votes", authMiddleware, voteRoutes);

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log(" Conectado a MongoDB");
    app.listen(process.env.PORT || 4000, () => {
      console.log(`Servidor corriendo en puerto ${process.env.PORT || 4000}`);
    });
  })
  .catch(err => console.error(" Error de conexión:", err));