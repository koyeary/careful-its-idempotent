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

  const getIngredientBadgeColor = (count: number) => {
    if (count <= 3) {
      return "bg-green-500 text-white";
    } else if (count <= 5) {
      return "bg-yellow-500 text-white";
    } else if (count <= 7) {
      return "bg-orange-500 text-white";
    } else {
      return "bg-red-500 text-white";
    }
  };

  return (
    <li
      onClick={handleClick}
      className={`flex items-center h-[60px] rounded-lg border border-gray-200 bg-white transition-shadow relative
       cursor-pointer hover:shadow-md`}
    >
      {drink.image && (
        <Image
          src={drink.image}
          alt={drink.name}
          width={40}
          height={40}
          className="ml-[10px] mr-[15px] my-[10px] rounded-full object-cover"
        />
      )}
      <div className="flex-1">
        <h4 className="text-lg font-semibold text-gray-900">{drink.name}</h4>
      </div>
      <span
        className={`absolute bottom-2 right-3 px-2 py-1 rounded-full text-xs font-semibold ${getIngredientBadgeColor(
          drink.ingredients.length
        )}`}
      >
        {drink.ingredients.length}
      </span>
    </li>
  );
};

export default DrinkListItem;
