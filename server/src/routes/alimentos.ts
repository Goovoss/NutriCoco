import { Router } from "express";
import { getAlimentos, postAlimento, deleteAlimento, buscarOpenFoodFacts } from "../controllers/alimentosController.js";

const router = Router();

router.get("/", getAlimentos);
router.post("/", postAlimento);
router.delete("/:id", deleteAlimento);
router.get("/openfoodfacts", buscarOpenFoodFacts);

export default router;