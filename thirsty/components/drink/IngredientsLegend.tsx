import React from 'react';

interface Ingredient {
  name: string;
  measure: string;
  color?: string;
}

interface IngredientsLegendProps {
  ingredients: Ingredient[];
}

const IngredientsLegend: React.FC<IngredientsLegendProps> = ({ ingredients }) => {
  return (
    <div>
      <h3>Ingredients</h3>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={index}>
            {ingredient.color && (
              <span
                style={{
                  backgroundColor: ingredient.color,
                  display: 'inline-block',
                  width: '12px',
                  height: '12px',
                  marginRight: '8px'
                }}
              />
            )}
            <strong>{ingredient.name}</strong>: {ingredient.measure}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IngredientsLegend;
