import type { Ingrediente, Nutrientes } from "../types";
import { useUsuario } from "../context/UsuarioContext";
import { calcularSemaforo } from "../utils/nutricion";


interface Props {
  ingredientes: Ingrediente[];
}

function calcularTotales(ingredientes: Ingrediente[]): Nutrientes {
  return ingredientes.reduce(
    (acc, ing) => ({
      calorias: acc.calorias + ing.nutrientes.calorias,
      proteinas: acc.proteinas + ing.nutrientes.proteinas,
      grasas: acc.grasas + ing.nutrientes.grasas,
      carbohidratos: acc.carbohidratos + ing.nutrientes.carbohidratos,
      fibra: acc.fibra + ing.nutrientes.fibra,
      azucar: acc.azucar + ing.nutrientes.azucar,
      sal: acc.sal + ing.nutrientes.sal,
    }),
    { calorias: 0, proteinas: 0, grasas: 0, carbohidratos: 0, fibra: 0, azucar: 0, sal: 0 }
  );
}

function FilaNutriente({ label, valor, unidad = "g" }: { label: string; valor: number; unidad?: string }) {
  return (
    <div className="flex justify-between py-2 border-b border-gray-100 last:border-0">
      <span className="text-gray-600 text-sm">{label}</span>
      <span className="font-semibold text-sm">
        {valor.toFixed(1)} {unidad}
      </span>
    </div>
  );
}

export function ResumenNutricional({ ingredientes }: Props) {
  const { biometricos } = useUsuario();

  if (ingredientes.length === 0) {
    return (
      <p className="text-gray-400 text-sm text-center py-6">
        Añade ingredientes para ver el resumen nutricional
      </p>
    );
  }

  const totales = calcularTotales(ingredientes);
  const semaforo = calcularSemaforo(totales, biometricos);

  return (
  <div className="flex flex-col gap-4">
    <div className={`${semaforo.color} rounded-lg px-4 py-3 text-center font-semibold`}>
      {semaforo.texto}
    </div>

    {!biometricos && (
      <p className="text-xs text-gray-400 text-center">
        💡 Añade tus datos biométricos para un análisis más preciso
      </p>
    )}

    <div className="bg-white rounded-lg p-4 shadow-sm">
      <h3 className="font-semibold text-gray-700 mb-3">Macronutrientes</h3>
      <FilaNutriente label="Calorías" valor={totales.calorias} unidad="kcal" />
      <FilaNutriente label="Proteínas" valor={totales.proteinas} />
      <FilaNutriente label="Grasas" valor={totales.grasas} />
      <FilaNutriente label="Carbohidratos" valor={totales.carbohidratos} />
    </div>

    <div className="bg-white rounded-lg p-4 shadow-sm">
      <h3 className="font-semibold text-gray-700 mb-3">Micronutrientes</h3>
      <FilaNutriente label="Fibra" valor={totales.fibra} />
      <FilaNutriente label="Azúcar" valor={totales.azucar} />
      <FilaNutriente label="Sal" valor={totales.sal} />
    </div>
  </div>
);
}