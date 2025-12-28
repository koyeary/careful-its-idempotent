import { CocktailApi, Cocktail, Ingredient } from "@/types/cocktails";
import { standardizeMeasure } from "./parseIngredients";

function mapCocktail(d: CocktailApi): Cocktail {
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
}

const BASE_URL = "https://www.thecocktaildb.com/api/json/v1/1/search.php";

const searchCocktailsByName = async (query: string): Promise<Cocktail[]> => {
  if (!query.trim()) return [];
  console.log(query);
  const res = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${encodeURIComponent(
      query
    )}`
  );

  if (!res.ok) throw new Error("Failed to fetch cocktails");
  const data = await res.json();
  console.log(data);
  //if (!data.drinks) return [];
  console.log("Fetched drinks:", data.drinks);
  return data.drinks.map(mapCocktail);
};

export { searchCocktailsByName };

export async function getCocktailById(id: string): Promise<Cocktail | null> {
  const res = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  if (!res.ok) throw new Error("Failed to fetch cocktail");
  const data = await res.json();
  if (!data.drinks?.[0]) return null;
  return mapCocktail(data.drinks[0]);
}
