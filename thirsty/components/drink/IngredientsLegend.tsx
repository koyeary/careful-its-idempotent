import React, { useMemo } from "react";

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
  // Generate pastel colors for ingredients
  const generatePastelColor = (seed: string): string => {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = seed.charCodeAt(i) + ((hash << 5) - hash);
    }

    // Generate pastel colors by using high lightness and low saturation
    const hue = Math.abs(hash % 360);
    const saturation = 60 + Math.abs(hash % 20); // 60-80%
    const lightness = 75 + Math.abs(hash % 10); // 75-85%

    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };

  //useMemo to avoid regenerating colors (and thus keep colors consistent) on every render
  const ingredientsWithColors = useMemo(() => {
    return ingredients.map((item) => ({
      ...item,
      color: item.color || generatePastelColor(item.name),
    }));
  }, [ingredients]);

  return (
    <div style={{ margin: "20px" }}>
      <h3 style={{ fontSize: "17px", marginBottom: "12px" }}>Ingredients</h3>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {ingredientsWithColors.map((item, index) => (
          <li
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
              fontSize: "17px",
            }}
          >
            <span
              style={{
                backgroundColor: item.color,
                display: "inline-block",
                width: "20px",
                height: "20px",
                borderRadius: "3px",
                marginRight: "10px",
                flexShrink: 0,
              }}
            />
            <span style={{ wordWrap: "break-word", flex: 1 }}>
              <strong>{item.name}</strong>: {item.measure}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IngredientsLegend;
