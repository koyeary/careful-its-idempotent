import React from "react";
import Image from "next/image";

interface DrinkHeaderProps {
  drink: {
    name: string;
    image: string;
  };
}

const DrinkHeader: React.FC<DrinkHeaderProps> = ({
  drink: { name, image },
}) => {
  return (
    <header className="mb-6 flex flex-col items-center">
      <Image
        src={image}
        alt={name}
        width={160}
        height={160}
        className="rounded-full object-cover mt-7.5"
      />
      <h1 className="mt-5 text-xl font-bold">{name}</h1>
    </header>
  );
};

export default DrinkHeader;
