import type { Ingrediente } from "../types";

interface Props {
  ingrediente: Ingrediente;
  onEliminar: (id: string) => void;
}

export function TarjetaIngrediente({ ingrediente, onEliminar }: Props) {
  const { nombre, nutrientes } = ingrediente;

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 relative">
      <button
        onClick={() => onEliminar(ingrediente.id)}
        className="absolute top-3 right-3 text-gray-400 hover:text-red-500 font-bold text-lg leading-none"
      >
        ✕
      </button>

      <h3 className="font-semibold text-green-700 text-sm mb-3 pr-6 capitalize">
        {nombre}
      </h3>

      <div className="grid grid-cols-2 gap-2">
        <div className="bg-orange-50 rounded-lg p-2 text-center">
          <p className="text-xs text-gray-500">Calorías</p>
          <p className="font-bold text-orange-500 text-sm">{nutrientes.calorias.toFixed(0)} kcal</p>
        </div>
        <div className="bg-blue-50 rounded-lg p-2 text-center">
          <p className="text-xs text-gray-500">Proteínas</p>
          <p className="font-bold text-blue-500 text-sm">{nutrientes.proteinas.toFixed(1)}g</p>
        </div>
        <div className="bg-yellow-50 rounded-lg p-2 text-center">
          <p className="text-xs text-gray-500">Grasas</p>
          <p className="font-bold text-yellow-500 text-sm">{nutrientes.grasas.toFixed(1)}g</p>
        </div>
        <div className="bg-purple-50 rounded-lg p-2 text-center">
          <p className="text-xs text-gray-500">Carbos</p>
          <p className="font-bold text-purple-500 text-sm">{nutrientes.carbohidratos.toFixed(1)}g</p>
        </div>
      </div>
    </div>
  );
}