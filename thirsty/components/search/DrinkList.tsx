import React from "react";
import DrinkListItem from "./DrinkListItem";
import type { Cocktail } from "@/types/cocktails";
import { Martini } from "lucide-react";

interface DrinkListProps {
  drinks: Cocktail[];
  loading?: boolean;
  onDrinkClick: (drinkId: string) => void;
}

const DrinkList: React.FC<DrinkListProps> = ({
  drinks,
  loading = false,
  onDrinkClick,
}) => {
  if (loading) {
    return (
      <div className="mt-4 text-center text-gray-500">
        <p>
          <Martini className="animate-spin" /> Loading cocktails...
        </p>
      </div>
    );
  }

  if (drinks.length === 0) {
    return null;
  }

  return (
    <div className="mt-4">
      <ul>
        {drinks.map((drink) => (
          <DrinkListItem key={drink.id} drink={drink} onClick={onDrinkClick} />
        ))}
      </ul>
    </div>
  );
};

export default DrinkList;
