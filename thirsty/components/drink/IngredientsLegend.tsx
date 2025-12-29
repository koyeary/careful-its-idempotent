import React, { useMemo } from "react";
import { getPastelColors } from "../../lib/colors";

interface Ingredient {
  name: string;
  measure: string;
  color?: string;
}

interface IngredientsLegendProps {
  ingredients: Ingredient[];
}

const IngredientsLegend: React.FC<IngredientsLegendProps> = ({
  ingredients,
}) => {
  //useMemo to avoid regenerating colors (and thus keep colors consistent) on every render
  const legendColors = useMemo(() => {
    return ingredients.map((item) => ({
      ...item,
      color: getPastelColors(ingredients.length)[ingredients.indexOf(item)],
    }));
  }, [ingredients]);

  return (
    <div className="m-5">
      <h3 className="mb-5 ml-5 text-[17px] font-bold">Ingredients: </h3>
      <ul className="list-none p-0 m-5">
        {legendColors.map((item, index) => (
          <li key={index} className="flex items-center mb-2 text-[17px]">
            <span
              className="inline-block w-5 h-5 rounded mr-2 shrink-0"
              style={{
                backgroundColor: item.color,
              }}
            />

            <span className="wrap-break-word flex-1">
              {item.name} {item.rawMeasure && `(${item.rawMeasure.trim(" ")})`}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IngredientsLegend;
