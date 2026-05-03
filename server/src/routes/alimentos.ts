import { Router } from "express";
import { getAlimentos, postAlimento, deleteAlimento } from "../controllers/alimentosController.js";

const router = Router();

router.get("/", getAlimentos);
router.post("/", postAlimento);
router.delete("/:id", deleteAlimento);

export default router;