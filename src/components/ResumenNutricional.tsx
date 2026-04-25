import type { Ingrediente, Nutrientes } from "../types";

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

function calcularSemaforo(totales: Nutrientes): { color: string; texto: string } {
  if (totales.calorias === 0) return { color: "bg-gray-200", texto: "Sin datos" };

  // Umbrales por plato (no por día entero)
  const esRojo =
    totales.grasas > 40 ||
    totales.azucar > 30 ||
    totales.sal > 6 ||
    totales.calorias > 1200;

  const esAmarillo =
    totales.grasas > 20 ||
    totales.azucar > 15 ||
    totales.sal > 3 ||
    totales.calorias > 700;

  if (esRojo) return { color: "bg-red-400", texto: "Alto en nutrientes críticos 🔴" };
  if (esAmarillo) return { color: "bg-yellow-400", texto: "Moderado, con cuidado 🟡" };
  return { color: "bg-green-400", texto: "Saludable 🟢" };
}

interface FilaNutrienteProps {
  label: string;
  valor: number;
  unidad?: string;
}

function FilaNutriente({ label, valor, unidad = "g" }: FilaNutrienteProps) {
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
  if (ingredientes.length === 0) {
    return (
      <p className="text-gray-400 text-sm text-center py-6">
        Añade ingredientes para ver el resumen nutricional
      </p>
    );
  }

  const totales = calcularTotales(ingredientes);
  const semaforo = calcularSemaforo(totales);

  return (
    <div className="flex flex-col gap-4">
      <div className={`${semaforo.color} rounded-lg px-4 py-3 text-center font-semibold`}>
        {semaforo.texto}
      </div>

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