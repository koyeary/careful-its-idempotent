import React from "react";
import Image from "next/image";
import * as Tooltip from "@radix-ui/react-tooltip";
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

  const ingredientCount = drink.ingredients.length;

  return (
    <li
      onClick={handleClick}
      className={`flex items-center h-15 rounded-lg border border-gray-200 bg-white transition-shadow relative
       cursor-pointer hover:shadow-md`}
    >
      {drink.image && (
        <Image
          src={drink.image}
          alt={drink.name}
          width={40}
          height={40}
          className="ml-2.5 mr-3.75 my-2.5 rounded-full object-cover"
        />
      )}
      <div className="flex-1">
        <h4 className="text-lg font-semibold text-gray-900">{drink.name}</h4>
      </div>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <button
            type="button"
            className={`absolute bottom-2 right-3 px-2 py-1 rounded-full text-xs font-semibold ${getIngredientBadgeColor(
              ingredientCount
            )}`}
            aria-label={`${ingredientCount} ingredients`}
          >
            {ingredientCount}
          </button>
        </Tooltip.Trigger>

        <Tooltip.Portal>
          <Tooltip.Content
            side="top"
            align="center"
            sideOffset={6}
            className="select-none rounded-md bg-slate-900 px-2 py-1 text-xs text-white shadow-md"
          >
            {ingredientCount} ingredient{ingredientCount === 1 ? "" : "s"}
            <Tooltip.Arrow className="fill-slate-900" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </li>
  );
};

export default DrinkListItem;
