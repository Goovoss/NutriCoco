import express from "express";
import cors from "cors";
import alimentosRouter from "./routes/alimentos.js";
import { inicializarDB } from "./config/database.js";

const app = express();
const PORT = process.env.PORT ?? 3001;

app.use(cors());
app.use(express.json());

app.use("/api/v1/alimentos", alimentosRouter);

app.get("/api/v1/health", (_req, res) => {
  res.json({ estado: "OK", mensaje: "NutriCoco API funcionando 🥥" });
});

inicializarDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error al inicializar la base de datos:", err);
    process.exit(1);
  });