import React from "react";
import Image from "next/image";
import type { Cocktail } from "@/types/cocktails";

interface DrinkListItemProps {
  drink: Cocktail;
  onClick?: (drinkId: string) => void;
}

const DrinkListItem: React.FC<DrinkListItemProps> = ({ drink, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(drink.id);
    }
  };

  return (
    <li
      onClick={handleClick}
      className={`flex items-center gap-4 rounded-lg border border-gray-200 bg-white p-4 transition-shadow ${
        onClick ? "cursor-pointer hover:shadow-md" : ""
      }`}
    >
      {drink.image && (
        <Image
          src={drink.image}
          alt={drink.name}
          width={80}
          height={80}
          className="rounded-md object-cover"
        />
      )}
      <div className="flex-1">
        <h4 className="text-lg font-semibold text-gray-900">{drink.name}</h4>
        <p className="mt-1 text-sm text-gray-600">
          {drink.ingredients.length} ingredients
        </p>
      </div>
    </li>
  );
};

export default DrinkListItem;
