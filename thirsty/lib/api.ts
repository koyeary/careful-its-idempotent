import { CocktailApi, Cocktail, Ingredient } from "@/types/cocktails";
import { standardizeMeasure } from "./parseIngredients";

const mapCocktail = (d: CocktailApi): Cocktail => {
  const ingredients: Ingredient[] = [];
  for (let i = 1; i <= 15; i++) {
    const name = d[`strIngredient${i}`];
    const rawMeasure = d[`strMeasure${i}`];
    if (!name) continue;
    const amountForRatio = rawMeasure
      ? standardizeMeasure(rawMeasure)
      : undefined;
    ingredients.push({ name, rawMeasure, amountForRatio });
  }

  return {
    id: d.idDrink,
    name: d.strDrink,
    image: d.strDrinkThumb,
    instructions: d.strInstructions ?? "",
    ingredients,
  };
};

export const searchCocktailsByName = async (
  query: string
): Promise<Cocktail[]> => {
  if (!query.trim()) return [];

  const res = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${encodeURIComponent(
      query
    )}`
  );

  if (!res.ok) throw new Error("Failed to fetch cocktails");
  const data = await res.json();

  if (!data.drinks) return [];
  console.log("Fetched drinks:", data.drinks);
  return data.drinks.map(mapCocktail);
};

export const getCocktailById = async (id: string): Promise<Cocktail | null> => {
  console.log(id);
  const res = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  if (!res.ok) throw new Error("Failed to fetch cocktail");
  const data = await res.json();

  if (!data.drinks?.[0]) return null;
  return mapCocktail(data.drinks[0]);
};
