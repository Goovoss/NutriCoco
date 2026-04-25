// Correcciones manuales para palabras que se traducen mal
const CORRECCIONES: Record<string, string> = {
  pan: "bread",
  ajo: "garlic",
  sal: "salt",
  col: "cabbage",
  pavo: "turkey",
  ternera: "beef",
  cerdo: "pork",
  cordero: "lamb",
  bacalao: "cod",
  merluza: "hake",
  gambas: "shrimp",
  mejillones: "mussels",
};

export async function traducirAlIngles(texto: string): Promise<string> {
  const textoLower = texto.toLowerCase().trim();

  if (CORRECCIONES[textoLower]) return CORRECCIONES[textoLower];

  try {
    const respuesta = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(texto)}&langpair=es|en`
    );
    const datos = await respuesta.json();
    return datos.responseData.translatedText as string;
  } catch {
    return texto;
  }
}

export async function traducirAlEspanol(texto: string): Promise<string> {
  try {
    const respuesta = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(texto)}&langpair=en|es`
    );
    const datos = await respuesta.json();
    return datos.responseData.translatedText as string;
  } catch {
    return texto;
  }
}