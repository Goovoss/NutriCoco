export interface Nutrientes {
  calorias: number;
  proteinas: number;
  grasas: number;
  carbohidratos: number;
  fibra: number;
  azucar: number;
  sal: number;
}

export interface Ingrediente {
  id: string;
  nombre: string;
  nutrientes: Nutrientes;
}

export interface Plato {
  id: string;
  nombre: string;
  ingredientes: Ingrediente[];
  creadoEn: Date;
}