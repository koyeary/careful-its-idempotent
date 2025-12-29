export interface CocktailApi {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string | null;
  strInstructions: string | null;
  [key: `strIngredient${number}`]: string | null;
  [key: `strMeasure${number}`]: string | null;
}

export interface Ingredient {
  name: string;
  rawMeasure: string | null;
  amountForRatio?: number; // standardized amount for ratio calculations
}

export interface Cocktail {
  id: string;
  name: string;
  image: string | null;
  instructions: string;
  ingredients: Ingredient[];
}
