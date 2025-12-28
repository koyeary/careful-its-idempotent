import React from 'react';

interface Ingredient {
  name: string;
  measure: string;
  percentage?: number;
  color?: string;
}

interface IngredientsPieProps {
  ingredients: Ingredient[];
}

const IngredientsPie: React.FC<IngredientsPieProps> = ({ ingredients }) => {
  const calculateSlices = () => {
    let currentAngle = 0;
    const slices = ingredients.map((ingredient, index) => {
      const percentage = ingredient.percentage || 100 / ingredients.length;
      const angle = (percentage / 100) * 360;
      const slice = {
        ...ingredient,
        startAngle: currentAngle,
        endAngle: currentAngle + angle,
        percentage
      };
      currentAngle += angle;
      return slice;
    });
    return slices;
  };

  const slices = calculateSlices();

  return (
    <div>
      <svg viewBox="0 0 200 200" width="200" height="200">
        {slices.map((slice, index) => {
          const startAngle = (slice.startAngle - 90) * (Math.PI / 180);
          const endAngle = (slice.endAngle - 90) * (Math.PI / 180);
          const x1 = 100 + 100 * Math.cos(startAngle);
          const y1 = 100 + 100 * Math.sin(startAngle);
          const x2 = 100 + 100 * Math.cos(endAngle);
          const y2 = 100 + 100 * Math.sin(endAngle);
          const largeArc = slice.percentage > 50 ? 1 : 0;

          return (
            <path
              key={index}
              d={`M 100 100 L ${x1} ${y1} A 100 100 0 ${largeArc} 1 ${x2} ${y2} Z`}
              fill={slice.color || `hsl(${index * 360 / ingredients.length}, 70%, 60%)`}
              stroke="#fff"
              strokeWidth="2"
            />
          );
        })}
      </svg>
    </div>
  );
};

export default IngredientsPie;
