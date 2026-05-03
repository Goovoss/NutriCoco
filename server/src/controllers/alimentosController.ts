import type { Request, Response } from "express";
import {
  obtenerAlimentos,
  buscarAlimentos,
  crearAlimento,
  eliminarAlimento,
} from "../services/alimentosService.js";

export async function getAlimentos(req: Request, res: Response) {
  try {
    const { buscar } = req.query;
    const alimentos = buscar
      ? await buscarAlimentos(String(buscar))
      : await obtenerAlimentos();
    res.json({ exito: true, datos: alimentos });
  } catch {
    res.status(500).json({ exito: false, mensaje: "Error al obtener alimentos" });
  }
}

export async function postAlimento(req: Request, res: Response) {
  try {
    const { nombre, calorias, proteinas, grasas, carbohidratos, fibra, azucar, sal } = req.body;

    if (!nombre || calorias === undefined) {
      res.status(400).json({ exito: false, mensaje: "Nombre y calorías son obligatorios" });
      return;
    }

    const alimento = await crearAlimento({
      id: crypto.randomUUID(),
      nombre,
      calorias: Number(calorias),
      proteinas: Number(proteinas ?? 0),
      grasas: Number(grasas ?? 0),
      carbohidratos: Number(carbohidratos ?? 0),
      fibra: Number(fibra ?? 0),
      azucar: Number(azucar ?? 0),
      sal: Number(sal ?? 0),
      creado_por: "usuario",
    });

    res.status(201).json({ exito: true, datos: alimento });
  } catch {
    res.status(500).json({ exito: false, mensaje: "Error al crear alimento" });
  }
}

export async function deleteAlimento(req: Request, res: Response) {
  try {
    const id = Array.isArray(req.params["id"]) ? req.params["id"][0] : req.params["id"] ?? "";
    const eliminado = await eliminarAlimento(id);
    if (!eliminado) {
      res.status(404).json({ exito: false, mensaje: "Alimento no encontrado" });
      return;
    }
    res.json({ exito: true, mensaje: "Alimento eliminado" });
  } catch {
    res.status(500).json({ exito: false, mensaje: "Error al eliminar alimento" });
  }
}