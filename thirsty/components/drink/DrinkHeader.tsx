import React from "react";
import Image from "next/image";

interface DrinkHeaderProps {
  name: string;
  category?: string;
  imageUrl?: string;
  alcoholic?: string;
}

const DrinkHeader: React.FC<DrinkHeaderProps> = ({
  name,
  category,
  imageUrl,
  alcoholic,
}) => {
  return (
    <header>
      <h1>{name}</h1>
      {imageUrl && <Image src={imageUrl} alt={name} />}
      <div>
        {category && <span>{category}</span>}
        {alcoholic && <span>{alcoholic}</span>}
      </div>
    </header>
  );
};

export default DrinkHeader;
