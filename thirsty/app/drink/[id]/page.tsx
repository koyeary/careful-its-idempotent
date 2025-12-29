import React from "react";

interface DrinkProps {
  params: {
    id: string;
  };
}

const Drink: React.FC<DrinkProps> = ({ params }) => {
  return (
    <div>
      <h1>Drink Details</h1>
      <p>Drink ID: {params.id}</p>
    </div>
  );
};
export default Drink;
