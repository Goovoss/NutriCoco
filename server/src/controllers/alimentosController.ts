import fetch from "node-fetch";
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

export async function buscarOpenFoodFacts(req: Request, res: Response) {
  try {
    const { buscar } = req.query;
    if (!buscar) {
      res.status(400).json({ exito: false, mensaje: "Parámetro buscar requerido" });
      return;
    }

    const params = new URLSearchParams({
      search_terms: String(buscar),
      search_simple: "1",
      action: "process",
      json: "1",
      page_size: "5",
      fields: "product_name,nutriments",
    });

    const respuesta = await fetch(`https://world.openfoodfacts.org/cgi/search.pl?${params}`);
    const datos = await respuesta.json() as { products?: unknown[] };
    res.json({ exito: true, datos: datos.products ?? [] });
  } catch (error) {
    console.error("Error Open Food Facts:", error);
    res.status(500).json({ exito: false, mensaje: String(error) });
  }
}