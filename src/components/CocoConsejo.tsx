import type { Nutrientes } from "../types";
import type { DatosBiometricos } from "../context/UsuarioContext";

interface Props {
  totales: Nutrientes;
  numIngredientes: number;
  biometricos: DatosBiometricos | null;
}

function generarConsejos(
  totales: Nutrientes,
  numIngredientes: number,
  biometricos: DatosBiometricos | null
): string[] {
  const consejos: string[] = [];

  // Solo un ingrediente
  if (numIngredientes === 1) {
    consejos.push("¡Ey! Estás viendo un solo alimento. Un plato completo combina varios ingredientes. ¡Añade más cosas!");
  }

  // Pocas calorías
  if (totales.calorias < 200 && numIngredientes > 0) {
    consejos.push("Este plato tiene muy pocas calorías para ser una comida completa. ¡Tu cuerpo necesita más energía!");
  }

  // Sin proteínas
  if (totales.proteinas < 5) {
    consejos.push("Tu plato no tiene casi proteínas. Considera añadir huevo, pollo, legumbres o lácteos.");
  }

  // Demasiada sal
  if (totales.sal > 3) {
    consejos.push("¡Mucha sal en este plato! El jamón, embutidos y quesos curados son muy salados. Con moderación 😅");
  }

  // Solo carbohidratos
  if (totales.carbohidratos > 50 && totales.proteinas < 10 && totales.grasas < 5) {
    consejos.push("Tu plato es muy rico en carbohidratos. ¡Añade proteínas y grasas saludables para equilibrarlo!");
  }

  // Demasiadas calorías
  if (totales.calorias > 800) {
    consejos.push("¡Este es un plato contundente! Asegúrate de moverte un poco después 🏃");
  }

  // Plato equilibrado
  if (
    totales.proteinas >= 15 &&
    totales.grasas >= 5 &&
    totales.carbohidratos >= 20 &&
    totales.calorias >= 300 &&
    totales.calorias <= 700
  ) {
    consejos.push("¡Plato muy equilibrado! Tienes un buen balance de proteínas, carbohidratos y grasas. ¡Así se hace! 💪");
  }

  // Consejo personalizado por objetivo
  if (biometricos) {
    if (biometricos.objetivo === "perder" && totales.calorias > 600) {
      consejos.push("Recuerda que estás intentando perder peso. Este plato tiene bastantes calorías, ¡controla las porciones!");
    }
    if (biometricos.objetivo === "ganar" && totales.proteinas < 20) {
      consejos.push("Para ganar músculo necesitas más proteínas. ¡Añade pollo, huevo o proteína en polvo!");
    }
  }

  // Si no hay consejos específicos
  if (consejos.length === 0) {
    consejos.push("¡Todo bien por aquí! Sigue así con una alimentación variada y equilibrada 🌿");
  }

  return consejos;
}

export function CocoConsejo({ totales, numIngredientes, biometricos }: Props) {
  const consejos = generarConsejos(totales, numIngredientes, biometricos);

  return (
    <div className="flex flex-col gap-3 mt-2">
      {consejos.map((consejo, i) => (
        <div key={i} className="flex items-start gap-3">
          {/* Coco */}
          <div className="text-4xl flex-shrink-0">🥥</div>

          {/* Bocadillo */}
          <div className="relative bg-white border-2 border-green-300 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm flex-1">
            <div className="absolute -left-3 top-2 w-3 h-3 bg-white border-l-2 border-b-2 border-green-300 rotate-45" />
            <p className="text-sm text-gray-700">{consejo}</p>
          </div>
        </div>
      ))}
    </div>
  );
}