import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UsuarioProvider } from "./context/UsuarioContext";
import { Bienvenida } from "./pages/Bienvenida";
import { Login } from "./pages/Login";
import { Registro } from "./pages/Registro";
import { Biometricos } from "./pages/Biometricos";
import { Historial } from "./pages/Historial";
import { NotFound } from "./pages/NotFound";
import App from "./App";
import "./index.css";
import { Perfil } from "./pages/Perfil";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UsuarioProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Bienvenida />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/biometricos" element={<Biometricos />} />
          <Route path="/biometricos-invitado" element={<Biometricos opcional={true} />} />
          <Route path="/historial" element={<Historial />} />
          <Route path="/app" element={<App />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/perfil" element={<Perfil />} />
        </Routes>
      </BrowserRouter>
    </UsuarioProvider>
  </StrictMode>
);