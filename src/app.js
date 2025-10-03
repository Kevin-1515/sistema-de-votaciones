const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const voterRoutes = require("./routes/voters");
const candidateRoutes = require("./routes/candidates");
const voteRoutes = require("./routes/votes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/voters", voterRoutes);
app.use("/api/candidates", candidateRoutes);
app.use("/api/votes", voteRoutes);

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log(" Conectado a MongoDB");
    app.listen(process.env.PORT || 4000, () => {
      console.log(`Servidor corriendo en puerto ${process.env.PORT || 4000}`);
    });
  })
  .catch(err => console.error(" Error de conexión:", err));