"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import { getCocktailById } from "@/lib/api";
import type { Cocktail } from "@/types/cocktails";

import Shell from "@/components/layout/Shell";
import DrinkHeader from "@/components/drink/DrinkHeader";
import IngredientsLegend from "@/components/drink/IngredientsLegend";
import IngredientsPie from "@/components/drink/IngredientsPie";
import Instructions from "@/components/drink/Instructions";
import { Martini } from "lucide-react";

const DrinkDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: drink,
    isLoading,
    isError,
  } = useQuery<Cocktail | null>({
    queryKey: ["cocktail", id],
    queryFn: () => getCocktailById(id),
    enabled: !!id, // only run if id is defined
    staleTime: 5 * 60_000, // wait 5 minutes before refetching
  });

  if (isLoading) {
    return (
      <Shell title="Thirsty">
        <div className="mx-auto max-w-md px-4 py-8">
          <Martini className="animate-spin" />
          Loading…
        </div>
      </Shell>
    );
  }

  if (isError || !drink) {
    return (
      <Shell title="Thirsty">
        <div className="mx-auto max-w-md px-4 py-8">Drink not found.</div>
      </Shell>
    );
  }

  return (
    <Shell title={`Thirsty - ${drink.name}`}>
      <div className="mx-auto max-w-lg py-6 text-black">
        <DrinkHeader drink={drink} image={drink.image} />
        <div className="flex items-center flex-row">
          <IngredientsLegend ingredients={drink.ingredients} />
          <IngredientsPie ingredients={drink.ingredients} />
        </div>
        <Instructions instructions={drink.instructions} />
      </div>
    </Shell>
  );
};

export default DrinkDetailPage;
