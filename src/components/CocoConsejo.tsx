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

  if (numIngredientes === 1) {
    consejos.push("¡Ey! Estás viendo un solo alimento. Un plato completo combina varios ingredientes. ¡Añade más cosas!");
  }
  if (totales.calorias < 200 && numIngredientes > 0) {
    consejos.push("Este plato tiene muy pocas calorías para ser una comida completa. ¡Tu cuerpo necesita más energía!");
  }
  if (totales.proteinas < 5) {
    consejos.push("Tu plato no tiene casi proteínas. Considera añadir huevo, pollo, legumbres o lácteos.");
  }
  if (totales.sal > 3) {
    consejos.push("¡Mucha sal en este plato! El jamón, embutidos y quesos curados son muy salados. Con moderación 😅");
  }
  if (totales.carbohidratos > 50 && totales.proteinas < 10 && totales.grasas < 5) {
    consejos.push("Tu plato es muy rico en carbohidratos. ¡Añade proteínas y grasas saludables para equilibrarlo!");
  }
  if (totales.calorias > 800) {
    consejos.push("¡Este es un plato contundente! Asegúrate de moverte un poco después 🏃");
  }
  if (
    totales.proteinas >= 15 &&
    totales.grasas >= 5 &&
    totales.carbohidratos >= 20 &&
    totales.calorias >= 300 &&
    totales.calorias <= 700
  ) {
    consejos.push("¡Plato muy equilibrado! Tienes un buen balance de proteínas, carbohidratos y grasas. ¡Así se hace! 💪");
  }
  if (biometricos) {
    if (biometricos.objetivo === "perder" && totales.calorias > 600) {
      consejos.push("Recuerda que estás intentando perder peso. Este plato tiene bastantes calorías, ¡controla las porciones!");
    }
    if (biometricos.objetivo === "ganar" && totales.proteinas < 20) {
      consejos.push("Para ganar músculo necesitas más proteínas. ¡Añade pollo, huevo o proteína en polvo!");
    }
  }
  if (consejos.length === 0) {
    consejos.push("¡Todo bien por aquí! Sigue así con una alimentación variada y equilibrada 🌿");
  }

  return consejos;
}

export function CocoConsejo({ totales, numIngredientes, biometricos }: Props) {
  const consejos = generarConsejos(totales, numIngredientes, biometricos);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <div className="text-4xl" style={{ animation: "bounce 1s infinite" }}>🥥</div>
        <span className="text-sm font-bold text-green-700">Coco dice...</span>
      </div>

      {consejos.map((consejo, i) => (
        <div
          key={i}
          className="relative bg-white border-2 border-green-400 rounded-2xl rounded-tl-none px-5 py-4 shadow-sm w-full"
        >
          <div className="absolute -left-3 top-3 w-3 h-3 bg-white border-l-2 border-t-2 border-green-400 rotate-[-45deg]" />
          <p className="text-sm font-semibold text-gray-800 leading-relaxed">{consejo}</p>
        </div>
      ))}

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
}