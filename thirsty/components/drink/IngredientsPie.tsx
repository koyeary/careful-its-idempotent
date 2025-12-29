"use client";
import React from "react";
import { Ingredient } from "@/types/cocktails";
import { PieChart, Pie, Cell } from "recharts";
import { getPastelColors } from "@/lib/colors";

const IngredientsPie: React.FC<{ drink: { ingredients: Ingredient[] } }> = ({
  drink,
}) => {
  const { ingredients } = drink;

  if (!ingredients.length) return null;

  // Separate ingredients with and without valid amountForRatio
  const withRatio = ingredients.filter(
    (ing) => ing.amountForRatio && !isNaN(ing.amountForRatio)
  );
  const withoutRatio = ingredients.filter(
    (ing) => !ing.amountForRatio || isNaN(ing.amountForRatio)
  );

  // Calculate total amount from ingredients with ratio
  const totalWithRatio = withRatio.reduce(
    (sum, ing) => sum + (ing.amountForRatio || 0),
    0
  );

  // Calculate remaining portion for ingredients without ratio
  const remainingPortion = Math.max(0, 100 - totalWithRatio);
  const portionPerUnknown =
    withoutRatio.length > 0 ? remainingPortion / withoutRatio.length : 0;

  // Build final data array with calculated values
  const pieData = ingredients.map((ing) => {
    const hasValidRatio = ing.amountForRatio && !isNaN(ing.amountForRatio);
    return {
      name: ing.name,
      value: hasValidRatio ? ing.amountForRatio : portionPerUnknown,
    };
  });

  return (
    <PieChart width={200} height={200} className="m-5">
      <Pie
        dataKey="value"
        data={pieData}
        cx={80}
        cy={80}
        outerRadius={60}
        paddingAngle={1}
      >
        {ingredients.map((entry, index) => (
          <Cell
            key={`cell-${index}`}
            fill={getPastelColors(ingredients.length)[index]}
          />
        ))}
      </Pie>
    </PieChart>
  );
};

export default IngredientsPie;
