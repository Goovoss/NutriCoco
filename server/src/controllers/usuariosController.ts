import type { Request, Response } from "express";
import { registrarUsuario, loginUsuario } from "../services/usuariosService.js";

export async function registro(req: Request, res: Response) {
  try {
    const { nombre, email, password } = req.body;

    if (!nombre || !email || !password) {
      res.status(400).json({ exito: false, mensaje: "Todos los campos son obligatorios" });
      return;
    }

    if (password.length < 6) {
      res.status(400).json({ exito: false, mensaje: "La contraseña debe tener al menos 6 caracteres" });
      return;
    }

    const usuario = await registrarUsuario(nombre, email, password);
    res.status(201).json({ exito: true, datos: usuario });
  } catch (error) {
    res.status(400).json({ exito: false, mensaje: String(error) });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ exito: false, mensaje: "Email y contraseña son obligatorios" });
      return;
    }

    const usuario = await loginUsuario(email, password);
    res.status(200).json({ exito: true, datos: usuario });
  } catch (error) {
    res.status(401).json({ exito: false, mensaje: String(error) });
  }
}